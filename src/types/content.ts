import type { Locale } from './i18n';
import type { SectionId } from './sections';

export type RichText = { text: string; strong?: boolean }[];

export type Tech = { name: string; icon: string; iconDark?: string };

export type TagItem = { label: string; icon?: string; iconDark?: string };

export type SectionTitle = { lead: string; accent: string };

export type Profile = { name: string; href: string };

export type NavLink = { id: SectionId; label: string };

export type SkillArea = { id: string; name: string; description: string; tools: string[] };

export type ExperienceEntry = {
  role: string;
  org: string;
  start: string;
  end: string | null;
  topics: string[];
  tags: TagItem[];
};

export type ProjectCategory = 'ir' | 'nlp' | 'cv' | 'mlops';

export type ProjectFilterId = 'todos' | ProjectCategory;

export type ProjectPreviewKind = 'rag' | 'rag-stj' | 'face' | 'search' | 'classify' | 'digits';

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  categories: ProjectCategory[];
  preview: ProjectPreviewKind;
  description: string;
  metric?: { value: string; label: string };
  tags: TagItem[];
  badge?: string;
  links: { github?: string; huggingFace?: string; demo?: string };
  featured?: boolean;
};

type RagPreview = { question: string; tool: string; sources: string[]; answer: string; citations: string };

export type Content = {
  meta: { title: string; description: string; socialDescription: string; siteName: string; keywords: string[] };
  nav: {
    brand: string;
    ariaLabel: string;
    skipLink: string;
    links: NavLink[];
    cta: NavLink;
    menu: { open: string; close: string };
    language: { label: string; names: Record<Locale, string> };
  };
  themeToggle: { toLight: string; toDark: string; fallback: string };
  dates: { months: string[]; year: { one: string; other: string }; month: { one: string; other: string } };
  hero: {
    name: string;
    titlePrefix: string;
    tokens: string[];
    nextTokenLabel: string;
    bio: RichText;
    photoAlt: string;
    scrollCue: string;
    graphChips: { ml: string; engineer: string };
  };
  techMarquee: { ariaLabel: string };
  about: {
    eyebrow: string;
    title: SectionTitle;
    paragraphs: RichText[];
    city: { label: string; title: string; subtitle: string; mapAlt: string };
    facts: { label: string; title: string; subtitle: string }[];
  };
  footer: { credit: string; profiles: Profile[] };
  skills: { eyebrow: string; title: SectionTitle; lede: string; toolsLabel: string; areas: SkillArea[] };
  experience: {
    eyebrow: string;
    title: SectionTitle;
    subtitle: string;
    tabsLabel: string;
    current: string;
    today: string;
    showMore: string;
    showLess: string;
    tabs: { id: string; label: string; entries: ExperienceEntry[] }[];
  };
  projects: {
    eyebrow: string;
    title: SectionTitle;
    filtersLabel: string;
    listLabel: string;
    carousel: { label: string; roleDescription: string; goTo: string };
    live: string;
    featuredLabel: string;
    count: { one: string; other: string };
    categoryLabels: Record<ProjectCategory, string>;
    linkLabels: { github: string; huggingFace: string; demo: string };
    filters: { id: ProjectFilterId; label: string }[];
    items: Project[];
  };
  contact: { eyebrow: string; title: SectionTitle; text: string; cta: { label: string; href: string }; links: Profile[] };
  projectPreviews: {
    rag: RagPreview;
    'rag-stj': RagPreview;
    face: { fps: string; metric: string; open: string; closed: string; status: string; landmarks: string };
    search: { query: string; embedding: string; results: { title: string; path: string; score: number }[] };
    classify: { input: string; predictions: { label: string; score: number }[] };
    digits: { digits: string[]; scores: number[]; result: string };
  };
};
