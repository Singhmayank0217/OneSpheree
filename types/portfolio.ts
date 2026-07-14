/** The six OneSpheree business verticals — the canonical service list. */
export type PortfolioService =
  | 'Digital Marketing'
  | 'Fire Safety'
  | 'Due Diligence'
  | 'E-Commerce'
  | 'Manpower Solutions'
  | 'Sales & Consulting';

export type PortfolioStatus = 'Ongoing' | 'Completed';

export interface PortfolioMetric {
  value: string;
  label: string;
}

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  client: string;
  service: PortfolioService;
  status: PortfolioStatus;
  location: string;
  year: number;
  /** display date, e.g. "Mar 2025" */
  date: string;
  /** e.g. "6 months" */
  duration: string;
  /** engagement shape, e.g. "Growth retainer" */
  projectType: string;
  /** commercial scale, e.g. "$1.2M" */
  projectValue: string;
  /** e.g. "98%" */
  clientSatisfaction: string;
  technologies: string[];
  /** two-line collapsed overview */
  overview: string;
  /** full description shown when the card unfolds / on the detail page */
  description: string;
  /** named public/ slot — real photography drops in without code changes */
  coverImage: string;
  galleryImages: string[];
  featured: boolean;
  tags: string[];
  metric?: PortfolioMetric;
}

/** A filter chip (service vertical or 'All Projects'). */
export interface PortfolioCategory {
  label: string;
  value: string;
}

/* -------------------------------------------------------------------------- */
/*  Service-adaptive detail: a small set of shared block primitives that the   */
/*  detail page composes into a different sequence per service vertical.       */
/* -------------------------------------------------------------------------- */

export interface SpecItem {
  k: string;
  v: string;
}
export interface ProcessStep {
  title: string;
  body: string;
}

export type DetailBlock =
  | { type: 'prose'; label: string; body: string }
  | { type: 'specs'; label: string; items: SpecItem[] }
  | { type: 'metrics'; label: string; items: PortfolioMetric[] }
  | { type: 'process'; label: string; steps: ProcessStep[] }
  | { type: 'chips'; label: string; items: string[] }
  | { type: 'quote'; body: string; attribution: string }
  | { type: 'gallery'; label: string }
  | { type: 'status'; label: string };
