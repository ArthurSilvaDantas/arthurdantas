'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useReducedMotion } from 'motion/react';
import { CAROUSEL_MEDIA_QUERY } from '@/src/config/ui';
import type { CarouselDotsProps, CarouselState } from '@/src/types';
import { useContent } from '@/src/i18n/I18nProvider';

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia(query);
      media.addEventListener('change', onChange);
      return () => media.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export function useCarousel(slugs: string[]): CarouselState {
  const enabled = useMediaQuery(CAROUSEL_MEDIA_QUERY);
  const reduce = useReducedMotion();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const items = useRef(new Map<string, HTMLElement>());
  const frame = useRef(0);
  const [active, setActive] = useState(0);
  const key = slugs.join(' ');

  const measure = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const center = scroller.scrollLeft + scroller.clientWidth / 2;
    let best = 0;
    let bestDistance = Infinity;
    key.split(' ').forEach((slug, i) => {
      const item = items.current.get(slug);
      if (!item) return;
      const distance = Math.abs(item.offsetLeft + item.offsetWidth / 2 - center);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = i;
      }
    });
    setActive(best);
  }, [key]);

  const onScroll = useCallback(() => {
    if (!enabled) return;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(measure);
  }, [enabled, measure]);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  useEffect(() => {
    if (enabled) measure();
  }, [enabled, measure]);

  const goTo = useCallback(
    (index: number) => {
      const scroller = scrollerRef.current;
      const item = items.current.get(key.split(' ')[index]);
      if (!scroller || !item) return;
      scroller.scrollTo({
        left: item.offsetLeft - (scroller.clientWidth - item.offsetWidth) / 2,
        behavior: reduce ? 'auto' : 'smooth',
      });
    },
    [key, reduce],
  );

  const reset = useCallback(() => {
    if (scrollerRef.current) scrollerRef.current.scrollLeft = 0;
    setActive(0);
  }, []);

  const itemRef = useCallback(
    (slug: string) => (el: HTMLElement | null) => {
      if (el) items.current.set(slug, el);
      else items.current.delete(slug);
    },
    [],
  );

  return { enabled, active, scrollerRef, onScroll, goTo, reset, itemRef };
}

export function CarouselDots({ active, goTo, items, className }: CarouselDotsProps) {
  const { projects } = useContent();
  if (items.length < 2) return null;
  return (
    <div className={`flex justify-center ${className}`}>
      {items.map((p, i) => {
        const current = i === active;
        return (
          <button
            key={p.slug}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`${projects.carousel.goTo} ${p.title}`}
            aria-current={current ? 'true' : undefined}
            className="group/dot grid h-6 min-w-6 place-items-center px-1"
          >
            <span
              className={`block h-1.5 rounded-full transition-[width,background-color] duration-300 motion-reduce:transition-none ${
                current ? 'w-5 bg-head' : 'w-1.5 bg-line-2 group-hover/dot:bg-muted'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
