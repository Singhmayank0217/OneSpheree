import Link from 'next/link';
import Image from 'next/image';
import type { BlogPostMeta } from '@/types/blog';
import { CATEGORY_META } from '@/types/blog';
import { CategoryChip } from './CategoryChip';
import { formatDate } from '@/lib/blog';

/**
 * Featured article hero card — occupies the full grid width at the top of the
 * listing page. Two-column on desktop (visual left / text right), stacked on mobile.
 */
export function BlogFeatured({ post }: { post: BlogPostMeta }) {
  const catMeta = CATEGORY_META[post.category];

  return (
    <article
      className="group relative overflow-hidden rounded-2xl border bg-white"
      style={{ borderColor: `color-mix(in srgb, ${catMeta.color} 20%, #e2e8f0)` }}
    >
      <div className="grid md:grid-cols-[1fr_1fr] lg:grid-cols-[5fr_4fr]">
        {/* Visual side */}
        <Link
          href={`/blog/${post.slug}`}
          tabIndex={-1}
          aria-hidden
          className="relative block min-h-[240px] md:min-h-[320px] overflow-hidden"
        >
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.coverImageAlt ?? post.title}
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, 55vw"
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${catMeta.tint} 0%, color-mix(in srgb, ${catMeta.color} 18%, white) 100%)`,
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle at 75% 25%, ${catMeta.color} 0%, transparent 55%)`,
                  opacity: 0.18,
                }}
              />
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 39px, ${catMeta.color} 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, ${catMeta.color} 40px)`,
                }}
              />
              <span
                className="absolute bottom-6 right-6 text-7xl font-extrabold tracking-tight opacity-[0.07] font-display select-none"
                style={{ color: catMeta.color }}
              >
                01
              </span>
            </div>
          )}
          {/* Featured label */}
          <div className="absolute top-4 left-4">
            <span
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white"
              style={{ backgroundColor: catMeta.color }}
            >
              Featured
            </span>
          </div>
        </Link>

        {/* Text side */}
        <div className="flex flex-col justify-center p-7 md:p-10">
          <div className="mb-4">
            <CategoryChip category={post.category} size="md" linked />
          </div>

          <h2 className="font-display text-xl font-bold leading-snug text-slate-950 group-hover:text-slate-700 transition-colors sm:text-2xl md:text-[1.625rem] md:leading-tight">
            <Link href={`/blog/${post.slug}`} className="hover:underline">
              {post.title}
            </Link>
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:text-base line-clamp-3">
            {post.description}
          </p>

          {/* Meta */}
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            {post.readingTime && (
              <>
                <span aria-hidden>·</span>
                <span>{post.readingTime} min read</span>
              </>
            )}
            {post.author && (
              <>
                <span aria-hidden>·</span>
                <span>{post.author}</span>
              </>
            )}
          </div>

          <div className="mt-6">
            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: catMeta.color }}
            >
              Read article
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
