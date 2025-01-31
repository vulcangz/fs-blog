import {
  Post,
  Tag,
  UpdateProfileForm,
  UpdateUserForm
} from '@/interfaces';
import { PAGE_SIZE } from '@/lib/constants';
import { axiosInstance } from '@/lib/fetcher';
import { FilterParams, FilterObject, getContentFilterQuery, Filter } from './filter';
import { removeBlankAttributes } from '@/lib/utils';

export async function queryPost(
  url: string,
  {
    arg
  }: {
    arg: { select: string; filters: Filter; sort: string; page: number };
  }
) {
  const params: FilterParams = {
    select: arg.select.trim(),
    filter: arg.filters,
    limit: PAGE_SIZE,
    page: arg.page,
    sort: arg.sort.trim()
  };

  const qs = getContentFilterQuery(params);
  await axiosInstance.get(`/content/post/${qs}`);
}

export async function deletePost(
  url: string,
  {
    arg
  }: {
    arg: { pid };
  }
) {
  await axiosInstance.delete(`/content/post/${arg.pid}`);
}

export async function updateUser(
  url: string,
  {
    arg
  }: {
    arg: UpdateUserForm;
  }
) {
  await axiosInstance.put(`/content/user/${arg.id}`, arg);
}

export async function updateProfile(
  url: string,
  {
    arg
  }: {
    arg: UpdateProfileForm;
  }
) {
  const params: FilterParams = {
    filter: {
      user_id: {
        $eq: arg.user_id
      } as FilterObject
    }
  };

  const qs = getContentFilterQuery(params);
  const payload = removeBlankAttributes(arg);

  await axiosInstance.put(`/content/profile/update/?${qs}`, payload);
}

export async function toggleLike(
  url: string,
  {
    arg
  }: {
    arg: {
      userId: number;
      post: Post;
    };
  }
) {
  const userLikes = arg.post.likes ? arg.post.likes.map((obj) => obj.user_id) : [];

  if (userLikes.includes(arg.userId)) {
    await deleteLike(arg.userId, arg.post.id);
  } else {
    await createLike(arg.userId, arg.post.id);
  }
}

export async function toggleReading(
  url: string,
  {
    arg
  }: {
    arg: {
      userId: number;
      post: Post;
    };
  }
) {
  const userReadings = arg.post.readings ? arg.post.readings.map((obj) => obj.user_id) : [];

  if (userReadings.includes(arg.userId)) {
    await deleteReading(arg.userId, arg.post.id);
  } else {
    await createReading(arg.userId, arg.post.id);
  }
}

export async function toggleFollow(
  url: string,
  {
    arg
  }: {
    arg: {
      userId: number;
      post: Post;
    };
  }
) {
  const userFollowings = arg.post.user.following
    ? arg.post.user.following.map((obj) => obj.followingUser_id)
    : [];

  if (userFollowings.includes(arg.userId)) {
    await deleteFollow(arg.userId, arg.post.user.id);
  } else {
    await createFollow(arg.userId, arg.post.user.id);
  }
}

export async function createLike(userId: number, postId: number) {
  await axiosInstance.post(`/content/like`, {
    user_id: userId,
    post_id: postId
  });
}

export const deleteLike = async (userId: number, postId: number) => {
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
  await axiosInstance.delete(`/content/like/delete/?${qs}`);
};

export const createReading = async (userId: number, postId: number) => {
  await axiosInstance.post(`/content/reading`, {
    user_id: userId,
    post_id: postId
  });
};

export const deleteReading = async (userId: number, postId: number) => {
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
  await axiosInstance.delete(`/content/reading/delete/?${qs}`);
};

export const createFollow = async (userId: number, targetUserId: number) => {
  await axiosInstance.post(`/content/follow`, {
    followingUser_id: userId,
    followedUser_id: targetUserId
  });
};

export const deleteFollow = async (userId: number, targetUserId: number) => {
  const params: FilterParams = {
    filter: {
      followingUser_id: {
        $eq: userId
      } as FilterObject,
      followedUser_id: {
        $eq: targetUserId
      } as FilterObject
    }
  };

  const qs = getContentFilterQuery(params);
  await axiosInstance.delete(`/content/follow/delete/?${qs}`);
};

export const createTag = async (name: string) => {
  const res = await axiosInstance.post(`/content/tag`, {
    name: name
  });

  const tagObj = res.data.data;
  console.log('create tag resp=', tagObj);

  if (tagObj) {
    let newTag: Tag = {
      id: tagObj.id,
      name: tagObj.name,
      description: 'created from web user'
    };

    return newTag;
  }

  return null;
};
