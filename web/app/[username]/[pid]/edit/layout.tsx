'use client';

import { Navbar } from '@/components/layout/navbar';
import { Box, Flex } from '@chakra-ui/react';
import { Fragment } from 'react';

export default function LandingLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Fragment>
      <Flex direction="column">
        <Box w="full" flex="1 auto" p={{ base: 2, lg: 4 }}>
          {children}
        </Box>
      </Flex>
    </Fragment>
  );
}
