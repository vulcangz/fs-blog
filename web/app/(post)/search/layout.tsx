'use client';

import { Box, Flex } from '@chakra-ui/react';
import ChildrenWrapper from './children-wrapper';

export default function LandingLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex direction="column" pt="4">
      <Box w="full" flex="1 auto" p={{ base: 2, lg: 4 }}>
        <ChildrenWrapper>{children}</ChildrenWrapper>
      </Box>
    </Flex>
  );
}
