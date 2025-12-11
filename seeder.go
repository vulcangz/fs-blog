package main

import (
	"context"
	"strconv"
	"time"

	"github.com/brianvoe/gofakeit/v7"
	"github.com/fastschema/fastschema"
	"github.com/fastschema/fastschema/db"
	"github.com/fastschema/fastschema/entity"
	"github.com/fastschema/fastschema/fs"
	"github.com/fastschema/fastschema/pkg/utils"
	"github.com/gosimple/slug"
)

// 27 tags
var initTagValues = []string{"javascript", "golang", "webdev", "beginners", "programming", "react", "python", "angular", "csharp", "css", "typescript", "cplusplus",
	"ruby", "ai", "devops", "rust", "opensource", "#database", "java", "node", "security", "docker", "api", "algorithms", "cloud", "machinelearning", "career"}

// TagSeeder create tags
func TagSeeder(ctx context.Context, app *fastschema.App) {
	for _, v := range initTagValues {
		// Create tag using schema name
		_ = utils.Must(db.Builder[Tag](app.DB(), "tag").Create(ctx, fs.Map{
			"name":        v,
			"description": gofakeit.SentenceSimple(),
		}))

		// fmt.Printf("> Create tag using system schema: %+s\n\n", spew.Sdump(tag))
	}

}

// UserSeeder create 3 users
func UserSeeder(ctx context.Context, app *fastschema.App) {
	for i := 101; i < 104; i++ {
		// Create user using schema name
		_ = utils.Must(db.Builder[fs.User](app.DB()).Create(ctx, fs.Map{
			"username": "test" + strconv.Itoa(i),
			"email":    "test" + strconv.Itoa(i) + "@example.com",
			"provider": "local",
			"password": utils.Must(utils.GenerateHash("123456")), // 123456
			"active":   true,
			"roles":    []*entity.Entity{},
		}))

		// fmt.Printf("> Create tag using system schema: %+s\n\n", spew.Sdump(tag))
	}
}

// PostSeeder create quant posts
func PostSeeder(ctx context.Context, app *fastschema.App, quant int) {
	for i := 1; i < quant+1; i++ {
		var tagNames []any
		// Query tags
		tagNames = append(tagNames, gofakeit.RandomString(initTagValues[:9]), gofakeit.RandomString(initTagValues[9:18]), gofakeit.RandomString(initTagValues[18:27]))
		// fmt.Printf("> Query blog with tags: %+v\n\n", spew.Sdump(tagNames))

		// Query tags
		postTags := utils.Must(db.Builder[*Tag](app.DB()).
			Where(db.Or(
				db.EQ("name", tagNames[0]),
				db.EQ("name", tagNames[1]),
				db.EQ("name", tagNames[2]),
			)).
			Get(ctx))

		// fmt.Printf("> blogTags: %s\n\n", spew.Sdump(blogTags))

		// Create blog with tags
		ca1 := gofakeit.DateRange(time.Now().AddDate(-2, 0, 0), time.Now().AddDate(0, 0, -2))

		published := true
		published_at := gofakeit.Date()

		if i%8 == 0 {
			published = false
			published_at = time.Now()
		}

		title := gofakeit.SentenceSimple()
		slug.AppendTimestamp = true
		slug := slug.Make(title)
		_ = utils.Must(db.Builder[Post](app.DB()).Create(ctx, fs.Map{
			"title":            title,
			"slug":             slug,
			"cover_image":      `https://picsum.photos/id/` + strconv.Itoa(i) + `/350/200`,
			"content":          gofakeit.Paragraph(3, 10, 20, "\n\n"),
			"published":        published,
			"published_at":     published_at,
			"view_count":       gofakeit.Number(10, 100),
			"share_count":      gofakeit.Number(10, 100),
			"time_to_read":     gofakeit.Number(1, 6),
			"user_id":          gofakeit.RandomInt([]int{1, 2, 3}),
			"user_interaction": gofakeit.Bool(),
			"mode":             gofakeit.RandomInt([]int{0, 1, 2}),
			"tags": []*entity.Entity{
				entity.New(postTags[0].ID),
				entity.New(postTags[1].ID),
				entity.New(postTags[2].ID),
			},
			"created_at": ca1,
			"updated_at": ca1.AddDate(0, 0, gofakeit.RandomInt([]int{1, 2, 3, 4, 5, 6, 7})),
		}))

		// fmt.Printf("> Create blog with tags: %s\n\n", spew.Sdump(blog))
	}

}

// InitDB
func InitDB(ctx context.Context, app *fastschema.App) {
	// Delete all relations
	utils.Must(db.Exec(ctx, app.DB(), "DELETE FROM posts_tags"))
	utils.Must(db.Exec(ctx, app.DB(), "DELETE FROM likes"))
	utils.Must(db.Exec(ctx, app.DB(), "DELETE FROM follows"))
	utils.Must(db.Exec(ctx, app.DB(), "DELETE FROM readings"))

	// Delete all posts
	utils.Must(db.Exec(ctx, app.DB(), "DELETE FROM tags; DELETE FROM SQLITE_SEQUENCE WHERE name='tags';"))
	utils.Must(db.Exec(ctx, app.DB(), "DELETE FROM posts; DELETE FROM SQLITE_SEQUENCE WHERE name='posts';"))
	utils.Must(db.Exec(ctx, app.DB(), "DELETE FROM profiles; DELETE FROM SQLITE_SEQUENCE WHERE name='profiles';"))

	// Delete test users(test101~test103)
	utils.Must(db.Exec(ctx, app.DB(), "DELETE FROM users where username like 'test10%';"))
}
