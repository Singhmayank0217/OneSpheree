/**
 * Blog registry — single source of truth for all OneSpheree articles.
 *
 * HOW TO PUBLISH AN ARTICLE
 * ──────────────────────────
 * 1. Create  content/blog/<slug>.tsx
 *    - export const meta: BlogPostMeta   (identical to the entry below)
 *    - export default function Article() { return <article>…</article> }
 *
 * 2. Add an entry to BLOG_POSTS (newest first).
 *
 * 3. Set  draft: false  (or remove the draft field) to make it live.
 *    Re-deploy — the listing, sitemap, and structured data update automatically.
 *
 * DRAFT ARTICLES
 * ──────────────
 * draft: true keeps an article out of ALL public surfaces (listing, sitemap,
 * related posts, category pages). The article is still importable for local
 * preview at /blog/<slug> in development.
 */

import type { BlogPostMeta, BlogCategory } from '@/types/blog';

// ─── Post Registry ────────────────────────────────────────────────────────────
// Keep newest first. Set draft: true to exclude from listing + sitemap.

export const BLOG_POSTS: BlogPostMeta[] = [
  {
    slug: 'fire-safety-compliance-checklist-commercial-buildings',
    title: 'Fire Safety Compliance Checklist for Commercial Buildings',
    description:
      'A practical guide covering detection systems, suppression equipment, emergency egress, signage, staff training, and documentation requirements for commercial fire safety compliance.',
    publishedAt: '2026-12-15',
    category: 'fire-safety',
    tags: ['fire-safety', 'compliance', 'commercial-buildings', 'amc'],
    author: 'OneSpheree Fire Safety Team',
    authorRole: 'Fire Safety Practice',
    readingTime: 8,
    featured: true,
    toc: [
      { id: 'why-compliance-matters', title: 'Why Fire Safety Compliance Matters', level: 2 },
      { id: 'detection-alarm-systems', title: 'Detection & Alarm Systems', level: 2 },
      { id: 'suppression-equipment', title: 'Suppression Equipment', level: 2 },
      { id: 'emergency-egress', title: 'Emergency Egress & Exit Routes', level: 2 },
      { id: 'signage-emergency-lighting', title: 'Signage & Emergency Lighting', level: 2 },
      { id: 'documentation-records', title: 'Documentation & Records', level: 2 },
      { id: 'staff-training', title: 'Staff Training & Fire Drills', level: 2 },
      { id: 'annual-maintenance-contract', title: 'Annual Maintenance Contracts (AMC)', level: 2 },
      { id: 'working-with-a-partner', title: 'Working with a Fire Safety Partner', level: 2 },
    ],
    draft: true,
  },
  {
    slug: 'how-to-choose-a-digital-marketing-agency',
    title: 'How to Choose the Right Digital Marketing Agency for Your Business',
    description:
      'A practical framework for evaluating digital marketing agencies — covering goal-setting, service types, portfolio review, pricing models, contracts, and the questions that separate good agencies from great ones.',
    publishedAt: '2026-12-08',
    category: 'digital-marketing',
    tags: ['digital-marketing', 'agency', 'seo', 'lead-generation'],
    author: 'OneSpheree Digital Marketing Team',
    authorRole: 'Digital Marketing Practice',
    readingTime: 7,
    toc: [
      { id: 'define-your-goals', title: 'Define Your Goals First', level: 2 },
      { id: 'types-of-agencies', title: 'Types of Digital Marketing Agencies', level: 2 },
      { id: 'what-to-look-for', title: 'What to Look For', level: 2 },
      { id: 'red-flags', title: 'Red Flags to Avoid', level: 2 },
      { id: 'questions-to-ask', title: 'Questions to Ask', level: 2 },
      { id: 'pricing-and-contracts', title: 'Pricing & Contracts', level: 2 },
      { id: 'making-your-decision', title: 'Making Your Decision', level: 2 },
    ],
    draft: true,
  },
  {
    slug: 'business-due-diligence-complete-guide',
    title: 'Business Due Diligence: A Complete Guide for Companies',
    description:
      'Everything you need to know about conducting business due diligence — types, process, key documents, common findings, and when to bring in professional support.',
    publishedAt: '2026-12-01',
    category: 'due-diligence',
    tags: ['due-diligence', 'risk-assessment', 'business-verification', 'compliance'],
    author: 'OneSpheree Due Diligence Team',
    authorRole: 'Due Diligence Practice',
    readingTime: 9,
    toc: [
      { id: 'what-is-due-diligence', title: 'What is Due Diligence?', level: 2 },
      { id: 'types-of-due-diligence', title: 'Types of Due Diligence', level: 2 },
      { id: 'when-you-need-it', title: 'When You Need Due Diligence', level: 2 },
      { id: 'the-process', title: 'The Due Diligence Process', level: 2 },
      { id: 'key-documents', title: 'Key Documents to Request', level: 2 },
      { id: 'common-findings', title: 'Common Issues Discovered', level: 2 },
      { id: 'how-long-it-takes', title: 'How Long Does It Take?', level: 2 },
      { id: 'professional-support', title: 'Working with a Due Diligence Partner', level: 2 },
    ],
    draft: true,
  },
  {
    slug: 'gst-compliance-checklist-india',
    title: 'GST Compliance Checklist for Indian Businesses',
    description:
      'A clear, practical checklist covering GST registration, invoice requirements, GSTR-1 and GSTR-3B filings, input tax credit, e-way bills, and the annual return — with common compliance mistakes to avoid.',
    publishedAt: '2026-11-24',
    category: 'financial-compliance',
    tags: ['gst', 'compliance', 'taxation', 'india', 'gstr'],
    author: 'OneSpheree Financial & Compliance Team',
    authorRole: 'Financial & Compliance Practice',
    readingTime: 8,
    toc: [
      { id: 'gst-registration', title: 'GST Registration', level: 2 },
      { id: 'invoice-requirements', title: 'Invoice Requirements', level: 2 },
      { id: 'filing-gstr1', title: 'Filing GSTR-1', level: 2 },
      { id: 'filing-gstr3b', title: 'Filing GSTR-3B', level: 2 },
      { id: 'input-tax-credit', title: 'Input Tax Credit (ITC)', level: 2 },
      { id: 'e-way-bills', title: 'E-Way Bills', level: 2 },
      { id: 'annual-return', title: 'Annual Return (GSTR-9)', level: 2 },
      { id: 'common-mistakes', title: 'Common Compliance Mistakes', level: 2 },
      { id: 'working-with-a-ca', title: 'Working with a GST Consultant', level: 2 },
    ],
    draft: false,
  },
  {
    slug: 'permanent-staffing-vs-contract-staffing',
    title: 'Permanent Staffing vs Contract Staffing: Which Model Fits Your Business?',
    description:
      'A practical comparison of permanent and contract staffing models — covering cost structure, compliance obligations, flexibility, and a decision framework to help you choose the right approach.',
    publishedAt: '2026-11-17',
    category: 'manpower',
    tags: ['staffing', 'hr', 'manpower', 'contract-staffing', 'permanent-staffing'],
    author: 'OneSpheree Manpower Solutions Team',
    authorRole: 'Manpower Solutions Practice',
    readingTime: 7,
    toc: [
      { id: 'understanding-the-difference', title: 'Understanding the Difference', level: 2 },
      { id: 'cost-considerations', title: 'Cost Considerations', level: 2 },
      { id: 'compliance-obligations', title: 'Compliance & Legal Obligations', level: 2 },
      { id: 'when-to-choose-permanent', title: 'When to Choose Permanent Staffing', level: 2 },
      { id: 'when-to-choose-contract', title: 'When to Choose Contract Staffing', level: 2 },
      { id: 'hybrid-approach', title: 'The Hybrid Approach', level: 2 },
      { id: 'making-the-right-decision', title: 'Making the Right Decision', level: 2 },
    ],
    draft: true,
  },
  {
    slug: 'grow-business-amazon-flipkart',
    title: 'How to Grow Your Business on Amazon and Flipkart',
    description:
      'A step-by-step guide to selling successfully on India\'s largest marketplaces — from account setup and listing optimisation to fulfilment, advertising, and managing your seller performance.',
    publishedAt: '2026-11-10',
    category: 'e-commerce',
    tags: ['e-commerce', 'amazon', 'flipkart', 'marketplace', 'india'],
    author: 'OneSpheree E-Commerce Team',
    authorRole: 'E-Commerce Practice',
    readingTime: 9,
    toc: [
      { id: 'getting-started', title: 'Getting Started on Each Platform', level: 2 },
      { id: 'optimising-listings', title: 'Optimising Your Product Listings', level: 2 },
      { id: 'pricing-strategy', title: 'Pricing Strategy', level: 2 },
      { id: 'fulfilment-options', title: 'Fulfilment Options', level: 2 },
      { id: 'advertising', title: 'Advertising on Marketplaces', level: 2 },
      { id: 'reviews-ratings', title: 'Managing Reviews & Ratings', level: 2 },
      { id: 'tracking-performance', title: 'Tracking Performance', level: 2 },
      { id: 'common-mistakes', title: 'Common Mistakes to Avoid', level: 2 },
    ],
    draft: false,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** All published (non-draft) posts, newest first */
export function getPublishedPosts(): BlogPostMeta[] {
  return BLOG_POSTS.filter((p) => !p.draft);
}

/** Find one post by slug — returns published posts only */
export function getPostBySlug(slug: string): BlogPostMeta | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug && !p.draft);
}

