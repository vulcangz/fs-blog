'use client';

import { Box, Stack } from '@chakra-ui/react';
import { usePosts } from '@/services/queries';
import PostCard from './post-card';
import { Loading } from '../misc/alert';

export default function Posts({ pageIndex }: { pageIndex: number }) {
  const { data, error, isLoading } = usePosts(pageIndex);
  if (isLoading) return <Loading />;
  if (error) return <Box>failed to load</Box>;

  console.log('Posts data->', data);
  const posts = data?.data.items;

  return (
    <Stack spacing="2">
      {posts?.map((post, i) => (
        <PostCard post={post} i={i} key={i} />
      ))}

      {/* <button onClick={() => setSize(size + 1)}>Load More</button> */}
    </Stack>
  );
}
