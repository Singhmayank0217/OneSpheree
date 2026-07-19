'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { darkHeroRoutes, primaryNav } from '@/data/navigation';
import { NavLink } from '@/components/navigation/NavLink';
import { MegaMenu } from '@/components/navigation/MegaMenu';
import { MobileNav } from '@/components/navigation/MobileNav';
import { Button } from '@/components/ds/Button';
import { Icon } from '@/components/ds/Icon';
import { cn } from '@/lib/utils';

/**
 * Sticky primary navigation.
 * Transparent over the hero → glass (blur + hairline) after 24px of scroll.
 * `dark` = page opens on a dark hero, so the transparent state uses on-dark text.
 */
export function Navbar({ dark }: { dark?: boolean }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const darkHero = dark ?? darkHeroRoutes.includes(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onDark = darkHero && !scrolled;

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-sticky transition-[background-color,box-shadow,backdrop-filter] duration-[var(--duration-slow)] ease-[var(--ease-out)]',
          scrolled ? 'bg-[rgba(255,255,255,.78)] shadow-nav backdrop-blur-md' : 'bg-transparent'
        )}
      >
        <div className="mx-auto flex max-w-container items-center justify-between px-gutter py-[14px]">
          <Link href="/" aria-label="OneSpheree home" className="flex items-center gap-[10px] hover:no-underline">
            <Image
              src="/loader/onespheree-logo-light.png"
              alt=""
              width={36}
              height={36}
              priority
              className={cn('transition-transform duration-[var(--duration-slow)]', scrolled && 'scale-90')}
            />
            <span
              className={cn(
                'font-display text-[1.125rem] font-bold tracking-[-.01em]',
                onDark ? 'text-ondark' : 'text-heading'
              )}
            >
              OneSpheree
            </span>
          </Link>

          <nav className="hidden items-center gap-4 lg:flex" aria-label="Primary">
            {primaryNav.map((item) =>
              item.mega ? (
                <div
                  key={item.href}
                  className="relative flex items-center gap-[4px]"
                  onMouseEnter={() => setMegaOpen(true)}
                  onMouseLeave={() => setMegaOpen(false)}
                  onFocus={() => setMegaOpen(true)}
                  onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setMegaOpen(false)}
                >
                  <NavLink href={item.href} label={item.label} onDark={onDark} />
                  <Icon
                    name="chevronDown"
                    size={14}
                    className={cn(
                      'transition-transform duration-[var(--duration-base)]',
                      onDark ? 'text-ondark' : 'text-heading',
                      megaOpen && 'rotate-180'
                    )}
                  />
                  <div
                    className={cn(
                      'transition-[opacity,transform] duration-[var(--duration-base)] ease-[var(--ease-out)]',
                      megaOpen
                        ? 'visible translate-y-0 opacity-100'
                        : 'invisible translate-y-[6px] opacity-0 pointer-events-none'
                    )}
                  >
                    <MegaMenu onNavigate={() => setMegaOpen(false)} />
                  </div>
                </div>
              ) : (
                <NavLink key={item.href} href={item.href} label={item.label} onDark={onDark} />
              )
            )}
          </nav>

          <div className="hidden lg:block">
            <Button href="/contact" size="sm" iconRight="arrowRight">
              Contact Us
            </Button>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
            className={cn(
              'flex h-11 w-11 items-center justify-center rounded-md lg:hidden',
              onDark ? 'text-ondark' : 'text-heading'
            )}
          >
            <Icon name="menu" size={24} />
          </button>
        </div>
      </header>
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
