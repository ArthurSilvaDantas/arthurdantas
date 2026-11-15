import type { LocaleProps } from '@/src/types';
import Hero from '@/src/components/Hero/Hero';
import TechMarquee from '@/src/components/TechMarquee/TechMarquee';
import About from '@/src/components/About/About';
import Skills from '@/src/components/Skills/Skills';
import Experience from '@/src/components/Experience/Experience';
import Projects from '@/src/components/Projects/Projects';
import Contact from '@/src/components/Contact/Contact';
import SectionDivider from '@/src/components/SectionDivider';

export default function HomePage({ locale }: LocaleProps) {
  return (
    <main id="conteudo" tabIndex={-1} className="focus:outline-none">
      <Hero locale={locale} />
      <TechMarquee locale={locale} />
      <About locale={locale} />
      <SectionDivider />
      <Skills locale={locale} />
      <SectionDivider />
      <Experience />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <Contact locale={locale} />
    </main>
  );
}
