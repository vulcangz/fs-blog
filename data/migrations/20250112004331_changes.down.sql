-- reverse: drop index "idx_readings_on_user_id_post_id" from table: "readings"
CREATE UNIQUE INDEX `idx_readings_on_user_id_post_id` ON `readings` (`user_id`, `post_id`);
-- reverse: drop index "idx_follows_on_followedUser_id_followingUser_id" from table: "follows"
CREATE UNIQUE INDEX `idx_follows_on_followedUser_id_followingUser_id` ON `follows` (`followedUser_id`, `followingUser_id`);
-- reverse: drop index "idx_likes_on_user_id_post_id" from table: "likes"
CREATE UNIQUE INDEX `idx_likes_on_user_id_post_id` ON `likes` (`user_id`, `post_id`);
