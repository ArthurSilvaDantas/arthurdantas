'use client';

import { Fragment, useEffect, useState, type CSSProperties } from 'react';
import { motion } from 'motion/react';
import type { DemoProps, EyeProps, Point, ProjectLayout, ProjectPreviewProps, RagDemoProps } from '@/src/types';
import { useContent } from '@/src/i18n/I18nProvider';
import { duration, ease } from '@/src/lib/motion';
import { projectPreview, svgCenterOrigin } from '@/src/styles/classes';
import styles from '@/src/styles/projects.module.css';

const appear = (delay: number) => ({
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: duration.base, ease: ease.out },
});

function RagDemo({ kind }: RagDemoProps) {
  const c = useContent().projectPreviews[kind];
  return (
    <div className="flex flex-col items-start gap-1.5 [@container(min-height:200px)]:h-full [@container(min-height:200px)]:justify-center [@container(min-height:200px)]:gap-2.5">
      <motion.p
        {...appear(0.1)}
        className="line-clamp-2 rounded-[12px_12px_4px_12px] bg-tint px-2.5 py-[5px] text-xs leading-[1.4] text-head [@container(min-height:200px)]:px-[13px] [@container(min-height:200px)]:py-[9px] [@container(min-height:200px)]:text-[13px] [@container(min-height:200px)]:leading-[normal]"
      >
        {c.question}
      </motion.p>
      <motion.p {...appear(0.5)} className={`${projectPreview.chip} max-w-full truncate bg-ok-bg px-[9px] text-ok`}>
        {c.tool}
      </motion.p>
      <div className="hidden max-h-6 max-w-full flex-wrap gap-1.5 overflow-hidden [@container(min-height:200px)]:flex [@container(min-height:200px)]:max-h-none [@container(min-width:310px)]:flex">
        {c.sources.map((source, i) => (
          <motion.span
            key={source}
            {...appear(0.9 + i * 0.12)}
            className={`${projectPreview.chip} flex h-6 shrink-0 items-center bg-soft py-0 text-body [@container(min-height:200px)]:h-7`}
          >
            {source}
          </motion.span>
        ))}
      </div>
      <motion.p
        {...appear(1.5)}
        className="line-clamp-3 max-w-[460px] rounded-[12px_12px_12px_4px] bg-soft px-2.5 py-[5px] text-xs leading-[1.4] text-body [@container(min-width:310px)]:line-clamp-2 [@container(min-height:200px)]:line-clamp-none [@container(min-height:200px)]:px-[13px] [@container(min-height:200px)]:py-[9px] [@container(min-height:200px)]:text-[13px] [@container(min-height:200px)]:leading-normal"
      >
        {c.answer} <span className="font-mono text-accent-text">{c.citations}</span>
      </motion.p>
    </div>
  );
}

const svgPoints = (points: Point[]) => points.map((p) => p.join(',')).join(' ');

const jaw = Array.from({ length: 17 }, (_, k): Point => {
  const t = Math.PI - (k * Math.PI) / 16;
  return [100 + 62 * Math.cos(t), 95 + 80 * Math.sin(t)];
});
const brow = (side: -1 | 1) =>
  Array.from({ length: 5 }, (_, k): Point => [100 + side * (12 + k * 9.5), 64 - Math.sin((k / 4) * Math.PI) * 6]);
const eye = (cx: number, cy = 90): Point[] => [
  [cx - 13, cy],
  [cx - 6, cy - 5],
  [cx + 6, cy - 5],
  [cx + 13, cy],
  [cx + 6, cy + 5],
  [cx - 6, cy + 5],
];
const nose: Point[] = [
  [100, 78], [100, 88], [100, 98], [100, 108],
  [88, 116], [94, 119], [100, 121], [106, 119], [112, 116],
];
const mouth = [
  ...Array.from({ length: 12 }, (_, k): Point => [100 + 22 * Math.cos((k * Math.PI) / 6), 146 + 9 * Math.sin((k * Math.PI) / 6)]),
  ...Array.from({ length: 8 }, (_, k): Point => [100 + 13 * Math.cos((k * Math.PI) / 4), 146 + 4 * Math.sin((k * Math.PI) / 4)]),
];
const staticPoints = [...jaw, ...brow(-1), ...brow(1), ...nose, ...mouth];

function Eye({ cx, closed }: EyeProps) {
  const points = eye(cx);
  return (
    <motion.g
      animate={{ scaleY: closed ? 0.12 : 1 }}
      transition={{ duration: 0.09 }}
      style={svgCenterOrigin}
    >
      <polygon points={svgPoints(points)} className="fill-accent/10 stroke-accent" strokeWidth={1} />
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={2} className="fill-accent-text" />
      ))}
    </motion.g>
  );
}

