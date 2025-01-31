'use client';

import { Box, Button, Grid, GridItem } from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import React, { Fragment } from 'react';
import Sidebar from '@/components/layout/left-sidebar';
import Listing from '@/components/post/listing';
import PostCard from '@/components/post/post-card';
import { Loading } from '@/components/misc/alert';
import { useSearchInfinite } from '@/services/queries';
import Footer from '@/components/layout/footer';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const searchValue = searchParams.get('q') || '';

  const { data, size, setSize, isLoading, error } = useSearchInfinite(searchValue);
  if (!data) return <Loading />;
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
          {size > 0 && data[0].data.last_page > 1 ? (
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
          ) : null}
        </GridItem>
        <GridItem>
          <Listing d={{ base: 'none', md: 'flex' }} />
        </GridItem>
      </Grid>
      
      {isLoading ? null : <Footer />}
    </Fragment>
  );
}
