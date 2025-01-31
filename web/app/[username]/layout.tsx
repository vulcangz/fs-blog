import { Fragment } from 'react';

export default function LandingLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Fragment>{children}</Fragment>;
}
