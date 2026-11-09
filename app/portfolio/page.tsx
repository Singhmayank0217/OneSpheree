import { PortfolioHero } from '@/components/portfolio/PortfolioHero';
import { PortfolioExplorer } from '@/components/portfolio/PortfolioExplorer';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Client Portfolio — Completed & Ongoing Projects',
  description:
    'OneSpheree\'s full project portfolio — documented client engagements across digital marketing, fire safety, due diligence, e-commerce, manpower solutions, sales consulting, and financial compliance services.',
  path: '/portfolio',
});

/** The Portfolio — OneSpheree's premium showcase of completed and ongoing work. */
export default function PortfolioPage() {
  return (
    <>
      <PortfolioHero />
      <PortfolioExplorer />
    </>
  );
}
