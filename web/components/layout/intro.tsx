'use client';

import {
  Button,
  Card,
  CardHeader,
  CardFooter,
  Heading,
  Link,
  Stack,
  Text
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export function Intro() {
  const router = useRouter();

  return (
    <Card>
      <CardHeader>
        <Heading size="md">
          FS-BLOG Community is a community of 1,000,000 amazing developers
        </Heading>
        <Text pt="2" fontSize="md">
          We're a place where coders share, stay up-to-date and grow their careers.
        </Text>
      </CardHeader>
      <CardFooter>
        <Stack direction="column" spacing="1">
          <Button
            onClick={() => router.push('/signup')}
            colorScheme="blue"
            color="#3B49DF"
            variant="outline"
            fontWeight="600"
          >
            Create account
          </Button>
          <Button onClick={() => router.push('/enter')} variant="flat" fontWeight="400">
            Log in
          </Button>
        </Stack>
      </CardFooter>
    </Card>
  );
}

export function Intro1() {
  const router = useRouter();

  return (
    <Stack
      as="nav"
      boxShadow="0 0 0 1px var(--chakra-colors-grey-900-rgba-2)"
      borderRadius="md"
      background="white"
      p="4"
      spacing="4"
      data-cy="home_introduction"
    >
      <Heading size="md">
        <Link href="/" variant="blue">
          fs-blog
        </Link>{' '}
        is a community of 938,136 amazing developers
      </Heading>
      <Text>We&apos;re a place where coders share, stay up-to-date and grow their careers.</Text>

      <Stack direction="column" spacing="1">
        <Button onClick={() => router.push('/signup')} variant="outline" fontWeight="600">
          Create account
        </Button>

        <Button onClick={() => router.push('/login')} variant="flat" fontWeight="400">
          Log in
        </Button>
      </Stack>
    </Stack>
  );
}
