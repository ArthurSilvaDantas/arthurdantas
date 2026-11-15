'use client';

import { useRef, type PointerEvent } from 'react';
import { motion, useReducedMotion, useSpring } from 'motion/react';
import { MAGNETIC } from '@/src/config/ui';
import type { MagneticButtonProps } from '@/src/types';

export default function MagneticButton({ href, children }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(0, MAGNETIC.spring);
  const y = useSpring(0, MAGNETIC.spring);
  const labelX = useSpring(0, MAGNETIC.spring);
  const labelY = useSpring(0, MAGNETIC.spring);

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(dx * MAGNETIC.pull);
    y.set(dy * MAGNETIC.pull);
    labelX.set(dx * MAGNETIC.labelPull);
    labelY.set(dy * MAGNETIC.labelPull);
  };

  const reset = () => [x, y, labelX, labelY].forEach((v) => v.set(0));

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noreferrer"
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x, y }}
      className="inline-flex rounded-full bg-head px-9 py-5 text-lg font-medium leading-[normal] text-bg shadow-[0_16px_40px_-20px_rgba(10,26,68,0.6)] transition-colors duration-200 hover:bg-accent-text focus-visible:bg-accent-text"
    >
      <motion.span style={{ x: labelX, y: labelY }} className="block">
        {children}
      </motion.span>
    </motion.a>
  );
}