function FaceDemo({ play }: DemoProps) {
  const c = useContent().projectPreviews.face;
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    if (!play) return;
    let timeout = 0;
    const interval = window.setInterval(() => {
      setClosed(true);
      timeout = window.setTimeout(() => setClosed(false), 220);
    }, 2800);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
      setClosed(false);
    };
  }, [play]);

  const ear = closed ? 0.03 : 0.27;

  return (
    <div className="flex h-full items-center gap-4 [@container(min-height:200px)]:gap-6">
      <div className="relative grid size-[124px] shrink-0 place-items-center rounded-xl bg-soft [@container(max-width:279px)]:size-[104px] [@container(min-height:200px)]:size-[175px]">
        <span aria-hidden className={`${projectPreview.corner} left-2.5 top-2.5 rounded-tl-md border-l-2 border-t-2 [@container(min-height:200px)]:left-3 [@container(min-height:200px)]:top-3`} />
        <span aria-hidden className={`${projectPreview.corner} right-2.5 top-2.5 rounded-tr-md border-r-2 border-t-2 [@container(min-height:200px)]:right-3 [@container(min-height:200px)]:top-3`} />
        <span aria-hidden className={`${projectPreview.corner} bottom-2.5 left-2.5 rounded-bl-md border-b-2 border-l-2 [@container(min-height:200px)]:bottom-3 [@container(min-height:200px)]:left-3`} />
        <span aria-hidden className={`${projectPreview.corner} bottom-2.5 right-2.5 rounded-br-md border-b-2 border-r-2 [@container(min-height:200px)]:bottom-3 [@container(min-height:200px)]:right-3`} />
        <svg viewBox="0 0 200 200" className="size-[106px] [@container(max-width:279px)]:size-[90px] [@container(min-height:200px)]:size-[150px]" aria-hidden>
          <polyline points={svgPoints(jaw)} className="fill-none stroke-line-2" strokeWidth={1} />
          {staticPoints.map(([x, y], i) => (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r={1.9}
              className="fill-accent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 + i * 0.012, duration: 0.2 }}
            />
          ))}
          <Eye cx={72} closed={closed} />
          <Eye cx={128} closed={closed} />
        </svg>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2.5 [@container(min-height:200px)]:gap-3">
        <p className="font-mono text-[11px] leading-[1.4] text-muted">
          <span className="whitespace-nowrap">{c.landmarks}</span> · <span className="whitespace-nowrap">{c.fps}</span>
        </p>
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-xs text-muted">{c.metric}</span>
          <span className="font-display text-[26px] font-extrabold leading-none text-head tabular-nums [@container(min-height:200px)]:text-[32px]">
            {ear.toFixed(2)}
          </span>
        </div>
        <div className="h-1.5 w-full max-w-[220px] overflow-hidden rounded-full bg-soft">
          <motion.div className="h-full rounded-full bg-accent" animate={{ width: `${(ear / 0.4) * 100}%` }} transition={{ duration: 0.12 }} />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <span className={`${projectPreview.chip} ${closed ? 'bg-tint text-tint-text' : 'bg-soft text-body'}`}>{closed ? c.closed : c.open}</span>
          <span className={`${projectPreview.chip} bg-ok-bg text-ok`}>{c.status}</span>
        </div>
      </div>
    </div>
  );
}

