import { getContent } from '@/src/content';
import { techStack } from '@/src/content/shared';
import type { LocaleProps, MarqueeTrackProps } from '@/src/types';
import TechIcon from '@/src/components/TechIcon';

function Track({ duplicate = false }: MarqueeTrackProps) {
  return (
    <div aria-hidden className={`flex shrink-0 items-center ${duplicate ? 'motion-reduce:hidden' : ''}`}>
      {techStack.map((tech) => (
        <div key={tech.name} className="flex shrink-0 items-center">
          <span className="flex items-center gap-3 px-7">
            <TechIcon tech={tech} />
            <span className="whitespace-nowrap font-display text-xl font-medium leading-[normal] text-head">{tech.name}</span>
          </span>
          <span className="inline-block w-[18px] text-center font-display text-xl font-medium leading-[normal] text-accent">✦</span>
        </div>
      ))}
    </div>
  );
}

export default function TechMarquee({ locale }: LocaleProps) {
  const { techMarquee } = getContent(locale);
  return (
    <section aria-label={techMarquee.ariaLabel} className="border-y border-line bg-bg-2 py-[22px]">
      <ul className="sr-only">
        {techStack.map((tech) => (
          <li key={tech.name}>{tech.name}</li>
        ))}
      </ul>
      <div className="scroll-hide overflow-hidden [scrollbar-width:none] motion-reduce:overflow-x-auto">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
          <Track />
          <Track duplicate />
        </div>
      </div>
    </section>
  );
}
