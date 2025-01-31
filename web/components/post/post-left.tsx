'use client';

import {
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  Tooltip,
  useToast
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useCallback, useState } from 'react';
import { FcComments } from '@react-icons/all-files/fc/FcComments';
import { BsThreeDots } from '@react-icons/all-files/bs/BsThreeDots';

import { Share } from '@/data';
import { Post } from '@/interfaces';
import { Loading } from '@/components/misc/alert';
import useAuthModal from '@/hooks/global/use-auth-modal';
import { useToggleLikePost, useToggleReadingPost } from '@/services/mutations';
import { BookmarkIcon, LikeIcon, ReactionButton } from '@/components/misc/user-interaction-icons';

type PostLeftType = {
  post: Post;
};

export default function LeftSidebar({ post }: PostLeftType) {
  const { status, data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toast = useToast();
  const authModal = useAuthModal();
  const user = session?.user;
  const userId = parseInt(user?.id ?? '');
  const isAuthenticated = Boolean(user);

  const { trigger, isMutating } = useToggleLikePost(post.id.toString());

  const { trigger: triggerReading, isMutating: isMutatingReading } = useToggleReadingPost(
    post.id.toString()
  );

  const userLikes = post.likes ? post.likes.map((obj) => obj.user_id) : [];
  const userReadings = post.readings ? post.readings.map((obj) => obj.user_id) : [];

  const isLiked = userLikes.includes(userId);
  const isBookmarked = userReadings.includes(userId);

  const onLike1 = useCallback(async () => {
    // is the user authenticated ?
    if (status === 'unauthenticated') {
      return authModal.onOpen();
    }
    const res = await trigger(
      { userId: userId, post: post },
      {
        optimisticData: userLikes && [
          userLikes.includes(userId)
            ? userLikes?.filter((fav) => fav !== userId)
            : [...userLikes, userId]
        ],
        rollbackOnError: true
      }
    );

    const desc = isLiked ? 'disliked it' : 'liked it';
    toast({
      status: 'success',
      title: 'success',
      description: desc
    });
  }, [isBookmarked, userId, post, authModal, isLiked, trigger]);

  const onLike = async () => {
    // is the user authenticated ?
    if (status === 'unauthenticated') {
      return authModal.onOpen();
    }
    const res = await trigger(
      { userId: userId, post: post },
      {
        optimisticData: userLikes && [
          userLikes.includes(userId)
            ? userLikes?.filter((fav) => fav !== userId)
            : [...userLikes, userId]
        ],
        rollbackOnError: true
      }
    );

    const desc = isLiked ? 'disliked it' : 'liked it';
    toast({
      status: 'success',
      title: 'success',
      description: desc
    });
  };

  const onReading = async () => {
    // is the user authenticated ?
    if (status === 'unauthenticated') {
      return authModal.onOpen();
    }
    const res = await triggerReading(
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
      title: 'success',
      description: desc
    });
  };

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({ description: 'Copied successfully' });
    } catch (err) {
      toast({
        title: 'An error occurred',
        description: err as any,
        status: 'error'
      });
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ButtonGroup variant="flat" position="sticky" inset="0" top="24" w="full" zIndex="1">
      <Stack as="nav" spacing="4" m="auto" textAlign="center">
        <Tooltip label="Like">
          <Flex direction="column" align="center">
            <ReactionButton
              disabled={isMutating}
              onClick={onLike}
              value={userLikes?.length}
              text=""
            >
              <LikeIcon state={isLiked} size="1.5rem" />
            </ReactionButton>
          </Flex>
        </Tooltip>
        <Tooltip label="Jump to Comment">
          <Flex direction="column" align="center">
            <IconButton
              borderRadius="50%"
              fontSize="24px"
              aria-label="Comment"
              icon={<FcComments />}
              colorScheme="yellow"
              disabled
            ></IconButton>
            <Text>{post.comments_count}</Text>
          </Flex>
        </Tooltip>
        <Tooltip label="Save">
          <Flex direction="column" align="center">
            <ReactionButton
              disabled={isMutatingReading}
              onClick={onReading}
              value={userReadings?.length}
              text=""
            >
              <BookmarkIcon state={isBookmarked} size="1.5rem" />
            </ReactionButton>
          </Flex>
        </Tooltip>

        <Popover placement="right-start">
          <PopoverTrigger>
            <IconButton
              borderRadius="50%"
              fontSize="24px"
              aria-label="Save"
              icon={<BsThreeDots />}
            ></IconButton>
          </PopoverTrigger>

          <PopoverArrow />
          <PopoverContent w="max-content" minW="250px">
            <PopoverBody>
              <ButtonGroup variant="flat" w="full">
                <Flex direction="column" w="full">
                  <Button
                    onClick={() => copyToClipboard()}
                    display="inline-block"
                    fontWeight="700"
                    backgroundColor="inherit"
                    textAlign="left"
                  >
                    Copy link
                  </Button>
                  {Share.map((share, i) => (
                    <Button display="inline-block" key={i} fontWeight="400" textAlign="left">
                      {share.text}
                    </Button>
                  ))}
                </Flex>
              </ButtonGroup>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Stack>
    </ButtonGroup>
  );
}
