import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';
import { RevealText } from '@/components/animations/RevealText';
import { Button } from '@/components/ds/Button';
import { ProjectImage } from '@/components/gallery/ProjectImage';
import { projectAspect } from '@/lib/gallery';
import { StatusBadge } from '@/components/portfolio/StatusBadge';
import { portfolioServices } from '@/lib/portfolio';
import { portfolioProjects } from '@/data/portfolio';

/** One representative project per vertical, spanning all six services. */
const selection = portfolioServices
  .map((s) => portfolioProjects.find((p) => p.service === s && p.featured) ?? portfolioProjects.find((p) => p.service === s))
  .filter((p): p is (typeof portfolioProjects)[number] => Boolean(p));

/** Homepage portfolio preview — a taste of the work across every vertical. */
export function PortfolioPreview() {
  return (
    <section aria-label="Portfolio preview" className="relative">
      <Container className="py-section">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <p className="t-eyebrow">Portfolio</p>
            </Reveal>
            <RevealText
              text="Selected work across every vertical."
              as="h2"
              className="t-display mt-2 max-w-[16ch]"
            />
          </div>
          <Reveal delay={0.1}>
            <Button href="/portfolio" iconRight="arrowRight">
              View Portfolio
            </Button>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {selection.map((p) => (
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
                <p className="t-caption mt-1 line-clamp-2 text-muted">{p.overview}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
