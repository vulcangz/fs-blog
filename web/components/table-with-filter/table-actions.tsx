import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack
} from '@chakra-ui/react';
import * as React from 'react';
import { BsSearch } from '@react-icons/all-files/bs/BsSearch';
import { RiAddFill } from '@react-icons/all-files/ri/RiAddFill';

export const TableActions = () => {
  return (
    <Stack spacing="4" direction={{ base: 'column', md: 'row' }} justify="space-between">
      <HStack>
        <FormControl minW={{ md: '320px' }} id="search">
          <InputGroup size="sm">
            <FormLabel srOnly>Filter by title</FormLabel>
            <InputLeftElement pointerEvents="none" color="gray.400">
              <BsSearch />
            </InputLeftElement>
            <Input rounded="base" type="search" placeholder="Filter by title..." />
          </InputGroup>
        </FormControl>
      </HStack>
      <ButtonGroup size="sm" variant="outline">
        <Button iconSpacing="1" leftIcon={<RiAddFill fontSize="1.25em" />} disabled>
          Show quickie posts
        </Button>
        <Select
          w={{ base: '300px', md: 'unset' }}
          rounded="base"
          size="sm"
          placeholder="Recently Created"
        >
          <option value="published-desc">Recently Published</option>
          <option value="views-desc">Most Views</option>
          <option value="reactions-desc">Most Reactions</option>
          <option value="comments-desc">Most Comments</option>
        </Select>
      </ButtonGroup>
    </Stack>
  );
};

export const TableReadingActions = () => {
  return (
    <Stack spacing="4" direction={{ base: 'column', md: 'row' }} justify="space-between">
      <HStack></HStack>
      <ButtonGroup size="sm" variant="outline">
        <Button width="36" disabled>
          View archive
        </Button>
        <FormControl minW={{ md: '200px' }} id="search">
          <InputGroup size="sm">
            <FormLabel srOnly>Filter by title</FormLabel>
            <InputLeftElement pointerEvents="none" color="gray.400">
              <BsSearch />
            </InputLeftElement>
            <Input rounded="base" type="search" placeholder="Search..." />
          </InputGroup>
        </FormControl>
      </ButtonGroup>
    </Stack>
  );
};
