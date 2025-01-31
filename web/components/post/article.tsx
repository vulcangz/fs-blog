'use client';

import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Heading,
  Image,
  Link,
  Stack
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { Markdown } from '@/components/form/text/markdown';
import { Post } from '@/interfaces';
import { formatDate } from '@/lib/utils';

type ArticleProps = { post: Post };

export default function Article({ post }: ArticleProps) {
  const router = useRouter();

  return (
    <Box as="article" mb="4" bg="white" borderRadius="md" overflow="hidden">
      <Box as="header">
        {post.cover_image && (
          <Box>
            <AspectRatio ratio={21 / 9}>
              <Image borderTopRadius="md" src={post.cover_image} alt={post.title} />
            </AspectRatio>
          </Box>
        )}

        <Stack spacing="2" pt="8" px="12">
          <Stack direction="row" align="center" spacing="3" mb="3">
            <Avatar
              name="Author"
              size="sm"
              src={post.user.profile?.image || 'https://api.dicebear.com/9.x/pixel-art/svg'}
            />
            <Box lineHeight="shorter">
              <Box fontWeight="700">
                <Link href={`/${post.user.username}`} color="grey.700">
                  {post.user.username}
                </Link>
              </Box>
              <Box fontSize="xs" color="base.60">
                Posted on {formatDate(post.created_at)}
              </Box>
            </Box>
          </Stack>

          {/* Title */}
          <Heading as="h1" fontSize="4xl" fontWeight="800">
            {post.title}
          </Heading>

          {/* Tags */}
          {post.tags?.length && (
            <ButtonGroup variant="flat" size="sm" spacing="0">
              {post.tags.map((tag, i) => (
                <Button key={i} onClick={() => router.push(`/t/${tag.name}`)} fontWeight="400">
                  #{tag.name}
                </Button>
              ))}
            </ButtonGroup>
          )}
        </Stack>
      </Box>

      {/* Body */}
      <Box py="8" px="12">
        <Markdown>{post.content}</Markdown>
      </Box>
    </Box>
  );
}
