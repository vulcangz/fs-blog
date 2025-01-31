import { Box, Heading } from '@chakra-ui/react';
import type { Metadata, NextPage } from 'next';

export const metadata: Metadata = {
  title: 'About Us'
};

const AboutUs: NextPage = () => {
  return (
    <Box py={{ base: '2rem', md: '4rem' }}>
      <Heading as="h2" size="2xl" mb={{ base: '2rem', md: '4rem' }}>
        About Us
      </Heading>
    </Box>
  );
};

export default AboutUs;
