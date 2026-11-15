'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useContent } from '@/src/i18n/I18nProvider';
import { useHydrated } from '@/src/hooks/useHydrated';

export default function ThemeToggle() {
  const { themeToggle } = useContent();
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useHydrated();

  const isDark = resolvedTheme === 'dark';
  const label = !mounted ? themeToggle.fallback : isDark ? themeToggle.toLight : themeToggle.toDark;

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={label}
      title={label}
      className="fixed bottom-6 right-6 z-50 grid size-[52px] place-items-center rounded-full border border-line-2 bg-card shadow-[0_10px_15px_rgba(10,26,68,0.45)] transition-colors duration-200 hover:border-accent"
    >
      <Image src="/icons/ui/moon.svg" alt="" width={22} height={22} unoptimized className="dark:hidden" />
      <Image src="/icons/ui/sun.svg" alt="" width={22} height={22} unoptimized className="hidden dark:block" />
    </button>
  );
}
