import Image from 'next/image';
import { getContent } from '@/src/content';
import type { LocaleProps } from '@/src/types';
import { revealOrder } from '@/src/lib/motion';
import RichText from '@/src/components/RichText';
import SectionHeader from '@/src/components/SectionHeader';
import { aboutCard } from '@/src/styles/classes';

export default function About({ locale }: LocaleProps) {
  const { about } = getContent(locale);
  return (
    <section id="sobre" tabIndex={-1} aria-labelledby="sobre-titulo" className="section-screen focus:outline-none">
      <div className="site-container flex flex-col gap-12 py-20 lg:flex-row lg:items-center lg:gap-16 lg:pb-24 lg:pt-[104px]">
        <div className="flex min-w-0 flex-1 flex-col items-start gap-5">
          <SectionHeader id="sobre-titulo" eyebrow={about.eyebrow} title={about.title} className="w-full" />
          {about.paragraphs.map((parts, i) => (
            <p key={i} className="reveal text-base leading-[1.7] text-muted sm:text-lg" style={revealOrder(3 + i)}>
              <RichText parts={parts} />
            </p>
          ))}
        </div>

        <div className="reveal-group flex w-full flex-col gap-3 lg:w-[380px] lg:shrink-0">
          <div className={`reveal-item ${aboutCard.root} flex min-h-[100px] items-center justify-between`} style={revealOrder(2)}>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Image src="/images/about/bandeira-brasil.svg" alt="" width={18} height={13} unoptimized />
                <span className={aboutCard.label}>{about.city.label}</span>
              </div>
              <p className={aboutCard.title}>{about.city.title}</p>
              <p className={aboutCard.subtitle}>{about.city.subtitle}</p>
            </div>
            <Image src="/images/about/mapa-campo-grande-light.svg" alt={about.city.mapAlt} width={96} height={92} unoptimized className="dark:hidden" />
            <Image src="/images/about/mapa-campo-grande-dark.svg" alt={about.city.mapAlt} width={96} height={92} unoptimized className="hidden dark:block" />
          </div>

          {about.facts.map((fact, i) => (
            <div key={fact.label} className={`reveal-item ${aboutCard.root} flex flex-col gap-2`} style={revealOrder(3 + i)}>
              <p className={aboutCard.label}>{fact.label}</p>
              <p className={aboutCard.title}>{fact.title}</p>
              <p className={aboutCard.subtitle}>{fact.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
