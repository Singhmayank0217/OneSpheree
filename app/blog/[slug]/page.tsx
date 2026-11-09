import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { CategoryChip } from '@/components/blog/CategoryChip';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { SocialShare } from '@/components/blog/SocialShare';
import { RelatedArticles } from '@/components/blog/RelatedArticles';
import {
  getPostBySlug,
  getAllSlugs,
  formatDate,
  getRelatedPosts,
} from '@/lib/blog';
import { buildMetadata, articleJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import { CATEGORY_META } from '@/types/blog';
import { site } from '@/config/site';

// ─── Static generation ──────────────────────────────────────────────────────

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

// ─── Per-page metadata ──────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: 'Article not found', robots: { index: false, follow: false } };
  }

  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    ogImage: post.ogImage ?? post.coverImage,
    type: 'article',
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    authors: post.author ? [post.author] : undefined,
  });
}

// ─── Page component ─────────────────────────────────────────────────────────

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const catMeta = CATEGORY_META[post.category];
  const relatedPosts = getRelatedPosts(post);
  const articleUrl = `${site.url}/blog/${post.slug}`;

  // ── Dynamically load article body ─────────────────────────────────────────
  let ArticleBody: React.ComponentType = DefaultBody;
  try {
    const mod = await import(`@/content/blog/${slug}`).catch(() => null);
    if (mod?.default) {
      ArticleBody = mod.default;
    }
  } catch {
    // content file not yet created — render placeholder
  }

  // ── Structured data ────────────────────────────────────────────────────────
  const articleLd = articleJsonLd({
    title: post.title,
    description: post.description,
    url: articleUrl,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    author: post.author,
    ogImage: post.ogImage
      ? `${site.url}${post.ogImage}`
      : post.coverImage
        ? `${site.url}${post.coverImage}`
        : undefined,
  });

  const breadcrumbLd = breadcrumbJsonLd([
    { name: 'Home', href: '/' },
    { name: 'Insights', href: '/blog' },
    { name: post.title, href: `/blog/${post.slug}` },
  ]);

  return (
    <main className="min-h-screen bg-white">
      {/* ── Structured data ─────────────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* ── Article hero ─────────────────────────────────────────────────── */}
      <header className="bg-slate-950">
        <div className="pt-24 pb-10 md:pt-28 md:pb-12">
          <Container>
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-1 text-xs text-slate-500">
                <li>
                  <Link href="/" className="hover:text-slate-300 transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden className="text-slate-600">/</li>
                <li>
                  <Link href="/blog" className="hover:text-slate-300 transition-colors">
                    Insights
                  </Link>
                </li>
                <li aria-hidden className="text-slate-600">/</li>
                <li className="text-slate-400 line-clamp-1 max-w-xs">{post.title}</li>
              </ol>
            </nav>

            {/* Category chip */}
            <div className="mb-4">
              <CategoryChip category={post.category} size="md" linked />
            </div>

            {/* Title */}
            <h1 className="max-w-3xl text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl">
              {post.title}
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
              {post.description}
            </p>

            {/* Meta row */}
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
              {post.author && (
                <span className="font-medium text-slate-300">
                  {post.author}
                  {post.authorRole && (
                    <span className="ml-1.5 font-normal text-slate-500">
                      · {post.authorRole}
                    </span>
                  )}
                </span>
              )}
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
              {post.updatedAt && post.updatedAt !== post.publishedAt && (
                <span>
                  Updated{' '}
                  <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
                </span>
              )}
              {post.readingTime && (
                <span
                  className="inline-flex items-center gap-1"
                  aria-label={`${post.readingTime} minute read`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {post.readingTime} min read
                </span>
              )}
            </div>
          </Container>
        </div>

        {/* ── Cover image or category colour band ─────────────────────── */}
        {post.coverImage ? (
          <div className="relative h-56 w-full sm:h-72 md:h-96">
            <Image
              src={post.coverImage}
              alt={post.coverImageAlt ?? post.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
          </div>
        ) : (
          /* Decorative gradient band in category colour */
          <div
            className="h-1.5 w-full"
            style={{
              background: `linear-gradient(90deg, ${catMeta.color} 0%, ${catMeta.color}99 100%)`,
            }}
            aria-hidden
          />
        )}
      </header>

      {/* ── Article body ─────────────────────────────────────────────────── */}
      <Container className="py-12 md:py-16">
        {/* Two-column layout: TOC (desktop) | article prose */}
        <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-12 xl:grid-cols-[260px_1fr] xl:gap-16">

          {/* ── Table of contents ──────────────────────────────────────── */}
          {post.toc && post.toc.length > 0 && (
            <TableOfContents entries={post.toc} accentColor={catMeta.color} />
          )}

          {/* ── Prose column ───────────────────────────────────────────── */}
          <div className={post.toc && post.toc.length > 0 ? '' : 'max-w-3xl'}>
            {/* Article content */}
            <article className="blog-prose">
              <ArticleBody />
            </article>

            {/* Divider */}
            <div className="mt-10 border-t border-slate-100 pt-8">
              {/* Share strip */}
              <SocialShare url={articleUrl} title={post.title} />
            </div>

            {/* Related articles */}
            {relatedPosts.length > 0 && (
              <RelatedArticles posts={relatedPosts} />
            )}

            {/* ── CTA block ──────────────────────────────────────────── */}
            <div
              className="mt-12 rounded-2xl p-6 sm:p-8"
              style={{ backgroundColor: catMeta.tint }}
            >
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: catMeta.textColor }}>
                Get expert help
              </p>
              <h2 className="mt-2 text-lg font-extrabold text-slate-950 sm:text-xl">
                Ready to work with OneSpheree?
              </h2>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate-600">
                Speak with our {catMeta.label.toLowerCase()} specialists about how we can help
                you achieve your goals.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors"
                  style={{ backgroundColor: catMeta.color }}
                >
                  Contact us
                </Link>
                <Link
                  href={catMeta.href}
                  className="inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors hover:bg-white/60"
                  style={{ borderColor: catMeta.color, color: catMeta.textColor }}
                >
                  {catMeta.label} services
                </Link>
              </div>
            </div>

            {/* Back to blog */}
            <div className="mt-10">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
              >
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
                >
                  <path d="m19 12H5" />
                  <path d="m12 5-7 7 7 7" />
                </svg>
                All articles
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}

// ─── Fallback article body ───────────────────────────────────────────────────

function DefaultBody() {
  return (
    <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
      Article content is being prepared. Check back shortly.
    </p>
  );
}
