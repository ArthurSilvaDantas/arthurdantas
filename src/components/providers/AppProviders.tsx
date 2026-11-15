'use client';

import type { ChildrenProps } from '@/src/types';
import { ThemeProvider } from 'next-themes';
import { MotionConfig } from 'motion/react';
import SmoothScroll from './SmoothScroll';

export default function AppProviders({ children }: ChildrenProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
      <MotionConfig reducedMotion="user">
        <SmoothScroll>{children}</SmoothScroll>
      </MotionConfig>
    </ThemeProvider>
  );
}
