const MASK = 'url(/icons/social/github.svg) center / contain no-repeat';

export default function GitHubIcon({ className }: { className: string }) {
  return <span aria-hidden className={`block shrink-0 bg-current ${className}`} style={{ mask: MASK, WebkitMask: MASK }} />;
}
