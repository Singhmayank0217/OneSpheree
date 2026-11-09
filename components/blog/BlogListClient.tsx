'use client';

import { useState, useMemo } from 'react';
import type { BlogPostMeta, BlogCategory } from '@/types/blog';
import { CATEGORY_META } from '@/types/blog';
import { BlogCard } from './BlogCard';
import { BlogFeatured } from './BlogFeatured';

/**
 * Client component that wraps the blog listing with search + category filter.
 * Receives all published posts as props (server-fetched); filtering is in-browser.
 */
export function BlogListClient({
  posts,
  featuredPost,
}: {
  posts: BlogPostMeta[];
  featuredPost: BlogPostMeta | undefined;
}) {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | 'all'>('all');
  const [query, setQuery] = useState('');

  // Derive categories that actually have posts
  const categories = useMemo(() => {
    const cats = new Set(posts.map((p) => p.category));
    return Array.from(cats);
  }, [posts]);

  // Apply filter + search
  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchCat = activeCategory === 'all' || p.category === activeCategory;
      const q = query.trim().toLowerCase();
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q));
      return matchCat && matchSearch;
    });
  }, [posts, activeCategory, query]);

  // Determine which post is featured in current view
  const featured =
    activeCategory === 'all' && !query ? featuredPost : undefined;

  // Posts shown in the grid (exclude featured from grid when it would duplicate)
  const gridPosts =
    featured
      ? filtered.filter((p) => p.slug !== featured.slug)
      : filtered;

  return (
    <>
      {/* ── Filter bar ─────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-10 -mx-4 px-4 py-3 backdrop-blur-md bg-white/90 border-b border-slate-100 sm:relative sm:top-auto sm:z-auto sm:mx-0 sm:px-0 sm:py-0 sm:bg-transparent sm:backdrop-blur-none sm:border-none sm:mb-8">
        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative flex-1 min-w-[180px] max-w-xs">
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
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              aria-hidden
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles…"
              className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm placeholder-slate-400 focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-300 transition"
            />
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setActiveCategory('all')}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                activeCategory === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All
              <span className="ml-1 opacity-60">({posts.length})</span>
            </button>
            {categories.map((cat) => {
              const meta = CATEGORY_META[cat];
              const count = posts.filter((p) => p.category === cat).length;
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(isActive ? 'all' : cat)}
                  className="rounded-full px-3 py-1 text-xs font-semibold transition-colors"
                  style={
                    isActive
                      ? { backgroundColor: meta.color, color: '#fff' }
                      : { backgroundColor: meta.tint, color: meta.textColor }
                  }
                >
                  {meta.label}
                  <span className="ml-1 opacity-70">({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Featured post ──────────────────────────────────────────────── */}
      {featured && (
        <div className="mb-10">
          <BlogFeatured post={featured} />
        </div>
      )}

      {/* ── Grid ───────────────────────────────────────────────────────── */}
      {gridPosts.length > 0 ? (
        <ul
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          {gridPosts.map((post) => (
            <li key={post.slug}>
              <BlogCard post={post} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 py-16 text-center">
          <p className="text-sm font-medium text-slate-500">
            {query
              ? `No articles match "${query}"`
              : 'No articles in this category yet.'}
          </p>
          <button
            onClick={() => { setQuery(''); setActiveCategory('all'); }}
            className="mt-3 text-sm font-semibold text-violet-600 hover:text-violet-800 transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
