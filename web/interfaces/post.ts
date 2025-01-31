import { User } from './user';

export type EditPost = {
  cover_image: File | null;
  title: string;
  content: string;
  tagObjs: Tag[];
  tags: string[];
  cover_image_url: string | undefined;
};

export type PostListResData = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  items: Post[];
};

export interface PostListRes {
  data: PostListResData;
}

export type Post = {
  id: number;
  cover_image: string;
  title: string;
  content: string;
  published: boolean;
  published_at: Date;
  user: User;
  likes: Like[];
  readings: Reading[];
  tags: Tag[];
  view_count: number;
  share_count: number;
  comments_count: number;
  time_to_read: number;
  user_interaction: boolean | undefined;
  created_at: Date;
  updated_at: Date;
};

export interface PostDetailRes {
  data: Post;
}

export type Like = {
  id: number;
  user_id: number;
  post_id: number;
};

export interface LikeListRes {
  data: LikeListResData;
}

export interface LikeListResData {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  items: Like[];
}

export type Reading = {
  id: number;
  user_id: number;
  post_id: number;
  post: Post;
};

export interface ReadingListRes {
  data: ReadingListResData;
}

export interface ReadingListResData {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  items: Reading[];
}

export type Media = {
  id: number;
  url: string;
  name: string;
  size: number;
  type: string;
  disk: string;
  path: string;
};

export type MediaData = {
  success: Media[];
  error: Media[];
};

export interface TagListRes {
  data: TagListResData;
}

export type TagListResData = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  items: Tag[];
};

export type Tag = {
  id: number;
  name: string;
  description: string | undefined;
};

export type TidObj = {
  id: number;
};

export interface ListResult<T = any> {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  data: T[]; 
}

/**
 * @description search request params
 */
export interface SearchParams {
  q: string;
  order: string;
  page: number;
  size?: number;
}

/**
 * @description search response data
 */
export interface SearchResItem {
  object_type: string;
  object: {
    url_title?: string;
    id: string;
    question_id?: string;
    title: string;
    excerpt: string;
    created_at: number;
    vote_count: number;
    answer_count: number;
    accepted: boolean;
    tags: Tag[];
    status?: string;
  };
}

export interface SearchRes extends ListResult<SearchResItem> {
  extra: any;
}
