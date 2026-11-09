import Link from 'next/link';
import type { BlogPostMeta } from '@/types/blog';
import { CATEGORY_META } from '@/types/blog';
import { CategoryChip } from './CategoryChip';
import { formatDateShort } from '@/lib/blog';

/**
 * Related articles section — 2-3 cards shown below the article body.
 */
export function RelatedArticles({ posts }: { posts: BlogPostMeta[] }) {
  if (posts.length === 0) return null;

  return (
    <section aria-labelledby="related-heading" className="border-t border-slate-100 pt-12 mt-12">
      <h2 id="related-heading" className="mb-6 text-lg font-bold text-slate-950">
        Related articles
      </h2>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" role="list">
        {posts.map((post) => {
          const catMeta = CATEGORY_META[post.category];
          return (
            <li key={post.slug}>
              <article className="group flex flex-col rounded-xl border border-slate-100 bg-white overflow-hidden hover:shadow-sm hover:border-slate-200 transition-shadow">
                {/* Colour accent bar */}
                <div className="h-1 w-full" style={{ backgroundColor: catMeta.color }} />
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2.5">
                    <CategoryChip category={post.category} />
                  </div>
                  <h3 className="text-sm font-bold leading-snug text-slate-950 group-hover:text-slate-700 transition-colors line-clamp-3">
                    <Link href={`/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </h3>
                  <div className="mt-auto pt-3 text-xs text-slate-400">
                    <time dateTime={post.publishedAt}>{formatDateShort(post.publishedAt)}</time>
                    {post.readingTime && (
                      <span className="before:content-['·'] before:mx-1.5">
                        {post.readingTime} min
                      </span>
                    )}
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
