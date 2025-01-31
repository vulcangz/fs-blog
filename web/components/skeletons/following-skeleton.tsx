import { Box, Flex, SkeletonCircle, SkeletonText, useColorModeValue } from '@chakra-ui/react';

interface FollowingSkeletonProps {
  rowCount: number;
}

const FollowingSkeleton: React.FC<FollowingSkeletonProps> = ({ rowCount }) => {
  return (
    <Box
      display="grid"
      gridTemplateColumns={{
        sm: 'repeat(2, minmax(0, 1fr))',
        lg: 'repeat(3, minmax(0, 1fr))'
      }}
      gap={{ sm: '.7rem' }}
    >
      {[...Array(rowCount)]?.map((_, index) => (
        <Flex
          shadow={'xs'}
          w="100%"
          className="shadow"
          bg={useColorModeValue('light.cardBg', 'dark.cardBg')}
          p={{ base: '.5rem', sm: '1rem', lg: '1.5rem' }}
          borderRadius="5px"
          align="center"
          direction={{ base: 'row', sm: 'column' }}
        >
          <SkeletonCircle
            boxSize={{ base: '50px', sm: '64px' }}
            rounded="full"
            mb={{ sm: '.5rem' }}
            mr={{ base: '.5rem', sm: '0' }}
            cursor="pointer"
          />
          <SkeletonText noOfLines={1} w="150px" mx="auto" />
          <SkeletonText noOfLines={1} w="150px" mx="auto" />
        </Flex>
      ))}
    </Box>
  );
};

export default FollowingSkeleton;
