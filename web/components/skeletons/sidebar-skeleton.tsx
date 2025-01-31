import { Box, SkeletonText, VStack } from '@chakra-ui/react';

interface SidebarSkeletonProps {
  rowCount: number;
}

const SideBarSkeleton: React.FC<SidebarSkeletonProps> = ({ rowCount }) => {
  return (
    <Box w="230px">
      <VStack spacing={4}>
        {[...Array(rowCount)].map((_, index) => (
          <SkeletonText noOfLines={1} w="80%" spacing="1" skeletonHeight="4" key={index} />
        ))}
      </VStack>
    </Box>
  );
};

export default SideBarSkeleton;
