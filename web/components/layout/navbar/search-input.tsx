'use client';

import {
  Input,
  Icon,
  InputGroup,
  InputLeftElement,
  Text,
  Box,
  InputRightElement,
  List,
  ListItem
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import debounce from 'lodash.debounce';
import { useAutoSuggestMutation } from '@/services/queries';
import { Post } from '@/interfaces';
import { useRouter } from 'next/navigation';
import useGetSearchTerm from '@/hooks/global/get-search-term';
import { AiOutlineCloseCircle } from '@react-icons/all-files/ai/AiOutlineCloseCircle';

export default function SearchInput({...rest}) {
  const q = useGetSearchTerm('q') || '';
  const [searchTerm, setSearchTerm] = useState(q);
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState<Post[] | undefined>(undefined);
  const router = useRouter();

  const { data, error, trigger, isMutating } = useAutoSuggestMutation(searchTerm);
  // console.log('data->', data);
  if (error) console.log('autosuggest fetch error.');

  const debouncedHandleChange = useMemo(() => debounce(handleChange, 500), []);

  function handleChange(event) {
    event.preventDefault();
    console.log('navbar search event.target->', event.target);
    // reset();

    if (event.target.value) {
      setSearchTerm(event.target.value.trim());

      trigger();
      setOptions(data?.data.items);
      setShowOptions(true);
    }
  }

  //handle 'enter' press event
  const onEnterKey = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      setShowOptions(false);
      console.log('navbar search enter event.target->', event.target);
      if (event.target.value) {
        let q = event.target.value.trim();
        router.push(`/search?q=${q}`);
      }
    }
    if (event?.key?.toLowerCase() === 'escape') {
      handleClear();
    }
  };

  const handleSelect = (value) => {
    console.log('handleSelect value=', value);
    setShowOptions(false);
    router.push(`/post/${value.id}`);
  };

  const handleClear = () => {
    setSearchTerm('');
    setShowOptions(false);
  };

  return (
    <Box position="relative" w="100%" {...rest}>
      <InputGroup>
        <InputLeftElement pointerEvents="none" color="inherit" fontSize="1.2em">
          <Icon boxSize="16px" viewBox="0 0 24 24" focusable="false">
            <path
              fill="currentColor"
              d="M23.384,21.619,16.855,15.09a9.284,9.284,0,1,0-1.768,1.768l6.529,6.529a1.266,1.266,0,0,0,1.768,0A1.251,1.251,0,0,0,23.384,21.619ZM2.75,9.5a6.75,6.75,0,1,1,6.75,6.75A6.758,6.758,0,0,1,2.75,9.5Z"
            ></path>
          </Icon>
        </InputLeftElement>
        <Input
          type="text"
          maxW="26rem"
          value={searchTerm}
          placeholder="Search..."
          onChange={handleChange}
          onKeyDown={onEnterKey}
        />
        {searchTerm && (
          <InputRightElement>
            <AiOutlineCloseCircle color="green.500" cursor="pointer" onClick={handleClear} />
          </InputRightElement>
        )}
      </InputGroup>

      {showOptions && (
        <Box
          position="absolute"
          width="100%"
          maxW="26rem"
          mt={1}
          border="1px"
          borderColor="gray.200"
          shadow="md"
          bg="white"
          zIndex="1"
          maxHeight={'200px'}
          overflowY={'scroll'}
        >
          <List>
            {options?.map((item, index) => (
              <ListItem
                key={index}
                px={3}
                py={2}
                _hover={{ bg: 'gray.100', cursor: 'pointer' }}
                onClick={() => handleSelect(item)}
              >
                <Text>{item.title}</Text>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
}
