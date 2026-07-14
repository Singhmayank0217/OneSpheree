'use client';
import { serviceFilters, statusFilters } from '@/lib/portfolio';
import { cn } from '@/lib/utils';

/** Primary filter: the six service verticals (+ All Projects). */
export function PortfolioFilters({
  service,
  onService,
}: {
  service: string;
  onService: (value: string) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Filter by service vertical"
      className="no-scrollbar -mx-gutter flex gap-1.5 overflow-x-auto px-gutter lg:mx-0 lg:flex-wrap lg:px-0"
    >
      {serviceFilters.map((c) => {
        const active = service === c.value;
        return (
          <button
            key={c.value}
            role="tab"
            aria-selected={active}
            onClick={() => onService(c.value)}
            className={cn(
              'shrink-0 rounded-full border px-3 py-1.5 text-[length:var(--text-body-sm-size)] font-medium transition-colors duration-[var(--duration-base)]',
              active
                ? 'border-primary bg-primary text-white'
                : 'border-line text-body hover:border-line-strong hover:text-heading'
            )}
          >
            {c.label}
          </button>
        );
      })}
    </div>
  );
}

/** Secondary filter: delivery status (segmented). Combines with the service filter. */
export function StatusFilter({ status, onStatus }: { status: string; onStatus: (value: string) => void }) {
  return (
    <div className="flex items-center gap-2">
      <span className="t-micro shrink-0 text-muted">Status</span>
      <div
        role="tablist"
        aria-label="Filter by status"
        className="inline-flex items-center gap-0.5 rounded-full border border-line p-0.5"
      >
        {statusFilters.map((c) => {
          const active = status === c.value;
          return (
            <button
              key={c.value}
              role="tab"
              aria-selected={active}
              onClick={() => onStatus(c.value)}
              className={cn(
                'rounded-full px-3 py-1 text-[length:var(--text-body-sm-size)] font-medium transition-colors duration-[var(--duration-base)]',
                active ? 'bg-heading text-white' : 'text-body hover:text-heading'
              )}
            >
              {c.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
