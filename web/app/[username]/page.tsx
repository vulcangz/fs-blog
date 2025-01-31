'use client';

import PostCard from '@/components/post/post-card';
import DashboardSkeleton from '@/components/skeletons/dashboard-skeleton';
import { useUserPostsInfinite } from '@/services/queries';
import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Stack,
  Text,
  VStack,
  useColorModeValue
} from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import { CardWithAvatar } from '@/components/user-card/card-with-avatar';
import { CardContent } from '@/components/user-card/card-content';
import { UserInfo } from '@/components/user-card/user-info';
import { RiChatFollowUpLine } from '@react-icons/all-files/ri/RiChatFollowUpLine';
import { formatDate } from '@/lib/utils';
import { Navbar } from '@/components/layout/navbar';
import Information from '@/components/misc/snippets';

export default function UserPage() {
  const params = useParams<{ username: string }>();
  const { data, setSize, size, isLoading, error } = useUserPostsInfinite(params.username);
  const textcolor = useColorModeValue('gray.600', 'gray.400');
  const cardShadow = useColorModeValue('0px 18px 40px rgba(112, 144, 176, 0.12)', 'unset');

  if (isLoading) return <DashboardSkeleton />;
  if (!isLoading && error) return <Box>failed to load</Box>;

  const profile = data && data[0].data.items[0].user.profile;

  return (
    <Container pt={4} maxWidth="container.xl" centerContent>
      <Navbar />
      <Box as="section" pt="20" pb="4" position="relative">
        <Box position="absolute" inset="0" height="32" bg="blue.600" />
        <CardWithAvatar
          maxW="xl"
          avatarProps={{
            src: profile?.image,
            name: profile?.name
          }}
          action={
            <Button size="sm" leftIcon={<RiChatFollowUpLine />}>
              Following
            </Button>
          }
        >
          <CardContent>
            <Heading size="lg" fontWeight="extrabold" letterSpacing="tight">
              {profile?.nickname}
            </Heading>
            <Text color={textcolor}>{profile?.work}</Text>
            <UserInfo
              mb="4"
              location={profile?.location || ''}
              website={profile?.website_url || ''}
              memberSince={'Joined ' + formatDate(profile?.created_at)}
              education={profile?.education || ''}
              work={profile?.work || ''}
            />
          </CardContent>
        </CardWithAvatar>
      </Box>

      <HStack align="flex-start">
        <Box w="230px" display={{ base: 'none', md: 'block' }}>
          <VStack spacing={8} p={4} direction="row">
            <Information
              p="2"
              boxShadow="md"
              title="Skills/languages"
              value={profile?.coding_skill || ''}
            />
            <Information
              p="2"
              boxShadow={cardShadow}
              title="Currently learning"
              value={profile?.learning || ''}
            />
            <Information
              p="2"
              boxShadow={cardShadow}
              title="Currently hacking on"
              value={profile?.hacking || ''}
            />
            <Information
              p="2"
              boxShadow={cardShadow}
              title="Available for"
              value={profile?.avaliable || ''}
            />
          </VStack>
        </Box>
        <Box flex="1" ms={{ base: '0 !important', md: '.5rem !important' }}>
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
        </Box>
      </HStack>
    </Container>
  );
}
