import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  useToast
} from '@chakra-ui/react';
import { FcComments } from '@react-icons/all-files/fc/FcComments';
import { useRouter } from 'next/navigation';
import { Post } from '@/interfaces';
import { BookmarkIcon, LikeIcon } from '../misc/user-interaction-icons';
import { RowReactionButton } from '../misc/user-interaction-icons';
import { useSession } from 'next-auth/react';
import { useToggleListReadingPost } from '@/services/mutations';
import { useEffect, useState } from 'react';
import { formatDate } from '@/lib/utils';
import useAuthModal from '@/hooks/global/use-auth-modal';

export default function PostCard({ post, i }: { post: Post; i: any }) {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [userReadings, setUserReadings] = useState<number[]>([]);
  const { status, data: session } = useSession();
  const router = useRouter();
  const toast = useToast();
  const authModal = useAuthModal();
  const user = session?.user;
  const userId = parseInt(user?.id ?? '');

  const { trigger, isMutating } = useToggleListReadingPost(post.id.toString());

  const userLikes = post.likes ? post.likes.map((obj) => obj.user_id) : [];
  const isLiked = userLikes.includes(userId);

  useEffect(() => {
    const userReadings = post.readings ? post.readings.map((obj) => obj.user_id) : [];
    setUserReadings(userReadings);
    const isBookmarked = userReadings.includes(userId);
    setIsBookmarked(isBookmarked);
  }, [post.readings]);

  const likesCount = userLikes.length;
  const likesTxt =
    likesCount > 1 ? `${likesCount} Likes` : likesCount === 1 ? `${likesCount} Like` : '';

  const readingsCount = userReadings.length;
  const readingsTxt = readingsCount > 1 ? `${readingsCount} Likes` : `${likesCount} Like`;

  const onReading = async () => {
    // is the user authenticated ?
    if (status === 'unauthenticated') {
      return authModal.onOpen();
    }

    setIsBookmarked(!isBookmarked);

    const res = await trigger(
      { userId: userId, post: post },
      {
        optimisticData: userReadings && [
          userReadings.includes(userId)
            ? userReadings?.filter((fav) => fav !== userId)
            : [...userReadings, userId]
        ],
        rollbackOnError: true
      }
    );

    const desc = isBookmarked ? 'unbookmarked it' : 'bookmarked it';
    toast({
      status: 'success',
      title: 'ok',
      description: desc
    });
  };

  return (
    <Box
      as="article"
      key={i}
      bg="white"
      boxShadow="0 0 0 1px rgba(23, 23, 23, 0.1)"
      borderRadius="md"
      overflow="hidden"
    >
      {/* Image */}
      {i == 0 && post.cover_image && (
        <AspectRatio ratio={21 / 9}>
          <Image src={post.cover_image} alt={post.title} />
        </AspectRatio>
      )}

      <Stack direction="column" p="5" spacing="2">
        {/* Author */}
        <Stack direction="row" spacing="2">
          <Avatar
            name={post.user?.username || ''}
            size="sm"
            src={post.user?.profile?.image ?? undefined}
          />
          <Box lineHeight="shorter">
            <Box fontSize="sm" fontWeight="500">
              <Link href={`/${post.user?.username}`}>{post.user?.username}</Link>
            </Box>
            <Box fontSize="xs">{formatDate(post.created_at)}</Box>
          </Box>
        </Stack>

        {/* Body */}
        <Stack pl="10" spacing="1">
          <Heading fontSize="3xl">
            <Link href={`/post/${post.id}`}>{post.title}</Link>
          </Heading>

          {/* Tags */}
          {post.tags?.length > 0 && (
            <ButtonGroup variant="flat" size="sm" spacing="0">
              {post.tags?.map((tag, i) => (
                <Button key={i} onClick={() => router.push(`/t/${tag.name}`)} fontWeight="400">
                  #{tag.name}
                </Button>
              ))}
            </ButtonGroup>
          )}

          {/* Buttons */}
          <Flex justify="space-between" align="center">
            <ButtonGroup variant="flat" size="sm" spacing="0">
              {likesCount > 0 ? (
                <RowReactionButton
                  displayValue={false}
                  onClick={() => router.push(`/post/${post.id}`)}
                  value={likesCount}
                  text={likesTxt}
                >
                  <LikeIcon state={isLiked} size="1rem" />
                </RowReactionButton>
              ) : null}

              <Button
                onClick={() => router.push(`/post/${post.id}#comments`)}
                leftIcon={<FcComments />}
                disabled
                fontWeight="400"
              >
                {!post.comments_count && 'Add comment'}
                {post.comments_count == 1 && '1 comment'}
                {post.comments_count > 1 && `${post.comments_count} comments`}
              </Button>
            </ButtonGroup>

            <Stack direction="row" align="center">
              <Box fontSize="xs">
                {post.time_to_read} min{post.time_to_read > 1 && 's'} to read
              </Box>

              <RowReactionButton
                displayValue={false}
                disabled={isMutating}
                onClick={onReading}
                value={readingsCount}
                text=""
              >
                <BookmarkIcon state={isBookmarked} size="1rem" />
              </RowReactionButton>
            </Stack>
          </Flex>
        </Stack>
      </Stack>
    </Box>
  );
}
