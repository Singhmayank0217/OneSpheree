'use client';
import { useMemo, useState } from 'react';
import { Container } from '@/components/layout/Container';
import { PortfolioFilters, StatusFilter } from './PortfolioFilters';
import { PortfolioGrid } from './PortfolioGrid';
import { GallerySearch } from '@/components/gallery/GallerySearch';
import { useGallerySearch } from '@/hooks/useGallerySearch';
import { filterPortfolio } from '@/lib/portfolio';
import { portfolioProjects } from '@/data/portfolio';

/**
 * Owns the service + status + search state and derives the visible set. The
 * sticky control bar rides under the navbar; the grid reflows with Flip when
 * any filter changes.
 */
export function PortfolioExplorer() {
  const [service, setService] = useState('All');
  const [status, setStatus] = useState('All');
  const { query, setQuery, debounced } = useGallerySearch();

  const visibleSlugs = useMemo(
    () => filterPortfolio(service, status, debounced).map((p) => p.slug),
    [service, status, debounced]
  );

  return (
    <>
      <div className="sticky top-[60px] z-40 border-y border-line bg-[color-mix(in_srgb,var(--surface-canvas)_86%,transparent)] backdrop-blur-md">
        <Container className="py-3">
          <PortfolioFilters service={service} onService={setService} />
          <div className="mt-2.5 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
            <StatusFilter status={status} onStatus={setStatus} />
            <div className="flex items-center justify-between gap-3 sm:justify-end">
              <GallerySearch value={query} onChange={setQuery} />
              <span className="shrink-0 whitespace-nowrap font-mono text-[length:var(--text-caption-size)] text-muted">
                {visibleSlugs.length} / {portfolioProjects.length}
              </span>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-section-sm">
        <PortfolioGrid projects={portfolioProjects} visibleSlugs={visibleSlugs} />
      </Container>
    </>
  );
}
