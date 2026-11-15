import { Fragment } from 'react';
import Image from 'next/image';
import { getContent } from '@/src/content';
import type { LocaleProps } from '@/src/types';
import { introDelay } from '@/src/lib/motion';
import RichText from '@/src/components/RichText';
import HeroHeadline from './HeroHeadline';
import HeroGraph from './HeroGraph';

export default function Hero({ locale }: LocaleProps) {
  const { hero } = getContent(locale);
  return (
    <section
      id="inicio"
      tabIndex={-1}
      aria-labelledby="hero-nome"
      className="relative flex min-h-[calc(100svh-var(--nav-h)-var(--marquee-h))] flex-col justify-center overflow-hidden focus:outline-hidden lg:pb-8"
    >
      <div className="relative">
        <HeroGraph chips={hero.graphChips} />

        <div className="site-container relative pb-16 pt-10 lg:pb-[104px] lg:pt-16">
          <div className="flex flex-col-reverse gap-10 lg:flex-row lg:items-center lg:gap-14">
            <div className="flex min-w-0 flex-1 flex-col items-start gap-5">
              <h1 id="hero-nome" aria-label={hero.name} className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-medium leading-[normal] text-head">
                <span aria-hidden>
                  {hero.name.split(' ').map((word, i) => (
                    <Fragment key={word}>
                      {i > 0 && ' '}
                      <span className="hero-rise" style={introDelay(0.05 + i * 0.07)}>
                        <span>{word}</span>
                      </span>
                    </Fragment>
                  ))}
                </span>
              </h1>

              <HeroHeadline />

              <p className="hero-soft max-w-[600px] text-base leading-[1.65] text-muted sm:text-lg sm:leading-7" style={introDelay(0.55)}>
                <RichText parts={hero.bio} />
              </p>
            </div>

            <div className="hero-photo relative aspect-square w-[240px] shrink-0 sm:w-[300px] lg:w-[368px]" style={introDelay(0.2)}>
              <svg aria-hidden viewBox="0 0 368 368" className="absolute inset-0 size-full">
                <circle cx="184" cy="184" r="183.25" fill="none" className="stroke-line-2" strokeWidth="1.5" pathLength={1160} strokeDasharray="4.2 3.8" />
              </svg>
              <div className="absolute left-[3.804%] top-[3.804%] size-[92.391%] overflow-hidden rounded-full border-[6px] border-card shadow-[0_14px_28px_rgba(10,26,68,0.22)]">
                <Image
                  src="/images/hero/arthur.jpg"
                  alt={hero.photoAlt}
                  fill
                  priority
                  quality={90}
                  sizes="(min-width: 1024px) 328px, (min-width: 640px) 266px, 210px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div aria-hidden className="hero-fade pointer-events-none absolute bottom-8 right-6 hidden flex-col items-center gap-3 lg:flex" style={introDelay(1.1)}>
        <span className="font-mono text-[11px] uppercase leading-none tracking-[0.2em] text-muted [writing-mode:vertical-rl]">{hero.scrollCue}</span>
        <span className="scroll-cue-line" />
      </div>
    </section>
  );
}
