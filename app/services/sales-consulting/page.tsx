import { ServiceHero } from '@/components/services/ServiceHero';
import { ServiceOverview } from '@/components/services/ServiceOverview';
import { StrategyIllustration } from '@/components/services/StrategyIllustration';
import { SalesStrategySection } from '@/components/services/SalesStrategySection';
import { BusinessConsultingSection } from '@/components/services/BusinessConsultingSection';
import { MarketExpansionSection } from '@/components/services/MarketExpansionSection';
import { SalesTrainingSection } from '@/components/services/SalesTrainingSection';
import { CrmAutomationSection } from '@/components/services/CrmAutomationSection';
import { BusinessDevSection } from '@/components/services/BusinessDevSection';
import { PartnershipSection } from '@/components/services/PartnershipSection';
import { IndustriesSection } from '@/components/services/IndustriesSection';
import { WhySection } from '@/components/services/WhySection';
import { ProcessSection } from '@/components/services/ProcessSection';
import { OutcomesSection } from '@/components/services/OutcomesSection';
import { ServiceCtaSection } from '@/components/services/ServiceCtaSection';
import { salesConsultingPage } from '@/data/service-pages/sales-consulting';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Sales & Consulting',
  description:
    'Driving business growth through strategy and expertise — sales strategy, business consulting and market expansion from OneSphereee.',
  path: '/services/sales-consulting',
});

/**
 * Sales & Consulting service page. Built on the shared service-page blueprint
 * with its own strategy identity: the `.sc-theme` scope remaps the accent
 * tokens to a premium cyan pair (see globals.css); surfaces stay dark charcoal.
 *
 * M1 = Hero/Overview/Sales Strategy/Business Consulting/Market Expansion
 * (sections 01-03). M2 = Sales Training/CRM & Sales Automation/Business
 * Development/Partnership Consulting (sections 04-07, appended sequentially —
 * M1 untouched). M3 = Industries/Why/Process/Outcomes/Final CTA → footer,
 * rendered through the shared blueprint sections (retuned to cyan by
 * .sc-theme) like the other service pages. The page is complete.
 */
export default function SalesConsultingPage() {
  const { hero, overview, sections, industries, why, process, outcomes, cta } = salesConsultingPage;
  const [salesStrategy, consulting, expansion, training, crm, bizDev, partnership] = sections;
  return (
    <div className="sc-theme">
      <ServiceHero hero={hero} visual={<StrategyIllustration className="aspect-square w-full" />} />
      <ServiceOverview overview={overview} />
      <SalesStrategySection section={salesStrategy} />
      <BusinessConsultingSection section={consulting} />
      <MarketExpansionSection section={expansion} />
      <SalesTrainingSection section={training} />
      <CrmAutomationSection section={crm} />
      <BusinessDevSection section={bizDev} />
      <PartnershipSection section={partnership} />
      {industries && <IndustriesSection {...industries} />}
      {why && <WhySection {...why} />}
      {process && <ProcessSection {...process} />}
      {outcomes && <OutcomesSection {...outcomes} />}
      {cta && <ServiceCtaSection cta={cta} />}
    </div>
  );
}
