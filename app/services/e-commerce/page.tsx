import { ServiceHero } from '@/components/services/ServiceHero';
import { ServiceOverview } from '@/components/services/ServiceOverview';
import { CommerceIllustration } from '@/components/services/CommerceIllustration';
import { MarketplaceSection } from '@/components/services/MarketplaceSection';
import { SourcingSection } from '@/components/services/SourcingSection';
import { ListingSection } from '@/components/services/ListingSection';
import { BrandMgmtSection } from '@/components/services/BrandMgmtSection';
import { OrderMgmtSection } from '@/components/services/OrderMgmtSection';
import { DigitalCommerceSection } from '@/components/services/DigitalCommerceSection';
import { IndustriesSection } from '@/components/services/IndustriesSection';
import { WhySection } from '@/components/services/WhySection';
import { ProcessSection } from '@/components/services/ProcessSection';
import { OutcomesSection } from '@/components/services/OutcomesSection';
import { ServiceCtaSection } from '@/components/services/ServiceCtaSection';
import { ecommercePage } from '@/data/service-pages/ecommerce';
import { buildMetadata, serviceJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import { site } from '@/config/site';

export const metadata = buildMetadata({
  title: 'E-Commerce Solutions — Marketplace Management & Online Selling',
  description:
    'End-to-end e-commerce solutions from OneSpheree: marketplace management, product sourcing, listing optimization, brand management, order fulfilment, and custom storefront development for scalable online selling.',
  path: '/services/e-commerce',
});

/**
 * Reselling & E-Commerce service page. Built on the shared service-page
 * blueprint with its own commerce identity: the `.ec-theme` scope remaps the
 * accent tokens to an amber/gold pair (see globals.css); surfaces stay dark
 * charcoal. M1 Hero/Overview/Marketplace/Sourcing/Listing, M2 Brand/Order/
 * Digital Commerce, M3 Categories/Why/Process/Outcomes/CTA — the last five
 * rendered through the shared blueprint sections like the other service pages.
 */
const SERVICE_LD = serviceJsonLd({
  name: 'E-Commerce Solutions',
  description:
    'Marketplace management, product sourcing, listing optimization, brand management, order fulfilment, and custom storefront development for scalable online selling.',
  url: `${site.url}/services/e-commerce`,
  serviceType: 'Marketplace Management, Product Listing, Order Fulfilment, E-Commerce Development',
});

const BREADCRUMB_LD = breadcrumbJsonLd([
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'E-Commerce', href: '/services/e-commerce' },
]);

export default function EcommercePage() {
  const { hero, overview, sections, industries, why, process, outcomes, cta } = ecommercePage;
  const [marketplace, sourcing, listing, brand, order, digital] = sections;
  return (
    <div className="ec-theme">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_LD) }} />
      <ServiceHero hero={hero} visual={<CommerceIllustration className="aspect-square w-full" />} />
      <ServiceOverview overview={overview} />
      <MarketplaceSection section={marketplace} />
      <SourcingSection section={sourcing} />
      <ListingSection section={listing} />
      <BrandMgmtSection section={brand} />
      <OrderMgmtSection section={order} />
      <DigitalCommerceSection section={digital} />
      {industries && <IndustriesSection {...industries} />}
      {why && <WhySection {...why} />}
      {process && <ProcessSection {...process} />}
      {outcomes && <OutcomesSection {...outcomes} />}
      {cta && <ServiceCtaSection cta={cta} />}
    </div>
  );
}
