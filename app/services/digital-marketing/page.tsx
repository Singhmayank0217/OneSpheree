import { ServiceHero } from '@/components/services/ServiceHero';
import { ServiceOverview } from '@/components/services/ServiceOverview';
import { SeoSection } from '@/components/services/SeoSection';
import { PerformanceSection } from '@/components/services/PerformanceSection';
import { SocialSection } from '@/components/services/SocialSection';
import { WebSection } from '@/components/services/WebSection';
import { ContentSection } from '@/components/services/ContentSection';
import { LeadGenSection } from '@/components/services/LeadGenSection';
import { AutomationSection } from '@/components/services/AutomationSection';
import { AnalyticsSection } from '@/components/services/AnalyticsSection';
import { IndustriesSection } from '@/components/services/IndustriesSection';
import { WhySection } from '@/components/services/WhySection';
import { ProcessSection } from '@/components/services/ProcessSection';
import { OutcomesSection } from '@/components/services/OutcomesSection';
import { ServiceCtaSection } from '@/components/services/ServiceCtaSection';
import { digitalMarketingPage } from '@/data/service-pages/digital-marketing';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Digital Marketing',
  description:
    'Accelerating business growth through digital excellence — SEO, performance marketing and social media management from OneSpheree.',
  path: '/services/digital-marketing',
});

/**
 * Digital Marketing service page — the blueprint for every OneSpheree
 * service page: dark premium chapters, data-driven components, one visual
 * language with a distinct composition per section.
 * Milestone 1: Hero, Overview, SEO, Performance, Social.
 * Milestone 2: Web, Content, Lead Generation, Automation, Analytics & BI.
 * Milestone 3: Industries, Why, Process, Outcomes, Final CTA → footer.
 */
export default function DigitalMarketingPage() {
  const { hero, overview, sections, industries, why, process, outcomes, cta } = digitalMarketingPage;
  const [seo, performance, social, web, content, leadGen, automation, analytics] = sections;
  return (
    <>
      <ServiceHero hero={hero} />
      <ServiceOverview overview={overview} />
      <SeoSection section={seo} />
      <PerformanceSection section={performance} />
      <SocialSection section={social} />
      <WebSection section={web} />
      <ContentSection section={content} />
      <LeadGenSection section={leadGen} />
      <AutomationSection section={automation} />
      <AnalyticsSection section={analytics} />
      {industries && <IndustriesSection {...industries} />}
      {why && <WhySection {...why} />}
      {process && <ProcessSection {...process} />}
      {outcomes && <OutcomesSection {...outcomes} />}
      {cta && <ServiceCtaSection cta={cta} />}
    </>
  );
}
