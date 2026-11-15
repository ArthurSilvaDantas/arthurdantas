import type { RichTextProps } from '@/src/types';

export default function RichText({ parts }: RichTextProps) {
  return parts.map((part, i) =>
    part.strong ? (
      <strong key={i} className="font-semibold text-head">
        {part.text}
      </strong>
    ) : (
      part.text
    ),
  );
}
