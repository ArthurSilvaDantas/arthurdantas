'use client';

import { createContext, useContext } from 'react';
import type { Content, I18nProviderProps, Locale } from '@/src/types';

const I18nContext = createContext<{ locale: Locale; content: Content } | null>(null);

export function I18nProvider({ locale, content, children }: I18nProviderProps) {
  return <I18nContext.Provider value={{ locale, content }}>{children}</I18nContext.Provider>;
}

function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error('useContent precisa estar dentro de <I18nProvider>.');
  return value;
}

export const useContent = () => useI18n().content;

export const useLocale = () => useI18n().locale;
