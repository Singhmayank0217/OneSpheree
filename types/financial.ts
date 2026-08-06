/**
 * Financial & Compliance page content model.
 *
 * This division does NOT reuse the shared `ServicePageContent` blueprint: its
 * page is composed of its own chapters (indexed hero, editorial argument,
 * expanding category cards, proof statistics), so it carries its own contract.
 * Milestone 1 covers the four shapes below; later milestones append their own
 * optional keys without touching these.
 */

export interface FinanceHeroContent {
  /** section numeral rendered above the label, e.g. '07' */
  index: string;
  label: string;
  headline: string;
  description: string;
  /** capability pills — cycled by the hero's ledger-scan animation */
  pills: string[];
}

export interface FinanceWhyPoint {
  index: string;
  title: string;
  body: string;
}

export interface FinanceWhyContent {
  eyebrow: string;
  /** the large editorial statement; `highlights` phrases paint in emerald */
  headline: string;
  highlights: string[];
  intro: string;
  points: FinanceWhyPoint[];
}

export interface FinanceCategory {
  index: string;
  /** name from the DS / service icon sets */
  icon: string;
  title: string;
  blurb: string;
  /** revealed as the card expands on hover / focus */
  detail: string[];
}

export interface FinanceCategoriesContent {
  eyebrow: string;
  headline: string;
  intro: string;
  cards: FinanceCategory[];
}

export interface FinanceStat {
  /** numeric statistics count up; wordmarks (e.g. 'Accurate') mask in */
  value: { number: number; prefix?: string; suffix?: string } | { word: string };
  label: string;
  blurb: string;
}

export interface FinanceProofContent {
  eyebrow: string;
  headline: string;
  intro: string;
  stats: FinanceStat[];
}

/* ── Milestone 2: the service showcase ────────────────────────────────────
   Related services are grouped into divisions rather than listed one section
   per service. Every shape below is additive and optional on the page content
   — Milestone 1 renders unchanged whether or not they are supplied. */

/** Shared chapter header — every Milestone 2 section carries one. */
export interface FinanceSectionHeader {
  /** page-order numeral, '01'… */
  index: string;
  eyebrow: string;
  headline: string;
  /** paragraphs, rendered in order */
  intro: string[];
}

export interface FinanceTaxationSection extends FinanceSectionHeader {
  itemsLabel: string;
  /** progressively revealed checklist */
  items: string[];
}

export interface FinanceTimelineStep {
  /** short marker on the rail, e.g. 'REG' */
  code: string;
  title: string;
  blurb: string;
}

export interface FinanceGstSection extends FinanceSectionHeader {
  steps: FinanceTimelineStep[];
}

export interface FinanceAuditCard {
  icon: string;
  title: string;
  blurb: string;
  /** slides up over the card on hover / focus */
  detail: string;
  scope: string[];
}

export interface FinanceAuditSection extends FinanceSectionHeader {
  cards: FinanceAuditCard[];
}

export interface FinanceMetric {
  value: { number: number; prefix?: string; suffix?: string };
  label: string;
  caption: string;
  /** 0–1, drives the tile's meter bar */
  fill: number;
}

export interface FinanceOperationsSection extends FinanceSectionHeader {
  metrics: FinanceMetric[];
  /** the dashboard's monthly close series, 0–1 per bar */
  series: number[];
  seriesLabel: string;
  groups: { icon: string; title: string; blurb: string; items: string[] }[];
}

export interface FinanceCorporateSection extends FinanceSectionHeader {
  /** the hub the compliance lines run to */
  hub: { label: string; caption: string };
  clusters: { icon: string; title: string; blurb: string; items: string[] }[];
}

export interface FinanceAdvisorySection extends FinanceSectionHeader {
  cards: { icon: string; title: string; blurb: string }[];
}

export interface FinanceGrowthSection extends FinanceSectionHeader {
  groups: { icon: string; title: string; blurb: string; items: string[]; featured?: boolean }[];
  /** the one inline action of the showcase */
  action: { label: string; href: string };
}

/* ── Milestone 3: trust, process and the close ─────────────────────────────
   Same rule as Milestone 2 — every shape is additive and optional, so the
   earlier chapters render unchanged whether or not these are supplied. */

export interface FinanceIndustriesSection extends FinanceSectionHeader {
  items: { icon: string; label: string }[];
}

export interface FinanceWhyChooseSection extends FinanceSectionHeader {
  points: { icon: string; title: string; blurb: string }[];
}

export interface FinanceProcessSection extends FinanceSectionHeader {
  steps: { index: string; icon: string; title: string; blurb: string }[];
}

export interface FinanceOutcomesSection extends FinanceSectionHeader {
  outcomes: { title: string; blurb: string }[];
}

export interface FinanceFaqSection extends FinanceSectionHeader {
  items: { question: string; answer: string }[];
}

export interface FinanceCtaSection {
  headline: string;
  description: string[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export interface FinancialCompliancePageContent {
  slug: string;
  hero: FinanceHeroContent;
  why: FinanceWhyContent;
  categories: FinanceCategoriesContent;
  proof: FinanceProofContent;
  /* Milestone 2 */
  taxation?: FinanceTaxationSection;
  gst?: FinanceGstSection;
  audit?: FinanceAuditSection;
  operations?: FinanceOperationsSection;
  corporate?: FinanceCorporateSection;
  advisory?: FinanceAdvisorySection;
  growth?: FinanceGrowthSection;
  /* Milestone 3 */
  industries?: FinanceIndustriesSection;
  whyChoose?: FinanceWhyChooseSection;
  process?: FinanceProcessSection;
  outcomes?: FinanceOutcomesSection;
  faq?: FinanceFaqSection;
  cta?: FinanceCtaSection;
}
