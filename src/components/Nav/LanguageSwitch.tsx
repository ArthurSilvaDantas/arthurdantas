'use client';

import type { MouseEvent } from 'react';
import { useContent, useLocale } from '@/src/i18n/I18nProvider';
import { htmlLang, localePath, localeShortLabel, locales } from '@/src/i18n/locales';
import type { LanguageSwitchProps, Locale, SectionId } from '@/src/types';

const hrefFor = (locale: Locale, section: SectionId | null) => {
  const base = localePath[locale];
  if (!section) return base;
  return base === '/' ? `/#${section}` : `${base}#${section}`;
};

export default function LanguageSwitch({ current }: LanguageSwitchProps) {
  const { nav } = useContent();
  const active = useLocale();

  const switchTo = (locale: Locale) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.assign(hrefFor(locale, current));
  };

  return (
    <div
      role="group"
      aria-label={nav.language.label}
      className="flex h-8 items-center rounded-full border border-line p-0.5 font-mono text-xs leading-none"
    >
      {locales.map((locale) => {
        const label = (
          <>
            <span aria-hidden>{localeShortLabel[locale]}</span>
            <span className="sr-only">{nav.language.names[locale]}</span>
          </>
        );
        return locale === active ? (
          <span key={locale} aria-current="true" className="grid h-full place-items-center rounded-full bg-soft px-2.5 text-head">
            {label}
          </span>
        ) : (
          <a
            key={locale}
            href={localePath[locale]}
            hrefLang={htmlLang[locale]}
            lang={htmlLang[locale]}
            onClick={switchTo(locale)}
            className="grid h-full place-items-center rounded-full px-2.5 text-muted transition-colors duration-200 hover:text-head"
          >
            {label}
          </a>
        );
      })}
    </div>
  );
}
