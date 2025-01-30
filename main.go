package main

import (
	"context"
	"fmt"
	"log"
	"sync"
	"time"

	"github.com/fastschema/fastschema"
	"github.com/fastschema/fastschema/db"
	"github.com/fastschema/fastschema/entity"
	"github.com/fastschema/fastschema/fs"
	"github.com/fastschema/fastschema/pkg/auth"
	"github.com/fastschema/fastschema/pkg/errors"
	"github.com/fastschema/fastschema/pkg/utils"
	"github.com/leandro-lugaresi/hub"
)

const postPageviewTopic = "content.post.detail"

var (
	bus      *hub.Hub
	needInit bool
)

// In this example, we use utils.Must to handle errors.
// You can use the standard error handling if you prefer.
func main() {
	ctx := context.Background()
	app := utils.Must(fastschema.New(&fs.Config{
		Port: "8000",
		SystemSchemas: []any{
			Profile{},
			Tag{}, Post{},
			Like{}, Follow{}, Reading{},
		},
		DBConfig: &db.Config{
			Driver:             "sqlite",
			LogQueries:         true,
			DisableForeignKeys: true,
		},
		MailConfig: &fs.MailConfig{
			SenderName: "Test Sender",
			SenderMail: "sender@example.com",
			Clients: []map[string]interface{}{
				{
					"name":     "smtp1",
					"driver":   "smtp",
					"host":     "smtp.example.com",
					"port":     587,
					"username": "user",
					"password": "pass",
					"insecure": false,
				},
			},
		},
	}))

	defer func() {
		utils.Must(0, app.Shutdown())
	}()

	// needInit = true
	if needInit {
		InitDB(ctx, app)
		UserSeeder(ctx, app)
		TagSeeder(ctx, app)
		PostSeeder(ctx, app, 60)
	}

	// event bus
	// now just for post pageview count
	eventBus(app)

	// Add a pre resolve hook for pageview counter
	app.OnPreResolve(func(ctx fs.Context) error {
		resource := ctx.Resource()
		app.Logger().Debug(resource.ID())

		if resource.ID() == "api.content.detail" {
			app.Logger().Debug("call visit count hook.")
			app.Logger().Debug(ctx.Args())
			bus.Publish(hub.Message{
				Name: postPageviewTopic,
				Fields: hub.Fields{
					"id":     ctx.ArgInt("id"),
					"schema": ctx.Arg("schema"),
				},
			})
		}

		return nil
	})

	// Add a resource for OAuth provider GitHub user retrieve 'me' info.
	app.AddResource(fs.Post("/api/auth/github/me", func(c fs.Context, payload *MeReq) (*MeResponse, error) {
		user, err := db.Query[OAuthUserData](
			c, app.DB(),
			"SELECT `users`.`id` AS id, `users`.`username` AS name, `users`.`email`, `users`.`provider`, `t1`.`nickname`, `t1`.`image` FROM `users` JOIN `profiles` AS `t1` ON `users`.`id` = `t1`.`user_id` WHERE `users`.`username` = ? OR `users`.`email` = ?",
			payload.Username,
			payload.Email,
		)
		if err != nil {
			if db.IsNotFound(err) {
				return nil, errors.Unauthorized()
			}
			return nil, err
		}

		if user == nil {
			return nil, errors.NotFound()
		}

		result, err := githubLogin(c, app, &GitHubLogin{
			Login: payload.Username,
			Email: payload.Email,
		})
		if err != nil {
			return nil, err
		}

		resp := &MeResponse{}
		resp.User = user[0]
		resp.Token = result.Token
		resp.Expires = result.Expires

		return resp, nil
	}, &fs.Meta{Public: true}))

	// Add a resource for OAuth provider GitHub user auto register
	app.AddResource(fs.Post("/api/auth/github/register", func(c fs.Context, payload *OAuthRegister) (*OAuthRegisterResponse, error) {
		userEntity := payload.Entity("auto")
		userData := &OAuthUserData{}
		if err := db.WithTx(app.DB(), c, func(tx db.Client) error {
			user, err := db.Builder[*fs.User](tx).Create(c, userEntity)
			if err != nil {
				c.Logger().Errorf(auth.MSG_USER_SAVE_ERROR+": %w", err)
				return auth.ERR_SAVE_USER
			}

			userData = &OAuthUserData{
				ID:    user.ID,
				Name:  user.Username,
				Email: user.Email,
			}

			return nil
		}); err != nil {
			c.Logger().Error(auth.MSG_USER_SAVE_ERROR, err)
			return nil, auth.ERR_SAVE_USER
		}

		result, err := githubLogin(c, app, &GitHubLogin{
			Login: payload.Username,
			Email: payload.Email,
		})

		if err != nil {
			return nil, err
		}

		resp := &OAuthRegisterResponse{}
		resp.User = userData
		resp.Token = result.Token
		resp.Expires = result.Expires

		return resp, nil
	}, &fs.Meta{Public: true}))

	log.Fatal(app.Start())
}

