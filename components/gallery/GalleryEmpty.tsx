import { Icon } from '@/components/ds/Icon';

/** Shown when a filter + search combination returns nothing. */
export function GalleryEmpty() {
  return (
    <div className="flex flex-col items-center gap-2 py-20 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-muted">
        <Icon name="search" size={22} />
      </span>
      <p className="t-h4 mt-2 text-heading">No projects match yet.</p>
      <p className="t-body-lg max-w-[360px] text-muted">
        Try a different category, or clear the search to see the full portfolio.
      </p>
    </div>
  );
}
