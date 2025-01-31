'use client';

import { Box, Button, ButtonGroup, Heading, useToast, Text } from '@chakra-ui/react';
import type { Metadata, NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Container from '@/components/layout/container';
import ErrorMessage from '@/components/misc/error-message';
import { RefObject, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { deletePost } from '@/services/apis';
import useSWRMutation from 'swr/mutation';
import { useParams, useRouter } from 'next/navigation';
import { useMyPostsInfinite } from '@/services/queries';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Confirm Delete Post'
};

const DeletePost: NextPage = () => {
  const params = useParams<{ username: string; pid: string }>();
  const router = useRouter();
  const toast = useToast();

  const { status, data: session } = useSession();
  const user = session?.user;

  const { mutate } = useMyPostsInfinite(parseInt(String(user?.id)), 2);

  const cancelRef: RefObject<any> = useRef(null);

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = useForm();

  if (status === 'unauthenticated') {
    return <ErrorMessage urlNotFound={true} />;
  }

  const { trigger, isMutating } = useSWRMutation(`/content/post/delete/${params.pid}`, deletePost, {
    onSuccess: () => {
      mutate();

      toast({
        status: 'success',
        description: 'The post was deleted successfully.',
        isClosable: true
      });

      router.push('/dashboard');
    },
    onError: () => {
      toast({
        status: 'error',
        description: 'An error occurred while deleting the post.',
        isClosable: true
      });
    },
    revalidate: true
  });

  const onSubmit = async () => {
    trigger({ pid: params.pid });
  };

  const onClose = async () => {
    router.push('/dashboard');
  };

  return (
    <Container>
      <Box
        pb="30%"
        pt="calc(15% + 50px)"
        px="2%"
        textAlign="center"
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Heading as="h1" mb="2" fontSize="2xl">
          Are you sure you want to delete this article?
        </Heading>
        <Text>
          You cannot undo this action, perhaps you just want to{' '}
          <Link color="blud" href={`${params.username}/${params.pid}/edit`}>
            edit
          </Link>{' '}
          instead?
        </Text>
        <ButtonGroup m={4} gap="4">
          <Button type="submit" colorScheme="red" isLoading={isSubmitting || isMutating}>
            Delete
          </Button>
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => router.push(`${params.username}/${params.pid}/edit`)}
          >
            Edit
          </Button>
          <Button ref={cancelRef} onClick={onClose} isDisabled={isSubmitting}>
            Dismiss
          </Button>
        </ButtonGroup>
      </Box>
    </Container>
  );
};

export default DeletePost;
