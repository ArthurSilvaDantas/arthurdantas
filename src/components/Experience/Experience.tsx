'use client';

import { useId, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useContent } from '@/src/i18n/I18nProvider';
import { duration, ease, revealOrder } from '@/src/lib/motion';
import SectionHeader from '@/src/components/SectionHeader';
import Timeline from './Timeline';

export default function Experience() {
  const { experience } = useContent();
  const { tabs } = experience;
  const [selected, setSelected] = useState(0);
  const tab = tabs[selected];

  const baseId = useId();
  const panelId = `${baseId}-panel`;
  const tabDomId = (id: string) => `${baseId}-tab-${id}`;

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const next = (selected + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    setSelected(next);
    document.getElementById(tabDomId(tabs[next].id))?.focus();
  };

  return (
    <section id="experiencia" tabIndex={-1} aria-labelledby="experiencia-titulo" className="section-screen focus:outline-hidden">
      <div className="site-container flex flex-col gap-12 pb-16 pt-20 lg:pt-24">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader id="experiencia-titulo" eyebrow={experience.eyebrow} title={experience.title}>
            <p className="text-base leading-[normal] text-muted">{experience.subtitle}</p>
          </SectionHeader>

          <div
            role="tablist"
            style={revealOrder(2)}
            aria-label={experience.tabsLabel}
            onKeyDown={onKeyDown}
            className="reveal flex shrink-0 self-start rounded-full border border-line-2 bg-card p-1 lg:self-auto"
          >
            {tabs.map((t, i) => {
              const isSelected = i === selected;
              return (
                <button
                  key={t.id}
                  id={tabDomId(t.id)}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={panelId}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setSelected(i)}
                  className={`relative flex h-11 w-[132px] items-center justify-center gap-1.5 rounded-full leading-[normal] transition-colors duration-200 sm:w-[150px] ${
                    isSelected ? 'text-bg' : 'text-body hover:text-head'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId={`${baseId}-pill`}
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-head"
                      transition={{ duration: duration.base, ease: ease.out }}
                    />
                  )}
                  <span className="relative text-[15px] font-medium">{t.label}</span>
                  <span className="relative font-mono text-xs opacity-70">{t.entries.length}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div id={panelId} role="tabpanel" aria-labelledby={tabDomId(tab.id)}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={tab.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: duration.base, ease: ease.out }}
            >
              <Timeline entries={tab.entries} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
