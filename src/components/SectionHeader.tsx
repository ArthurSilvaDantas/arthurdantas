import type { CSSProperties } from 'react';
import type { SectionHeaderProps, TitleWordsProps } from '@/src/types';
import { revealOrder } from '@/src/lib/motion';

const titleWordStyle = (word: number) => ({ ...revealOrder(1), '--w': word }) as CSSProperties;

function Words({ text, start }: TitleWordsProps) {
  let w = start;
  return text
    .split(/(\s+)/)
    .filter(Boolean)
    .map((part, i) =>
      /^\s+$/.test(part) ? (
        part
      ) : (
        <span key={i} className="reveal-word" style={titleWordStyle(w++)}>
          <span>{part}</span>
        </span>
      ),
    );
}

const wordCount = (text: string) => text.split(/\s+/).filter(Boolean).length;

export default function SectionHeader({
  id,
  eyebrow,
  title,
  className = '',
  titleClassName = 'text-[clamp(2.25rem,4.2vw,3.25rem)]',
  children,
}: SectionHeaderProps) {
  return (
    <div className={`reveal-group flex flex-col gap-[10px] ${className}`}>
      <p className="reveal-item font-mono text-sm leading-[normal] text-accent-text" style={revealOrder(0)}>
        {eyebrow}
      </p>
      <h2 id={id} aria-label={title.lead + title.accent} className={`font-display font-bold leading-[1.05] tracking-[-0.02em] text-head ${titleClassName}`}>
        <span aria-hidden>
          <Words text={title.lead} start={0} />
          <em className="font-accent font-normal italic text-accent">
            <Words text={title.accent} start={wordCount(title.lead)} />
          </em>
        </span>
      </h2>
      {children && (
        <div className="reveal-item" style={revealOrder(3)}>
          {children}
        </div>
      )}
    </div>
  );
}
