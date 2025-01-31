'use client';

import React from 'react';
import { Box, Container, Heading, HStack, Select, useColorModeValue } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { redirect, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useReadingRequest } from '@/services/queries';
import styled from '@emotion/styled';
import { Tag } from '@/interfaces';
import { MenuText } from '@/components/layout/sidenav';
import NavLink from '@/components/misc/navlink';
import { MAX_PAGE_SIZE } from '@/lib/constants';
import { uniqueFunc } from '@/lib/utils';
import ReadinglistSkeleton from '@/components/skeletons/readinglist-skeleton';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { status, data: session } = useSession();
  const user = session?.user;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedMenu = searchParams.get('selectedTag') || '';

  const bgColor = useColorModeValue('rgb(59 73 223 / 10%)', 'rgb(49 46 129 / 75%)');
  const hoverColor = useColorModeValue('rgb(47 58 178)', 'rgb(165, 180, 252)');
  const color = useColorModeValue('rgb(64, 64, 64)', 'rgb(212, 212, 212)');

  const { data, isLoading, error } = useReadingRequest(
    0,
    parseInt(String(user?.id)),
    MAX_PAGE_SIZE
  );

  if (status === 'unauthenticated') {
    redirect('/signup');
  }

  if (status === 'loading' || isLoading) return <ReadinglistSkeleton />;
  if (!isLoading && error) return <Box>failed to load</Box>;

  if (!data) {
    return <Box>no data</Box>;
  }

  let alltags: Tag[] = [
    {
      id: 99999,
      name: 'All tags',
      description: 'default all tags'
    }
  ];

  data.data.items.map((item) => {
    return item.post.tags.map((ts) => {
      return alltags.push(ts);
    });
  });

  const tags = uniqueFunc(alltags, 'id');

  const MenuItem = styled(NavLink)`
    padding: 0.5rem;
    display: block;
    cursor: pointer;
    border-radius: 5px;
    margin-bottom: 4px;
    color: ${color};

    &:hover {
      background: ${bgColor};
      color: ${hoverColor};
    }
  `;

  const activeStyle = {
    background: bgColor,
    color: hoverColor
  };

  const activeLink = (isActive) => {
    return isActive
      ? {
          background: bgColor,
          color: hoverColor
        }
      : {};
  };

  const handleSelect = ({ target }) => {
    const pathname = target.value.toLowerCase();
    const tpathname = pathname.slice(1);
    if (tpathname === '/readinglist/alltags') {
      router.push('/readinglist');
      return;
    }

    router.push(`/readinglist?selectedTag=${tpathname}`);
  };

  return (
    <Container pt={4} maxWidth="container.xl" centerContent>
      <Box w="100%" maxW="1280px" flex={1} p={{ md: '.5rem', xl: '1rem' }}>
        <Box px={['.5rem', '.5rem', '0']} mb={3}>
          <Heading fontSize={{ base: '1.5rem', md: '1.8rem' }} mb=".5rem">
            Reading list ({data.data.total})
          </Heading>

          <Select
            display={['block', 'block', 'none']}
            mt=".5rem"
            onChange={handleSelect}
            value={selectedMenu}
          >
            {tags.map((tag) => (
              <option key={tag.name} value={tag.name}>
                {tag.name}
              </option>
            ))}
          </Select>
        </Box>

        <HStack align="flex-start">
          <Box w="230px" display={{ base: 'none', md: 'block' }}>
            {tags.map((tag) => (
              <MenuItem
                key={tag.name}
                to={tag.id === 99999 ? '/readinglist' : `/readinglist?selectedTag=` + tag.name}
                customActiveUrl={tag.id === 99999 ? '/readinglist/alltags-root' : tag.name}
                activeStyle={activeStyle}
              >
                <MenuText title={tag.name} isTag />
              </MenuItem>
            ))}
          </Box>

          <Box flex="1" ms={{ base: '0 !important', md: '.5rem !important' }}>
            {children}
          </Box>
        </HStack>
      </Box>
    </Container>
  );
}
