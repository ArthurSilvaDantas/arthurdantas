'use client';

import { useContent } from '@/src/i18n/I18nProvider';
import { ZERO_WIDTH_SPACE } from '@/src/config/ui';
import { useTypewriter } from '@/src/hooks/useTypewriter';
import { introDelay } from '@/src/lib/motion';

export default function HeroHeadline() {
  const { hero } = useContent();
  const { text, word } = useTypewriter(hero.tokens);

  return (
    <>
      <p className="font-display font-extrabold text-head">
        <span className="sr-only">
          {hero.titlePrefix} {hero.tokens.join(', ')}
        </span>
        <span aria-hidden className="flex flex-col items-start gap-1">
          <span className="hero-rise block text-[clamp(4.5rem,9.5vw,8.5rem)] leading-[0.9] tracking-[-0.03em]" style={introDelay(0.18)}>
            <span>{hero.titlePrefix}</span>
          </span>
          <span
            className="hero-blur flex items-center gap-[10px] rounded-[10px] bg-tint py-1 pl-[14px] pr-1 text-[clamp(3.25rem,7.8vw,7rem)] leading-[1.05] tracking-[-0.03em]"
            style={introDelay(0.32)}
          >
            <span className="whitespace-pre">{text || ZERO_WIDTH_SPACE}</span>
            <span className="h-[0.98em] w-1.5 shrink-0 animate-caret rounded-[2px] bg-accent motion-reduce:animate-none" />
          </span>
        </span>
      </p>

      <p aria-hidden className="hero-fade whitespace-nowrap font-mono text-sm leading-[normal] text-head sm:text-base sm:leading-6" style={introDelay(0.48)}>
        {hero.nextTokenLabel} <span className="text-muted">→</span> <span className="text-accent-text">{word}</span>
      </p>
    </>
  );
}
