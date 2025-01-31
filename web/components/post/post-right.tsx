'use client';

import { Avatar, Box, Button, Link, Stack, Text } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { Post } from '@/interfaces';
import { useToggleFollow } from '@/services/mutations';
import { formatDate } from '@/lib/utils';
import useAuthModal from '@/hooks/global/use-auth-modal';

type PostMainProps = { dataPost: Post };

export default function RightSidebar({ dataPost }: PostMainProps) {
  const { status, data: session } = useSession();
  const user = session?.user;
  const userId = parseInt(user?.id ?? '');

  const authModal = useAuthModal();
  const { trigger, isMutating } = useToggleFollow(dataPost.id.toString());

  const userFollowings = dataPost.user.following
    ? dataPost.user.following.map((obj) => obj.followingUser_id)
    : [];

  const onFollow = async () => {
    // is the user authenticated ?
    if (status === 'unauthenticated') {
      return authModal.onOpen();
    }
    const result = await trigger(
      { userId: userId, post: dataPost },
      {
        optimisticData: userFollowings && [
          userFollowings.includes(userId)
            ? userFollowings?.filter((fav) => fav !== userId)
            : [...userFollowings, userId]
        ],
        rollbackOnError: true
      }
    );
  };

  const profile = dataPost.user.profile;

  const profileBlock = dataPost.user.profile ? (
    <>
      {profile.bio && <Text color="base.70">{profile.bio}</Text>}

      <Stack spacing="3" color="grey.600">
        {profile.work && (
          <Box>
            <Box fontSize="xs" fontWeight="700" textTransform="uppercase">
              Work
            </Box>
            <Box>{profile.work}</Box>
          </Box>
        )}

        <Box>
          <Box fontSize="xs" fontWeight="700" textTransform="uppercase">
            Joined
          </Box>
          <Box>{formatDate(dataPost.user.created_at)}</Box>
        </Box>
      </Stack>
    </>
  ) : null;

  return (
    <Stack spacing="4">
      <Stack
        spacing="4"
        pb="4"
        px="4"
        bg="white"
        borderTopWidth="32px"
        borderStyle="solid"
        borderColor="black"
        borderRadius="md"
      >
        <Box display="flex" alignItems="center" mt="-4">
          <Link href={`/${dataPost.user.username}`} textDecor="none !important">
            <Stack direction="row" align="end">
              <Avatar
                name="Author"
                src={dataPost.user.profile?.image || 'https://api.dicebear.com/9.x/pixel-art/svg'}
              />
              <Box fontSize="xl" fontWeight="800">
                {dataPost.user.profile ? dataPost.user.profile.nickname : dataPost.user.username}
              </Box>
            </Stack>
          </Link>
        </Box>

        <Button disabled={isMutating} onClick={onFollow} mt="6">
          {userFollowings.includes(userId) ? 'Following' : 'Follow'}
        </Button>

        {profileBlock}
      </Stack>
    </Stack>
  );
}
