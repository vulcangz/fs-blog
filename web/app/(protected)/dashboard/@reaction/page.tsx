'use client';

import { Box } from '@chakra-ui/react';
import ReactionBox from '@/components/misc/reaction-box';
import DashboardSkeleton from '@/components/skeletons/dashboard-skeleton';
import { Post } from '@/interfaces';
import { useMyDashStat } from '@/services/queries';
import { useSession } from 'next-auth/react';

export default function Page() {
  const { data: session } = useSession();
  const user = session?.user;

  const { data, isLoading, error } = useMyDashStat(parseInt(String(user?.id)));

  if (isLoading) return <DashboardSkeleton />;
  if (!isLoading && error) return <Box>failed to load</Box>;

  let publishedPosts: Post[] = [];
  if (data && data?.data.total > 0) {
    data?.data.items.map((post, i) => {
      if (post.published) {
        publishedPosts.push(post);
      }
    });
  }

  const totalPostReaction = publishedPosts?.reduce(
    (count, postItem) => count + (postItem.likes ? postItem.likes.length : 0),
    0
  );
  const totalPostComments = publishedPosts?.reduce(
    (count, postItem) => count + postItem.comments_count,
    0
  );
  const totalPostViewCount = publishedPosts?.reduce(
    (count, postItem) => count + postItem.view_count,
    0
  );

  return (
    <>
      <ReactionBox
        count={totalPostReaction}
        title="Total post reactions"
        m={{ base: '0 0 1.5rem 0', sm: '0 1rem 0 0' }}
      />
      <ReactionBox
        count={totalPostComments}
        title="Total post comments"
        m={{ base: '0 0 1.5rem 0', sm: '0 1rem 0 0' }}
      />
      <ReactionBox
        count={totalPostViewCount}
        title="Total post views"
        m={{ base: '0 0 1.5rem 0', sm: '0 1rem 0 0' }}
      />
    </>
  );
}
