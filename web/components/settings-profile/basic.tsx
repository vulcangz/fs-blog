import React from 'react';
import { Box, Input, Text, Textarea, VStack } from '@chakra-ui/react';
import { SettingsProfileCard, Label, titleStyles } from '@/components/misc/settings-profile-style';
import { EditProfile } from '@/interfaces';
import { useFormContext } from 'react-hook-form';

const Basic = () => {
  const { register } = useFormContext<EditProfile>();

  return (
    <SettingsProfileCard>
      <Text {...titleStyles}>Basic</Text>

      <VStack spacing={3}>
        <Box w="100%">
          <Label mb=".3rem">Website URL</Label>
          <Input {...register('website_url')} placeholder="https://yoursite.com" type="url" />
        </Box>

        <Box w="100%">
          <Label mb=".3rem">Github</Label>
          <Input
            {...register('github_username')}
            placeholder="https://github.com/username"
            type="url"
          />
        </Box>

        <Box w="100%">
          <Label mb=".3rem">Twitter</Label>
          <Input
            {...register('twitter_username')}
            placeholder="https://twitter.com/username"
            type="url"
          />
        </Box>

        <Box w="100%">
          <Label mb=".3rem">Location</Label>
          <Input {...register('location')} placeholder="Halifax, Nova Scotia" type="text" />
        </Box>

        <Box w="100%">
          <Label mb=".3rem">Bio</Label>

          <Textarea {...register('bio')} placeholder="A Short Bio..." />
        </Box>
      </VStack>
    </SettingsProfileCard>
  );
};

export default Basic;
