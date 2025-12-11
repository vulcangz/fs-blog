'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import { SWRConfig } from 'swr';
import fetcher from '@/lib/fetcher';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SessionProvider>
        <ChakraProvider>
          <SWRConfig
            value={{
              fetcher,
              refreshInterval: 60 * 1000
              // revalidateIfStale: false,
              // revalidateOnFocus: false,
              // revalidateOnReconnect: false,
            }}
          >
            {children}
          </SWRConfig>
        </ChakraProvider>
      </SessionProvider>
    </>
  );
}
