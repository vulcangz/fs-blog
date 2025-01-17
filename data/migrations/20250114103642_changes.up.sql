-- disable the enforcement of foreign-keys constraints
PRAGMA foreign_keys = off;
-- create "new_posts" table
CREATE TABLE `new_posts` (`id` integer NOT NULL PRIMARY KEY AUTOINCREMENT, `cover_image` text NULL, `title` text NOT NULL, `content` text NOT NULL, `user_id` integer NOT NULL, `published` bool NULL DEFAULT (false), `published_at` datetime NULL, `comments_count` integer NULL DEFAULT (0), `view_count` integer NULL DEFAULT (0), `share_count` integer NULL DEFAULT (0), `time_to_read` integer NULL DEFAULT (0), `user_interaction` bool NULL DEFAULT (false), `mode` integer NOT NULL, `created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), `updated_at` datetime NULL, `deleted_at` datetime NULL);
-- copy rows from old table "posts" to new temporary table "new_posts"
INSERT INTO `new_posts` (`id`, `cover_image`, `title`, `content`, `user_id`, `published`, `comments_count`, `view_count`, `share_count`, `time_to_read`, `user_interaction`, `mode`, `created_at`, `updated_at`, `deleted_at`) SELECT `id`, `cover_image`, `title`, `content`, `user_id`, `published`, `comments_count`, `view_count`, `share_count`, `time_to_read`, `user_interaction`, `mode`, `created_at`, `updated_at`, `deleted_at` FROM `posts`;
-- drop "posts" table after copying rows
DROP TABLE `posts`;
-- rename temporary table "new_posts" to "posts"
ALTER TABLE `new_posts` RENAME TO `posts`;
-- create index "posts_id_key" to table: "posts"
CREATE UNIQUE INDEX `posts_id_key` ON `posts` (`id`);
-- enable back the enforcement of foreign-keys constraints
PRAGMA foreign_keys = on;
