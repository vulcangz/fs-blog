'use client';

import { Box, Flex, Link, Heading, Text, Spacer, VStack, Skeleton } from '@chakra-ui/react';
import { usePostRequest } from '@/services/queries';

function ListHeading() {
  return (
    <Box borderBottom="1px solid #E2E4E6">
      <Flex align="center" p="3">
        <Heading fontSize="1.25rem">Listings</Heading>
        <Spacer />
        <Link fontSize="14px" color="#3b49df" fontWeight="medium">
          See all
        </Link>
      </Flex>
    </Box>
  );
}

function HashTagDiscussHeading() {
  return (
    <Box borderBottom="1px solid #E2E4E6" p="3">
      <Heading fontSize="20px">#discuss</Heading>
      <Text size="xs" fontSize="11px">
        Discussion threads targeting the whole community
      </Text>
    </Box>
  );
}

function HashTagNewsHeading() {
  return (
    <Box borderBottom="1px solid #E2E4E6" p="3">
      <Heading fontSize="20px">#watercooler</Heading>
      <Text size="xs" fontSize="11px">
        Light, and off-topic conversation.
      </Text>
    </Box>
  );
}

const List = () => {
  const { data, isLoading, error } = usePostRequest(
    'id,title,slug,view_count,created_at,user.username,tags',
    {},
    '-view_count'
  );

  if (error) return <Box>failed to load</Box>;
  if (isLoading || !data)
    return (
      <Box as="section" bg="white" borderRadius="md" border="1px solid #E2E4E6" width="100%">
        <ListHeading />
        {[1, 2, 3, 4, 5].map((id) => {
          return (
            <Box borderBottom="1px solid #E2E4E6" width="100%" p="3" key={id}>
              <Skeleton height="15vh" borderRadius="5px" width="100%" />
            </Box>
          );
        })}
      </Box>
    );

  if (data[0].data.total === 0) {
    return <Box>no data</Box>;
  }
  const posts = data[0].data.items;

  return (
    <Box as="section" bg="white" borderRadius="md" border="1px solid #E2E4E6">
      <HashTagDiscussHeading />
      {posts.slice(0, 7).map((list, index) => (
        <ListBox title={list.title} category={list.view_count} slug={list.slug} key={index} />
      ))}
    </Box>
  );
};

const ListBox = ({ title, category, slug }) => {
  return (
    <Link href={`/post/${slug}`} _hover={{ textDecoration: 'none', color: 'blue' }} isExternal>
      <Box borderBottom="1px solid #E2E4E6" _hover={{ bg: 'gray.50' }}>
        <Box p="3">
          <Text>{title}</Text>
          <Text mt="2" color="#4d5760" fontSize="14px">
            {category} views
          </Text>
        </Box>
      </Box>
    </Link>
  );
};

const News = () => {
  return (
    <Box as="section" bg="white" borderRadius="md" border="1px solid #E2E4E6">
      <HashTagNewsHeading />
      {[
        {
          title: 'Javascript developer (~ 2 YOE) looking for remote work',
          category: 'events',
          slug: ''
        },
        {
          title: 'Want to know how a JavaScript framework works under the hood?',
          category: 'education',
          slug: ''
        },
        { title: 'Pair Programming with Jhey', category: 'events', slug: '' }
      ].map((news, index) => (
        <ListBox title={news.title} category={news.category} slug={news.slug} key={index} />
      ))}
    </Box>
  );
};

const Listing = (props) => {
  return (
    <VStack as="aside" spacing="4" {...props}>
      <List />
      <News />
    </VStack>
  );
};

export default Listing;
