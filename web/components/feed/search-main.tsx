'use client';

import { Box, Stack } from '@chakra-ui/react';
import SkeletonCards from './skeleton';
import { usePostRequest } from '@/services/queries';
import PostCard from '../post/post-card';

function PostList() {
  let sort: string = '-view_count';

  const { data, isLoading, error } = usePostRequest(
    'id,cover_image,title,likes,time_to_read,created_at,user.username,tags',
    {},
    sort
  );

  if (error) return <Box>failed to load</Box>;
  if (isLoading || !data)
    return (
      <Box mb="8" borderRadius="md">
        <SkeletonCards />
      </Box>
    );
  if (data[0].data.total === 0) {
    return <Box>no data</Box>;
  }

  const posts = data[0].data.items;

  return (
    <Stack spacing="2">
      {posts.map((post, i) => (
        <PostCard post={post} i={i} key={i} />
      ))}
    </Stack>
  );
}

export default function SearchMain() {
  return (
    <Stack as="main" spacing="2">
      <Box>
        <PostList />
      </Box>
    </Stack>
  );
}
