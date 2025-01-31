import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/react';

const ReactionBox = ({ count, title, m }) => {
  return (
    <Box
      flex="1"
      textAlign="center"
      boxShadow="xs"
      rounded="md"
      bg={useColorModeValue('light.cardSecondaryBg', 'dark.cardSecondaryBg')}
      className="shadowSecondary"
      p="6"
      m={m}
      borderRadius="5px"
    >
      <Heading>{count}</Heading>
      <Text>{title}</Text>
    </Box>
  );
};

export default ReactionBox;
