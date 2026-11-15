'use client';

import Image from 'next/image';
import type { ReactNode } from 'react';
import { footer } from '@/src/content';
import GitHubIcon from '@/src/components/icons/GitHubIcon';

const PROFILE_ICONS: Record<string, ReactNode> = {
  GitHub: <GitHubIcon className="size-5 text-head" />,
  LinkedIn: <Image src="/icons/social/linkedin.svg" alt="" width={20} height={20} unoptimized />,
  'Hugging Face': <Image src="/icons/tech/hugging-face.svg" alt="" width={20} height={20} unoptimized />,
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="site-container flex flex-col items-start gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-[normal] text-muted">
          © {year} {footer.credit}
        </p>

        <div className="flex items-center gap-4">
          {footer.profiles.map((profile) => (
            <a
              key={profile.name}
              href={profile.href}
              target="_blank"
              rel="noreferrer"
              aria-label={profile.name}
              title={profile.name}
              className="grid size-11 place-items-center rounded-xl border border-line bg-card transition-colors duration-200 hover:border-accent"
            >
              {PROFILE_ICONS[profile.name]}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
