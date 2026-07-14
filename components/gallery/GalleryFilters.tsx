'use client';
import { galleryCategories } from '@/lib/gallery';
import { cn } from '@/lib/utils';

/** Horizontally-scrollable category chips. Active chip fills with brand. */
export function GalleryFilters({
  category,
  onChange,
}: {
  category: string;
  onChange: (label: string) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Filter projects by category"
      className="no-scrollbar -mx-gutter flex gap-1.5 overflow-x-auto px-gutter lg:mx-0 lg:flex-wrap lg:px-0"
    >
      {galleryCategories.map((c) => {
        const active = category === c.label;
        return (
          <button
            key={c.label}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(c.label)}
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
