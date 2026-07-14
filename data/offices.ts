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
  { city: 'Dubai', country: 'UAE', region: 'Middle East', x: 620, y: 250, hub: true },
  { city: 'London', country: 'United Kingdom', region: 'Europe', x: 470, y: 150 },
  { city: 'New York', country: 'United States', region: 'Americas', x: 285, y: 185 },
  { city: 'Singapore', country: 'Singapore', region: 'Asia-Pacific', x: 775, y: 300 },
  { city: 'Mumbai', country: 'India', region: 'South Asia', x: 690, y: 275 },
  { city: 'Riyadh', country: 'Saudi Arabia', region: 'Middle East', x: 590, y: 262 },
];
