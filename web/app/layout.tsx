import type { Metadata } from 'next';
import { Providers } from './provider';
import ScrollToTopButton from '@/components/misc/scroll-to-top-btn';
import AuthModal from '@/components/modal/auth-modal';

export const metadata: Metadata = {
  title: 'FS Blog',
  description: 'FS Blog'
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AuthModal />
          {children}
          <ScrollToTopButton />
        </Providers>
      </body>
    </html>
  );
}
