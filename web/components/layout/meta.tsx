import { Metadata } from 'next/types';
import type { Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported but less commonly used
  // interactiveWidget: 'resizes-visual',
}

export const metadata = ({ title, keywords, description }): Metadata => {
  return {
    keywords: keywords,
    description: description,
    title: title
  };
};

const Meta = metadata({
  title: 'FS BLOG Community',
  keywords: 'FastSchema Headless CMS, Nextjs, NextAuth.js v5, Charkra-UI, React',
  description: 'FS BLOG build by vulcangz'
});

export default Meta;
