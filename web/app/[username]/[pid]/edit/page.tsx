'use client';

import { Box, Grid, GridItem } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';
import NewBottom from '@/components/form/new/new-bottom';
import NewMain from '@/components/form/new/new-main';
import NewRight from '@/components/form/new/new-right';
import NewTop from '@/components/form/new/new-top';
import { NewSuggestionContext, SuggestionField } from '@/components/form/new/suggestion-context';
import { EditPost, Tag } from '@/interfaces';
import ErrorMessage from '@/components/misc/error-message';
import { usePostDetail } from '@/services/queries';

const Page = () => {
  const params = useParams<{ pid: string }>();
  const router = useRouter();
  const { data: session, status } = useSession();
  const currentUser = session?.user;
  const [edit, setEdit] = useState(true);
  const [suggestionField, setSuggestionField] = useState<SuggestionField>(null);
  const methods = useForm<EditPost>({});

  const {
    formState: { errors },
    reset
  } = methods;

  const { data: postData, isLoading, error } = usePostDetail(params?.pid);
  const post = postData?.data;

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/signup');
  }, [currentUser]);

  if (!isLoading && !post) {
    return <ErrorMessage offline={true} />;
  }

  useEffect(() => {
    setTimeout(() => {
      const tags = post?.tags.map((tag) => tag.name);
      const tagObjs: Tag[] = [];
      if (post) {
        for (let index = 0; index < post?.tags.length; index++) {
          tagObjs.push(post?.tags[index]);
        }
      }

      reset({
        cover_image_url: post?.cover_image,
        title: post?.title,
        content: post?.content,
        tagObjs: post?.tags,
        tags: tags
      });
    }, 1000);
  }, [post, reset]);

  if (!isLoading && !post) {
    return <ErrorMessage offline={true} />;
  }

  function onSetEdit(edit: boolean) {
    setEdit(edit);
  }

  return (
    <>
      <title>Edit post</title>
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

export default Page;
