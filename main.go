package main

import (
	"context"
	"fmt"
	"log"
	"sync"
	"time"

	"github.com/fastschema/fastschema"
	"github.com/fastschema/fastschema/db"
	"github.com/fastschema/fastschema/fs"
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
