'use client';

import React from 'react';
import { Box, HStack, Text, useColorModeValue } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import styled from '@emotion/styled';
import { IconBadge } from '@/components/misc/user-interaction-icons';
import NavLink from '@/components/misc/navlink';
import { useMyFollowed, useMyFollowing } from '@/services/queries';

const MenuText = ({ title, count }) => {
  return (
    <HStack justify="space-between">
      <Text>{title}</Text>
      <IconBadge value={count} />
    </HStack>
  );
};

const Left = ({ totalPublishedPosts, totalDraftPosts }) => {
  const { status, data: session } = useSession();
  const user = session?.user;
  const pathname = usePathname();

  const { data, isLoading, error } = useMyFollowing(Number(user?.id));
  if (error) return <Box>failed to load my following.</Box>;

  const totalFollowingUsers = data?.data.items.length;

  const {
    data: dataMfd,
    isLoading: isLoadingMfd,
    error: errorMfd
  } = useMyFollowed(Number(user?.id));

  if (errorMfd) return <Box>failed to load my followed.</Box>;

  const totalFollowers = dataMfd?.data.items.length;

  // Not implemented
  const totalFollowingTags = 0;

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

  return (
    <Box w="230px" display={{ base: 'none', md: 'block' }}>
      <MenuItem to="/dashboard" activeStyle={activeLink(pathname === '/dashboard')}>
        <MenuText title="Posts" count={totalPublishedPosts} />
      </MenuItem>

      <MenuItem to="/dashboard/drafts" activeStyle={activeStyle}>
        <MenuText title="Drafts" count={totalDraftPosts} />
      </MenuItem>

      <MenuItem to="/dashboard/following_tags" activeStyle={activeStyle}>
        <MenuText title="Following tags" count={totalFollowingTags} />
      </MenuItem>

      <MenuItem to="/dashboard/followers" activeStyle={activeStyle}>
        <MenuText title="Followers" count={totalFollowers} />
      </MenuItem>

      <MenuItem to="/dashboard/following_users" activeStyle={activeStyle}>
        <MenuText title="Following users" count={totalFollowingUsers} />
      </MenuItem>
    </Box>
  );
};

export default Left;
