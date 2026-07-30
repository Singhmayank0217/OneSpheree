/**
 * Contact page (/contact) content contract.
 *
 * The page is self-contained: it reuses the design system (typography,
 * spacing, GSAP architecture, navigation, footer) and the OneSpheree Orange
 * token scope, but none of the home / service / hub section components — every
 * chapter has its own composition and its own motion language.
 */

export interface ContactLink {
  label: string;
  href: string;
}

export interface ContactHeroContent {
  eyebrow: string;
  /** rendered one line per array entry — the masked reveal runs per line */
  headline: string[];
  description: string;
  primaryCta: ContactLink;
  secondaryCta: ContactLink;
}

export interface ContactExperienceContent {
  eyebrow: string;
  /** two-line editorial headline, revealed as lines */
  headline: string[];
  description: string[];
  /** short proof points beside the illustration */
  assurances: { icon: string; label: string; detail: string }[];
  form: {
    eyebrow: string;
    title: string;
    note: string;
    submitLabel: string;
    pendingLabel: string;
  };
}

export interface OfficeCard {
  id: string;
  icon: string;
  /** small overline — the kind of information the card carries */
  kind: string;
  title: string;
  /** body lines; a line may carry a link (email / phone) */
  lines: { text: string; href?: string }[];
  /** optional footnote under the lines */
  note?: string;
}

export interface ContactLocationContent {
  eyebrow: string;
  headline: string;
  description: string;
  /** the illustrated locale — district labels drawn on the abstract map */
  districts: string[];
  address: string[];
  mapsUrl: string;
  mapsLabel: string;
}

export interface SupportCategory {
  id: string;
  /** key into the bespoke motif set in ContactSupportMotifs */
  motif: 'consulting' | 'marketing' | 'diligence' | 'safety' | 'manpower' | 'commerce' | 'general';
  name: string;
  description: string;
  /** the desk that owns this queue */
  email: string;
  /** optional deep link to the division's own page */
  href?: string;
  /** the accent this card lights with — a division colour, inline */
  accent: string;
}

export interface ContactFaqEntry {
  q: string;
  a: string;
}

export interface ContactFinalCtaContent {
  eyebrow: string;
  headline: string[];
  description: string;
  primaryCta: ContactLink;
  secondaryCta: ContactLink;
  /** the closing signature line under the actions */
  signature: string;
}

export interface ContactPageContent {
  hero: ContactHeroContent;
  experience: ContactExperienceContent;
  offices: { eyebrow: string; headline: string; intro: string; cards: OfficeCard[] };
  location: ContactLocationContent;
  support: { eyebrow: string; headline: string; intro: string; categories: SupportCategory[] };
  faq: { eyebrow: string; headline: string; intro: string; entries: ContactFaqEntry[] };
  finalCta: ContactFinalCtaContent;
}

/* ── the enquiry form ───────────────────────────────────────────────────── */

/** Every field name, in the order the form presents them. */
export const CONTACT_FIELDS = [
  'fullName',
  'companyName',
  'email',
  'phone',
  'businessType',
  'service',
  'message',
] as const;

export type ContactField = (typeof CONTACT_FIELDS)[number];

export type ContactValues = Record<ContactField, string>;

/** Field name → message, for the fields that failed validation. */
export type ContactErrors = Partial<Record<ContactField, string>>;

/** What the server action hands back to the form. */
export type ContactResult =
  | { ok: true }
  | { ok: false; reason: 'validation'; errors: ContactErrors }
  | { ok: false; reason: 'delivery' | 'config'; message: string };
