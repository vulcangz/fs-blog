import useSWRMutation from 'swr/mutation';
import { useMe, usePostDetail, useProfile } from './queries';
import { toggleFollow, toggleLike, toggleReading, updateProfile, updateUser } from './apis';
import { UpdateProfileForm } from '@/interfaces';
import { useSWRConfig } from 'swr';

export const useUpdateUser = (userId: number) => {
  const { mutate } = useMe();

  return useSWRMutation(`/content/user/${userId}`, updateUser, {
    onError() {
      console.error("error");
    },
    onSuccess: (data: any) => {
      mutate();
    },
    revalidate: true
  });
};


export const useUpdateProfile = (profile: UpdateProfileForm) => {
  const { mutate } = useProfile(profile.user_id || 0);

  return useSWRMutation(`/content/profile/update`, updateProfile, {
    onError() {
      console.error("error");
    },
    onSuccess: (data: any) => {
      mutate();
    },
    revalidate: true
  });
};

export const useToggleLikePost = (pid: string) => {
  const { mutate } = usePostDetail(pid);

  return useSWRMutation(`/content/like`, toggleLike, {
    onError() {
      console.error("error");
    },
    onSuccess: (data: any) => {
      mutate();
    },
    revalidate: true
  });
};

export const useToggleReadingPost = (pid: string) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(`/content/reading`, toggleReading, {
    onError() {
      console.error("error");
    },
    onSuccess: (data: any) => {
      mutate(
        key => typeof key === 'string' && key.startsWith('api/content/post/?limit=10&page='),
        undefined,
        { revalidate: true }

      );
    },
    revalidate: true
  });
};


export const useToggleListReadingPost = (pid: string) => {
  return useSWRMutation(`/content/reading`, toggleReading, {
    onError() {
      console.error("error");
    },
    onSuccess: (data: any) => {
      // mutate();
    },
    revalidate: true
  });
};

export const useToggleFollow = (pid: string) => {
  const { mutate } = usePostDetail(pid);

  return useSWRMutation(`/content/follow`, toggleFollow, {
    onError() {
      console.error("error");
    },
    onSuccess: (data: any) => {
      mutate();
    },
    revalidate: true
  });
};
