'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent, type PointerEvent } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { sectionIds } from '@/src/content/shared';
import { NAV_MENU_ID, NAV_SCROLLED_THRESHOLD } from '@/src/config/ui';
import { useContent, useLocale } from '@/src/i18n/I18nProvider';
import { localePath, sectionHref } from '@/src/i18n/locales';
import { duration, ease, spring } from '@/src/lib/motion';
import { useLenis, useScrollToSection } from '@/src/components/providers/SmoothScroll';
import { useActiveSection } from '@/src/hooks/useActiveSection';
import type { Box, SectionId } from '@/src/types';
import LanguageSwitch from './LanguageSwitch';

export default function Nav() {
  const { nav } = useContent();
  const locale = useLocale();
  const home = localePath[locale];
  const items = useMemo(() => [...nav.links, nav.cta], [nav]);
  const barInset = (id: SectionId) => (id === nav.cta.id ? 16 : 12);
  const scrollToSection = useScrollToSection();
  const lenis = useLenis();

  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const setScrollLocked = useCallback(
    (locked: boolean) => {
      if (locked) lenis?.stop();
      else lenis?.start();
      document.documentElement.style.overflow = locked ? 'hidden' : '';
    },
    [lenis],
  );

  useEffect(() => {
    if (!open) return;
    const desktop = window.matchMedia('(min-width: 768px)');
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    const onDesktop = (e: MediaQueryListEvent) => e.matches && setOpen(false);

    setScrollLocked(true);
    firstLinkRef.current?.focus();
    window.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onDesktop);
    return () => {
      setScrollLocked(false);
      window.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onDesktop);
    };
  }, [open, setScrollLocked]);

  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > NAV_SCROLLED_THRESHOLD));
  useEffect(() => setScrolled(window.scrollY > NAV_SCROLLED_THRESHOLD), []);

  const active = useActiveSection(sectionIds);
  const current = active === 'inicio' ? null : active;
  const [lastCurrent, setLastCurrent] = useState<SectionId | null>(null);
  if (current && current !== lastCurrent) setLastCurrent(current);

  const navRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Partial<Record<SectionId, HTMLAnchorElement | null>>>({});
  const [boxes, setBoxes] = useState<Partial<Record<SectionId, Box>>>({});

  useEffect(() => {
    const navEl = navRef.current;
    if (!navEl) return;
    const measure = () => {
      const origin = navEl.getBoundingClientRect().left;
      const next: Partial<Record<SectionId, Box>> = {};
      items.forEach(({ id }) => {
        const el = itemRefs.current[id];
        if (!el?.offsetWidth) return;
        const r = el.getBoundingClientRect();
        next[id] = { x: r.left - origin, w: r.width };
      });
      setBoxes(next);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(navEl);
    if (listRef.current) ro.observe(listRef.current);
    return () => ro.disconnect();
  }, [items]);

  const [hovered, setHovered] = useState<SectionId | null>(null);
  const [lastHovered, setLastHovered] = useState<SectionId | null>(null);
  const onItemEnter = (id: SectionId) => (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    setHovered(id);
    setLastHovered(id);
  };

  const barId = current ?? lastCurrent;
  const barBox = barId ? boxes[barId] : undefined;
  const bar = barId && barBox ? { x: barBox.x + barInset(barId), width: barBox.w - 2 * barInset(barId) } : undefined;
  const hoverBox = lastHovered ? boxes[lastHovered] : undefined;
  const currentLabel = items.find((item) => item.id === current)?.label;

  const goTo = (e: MouseEvent<HTMLAnchorElement>, id: SectionId) => {
    e.preventDefault();
    setScrollLocked(false);
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ${
          scrolled && !open
            ? 'border-line/70 bg-bg/80 shadow-[0_10px_30px_-20px_rgba(10,26,68,0.35)] backdrop-blur-md backdrop-saturate-150'
            : 'border-line bg-bg'
        }`}
      >
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-md focus:bg-card focus:px-3 focus:py-2 focus:text-sm focus:text-head"
        >
          {nav.skipLink}
        </a>

        <nav ref={navRef} aria-label={nav.ariaLabel} className="site-container relative isolate flex h-14 items-center justify-between">
          <Link href={home} onClick={(e) => goTo(e, 'inicio')} className="flex min-w-0 items-center gap-3">
            <Image src="/brand/logo-ad-light.svg" alt="" width={44} height={28} unoptimized priority className="dark:hidden" />
            <Image src="/brand/logo-ad-dark.svg" alt="" width={44} height={28} unoptimized priority className="hidden dark:block" />
            <span className="whitespace-nowrap font-display text-base font-medium leading-[normal] text-head">{nav.brand}</span>
            <AnimatePresence mode="wait" initial={false}>
              {currentLabel && (
                <motion.span
                  key={currentLabel}
                  aria-hidden
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: duration.fast, ease: ease.out }}
                  className="-ml-1 truncate font-mono text-xs text-muted max-[359px]:hidden md:hidden"
                >
                  / {currentLabel.toLowerCase()}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {hoverBox && (
            <motion.span
              aria-hidden
              className="pointer-events-none absolute left-0 top-1/2 -z-10 -mt-4 hidden h-8 rounded-full bg-soft md:block"
              initial={{ x: hoverBox.x, width: hoverBox.w, opacity: 0 }}
              animate={{ x: hoverBox.x, width: hoverBox.w, opacity: hovered ? 1 : 0 }}
              transition={{ x: spring.slide, width: spring.slide, opacity: { duration: duration.fast } }}
            />
          )}

          <ul ref={listRef} className="hidden items-center md:flex" onPointerLeave={() => setHovered(null)}>
            {nav.links.map((link) => {
              const isCurrent = current === link.id;
              return (
                <li key={link.id}>
                  <Link
                    ref={(el) => {
                      itemRefs.current[link.id] = el;
                    }}
                    href={sectionHref(locale, link.id)}
                    onClick={(e) => goTo(e, link.id)}
                    onPointerEnter={onItemEnter(link.id)}
                    aria-current={isCurrent ? 'location' : undefined}
                    className={`block rounded-full px-3 py-2 text-sm font-medium leading-[normal] transition-colors duration-200 ${
                      isCurrent || hovered === link.id ? 'text-head' : 'text-muted'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="ml-3">
              <Link
                ref={(el) => {
                  itemRefs.current[nav.cta.id] = el;
                }}
                href={sectionHref(locale, nav.cta.id)}
                onClick={(e) => goTo(e, nav.cta.id)}
                aria-current={current === nav.cta.id ? 'location' : undefined}
                className="block rounded-full bg-head px-4 py-2 text-sm font-medium leading-[normal] text-bg transition-opacity duration-200 hover:opacity-85"
              >
                {nav.cta.label}
              </Link>
            </li>
            <li className="ml-2">
              <LanguageSwitch current={current} />
            </li>
          </ul>

          {bar && (
            <motion.span
              aria-hidden
              className="pointer-events-none absolute -bottom-px left-0 hidden h-[2px] rounded-full bg-accent md:block"
              initial={{ ...bar, opacity: 0 }}
              animate={{ ...bar, opacity: current ? 1 : 0 }}
              transition={{ x: spring.slide, width: spring.slide, opacity: { duration: duration.base } }}
            />
          )}

          <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitch current={current} />
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={NAV_MENU_ID}
            aria-label={open ? nav.menu.close : nav.menu.open}
            className="grid size-10 place-items-center rounded-full border border-line-2 text-head"
          >
            <span aria-hidden className="relative block h-3 w-4">
              <motion.span
                className="absolute left-0 top-0 h-0.5 w-4 rounded-full bg-current"
                animate={open ? { y: 5, rotate: 45 } : { y: 0, rotate: 0 }}
                transition={{ duration: duration.fast, ease: ease.out }}
              />
              <motion.span
                className="absolute bottom-0 left-0 h-0.5 w-4 rounded-full bg-current"
                animate={open ? { y: -5, rotate: -45 } : { y: 0, rotate: 0 }}
                transition={{ duration: duration.fast, ease: ease.out }}
              />
            </span>
          </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id={NAV_MENU_ID}
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration.fast, ease: ease.out }}
            className="fixed inset-x-0 bottom-0 top-(--nav-h) z-40 flex flex-col bg-bg px-5 pb-10 pt-6 md:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.04 } } }}
              className="flex flex-col"
            >
              {nav.links.map((link, i) => (
                <motion.li
                  key={link.id}
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0, transition: { duration: duration.base, ease: ease.out } },
                  }}
                >
                  <Link
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={sectionHref(locale, link.id)}
                    onClick={(e) => goTo(e, link.id)}
                    aria-current={current === link.id ? 'location' : undefined}
                    className="flex items-center justify-between border-b border-line py-4 font-display text-2xl font-medium text-head"
                  >
                    {link.label}
                    {current === link.id && <span aria-hidden className="size-2 rounded-full bg-accent" />}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>

            <Link
              href={sectionHref(locale, nav.cta.id)}
              onClick={(e) => goTo(e, nav.cta.id)}
              className="mt-auto rounded-full bg-head px-4 py-3 text-center text-base font-medium text-bg"
            >
              {nav.cta.label}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
