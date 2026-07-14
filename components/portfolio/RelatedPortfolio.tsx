import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';
import { RevealText } from '@/components/animations/RevealText';
import { ProjectImage } from '@/components/gallery/ProjectImage';
import { projectAspect } from '@/lib/gallery';
import { getRelatedPortfolio } from '@/lib/portfolio';
import { StatusBadge } from './StatusBadge';
import type { PortfolioProject } from '@/types/portfolio';

/** Three nearest projects by vertical/status — simple link cards (not expandable). */
export function RelatedPortfolio({ project }: { project: PortfolioProject }) {
  const related = getRelatedPortfolio(project, 3);
  return (
    <section aria-label="Related projects" className="relative">
      <Container className="py-section">
        <Reveal>
          <p className="t-eyebrow">Related work</p>
        </Reveal>
        <RevealText text="More from the portfolio." as="h2" className="t-display mt-2" />
        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <Reveal key={p.slug}>
              <Link href={`/portfolio/${p.slug}`} className="group block rounded-lg hover:no-underline">
                <div
                  className="relative overflow-hidden rounded-lg bg-sunken"
                  style={{ aspectRatio: projectAspect(p.slug) }}
                >
                  <div className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(.215,.61,.355,1)] group-hover:scale-[1.04]">
                    <ProjectImage slug={p.slug} src={p.coverImage} alt={p.title} />
                  </div>
                  <div className="absolute left-3 top-3">
                    <StatusBadge status={p.status} />
                  </div>
                </div>
                <span className="t-micro mt-3 block text-primary">{p.service}</span>
                <h3 className="t-h4 mt-1 text-heading transition-colors group-hover:text-primary">{p.title}</h3>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
