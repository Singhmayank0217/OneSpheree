import Link from 'next/link';
import Image from 'next/image';
import { footerNav } from '@/data/navigation';
import { site } from '@/config/site';
import { Container } from '@/components/layout/Container';

const columns = [
  { title: 'Company', links: footerNav.company },
  { title: 'Services', links: footerNav.services },
  { title: 'Explore', links: footerNav.explore },
];

/** Dark editorial footer. */
export function Footer() {
  return (
    <footer className="bg-dark-tint text-ondark">
      <Container className="pt-16 pb-6">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="flex flex-col items-start gap-3">
            <Link href="/" aria-label="OneSpheree home" className="flex items-center gap-[10px] hover:no-underline">
              <Image src="/logos/onespheree-mark.png" alt="" width={40} height={40} />
              <span className="font-display text-[1.25rem] font-bold text-ondark">{site.name}</span>
            </Link>
            <p className="t-sub max-w-[320px] text-ondark-muted">{site.tagline}</p>
          </div>
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="flex flex-col gap-[10px]">
              <p className="t-micro text-ondark-muted">{col.title}</p>
              {col.links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="link-underline w-fit text-[length:var(--text-body-sm-size)] text-ondark-muted transition-colors duration-[var(--duration-base)] hover:text-ondark hover:no-underline"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-line-dark pt-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="t-caption text-ondark-muted">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex gap-3">
            {footerNav.legal.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="t-caption text-ondark-muted transition-colors duration-[var(--duration-base)] hover:text-ondark hover:no-underline"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
