import { cn } from '@/lib/utils';
import type { PortfolioStatus } from '@/types/portfolio';

/** Delivery-status pill. Ongoing = live (pulsing brand dot); Completed = settled. */
export function StatusBadge({ status, className }: { status: PortfolioStatus; className?: string }) {
  const ongoing = status === 'Ongoing';
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2 py-[3px] text-[length:var(--text-micro-size)] font-bold uppercase tracking-[.08em] backdrop-blur-sm',
        ongoing
          ? 'bg-[color-mix(in_srgb,var(--blue-500)_20%,transparent)] text-[var(--blue-200)]'
          : 'bg-[rgba(255,255,255,.16)] text-white',
        className
      )}
    >
      <span
        className={cn(
          'h-1.5 w-1.5 rounded-full',
          ongoing ? 'bg-[var(--blue-300)] node-pulse' : 'bg-[rgba(255,255,255,.7)]'
        )}
      />
      {status}
    </span>
  );
}
