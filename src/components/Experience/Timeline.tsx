'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { GSAP_PRELOAD_MARGIN, TIMELINE_VISIBLE_TOPICS } from '@/src/config/ui';
import type { TimelineEntryProps, TimelineProps } from '@/src/types';
import { useContent } from '@/src/i18n/I18nProvider';
import { formatDuration, formatMonth, monthsBetween } from '@/src/lib/dates';
import { revealOrder } from '@/src/lib/motion';
import { useLenis } from '@/src/components/providers/SmoothScroll';
import Tag from '@/src/components/Tag';
import { timelineBadge } from '@/src/styles/classes';

function Entry({ entry, index }: TimelineEntryProps) {
  const { experience, dates } = useContent();
  const [open, setOpen] = useState(false);
  const listId = useId();
  const months = monthsBetween(entry.start, entry.end);
  const topics = open ? entry.topics : entry.topics.slice(0, TIMELINE_VISIBLE_TOPICS);
  const hasHiddenTopics = entry.topics.length > TIMELINE_VISIBLE_TOPICS;
  const period = `${formatMonth(entry.start, dates)} — ${entry.end ? formatMonth(entry.end, dates) : experience.today}`;

  return (
    <li className="reveal relative flex flex-col gap-4 pl-12 lg:flex-row lg:gap-10" style={revealOrder(Math.min(index, 3))}>
      <span aria-hidden className="absolute left-0 top-2 grid size-6 place-items-center rounded-full border-2 border-accent bg-card">
        <span className="size-2 rounded-full bg-accent" />
      </span>

      <div className="flex shrink-0 flex-col gap-[10px] pt-1.5 lg:w-[200px]">
        <p className="font-mono text-sm leading-[normal] text-head">{period}</p>
        <div className="flex flex-wrap gap-2">
          <span className={`${timelineBadge} bg-soft text-muted`}>{formatDuration(months, dates)}</span>
          {!entry.end && <span className={`${timelineBadge} bg-ok-bg text-ok`}>{experience.current}</span>}
        </div>
      </div>

      <article className="flex min-w-0 flex-1 flex-col gap-3 rounded-2xl border border-line bg-card px-6 py-5 sm:px-8 sm:py-6">
        <header className="flex items-start justify-between gap-4 leading-[normal]">
          <div className="flex min-w-0 flex-col gap-1">
            <h3 className="font-display text-[clamp(1.375rem,2.2vw,1.625rem)] font-bold text-head">{entry.role}</h3>
            <p className="text-[15px] text-muted">{entry.org}</p>
          </div>
          <span aria-hidden className="font-display text-[32px] font-extrabold text-line-2">
            {String(index + 1).padStart(2, '0')}
          </span>
        </header>
        <div className="flex flex-col items-start gap-1.5">
          <ul id={listId} className="list-disc space-y-0 ps-[22px] text-[15px] leading-[1.6] text-body marker:text-body">
            {topics.map((topic, i) => (
              <motion.li
                key={topic}
                initial={i < TIMELINE_VISIBLE_TOPICS ? false : { opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: (i - TIMELINE_VISIBLE_TOPICS) * 0.05 }}
              >
                {topic}
              </motion.li>
            ))}
          </ul>
          {hasHiddenTopics && (
            <button
              type="button"
              aria-expanded={open}
              aria-controls={listId}
              onClick={() => setOpen((v) => !v)}
              className="group/more inline-flex items-center gap-1.5 rounded-full py-1 font-mono text-xs leading-[normal] text-accent-text transition-colors duration-200 hover:text-head"
            >
              {open ? experience.showLess : experience.showMore}
              <svg aria-hidden viewBox="0 0 12 12" className={`size-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 4.5 6 7.5 9 4.5" />
              </svg>
            </button>
          )}
        </div>
        {entry.tags.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {entry.tags.map((tag) => (
              <li key={tag.label}>
                <Tag tag={tag} variant="tint" />
              </li>
            ))}
          </ul>
        )}
      </article>
    </li>
  );
}

export default function Timeline({ entries }: TimelineProps) {
  const root = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
          gsap.fromTo(
            progress.current,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: { trigger: el, start: 'top 70%', end: 'bottom 70%', scrub: true },
            },
          );
        }, el);

        const unsubscribe = lenis?.on('scroll', () => ScrollTrigger.update());
        ScrollTrigger.refresh();
        const resize = new ResizeObserver(() => ScrollTrigger.refresh());
        resize.observe(el);
        cleanup = () => {
          resize.disconnect();
          unsubscribe?.();
          ctx.revert();
        };
      },
      { rootMargin: GSAP_PRELOAD_MARGIN },
    );
    observer.observe(el);

    return () => {
      cancelled = true;
      observer.disconnect();
      cleanup?.();
    };
  }, [entries, lenis]);

  return (
    <div ref={root} className="relative">
      <div aria-hidden className="absolute bottom-3 left-[11px] top-3 w-0.5 bg-line">
        <div ref={progress} className="h-full w-full origin-top bg-accent" />
      </div>
      <ol className="flex flex-col gap-6">
        {entries.map((entry, i) => (
          <Entry key={`${entry.org}-${entry.start}`} entry={entry} index={i} />
        ))}
      </ol>
    </div>
  );
}
