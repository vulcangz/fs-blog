'use client';

import React, { useCallback } from 'react';
import { Box, Button, Flex, Link, Text } from '@chakra-ui/react';
import useAuthModal from '@/hooks/global/use-auth-modal';
import Modal from './modal';

const AuthModal = () => {
  const loginModal = useAuthModal();

  const handleSubmit = useCallback(async () => {
    console.log(loginModal.isOpen);
  }, [loginModal]);

  return (
    <Modal
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit}
      title={'Log in to continue'}
      actionLabel={'Login'}
    >
      <Box color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="xs" ml="2" mb="6">
        <Text>We're a place where coders share, stay up-to-date and grow their careers.</Text>
      </Box>

      <Flex direction="column" align="center">
        <Link href="/enter">
          <Button colorScheme="blue" w="80%" maxW={300} aria-label="/enter">
            Log in
          </Button>
        </Link>
      </Flex>

      <Flex mt={4} mb={6} direction="column" align="center">
        <Link href="/signup">
          <Button variant="link" w="80%" maxW={300} aria-label="/signup">
            Create account
          </Button>
        </Link>
      </Flex>
    </Modal>
  );
};

export default AuthModal;
