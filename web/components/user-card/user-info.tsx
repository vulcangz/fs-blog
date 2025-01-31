import {
  Divider,
  HStack,
  Icon,
  Stack,
  StackProps,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import * as React from 'react';
import { HiCalendar } from '@react-icons/all-files/hi/HiCalendar';
import { HiLink } from '@react-icons/all-files/hi/HiLink';
import { HiLocationMarker } from '@react-icons/all-files/hi/HiLocationMarker';
import { Feature } from '@/components/misc/snippets';

interface UserInfoProps extends StackProps {
  location: string;
  website: string;
  memberSince: string;
  education: string;
  work: string;
}

export const UserInfo = (props: UserInfoProps) => {
  const { location, website, memberSince, education, work, ...stackProps } = props;
  return (
    <>
      <Stack
        direction={{ base: 'column', sm: 'row' }}
        spacing={{ base: '1', sm: '6' }}
        mt="4"
        fontSize="sm"
        fontWeight="medium"
        color={useColorModeValue('blue.600', 'blue.300')}
        {...stackProps}
      >
        <HStack>
          <Icon as={HiLocationMarker} />
          <Text>{location}</Text>
        </HStack>
        <HStack>
          <Icon as={HiLink} />
          <Text>{website}</Text>
        </HStack>
        <HStack>
          <Icon as={HiCalendar} />
          <Text>{memberSince}</Text>
        </HStack>
      </Stack>
      <Divider />
      <Stack spacing={8} p={4} direction="row">
        <Feature title="Education" desc={education} descMt={0} isHead={false} p={1} />
        <Feature title="Work" desc={work} p={1} />
      </Stack>
    </>
  );
};
