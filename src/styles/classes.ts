import type { Bleed, ProjectLayout, ProjectPreviewKind, TagVariant } from '@/src/types';

export const tagVariants: Record<TagVariant, string> = {
  tint: 'rounded-md bg-tint text-tint-text',
  outline: 'rounded-md border border-line bg-card text-body',
  soft: 'rounded-full bg-head/5 text-body dark:bg-head/[0.07]',
};

export const tagPadding = (variant: TagVariant, hasIcon: boolean) =>
  variant === 'soft' ? (hasIcon ? 'pl-2 pr-3' : 'px-3') : hasIcon ? 'pl-[7px] pr-2.5' : 'px-2.5';

export const techIconInsets: Record<string, string> = {
  react: 'inset-[6.33%_1.09%]',
  cakephp: 'inset-[12.27%_1.56%]',
};

export const githubIconMask = 'url(/icons/social/github.svg) center / contain no-repeat';

export const aboutCard = {
  root: 'w-full rounded-[14px] border border-line bg-card px-5 py-[18px]',
  label: 'font-mono text-xs leading-[normal] text-muted',
  title: 'font-display text-xl font-medium leading-[normal] text-head',
  subtitle: 'text-[13px] leading-[normal] text-muted',
};

export const timelineBadge = 'rounded-full px-2.5 py-1 font-mono text-xs leading-[normal]';

export const heroGraph = {
  chip: 'absolute rounded-[6px] border border-line-2 bg-card px-[10px] py-[5px] font-mono text-sm leading-[normal] text-head',
  chipRing: 'absolute -inset-px rounded-[6px] border border-accent opacity-0 shadow-[0_0_0_3px_rgb(var(--accent)/0.15)]',
  comet: { core: 22, glow: 42 },
} as const;

export const svgCenterOrigin = { transformBox: 'fill-box', transformOrigin: 'center' } as const;

export const projectGrid = {
  regular: 'md:row-span-6 md:grid md:grid-rows-subgrid md:gap-y-3.5',
  featured: 'md:col-span-2 xl:col-span-6 @container',
  mdCenteredLast: 'md:col-span-2 md:[&>article]:w-[calc(50%-0.75rem)] md:[&>article]:justify-self-center',
  xlStretched: 'xl:[&>article]:w-auto xl:[&>article]:justify-self-stretch',
};

export const projectCard = {
  linkPill:
    'group/link flex h-9 items-center gap-1.5 rounded-full bg-head/5 text-head transition-colors duration-200 hover:bg-accent/15 hover:text-accent-text dark:bg-head/[0.07] dark:hover:bg-accent/15',
  arrow:
    'size-3 text-muted transition-[transform,color] duration-200 group-hover/link:-translate-y-px group-hover/link:translate-x-px group-hover/link:text-accent-text motion-reduce:transition-none motion-reduce:group-hover/link:transform-none',
  frame:
    'after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:border after:border-line after:transition-colors after:duration-300 hover:after:border-line-2 motion-reduce:after:transition-none',
  divider: 'border-t border-line pt-4',
};

export const projectPreview = {
  chip: 'rounded-md px-2 py-1 font-mono text-[11px] leading-[normal]',
  corner: 'absolute size-3 border-accent [@container(min-height:200px)]:size-3.5',
  glow: {
    rag: { left: '60% 85% at 0% 0%', right: '60% 85% at 100% 0%' },
    'rag-stj': { left: '75% 95% at 0% 0%', right: '75% 95% at 100% 0%' },
    face: { left: '60% 110% at 10% 0%', right: '60% 110% at 90% 0%' },
    search: { left: '85% 80% at 0% 10%', right: '85% 80% at 100% 10%' },
    classify: { left: '70% 100% at 0% 0%', right: '70% 100% at 100% 0%' },
    digits: { left: '65% 90% at 5% 0%', right: '65% 90% at 95% 0%' },
  } satisfies Record<ProjectPreviewKind, Record<Bleed, string>>,
  window: {
    right: 'left-6 -right-6 [@container(min-width:880px)]:left-8 [@container(min-width:880px)]:-right-8',
    left: '-left-6 right-6',
  } satisfies Record<Bleed, string>,
  inset: {
    right: 'pl-3.5 pr-[38px] [@container(min-width:880px)]:pl-4 [@container(min-width:880px)]:pr-12',
    left: 'pl-[38px] pr-3.5',
  } satisfies Record<Bleed, string>,
  barInset: {
    right: 'pl-3 pr-9 [@container(min-width:880px)]:pr-11',
    left: 'pl-9 pr-3',
  } satisfies Record<Bleed, string>,
  featuredSide: '[@container(min-width:880px)]:rounded-none [@container(min-width:880px)_and_(max-width:1099px)]:w-1/2 [@container(min-width:1100px)]:w-[44%]',
  top: {
    featured: 'top-[18px] sm:top-[22px] [@container(min-width:880px)]:top-[max(3rem,calc(100%-19.5rem))]',
    regular: 'top-[18px] sm:top-[22px]',
  } satisfies Record<ProjectLayout, string>,
};
