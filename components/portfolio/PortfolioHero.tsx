import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';
import { RevealText } from '@/components/animations/RevealText';
import { portfolioProjects } from '@/data/portfolio';

/** Portfolio page hero — the editorial opening of the showcase. */
export function PortfolioHero() {
  return (
    <section aria-label="Portfolio" className="relative">
      <Container className="pb-6 pt-[132px] lg:pb-10 lg:pt-[168px]">
        <Reveal>
          <p className="t-eyebrow">Portfolio</p>
        </Reveal>
        <RevealText
          text="Premium solutions. Real business impact."
          as="h1"
          className="t-hero mt-3 max-w-[15ch]"
          immediate
        />
        <Reveal delay={0.2}>
          <p className="t-body-lg mt-5 max-w-reading text-muted">
            {portfolioProjects.length} completed and ongoing projects across all six OneSpheree
            verticals — marketing, fire safety, due diligence, e-commerce, workforce and consulting.
            Filter by vertical and status, and open any card to see the full story.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
