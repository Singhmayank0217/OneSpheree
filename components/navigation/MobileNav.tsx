'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { primaryNav } from '@/data/navigation';
import { services } from '@/data/services';
import { Button } from '@/components/ds/Button';
import { Icon } from '@/components/ds/Icon';
import { cn } from '@/lib/utils';

/** Fullscreen mobile navigation overlay. */
export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation"
      aria-hidden={!open}
      className={cn(
        'fixed inset-0 z-modal flex flex-col bg-dark-tint transition-[opacity,visibility] duration-[var(--duration-slow)] ease-[var(--ease-out)] lg:hidden',
        open ? 'visible opacity-100' : 'invisible opacity-0 pointer-events-none'
      )}
    >
      <div className="flex items-center justify-between px-gutter py-2">
        <Link href="/" onClick={onClose} aria-label="OneSpheree home">
          <Image src="/logos/onespheree-mark.png" alt="" width={40} height={40} />
        </Link>
        <button
          onClick={onClose}
          aria-label="Close navigation"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line-dark text-ondark"
        >
          <Icon name="x" size={22} />
        </button>
      </div>
      <nav className="flex flex-1 flex-col justify-center gap-3 px-gutter" aria-label="Primary">
        {primaryNav.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={cn(
              'font-display text-[2rem] font-bold leading-[1.15] text-ondark transition-all duration-[var(--duration-slow)] ease-[var(--ease-out)] hover:text-ondark hover:no-underline',
              pathname.startsWith(item.href) ? 'opacity-100' : 'opacity-70',
              open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            )}
            style={{ transitionDelay: open ? `${80 + i * 40}ms` : '0ms' }}
          >
            {item.label}
          </Link>
        ))}
        <div
          className={cn(
            'mt-2 flex flex-wrap gap-x-3 gap-y-1 transition-all duration-[var(--duration-slow)]',
            open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          )}
          style={{ transitionDelay: open ? '340ms' : '0ms' }}
        >
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              onClick={onClose}
              className="text-[length:var(--text-body-sm-size)] text-ondark-muted hover:text-ondark"
            >
              {s.name}
            </Link>
          ))}
        </div>
      </nav>
      <div className="px-gutter pb-4">
        <Button href="/contact" size="lg" fullWidth iconRight="arrowRight">
          Contact Us
        </Button>
      </div>
    </div>
  );
}