function SearchDemo() {
  const c = useContent().projectPreviews.search;
  return (
    <div className="flex flex-col gap-2 [@container(min-height:200px)]:gap-3">
      <motion.div {...appear(0.1)} className="flex items-center gap-2">
        <span className="flex min-w-0 flex-1 items-center gap-2 rounded-lg bg-soft px-3 py-[7px] font-mono text-xs leading-[normal] text-head [@container(min-height:200px)]:py-2">
          <span aria-hidden className="text-muted">
            ⌕
          </span>
          <span className="truncate">{c.query}</span>
        </span>
        <span className={`${projectPreview.chip} hidden shrink-0 bg-tint text-accent-text [@container(min-width:380px)]:inline`}>{c.embedding}</span>
      </motion.div>
      <ul className="flex flex-col gap-1.5 [@container(min-height:200px)]:gap-2">
        {c.results.map((r, i) => (
          <motion.li
            key={r.title}
            {...appear(0.5 + i * 0.15)}
            className="flex items-center gap-3 rounded-lg bg-soft/70 px-3 py-[5px] [@container(min-height:200px)]:gap-4 [@container(min-height:200px)]:py-2"
          >
            <span className="flex min-w-0 flex-1 items-baseline gap-2 leading-[normal]">
              <span className="truncate text-xs text-head [@container(min-height:200px)]:shrink-0 [@container(min-height:200px)]:text-[13px]">
                {r.title}
              </span>
              <span className="hidden truncate font-mono text-[11px] text-muted [@container(min-width:480px)]:inline">{r.path}</span>
            </span>
            <span className="h-1.5 w-14 shrink-0 overflow-hidden rounded-full bg-line/70 [@container(min-width:380px)]:w-20 [@container(min-height:200px)]:w-24">
              <motion.span
                className="block h-full rounded-full bg-accent"
                initial={{ width: 0 }}
                animate={{ width: `${r.score * 100}%` }}
                transition={{ delay: 0.7 + i * 0.15, duration: duration.slow, ease: ease.out }}
              />
            </span>
            <span className="w-8 shrink-0 text-right font-mono text-xs text-head tabular-nums">{r.score.toFixed(2)}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function ClassifyDemo({ play }: DemoProps) {
  const c = useContent().projectPreviews.classify;
  return (
    <div className="flex h-full items-center gap-4 [@container(min-height:200px)]:gap-6">
      <div className="flex shrink-0 flex-col items-center gap-2">
        <div className="relative size-[112px] overflow-hidden rounded-xl bg-linear-to-br from-tint to-soft [@container(min-height:200px)]:size-[150px]">
          <svg viewBox="0 0 150 150" className="absolute inset-0 h-full w-full" aria-hidden>
            <circle cx="108" cy="42" r="14" className="fill-accent/40" />
            <path d="M0 150 L48 78 L82 120 L104 96 L150 150 Z" className="fill-accent/30" />
            <path d="M0 150 L38 104 L70 150 Z" className="fill-accent/50" />
          </svg>
          {play && (
            <motion.span
              aria-hidden
              className="absolute inset-x-0 h-0.5 bg-accent shadow-[0_0_12px_rgb(var(--accent))]"
              initial={{ top: '0%' }}
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 2.4, ease: 'easeInOut', repeat: Infinity }}
            />
          )}
        </div>
        <span className="font-mono text-[11px] leading-[normal] text-muted">{c.input}</span>
      </div>
      <ul className="flex min-w-0 flex-1 flex-col gap-2.5 [@container(min-height:200px)]:gap-3">
        {c.predictions.map((p, i) => (
          <motion.li key={p.label} {...appear(0.3 + i * 0.15)} className="flex flex-col gap-1.5">
            <span className="flex items-baseline justify-between gap-3 leading-[normal]">
              <span className={`truncate text-xs [@container(min-height:200px)]:text-[13px] ${i === 0 ? 'font-semibold text-head' : 'text-body'}`}>
                {p.label}
              </span>
              <span className="font-mono text-xs text-head tabular-nums">{p.score.toFixed(2)}</span>
            </span>
            <span className="h-1.5 overflow-hidden rounded-full bg-soft">
              <motion.span
                className={`block h-full rounded-full ${i === 0 ? 'bg-accent' : 'bg-node'}`}
                initial={{ width: 0 }}
                animate={{ width: `${Math.max(p.score * 100, 2)}%` }}
                transition={{ delay: 0.5 + i * 0.15, duration: duration.slow, ease: ease.out }}
              />
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

const CROPS = [
  { bg: 'from-[#cbb89a] to-[#a48a66]', fg: 'text-[#f7f3ea]', rotate: -4 },
  { bg: 'from-[#5f6b78] to-[#3e4752]', fg: 'text-[#f2c14e]', rotate: 3 },
  { bg: 'from-[#e7e2d6] to-[#c9c1ad]', fg: 'text-[#1d2a44]', rotate: -2 },
];

function DigitsDemo({ play }: DemoProps) {
  const c = useContent().projectPreviews.digits;
  const total = c.digits.length;
  const [step, setStep] = useState(play ? 0 : total);

  useEffect(() => {
    if (!play) return;
    const id = window.setInterval(() => setStep((s) => (s >= total + 2 ? 0 : s + 1)), 700);
    return () => {
      window.clearInterval(id);
      setStep(total);
    };
  }, [play, total]);

  const read = Math.min(step, total);
  const row = '[@container(min-width:400px)]:flex-row [@container(min-width:400px)]:items-center [@container(min-width:400px)]:justify-start [@container(min-width:400px)]:gap-8';

  return (
    <div className={`flex h-full flex-col justify-center gap-3 ${row}`}>
      <div className="flex gap-2.5 [@container(min-height:200px)]:gap-3">
        {c.digits.map((digit, i) => {
          const crop = CROPS[i % CROPS.length];
          return (
            <div key={i} className="flex flex-col items-center gap-1.5 [@container(min-height:200px)]:gap-2">
              <div
                className={`relative grid h-[72px] w-[56px] place-items-center overflow-hidden rounded-md bg-linear-to-br [@container(min-height:200px)]:h-[92px] [@container(min-height:200px)]:w-[70px] ${crop.bg} ${
                  i === read && step < total ? 'ring-2 ring-accent ring-offset-2 ring-offset-card' : ''
                }`}
              >
                <span
                  className={`font-display text-[44px] font-extrabold leading-none [@container(min-height:200px)]:text-[58px] ${crop.fg}`}
                  style={{ transform: `rotate(${crop.rotate}deg)` }}
                >
                  {digit}
                </span>
              </div>
              <span className={`font-mono text-[11px] leading-[normal] transition-opacity duration-200 ${i < read ? 'text-head opacity-100' : 'opacity-0'}`}>
                {digit} · {c.scores[i].toFixed(2)}
              </span>
            </div>
          );
        })}
      </div>
      <div className="flex items-baseline gap-3 [@container(min-width:400px)]:flex-col [@container(min-width:400px)]:items-start [@container(min-width:400px)]:gap-1">
        <span className="font-mono text-[11px] leading-[normal] text-muted">{c.result}</span>
        <span className="font-display text-[32px] font-extrabold leading-none text-head tabular-nums [@container(min-height:200px)]:text-[44px]">
          {c.digits.slice(0, read).join('') || '—'}
        </span>
      </div>
    </div>
  );
}

export default function ProjectPreview({ project, run, play, bleed }: ProjectPreviewProps) {
  const { projects } = useContent();
  const demo = {
    rag: <RagDemo kind="rag" />,
    'rag-stj': <RagDemo kind="rag-stj" />,
    face: <FaceDemo play={play} />,
    search: <SearchDemo />,
    classify: <ClassifyDemo play={play} />,
    digits: <DigitsDemo play={play} />,
  }[project.preview];

  const glowSide: ProjectPreviewProps['bleed'] = bleed === 'right' ? 'left' : 'right';
  const glow = projectPreview.glow[project.preview][glowSide];
  const layout: ProjectLayout = project.featured ? 'featured' : 'regular';

  return (
    <div
      aria-hidden
      style={{ '--glow': glow } as CSSProperties}
      className={`${styles.stage} relative h-[208px] shrink-0 overflow-hidden rounded-[24px] sm:h-[220px] [@container(min-width:880px)]:h-auto [@container(min-width:880px)]:self-stretch ${project.featured ? projectPreview.featuredSide : ''}`}
    >
      <div
        className={`absolute -bottom-4 flex flex-col rounded-[14px] bg-card shadow-[0_22px_44px_-26px_rgb(var(--head)/0.4),0_0_0_1px_rgb(var(--head)/0.05)] transition-transform duration-500 ease-out motion-safe:group-focus-within:transform-[translateY(-6px)_rotate(-0.4deg)] motion-safe:group-hover:transform-[translateY(-6px)_rotate(-0.4deg)] dark:shadow-[0_22px_44px_-22px_rgb(0_0_0/0.85),0_0_0_1px_rgb(var(--head)/0.07)] ${projectPreview.top[layout]} ${projectPreview.window[bleed]}`}
      >
        <div className={`flex h-7 shrink-0 items-center gap-3 border-b border-line/70 ${projectPreview.barInset[bleed]}`}>
          <span className="flex gap-[5px]">
            {[0, 1, 2].map((i) => (
              <span key={i} className="size-[7px] rounded-full bg-line-2" />
            ))}
          </span>
          <span className="min-w-0 flex-1 truncate rounded-md bg-soft px-2.5 py-[2px] font-mono text-[11px] leading-[normal] text-muted">
            {project.slug}
            <span className="hidden [@container(min-width:600px)]:inline"> · localhost:3000</span>
          </span>
          <span className="flex shrink-0 items-center gap-1.5 font-mono text-[11px] leading-[normal] text-ok">
            <span className="size-1.5 rounded-full bg-ok motion-safe:animate-pulse" />
            {projects.live}
          </span>
        </div>
        <div className={`min-h-0 flex-1 overflow-hidden pb-5 pt-3 @container-size ${projectPreview.inset[bleed]}`}>
          {run > 0 && <Fragment key={run}>{demo}</Fragment>}
        </div>
      </div>
    </div>
  );
}
