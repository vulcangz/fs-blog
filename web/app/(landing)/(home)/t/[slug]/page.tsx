'use client';

import { Box, Button, Grid, GridItem } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { Fragment } from 'react';
import { useParams } from 'next/navigation';
import { useTopicInfinite } from '@/services/queries';
import { Loading } from '@/components/misc/alert';
import Sidebar from '@/components/layout/left-sidebar';
import PostCard from '@/components/post/post-card';
import RightSidebar from '@/components/layout/right-sidebar';

const Topic: NextPage = () => {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;

  const { data, setSize, size, isLoading, error } = useTopicInfinite(slug);
  if (isLoading) return <Loading />;
  if (error) return <Box>failed to load</Box>;

  return (
    <Fragment>
      <Grid w="full" maxW="7xl" m="auto" templateColumns="240px 3fr 1fr" gap="4">
        <GridItem>
          <Sidebar d={{ base: 'none', md: 'block' }} />
        </GridItem>
        <GridItem>
          {data?.map((dataItem) => {
            return dataItem.data.items.map((post, i) => <PostCard post={post} i={i} key={i} />);
          })}
          <Box mt={4} textAlign="center" width="100%">
            <Button
              colorScheme="blue"
              onClick={() => setSize(size + 1)}
              isLoading={isLoading}
              loadingText="Loading Posts..."
            >
              Load more
            </Button>
          </Box>
        </GridItem>
        <GridItem>
          <RightSidebar />
        </GridItem>
      </Grid>
    </Fragment>
  );
};

export default Topic;
