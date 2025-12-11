import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import {
  UserDetailRes,
  PostListRes,
  PostDetailRes,
  LikeListRes,
  FollowListRes,
  ReadingListRes,
  ProfileListRes,
  TagListRes
} from '@/interfaces';
import { Filter, FilterObject, FilterParams, getContentFilterQuery } from './filter';
import { PostBaseURL, PostDetailURL, PAGE_SIZE, MAX_PAGE_SIZE } from '@/lib/constants';
import useSWRMutation from 'swr/mutation';
import fetcher from '@/lib/fetcher';

export function useMe() {
  return useSWR<UserDetailRes>('/auth/me');
}

export function useProfile(userId: number) {
  const params: FilterParams = {
    select:
      'name,nickname,user,image,website_url,location,bio,learning,avaliable,coding_skill,hacking,work,education,background,brand_color1,github_username,twitter_username,google_username',
    filter: {
      user_id: {
        $eq: userId
      } as FilterObject
    }
  };

  const qs = getContentFilterQuery(params);

  return useSWR<ProfileListRes>(userId > 0 ? `/content/profile/?${qs}` : null);
}

export function usePostLikesRequest(postId: number) {
  const params: FilterParams = {
    filter: {
      post_id: {
        $eq: postId
      } as FilterObject
    }
  };

  const qs = getContentFilterQuery(params);

  return useSWR<LikeListRes>(`/content/like/?${qs}`);
}

export function useLikeRequest(postId: number, userId: number) {
  const params: FilterParams = {
    filter: {
      user_id: {
        $eq: userId
      } as FilterObject,
      post_id: {
        $eq: postId
      } as FilterObject
    }
  };

  const qs = getContentFilterQuery(params);

  return useSWR<LikeListRes>(`/content/like/?${qs}`);
}

export function useReadingRequest(postId: number, userId: number, pageSize?: number) {
  const params: FilterParams = {
    select: 'user_id,post_id,post.id,post.title,post.tags',
    limit: pageSize ?? PAGE_SIZE
  };

  if (postId === 0 && userId > 0) {
    params.filter = {
      user_id: {
        $eq: userId
      } as FilterObject
    };
  }

  if (userId === 0 && postId > 0) {
    params.filter = {
      post_id: {
        $eq: postId
      } as FilterObject
    };
  }

  const qs = getContentFilterQuery(params);

  return useSWR<ReadingListRes>(`/content/reading/?${qs}`);
}

export function useReadingInfinite(postId: number, userId: number, tag: string, pageSize?: number) {
  const params: FilterParams = {
    select: 'user_id,post_id,post.id,post.title,post.slug,post.user,post.tags',
    limit: pageSize ?? PAGE_SIZE
  };

  if (postId === 0 && userId > 0) {
    params.filter = {
      user_id: {
        $eq: userId
      } as FilterObject
    };
  }

  if (userId === 0 && postId > 0) {
    params.filter = {
      post_id: {
        $eq: postId
      } as FilterObject
    };
  }

  if (tag) {
    params.filter = {
      ...params.filter,
      'post.tags.name': {
        $eq: tag
      } as FilterObject
    };
  }

  const getKey = (pageIndex: number, previousPageData: ReadingListRes) => {
    if (previousPageData && !previousPageData['data'].items.length) return null;

    params.page = pageIndex + 1;
    const qs = getContentFilterQuery(params);

    return `/content/reading/?${qs}`;
  };

  return useSWRInfinite<ReadingListRes>(getKey);
}

export function useMyFollowed(userId: number) {
  const params: FilterParams = {
    select: 'followedUser_id,followingUser_id,followingUser.username,followingUser.profile',
    filter: {
      followedUser_id: {
        $eq: userId
      } as FilterObject
    }
  };

  const qs = getContentFilterQuery(params);

  return useSWR<FollowListRes>(userId > 0 ? `/content/follow/?${qs}` : null);
}

