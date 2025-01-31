'use client'

import { Box, Flex } from "@chakra-ui/react";
import { Navbar } from '@/components/layout/navbar'
import ScrollToTopButton from '@/components/misc/scroll-to-top-btn';

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Flex direction="column" pt="14">
      <Navbar />
      <Box w="full" flex="1 auto" p={{ base: 2, lg: 4 }}>
        {children}
      </Box>
      <ScrollToTopButton />
    </Flex>
  )
}
