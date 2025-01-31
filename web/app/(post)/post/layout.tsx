'use client';

import { Box, Flex } from '@chakra-ui/react';

export default function PostDetailLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex direction="column" pt="5">
      <Box w="full" flex="1 auto" p={{ base: 2, lg: 4 }}>
        {children}
      </Box>
    </Flex>
  );
}
