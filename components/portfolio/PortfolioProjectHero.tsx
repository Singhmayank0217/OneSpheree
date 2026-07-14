import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';
import { RevealText } from '@/components/animations/RevealText';
import { Icon } from '@/components/ds/Icon';
import { ProjectImage } from '@/components/gallery/ProjectImage';
import { StatusBadge } from './StatusBadge';
import type { PortfolioProject } from '@/types/portfolio';

/** Detail hero — breadcrumb, service, title, cover, and the headline meta strip. */
export function PortfolioProjectHero({ project }: { project: PortfolioProject }) {
  const meta: [string, string][] = [
    ['Client', project.client],
    ['Service', project.service],
    ['Location', project.location],
    ['Date', project.date],
    ['Duration', project.duration],
  ];

  return (
    <section aria-label={project.title} className="relative">
      <Container className="pt-[118px] lg:pt-[150px]">
        <Reveal>
          <nav aria-label="Breadcrumb" className="t-caption flex items-center gap-1.5">
            <Link href="/portfolio" className="transition-colors hover:text-heading">
              Portfolio
            </Link>
            <Icon name="chevronRight" size={13} className="text-muted" />
            <span className="text-heading">{project.title}</span>
          </nav>
        </Reveal>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <p className="t-eyebrow">{project.service}</p>
          <StatusBadge status={project.status} className="!bg-sunken !text-heading backdrop-blur-none" />
        </div>
        <RevealText text={project.title} as="h1" className="t-display mt-2 max-w-[18ch]" immediate />
      </Container>

      <Container className="mt-6">
        <Reveal>
          <figure className="relative aspect-[4/3] overflow-hidden rounded-xl bg-sunken lg:aspect-[16/9]">
            <ProjectImage slug={project.slug} src={project.coverImage} alt={project.title} priority sizes="100vw" />
          </figure>
        </Reveal>
      </Container>

      <Container className="mt-5">
        <Reveal stagger="cards" className="grid grid-cols-2 gap-y-4 border-t border-line pt-4 sm:grid-cols-3 lg:grid-cols-5">
          {meta.map(([label, value]) => (
            <div key={label}>
              <p className="t-micro text-muted">{label}</p>
              <p className="mt-1 font-medium text-heading">{value}</p>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
