import TechIcon from '@/src/components/TechIcon';
import { tagPadding, tagVariants } from '@/src/styles/classes';
import type { TagProps } from '@/src/types';

export default function Tag({ tag, variant = 'outline', className = '' }: TagProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 py-[5px] font-mono text-xs leading-[normal] ${tagPadding(variant, Boolean(tag.icon))} ${tagVariants[variant]} ${className}`}
    >
      {tag.icon && <TechIcon tech={{ icon: tag.icon, iconDark: tag.iconDark }} className="size-3.5" />}
      {tag.label}
    </span>
  );
}
