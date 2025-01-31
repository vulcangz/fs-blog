import React from 'react';
import { Box, Input, Text, VStack } from '@chakra-ui/react';
import { titleStyles, SettingsProfileCard, Label } from '@/components/misc/settings-profile-style';
import { EditProfile } from '@/interfaces';
import { useFormContext } from 'react-hook-form';

const Work = () => {
  const { register } = useFormContext<EditProfile>();

  return (
    <SettingsProfileCard>
      <Text {...titleStyles}>Work</Text>

      <VStack spacing={3}>
        <Box w="100%">
          <Label mb=".3rem">Work</Label>
          <Input {...register('work')} placeholder="What do you do?" type="text" />
        </Box>

        <Box w="100%">
          <Label mb=".3rem">Education</Label>
          <Input {...register('education')} placeholder="What did you go to school?" type="text" />
        </Box>
      </VStack>
    </SettingsProfileCard>
  );
};

export default Work;
