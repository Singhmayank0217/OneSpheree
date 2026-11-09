import Link from 'next/link';
import type { BlogCategory } from '@/types/blog';
import { CATEGORY_META } from '@/types/blog';

/**
 * Small category chip — used on blog cards and the article header.
 * When `href` prop is given, the chip links to the related service page.
 */
export function CategoryChip({
  category,
  size = 'sm',
  linked = false,
}: {
  category: BlogCategory;
  size?: 'sm' | 'md';
  linked?: boolean;
}) {
  const meta = CATEGORY_META[category];
  const style: React.CSSProperties = {
    backgroundColor: meta.tint,
    color: meta.textColor,
  };
  const cls =
    size === 'md'
      ? 'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold'
      : 'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold';

  const dot = (
    <span
      className={size === 'md' ? 'h-2 w-2 rounded-full' : 'h-1.5 w-1.5 rounded-full'}
      style={{ backgroundColor: meta.color }}
      aria-hidden
    />
  );

  if (linked) {
    return (
      <Link href={meta.href} className={cls} style={style}>
        {dot}
        {meta.label}
      </Link>
    );
  }

  return (
    <span className={cls} style={style}>
      {dot}
      {meta.label}
    </span>
  );
}
