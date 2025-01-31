'use client';

import React, { useEffect, useState } from 'react';
import { IconButton } from '@chakra-ui/react';
import { ArrowUpIcon } from '@chakra-ui/icons';

interface ScrollToTopButtonProps {
  threshold?: number;
  bottom?: string;
  right?: string;
  colorScheme?: string;
  initialShow?: boolean;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({
  threshold = 300,
  bottom = '50px',
  right = '50px',
  colorScheme = 'blue',
  initialShow = false
}) => {
  const [showButton, setShowButton] = useState(initialShow);

  useEffect(() => {
    const isAboveThreshold = window.pageYOffset > threshold;
    setShowButton(isAboveThreshold);

    const handleScroll = () => {
      setShowButton(window.pageYOffset > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!showButton) return null;

  return (
    <IconButton
      icon={<ArrowUpIcon />}
      position="fixed"
      bottom={bottom}
      right={right}
      colorScheme={colorScheme}
      onClick={scrollToTop}
      aria-label="Back to Top"
    />
  );
};

export default ScrollToTopButton;
