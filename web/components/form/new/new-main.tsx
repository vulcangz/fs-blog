import { Flex } from '@chakra-ui/react';
import { memo } from 'react';
import NewMainEdit from './new-main-edit';
import NewMainPreview from './new-main-preview';

type NewMainProps = { edit: boolean };

function NewMain({ edit }: NewMainProps) {
  return (
    <Flex
      h="calc(100vh - 56px - 80px)"
      direction="column"
      borderRadius="md"
      boxShadow="0 0 0 1px var(--chakra-colors-grey-900-rgba)"
      bg="white"
      overflow="auto"
    >
      {edit && <NewMainEdit />}
      {!edit && <NewMainPreview />}
    </Flex>
  );
}

export default memo(NewMain);
