export interface Project {
  slug: string;
  title: string;
  client: string;
  service: string;
  industry: string;
  location: string;
  year: string;
  metric: { value: string; label: string };
  /** named public image slot — real photography drops in later */
  imageSlot: string;
  tint: 'violet' | 'blue' | 'brand';
}

/** Featured work shown on the home page (full records live on /work later). */
export const featuredProjects: Project[] = [
  {
    slug: 'terminal-fire-safety',
    title: 'Fire safety modernization for an international terminal',
    client: 'Gulf aviation group',
    service: 'Fire Safety',
    industry: 'Government',
    location: 'Dubai',
    year: '2025',
    metric: { value: '100%', label: 'compliance certification, zero downtime' },
    imageSlot: '/images/work/fire-safety-terminal-hero.jpg',
    tint: 'brand',
  },
  {
    slug: 'marketplace-launch',
    title: 'Marketplace launch across four regions',
    client: 'Consumer brands group',
    service: 'E-Commerce',
    industry: 'Retail',
    location: 'Singapore',
    year: '2025',
    metric: { value: '3.4x', label: 'order volume in year one' },
    imageSlot: '/images/work/marketplace-launch-hero.jpg',
    tint: 'blue',
  },
  {
    slug: 'retail-loss-prevention',
    title: 'Nationwide loss-prevention program',
    client: 'Meridian Retail',
    service: 'Due Diligence',
    industry: 'Retail',
    location: 'London',
    year: '2024',
    metric: { value: '32%', label: 'reduction in shrinkage in six months' },
    imageSlot: '/images/work/loss-prevention-hero.jpg',
    tint: 'violet',
  },
];

export interface CasePhase {
  phase: 'Challenge' | 'Approach' | 'Solution' | 'Outcome';
  text: string;
}

/** The spotlight case study told on the home page. */
export const caseSpotlight = {
  slug: 'retail-loss-prevention',
  client: 'Meridian Retail',
  industry: 'Retail',
  title: 'How a nationwide retailer cut shrinkage by a third',
  metric: { value: '32%', label: 'less shrinkage in six months' },
  phases: [
    {
      phase: 'Challenge',
      text: 'Shrinkage across 240 stores was rising with no reliable way to see where losses began.',
    },
    {
      phase: 'Approach',
      text: 'One audit team mapped stock movement, staffing patterns, and supplier handoffs end to end.',
    },
    {
      phase: 'Solution',
      text: 'A verified-supplier program, targeted store audits, and workforce screening in the highest-risk regions.',
    },
    {
      phase: 'Outcome',
      text: 'Shrinkage fell 32% in six months — and the program now runs as standard operating procedure.',
    },
  ] satisfies CasePhase[],
};
