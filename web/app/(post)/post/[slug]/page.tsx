'use client';

import { Grid, GridItem } from '@chakra-ui/react';
import { notFound, useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { usePostDetail } from '@/services/queries';
import LeftSidebar from '@/components/post/post-left';
import Article from '@/components/post/article';
import RightSidebar from '@/components/post/post-right';
import ErrorMessage from '@/components/misc/error-message';
import PostDetailSkeleton from '@/components/skeletons/post-detail-skeleton';
import Footer from '@/components/layout/footer';

export default function PostPage() {
  const params = useParams<{ slug: string }>();
  const { data: session } = useSession();
  const user = session?.user!;

  const { data: postData, isLoading, error } = usePostDetail(params.slug);
  const post = postData?.data;

  if (isLoading) {
    return <PostDetailSkeleton />;
  }

  if (error) {
    return <ErrorMessage urlNotFound={true} />;
  }

  if (!post) {
    return notFound();
  }

  return (
    <>
      <title>{post.title}</title>
      <Grid
        w="full"
        maxW="7xl"
        m="auto"
        templateColumns={{ base: '4rem 1fr', lg: '4rem 7fr 3fr' }}
        gap={{ base: 2, lg: 4 }}
      >
        <GridItem as="aside" gridRowEnd={{ base: 'span 2', lg: 'initial' }}>
          <LeftSidebar post={post} />
        </GridItem>
        <GridItem minW="0">
          <Article post={post} />
        </GridItem>
        <GridItem>
          <RightSidebar dataPost={post} />
        </GridItem>
      </Grid>

      {isLoading ? null : <Footer />}
    </>
  );
}
