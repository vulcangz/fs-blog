'use client';

import React from 'react';
import { Box, Container, Flex, Heading, HStack, Select } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { useSelectedLayoutSegment } from 'next/navigation';
import DashboardSkeleton from '@/components/skeletons/dashboard-skeleton';
import { useMyDashStat } from '@/services/queries';
import { Post, SubCategory } from '@/interfaces';
import Left from '@/components/dashboard/layout/Left';

export default function Layout({
  children,
  reaction
}: {
  children: React.ReactNode;
  reaction: React.ReactNode;
}) {
  const { status, data: session } = useSession();
  const user = session?.user;
  const router = useRouter();
  const pathname = usePathname();
  const selectedMenu = pathname.split('/').slice(2, 3).join('');

  const { data, isLoading, error } = useMyDashStat(parseInt(String(user?.id)));

  if (status === 'loading') {
    return <DashboardSkeleton />;
  }

  if (status !== 'authenticated') {
    redirect('/signup');
  }

  if (isLoading) return <DashboardSkeleton />;
  if (!isLoading && error) return <Box>failed to load</Box>;

  let publishedPosts: Post[] = [];
  let draftPosts: Post[] = [];

  if (data && data?.data.total > 0) {
    data?.data.items.map((post, i) => {
      if (post.published) {
        publishedPosts.push(post);
      } else {
        draftPosts.push(post);
      }
    });
  }

  const totalPublishedPosts = publishedPosts?.length;
  const totalDraftPosts = draftPosts?.length;

  const showReactionBox = pathname === '/dashboard' || pathname === '/dashboard/drafts';

  const handleSelect = ({ target }) => {
    const pathname = target.value.toLowerCase();
    if (pathname === 'posts') {
      router.push('/dashboard');
      return;
    }

    if (pathname === 'following users') {
      router.push('/dashboard/following_users');
      return;
    }

    router.push(`/dashboard/${pathname}`);
  };

  return (
    <Container pt={4} maxWidth="container.xl" centerContent>
      <Box w="100%" maxW="1280px" flex={1} p={{ md: '.5rem', xl: '1rem' }}>
        <Box px={['.5rem', '.5rem', '0']} mb={3}>
          <Heading fontSize={{ base: '1.5rem', md: '1.8rem' }} mb=".5rem">
            Dashboard
          </Heading>

          <Select
            display={['block', 'block', 'none']}
            mt=".5rem"
            onChange={handleSelect}
            value={selectedMenu}
          >
            <option value="posts">Posts</option>
            <option value="drafts">Drafts</option>
            <option value="following_tags">Following Tags</option>
            <option value="followers">Followers</option>
            <option value="following_users">Following users</option>
          </Select>
        </Box>

        {showReactionBox && (
          <Flex mb="1rem" px={['.5rem', '.5rem', '0']} direction={['column', 'row']}>
            {reaction}
          </Flex>
        )}

        <HStack align="flex-start">
          <Left totalPublishedPosts={totalPublishedPosts} totalDraftPosts={totalDraftPosts} />

          <Box flex="1" ms={{ base: '0 !important', md: '.5rem !important' }}>
            {children}
          </Box>
        </HStack>
      </Box>
    </Container>
  );
}
