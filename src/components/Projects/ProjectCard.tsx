'use client';

import { useCallback, useEffect, useRef, useState, type PointerEvent, type ReactNode, type RefObject } from 'react';
import Image from 'next/image';
import { useInView, useReducedMotion } from 'motion/react';
import { DEMO_REPLAY_COOLDOWN_MS } from '@/src/config/ui';
import type { Content, Project, ProjectCardProps } from '@/src/types';
import { useContent } from '@/src/i18n/I18nProvider';
import Tag from '@/src/components/Tag';
import GitHubIcon from '@/src/components/icons/GitHubIcon';
import ArrowUpRightIcon from '@/src/components/icons/ArrowUpRightIcon';
import CountUp from '@/src/components/CountUp';
import { projectCard, projectGrid } from '@/src/styles/classes';
import styles from '@/src/styles/projects.module.css';
import ProjectPreview from './ProjectPreview';

function usePlayback(ref: RefObject<HTMLElement | null>) {
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [run, setRun] = useState(0);
  const startedAt = useRef(0);

  useEffect(() => {
    if (reduce) {
      setRun((r) => Math.max(r, 1));
      return;
    }
    if (!inView) return;
    startedAt.current = performance.now();
    setRun((r) => r + 1);
  }, [inView, reduce]);

  const replay = useCallback(() => {
    if (reduce || performance.now() - startedAt.current < DEMO_REPLAY_COOLDOWN_MS) return;
    startedAt.current = performance.now();
    setRun((r) => r + 1);
  }, [reduce]);

  return { run, play: inView && !reduce, replay };
}

function cardParts(project: Project, featured: boolean, projects: Content['projects']): Record<'heading' | 'description' | 'metric' | 'tags' | 'links', ReactNode> {
  const heading = (
    <div className="flex flex-col gap-1.5">
      {featured && (
        <p className="mb-1 flex items-center gap-1.5 font-mono text-xs leading-[normal] text-accent-text">
          <span aria-hidden className="size-1.5 rounded-full bg-accent" />
          {projects.featuredLabel}
        </p>
      )}
      <h3
        className={`font-display font-bold leading-[1.15] tracking-[-0.01em] text-head ${
          featured ? 'text-[clamp(1.625rem,2.4vw,2rem)]' : 'text-[22px]'
        }`}
      >
        {project.title}
      </h3>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 font-mono text-xs leading-[1.5]">
        <p className="text-accent-text">{project.tagline}</p>
        <p className="text-muted">{project.categories.map((c) => projects.categoryLabels[c]).join(' · ')}</p>
      </div>
    </div>
  );

  const description = (
    <p className="text-pretty text-[14px] leading-[1.55] text-muted md:text-[15px] md:leading-[1.6]">{project.description}</p>
  );

  const metric = project.metric ? (
    <p className="flex flex-col gap-1 leading-[normal]">
      <span className={`font-display font-extrabold leading-none text-head ${featured ? 'text-[40px]' : 'text-[32px]'}`}>
        <CountUp value={project.metric.value} />
      </span>
      <span className="text-[13px] leading-[1.35] text-muted">{project.metric.label}</span>
    </p>
  ) : null;

  const tags =
    project.tags.length > 0 || project.badge ? (
      <ul className="flex flex-wrap content-start gap-1.5">
        {project.tags.map((tag) => (
          <li key={tag.label}>
            <Tag tag={tag} variant="soft" />
          </li>
        ))}
        {project.badge && <li className="rounded-full bg-ok-bg px-3 py-[5px] font-mono text-xs leading-[normal] text-ok">{project.badge}</li>}
      </ul>
    ) : null;

  const links = (
    <div className="flex flex-wrap items-center gap-2">
      {project.links.github && (
        <a href={project.links.github} target="_blank" rel="noreferrer" title={projects.linkLabels.github} className={`${projectCard.linkPill} pl-3 pr-2.5`}>
          <GitHubIcon className="size-[18px]" />
          <ArrowUpRightIcon className={projectCard.arrow} />
          <span className="sr-only">
            {projects.linkLabels.github}: {project.title}
          </span>
        </a>
      )}
      {project.links.huggingFace && (
        <a href={project.links.huggingFace} target="_blank" rel="noreferrer" title={projects.linkLabels.huggingFace} className={`${projectCard.linkPill} pl-3 pr-2.5`}>
          <Image src="/icons/tech/hugging-face.svg" alt="" width={18} height={18} unoptimized />
          <ArrowUpRightIcon className={projectCard.arrow} />
          <span className="sr-only">
            {projects.linkLabels.huggingFace}: {project.title}
          </span>
        </a>
      )}
      {project.links.demo && (
        <a
          href={project.links.demo}
          target="_blank"
          rel="noreferrer"
          className={`${projectCard.linkPill} gap-2 pl-3.5 pr-3 font-mono text-xs leading-[normal] text-body`}
        >
          <span aria-hidden className="size-1.5 rounded-full bg-ok motion-safe:animate-pulse" />
          {projects.linkLabels.demo}
          <ArrowUpRightIcon className={projectCard.arrow} />
          <span className="sr-only">: {project.title}</span>
        </a>
      )}
    </div>
  );

  return { heading, description, metric, tags, links };
}

export default function ProjectCard({ project, bleed }: ProjectCardProps) {
  const ref = useRef<HTMLElement>(null);
  const { run, play, replay } = usePlayback(ref);
  const featured = Boolean(project.featured);
  const { projects } = useContent();
  const parts = cardParts(project, featured, projects);

  const events = {
    onPointerEnter: (e: PointerEvent) => {
      if (e.pointerType === 'mouse') replay();
    },
    onFocus: replay,
  };

  if (featured) {
    return (
      <article
        ref={ref}
        {...events}
        className={`reveal-item group relative flex h-full flex-col gap-4 rounded-[32px] p-2 pb-5 sm:gap-5 ${projectCard.frame} ${styles.panel} [@container(min-width:880px)]:flex-row-reverse [@container(min-width:880px)]:gap-0 [@container(min-width:880px)]:overflow-hidden [@container(min-width:880px)]:p-0`}
      >
        <ProjectPreview project={project} run={run} play={play} bleed={bleed} />
        <div className="flex min-w-0 flex-1 flex-col gap-4 px-3 [@container(min-width:880px)]:justify-center [@container(min-width:880px)]:py-9 [@container(min-width:880px)]:pl-10 [@container(min-width:880px)]:pr-8">
          {parts.heading}
          {parts.description}
          {parts.metric}
          {parts.tags}
          <div className={`mt-1 ${projectCard.divider}`}>{parts.links}</div>
        </div>
      </article>
    );
  }

  return (
    <article
      ref={ref}
      {...events}
      className={`reveal-item group relative flex h-full flex-col gap-3.5 rounded-[32px] bg-card p-2 pb-5 ${projectCard.frame} ${projectGrid.regular}`}
    >
      <ProjectPreview project={project} run={run} play={play} bleed={bleed} />
      <div className="mt-1.5 px-3">{parts.heading}</div>
      <div className="px-3">{parts.description}</div>
      <div className="px-3">{parts.metric}</div>
      <div className="px-3">{parts.tags}</div>
      <div className={`mx-3 mt-auto md:mt-1 ${projectCard.divider}`}>{parts.links}</div>
    </article>
  );
}
