import { getContent } from '@/src/content';
import type { LocaleProps } from '@/src/types';
import { revealOrder } from '@/src/lib/motion';
import SectionHeader from '@/src/components/SectionHeader';
import MagneticButton from './MagneticButton';

export default function Contact({ locale }: LocaleProps) {
  const { contact } = getContent(locale);
  return (
    <section id="contato" tabIndex={-1} aria-labelledby="contato-titulo" className="section-screen focus:outline-none">
      <div className="site-container flex flex-col items-center gap-6 py-24 text-center lg:pb-24 lg:pt-[120px]">
        <SectionHeader
          id="contato-titulo"
          eyebrow={contact.eyebrow}
          title={contact.title}
          className="max-w-[900px] items-center !gap-6"
          titleClassName="text-[clamp(2.75rem,6.4vw,5rem)]"
        />
        <p className="reveal max-w-[560px] text-base leading-[1.6] text-muted sm:text-lg" style={revealOrder(3)}>
          {contact.text}
        </p>
        <div className="reveal" style={revealOrder(4)}>
          <MagneticButton href={contact.cta.href}>{contact.cta.label}</MagneticButton>
        </div>
        <ul className="reveal mt-6 flex flex-wrap justify-center gap-7" style={revealOrder(5)}>
          {contact.links.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="font-medium leading-[normal] text-body underline decoration-line-2 underline-offset-[6px] transition-colors duration-200 hover:text-head hover:decoration-head"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
