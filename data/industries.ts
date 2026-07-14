export interface Industry {
  slug: string;
  name: string;
  index: string;
  /** outcome-focused one-liner (copy guidelines: outcomes, not features) */
  outcome: string;
  /** which brand tint colors the expanded composition */
  tint: 'violet' | 'blue';
}

export const industries: Industry[] = [
  {
    slug: 'manufacturing',
    name: 'Manufacturing',
    index: '01',
    outcome: 'Reliable systems and safer facilities for modern industrial businesses.',
    tint: 'violet',
  },
  {
    slug: 'retail',
    name: 'Retail',
    index: '02',
    outcome: 'Operations and customer experience that keep pace with demand.',
    tint: 'blue',
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    index: '03',
    outcome: 'Technology that keeps healthcare organizations moving efficiently.',
    tint: 'violet',
  },
  {
    slug: 'hospitality',
    name: 'Hospitality',
    index: '04',
    outcome: 'Service infrastructure that scales with every guest.',
    tint: 'blue',
  },
  {
    slug: 'government',
    name: 'Government',
    index: '05',
    outcome: 'Compliant, dependable delivery for public programs.',
    tint: 'violet',
  },
  {
    slug: 'real-estate',
    name: 'Real Estate',
    index: '06',
    outcome: 'Safer, smarter buildings from plan to operation.',
    tint: 'blue',
  },
];