/** All published slugs — used by generateStaticParams */
export function getAllSlugs(): string[] {
  return getPublishedPosts().map((p) => p.slug);
}

/** The single featured post (first post with featured: true, else newest post) */
export function getFeaturedPost(): BlogPostMeta | undefined {
  const published = getPublishedPosts();
  return published.find((p) => p.featured) ?? published[0];
}

/** All posts for a given category (published only) */
export function getPostsByCategory(category: BlogCategory): BlogPostMeta[] {
  return getPublishedPosts().filter((p) => p.category === category);
}

/** All categories that have at least one published post */
export function getActiveCategories(): BlogCategory[] {
  const cats = new Set(getPublishedPosts().map((p) => p.category));
  return Array.from(cats);
}

/**
 * Related posts for a given article.
 * Uses relatedSlugs if declared, otherwise same-category posts (excluding self).
 * Returns at most 3 posts.
 */
export function getRelatedPosts(post: BlogPostMeta): BlogPostMeta[] {
  const published = getPublishedPosts();

  if (post.relatedSlugs && post.relatedSlugs.length > 0) {
    return post.relatedSlugs
      .map((slug) => published.find((p) => p.slug === slug))
      .filter((p): p is BlogPostMeta => p !== undefined)
      .slice(0, 3);
  }

  return published
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);
}

/** ISO date → human-readable, e.g. "15 December 2026" */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/** Short date, e.g. "15 Dec 2026" */
export function formatDateShort(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
