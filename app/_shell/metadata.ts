import type { Metadata } from 'next';
import { getContent } from '@/src/content';
import { AUTHOR, GOOGLE_SITE_VERIFICATION, SITE_URL, SOCIAL_IMAGE } from '@/src/config/site';
import { defaultLocale, htmlLang, locales, localePath, ogLocale } from '@/src/i18n/locales';
import type { Locale } from '@/src/types';

export function buildMetadata(locale: Locale): Metadata {
  const { meta } = getContent(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: AUTHOR }],
    applicationName: meta.title,
    robots: { index: true, follow: true },
    alternates: {
      canonical: localePath[locale],
      languages: {
        ...Object.fromEntries(locales.map((l) => [htmlLang[l], localePath[l]])),
        'x-default': localePath[defaultLocale],
      },
    },
    verification: { google: GOOGLE_SITE_VERIFICATION },
    openGraph: {
      type: 'website',
      url: localePath[locale],
      siteName: meta.siteName,
      title: meta.title,
      description: meta.socialDescription,
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      images: SOCIAL_IMAGE,
    },
    twitter: { images: SOCIAL_IMAGE },
    other: { 'apple-mobile-web-app-title': meta.title },
  };
}
