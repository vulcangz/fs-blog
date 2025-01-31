'use client';

import React, { useState } from 'react';
import { Box, Heading, Spinner, Text, useColorModeValue } from '@chakra-ui/react';
import { PrimaryBtn } from '@/components/misc/buttons';
import { SettingsProfileCard } from '@/components/misc/settings-profile-style';
import { Basic, Work, Branding, User, Coding } from '@/components/settings-profile';
import ErrorMessage from '@/components/misc/error-message';
import { useEffect } from 'react';
import { useProfile } from '@/services/queries';
import { useSession } from 'next-auth/react';
import { FormProvider, useForm } from 'react-hook-form';
import { EditProfile } from '@/interfaces';
import { useRouter } from 'next/navigation';
import { uploadFile } from '@/lib/utils';
import { useUpdateProfile, useUpdateUser } from '@/services/mutations';
import { Loading } from '@/components/misc/alert';

const Settings = () => {
  const [loading, setLoading] = useState(false);
  const { status, data: session, update } = useSession();
  const currentUser = session?.user;
  const userId = parseInt(currentUser?.id ?? '');

  const router = useRouter();
  const nameColor = useColorModeValue('light.primary', 'dark.primary');

  const { data, isLoading, error } = useProfile(userId);

  if (!data && !isLoading && error) {
    return <ErrorMessage offline={true} />;
  }

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/signup');
  }, [currentUser]);

  const profile = data?.data.items[0];

  const formContext = useForm<EditProfile>({
    defaultValues: {
      name: profile?.name!,
      nickname: profile?.nickname,
      username: profile?.user.username ?? currentUser?.name,
      email: profile?.user.email!,
      image: profile?.image || '',
      website_url: profile?.website_url,
      user_id: userId,
      github_username: profile?.github_username,
      twitter_username: profile?.twitter_username,
      location: profile?.location,
      bio: profile?.bio,
      learning: profile?.learning,
      hacking: profile?.hacking,
      avaliable: profile?.avaliable,
      work: profile?.work,
      education: profile?.education,
      coding_skill: profile?.coding_skill,
      background: profile?.background,
      brand_color1: profile?.brand_color1
    }
  });

  const {
    getValues,
    formState: { errors },
    handleSubmit,
    setError,
    reset
  } = formContext;

  useEffect(() => {
    setTimeout(() => {
      reset({
        name: currentUser?.name!,
        nickname: currentUser?.nickname,
        username: currentUser?.name,
        email: currentUser?.email!,
        image: profile?.image || '',
        website_url: profile?.website_url,
        user_id: userId,
        github_username: profile?.github_username,
        twitter_username: profile?.twitter_username,
        location: profile?.location,
        bio: profile?.bio,
        learning: profile?.learning,
        hacking: profile?.hacking,
        avaliable: profile?.avaliable,
        work: profile?.work,
        education: profile?.education,
        coding_skill: profile?.coding_skill,
        background: profile?.background,
        brand_color1: profile?.brand_color1
      });
    }, 1000);
  }, [currentUser, profile, reset]);

  const { username, email, ...upf } = getValues();
  const { trigger, isMutating } = useUpdateProfile(upf);

  let uu = { username: username, email: email };
  const { trigger: triggerUser, isMutating: isMutatingUser } = useUpdateUser(userId);

  const onSubmit = async (data) => {
    console.log(data);

    const vals = getValues();
    // upload profile image
    let profileImageUrl: string = '';
    if (vals.profile_image) {
      try {
        setLoading(true);
        const result = await uploadFile(vals.profile_image);
        if (result?.data.data.success.length > 0) {
          profileImageUrl =
            `${process.env.NEXT_PUBLIC_WEB_BASE}/` + result.data.data.success[0].path;
        } else {
          setError('profile_image', { message: 'Unknown error' });
        }
      } catch (e: any) {
        setError('profile_image', { message: e.message ?? 'Unknown error' });
      } finally {
        setLoading(false);
      }
    }

    // update profile
    try {
      const payload = {
        user_id: vals.user_id,
        name: vals.name,
        nickname: vals.nickname,
        bio: vals.bio,
        image: profileImageUrl,
        work: vals.work,
        education: vals.education,
        coding_skill: vals.coding_skill,
        website_url: vals.website_url,
        location: vals.location,
        learning: vals.learning,
        avaliable: vals.avaliable,
        hacking: vals.hacking,
        background: vals.background,
        brand_color1: vals.brand_color1,
        github_username: vals.github_username,
        twitter_username: vals.twitter_username,
        google_username: vals.google_username
      };

      setLoading(true);
      await trigger(payload);
      setLoading(false);

      router.push('/settings');
    } catch (e: any) {
      console.log(e.message ?? 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <FormProvider {...formContext}>
      <Box maxW="720px" w="100%" mt="1rem" px={{ md: '.5rem' }} flex="1">
        <Heading fontSize={{ base: '1.3rem', md: '1.5rem' }} ps=".5rem">
          <Text
            color={nameColor}
            as="span"
            cursor="pointer"
            onClick={() => router.push(`/${currentUser?.name}`)}
          >
            @{currentUser?.name}
          </Text>
        </Heading>

        {/* form */}
        <Box
          as="form"
          maxW="720px"
          mx="auto"
          mt="1rem"
          pos="relative"
          onSubmit={handleSubmit(onSubmit)}
        >
          <User />
          <Basic />
          <Coding />
          <Work />
          <Branding />

          <SettingsProfileCard p="1rem" pos="sticky" bottom="0" zIndex="2" w="100%">
            <PrimaryBtn bg="light.primary" w="100%" disabled={loading || isMutating} type="submit">
              {(loading || isMutating) && <Spinner size="sm" mr={3} />}
              {loading ? 'Updating' : 'Update'} Profile Information.
            </PrimaryBtn>
          </SettingsProfileCard>
        </Box>
      </Box>
    </FormProvider>
  );
};

export default Settings;
