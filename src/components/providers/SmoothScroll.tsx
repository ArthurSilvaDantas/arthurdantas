'use client';

import Lenis from 'lenis';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { ChildrenProps } from '@/src/types';
import { REDUCED_MOTION_QUERY } from '@/src/config/ui';

const LenisContext = createContext<Lenis | null>(null);

export default function SmoothScroll({ children }: ChildrenProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const instance = new Lenis({ autoRaf: true });
    const frame = requestAnimationFrame(() => setLenis(instance));
    return () => {
      cancelAnimationFrame(frame);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

export function useLenis() {
  return useContext(LenisContext);
}

export function useScrollToSection() {
  const lenis = useLenis();

  return useCallback(
    (id: string) => {
      const target = document.getElementById(id);
      if (!target) return;

      if (lenis) {
        lenis.scrollTo(target);
      } else {
        const reduce = window.matchMedia(REDUCED_MOTION_QUERY).matches;
        target.scrollIntoView({ block: 'start', behavior: reduce ? 'auto' : 'smooth' });
      }
      target.focus({ preventScroll: true });
      window.history.replaceState(null, '', `#${id}`);
    },
    [lenis],
  );
}
