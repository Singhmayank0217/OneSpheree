import { ServiceHero } from '@/components/services/ServiceHero';
import { ServiceOverview } from '@/components/services/ServiceOverview';
import { WorkforceIllustration } from '@/components/services/WorkforceIllustration';
import { PermanentStaffingSection } from '@/components/services/PermanentStaffingSection';
import { ContractStaffingSection } from '@/components/services/ContractStaffingSection';
import { ExecutiveSearchSection } from '@/components/services/ExecutiveSearchSection';
import { RpoSection } from '@/components/services/RpoSection';
import { PayrollSection } from '@/components/services/PayrollSection';
import { WorkforceMgmtSection } from '@/components/services/WorkforceMgmtSection';
import { TrainingSection } from '@/components/services/TrainingSection';
import { IndustriesSection } from '@/components/services/IndustriesSection';
import { WhySection } from '@/components/services/WhySection';
import { ProcessSection } from '@/components/services/ProcessSection';
import { OutcomesSection } from '@/components/services/OutcomesSection';
import { ServiceCtaSection } from '@/components/services/ServiceCtaSection';
import { manpowerPage } from '@/data/service-pages/manpower';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Manpower Solutions',
  description:
    'Connecting businesses with exceptional talent — permanent staffing, contract staffing and executive search from OneSpheree.',
  path: '/services/manpower-solutions',
});

/**
 * Manpower Solutions service page — Milestone 1 (Hero, Overview, Permanent
 * Staffing, Contract Staffing, Executive Search). Built on the shared
 * service-page blueprint with its own workforce identity: the `.mp-theme`
 * scope remaps the accent tokens to a professional royal-blue pair (see
 * globals.css); surfaces stay dark charcoal. M1 = Hero/Overview/Permanent/
 * Contract/Executive; M2 = RPO/Payroll/Workforce Management/Training (sections
 * index 04-07, appended sequentially — M1 untouched); M3 = Industries/Why/
 * Process/Outcomes/Final CTA → footer, rendered through the shared blueprint
 * sections (retuned to royal blue by .mp-theme) like the other service pages.
 */
export default function ManpowerPage() {
  const { hero, overview, sections, industries, why, process, outcomes, cta } = manpowerPage;
  const [permanent, contract, executive, rpo, payroll, workforce, training] = sections;
  return (
    <div className="mp-theme">
      <ServiceHero hero={hero} visual={<WorkforceIllustration className="aspect-square w-full" />} />
      <ServiceOverview overview={overview} />
      <PermanentStaffingSection section={permanent} />
      <ContractStaffingSection section={contract} />
      <ExecutiveSearchSection section={executive} />
      <RpoSection section={rpo} />
      <PayrollSection section={payroll} />
      <WorkforceMgmtSection section={workforce} />
      <TrainingSection section={training} />
      {industries && <IndustriesSection {...industries} />}
      {why && <WhySection {...why} />}
      {process && <ProcessSection {...process} />}
      {outcomes && <OutcomesSection {...outcomes} />}
      {cta && <ServiceCtaSection cta={cta} />}
    </div>
  );
}
