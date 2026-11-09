import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { BlogListClient } from '@/components/blog/BlogListClient';
import { getPublishedPosts, getFeaturedPost } from '@/lib/blog';

// ─── Metadata ─────────────────────────────────────────────────────────────────

const publishedCount = getPublishedPosts().length;

export const metadata: Metadata = {
  title: 'Insights & Articles — OneSpheree',
  description:
    'Expert guides, compliance updates, and strategic thinking from the OneSpheree team across digital marketing, fire safety, due diligence, e-commerce, manpower solutions, sales consulting, and financial compliance.',
  alternates: { canonical: 'https://www.onespheree.com/blog' },
  openGraph: {
    title: 'Insights & Articles — OneSpheree',
    description:
      'Expert guides and strategic thinking across seven business practices.',
    url: 'https://www.onespheree.com/blog',
    siteName: 'OneSpheree',
    type: 'website',
    locale: 'en_US',
    images: [{ url: 'https://www.onespheree.com/og-image.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  // noindex until at least one article is published
  robots: publishedCount > 0
    ? { index: true, follow: true }
    : { index: false, follow: true },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogPage() {
  const posts = getPublishedPosts();
  const featuredPost = getFeaturedPost();
  const hasPosts = posts.length > 0;

  return (
    <main className="min-h-screen bg-white">

      {/* ── Page header ─────────────────────────────────────────────────── */}
      <div className="bg-slate-950 pt-24 pb-14 md:pt-28 md:pb-16">
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">
              Insights
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              Articles &amp; Expertise
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base max-w-xl">
              Practical guides, compliance updates, and strategic thinking from
              the OneSpheree team — written to help you make better business decisions.
            </p>
          </div>
        </Container>
      </div>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <Container className="py-12 md:py-16">
        {hasPosts ? (
          <BlogListClient posts={posts} featuredPost={featuredPost} />
        ) : (
          /* Empty state — shown until first article is published */
          <div className="mx-auto max-w-md rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-8 py-20 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7C3AED"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2z" />
                <path d="M9 9h6M9 13h6M9 17h4" />
              </svg>
            </div>
            <h2 className="text-base font-bold text-slate-800">
              Articles coming soon
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Expert guides across all seven practice areas — check back shortly.
            </p>
            <div className="mt-6">
              <a
                href="/services"
                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 transition-colors"
              >
                Explore our services
              </a>
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}
