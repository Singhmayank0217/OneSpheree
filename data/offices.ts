export interface Office {
  city: string;
  country: string;
  region: string;
  /** coordinates in the GlobalPresence SVG viewBox (1000 × 520) */
  x: number;
  y: number;
  hub?: boolean;
}

export const offices: Office[] = [
  {
    city: 'Kolkata',
    country: 'India',
    region: 'East India',
    x: 760,
    y: 245,
    hub: true,
  },
  {
    city: 'Delhi',
    country: 'India',
    region: 'North India',
    x: 720,
    y: 210,
  },
  {
    city: 'Mumbai',
    country: 'India',
    region: 'West India',
    x: 690,
    y: 290,
  },
  {
    city: 'Hyderabad',
    country: 'India',
    region: 'South India',
    x: 735,
    y: 325,
  },
  {
    city: 'Bangalore',
    country: 'India',
    region: 'South India',
    x: 710,
    y: 365,
  },
  {
    city: 'Pan India',
    country: 'India',
    region: 'Nationwide',
    x: 785,
    y: 285,
  },
];