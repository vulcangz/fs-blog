'use client';

import { Box, Heading } from '@chakra-ui/react';
import React from 'react';
import { PrimaryBtn } from '@/components/misc/buttons';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useMyPostsInfinite } from '@/services/queries';
import WriteNewPost from '@/components/misc/write-new-post';
import { TableActions } from '@/components/table-with-filter/table-actions';
import { TablePagination } from '@/components/table-with-filter/table-pagination';
import { TableContent } from '@/components/table-with-filter/table-content';
import TableSkeleton from '@/components/skeletons/table-skeleton';

const Page = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const { data, setSize, size, isLoading, error } = useMyPostsInfinite(
    parseInt(String(user?.id)),
    2
  );
  if (isLoading) return <TableSkeleton rowCount={8} headTxt={'Posts'} />;
  if (!isLoading && error) return <Box>failed to load</Box>;

  if (data && data[0].data.total === 0) {
    return (
      <WriteNewPost title="You have not saved any draft yet.">
        <PrimaryBtn bg="light.primary" m="1rem 0 0 0" onClick={() => router.push('/new')}>
          Write your post now
        </PrimaryBtn>
      </WriteNewPost>
    );
  }

  return (
    <Box as="section" py="2">
      <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '6', md: '8' }}>
        <Box overflowX="auto">
          <Heading size="lg" mb="6">
            Posts
          </Heading>
          <TableActions />
          <TableContent data={data} username={user?.name} />
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
