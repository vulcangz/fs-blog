import { Box, Stack, Link, Text, Tag } from '@chakra-ui/react';
import { memo } from 'react';
import { discuss, challenge } from '@/data';

function Discuss() {
  return (
    <Box background="grey.50" borderRadius="md">
      <Box borderBottom="1px solid" borderColor="grey.100" h="12">
        <Link
          as="h3"
          p="2"
          fontWeight="bold"
          fontSize="1.25rem"
          href="/"
          _hover={{ color: 'primary.600' }}
        >
          #discuss
        </Link>
      </Box>

      <Box>
        {discuss.map((box, i) => (
          <Link
            href="/"
            key={i}
            display="block"
            alignItems="center"
            h="28"
            borderBottom="1px solid"
            borderColor="grey.100"
            _hover={{ background: 'white' }}
          >
            <Text pl="4" pt="4" pr="4">
              {box.title}
            </Text>
            {box.numberCmt == 0 ? (
              <Tag backgroundColor="yellow.300" borderRadius="md">
                New
              </Tag>
            ) : (
              <Text pl="4" pr="4" color="base.60" fontSize="sm">
                {box.numberCmt} comments
              </Text>
            )}
          </Link>
        ))}
      </Box>
    </Box>
  );
}

function Challenge() {
  return (
    <Box background="grey.50" borderRadius="md">
      <Box borderBottom="1px solid" borderColor="grey.50" h="12">
        <Link
          as="h3"
          p="2"
          fontWeight="bold"
          fontSize="1.25rem"
          href="/"
          _hover={{ color: 'primary.600' }}
        >
          #challenge
        </Link>
      </Box>

      <Box>
        {challenge.map((box, i) => (
          <Link
            href="/"
            key={i}
            display="block"
            alignItems="center"
            h="28"
            borderBottom="1px solid"
            borderColor="grey.100"
            _hover={{ background: 'white' }}
          >
            <Text pl="4" pt="4" pr="4">
              {box.title}
            </Text>
            {box.numberCmt == 0 ? (
              <Tag backgroundColor="yellow.300" borderRadius="md">
                New
              </Tag>
            ) : (
              <Text pl="4" pr="4" color="base.60" fontSize="sm">
                {box.numberCmt} comments
              </Text>
            )}
          </Link>
        ))}
      </Box>
    </Box>
  );
}

function RightSidebar() {
  return (
    <Stack as="aside" spacing="4">
      <Discuss />
      <Challenge />
    </Stack>
  );
}

export default memo(RightSidebar);
