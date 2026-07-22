/**
 * Service-page content model — the blueprint contract for every OneSpheree
 * service page (Digital Marketing first; Due Diligence, Fire Safety, etc.
 * reuse the same shapes with their own data files).
 */

export interface ServicePageHero {
  eyebrow: string;
  headline: string;
  /** paragraphs, rendered in order */
  description: string[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export interface ServiceOverviewContent {
  eyebrow: string;
  /** the editorial statement; `highlights` phrases render in brand color */
  statement: string;
  highlights: string[];
  /** short supporting line under the statement */
  support: string;
  /** capability pillars shown as the overview rail */
  pillars: { icon: string; label: string; blurb: string }[];
}

export interface ServiceListItem {
  icon: string;
  label: string;
}

export interface ServiceSectionContent {
  id: string;
  index: string; // '01'…
  eyebrow: string;
  headline: string;
  description: string;
  /** services or platforms displayed with icons */
  items: ServiceListItem[];
  /** label above the item list, e.g. "What's included" / "Platforms" */
  itemsLabel: string;
}

/* ── Milestone 3 additions (all optional — earlier milestones unaffected) ── */

export interface IndustryItem {
  icon: string;
  label: string;
  /** spans 2 columns in the mosaic for rhythm */
  wide?: boolean;
}

export interface FeatureCard {
  icon: string;
  title: string;
  blurb: string;
  /** flagship cards span wider in the bento */
  featured?: boolean;
}

export interface ProcessStepItem {
  title: string;
}

export interface OutcomeCard {
  label: string;
  blurb: string;
  /** animated counter parts: prefix rendered statically, value counts up */
  stat: { prefix?: string; value: number; suffix?: string };
}

export interface ServiceCtaContent {
  headline: string;
  description: string[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export interface ServicePageContent {
  slug: string;
  hero: ServicePageHero;
  overview: ServiceOverviewContent;
  sections: ServiceSectionContent[];
  industries?: { headline: string; intro: string; items: IndustryItem[] };
  why?: { headline: string; features: FeatureCard[] };
  process?: { headline: string; steps: ProcessStepItem[] };
  outcomes?: { headline: string; cards: OutcomeCard[] };
  cta?: ServiceCtaContent;
}
