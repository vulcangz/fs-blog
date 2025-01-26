package main

import "time"

type Profile struct {
	Name            string `json:"name"`
	UserID          uint64 `json:"user_id"`
	Nickname        string `json:"nickname"`
	Bio             string `json:"bio" fs:"optional;"`
	Image           string `json:"image" fs:"optional;"`
	Work            string `json:"work" fs:"optional;"`
	Education       string `json:"education" fs:"optional;"`
	CodingSkill     string `json:"coding_skill" fs:"optional;"`
	WebsiteURL      string `json:"website_url" fs:"optional;"`
	Location        string `json:"location" fs:"optional;"`
	Learning        string `json:"learning" fs:"optional;"`
	Avaliable       string `json:"avaliable" fs:"optional;"`
	Hacking         string `json:"hacking" fs:"optional;"`
	Background      string `json:"background" fs:"optional;"`
	BrandColor1     string `json:"brand_color1" fs:"optional;"`
	GithubUsername  string `json:"github_username" fs:"optional;"`
	TwitterUsername string `json:"twitter_username" fs:"optional;"`
	GoogleUsername  string `json:"google_username" fs:"optional;"`
}

type Tag struct {
	ID          uint64  `json:"id"`
	Name        string  `json:"name" fs:"unique;"`
	Description string  `json:"description" fs:"optional;"`
	Frequency   int     `json:"frequency" fs:"optional;default=0;sortable;"`
	Posts       []*Post `json:"posts" fs.relation:"{'type':'m2m','schema':'post','field':'tags','owner':true}"`
}

type Post struct {
	ID              uint64     `json:"id"`
	CoverImage      string     `json:"cover_image" fs:"optional;"`
	Title           string     `json:"title"`
	Content         string     `json:"content"`
	UserID          uint64     `json:"user_id"`
	Published       bool       `json:"published" fs:"optional;default=0;sortable"`
	PublishedAt     *time.Time `json:"published_at,omitempty" fs:"optional;"`
	CommentsCount   int        `json:"comments_count" fs:"optional;default=0;sortable"`
	ViewCount       int        `json:"view_count" fs:"optional;default=0;sortable"`
	ShareCount      int        `json:"share_count" fs:"optional;default=0;sortable"`
	TimeToRead      int        `json:"time_to_read" fs:"optional;default=0"`
	UserInteraction bool       `json:"user_interaction" fs:"optional;default=0"`
	Mode            uint       `json:"mode"` // Private = 0, Public = 1, Subscriber = 2
	Tags            []*Tag     `json:"tags"  fs:"optional;" fs.relation:"{'type':'m2m','schema':'tag','field':'posts','owner':false}"`
}

type Like struct {
	_      any    `json:"-" fs:"label_field=like"`
	ID     uint64 `json:"id"`
	UserID uint64 `json:"user_id"`
	PostID uint64 `json:"post_id"`
}

type Reading struct {
	_      any    `json:"-" fs:"label_field=reading"`
	ID     uint64 `json:"id"`
	UserID uint64 `json:"user_id"`
	PostID uint64 `json:"post_id"`
}

type Follow struct {
	_               any    `json:"-" fs:"label_field=follow"`
	ID              uint64 `json:"id"`
	FollowedUserID  uint64 `json:"followedUser_id"`
	FollowingUserID uint64 `json:"followingUser_id" `
}

type Payload struct {
	ID      int    `json:"id"`
	Comment string `json:"comment"`
}

type Response struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}
