import { HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { FiWifiOff } from '@react-icons/all-files/fi/FiWifiOff';
import { PrimaryBtn } from '@/components/misc/buttons';
import { useRouter } from 'next/navigation';

const ErrorMessage = ({ offline, urlNotFound }: { offline?: boolean; urlNotFound?: boolean }) => {
  const reload = () => window.location.reload();

  const router = useRouter();

  return (
    <VStack justify="center" flex="1" fontSize={['16px', '17px']} py="7rem">
      {offline && (
        <VStack>
          <HStack m="auto">
            <FiWifiOff size={22} />
            <Text letterSpacing="1px">No internet connection !</Text>
          </HStack>
          <PrimaryBtn onClick={reload}>Try again</PrimaryBtn>
        </VStack>
      )}

      {urlNotFound && (
        <VStack>
          <Text fontSize="1.2rem" fontWeight="bold">
            This page doesn’t exist 😟 !
          </Text>
          <Text>
            Please check your URL or{' '}
            <Text
              as="span"
              color="light.primary"
              _hover={{ color: 'rgb(103 115 237 / 91%)' }}
              cursor="pointer"
              onClick={() => router.push('/')}
            >
              go back home
            </Text>
          </Text>
        </VStack>
      )}
    </VStack>
  );
};

export default ErrorMessage;
