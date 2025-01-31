'use client';

import { Box, Heading, useColorModeValue as mode } from '@chakra-ui/react';
import React from 'react';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useReadingInfinite } from '@/services/queries';
import DashboardSkeleton from '@/components/skeletons/dashboard-skeleton';
import { TableReadingActions } from '@/components/table-with-filter/table-actions';
import { TablePagination } from '@/components/table-with-filter/table-pagination';
import { TablePostContent } from '@/components/table-with-filter/table-content';
import { Post } from '@/interfaces';
import { MAX_PAGE_SIZE } from '@/lib/constants';
import TableSkeleton from '@/components/skeletons/table-skeleton';
import ErrorMessage from '@/components/misc/error-message';

const Page = () => {
  const router = useRouter();
  const { status, data: session } = useSession();
  const user = session?.user;
  const searchParams = useSearchParams();
  const selectedTag = searchParams.get('selectedTag') || '';

  const { data, size, setSize, isLoading, error } = useReadingInfinite(
    0,
    parseInt(String(user?.id)),
    selectedTag,
    MAX_PAGE_SIZE
  );

  if (status === 'loading') {
    return <DashboardSkeleton />;
  }

  if (status === 'unauthenticated') {
    redirect('/signup');
  }

  if (isLoading) return <TableSkeleton rowCount={10} />;
  if (!isLoading && error) return <Box>failed to load</Box>;

  if (!data) {
    return <ErrorMessage offline={true} />;
  }

  let posts: Post[] = [];
  data.map((dataItem) => {
    return dataItem.data.items.map((item) => {
      return posts.push(item.post);
    });
  });

  return (
    <Box as="section" py="4">
      <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '6', md: '8' }}>
        <Box overflowX="auto">
          <TableReadingActions />
          <TablePostContent data={posts} />
          <TablePagination
            size={(data && data[0].data.total) || 0}
            setSize={setSize}
            lastPage={(data && data[0].data.last_page) || 0}
            isLoading={isLoading}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
