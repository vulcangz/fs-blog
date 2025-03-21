'use client';

import { Box } from '@chakra-ui/react';
import React from 'react';
import Card from './card';
import { useSession } from 'next-auth/react';
import { useMyFollowed } from '@/services/queries';
import FollowingSkeleton from '../skeletons/following-skeleton';

const Follower = () => {
  const { status, data: session } = useSession();
  const user = session?.user;

  const { data, isLoading, error } = useMyFollowed(parseInt(String(user?.id)));
  if (isLoading) return <FollowingSkeleton rowCount={3} />;
  if (!isLoading && error) return <Box>failed to load</Box>;

  const followers = data?.data.items;

  if (followers?.length === 0) {
    return <Box>You don't have any followers yet.</Box>;
  }

  return (
    <Box
      display="grid"
      gridTemplateColumns={{
        sm: 'repeat(2, minmax(0, 1fr))',
        lg: 'repeat(3, minmax(0, 1fr))'
      }}
      gap={{ sm: '.7rem' }}
    >
      {followers?.map((userData) => (
        <Card
          key={userData.id}
          name={userData.followingUser.profile.name}
          username={userData.followingUser.username}
          profile={
            userData.followingUser.profile.image === null
              ? userData.followingUser.profile.image
              : 'https://api.dicebear.com/9.x/pixel-art/svg'
          }
        />
      ))}
    </Box>
  );
};

export default Follower;
