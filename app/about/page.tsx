import { AboutHero } from '@/components/about/AboutHero';
import { AboutIntro } from '@/components/about/AboutIntro';
import { AboutVisionMission } from '@/components/about/AboutVisionMission';
import { AboutExpertise } from '@/components/about/AboutExpertise';
import { AboutReasons } from '@/components/about/AboutReasons';
import { AboutValues } from '@/components/about/AboutValues';
import { AboutCta } from '@/components/about/AboutCta';
import { about } from '@/data/about';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'About',
  description:
    'OneSpheree is a young business group built by professionals with years of experience across digital marketing, due diligence, fire & safety, reselling & e-commerce, manpower solutions and business consulting — one trusted partner across domains.',
  path: '/about',
});

/**
 * /about — a clean, premium introduction to the company.
 *
 *   Hero            masked statement on deep navy, blooms on a capped parallax
 *   Who we are      two-column editorial: the argument, and the beliefs under it
 *   Vision/mission  two premium panels on a soft brand-tinted band
 *   Expertise       the six practices as cards, each opening its service page
 *   Why choose us   the contrast band: four reasons as hairline rows on navy
 *   Values          six values on a hairline grid, numbered in the accent orange
 *   Final CTA       centred navy close with a brand seam into the footer
 *
 * Motion is intentionally restrained and comes almost entirely from the shared
 * primitives — <RevealText> for masked headings, <Reveal> for fades and
 * staggers, one <Parallax> pair in the hero. Card interactions are CSS
 * transitions. There is no pinning, no scrubbing, no horizontal movement and no
 * bespoke timeline anywhere on the page.
 *
 * The page runs on the `.about-theme` token scope (deep navy #2E5BC0 primary,
 * soft blue #2E96CE secondary, navy surfaces) so it reads as its own place
 * without touching the design system. Brand orange appears only as an accent —
 * the eyebrow markers, the values numerals, and one stroke in the footer seam.
 *
 * Surfaces alternate dark → canvas → tint → canvas → dark → canvas → dark. The
 * light sections are opaque on purpose: the global HomeAtmosphere light field is
 * violet and lives outside this scope, so letting it through would tint the navy.
 */
export default function AboutPage() {
  const { hero, intro, visionMission, expertise, reasons, values, cta } = about;

  return (
    <div className="about-theme">
      <AboutHero hero={hero} />
      <AboutIntro intro={intro} />
      <AboutVisionMission content={visionMission} />
      <AboutExpertise content={expertise} />
      <AboutReasons content={reasons} />
      <AboutValues content={values} />
      <AboutCta cta={cta} />
    </div>
  );
}
