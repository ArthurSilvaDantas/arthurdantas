import type { Locale, NumberSeparators } from '@/src/types';

export const locales: readonly Locale[] = ['pt', 'en'];

export const defaultLocale: Locale = 'pt';

export const htmlLang: Record<Locale, string> = { pt: 'pt-BR', en: 'en' };

export const ogLocale: Record<Locale, string> = { pt: 'pt_BR', en: 'en_US' };

export const localePath: Record<Locale, string> = { pt: '/', en: '/en' };

export const localeShortLabel: Record<Locale, string> = { pt: 'PT', en: 'EN' };

export const numberSeparators: Record<Locale, NumberSeparators> = {
  pt: { thousands: '.', decimal: ',' },
  en: { thousands: ',', decimal: '.' },
};
