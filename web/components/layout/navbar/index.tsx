'use client';

import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  HStack,
  VStack,
  Image,
  Link as CkLink,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  SkeletonText,
  SkeletonCircle
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import Link from 'next/link';
import Container from '../container';
import SearchInput from './search-input';
import { useSession } from 'next-auth/react';
import useSkeletonColor from '@/hooks/global/use-skeleton-color';

type IconButtonProps = {
  children: ReactNode;
};

const WrapIconButton = ({ children }: IconButtonProps) => {
  return (
    <Button
      padding="0.4rem"
      width="auto"
      height="auto"
      borderRadius="100%"
      bg="transparent"
      _hover={{ bg: '#f6f6f6' }}
    >
      {children}
    </Button>
  );
};

type FadeProps = {
  display: boolean;
  children: React.ReactNode;
};

function Fade({ children, display }: FadeProps) {
  return (
    <Box
      width={display ? undefined : 0}
      visibility={display ? 'visible' : 'hidden'}
      opacity={display ? 1 : 0}
      transition="all 300ms, visibility 0ms"
    >
      {children}
    </Box>
  );
}

export function Navbar() {
  const skeletonColor = useSkeletonColor();
  const { status, data: session } = useSession();
  // console.log('navbar status=', status, 'session=', session);
  const user = session?.user;

  return (
    <Box
      py="2"
      boxShadow="sm"
      border="0 solid #e5e7eb"
      position="fixed"
      top="0"
      bg="#fff"
      width="100%"
      zIndex="1"
    >
      <Container>
        <HStack spacing={4}>
          <Link href="/">
            <Image src="/assets/images/logo.svg" />
          </Link>

          <SearchInput size="sm" maxW={{ base: 'none', md: '20rem' }} />

          <Spacer />
          {/* Authenticated */}
          <Fade display={status === 'authenticated'}>
            <HStack spacing={3}>
              <Link href="/new">
                <Button borderRadius="4px" colorScheme="blue">
                  Create a post
                </Button>
              </Link>
              <WrapIconButton>
                <Image src="/assets/images/bell.svg" />
              </WrapIconButton>
              <Menu isLazy>
                <MenuButton as={Button} size="sm" px={0} py={0} rounded="full">
                  <Avatar
                    size={'sm'}
                    src={user?.image || 'https://api.dicebear.com/9.x/pixel-art/svg'}
                  />
                </MenuButton>
                <MenuList
                  zIndex={5}
                  border="1px solid"
                  borderColor="gray.300"
                  boxShadow="4px 4px 0"
                >
                  <CkLink
                    href={`/${user?.name}`}
                    _hover={{ textDecoration: 'none' }}
                    isExternal
                  >
                    <MenuItem>
                      <VStack justify="start" alignItems="left">
                        <Text fontWeight="500">{user?.name}</Text>
                        <Text size="sm" color="gray.500" mt="0 !important">
                          @{user?.name}
                        </Text>
                      </VStack>
                    </MenuItem>
                  </CkLink>
                  <MenuDivider />
                  <MenuItem as="a" href="/dashboard">
                    <Text fontWeight="400">Dashboard</Text>
                  </MenuItem>
                  <MenuItem as="a" href="/new">
                    <Text fontWeight="400">Create Post</Text>
                  </MenuItem>
                  <MenuItem as="a" href="/readinglist">
                    <Text fontWeight="400">Reading List</Text>
                  </MenuItem>
                  <MenuItem as="a" href="/settings">
                    <Text fontWeight="400">Settings</Text>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem as="a" href="/signout_confirm">
                    <Text fontWeight="400">Sign Out</Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </Fade>

          {/* Unauthenticated */}
          <Fade display={status === 'unauthenticated'}>
            <HStack spacing={3}>
              <ButtonGroup spacing="3" flex="1" justifyContent="flex-end">
                <Link href={'/enter'}>
                  <Button variant="flat" fontWeight="400" data-cy="layout_login">
                    Log in
                  </Button>
                </Link>

                <Link href={'/signup'}>
                  <Button colorScheme="blue" color="#3B49DF" variant="outline" fontWeight="600">
                    Create account
                  </Button>
                </Link>
              </ButtonGroup>
            </HStack>
          </Fade>

          {/* loading */}
          <Fade display={status === 'loading'}>
            <HStack spacing={3}>
              <ButtonGroup spacing="3" flex="1" justifyContent="flex-end">
                <SkeletonText noOfLines={3} w="200px" spacing='1' skeletonHeight='2' {...skeletonColor} />
                <SkeletonCircle size="10" />
              </ButtonGroup>
            </HStack>
          </Fade>
        </HStack>
      </Container>
    </Box>
  );
}
