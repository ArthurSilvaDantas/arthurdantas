import { en } from './en';
import { pt } from './pt';
import type { Content, Locale } from '@/src/types';

const dictionaries: Record<Locale, Content> = { pt, en };

export const getContent = (locale: Locale) => dictionaries[locale];
