import Image from 'next/image';
import { techIconInsets } from '@/src/styles/classes';
import type { TechIconProps } from '@/src/types';

export default function TechIcon({ tech, className = 'size-[30px]' }: TechIconProps) {
  const inset = techIconInsets[tech.icon] ?? 'inset-0';
  const src = `/icons/tech/${tech.icon}.svg`;

  return (
    <span aria-hidden className={`relative block shrink-0 ${className}`}>
      <span className={`absolute ${inset}`}>
        <Image src={src} alt="" fill unoptimized className={tech.iconDark ? 'dark:hidden' : undefined} />
        {tech.iconDark && (
          <Image src={`/icons/tech/${tech.iconDark}.svg`} alt="" fill unoptimized className="hidden dark:block" />
        )}
      </span>
    </span>
  );
}
