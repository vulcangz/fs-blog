import {
  Box,
  Grid,
  GridItem,
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  VStack
} from '@chakra-ui/react';
import React from 'react';
import useSkeletonColor from '@/hooks/global/use-skeleton-color';

const PostDetailSkeleton = () => {
  const skeletonColor = useSkeletonColor();

  return (
    <Grid
      w="full"
      maxW="7xl"
      m="auto"
      templateColumns={{ base: '4rem 1fr', lg: '4rem 7fr 3fr' }}
      gap={{ base: 2, lg: 4 }}
    >
      <GridItem as="aside" gridRowEnd={{ base: 'span 2', lg: 'initial' }}>
        <VStack mt={6}>
          <SkeletonCircle size="6" {...skeletonColor} />
          <SkeletonText mt="1" noOfLines={1} spacing="2" w="12%" />
          <SkeletonCircle mt={4} size="6" {...skeletonColor} />
          <SkeletonText mt="1" noOfLines={1} spacing="2" w="12%" />
          <SkeletonCircle mt={4} size="6" {...skeletonColor} />
          <SkeletonText mt="1" noOfLines={1} spacing="2" w="12%" />
        </VStack>
      </GridItem>
      <GridItem minW="0">
        <Box bg="transparent" px=".5rem" mx="auto" maxW="750px" flex="1" mt=".5rem">
          <Skeleton h="300px" mt={3} {...skeletonColor} />
          <HStack>
            <SkeletonCircle size="10" {...skeletonColor} />
            <SkeletonText mt="4" noOfLines={2} spacing="2" w="30%" {...skeletonColor} />
          </HStack>
          <SkeletonText
            mt="4"
            noOfLines={30}
            spacing="4"
            w="100%"
            h="24px"
            skeletonHeight="3"
            {...skeletonColor}
          />
        </Box>
      </GridItem>
      <GridItem>
        <VStack>
          <SkeletonCircle size="8" {...skeletonColor} />
          <SkeletonText mt="4" noOfLines={2} spacing="2" w="30%" {...skeletonColor} />
        </VStack>
      </GridItem>
    </Grid>
  );
};

export default PostDetailSkeleton;
