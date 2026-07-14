'use client';
import { useMemo } from 'react';
import { Container } from '@/components/layout/Container';
import { GalleryFilters } from './GalleryFilters';
import { GallerySearch } from './GallerySearch';
import { GalleryGrid } from './GalleryGrid';
import { useGalleryFilter } from '@/hooks/useGalleryFilter';
import { useGallerySearch } from '@/hooks/useGallerySearch';
import { filterProjects } from '@/lib/gallery';
import { galleryProjects } from '@/data/gallery';

/**
 * Owns the filter + search state and derives the visible set. The sticky
 * control bar rides under the navbar; the grid below reflows with FLIP whenever
 * the visible set changes.
 */
export function GalleryExplorer() {
  const { category, setCategory } = useGalleryFilter();
  const { query, setQuery, debounced } = useGallerySearch();

  const visibleSlugs = useMemo(
    () => filterProjects(category, debounced).map((p) => p.slug),
    [category, debounced]
  );

  return (
    <>
      <div className="sticky top-[60px] z-40 border-y border-line bg-[color-mix(in_srgb,var(--surface-canvas)_86%,transparent)] backdrop-blur-md">
        <Container className="flex flex-col gap-2.5 py-3 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <GalleryFilters category={category} onChange={setCategory} />
          <div className="flex items-center justify-between gap-3 lg:justify-end">
            <GallerySearch value={query} onChange={setQuery} />
            <span className="shrink-0 whitespace-nowrap font-mono text-[length:var(--text-caption-size)] text-muted">
              {visibleSlugs.length} / {galleryProjects.length}
            </span>
          </div>
        </Container>
      </div>

      <Container className="py-section-sm">
        <GalleryGrid projects={galleryProjects} visibleSlugs={visibleSlugs} />
      </Container>
    </>
  );
}
