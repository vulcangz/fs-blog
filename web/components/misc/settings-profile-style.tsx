import { Box, Text, useColorModeValue } from '@chakra-ui/react';

export const SettingsProfileCard = ({ children, ...props }) => {
  return (
    <Box
      bg={useColorModeValue('light.cardBg', 'dark.cardBg')}
      borderRadius="5px"
      className="shadow"
      p="1rem 1rem 1rem"
      mb="1rem"
      {...props}
    >
      {children}
    </Box>
  );
};

export const titleStyles = {
  fontSize: '2xl',
  fontWeight: '700',
  mb: 3
};

export const Label = ({ children, ...props }) => (
  <Text as="label" display="block" {...props}>
    {children}
  </Text>
);

export const SmallLabel = ({ children }) => {
  return (
    <Text
      mb="3"
      fontSize="15px"
      color={useColorModeValue('light.colorTertiary', 'dark.colorTertiary')}
    >
      {children}
    </Text>
  );
};
