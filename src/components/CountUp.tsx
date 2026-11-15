'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import { useLocale } from '@/src/i18n/I18nProvider';
import { useHydrated } from '@/src/hooks/useHydrated';
import { htmlLang, numberSeparators } from '@/src/i18n/locales';
import { COUNT_UP_DURATION_MS } from '@/src/config/ui';
import type { CountUpProps, Locale } from '@/src/types';

function parse(value: string, locale: Locale) {
  const match = value.match(/^(\D*)([\d.,]+)(.*)$/);
  if (!match) return null;
  const [, prefix, digits, suffix] = match;
  const { thousands, decimal } = numberSeparators[locale];
  const decimals = digits.includes(decimal) ? digits.split(decimal)[1].length : 0;
  const target = Number(digits.split(thousands).join('').replace(decimal, '.'));
  return Number.isFinite(target) ? { prefix, suffix, target, decimals } : null;
}

const easeOut = (p: number) => 1 - (1 - p) ** 4;

const format = (n: number, decimals: number, locale: Locale) =>
  n.toLocaleString(htmlLang[locale], { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

export default function CountUp({ value }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const locale = useLocale();
  const hydrated = useHydrated();
  const parsed = useMemo(() => parse(value, locale), [value, locale]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!parsed || reduce || !inView) return;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const next = Math.min(1, (now - start) / COUNT_UP_DURATION_MS);
      setProgress(next);
      if (next < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [parsed, inView, reduce]);

  const shown =
    hydrated && parsed && !reduce
      ? parsed.prefix + format(parsed.target * easeOut(progress), parsed.decimals, locale) + parsed.suffix
      : value;

  return (
    <span ref={ref} className="inline-grid tabular-nums">
      <span aria-hidden className="invisible col-start-1 row-start-1">
        {value}
      </span>
      <span aria-hidden className="col-start-1 row-start-1">
        {shown}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
