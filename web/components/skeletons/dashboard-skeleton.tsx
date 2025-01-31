import React from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Skeleton,
  SkeletonText,
  useColorModeValue,
  VStack
} from '@chakra-ui/react';
import useSkeletonColor from '@/hooks/global/use-skeleton-color';
import SideBarSkeleton from './sidebar-skeleton';
import TableSkeleton from './table-skeleton';

const DashboardSkeleton = () => {
  const skeletonColor = useSkeletonColor();

  const ReactionBox = ({ m }: { m?: any }) => {
    return (
      <VStack
        flex="1"
        justify="center"
        p="1rem"
        h="200px"
        bg={useColorModeValue('light.cardSecondaryBg', 'dark.cardSecondaryBg')}
        className="shadowSecondary"
        borderRadius="5px"
        m={m}
      >
        <Skeleton h="30px" w="30px" {...skeletonColor} />
        <SkeletonText noOfLines={1} w="150px" mx="auto" {...skeletonColor} />
      </VStack>
    );
  };

  return (
    <Container pt={4} maxWidth="container.xl" centerContent>
      <Box w="100%" maxW="1280px" flex={1} p={{ md: '.5rem', xl: '1rem' }}>
        <Box px={['.5rem', '.5rem', '0']} mb={3}>
          <Heading fontSize={{ base: '1.5rem', md: '1.8rem' }} mb=".5rem">
            Dashboard
          </Heading>
        </Box>

        <Flex mb="1rem" px={['.5rem', '.5rem', '0']} direction={['column', 'row']}>
          <ReactionBox m={{ base: '0 0 .5rem 0', sm: '0 .5rem 0 0' }} />
          <ReactionBox m={{ base: '0 0 .5rem 0', sm: '0 .5rem 0 0' }} />
          <ReactionBox m={{ base: '0 0 .5rem 0', sm: '0 .5rem 0 0' }} />
        </Flex>

        <HStack align="flex-start">
          <SideBarSkeleton rowCount={6} />

          <Box flex="1" ms={{ base: '0 !important', md: '.5rem !important' }}>
            <Box as="section" py="2">
              <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '6', md: '8' }}>
                <TableSkeleton rowCount={10} headTxt={'Posts'} />
              </Box>
            </Box>
          </Box>
        </HStack>
      </Box>
    </Container>
  );
};

export default DashboardSkeleton;
