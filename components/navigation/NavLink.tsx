'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

/** Nav link with sliding-underline hover + active state. */
export function NavLink({
  href,
  label,
  onDark,
  onClick,
}: {
  href: string;
  label: string;
  onDark?: boolean;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const active = pathname === href || (href !== '/' && pathname.startsWith(href));
  return (
    <Link
      href={href}
      onClick={onClick}
      data-active={active}
      className={cn(
        'link-underline text-[length:var(--text-nav-size)] font-medium transition-opacity duration-[var(--duration-base)]',
        onDark ? 'text-ondark hover:text-ondark' : 'text-heading hover:text-heading',
        !active && 'opacity-80 hover:opacity-100'
      )}
    >
      {label}
    </Link>
  );
}
