import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormErrorMessage,
  Image,
  Input,
  Menu,
  Text,
  Tooltip,
  VStack
} from '@chakra-ui/react';
import { titleStyles, SettingsProfileCard, Label } from '@/components/misc/settings-profile-style';
import { EditProfile } from '@/interfaces';
import { useFormContext, useWatch } from 'react-hook-form';
import { ValidationUtils } from '@/lib/utils';

function ProfileImage() {
  const { register, setValue, control } = useFormContext<EditProfile>();
  const { image, profile_image } = useWatch({ control });
  const [preview, setPreview] = useState<string>('');
  const imageRef = useRef<HTMLInputElement>(null);

  function onClickUpload(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.[0]) {
      setValue('profile_image', e.target.files[0]);
    }
  }

  useEffect(() => {
    if (!profile_image) {
      setPreview('');
      return;
    }

    const objectUrl = URL.createObjectURL(profile_image);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image, profile_image]);

  useEffect(() => {
    if (!preview && imageRef.current) {
      imageRef.current.value = '';
    }
  }, [preview]);

  return (
    <Flex mb="5" align="center">
      {(image || profile_image) && (
        <Image
          src={preview || image}
          alt="user avata"
          h="105px"
          w="250px"
          objectFit="scale-down"
          overflowWrap="anywhere"
          borderRadius="md"
        />
      )}

      <Tooltip label="Use ratio of 100:42 for best results">
        <Button onClick={() => imageRef.current?.click()}>
          {image || profile_image ? 'Change' : 'Add profile image'}
        </Button>
      </Tooltip>
      {(image || profile_image) && (
        <Button
          onClick={() => {
            setValue('profile_image', null);
            setValue('image', '');
          }}
          variant="flat"
          colorScheme="red"
          color="red"
        >
          Remove
        </Button>
      )}
      <Input
        {...register('profile_image')}
        ref={imageRef}
        onChange={onClickUpload}
        type="file"
        accept="profile_image/*"
        display="none"
      />
      {!!profile_image && <Box />}
    </Flex>
  );
}

const User = () => {
  const [isValid, setIsValid] = useState('valid');
  const {
    formState: { errors },
    register,
    getValues
  } = useFormContext<EditProfile>();

  return (
    <SettingsProfileCard>
      <Text {...titleStyles}>User</Text>

      <VStack spacing={3}>
        <Box w="100%">
          <Label mb=".3rem">Name</Label>
          <Input
            {...register('name', {
              minLength: {
                value: 5,
                message: 'min length is 5'
              }
            })}
            placeholder="John Doe"
            type="text"
          />
          <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
        </Box>

        <Box w="100%">
          <Label mb=".3rem">Username</Label>
          <Input
            {...register('username', {
              minLength: {
                value: 5,
                message: 'min length is 5'
              }
            })}
            placeholder="johndoe"
            type="text"
            disabled
          />
          <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
        </Box>

        <Box w="100%">
          <Label mb=".3rem">Email address</Label>
          <Input
            {...register('email', {
              required: 'Email Address is required',
              pattern: {
                value: ValidationUtils.emailPattern,
                message: 'Please enter a valid email'
              }
            })}
            placeholder="example@gmail.com"
            type="email"
            disabled
          />
          <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
        </Box>

        <Flex justify="center">
          <Flex flexDirection="column" justifyContent="center">
            <Text textAlign="center" mb={3}>
              Profile image
            </Text>

            <ProfileImage />
          </Flex>
        </Flex>
      </VStack>
    </SettingsProfileCard>
  );
};

export default User;
