import type { DateLabels } from '@/src/types';

const parse = (ym: string) => {
  const [year, month] = ym.split('-').map(Number);
  return { year, month };
};

const currentMonth = () => {
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth() + 1 };
};

export function formatMonth(ym: string, labels: DateLabels) {
  const { year, month } = parse(ym);
  return `${labels.months[month - 1]} ${year}`;
}

export function monthsBetween(start: string, end: string | null) {
  const s = parse(start);
  const e = end ? parse(end) : currentMonth();
  return (e.year - s.year) * 12 + (e.month - s.month) + 1;
}

export function formatDuration(months: number, labels: DateLabels) {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts: string[] = [];
  if (years) parts.push(`${years} ${years === 1 ? labels.year.one : labels.year.other}`);
  if (rest) parts.push(`${rest} ${rest === 1 ? labels.month.one : labels.month.other}`);
  return parts.join(' ');
}
