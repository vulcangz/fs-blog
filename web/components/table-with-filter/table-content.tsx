import {
  Badge,
  Button,
  ButtonGroup,
  Link,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue as mode
} from '@chakra-ui/react';
import * as React from 'react';
import { nanoid } from 'nanoid';
import { Post, PostListRes } from '@/interfaces';
import { pluck } from '@/lib/utils';
import { useRouter } from 'next/navigation';

function StatusCell(data: any) {
  return (
    <Badge fontSize="xs" colorScheme={data ? 'green' : 'orange'}>
      {data ? 'Active' : 'Draft'}
    </Badge>
  );
}

const columns = [
  {
    Header: 'ID',
    accessor: 'id'
  },
  {
    Header: 'Title',
    accessor: 'title'
  },
  {
    Header: 'Status',
    accessor: 'published',
    Cell: StatusCell
  }
];

export const TableContent = ({
  data,
  username
}: {
  data: PostListRes[] | undefined;
  username?: string | null | undefined;
}) => {
  const router = useRouter();

  return (
    <Table my="8" borderWidth="1px" fontSize="sm">
      <Thead bg={mode('gray.50', 'gray.800')}>
        <Tr>
          {columns.map((column, index) => (
            <Th whiteSpace="nowrap" scope="col" key={index}>
              {column.Header}
            </Th>
          ))}
          <Th />
        </Tr>
      </Thead>
      <Tbody>
        {data?.map((dataItem) => {
          const trows = pluck(dataItem.data.items, ['id', 'title', 'published']);
          return trows.map((row, i) => (
            <Tr key={nanoid()}>
              {columns.map((column, index) => {
                const cell = row[index];
                const element = column.Cell?.(cell) ?? cell;

                return (
                  <Td whiteSpace="nowrap" key={nanoid()}>
                    <Link href={`/post/${row[0]}`}>{element}</Link>
                  </Td>
                );
              })}
              <Td textAlign="right">
                <ButtonGroup variant="outline" size="sm">
                  <Button
                    variant="link"
                    colorScheme="red"
                    onClick={() => router.push(`/${username}/${row[0]}/delete_confirm`)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="link"
                    colorScheme="blue"
                    onClick={() => router.push(`/${username}/${row[0]}/edit`)}
                  >
                    Edit
                  </Button>
                </ButtonGroup>
              </Td>
            </Tr>
          ));
        })}
      </Tbody>
    </Table>
  );
};

const readinglistColumns = [
  {
    Header: 'ID',
    accessor: 'id'
  },
  {
    Header: 'Title',
    accessor: 'title'
  }
];

export const TablePostContent = ({ data }: { data: Post[] | undefined }) => {
  const router = useRouter();

  return (
    <Table my="8" borderWidth="1px" fontSize="sm">
      <Thead bg={mode('gray.50', 'gray.800')}>
        <Tr>
          {readinglistColumns.map((column, index) => (
            <Th whiteSpace="nowrap" scope="col" key={index}>
              {column.Header}
            </Th>
          ))}
          <Th />
        </Tr>
      </Thead>
      <Tbody>
        {data?.map((row, i) => (
          <Tr key={row.id}>
            <Td whiteSpace="nowrap" key={nanoid()}>
              {row.id}
            </Td>
            <Td whiteSpace="nowrap" key={nanoid()}>
              {row.title}
            </Td>
            <Td textAlign="right">
              <ButtonGroup size="sm">
                <Button variant="solid" colorScheme="gray">
                  Archive
                </Button>
              </ButtonGroup>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export const TablePostContent1 = ({ data }: { data: Post[] | undefined }) => {
  const router = useRouter();

  return (
    <Table my="8" borderWidth="1px" fontSize="sm">
      <Thead bg={mode('gray.50', 'gray.800')}>
        <Tr>
          {columns.map((column, index) => (
            <Th whiteSpace="nowrap" scope="col" key={index}>
              {column.Header}
            </Th>
          ))}
          <Th />
        </Tr>
      </Thead>
      <Tbody>
        {data?.map((row, i) => (
          <Tr key={row.id}>
            <Td whiteSpace="nowrap" key={nanoid()}>
              {row.id}
            </Td>
            <Td whiteSpace="nowrap" key={nanoid()}>
              {row.title}
            </Td>
            <Td whiteSpace="nowrap" key={nanoid()}>
              {StatusCell(row.published)}
            </Td>
            <Td textAlign="right">
              <ButtonGroup variant="outline" size="sm">
                <Button
                  variant="link"
                  colorScheme="red"
                  onClick={() => router.push(`/${row.user.username}/${row.id}/delete_confirm`)}
                >
                  Delete
                </Button>
                <Button
                  variant="link"
                  colorScheme="blue"
                  onClick={() => router.push(`/${row.user.username}/${row.id}/edit`)}
                >
                  Edit
                </Button>
              </ButtonGroup>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
