export interface Industry {
  slug: string;
  name: string;
  index: string;
  /** outcome-focused one-liner (copy guidelines: outcomes, not features) */
  outcome: string;
  /** which brand tint colors the expanded composition */
  tint: 'violet' | 'blue';
  /** sector photography, served from /public/images/industries */
  image: string;
  imageAlt: string;
}

export const industries: Industry[] = [
  {
    slug: 'manufacturing',
    name: 'Manufacturing',
    index: '01',
    outcome: 'Reliable systems and safer facilities for modern industrial businesses.',
    tint: 'violet',
    image: '/images/industries/Manufacturing.jpg',
    imageAlt: 'Industrial manufacturing floor in operation',
  },
  {
    slug: 'retail',
    name: 'Retail',
    index: '02',
    outcome: 'Operations and customer experience that keep pace with demand.',
    tint: 'blue',
    image: '/images/industries/Retail.jpg',
    imageAlt: 'Retail store floor and customer experience',
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    index: '03',
    outcome: 'Technology that keeps healthcare organizations moving efficiently.',
    tint: 'violet',
    image: '/images/industries/Healthcare.jpg',
    imageAlt: 'Healthcare facility team at work',
  },
  {
    slug: 'hospitality',
    name: 'Hospitality',
    index: '04',
    outcome: 'Service infrastructure that scales with every guest.',
    tint: 'blue',
    image: '/images/industries/Hospitality.jpg',
    imageAlt: 'Hospitality venue prepared for guests',
  },
  {
    slug: 'government',
    name: 'Government',
    index: '05',
    outcome: 'Compliant, dependable delivery for public programs.',
    tint: 'violet',
    image: '/images/industries/Government.jpg',
    imageAlt: 'Government and public sector building',
  },
  {
    slug: 'real-estate',
    name: 'Real Estate',
    index: '06',
    outcome: 'Safer, smarter buildings from plan to operation.',
    tint: 'blue',
    image: '/images/industries/Real_Estate.jpg',
    imageAlt: 'Real estate development and building operations',
  },
];
