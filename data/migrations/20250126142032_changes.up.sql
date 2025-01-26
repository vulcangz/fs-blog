-- disable the enforcement of foreign-keys constraints
PRAGMA foreign_keys = off;
-- create "new_profiles" table
CREATE TABLE `new_profiles` (`id` integer NOT NULL PRIMARY KEY AUTOINCREMENT, `name` text NOT NULL, `user_id` integer NOT NULL, `nickname` text NOT NULL, `bio` text NULL, `image` text NULL, `work` text NULL, `education` text NULL, `coding_skill` text NULL, `website_url` text NULL, `location` text NULL, `learning` text NULL, `avaliable` text NULL, `hacking` text NULL, `background` text NULL, `brand_color1` text NULL, `github_username` text NULL, `twitter_username` text NULL, `google_username` text NULL, `created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), `updated_at` datetime NULL, `deleted_at` datetime NULL);
-- copy rows from old table "profiles" to new temporary table "new_profiles"
INSERT INTO `new_profiles` (`id`, `name`, `user_id`, `nickname`, `bio`, `work`, `education`, `coding_skill`, `created_at`, `updated_at`, `deleted_at`) SELECT `id`, `name`, `user_id`, `nickname`, `bio`, `work`, `education`, `coding_skill`, `created_at`, `updated_at`, `deleted_at` FROM `profiles`;
-- drop "profiles" table after copying rows
DROP TABLE `profiles`;
-- rename temporary table "new_profiles" to "profiles"
ALTER TABLE `new_profiles` RENAME TO `profiles`;
-- create index "profiles_id_key" to table: "profiles"
CREATE UNIQUE INDEX `profiles_id_key` ON `profiles` (`id`);
-- create index "profiles_user_id_key" to table: "profiles"
CREATE UNIQUE INDEX `profiles_user_id_key` ON `profiles` (`user_id`);
-- enable back the enforcement of foreign-keys constraints
PRAGMA foreign_keys = on;
