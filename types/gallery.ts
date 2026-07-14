export type ServiceName =
  | 'Digital Marketing'
  | 'Due Diligence'
  | 'Fire Safety'
  | 'E-Commerce'
  | 'Manpower Solutions';

export type IndustryName =
  | 'Corporate'
  | 'Healthcare'
  | 'Manufacturing'
  | 'Retail'
  | 'Education'
  | 'Hospitality'
  | 'Government';

export type ProjectStatus = 'Completed' | 'Ongoing';

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface GalleryProject {
  id: string;
  slug: string;
  title: string;
  client: string;
  service: ServiceName;
  industry: IndustryName;
  location: string;
  year: number;
  description: string;
  /** named public/ slot — real photography drops in without code changes */
  coverImage: string;
  galleryImages: string[];
  featured: boolean;
  tags: string[];
  status: ProjectStatus;
  metric?: ProjectMetric;
}

/** A filter chip: 'All', a service, or an industry. */
export interface GalleryCategory {
  label: string;
  kind: 'all' | 'service' | 'industry';
}

/** Challenge → Approach → Execution → Results, shown on the detail page. */
export interface ProjectNarrative {
  challenge: string;
  approach: string;
  execution: string;
  results: string;
}
