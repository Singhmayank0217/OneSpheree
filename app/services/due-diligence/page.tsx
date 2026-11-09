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
import { buildMetadata, serviceJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import { site } from '@/config/site';

export const metadata = buildMetadata({
  title: 'Due Diligence Services — Business Verification & Risk Assessment',
  description:
    'Professional due diligence services from OneSpheree: corporate, financial, vendor, legal, and employee background verification. Accountable risk assessment for acquisitions, partnerships, and compliance.',
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
const SERVICE_LD = serviceJsonLd({
  name: 'Due Diligence',
  description:
    'Corporate, financial, vendor, legal, and employee background verification. Accountable risk assessment for acquisitions, partnerships, and compliance.',
  url: `${site.url}/services/due-diligence`,
  serviceType: 'Corporate Due Diligence, Financial Due Diligence, Vendor Verification, Background Checks',
});

const BREADCRUMB_LD = breadcrumbJsonLd([
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Due Diligence', href: '/services/due-diligence' },
]);

export default function DueDiligencePage() {
  const { hero, overview, sections, industries, why, process, outcomes, cta } = dueDiligencePage;
  const [corporate, financial, vendor, legal, employee, risk] = sections;
  return (
    <div className="dd-theme">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_LD) }} />
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
    </div>
  );
}
