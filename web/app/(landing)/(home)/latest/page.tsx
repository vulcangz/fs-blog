import { Fragment } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import Sidebar from '@/components/layout/left-sidebar';
import Listing from '@/components/post/listing';
import IndexMain from '@/components/feed/index-main';
import React from 'react';
import { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: 'FS BLOG Community - Latest posts',
  keywords: 'Latest posts',
  description: 'Latest posts'
};

export default function Index() {
  return (
    <Fragment>
      <Grid w="full" maxW="7xl" m="auto" templateColumns="240px 3fr 1fr" gap="4">
        <GridItem>
          <Sidebar d={{ base: 'none', md: 'block' }} />
        </GridItem>
        <GridItem>
          <IndexMain tabIndex={1} />
        </GridItem>
        <GridItem>
          <Listing d={{ base: 'none', md: 'flex' }} />
        </GridItem>
      </Grid>
    </Fragment>
  );
}
