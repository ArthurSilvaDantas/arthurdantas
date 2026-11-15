import { githubIconMask } from '@/src/styles/classes';
import type { ClassNameProps } from '@/src/types';

export default function GitHubIcon({ className }: ClassNameProps) {
  return <span aria-hidden className={`block shrink-0 bg-current ${className}`} style={{ mask: githubIconMask, WebkitMask: githubIconMask }} />;
}
