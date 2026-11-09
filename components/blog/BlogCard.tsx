import Link from 'next/link';
import Image from 'next/image';
import type { BlogPostMeta } from '@/types/blog';
import { CATEGORY_META } from '@/types/blog';
import { CategoryChip } from './CategoryChip';
import { formatDateShort } from '@/lib/blog';

/**
 * Standard article card — used in the blog grid.
 * Cover image is optional; falls back to a category-tinted gradient.
 */
export function BlogCard({ post }: { post: BlogPostMeta }) {
  const catMeta = CATEGORY_META[post.category];

  return (
    <article className="group flex flex-col rounded-xl border border-slate-100 bg-white overflow-hidden transition-shadow duration-200 hover:shadow-md hover:border-slate-200">
      {/* Cover image / gradient placeholder */}
      <Link
        href={`/blog/${post.slug}`}
        tabIndex={-1}
        aria-hidden
        className="relative block overflow-hidden"
        style={{ aspectRatio: '16/9' }}
      >
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt ?? post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          />
        ) : (
          /* Category-tinted gradient placeholder */
          <div
            className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]"
            style={{
              background: `linear-gradient(135deg, ${catMeta.tint} 0%, color-mix(in srgb, ${catMeta.color} 12%, white) 100%)`,
            }}
          >
            {/* Decorative diagonal accent line */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: `radial-gradient(circle at 80% 20%, ${catMeta.color} 0%, transparent 60%)`,
              }}
            />
            <span
              className="absolute bottom-4 right-4 text-4xl font-extrabold tracking-tight opacity-10 font-display select-none"
              style={{ color: catMeta.color }}
            >
              OS
            </span>
          </div>
        )}
        {/* Category accent bar at bottom of image */}
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5"
          style={{ backgroundColor: catMeta.color }}
        />
      </Link>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3">
          <CategoryChip category={post.category} />
        </div>

        <h2 className="text-base font-bold text-slate-950 leading-snug group-hover:text-slate-700 transition-colors line-clamp-3">
          <Link href={`/blog/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h2>

        <p className="mt-2 text-sm leading-relaxed text-slate-500 line-clamp-2 flex-1">
          {post.description}
        </p>

        {/* Meta row */}
        <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-100 pt-3.5 text-xs text-slate-400">
          <div className="flex items-center gap-2 min-w-0">
            <time dateTime={post.publishedAt} className="shrink-0">
              {formatDateShort(post.publishedAt)}
            </time>
            {post.readingTime && (
              <>
                <span aria-hidden className="shrink-0">·</span>
                <span className="shrink-0">{post.readingTime} min read</span>
              </>
            )}
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="shrink-0 font-semibold transition-colors"
            style={{ color: catMeta.color }}
            aria-label={`Read: ${post.title}`}
          >
            Read →
          </Link>
        </div>
      </div>
    </article>
  );
}
