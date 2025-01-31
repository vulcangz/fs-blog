import { Alert, AlertDescription, AlertIcon, AlertTitle, Center, Spinner } from '@chakra-ui/react';
import { useEffect } from 'react';

export function Error({ error, title = 'Something went wrong' }: { error: any; title?: string }) {
  useEffect(() => console.log(error), [error]);
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{error.toString()}</AlertDescription>
    </Alert>
  );
}

export function Loading() {
  return (
    <Center py={4}>
      <Spinner />
    </Center>
  );
}

export function NotFound({ entity, id }: { entity: string; id: string }) {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle style={{ textTransform: 'capitalize' }}>{entity} not found</AlertTitle>
      <AlertDescription>
        No {entity} exists with id {id}
      </AlertDescription>
    </Alert>
  );
}

export function NoData() {
  return (
    <Alert status="info">
      <AlertIcon />
      <AlertTitle>No data</AlertTitle>
    </Alert>
  );
}
