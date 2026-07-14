import { PortfolioHero } from '@/components/portfolio/PortfolioHero';
import { PortfolioExplorer } from '@/components/portfolio/PortfolioExplorer';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Portfolio',
  description:
    'Completed and ongoing OneSpheree projects across all six verticals — digital marketing, fire safety, due diligence, e-commerce, manpower solutions and sales & consulting.',
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