func eventBus(app *fastschema.App) {
	app.Logger().Debug("eventBus starting...")
	bus = hub.New()
	var wg sync.WaitGroup
	// the cap param is used to create one buffered channel with cap = 10
	// If you wan an unbuferred channel use the 0 cap
	sub := bus.Subscribe(10, postPageviewTopic)

	wg.Add(1)

	go func(s hub.Subscription) {
		for msg := range s.Receiver {
			fmt.Printf("receive msg with topic %s and id %d and schema %s\n", msg.Name, msg.Fields["id"], msg.Fields["schema"])

			if msg.Fields["schema"] == "post" {
				result := utils.Must(app.DB().Exec(
					context.Background(),
					"UPDATE posts SET view_count = view_count + ?, updated_at = ? WHERE id = ?",
					1, time.Now(), msg.Fields["id"],
				))

				lid, _ := result.LastInsertId()
				fmt.Printf("msg process result: LastInsertId=%d\n", lid)
			}
		}

		wg.Done()
	}(sub)
}

func githubLogin(c fs.Context, app *fastschema.App, payload *GitHubLogin) (*GitHubLoginResponse, error) {
	if payload == nil || payload.Login == "" || payload.Email == "" {
		return nil, errors.UnprocessableEntity(auth.MSG_INVALID_LOGIN_OR_PASSWORD)
	}

	user, err := db.Builder[*fs.User](app.DB()).
		Where(db.Or(
			db.EQ("username", payload.Login),
			db.EQ("email", payload.Email),
		)).
		Select(
			"id",
			"username",
			"email",
			"password",
			"provider",
			"provider_id",
			"provider_username",
			"active",
			"roles",
			entity.FieldCreatedAt,
			entity.FieldUpdatedAt,
			entity.FieldDeletedAt,
		).
		First(c)
	if err != nil && !db.IsNotFound(err) {
		c.Logger().Error(err)
		return nil, errors.InternalServerError(auth.MSG_CHECKING_USER_ERROR)
	}

	if user == nil {
		return nil, errors.UnprocessableEntity(auth.MSG_INVALID_LOGIN_OR_PASSWORD)
	}

	if !user.Active {
		return nil, errors.Unauthorized(auth.MSG_USER_IS_INACTIVE)
	}

	if err := checkToken(payload.Token, "saved-github-accessToken"); err != nil {
		return nil, errors.UnprocessableEntity(auth.MSG_INVALID_LOGIN_OR_PASSWORD)
	}

	jwtToken, exp, err := user.JwtClaim(app.Key())
	if err != nil {
		return nil, err
	}

	return &GitHubLoginResponse{Token: jwtToken, Expires: exp}, nil
}

// checkToken, Just simulate verifying accessToken
func checkToken(accessToken, existedToken string) error {
	if accessToken != "" && accessToken == existedToken {
		return nil
	}
	return nil
}
