import { ServiceHero } from '@/components/services/ServiceHero';
import { ServiceOverview } from '@/components/services/ServiceOverview';
import { VerificationIllustration } from '@/components/services/VerificationIllustration';
import { CorporateDDSection } from '@/components/services/CorporateDDSection';
import { FinancialDDSection } from '@/components/services/FinancialDDSection';
import { VendorDDSection } from '@/components/services/VendorDDSection';
import { LegalDDSection } from '@/components/services/LegalDDSection';
import { EmployeeDDSection } from '@/components/services/EmployeeDDSection';
import { RiskDDSection } from '@/components/services/RiskDDSection';
import { IndustriesSection } from '@/components/services/IndustriesSection';
import { WhySection } from '@/components/services/WhySection';
import { ProcessSection } from '@/components/services/ProcessSection';
import { OutcomesSection } from '@/components/services/OutcomesSection';
import { ServiceCtaSection } from '@/components/services/ServiceCtaSection';
import { dueDiligencePage } from '@/data/service-pages/due-diligence';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Due Diligence',
  description:
    'Comprehensive due diligence and business verification — corporate, financial and vendor due diligence from OneSpheree.',
  path: '/services/due-diligence',
});

/**
 * Due Diligence service page — built on the Digital Marketing blueprint:
 * same layout system, primitives, motion and design language; only content
 * and illustrations change (a verification-led artwork per section).
 * Milestone 1: Hero, Overview, Corporate, Financial, Vendor.
 * Milestone 2: Legal, Employee Background, Risk Assessment.
 * Milestone 3: Industries, Why, Process, Outcomes, Final CTA → footer
 * (reusing the shared M3 components; only the data differs).
 */
export default function DueDiligencePage() {
  const { hero, overview, sections, industries, why, process, outcomes, cta } = dueDiligencePage;
  const [corporate, financial, vendor, legal, employee, risk] = sections;
  return (
    <>
      <ServiceHero hero={hero} visual={<VerificationIllustration className="aspect-square w-full" />} />
      <ServiceOverview overview={overview} />
      <CorporateDDSection section={corporate} />
      <FinancialDDSection section={financial} />
      <VendorDDSection section={vendor} />
      <LegalDDSection section={legal} />
      <EmployeeDDSection section={employee} />
      <RiskDDSection section={risk} />
      {industries && <IndustriesSection {...industries} />}
      {why && <WhySection {...why} />}
      {process && <ProcessSection {...process} />}
      {outcomes && <OutcomesSection {...outcomes} />}
      {cta && <ServiceCtaSection cta={cta} />}
    </>
  );
}
