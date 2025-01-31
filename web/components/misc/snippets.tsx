import { Box, BoxProps, Card, Heading, Text, useColorModeValue } from '@chakra-ui/react';

// https://v2.chakra-ui.com/docs/components/stack#feature-cards-with-stack-component
interface FeatureProps extends BoxProps {
  title: string;
  desc: string;
  descMt?: number;
  isHead?: boolean;
}

export const Feature = (props: FeatureProps) => {
  const { title, desc, descMt, isHead, ...boxProps } = props;
  return (
    <Box shadow="md" borderWidth="1px" {...boxProps}>
      {isHead ? <Heading fontSize="xl">{title}</Heading> : <Text as="b">{title}</Text>}
      <Text mt={descMt ?? 0}>{desc}</Text>
    </Box>
  );
};

// Information Card
// from https://github.com/horizon-ui/horizon-ui-chakra-nextjs
export default function Information(props: {
  title: string;
  value: number | string;
  [x: string]: any;
}) {
  const { title, value, ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';
  const bg = useColorModeValue('white', 'navy.700');
  return (
    <Card bg={bg} {...rest}>
      <Box>
        <Text fontWeight="500" color={textColorSecondary} fontSize="sm">
          {title}
        </Text>
        <Text color={textColorPrimary} fontWeight="500" fontSize="md">
          {value}
        </Text>
      </Box>
    </Card>
  );
}
