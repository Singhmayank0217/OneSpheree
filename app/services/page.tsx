import { HubHero } from '@/components/services-hub/HubHero';
import { HubServicesGrid } from '@/components/services-hub/HubServicesGrid';
import { HubBeyond } from '@/components/services-hub/HubBeyond';
import { HubIndustries } from '@/components/services-hub/HubIndustries';
import { HubWhy } from '@/components/services-hub/HubWhy';
import { HubProcess } from '@/components/services-hub/HubProcess';
import { HubCta } from '@/components/services-hub/HubCta';
import { servicesHub } from '@/data/services-hub';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Services',
  description:
    'Business solutions built around your growth — digital marketing, due diligence, fire & safety, reselling & e-commerce, manpower solutions, sales & consulting and financial & compliance services, plus the operations, compliance, technology and growth capabilities behind them.',
  path: '/services',
});

/**
 * The All-Services hub — the central directory that introduces every business
 * division and sends visitors on to the dedicated service pages. It is NOT a
 * service page: it reuses the design system (typography, spacing, GSAP
 * architecture, navigation, footer) but none of the service-page section
 * components, and every chapter carries its own motion language:
 *
 *   Hero        connected ecosystem — seven divisions wired to one hub, paths
 *               expanding organically, particles travelling between units
 *   Flagship    seven gateway cards, seven different hover animations, each in
 *               its own division colour, each opening its dedicated page
 *   Beyond      capability bands (Operations / Compliance / Growth /
 *               Technology) plus a connected constellation of the focused
 *               practices that carry only one or two capabilities
 *   Industries  expanding panels
 *   Why         3D tilt cards with a tracked specular sheen
 *   Process     a spine drawn by the scroll, stages alternating across it
 *   CTA         ambient blooms, a specular sweep, and the seven division
 *               colours resolving into one spectrum at the footer seam
 *
 * Built across three milestones: M1 Hero/Flagship/Beyond Part 1, M2 Beyond
 * Part 2, M3 Industries/Why/Process/Final CTA. The page is complete.
 *
 * It runs on the `.hub-theme` token scope (OneSpheree Orange); each flagship
 * card keeps its own division colour inline, matching the page it links to.
 */
export default function ServicesPage() {
  const { hero, grid, beyond, industries, why, process, cta } = servicesHub;
  return (
    <div className="hub-theme">
      <HubHero hero={hero} />
      <HubServicesGrid {...grid} />
      <HubBeyond beyond={beyond} />
      <HubIndustries {...industries} />
      <HubWhy {...why} />
      <HubProcess {...process} />
      <HubCta cta={cta} />
    </div>
  );
}
