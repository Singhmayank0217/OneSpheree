'use client';

import { useState, useEffect, useRef } from 'react';
import type { TocEntry } from '@/types/blog';

/**
 * Sticky table of contents with scroll-spy.
 * Desktop: always-visible left sidebar column.
 * Mobile: collapsible accordion above the article body.
 */
export function TableOfContents({
  entries,
  accentColor,
}: {
  entries: TocEntry[];
  accentColor: string;
}) {
  const [activeId, setActiveId] = useState<string>('');
  const [open, setOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (entries.length === 0) return;

    const ids = entries.map((e) => e.id);
    const headings = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (headings.length === 0) return;

    // Fire when the heading enters the top 20% of the viewport
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the topmost visible heading
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-10% 0px -75% 0px', threshold: 0 }
    );

    headings.forEach((el) => observerRef.current!.observe(el));
    return () => observerRef.current?.disconnect();
  }, [entries]);

  if (entries.length === 0) return null;

  const tocList = (
    <nav aria-label="Table of contents">
      <ol className="space-y-0.5">
        {entries.map((entry) => {
          const isActive = activeId === entry.id;
          return (
            <li key={entry.id} style={{ paddingLeft: entry.level === 3 ? '1rem' : undefined }}>
              <a
                href={`#${entry.id}`}
                className="block rounded py-1 pr-2 text-[13px] leading-snug transition-colors"
                style={{
                  color: isActive ? accentColor : '#64748b',
                  fontWeight: isActive ? 600 : 400,
                  paddingLeft: entry.level === 3 ? '0.5rem' : '0',
                  borderLeft: isActive
                    ? `2px solid ${accentColor}`
                    : '2px solid transparent',
                }}
                onClick={() => setOpen(false)}
              >
                {entry.title}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );

  return (
    <>
      {/* ── Mobile accordion ───────────────────────────────────────────── */}
      <div className="lg:hidden mb-8 rounded-xl border border-slate-200 bg-slate-50 overflow-hidden">
        <button
          className="flex w-full items-center justify-between px-5 py-3.5 text-sm font-semibold text-slate-800"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          <span className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M3 6h18M7 12h10M11 18h2"/></svg>
            In this article
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
        {open && <div className="border-t border-slate-200 px-5 py-4">{tocList}</div>}
      </div>

      {/* ── Desktop sticky sidebar ──────────────────────────────────────── */}
      <aside
        className="hidden lg:block sticky top-24 self-start"
        aria-label="Table of contents"
      >
        <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
          In this article
        </p>
        {tocList}
      </aside>
    </>
  );
}
