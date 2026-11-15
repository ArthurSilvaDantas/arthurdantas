import type { CSSProperties } from 'react';

export const ease = {
  out: [0.22, 1, 0.36, 1],
} as const;

export const duration = {
  fast: 0.2,
  base: 0.35,
  slow: 0.6,
} as const;

export const typing = {
  typeLetter: 0.07,
  eraseLetter: 0.04,
  holdWord: 1.8,
  pauseBeforeNextWord: 0.3,
} as const;

export const spring = {
  slide: { type: 'spring', stiffness: 420, damping: 38 },
} as const;

export const graph = {
  pulseLength: 40,
  waveSpeed: 230,
  waveHops: 5,
  tokenSpeed: 300,
  tokenHops: 2,
  flashDuration: 1.1,
  haloDuration: 1,
  gapAfterToken: 4.2,
  gapAfterWave: [2.6, 3.4],
} as const;

export const revealOrder = (order: number) => ({ '--i': order }) as CSSProperties;

export const introDelay = (seconds: number) => ({ '--delay': `${seconds}s` }) as CSSProperties;

export const cssEaseOut = `cubic-bezier(${ease.out.join(', ')})`;
