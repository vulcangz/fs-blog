import React from 'react';
import {
  Box,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Skeleton,
  VStack,
  Progress,
  ButtonGroup,
  FormControl,
  HStack,
  Heading,
  Select,
  Stack
} from '@chakra-ui/react';
import { RiAddFill } from '@react-icons/all-files/ri/RiAddFill';

interface TableSkeletonProps {
  rowCount: number;
  headTxt?: string;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({ rowCount, headTxt }) => {
  return (
    <Box overflowX="auto">
      <Heading size="lg" mb="6">
        {headTxt}
      </Heading>

      <Stack spacing="4" direction={{ base: 'column', md: 'row' }} justify="space-between">
        <HStack>
          <Skeleton height="20px" minW={{ md: '320px' }} />
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

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th width="5%" textAlign="center">
              <Skeleton height="20px" width="20px" />
            </Th>
            <Th width="60%" textAlign="center">
              <Flex justifyContent="center">
                <Skeleton height="20px" width="80%" />
              </Flex>
            </Th>
            <Th width="15%" textAlign="center">
              <Flex justifyContent="center">
                <Skeleton height="20px" width="80%" />
              </Flex>
            </Th>
            <Th width="15%" textAlign="center">
              <Flex justifyContent="center">
                <Skeleton height="20px" width="80%" />
              </Flex>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {[...Array(rowCount)].map((_, index) => (
            <Tr key={index}>
              <Td width="5%" textAlign="center">
                <Skeleton height="20px" width="20px" />
              </Td>
              <Td width="60%" textAlign="center">
                <Flex justifyContent="center">
                  <Skeleton height="20px" width="80%" />
                </Flex>
              </Td>
              <Td width="20%" textAlign="center">
                <VStack spacing={1} align="center">
                  <Skeleton width="75%">
                    <Progress value={50} size="md" />
                  </Skeleton>
                </VStack>
              </Td>
              <Td width="15%" textAlign="center">
                <ButtonGroup variant="outline" size="sm">
                  <Button variant="link" colorScheme="red">
                    Delete
                  </Button>
                  <Button variant="link" colorScheme="blue">
                    Edit
                  </Button>
                </ButtonGroup>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default TableSkeleton;
