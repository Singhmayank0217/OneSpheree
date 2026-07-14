import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Icon } from '@/components/ds/Icon';
import { getNextPortfolio } from '@/lib/portfolio';
import type { PortfolioProject } from '@/types/portfolio';

/** Full-width dark send-off to the next project (rises out of the light field). */
export function NextPortfolioProject({ project }: { project: PortfolioProject }) {
  const next = getNextPortfolio(project);
  return (
    <section aria-label="Next project" className="relative bg-dark text-ondark">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[200px] -translate-y-full"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--surface-dark))' }}
      />
      <Link href={`/portfolio/${next.slug}`} className="group block hover:no-underline">
        <Container className="flex flex-col gap-6 py-section lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="t-eyebrow t-eyebrow-ondark">Next project</p>
            <h2 className="t-display ondark-heading mt-2 max-w-[18ch] transition-transform duration-[var(--duration-slow)] ease-[var(--ease-out)] group-hover:translate-x-2">
              {next.title}
            </h2>
            <p className="t-caption mt-2 text-ondark-muted">
              {next.service} · {next.location} · {next.date}
            </p>
          </div>
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[rgba(255,255,255,.3)] text-white transition-colors duration-[var(--duration-slow)] group-hover:bg-white group-hover:text-[var(--ink-950)]">
            <Icon name="arrowRight" size={26} />
          </span>
        </Container>
      </Link>
    </section>
  );
}
