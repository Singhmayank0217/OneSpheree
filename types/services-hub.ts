/**
 * Content model for the All-Services hub (/services) — the page that
 * introduces every business division. It is deliberately NOT the
 * ServicePageContent blueprint: the hub is a directory, not a service page,
 * so its shapes carry per-division colour identity and card artwork keys.
 */

/** The six hover artworks — one per division, never repeated. */
export type HubCardVisual = 'signal' | 'scan' | 'blueprint' | 'marketplace' | 'network' | 'growth';

export interface HubServiceCard {
  slug: string;
  /** display name on the hub (may differ from data/services.ts, e.g. "Fire & Safety") */
  name: string;
  /** compact uppercase label for the hero ecosystem module */
  short: string;
  index: string; // '01'…'06'
  icon: string;
  /** short editorial headline */
  headline: string;
  description: string;
  visual: HubCardVisual;
  /**
   * The division's own colour identity. `base` is the card accent, `glow` the
   * lighter step used for text/edges on dark, `soft` an rgba wash. These match
   * each service page's own theme scope so the hub previews the real thing.
   */
  accent: { base: string; glow: string; soft: string };
}

export interface HubHeroContent {
  eyebrow: string;
  headline: string;
  /** paragraphs, rendered in order */
  description: string[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

/* ── Beyond Services: the capabilities that sit outside the six flagship
      divisions, grouped rather than listed ─────────────────────────────── */

export interface HubCapability {
  icon: string;
  name: string;
  blurb: string;
}

export type HubGroupVisual = 'operations' | 'compliance' | 'growth' | 'technology';

export interface HubCapabilityGroup {
  index: string;
  name: string;
  blurb: string;
  visual: HubGroupVisual;
  capabilities: HubCapability[];
  /**
   * How the capability cards arrive. 'rise' is the Part 1 motion; 'wipe' is
   * the progressive clip reveal introduced in Part 2 (the brief asks for
   * progressive reveals and no repeated fade-ups). Defaults to 'rise' so the
   * Part 1 bands are untouched.
   */
  reveal?: 'rise' | 'wipe';
}

/**
 * The focused practices — categories carrying one or two capabilities each.
 * A full band would give a single capability the same weight as five, so
 * these are presented as a connected constellation instead.
 */
export type HubFocusMotif = 'trade' | 'learning' | 'franchise' | 'custom';

export interface HubFocusGroup {
  index: string;
  name: string;
  blurb: string;
  motif: HubFocusMotif;
  capabilities: HubCapability[];
}

export interface HubBeyondContent {
  eyebrow: string;
  headline: string;
  description: string[];
  groups: HubCapabilityGroup[];
  /** Part 2's constellation of focused practices */
  focus?: HubFocusGroup[];
}

export interface HubOverviewContent {
  eyebrow: string;
  headline: string;
  /** paragraphs, rendered in order */
  body: string[];
  /** the figures shown on the spectrum band */
  figures: { value: number; suffix?: string; prefix?: string; label: string }[];
}

export interface HubFeature {
  icon: string;
  title: string;
  blurb: string;
}

export interface HubIndustry {
  index: string;
  name: string;
  blurb: string;
  icon: string;
}

export interface HubProcessStep {
  index: string;
  title: string;
  blurb: string;
}

export interface HubCtaContent {
  eyebrow: string;
  headline: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export interface ServicesHubContent {
  hero: HubHeroContent;
  overview: HubOverviewContent;
  grid: { eyebrow: string; headline: string; intro: string; cards: HubServiceCard[] };
  beyond: HubBeyondContent;
  why: { eyebrow: string; headline: string; intro: string; features: HubFeature[] };
  industries: { eyebrow: string; headline: string; intro: string; items: HubIndustry[] };
  process: { eyebrow: string; headline: string; intro: string; steps: HubProcessStep[] };
  cta: HubCtaContent;
}
