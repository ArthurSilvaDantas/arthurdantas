import type { CSSProperties } from 'react';
import { getContent } from '@/src/content';
import { techStack } from '@/src/content/shared';
import { fill } from '@/src/lib/template';
import type { LocaleProps } from '@/src/types';
import { revealOrder } from '@/src/lib/motion';
import SectionHeader from '@/src/components/SectionHeader';
import Tag from '@/src/components/Tag';
import styles from '@/src/styles/skills.module.css';

const techByName = new Map(techStack.map((t) => [t.name, t]));

export default function Skills({ locale }: LocaleProps) {
  const { skills } = getContent(locale);
  return (
    <section id="skills" tabIndex={-1} aria-labelledby="skills-titulo" className="section-screen focus:outline-hidden">
      <div className="flex flex-col gap-8 py-14 lg:gap-10">
        <div className="site-container">
          <SectionHeader id="skills-titulo" eyebrow={skills.eyebrow} title={skills.title}>
            <p className="text-base leading-[1.6] text-muted">{skills.lede}</p>
          </SectionHeader>
        </div>

        <div className="site-container">
          <ol className={styles.list}>
            {skills.areas.map((area, i) => (
              <li
                key={area.id}
                style={revealOrder(Math.min(i, 4))}
                className={`reveal group relative grid grid-cols-[2.25rem_minmax(0,1fr)] items-baseline gap-y-3 border-t border-line py-5 last:border-b sm:grid-cols-[3.5rem_minmax(0,1fr)] lg:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-x-10 lg:py-4 ${styles.row}`}
              >
                <span aria-hidden className={`pointer-events-none absolute inset-x-0 -top-px h-px origin-left bg-accent ${styles.install}`} />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-accent transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none [@media(hover:hover)]:group-hover:scale-x-100"
                />

                <span aria-hidden className={`font-mono text-sm leading-[normal] text-accent-text ${styles.dim}`}>
                  <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none [@media(hover:hover)]:group-hover:translate-x-1">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </span>

                <div className={`min-w-0 ${styles.dim}`}>
                  <h3 className="font-display text-xl font-bold leading-[1.2] tracking-[-0.02em] text-head lg:text-[1.375rem]">
                    {area.name}
                  </h3>
                  <p className="mt-1.5 text-pretty text-sm leading-[1.55] text-muted">{area.description}</p>
                </div>

                <ul aria-label={fill(skills.toolsLabel, { area: area.name })} className={`col-start-2 flex flex-wrap gap-2 lg:col-start-3 ${styles.dim}`}>
                  {area.tools.map((name, c) => {
                    const tech = techByName.get(name);
                    return (
                      <li key={name} className={styles.pkg} style={{ '--c': c } as CSSProperties}>
                        <Tag tag={{ label: name, icon: tech?.icon, iconDark: tech?.iconDark }} className={styles.chip} />
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
