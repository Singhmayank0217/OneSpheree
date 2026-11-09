/**
 * Blog post types — OneSpheree content platform.
 *
 * PUBLISHING WORKFLOW
 * ───────────────────
 * 1. Create  content/blog/<slug>.tsx
 *    Export:  export const meta: BlogPostMeta   (same object as in the registry)
 *             export default function Article() { ... }
 *
 * 2. Add an entry to BLOG_POSTS in lib/blog.ts (newest first).
 *
 * 3. Set  draft: false  (or omit draft) to make the article live.
 *    draft: true  keeps the article out of the listing, sitemap, and all
 *    public helpers — it can still be previewed at /blog/<slug> in dev.
 *
 * COVER IMAGES
 * ────────────
 * Place images under /public/blog/<slug>-cover.jpg (or .webp / .png).
 * Reference them as  coverImage: '/blog/<slug>-cover.jpg'.
 * When omitted, the card and article header show a category-tinted gradient.
 *
 * TABLE OF CONTENTS
 * ─────────────────
 * Declare toc[] manually — this keeps TOC generation simple and build-time
 * safe without requiring an HTML parser. Each entry's id must match the
 * id attribute on the corresponding heading in the article JSX.
 *
 * MIGRATING TO MDX
 * ────────────────
 * Install  next-mdx-remote  +  gray-matter  when ready.
 * Replace the .tsx body import in app/blog/[slug]/page.tsx with MDXRemote.
 * The BlogPostMeta interface and lib/blog.ts registry stay the same.
 */

// ─── Category system ─────────────────────────────────────────────────────────

export type BlogCategory =
  | 'fire-safety'
  | 'digital-marketing'
  | 'due-diligence'
  | 'e-commerce'
  | 'manpower'
  | 'financial-compliance'
  | 'sales-consulting';

export interface CategoryMeta {
  label: string;
  /** Service page href for internal linking */
  href: string;
  /** Accent colour used for chips, borders, and gradients */
  color: string;
  /** Lighter tint for backgrounds */
  tint: string;
  /** Dark readable text on the tint background */
  textColor: string;
}

export const CATEGORY_META: Record<BlogCategory, CategoryMeta> = {
  'fire-safety': {
    label: 'Fire Safety',
    href: '/services/fire-safety',
    color: '#C9392B',
    tint: '#FCF0EE',
    textColor: '#8B2018',
  },
  'digital-marketing': {
    label: 'Digital Marketing',
    href: '/services/digital-marketing',
    color: '#7C3AED',
    tint: '#F5F3FF',
    textColor: '#5B21B6',
  },
  'due-diligence': {
    label: 'Due Diligence',
    href: '/services/due-diligence',
    color: '#059669',
    tint: '#ECFDF5',
    textColor: '#065F46',
  },
  'e-commerce': {
    label: 'E-Commerce',
    href: '/services/e-commerce',
    color: '#D97706',
    tint: '#FFFBEB',
    textColor: '#92400E',
  },
  'manpower': {
    label: 'Manpower Solutions',
    href: '/services/manpower-solutions',
    color: '#1D4ED8',
    tint: '#EFF6FF',
    textColor: '#1E3A8A',
  },
  'financial-compliance': {
    label: 'Financial & Compliance',
    href: '/services/financial-compliance',
    color: '#0F766E',
    tint: '#F0FDFA',
    textColor: '#134E4A',
  },
  'sales-consulting': {
    label: 'Sales & Consulting',
    href: '/services/sales-consulting',
    color: '#0891B2',
    tint: '#ECFEFF',
    textColor: '#155E75',
  },
};

// ─── Table of contents ───────────────────────────────────────────────────────

export interface TocEntry {
  /** Must match the id attribute on the heading element in the article JSX */
  id: string;
  title: string;
  level: 2 | 3;
}

// ─── Post metadata ───────────────────────────────────────────────────────────

export interface BlogPostMeta {
  /** URL slug — must match the filename in content/blog/ */
  slug: string;
  title: string;
  /** Used as meta description and card excerpt */
  description: string;
  /** ISO 8601 date string, e.g. "2026-12-01" */
  publishedAt: string;
  /** Optional ISO 8601 updated date */
  updatedAt?: string;
  /** Primary service category — drives colour, filtering, and related posts */
  category: BlogCategory;
  /** Freeform keyword tags */
  tags: string[];
  /** Defaults to "OneSpheree Editorial Team" */
  author?: string;
  /** Author's role/title, e.g. "Head of Fire Safety Practice" */
  authorRole?: string;
  /** Path relative to /public, e.g. "/blog/fire-safety-cover.jpg" */
  coverImage?: string;
  /** Descriptive alt text for the cover image */
  coverImageAlt?: string;
  /** Path relative to /public — defaults to /og-image.png */
  ogImage?: string;
  /** Marks this post for the featured hero slot on the listing page */
  featured?: boolean;
  /** Estimated reading time in minutes */
  readingTime?: number;
  /** Table of contents — ids must match heading id attributes in the article */
  toc?: TocEntry[];
  /** Explicit related post slugs — falls back to same-category posts */
  relatedSlugs?: string[];
  /** true = article is hidden from listing, sitemap, and all public helpers */
  draft?: boolean;
}

/** A full blog post — metadata + the React component for the article body */
export interface BlogPost extends BlogPostMeta {
  content: React.ComponentType;
}
