import { Button, ButtonGroup, Flex, Text, useColorModeValue as mode } from '@chakra-ui/react';
import * as React from 'react';
import { PostListRes, ReadingListRes } from '@/interfaces';

export const TablePagination = ({
  size,
  setSize,
  lastPage,
  isLoading
}: {
  size: number;
  setSize: (
    size: number | ((_size: number) => number)
  ) => Promise<PostListRes[] | ReadingListRes[] | undefined>;
  lastPage: number;
  isLoading: boolean | undefined;
}) => {
  return (
    <React.Fragment>
      {lastPage > 1 ? (
        <Flex align="center" justify="space-between">
          <Text color={mode('gray.600', 'gray.400')} fontSize="sm">
            {size} rows
          </Text>
          <ButtonGroup variant="outline" size="sm">
            <Button
              colorScheme="blue"
              onClick={() => setSize(size + 1)}
              isLoading={isLoading}
              loadingText="Loading Posts..."
            >
              Load more
            </Button>
          </ButtonGroup>
        </Flex>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
};
