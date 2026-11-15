import { useEffect, useState } from 'react';
import { ACTIVE_SECTION_LINE } from '@/src/config/ui';

export function useActiveSection<T extends string>(ids: readonly T[], enabled = true): T | null {
  const [active, setActive] = useState<T | null>(null);

  useEffect(() => {
    if (!enabled) {
      setActive(null);
      return;
    }

    let frame = 0;
    let navH = 0;

    const update = () => {
      frame = 0;
      const line = navH + (window.innerHeight - navH) * ACTIVE_SECTION_LINE;
      let current: T | null = null;
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      });
      const root = document.documentElement;
      if (window.scrollY + window.innerHeight >= root.scrollHeight - 2) current = ids[ids.length - 1];
      setActive(current);
    };

    const measure = () => {
      navH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 0;
      update();
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
    };
  }, [ids, enabled]);

  return active;
}
