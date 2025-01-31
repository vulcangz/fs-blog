'use client';

import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Spacer,
  Stack
} from '@chakra-ui/react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import SkeletonCards from './skeleton';
import { usePostRequest } from '@/services/queries';
import PostCard from '../post/post-card';
import { Filter, FilterObject } from '@/services/filter';

type NavButtonsType = {
  selectedTabIndex: number;
  setSelectedTabIndex: (tabIndex: number) => void;
  selectedSubTabIndex: number;
  setSelectedSubTabIndex: (tabIndex: number) => void;
};

function NavButtons({
  selectedTabIndex,
  setSelectedTabIndex,
  selectedSubTabIndex,
  setSelectedSubTabIndex
}: NavButtonsType) {
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

  const topSubButtons = [
    {
      label: 'Week',
      url: '/top/week'
    },
    {
      label: 'Month',
      url: '/top/month'
    },
    {
      label: 'Year',
      url: '/top/year'
    },
    {
      label: 'Infinity',
      url: '/top/infinity'
    }
  ];

  function onClick(index: number) {
    setSelectedTabIndex(index);
    router.push(buttons[index].url);
  }

  function onSubClick(index: number) {
    setSelectedSubTabIndex(index);
    router.push(topSubButtons[index].url);
  }

  return (
    <Flex>
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
      <Spacer />
      <Stack direction="row" align="end">
        {topSubButtons.map(({ label }, index) => (
          <Button
            key={index}
            onClick={() => onSubClick(index)}
            fontSize="md"
            fontWeight={index === selectedSubTabIndex ? 700 : 400}
            color={index === selectedSubTabIndex ? 'base.100' : 'base.70'}
            _hover={{
              background: 'white',
              color: 'primary.500'
            }}>
            {label}
          </Button>
        ))}
      </Stack>
    </Flex>
  );
}

type TabParmsType = {
  tabIndex: number;
  subTabIndex: number;
};

function PostList({ tabIndex, subTabIndex }: TabParmsType) {
  const pathname = usePathname();
  const { status, data: session } = useSession();
  const user = session?.user!;
  
  let filter: Filter = {};
  let sort: string = '';
  const today = new Date();
  let ms = today.setHours(0, 0, 0, 0);
  // 7*24*3600*1000
  let w = new Date(ms - 604800000).toISOString();
  // 30*24*3600*1000
  let m = new Date(ms - 2592000000).toISOString();
  // 365*24*3600*1000
  let y = new Date(ms - 31536000000).toISOString();
  switch (subTabIndex) {
    case 0:
      filter = {
        created_at: {
          $gte: w
        } as FilterObject
      };
      break;
    case 1:
      filter = {
        created_at: {
          $gte: m
        } as FilterObject
      };
      break;
    case 2:
      filter = {
        created_at: {
          $gte: y
        } as FilterObject
      };
      break;
    default:
      filter = {};
  }

  switch (pathname) {
    case '/latest':
      sort = '-id';
    case '/top':
      sort = '-view_count';
    default:
      sort = 'id';
  }

  const { data, setSize, size, isLoading, error } = usePostRequest(
    'id,cover_image,title,likes,time_to_read,created_at,user.username,tags',
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
  if (data[0].data.total === 0) {
    return <Box>no data</Box>;
  }

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

export default function TopMain({ tabIndex, subTabIndex }: TabParmsType) {
  const [selectedTabIndex, setSelectedTabIndex] = useState(tabIndex);
  const [selectedSubTabIndex, setSelectedSubTabIndex] = useState(subTabIndex);

  return (
    <Stack as="main" spacing="2">
      <Box as="nav">
        <NavButtons
          selectedTabIndex={selectedTabIndex}
          setSelectedTabIndex={setSelectedTabIndex}
          selectedSubTabIndex={selectedSubTabIndex}
          setSelectedSubTabIndex={setSelectedSubTabIndex}
        />
      </Box>
      <Box>
        <PostList tabIndex={selectedTabIndex} subTabIndex={selectedSubTabIndex} />
      </Box>
    </Stack>
  );
}
