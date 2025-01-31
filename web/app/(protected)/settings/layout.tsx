'use client';

import React from 'react';
import { Box, Container, HStack, Select, Text, useColorModeValue } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useSelectedLayoutSegment } from 'next/navigation';
import styled from '@emotion/styled';
import NavLink from '@/components/misc/navlink';
import { IconBadge } from '@/components/misc/user-interaction-icons';

const MenuText = ({ title, count }: { title: string; count?: any }) => {
  return (
    <HStack justify="space-between">
      <Text>{title}</Text>
      <IconBadge value={count} />
    </HStack>
  );
};

const options = [
  {
    id: 99999,
    label: 'Profile',
    to: '/settings/profile',
    value: 'profile'
  },
  {
    id: 10,
    label: 'Customization',
    to: '/settings/customization',
    value: 'customization'
  },
  {
    id: 20,
    label: 'Notifications',
    to: '/settings/notifications',
    value: 'notifications'
  },
  {
    id: 30,
    label: 'Account',
    to: '/settings/account',
    value: 'account'
  },
  {
    id: 40,
    label: 'Organization',
    to: '/settings/organization',
    value: 'organization'
  },
  {
    id: 50,
    label: 'Extensions',
    to: '/settings/extensions',
    value: 'extensions'
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { status, data: session } = useSession();
  const user = session?.user;
  const segment = useSelectedLayoutSegment();
  const router = useRouter();
  const pathname = usePathname();

  const selectedMenu = pathname.split('/').slice(2, 3).join('');

  const bgColor = useColorModeValue('rgb(59 73 223 / 10%)', 'rgb(49 46 129 / 75%)');
  const hoverColor = useColorModeValue('rgb(47 58 178)', 'rgb(165, 180, 252)');
  const color = useColorModeValue('rgb(64, 64, 64)', 'rgb(212, 212, 212)');

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
    if (pathname === '/settings/allsettings-root') {
      router.push('/settings');
      return;
    }

    router.push(`${pathname}`);
  };

  return (
    <Container pt={4} maxWidth="container.xl" centerContent>
      <Box w="100%" maxW="1280px" flex={1} p={{ md: '.5rem', xl: '1rem' }}>
        <Box px={['.5rem', '.5rem', '0']} mb={3}>
          <Box>Active segment: {segment}</Box>
          <Select
            display={['block', 'block', 'none']}
            mt=".5rem"
            onChange={handleSelect}
            value={selectedMenu}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Box>

        <HStack align="flex-start">
          <Box w="230px" display={{ base: 'none', md: 'block' }}>
            {options.map((option) => (
              <MenuItem
                key={option.id}
                to={option.id === 99999 ? '/settings' : option.to}
                customActiveUrl={option.id === 99999 ? '/settings' : option.value}
                matchMode={option.id === 99999 ? 'exact' : 'includes'}
                activeStyle={activeStyle}
              >
                <MenuText title={option.label} />
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
