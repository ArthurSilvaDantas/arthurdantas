import type { ReactNode } from 'react';
import type { Content, ExperienceEntry, Project, RichText, SectionTitle, TagItem, Tech } from './content';
import type { Locale } from './i18n';
import type { SectionId } from './sections';
import type { Bleed, CarouselState, TagVariant } from './ui';

export type ChildrenProps = { children: ReactNode };

export type LocaleProps = { locale: Locale };

export type RootDocumentProps = LocaleProps & ChildrenProps;

export type I18nProviderProps = LocaleProps & ChildrenProps & { content: Content };

export type ClassNameProps = { className: string };

export type RichTextProps = { parts: RichText };

export type SectionHeaderProps = {
  id: string;
  eyebrow: string;
  title: SectionTitle;
  className?: string;
  titleClassName?: string;
  children?: ReactNode;
};

export type TitleWordsProps = { text: string; start: number };

export type TagProps = { tag: TagItem; variant?: TagVariant; className?: string };

export type TechIconProps = { tech: Pick<Tech, 'icon' | 'iconDark'>; className?: string };

export type CountUpProps = { value: string };

export type MagneticButtonProps = { href: string; children: ReactNode };

export type MarqueeTrackProps = { duplicate?: boolean };

export type HeroGraphProps = { chips: Content['hero']['graphChips'] };

export type LanguageSwitchProps = { current: SectionId | null };

export type TimelineProps = { entries: ExperienceEntry[] };

export type TimelineEntryProps = { entry: ExperienceEntry; index: number };

export type ProjectCardProps = { project: Project; bleed: Bleed };

export type ProjectPreviewProps = { project: Project; run: number; play: boolean; bleed: Bleed };

export type CarouselDotsProps = { active: number; goTo: CarouselState['goTo']; items: Project[]; className: string };

export type DemoProps = { play: boolean };

export type RagDemoProps = { kind: 'rag' | 'rag-stj' };

export type EyeProps = { cx: number; closed: boolean };
