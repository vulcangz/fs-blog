'use client';

import { Box, Button, ButtonGroup, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import SkeletonCards from './skeleton';
import PostCard from '../post/post-card';
import { usePostRequest } from '@/services/queries';
import { Filter, FilterObject } from '@/services/filter';

type NavButtonsType = {
  selectedTabIndex: number;
  setSelectedTabIndex: (tabIndex: number) => void;
};

function NavButtons({ selectedTabIndex, setSelectedTabIndex }: NavButtonsType) {
  const router = useRouter();

  const buttons = [
    {
      label: 'Relevant',
      url: '/'
    },
    {
      label: 'Latest',
      url: '/latest'
    },
    {
      label: 'Top',
      url: '/top/week'
    }
  ];

  function onClick(index: number) {
    setSelectedTabIndex(index);
    router.push(buttons[index].url);
  }

  return (
    <ButtonGroup variant="ghost" spacing="0">
      {buttons.map(({ label }, index) => (
        <Button
          key={index}
          onClick={() => onClick(index)}
          fontSize="lg"
          fontWeight={index === selectedTabIndex ? 700 : 400}
          color={index === selectedTabIndex ? 'base.100' : 'base.70'}
          _hover={{
            background: 'white',
            color: 'primary.500'
          }}
        >
          {label}
        </Button>
      ))}
    </ButtonGroup>
  );
}

type TabParmsType = {
  tabIndex: number;
};

function PostList({ tabIndex }: TabParmsType) {
  const { status, data: session } = useSession();

  let filter: Filter = {};
  let sort: string = '';
  const today = new Date();
  let ms = today.setHours(0, 0, 0, 0);
  // 365*24*3600*1000
  let y = new Date(ms - 31536000000).toISOString();
  switch (tabIndex) {
    case 0:
      // TODO: Relevant, maybe top likes? most view count? from search keywords?
      filter = {
        created_at: {
          $gte: y
        } as FilterObject
      };
      break;
    case 1:
      sort = '-id';
      break;
    case 2:
      sort = '-view_count';
      break;
    case 3:
      sort = `-id`;
      break;
    default:
      sort = `id`;
  }

  const { data, setSize, size, isLoading, error } = usePostRequest(
    'id,cover_image,title,likes,view_count,comments_count,time_to_read,created_at,user.username,tags',
    filter,
    sort
  );

  if (error) return <Box>failed to load</Box>;
  if (isLoading || !data)
    return (
      <Box mb="8" borderRadius="md">
        <SkeletonCards />
      </Box>
    );

  return (
    <Stack spacing="2">
      {data?.map((dataItem) => {
        return dataItem.data.items.map((post, i) => <PostCard post={post} i={i} key={i} />);
      })}
      <Box mt={4} textAlign="center" width="100%">
        <Button colorScheme="blue" onClick={() => setSize(size + 1)}>
          Load more
        </Button>
      </Box>
    </Stack>
  );
}

export default function IndexMain({ tabIndex }: TabParmsType) {
  const [selectedTabIndex, setSelectedTabIndex] = useState(tabIndex);

  return (
    <Stack as="main" spacing="2">
      <Box as="nav">
        <NavButtons selectedTabIndex={selectedTabIndex} setSelectedTabIndex={setSelectedTabIndex} />
      </Box>
      <Box>
        <PostList tabIndex={selectedTabIndex} />
      </Box>
    </Stack>
  );
}
