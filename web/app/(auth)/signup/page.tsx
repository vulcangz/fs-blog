'use client';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure
} from '@chakra-ui/react';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { RefObject, useRef, useState } from 'react';
import LoginForm from '@/components/form/login-form';
import { LoginReq } from '@/interfaces';

export default function SignUp() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [signUpForm, setSignUpForm] = useState<LoginReq | null>(null);
  const cancelRef: RefObject<any> = useRef(null);

  async function signUp(form: LoginReq) {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/auth/local/register`, form);
      setSignUpForm(form);
      return null;
    } catch (e) {
      return { error: 'This email has already been taken' };
    }
  }

  function updateInformation() {
    signIn('credentials', {
      callbackUrl: '/setup',
      email: signUpForm!.email,
      password: signUpForm!.password
    });
  }

  return (
    <>
      <LoginForm title="Sign Up" onSuccess={onOpen} />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        closeOnEsc={false}
        closeOnOverlayClick={false}
        isCentered={true}
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Account created
          </AlertDialogHeader>

          <AlertDialogBody>Please fill more information about you.</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={() => updateInformation()}>
              Sure
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
