import { Box, Link, Stack, Text } from '@chakra-ui/react';

type AuthLayoutProps = {
  children?: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <Box as="main" pb={{ base: 10, lg: 0 }}>
      {children}
    </Box>
  );
};

export default AuthLayout;
