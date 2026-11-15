'use client';

import { useEffect } from 'react';
import { REVEAL_TARGETS } from '@/src/config/ui';

export default function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.revealReady = '1';

    const reveal = (el: Element) => el.classList.add('is-in');
    const io =
      'IntersectionObserver' in window
        ? new IntersectionObserver(
            (entries, observer) => {
              for (const entry of entries) {
                if (!entry.isIntersecting) continue;
                reveal(entry.target);
                observer.unobserve(entry.target);
              }
            },
            { rootMargin: '0px 0px -8% 0px' },
          )
        : null;

    const scan = () => document.querySelectorAll(REVEAL_TARGETS).forEach((el) => (io ? io.observe(el) : reveal(el)));

    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      mo.disconnect();
      io?.disconnect();
    };
  }, []);

  return null;
}
