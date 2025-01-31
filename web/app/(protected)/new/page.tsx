'use client';

import { Box, Grid, GridItem } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { redirect, useRouter } from 'next/navigation';
import NewBottom from '@/components/form/new/new-bottom';
import NewMain from '@/components/form/new/new-main';
import NewRight from '@/components/form/new/new-right';
import NewTop from '@/components/form/new/new-top';
import { NewSuggestionContext, SuggestionField } from '@/components/form/new/suggestion-context';
import { EditPost } from '@/interfaces';

const New = () => {
  const router = useRouter();
  const { data: sessions, status } = useSession();
  const [edit, setEdit] = useState(true);
  const [suggestionField, setSuggestionField] = useState<SuggestionField>(null);
  const [defaultValues, setDefaultValues] = useState<EditPost>({
    cover_image: null,
    cover_image_url: undefined,
    title: '',
    content: '',
    tags: [],
    tagObjs: []
  });

  const methods = useForm<EditPost>({
    defaultValues
  });

  function onSetEdit(edit: boolean) {
    setDefaultValues(methods.getValues());
    setEdit(edit);
  }

  if (status === 'unauthenticated') {
    redirect('/enter');
  }

  return (
    <>
      <title>New post</title>
      <FormProvider {...methods}>
        <NewSuggestionContext.Provider value={{ suggestionField, setSuggestionField }}>
          <Box
            as="main"
            px={{ base: '2', lg: '4' }}
            background="grey.100"
            data-cy="new-post_component"
          >
            <Grid
              as="form"
              gridTemplateRows="min-content 1fr min-content"
              gridTemplateColumns="64px 7fr 3fr"
              columnGap={{ base: '2', lg: '4' }}
            >
              <GridItem gridColumnStart="1" gridColumnEnd="3">
                <NewTop edit={edit} setEdit={onSetEdit} />
              </GridItem>

              <GridItem gridColumnStart={{ lg: '2' }} gridColumnEnd={{ base: 'span 2', lg: '2' }}>
                <NewMain edit={edit} />
              </GridItem>

              <GridItem>
                <NewRight />
              </GridItem>

              <GridItem gridColumnStart={{ base: '1', lg: '2' }} gridColumnEnd="3">
                <NewBottom />
              </GridItem>
            </Grid>
          </Box>
        </NewSuggestionContext.Provider>
      </FormProvider>
    </>
  );
};

export default New;
