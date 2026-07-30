/**
 * Content model for the About page (/about).
 *
 * Seven straightforward sections, so the shapes are straightforward too: no
 * per-section motion keys, no artwork identifiers, no chapter machinery. The
 * page is an introduction, and the model is the copy it prints.
 */

export interface AboutHeroContent {
  eyebrow: string;
  /** the statement, pre-broken into lines for the masked reveal */
  lines: string[];
  lede: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  /** three qualifying facts, set on a hairline strip under the statement */
  facts: { value: string; label: string }[];
}

export interface AboutIntroContent {
  eyebrow: string;
  headline: string;
  /** paragraphs, rendered in order */
  body: string[];
  /** the beliefs the introduction rests on, set as a hairline list */
  points: { title: string; blurb: string }[];
}

export interface AboutPanel {
  label: string;
  statement: string;
  body: string;
  points: string[];
}

export interface AboutVisionMissionContent {
  eyebrow: string;
  headline: string;
  intro: string;
  vision: AboutPanel;
  mission: AboutPanel;
}

export interface AboutExpertise {
  slug: string;
  index: string;
  name: string;
  blurb: string;
  icon: string;
  /** what the practice actually covers — three items, kept short */
  capabilities: string[];
}

export interface AboutExpertiseContent {
  eyebrow: string;
  headline: string;
  intro: string;
  items: AboutExpertise[];
  cta: { label: string; href: string };
}

export interface AboutReason {
  index: string;
  icon: string;
  title: string;
  blurb: string;
}

export interface AboutReasonsContent {
  eyebrow: string;
  headline: string;
  intro: string;
  reasons: AboutReason[];
}

export interface AboutValue {
  index: string;
  title: string;
  blurb: string;
}

export interface AboutValuesContent {
  eyebrow: string;
  headline: string;
  intro: string;
  values: AboutValue[];
}

export interface AboutCtaContent {
  eyebrow: string;
  headline: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export interface AboutContent {
  hero: AboutHeroContent;
  intro: AboutIntroContent;
  visionMission: AboutVisionMissionContent;
  expertise: AboutExpertiseContent;
  reasons: AboutReasonsContent;
  values: AboutValuesContent;
  cta: AboutCtaContent;
}
