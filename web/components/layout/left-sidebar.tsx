'use client';

import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  IconButton,
  Image,
  Link,
  Text,
  Stack
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { memo } from 'react';
import { FaFacebookF } from '@react-icons/all-files/fa/FaFacebookF';
import { FaGithub } from '@react-icons/all-files/fa/FaGithub';
import { FaInstagram } from '@react-icons/all-files/fa/FaInstagram';
import { FaTwitch } from '@react-icons/all-files/fa/FaTwitch';
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter';

import { Intro } from './intro';
import { categories, tags } from '@/data';

type LinkButtonProps = {
  children: ReactNode;
};

type TileProps = {
  children: React.ReactNode;
  href: string;
  disabled?: boolean;
};

function Tile({ children, href, disabled }: TileProps) {
  return (
    <Link
      href={href}
      variant="secondary"
      display="flex"
      alignItems="center"
      px="4"
      py="2"
      borderRadius="md"
      _hover={{
        background: 'primary.400.rgba',
        color: 'primary.600',
        textDecoration: 'underline'
      }}
      cursor={disabled ? 'not-allowed' : 'pointer'}
    >
      {children}
    </Link>
  );
}

const LinkButton = ({ children }: LinkButtonProps) => {
  return (
    <Button
      _hover={{ color: '#323ebe', bg: '#e2e4e6' }}
      bg="transparent"
      width="14rem"
      padding="8px"
      fontWeight="normal"
      justifyContent="flex-start"
    >
      {children}
    </Button>
  );
};

function Stat() {
  return (
    <Stack spacing={3}>
      <Text fontSize="sm">2 Posts Published</Text>
      <hr />
      <Text fontSize="sm">Older #webdev posts</Text>
    </Stack>
  );
}

const MemberLinks = () => {
  return (
    <Box as="nav">
      <LinkButton>
        <Image src="/assets/images/sidebar/home.svg" mr="3" />
        Home
      </LinkButton>
      <LinkButton>
        <Link href="/readinglist">
          <Image src="/assets/images/sidebar/reading.svg" mr="3" />
          Reading List
        </Link>
      </LinkButton>
      <LinkButton>
        <Image src="/assets/images/sidebar/listing.svg" mr="3" />
        Listings
      </LinkButton>
      <LinkButton>
        <Image src="/assets/images/sidebar/podcast.svg" mr="3" />
        Podcasts
      </LinkButton>
      <LinkButton>
        <Image src="/assets/images/sidebar/video.svg" mr="3" />
        Videos
      </LinkButton>
      <LinkButton>
        <Image src="/assets/images/sidebar/tag.svg" mr="3" />
        Tags
      </LinkButton>
      <LinkButton>
        <Text fontWeight="normal" color="#4d5760" ml="2.3rem">
          More...
        </Text>
      </LinkButton>
    </Box>
  );
};

function Category() {
  return (
    <Box as="nav">
      {categories.map((cat) => (
        <LinkButton key={cat.href}>
          <Tile href={cat.href} disabled={cat.disabled}>
            <Box mr="2"> {cat.icon}</Box> {cat.title}
          </Tile>
        </LinkButton>
      ))}
    </Box>
  );
}

function SocialNetwork() {
  return (
    <ButtonGroup as="nav" variant="flat">
      <IconButton aria-label="twitter" icon={<FaTwitter />} title="Twitter" />
      <IconButton aria-label="facebook" icon={<FaFacebookF />} title="Facebook" />
      <IconButton aria-label="github" icon={<FaGithub />} title="Github" />
      <IconButton aria-label="instagram" icon={<FaInstagram />} title="Instagram" />
      <IconButton aria-label="twitch" icon={<FaTwitch />} title="Twitch" />
    </ButtonGroup>
  );
}

function Tag() {
  return (
    <Box as="nav">
      <Heading as="h3" size="sm" p="2">
        Popular Tags
      </Heading>
      <Box maxH="42vh" overflow="auto">
        {tags.map((tag) => (
          <Tile key={tag} href={`/t/${tag}`}>
            #{tag}
          </Tile>
        ))}
      </Box>
    </Box>
  );
}

const LeftSidebar = (props) => {
  const { status } = useSession();

  return (
    <Box as="aside" {...props}>
      {status === 'unauthenticated' ? <Intro /> : null}
      {status === 'unauthenticated' && <Category />}
      {status === 'authenticated' && <MemberLinks />}
      <SocialNetwork />
      <Tag />
    </Box>
  );
};

export default memo(LeftSidebar);