export function useMyFollowing(userId: number) {
  const params: FilterParams = {
    select: 'followedUser_id,followingUser_id,followedUser.username,followedUser.profile',
    filter: {
      followingUser_id: {
        $eq: userId
      } as FilterObject
    }
  };

  const qs = getContentFilterQuery(params);

  return useSWR<FollowListRes>(userId > 0 ? `/content/follow/?${qs}` : null);
}

export function useFollowRequest(sourceId: number, targetId: number) {
  const params: FilterParams = {
    filter: {
      followingUser_id: {
        $eq: sourceId
      } as FilterObject,
      followedUser_id: {
        $eq: targetId
      } as FilterObject
    }
  };

  const qs = getContentFilterQuery(params);

  return useSWR<FollowListRes>(sourceId > 0 && targetId > 0 ? `/content/follow/?${qs}` : null);
}

export function usePostDetail(slug: string) {
  return useSWR<PostDetailRes>(slug ? `${PostBaseURL}${slug}${PostDetailURL}` : null);
}

export function useAutoSuggest(searchTerm: string | null) {
  const params: FilterParams = {
    select: 'id,title,created_at',
    filter: {
      title: {
        $like: `%${searchTerm}%`
      } as FilterObject
    },
    limit: PAGE_SIZE,
    page: 1
  };

  const qs = getContentFilterQuery(params);

  return useSWR<PostListRes>(searchTerm ? `/content/post/?${qs}` : null);
}

export function useAutoSuggestMutation(searchTerm: string | null) {
  const params: FilterParams = {
    select: 'id,title,slug,created_at',
    filter: {
      title: {
        $like: `%${searchTerm}%`
      } as FilterObject
    },
    limit: PAGE_SIZE,
    page: 1
  };

  const qs = getContentFilterQuery(params);

  return useSWRMutation<PostListRes>(`/content/post/?${qs}`, fetcher, {
    onError() {
      console.error('error');
    },
    onSuccess: (data: any) => {
      // mutate()
    },
    revalidate: true
  });
}

export function useSearch(searchTerm: string, pageIndex: number) {
  const params: FilterParams = {
    select: 'id,cover_image,title,slug,likes,readings,time_to_read,created_at,user.username,tags',
    filter: {
      title: {
        $like: `%${searchTerm}%`
      } as FilterObject
    },
    limit: PAGE_SIZE,
    page: pageIndex
  };

  const qs = getContentFilterQuery(params);

  return useSWR<PostListRes>(searchTerm ? `/content/post/?${qs}` : null);
}

export function useSearchInfinite(searchTerm: string) {
  const params: FilterParams = {
    select: 'id,cover_image,title,slug,likes,readings,time_to_read,created_at,user.username,tags',
    filter: {
      title: {
        $like: `%${searchTerm}%`
      } as FilterObject
    },
    limit: PAGE_SIZE
  };

  const getKey = (pageIndex: number, previousPageData: PostListRes) => {
    if (previousPageData && !previousPageData['data'].items.length) return null;

    params.page = pageIndex + 1;
    const qs = getContentFilterQuery(params);

    return `/content/post/?${qs}`;
  };

  return useSWRInfinite<PostListRes>(getKey);
}

export function useMyDashStat(userId: number) {
  const params: FilterParams = {
    select:
      'id,title,slug,published,view_count,comments_count,share_count,likes,readings,created_at,tags',
    filter: {
      user_id: {
        $eq: userId
      } as FilterObject
    },
    limit: MAX_PAGE_SIZE
  };

  const qs = getContentFilterQuery(params);

  return useSWR<PostListRes>(userId ? `/content/post/?${qs}` : null);
}

// useMyPostsInfinite
// published: 0-false, 1-true, >1-all
export function useMyPostsInfinite(userId: number, published: number) {
  const params: FilterParams = {
    select:
      'id,cover_image,title,slug,published,view_count,comments_count,share_count,likes,readings,created_at,user.username,user.created_at,user.likes,user.following,user.followedBy,user.profile,tags',
    filter: {
      user_id: {
        $eq: userId
      } as FilterObject
    },
    limit: PAGE_SIZE
  };
  if (published < 2) {
    let p = Boolean(published);
    params.filter = {
      ...params.filter,
      published: {
        $eq: p
      } as FilterObject
    };
  }

  const getKey = (pageIndex: number, previousPageData: PostListRes) => {
    if (previousPageData && !previousPageData['data'].items.length) return null;

    params.page = pageIndex + 1;
    const qs = getContentFilterQuery(params);

    return `/content/post/?${qs}`;
  };

  return useSWRInfinite<PostListRes>(getKey);
}

