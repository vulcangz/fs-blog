'use client';

import React, { useState } from 'react';
import {
  AbsoluteCenter,
  Alert,
  AlertIcon,
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  Image,
  Input,
  Link,
  Spacer,
  Stack,
  Text,
  useToast
} from '@chakra-ui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { FaFacebook } from '@react-icons/all-files/fa/FaFacebook';
import { FaGithub } from '@react-icons/all-files/fa/FaGithub';
import { FaGoogle } from '@react-icons/all-files/fa/FaGoogle';
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter';
import { LoginReq } from '@/interfaces';
import { ValidationUtils } from '@/lib/utils';

interface LoginFormProps {
  onSuccess?: () => void;
  title: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, title }) => {
  const [signUpForm, setSignUpForm] = useState<LoginReq | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const toast = useToast();

  const isLogging = title === 'Login';
  const isSigningUp = title === 'Sign Up';

  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit
  } = useForm<LoginReq>();

  const loginOptions = {
    callbackUrl: pathname?.includes('login') ? '/' : pathname || '/'
  };
  const action = isLogging ? 'Continue' : 'Sign up';
  const pseudo = isLogging ? 'Sign in' : 'Sign up';

  const login = async (form: LoginReq) => {
    setLoading(true);
    const result = await signIn('credentials', {
      callbackUrl: '/',
      redirect: false,
      email: form.email,
      password: form.password
    });

    if (result?.error) {
      console.log('login error', result);
      setErrorMessage(result.error ?? 'Account not found or credentials are incorrect.');
    } else {
      toast({
        title: 'You are welcome.',
        description: 'Login successfully!',
        isClosable: true
      });

      router.push('/');
    }

    setLoading(false);
  };

  const signUp = async (form: LoginReq) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/auth/local/register`, form);
      setSignUpForm(form);

      onSuccess?.();
      return null;
    } catch (e) {
      setErrorMessage(`Something went wrong! ${e.message}`);
      return { error: e.message ?? 'Something went wrong!' };
    }
  };

  return (
    <Flex pt="6" flexDirection="column" alignItems="center" justifyContent="center">
      {errorMessage && (
        <Alert status="error">
          <AlertIcon />
          {errorMessage}
        </Alert>
      )}
      <Stack
        spacing="4"
        width={{ md: '2xl' }}
        m="auto"
        p="1rem"
        direction="column"
        borderRadius="lg"
        backgroundColor="whiteAlpha.50"
        boxShadow="md"
      >
        <Stack spacing="6" direction="column" textAlign="center">
          <Box>
            <Link href="/">
              <Image
                src="/assets/images/devlogo-pwa-128.svg"
                alt="DEV Community"
                ml="auto"
                mr="auto"
                mb="4"
                h="48px"
              />
            </Link>
            <Heading fontSize="3xl">Join the FS-BLOG Community</Heading>
            <Text fontSize="md">
              <Link href="/">FS-BLOG Community</Link> is a community of 1,000,000 amazing developers
            </Text>
          </Box>

          <ButtonGroup flexDirection="column" size="md">
            <Stack>
              <Button
                onClick={() => signIn('facebook', loginOptions)}
                disabled
              >
                <Icon as={FaFacebook} mr="2" />
                {action} with Facebook
              </Button>
              <Button
                onClick={() => signIn('github', loginOptions)}
              >
                <Icon as={FaGithub} mr="2" />
                {action} with Github
              </Button>
              <Button
                onClick={() => signIn('google', loginOptions)}
                disabled
              >
                <Icon as={FaGoogle} mr="2" />
                {action} with Google
              </Button>
            </Stack>
          </ButtonGroup>
        </Stack>

        <Stack spacing="4">
          <Box
            pos="relative"
            textAlign="center"
            _after={{
              position: 'absolute',
              top: '50%',
              width: ['80%', '60%', '45%', '25%'],
              display: 'block',
              borderBottom: '1px solid',
              borderColor: 'base.20'
            }}
          >
            <Box position="relative" padding="4">
              <Divider />
              <AbsoluteCenter bg="white" px="4">
                OR {pseudo} down there
              </AbsoluteCenter>
            </Box>
          </Box>

          <Stack
            as="form"
            onSubmit={handleSubmit((data) => (isLogging ? login(data) : signUp(data)))}
            spacing="4"
          >
            {isSigningUp && (
              <FormControl isInvalid={!!errors.username}>
                <FormLabel>Username</FormLabel>
                <Input
                  {...register('username', {
                    required: 'Username is required',
                    minLength: {
                      value: 5,
                      message: 'min length is 5'
                    }
                  })}
                  autoComplete="username"
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>
            )}

            <FormControl isInvalid={!!errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                {...register('email', {
                  required: 'Email Address is required',
                  pattern: {
                    value: ValidationUtils.emailPattern,
                    message: 'Please enter a valid email'
                  }
                })}
                autoComplete="username"
              />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.password}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: isSigningUp
                    ? {
                        value: 6,
                        message: 'Password should contain at least 6 characters'
                      }
                    : undefined
                })}
                autoComplete="current-password"
              />
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>

            {isSigningUp && (
              <FormControl isInvalid={!!errors.confirm_password}>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  {...register('confirm_password', {
                    required: 'Confirm password is required',
                    validate: {
                      passwordEqual: (value) =>
                        value === getValues().password || 'Confirm password do not match!'
                    }
                  })}
                  type="password"
                  autoComplete="current-password"
                />
                <FormErrorMessage>{errors.confirm_password?.message}</FormErrorMessage>
              </FormControl>
            )}

            {isLogging && (
              <FormControl>
                <Flex>
                  <Box p="2">
                    <Checkbox defaultChecked disabled>
                      Remember me
                    </Checkbox>
                  </Box>
                  <Spacer />
                  <Button
                    colorScheme="blue"
                    variant="link"
                    onClick={() => router.push('/users/password/new')}
                  >
                    Forgot password?
                  </Button>
                </Flex>
              </FormControl>
            )}

            <Button isLoading={loading} type="submit" width="full" data-cy="log_submit">
              {action}
            </Button>

            <Box textAlign="center">
              <Text as="i" size="xs">
                By signing {isLogging ? 'in' : 'up'}, you are agreeing to our{' '}
                <Link color="blue.500" href="#" fontSize="xs">
                  privacy policy
                </Link>
                ,{' '}
                <Link color="blue.500" href="#" fontSize="xs">
                  terms of use
                </Link>
                <br />
                and{' '}
                <Link color="blue.500" href="#" fontSize="xs">
                  code of conduct
                </Link>
                .
              </Text>
            </Box>
            <Divider />
            <Box textAlign="center">
              {isLogging && (
                <Text fontSize="md">
                  New to DEV Community?&nbsp;
                  <Link href="/signup" colorScheme="blue" fontWeight="500">
                    Create account.
                  </Link>{' '}
                </Text>
              )}
              {isSigningUp && (
                <Text fontSize="md">
                  Already have an account?&nbsp;
                  <Link href="/enter" colorScheme="blue" fontWeight="500">
                    Log in.
                  </Link>{' '}
                </Text>
              )}
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Flex>
  );
};

LoginForm.displayName = 'LoginForm';

export default LoginForm;
