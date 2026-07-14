'use client';
import { Icon } from '@/components/ds/Icon';

/** Instant search input — title, client, industry, service, location, tags. */
export function GallerySearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 focus-within:border-primary lg:w-64">
      <Icon name="search" size={16} className="shrink-0 text-muted" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search projects…"
        aria-label="Search projects"
        className="w-full bg-transparent text-[length:var(--text-body-sm-size)] text-heading outline-none placeholder:text-muted"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="shrink-0 text-muted transition-colors hover:text-heading"
        >
          <Icon name="x" size={15} />
        </button>
      )}
    </div>
  );
}
