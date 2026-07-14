export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

/** Hero proof numbers — copy from the DS homepage kit. */
export const heroStats: Stat[] = [
  { value: 120, suffix: '+', label: 'Enterprise clients served' },
  { value: 18, suffix: '', label: 'Countries with active delivery' },
  { value: 6, suffix: '', label: 'Integrated business lines' },
  { value: 98, suffix: '%', label: 'Client retention rate' },
];

export interface ProofStat extends Stat {
  /** one supporting sentence under the number */
  detail: string;
}

/** Editorial proof section — larger set than the hero. */
export const proofStats: ProofStat[] = [
  { value: 500, suffix: '+', label: 'Projects delivered', detail: 'Across six business lines, from single audits to multi-year programs.' },
  { value: 15, suffix: '+', label: 'Industries served', detail: 'From manufacturing floors to government programs.' },
  { value: 18, suffix: '', label: 'Countries with active delivery', detail: 'One standard of delivery in every market we operate.' },
  { value: 98, suffix: '%', label: 'Client retention', detail: 'Most engagements extend past their first year.' },
];
