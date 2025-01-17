-- create "posts" table
CREATE TABLE `posts` (`id` integer NOT NULL PRIMARY KEY AUTOINCREMENT, `cover_image` text NULL, `title` text NOT NULL, `content` text NOT NULL, `user_id` integer NOT NULL, `published` bool NULL, `comments_count` integer NULL DEFAULT (0), `view_count` integer NULL DEFAULT (0), `share_count` integer NULL DEFAULT (0), `time_to_read` integer NULL DEFAULT (0), `user_interaction` bool NULL DEFAULT (false), `mode` integer NOT NULL, `created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), `updated_at` datetime NULL, `deleted_at` datetime NULL);
-- create index "posts_id_key" to table: "posts"
CREATE UNIQUE INDEX `posts_id_key` ON `posts` (`id`);
-- create "likes" table
CREATE TABLE `likes` (`id` integer NOT NULL PRIMARY KEY AUTOINCREMENT, `user_id` integer NOT NULL, `post_id` integer NOT NULL, `created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), `updated_at` datetime NULL, `deleted_at` datetime NULL);
-- create index "likes_id_key" to table: "likes"
CREATE UNIQUE INDEX `likes_id_key` ON `likes` (`id`);
-- create "permissions" table
CREATE TABLE `permissions` (`id` integer NOT NULL PRIMARY KEY AUTOINCREMENT, `role_id` integer NOT NULL, `resource` text NOT NULL, `value` text NOT NULL, `modifier` json NULL, `created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), `updated_at` datetime NULL, `deleted_at` datetime NULL);
-- create index "permissions_id_key" to table: "permissions"
CREATE UNIQUE INDEX `permissions_id_key` ON `permissions` (`id`);
-- create "users" table
CREATE TABLE `users` (`id` integer NOT NULL PRIMARY KEY AUTOINCREMENT, `username` text NOT NULL, `email` text NULL, `password` text NULL, `active` bool NULL, `provider` text NULL, `provider_id` text NULL, `provider_username` text NULL, `created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), `updated_at` datetime NULL, `deleted_at` datetime NULL);
-- create index "users_id_key" to table: "users"
CREATE UNIQUE INDEX `users_id_key` ON `users` (`id`);
-- create "profiles" table
CREATE TABLE `profiles` (`id` integer NOT NULL PRIMARY KEY AUTOINCREMENT, `name` text NOT NULL, `user_id` integer NOT NULL, `nickname` text NOT NULL, `bio` text NOT NULL, `work` text NOT NULL, `education` text NOT NULL, `coding_skill` text NOT NULL, `created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), `updated_at` datetime NULL, `deleted_at` datetime NULL);
-- create index "profiles_id_key" to table: "profiles"
CREATE UNIQUE INDEX `profiles_id_key` ON `profiles` (`id`);
-- create "tags" table
CREATE TABLE `tags` (`id` integer NOT NULL PRIMARY KEY AUTOINCREMENT, `name` text NOT NULL, `description` text NULL, `frequency` integer NULL DEFAULT (0), `created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), `updated_at` datetime NULL, `deleted_at` datetime NULL);
-- create index "tags_id_key" to table: "tags"
CREATE UNIQUE INDEX `tags_id_key` ON `tags` (`id`);
-- create index "tags_name_key" to table: "tags"
CREATE UNIQUE INDEX `tags_name_key` ON `tags` (`name`);
-- create "follows" table
CREATE TABLE `follows` (`id` integer NOT NULL PRIMARY KEY AUTOINCREMENT, `followedUser_id` integer NOT NULL, `followingUser_id` integer NOT NULL, `created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), `updated_at` datetime NULL, `deleted_at` datetime NULL);
-- create index "follows_id_key" to table: "follows"
CREATE UNIQUE INDEX `follows_id_key` ON `follows` (`id`);
-- create "readings" table
CREATE TABLE `readings` (`id` integer NOT NULL PRIMARY KEY AUTOINCREMENT, `user_id` integer NOT NULL, `post_id` integer NOT NULL, `created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), `updated_at` datetime NULL, `deleted_at` datetime NULL);
-- create index "readings_id_key" to table: "readings"
CREATE UNIQUE INDEX `readings_id_key` ON `readings` (`id`);
-- create "files" table
CREATE TABLE `files` (`id` integer NOT NULL PRIMARY KEY AUTOINCREMENT, `disk` text NOT NULL, `name` text NOT NULL, `path` text NOT NULL, `type` text NOT NULL, `size` integer NOT NULL, `user_id` integer NOT NULL, `created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), `updated_at` datetime NULL, `deleted_at` datetime NULL);
-- create index "files_id_key" to table: "files"
CREATE UNIQUE INDEX `files_id_key` ON `files` (`id`);
-- create "roles" table
CREATE TABLE `roles` (`id` integer NOT NULL PRIMARY KEY AUTOINCREMENT, `name` text NOT NULL, `description` text NULL, `root` bool NULL, `rule` text NULL, `created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), `updated_at` datetime NULL, `deleted_at` datetime NULL);
-- create index "roles_id_key" to table: "roles"
CREATE UNIQUE INDEX `roles_id_key` ON `roles` (`id`);
-- create "posts_tags" table
CREATE TABLE `posts_tags` (`posts` integer NOT NULL, `tags` integer NOT NULL, `created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), `updated_at` datetime NULL, `deleted_at` datetime NULL);
-- create index "unique_posts_tags" to table: "posts_tags"
CREATE UNIQUE INDEX `unique_posts_tags` ON `posts_tags` (`posts`, `tags`);
-- create "roles_users" table
CREATE TABLE `roles_users` (`roles` integer NOT NULL, `users` integer NOT NULL, `created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), `updated_at` datetime NULL, `deleted_at` datetime NULL);
-- create index "unique_roles_users" to table: "roles_users"
CREATE UNIQUE INDEX `unique_roles_users` ON `roles_users` (`roles`, `users`);
