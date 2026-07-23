import { ServiceHero } from '@/components/services/ServiceHero';
import { ServiceOverview } from '@/components/services/ServiceOverview';
import { FireProtectionIllustration } from '@/components/services/FireProtectionIllustration';
import { DetectionSection } from '@/components/services/DetectionSection';
import { SuppressionSection } from '@/components/services/SuppressionSection';
import { FightingSection } from '@/components/services/FightingSection';
import { DesignEngSection } from '@/components/services/DesignEngSection';
import { InstallationSection } from '@/components/services/InstallationSection';
import { AmcSection } from '@/components/services/AmcSection';
import { AuditSection } from '@/components/services/AuditSection';
import { IndustriesSection } from '@/components/services/IndustriesSection';
import { WhySection } from '@/components/services/WhySection';
import { ProcessSection } from '@/components/services/ProcessSection';
import { OutcomesSection } from '@/components/services/OutcomesSection';
import { ServiceCtaSection } from '@/components/services/ServiceCtaSection';
import { fireSafetyPage } from '@/data/service-pages/fire-safety';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Fire & Safety',
  description:
    'Complete fire protection and life safety solutions — detection, suppression and fire fighting systems engineered by OneSpheree.',
  path: '/services/fire-safety',
});

/**
 * Fire & Safety service page — Milestone 1 (Hero, Overview, Detection,
 * Suppression, Fighting). Built on the Digital Marketing blueprint with this
 * page's own visual identity: the `.fire-theme` scope remaps the accent
 * tokens to a deep fire-red + ember pair (see globals.css), so every reused
 * component retunes while surfaces stay dark charcoal.
 */
export default function FireSafetyPage() {
  const { hero, overview, sections, industries, why, process, outcomes, cta } = fireSafetyPage;
  const [detection, suppression, fighting, design, installation, amc, audit] = sections;
  return (
    <div className="fire-theme">
      <ServiceHero hero={hero} visual={<FireProtectionIllustration className="aspect-square w-full" />} />
      <ServiceOverview overview={overview} />
      <DetectionSection section={detection} />
      <SuppressionSection section={suppression} />
      <FightingSection section={fighting} />
      <DesignEngSection section={design} />
      <InstallationSection section={installation} />
      <AmcSection section={amc} />
      <AuditSection section={audit} />
      {industries && <IndustriesSection {...industries} />}
      {why && <WhySection {...why} />}
      {process && <ProcessSection {...process} />}
      {outcomes && <OutcomesSection {...outcomes} />}
      {cta && <ServiceCtaSection cta={cta} />}
    </div>
  );
}
