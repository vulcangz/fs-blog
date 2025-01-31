import React from 'react';
import { Box, Container, Heading, HStack } from '@chakra-ui/react';
import SideBarSkeleton from './sidebar-skeleton';
import TableSkeleton from './table-skeleton';

const ReadinglistSkeleton = () => {
  return (
    <Container pt={4} maxWidth="container.xl" centerContent>
      <Box w="100%" maxW="1280px" flex={1} p={{ md: '.5rem', xl: '1rem' }}>
        <Box px={['.5rem', '.5rem', '0']} mb={3}>
          <Heading fontSize={{ base: '1.5rem', md: '1.8rem' }} mb=".5rem">
            Reading list
          </Heading>
        </Box>

        <HStack align="flex-start">
          <SideBarSkeleton rowCount={6} />

          <Box flex="1" ms={{ base: '0 !important', md: '.5rem !important' }}>
            <Box as="section" py="12">
              <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '6', md: '8' }}>
                <TableSkeleton rowCount={10} />
              </Box>
            </Box>
          </Box>
        </HStack>
      </Box>
    </Container>
  );
};

export default ReadinglistSkeleton;
