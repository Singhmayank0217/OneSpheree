import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** DS Badge port. */
const tones = {
  neutral: 'bg-[var(--ink-100)] text-[var(--ink-700)]',
  primary: 'bg-primary-soft text-primary',
  success: 'bg-[var(--color-success-soft)] text-[var(--color-success)]',
  warning: 'bg-[var(--color-warning-soft)] text-[var(--color-warning)]',
  danger: 'bg-[var(--color-danger-soft)] text-[var(--color-danger)]',
  info: 'bg-[var(--color-info-soft)] text-[var(--color-info)]',
  onDark: 'bg-[rgba(255,255,255,.1)] text-ondark',
} as const;

export function Badge({ tone = 'neutral', children }: { tone?: keyof typeof tones; children: ReactNode }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-[10px] py-[4px] uppercase',
        'text-[length:var(--text-badge-size)] font-semibold tracking-[.04em]',
        tones[tone]
      )}
    >
      {children}
    </span>
  );
}
