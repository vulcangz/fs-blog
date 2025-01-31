'use client';

import { Flex, Heading, Image, Text, useColorModeValue } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React from 'react';

const Card = ({ profile, name, username }) => {
  const router = useRouter();

  const handleViewProfile = () => {
    router.push(`/${username}`);
  };

  return (
    <Flex
      shadow={'xs'}
      w="100%"
      className="shadow"
      bg={useColorModeValue('light.cardBg', 'dark.cardBg')}
      p={{ base: '.5rem', sm: '1rem', lg: '1.5rem' }}
      borderRadius="5px"
      align="center"
      direction={{ base: 'row', sm: 'column' }}
    >
      <Image
        src={profile}
        alt="profile"
        boxSize={{ base: '50px', sm: '64px' }}
        objectFit="cover"
        rounded="full"
        mb={{ sm: '.5rem' }}
        mr={{ base: '.5rem', sm: '0' }}
        cursor="pointer"
        onClick={handleViewProfile}
      />
      <Heading
        fontSize="1.2rem"
        color={useColorModeValue('light.headingHover', 'dark.headingHover')}
        cursor="pointer"
        onClick={handleViewProfile}
      >
        {name}
      </Heading>
      <Text>@{username}</Text>
    </Flex>
  );
};

export default Card;
