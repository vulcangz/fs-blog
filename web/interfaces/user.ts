import { Like } from './post';

export type SimpleUser = {
  id: number;
  created_at: Date;
  updated_at: Date;
};

export type User = SimpleUser & {
  id: number;
  username: string | undefined;
  email: string;
  role: number;
  profile: Profile;
  likes: Like[];
  following: Follow[];
  followedBy: Follow[];
  followerCount: number;
  followingCount: number;
  trendingPoint: number;
};

export type UpdateUserForm = {
  id: number;
  username?: string;
  email?: string;
};

export type CreateOAuthUserReq = {
  username?: string;
  email?: string | null | undefined;
  provider?: string;
  provider_id: string | null | undefined;
  provider_username: string | null | undefined;
};

export interface CreateUserResp {
  data: Profile;
}

export interface UserDetailRes {
  data: User;
}

export type Follow = {
  id: number;
  followingUser_id: number;
  followedUser_id: number;
  followedUser: User;
  followingUser: User;
};

export interface FollowListRes {
  data: FollowListResData;
}

export interface FollowListResData {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  items: Follow[];
}

export type Profile = {
  name: string;
  nickname: string;
  image: string | undefined;
  bio: string;
  work: string;
  education: string;
  coding_skill: string;
  user_id: number;
  user: User;
  website_url: string;
  location: string;
  learning: string;
  hacking: string;
  avaliable: string;
  background: string;
  brand_color1: string;
  github_username: string;
  twitter_username: string;
  google_username: string;
  created_at: Date;
  updated_at: Date;
};

export interface ProfileListRes {
  data: ProfileListResData;
}

export interface ProfileListResData {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  items: Profile[];
}

export type UpdateProfileForm = {
  name: string;
  nickname: string;
  image: string;
  user_id: number;
  // basic
  website_url: string;
  location: string;
  bio: string;
  // coding
  learning: string;
  avaliable: string;
  coding_skill: string;
  hacking: string;
  // work
  work: string;
  education: string;
  // appearance
  background: string;
  brand_color1: string;
  // connect
  github_username: string | null | undefined;
  twitter_username: string | null | undefined;
  google_username: string | null | undefined;
};

export interface UpdateProfileRes {
  data: Profile;
}

export type EditProfile = UpdateProfileForm & {
  // User
  username?: string | null | undefined;
  email: string;
  profile_image?: File | null;
};

export type EditProfile1 = {
  // User
  username: string;
  email: string;
  // Profile
  name: string;
  nickname: string;
  profile_image: File | undefined;
  image: string;
  user_id: number;
  // basic
  website_url: string;
  location: string;
  bio: string;
  // coding
  learning: string;
  avaliable: string;
  coding_skill: string;
  hacking: string;
  // personal
  // Pronouns: string;
  // work
  work: string;
  education: string;
  // appearance
  background: string;
  brand_color1: string;
  // connect
  github_username: string;
  twitter_username: string;
  google_username: string;
};
