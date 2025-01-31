import { Fragment } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import Sidebar from '@/components/layout/left-sidebar';
import Listing from '@/components/post/listing';
import Main from '@/components/feed/index-main';
import React from 'react';
import { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: 'FS BLOG Community - Top posts this month',
  keywords: 'Top posts this month',
  description: 'Top posts this month'
};

export default function Index() {
  return (
    <Fragment>
      <Grid w="full" maxW="7xl" m="auto" templateColumns="240px 3fr 1fr" gap="4">
        <GridItem>
          <Sidebar d={{ base: 'none', md: 'block' }} />
        </GridItem>
        <GridItem>
          <Main tabIndex={2} />
        </GridItem>
        <GridItem>
          <Listing d={{ base: 'none', md: 'flex' }} />
        </GridItem>
      </Grid>
    </Fragment>
  );
}
