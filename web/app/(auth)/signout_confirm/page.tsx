'use client';

import { Box, Button, Heading } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { signOut, useSession } from 'next-auth/react';
import Container from '@/components/layout/container';
import ErrorMessage from '@/components/misc/error-message';

const SignOut: NextPage = () => {
  const { status } = useSession();

  if (status === 'unauthenticated') {
    return <ErrorMessage urlNotFound={true} />;
  }

  return (
    <>
      <title>Confirm Sign out</title>
      <Container>
        <Box pb="30%" pt="calc(15% + 50px)" px="2%" textAlign="center">
          <Heading as="h1" mb="2" fontSize="2xl">
            Are you sure you want to sign out?
          </Heading>
          <Button
            onClick={() => signOut({ callbackUrl: '/' })}
            size="lg"
            data-cy="sign-out_confirm"
          >
            Yes, sign out
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default SignOut;
