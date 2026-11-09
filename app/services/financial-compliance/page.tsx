import { FinanceHero } from '@/components/financial/FinanceHero';
import { FinanceWhy } from '@/components/financial/FinanceWhy';
import { FinanceCategories } from '@/components/financial/FinanceCategories';
import { FinanceProof } from '@/components/financial/FinanceProof';
import { FinanceTaxation } from '@/components/financial/FinanceTaxation';
import { FinanceGst } from '@/components/financial/FinanceGst';
import { FinanceAudit } from '@/components/financial/FinanceAudit';
import { FinanceOperations } from '@/components/financial/FinanceOperations';
import { FinanceCorporate } from '@/components/financial/FinanceCorporate';
import { FinanceAdvisory } from '@/components/financial/FinanceAdvisory';
import { FinanceGrowth } from '@/components/financial/FinanceGrowth';
import { FinanceIndustries } from '@/components/financial/FinanceIndustries';
import { FinanceWhyChoose } from '@/components/financial/FinanceWhyChoose';
import { FinanceProcess } from '@/components/financial/FinanceProcess';
import { FinanceBusinessOutcomes } from '@/components/financial/FinanceBusinessOutcomes';
import { FinanceFaq } from '@/components/financial/FinanceFaq';
import { FinanceCta } from '@/components/financial/FinanceCta';
import { financialCompliancePage } from '@/data/financial-compliance';
import { buildMetadata, serviceJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import { site } from '@/config/site';

export const metadata = buildMetadata({
  title: 'Financial & Compliance Services — Accounting, GST, Taxation & Audit',
  description:
    'Financial and compliance services from OneSpheree: income tax, GST filing, statutory audit, payroll, ROC compliance, accounting, and virtual CFO support. Audit-ready books and accurate statutory filings.',
  path: '/services/financial-compliance',
});

/**
 * Financial & Compliance Services — Milestone 1.
 *
 * This division does not run on the shared service-page blueprint: it has its
 * own chapters, its own components (components/financial/*) and its own
 * surfaces. The `.fc-theme` scope (globals.css) supplies the emerald / deep-teal
 * palette AND the #071917 background, so every section below resolves its
 * colour from one place. The components still reference `--violet-*` and
 * `--blue-*`: those are the design system's two accent SLOTS, not hues, and
 * inside this scope both are emerald — nothing on the page renders blue or
 * violet.
 *
 * Milestone 1: Hero → Why Financial Compliance Matters → Core Service
 * Categories → Why Businesses Choose OneSphereee.
 * Milestone 2 (the service showcase) inserts the seven divisions between the
 * categories overview and the proof statistics, so the page reads: what this
 * is → why it matters → what we do (overview, then in depth) → why us.
 * Milestone 3 closes the page: industries, why this practice, the engagement
 * process, business outcomes, FAQs and the final call to action. The proof
 * statistics stay where Milestone 1 put them — they are the bridge from what we
 * do into who it is for.
 */
export default function FinancialCompliancePage() {
  const {
    hero,
    why,
    categories,
    proof,
    taxation,
    gst,
    audit,
    operations,
    corporate,
    advisory,
    growth,
    industries,
    whyChoose,
    process,
    outcomes,
    faq,
    cta,
  } = financialCompliancePage;
  const SERVICE_LD = serviceJsonLd({
    name: 'Financial & Compliance Services',
    description:
      'Income tax, GST filing, statutory audit, payroll, ROC compliance, accounting, and virtual CFO support. Audit-ready books and accurate statutory filings.',
    url: `${site.url}/services/financial-compliance`,
    serviceType: 'Taxation, GST, Audit, Accounting, ROC Compliance, Payroll, Virtual CFO',
  });

  const BREADCRUMB_LD = breadcrumbJsonLd([
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Financial & Compliance', href: '/services/financial-compliance' },
  ]);

  return (
    <div className="fc-theme">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_LD) }} />
      <FinanceHero hero={hero} />
      <FinanceWhy content={why} />
      <FinanceCategories content={categories} />
      {taxation && <FinanceTaxation content={taxation} />}
      {gst && <FinanceGst content={gst} />}
      {audit && <FinanceAudit content={audit} />}
      {operations && <FinanceOperations content={operations} />}
      {corporate && <FinanceCorporate content={corporate} />}
      {advisory && <FinanceAdvisory content={advisory} />}
      {growth && <FinanceGrowth content={growth} />}
      <FinanceProof content={proof} />
      {industries && <FinanceIndustries content={industries} />}
      {whyChoose && <FinanceWhyChoose content={whyChoose} />}
      {process && <FinanceProcess content={process} />}
      {outcomes && <FinanceBusinessOutcomes content={outcomes} />}
      {faq && <FinanceFaq content={faq} />}
      {cta && <FinanceCta content={cta} />}
    </div>
  );
}