// useUserPostsInfinite
export function useUserPostsInfinite(username: string) {
  const params: FilterParams = {
    select:
      'id,cover_image,title,slug,published,view_count,comments_count,share_count,likes,readings,created_at,user.username,user.created_at,user.likes,user.following,user.followedBy,user.profile,tags',
    filter: {
      'user.username': {
        $eq: username
      } as FilterObject
    },
    limit: PAGE_SIZE
  };

  const getKey = (pageIndex: number, previousPageData: PostListRes) => {
    if (previousPageData && !previousPageData['data'].items.length) return null;

    params.page = pageIndex + 1;
    const qs = getContentFilterQuery(params);

    return `/content/post/?${qs}`;
  };

  return useSWRInfinite<PostListRes>(getKey);
}

export function usePosts(pageIndex: number) {
  const params: FilterParams = {
    select: 'id,cover_image,title,slug,likes,readings,time_to_read,created_at,user.username,tags',
    limit: PAGE_SIZE,
    page: pageIndex
  };

  const qs = getContentFilterQuery(params);

  return useSWR<PostListRes>(`/content/post/?${qs}`);
}

export function usePostsInfinite() {
  const getKey = (pageIndex: number, previousPageData: PostListRes) => {
    if (previousPageData && !previousPageData['data'].items.length) return null;

    const params: FilterParams = {
      select: 'id,cover_image,title,slug,likes,readings,time_to_read,created_at,user.username,tags',
      limit: PAGE_SIZE,
      page: pageIndex + 1
    };

    const qs = getContentFilterQuery(params);

    return `/content/post/?${qs}`;
  };

  return useSWRInfinite<PostListRes>(getKey);
}

export function useTopicInfinite(tag: string) {
  const params: FilterParams = {
    select: 'id,cover_image,title,slug,created_at,user.username,tags',
    filter: {
      'tags.name': {
        $like: `%${tag.trim()}%`
      } as FilterObject
    },
    limit: PAGE_SIZE
  };

  const getKey = (pageIndex: number, previousPageData: PostListRes) => {
    if (previousPageData && !previousPageData['data'].items.length) return null;

    params.page = pageIndex + 1;
    const qs = getContentFilterQuery(params);

    return `/content/post/?${qs}`;
  };

  return useSWRInfinite<PostListRes>(getKey);
}

export function usePostRequest(select: string, filters: Filter, sort: string) {
  const params: FilterParams = {
    select:
      'id,cover_image,title,slug,view_count,comments_count,likes,readings,time_to_read,created_at,user.username,tags', //select.trim(),
    filter: filters,
    limit: PAGE_SIZE,
    sort: sort.trim()
  };

  const getKey = (pageIndex: number, previousPageData: PostListRes) => {
    if (previousPageData && !previousPageData['data'].items.length) return null;

    params.page = pageIndex + 1;
    const qs = getContentFilterQuery(params);

    return `/content/post/?${qs}`;
  };

  return useSWRInfinite<PostListRes>(getKey);
}

export function useTopTags(pageIndex: number) {
  const params: FilterParams = {
    sort: '-frequency',
    limit: PAGE_SIZE,
    page: pageIndex
  };

  const qs = getContentFilterQuery(params);

  return useSWR<TagListRes>(`/content/tag/?${qs}`);
}

export function useQueryTags(name: string, pageIndex?: number) {
  const params: FilterParams = {
    filter: {
      name: {
        $eq: name.trim()
      } as FilterObject
    },
    sort: '-frequency',
    limit: PAGE_SIZE,
    page: pageIndex ?? 1
  };

  const qs = getContentFilterQuery(params);

  return useSWR<TagListRes>(`/content/tag/?${qs}`);
}
