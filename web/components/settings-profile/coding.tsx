import React from 'react';
import { Box, Text, Textarea, VStack } from '@chakra-ui/react';
import {
  titleStyles,
  SettingsProfileCard,
  SmallLabel,
  Label
} from '@/components/misc/settings-profile-style';
import { EditProfile } from '@/interfaces';
import { useFormContext } from 'react-hook-form';

const Coding = () => {
  const { register } = useFormContext<EditProfile>();

  return (
    <SettingsProfileCard>
      <Text {...titleStyles}>Coding</Text>

      <VStack spacing={3}>
        <Box w="100%">
          <Label>Currently learning</Label>
          <SmallLabel>
            What are you learning right now? What are the new tools and languages you're picking up
            right now?
          </SmallLabel>
          <Textarea {...register('learning')} />
        </Box>

        <Box w="100%">
          <Label>Skill / language</Label>
          <SmallLabel>
            What tools and languages are you most experienced with? Are you specialized or more of a
            generalist?
          </SmallLabel>
          <Textarea
            {...register('coding_skill')}
            placeholder="Any languages, frameworks, etc. to highlight?"
          />
        </Box>

        <Box w="100%">
          <Label>Currently hacking on</Label>
          <SmallLabel>What projects are currently occupying most of your time?</SmallLabel>
          <Textarea {...register('hacking')} />
        </Box>

        <Box w="100%">
          <Label>Available for</Label>
          <SmallLabel>
            What kinds of collaborations or discussions are you available for? What's a good reason
            to say Hey! to you these days?
          </SmallLabel>
          <Textarea {...register('avaliable')} />
        </Box>
      </VStack>
    </SettingsProfileCard>
  );
};

export default Coding;
