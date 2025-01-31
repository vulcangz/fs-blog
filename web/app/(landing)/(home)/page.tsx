import { Fragment } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import Sidebar from '@/components/layout/left-sidebar';
import Listing from '@/components/post/listing';
import IndexMain from '@/components/feed/index-main';
import Meta from '@/components/layout/meta';
import React from 'react';
import { Metadata } from 'next/types';

export const metadata: Metadata = Meta;

export default function Index() {
  return (
    <Fragment>
      <Grid w="full" maxW="7xl" m="auto" templateColumns="240px 3fr 1fr" gap="4">
        <GridItem>
          <Sidebar d={{ base: 'none', md: 'block' }} />
        </GridItem>
        <GridItem>
          <IndexMain tabIndex={0} />
        </GridItem>
        <GridItem>
          <Listing d={{ base: 'none', md: 'flex' }} />
        </GridItem>
      </Grid>
    </Fragment>
  );
}
