'use client';

import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import type { Project, ProjectFilterId } from '@/src/types';
import { projectGrid } from '@/src/styles/classes';
import styles from '@/src/styles/projects.module.css';
import { useContent } from '@/src/i18n/I18nProvider';
import { duration, ease, revealOrder } from '@/src/lib/motion';
import SectionHeader from '@/src/components/SectionHeader';
import ProjectCard from './ProjectCard';
import { CarouselDots, useCarousel } from './useCarousel';

const matches = (project: Project, filter: ProjectFilterId) => filter === 'todos' || project.categories.includes(filter);

function gridCellClasses(items: Project[]) {
  const regular = items.filter((p) => !p.featured);
  const n = regular.length;
  const xlRemainder = n % 3;
  return new Map(
    items.map((p) => {
      if (p.featured) return [p.slug, projectGrid.featured];
      const i = regular.indexOf(p);
      const isLast = i === n - 1;
      const md = n % 2 === 1 && isLast ? projectGrid.mdCenteredLast : '';
      const xl =
        xlRemainder === 1 && isLast
          ? 'xl:col-span-2 xl:col-start-3'
          : xlRemainder === 2 && i >= n - 2
            ? 'xl:col-span-3'
            : 'xl:col-span-2';
      return [p.slug, `${projectGrid.regular} ${md} ${xl} ${projectGrid.xlStretched}`];
    }),
  );
}

export default function Projects() {
  const { projects } = useContent();
  const [filter, setFilter] = useState<ProjectFilterId>('todos');
  const pillId = useId();
  const visible = projects.items.filter((p) => matches(p, filter));
  const cellClasses = gridCellClasses(visible);
  const regular = visible.filter((p) => !p.featured);
  const carousel = useCarousel(visible.map((p) => p.slug));

  const choose = (id: ProjectFilterId) => {
    if (id === filter) return;
    carousel.reset();
    setFilter(id);
  };

  return (
    <section id="projetos" tabIndex={-1} aria-labelledby="projetos-titulo" className="section-screen focus:outline-none">
      <div className="site-container flex flex-col gap-6 pb-16 pt-20 md:gap-7 lg:pb-20 lg:pt-24">
        <SectionHeader id="projetos-titulo" eyebrow={projects.eyebrow} title={projects.title} />

        <div className="reveal flex flex-wrap items-center justify-between gap-x-6 gap-y-3" style={revealOrder(2)}>
          <div role="group" aria-label={projects.filtersLabel} className="flex flex-wrap gap-2">
            {projects.filters.map((f) => {
              const isActive = f.id === filter;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => choose(f.id)}
                  className={`relative flex items-center gap-1.5 rounded-full border px-4 py-2.5 leading-[normal] transition-colors duration-200 md:px-[18px] md:py-3 ${
                    isActive ? 'border-transparent text-bg' : 'border-line-2 bg-card text-body hover:border-accent'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId={`${pillId}-filtro`}
                      aria-hidden
                      className="absolute -inset-px rounded-full bg-head"
                      transition={{ duration: duration.base, ease: ease.out }}
                    />
                  )}
                  <span className="relative text-sm font-medium">{f.label}</span>
                </button>
              );
            })}
          </div>
          <p aria-live="polite" className="sr-only">
            {visible.length} {visible.length === 1 ? projects.count.one : projects.count.other}
          </p>
        </div>

        <div>
          <div
            ref={carousel.scrollerRef}
            onScroll={carousel.onScroll}
            data-lenis-prevent-horizontal
            {...(carousel.enabled && {
              role: 'region',
              'aria-roledescription': projects.carousel.roleDescription,
              'aria-label': projects.carousel.label,
              tabIndex: 0,
            })}
            className={`scroll-hide -mx-5 snap-x snap-mandatory overflow-x-auto overscroll-x-contain pb-2 outline-offset-[-2px] md:mx-0 md:snap-none md:overflow-visible md:pb-0`}
          >
            <ul
              aria-label={projects.listLabel}
              className="reveal-group relative flex w-max gap-3 px-5 md:grid md:w-auto md:grid-cols-2 md:gap-x-6 md:gap-y-10 md:px-0 xl:grid-cols-6 xl:gap-x-7"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {visible.map((p, i) => (
                  <motion.li
                    key={p.slug}
                    ref={carousel.itemRef(p.slug)}
                    style={revealOrder(Math.min(i, 5))}
                    layout="position"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: duration.base, ease: ease.out }}
                    className={`w-[min(85vw,400px)] shrink-0 snap-center md:w-auto ${cellClasses.get(p.slug)}`}
                  >
                    <ProjectCard project={p} bleed={regular.indexOf(p) % 2 === 1 ? 'left' : 'right'} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>

          <CarouselDots carousel={carousel} items={visible} className="mt-3 md:hidden" />
        </div>
      </div>
    </section>
  );
}
