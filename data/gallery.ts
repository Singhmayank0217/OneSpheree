import type { GalleryProject, ServiceName, IndustryName, ProjectMetric } from '@/types/gallery';

/* -------------------------------------------------------------------------- */
/*  Homepage gallery-preview strip (kept for components/home/GalleryPreview)   */
/* -------------------------------------------------------------------------- */

export interface GalleryTile {
  title: string;
  category: string;
  tint: 'violet' | 'blue' | 'brand';
  wide?: boolean;
}

export const galleryTiles: GalleryTile[] = [
  { title: 'Terminal suppression systems', category: 'Fire Safety', tint: 'brand', wide: true },
  { title: 'Regional storefront network', category: 'E-Commerce', tint: 'blue' },
  { title: 'Hospitality staffing program', category: 'Manpower', tint: 'violet' },
  { title: 'Brand campaign — Gulf launch', category: 'Digital Marketing', tint: 'blue', wide: true },
  { title: 'Supplier verification rollout', category: 'Due Diligence', tint: 'violet' },
  { title: 'Warehouse safety retrofit', category: 'Fire Safety', tint: 'blue' },
  { title: 'Marketplace fulfillment hub', category: 'E-Commerce', tint: 'brand', wide: true },
  { title: 'Healthcare workforce onboarding', category: 'Manpower', tint: 'violet' },
];

/* -------------------------------------------------------------------------- */
/*  Full project archive (drives /work and /work/[slug])                       */
/* -------------------------------------------------------------------------- */

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const DESC: Record<ServiceName, (client: string) => string> = {
  'Digital Marketing': (c) => `Data-driven campaigns that turned attention into measurable pipeline for ${c}.`,
  'Due Diligence': (c) => `Verification and risk assessment that de-risked a critical decision for ${c}.`,
  'Fire Safety': (c) => `Compliance-focused fire safety systems protecting people and infrastructure at ${c}.`,
  'E-Commerce': (c) => `A commerce platform built to scale with demand for ${c}.`,
  'Manpower Solutions': (c) => `Skilled, verified workforce deployed across ${c}'s operations.`,
};

const TAGS: Record<ServiceName, string[]> = {
  'Digital Marketing': ['Brand', 'Performance media', 'SEO'],
  'Due Diligence': ['Compliance', 'Risk', 'Verification'],
  'Fire Safety': ['Compliance', 'Safety systems', 'Certification'],
  'E-Commerce': ['Storefront', 'Fulfillment', 'Payments'],
  'Manpower Solutions': ['Staffing', 'Payroll', 'Workforce'],
};

let seq = 0;

/** Compact factory — fills photo-ready slots, defaults and tags from the service. */
function mk(
  title: string,
  client: string,
  service: ServiceName,
  industry: IndustryName,
  location: string,
  year: number,
  extra: Partial<GalleryProject> & { metric?: ProjectMetric } = {}
): GalleryProject {
  seq += 1;
  const slug = extra.slug ?? slugify(title);
  return {
    id: String(seq).padStart(3, '0'),
    slug,
    title,
    client,
    service,
    industry,
    location,
    year,
    description: extra.description ?? DESC[service](client),
    coverImage: extra.coverImage ?? `/images/work/${slug}.jpg`,
    galleryImages: extra.galleryImages ?? [1, 2, 3, 4].map((n) => `/images/work/${slug}-${n}.jpg`),
    featured: extra.featured ?? false,
    tags: extra.tags ?? [...TAGS[service], industry],
    status: extra.status ?? 'Completed',
    metric: extra.metric,
  };
}

export const galleryProjects: GalleryProject[] = [
  // — Fire Safety —
  mk('Fire safety modernization for an international terminal', 'Gulf Aviation Group', 'Fire Safety', 'Government', 'Dubai', 2025, { slug: 'terminal-fire-safety', featured: true, metric: { value: '100%', label: 'compliance certification, zero downtime' } }),
  mk('Hospital-wide detection and suppression upgrade', 'Northgate Health System', 'Fire Safety', 'Healthcare', 'Abu Dhabi', 2024, { featured: true, metric: { value: '2,400', label: 'beds brought to code' } }),
  mk('Warehouse safety retrofit program', 'Cordell Logistics', 'Fire Safety', 'Manufacturing', 'Jebel Ali', 2023, { metric: { value: '11', label: 'facilities certified' } }),
  mk('Campus evacuation and compliance overhaul', 'Ardent University', 'Fire Safety', 'Education', 'Toronto', 2023),
  mk('Resort fire-protection systems', 'Marea Resorts', 'Fire Safety', 'Hospitality', 'Doha', 2024),
  mk('High-rise suppression retrofit', 'Meridian Towers', 'Fire Safety', 'Corporate', 'Riyadh', 2022, { metric: { value: '42', label: 'floors, one shutdown window' } }),
  mk('Retail chain safety certification', 'Lumen Retail', 'Fire Safety', 'Retail', 'London', 2023),
  mk('Municipal facilities safety audit', 'City of Meridian', 'Fire Safety', 'Government', 'Manama', 2021),
  mk('Data-center fire governance', 'Cortex Cloud', 'Fire Safety', 'Corporate', 'Frankfurt', 2024),
  mk('Cold-chain plant protection', 'Aster Foods', 'Fire Safety', 'Manufacturing', 'Mumbai', 2022),
  mk('Hotel group life-safety program', 'Solene Hospitality', 'Fire Safety', 'Hospitality', 'Singapore', 2025, { status: 'Ongoing' }),
  mk('School district safety rollout', 'Bright Meridian Schools', 'Fire Safety', 'Education', 'Dubai', 2023),

  // — Due Diligence —
  mk('Nationwide loss-prevention program', 'Meridian Retail', 'Due Diligence', 'Retail', 'London', 2024, { slug: 'retail-loss-prevention', featured: true, metric: { value: '32%', label: 'reduction in shrinkage in six months' } }),
  mk('Cross-border acquisition review', 'Halcyon Capital', 'Due Diligence', 'Corporate', 'New York', 2024, { featured: true, metric: { value: '$1.2B', label: 'transaction de-risked' } }),
  mk('Supplier verification rollout', 'Aster Group', 'Due Diligence', 'Manufacturing', 'Pune', 2023),
  mk('Government tender integrity review', 'Ministry of Infrastructure', 'Due Diligence', 'Government', 'Riyadh', 2022),
  mk('Franchise compliance assessment', 'Nova Retail Group', 'Due Diligence', 'Retail', 'Dubai', 2023),
  mk('Clinical vendor screening', 'Northgate Health System', 'Due Diligence', 'Healthcare', 'Abu Dhabi', 2024),
  mk('Pre-IPO background verification', 'Cortex Software', 'Due Diligence', 'Corporate', 'Berlin', 2023, { metric: { value: '300+', label: 'entities verified' } }),
  mk('Hospitality partner due diligence', 'Solene Hospitality', 'Due Diligence', 'Hospitality', 'Doha', 2022),
  mk('University endowment risk review', 'Ardent University', 'Due Diligence', 'Education', 'Toronto', 2021),
  mk('Manufacturing ESG audit', 'Cordell Industries', 'Due Diligence', 'Manufacturing', 'Chennai', 2024, { status: 'Ongoing' }),
  mk('Real-estate portfolio verification', 'Meridian Estates', 'Due Diligence', 'Corporate', 'Hong Kong', 2023),
  mk('Public-program eligibility audit', 'City of Meridian', 'Due Diligence', 'Government', 'Manama', 2022),

  // — E-Commerce —
  mk('Marketplace launch across four regions', 'Consumer Brands Group', 'E-Commerce', 'Retail', 'Singapore', 2025, { slug: 'marketplace-launch', featured: true, metric: { value: '3.4x', label: 'order volume in year one' } }),
  mk('Direct-to-consumer storefront rebuild', 'Lumen Retail', 'E-Commerce', 'Retail', 'London', 2024, { featured: true, metric: { value: '+58%', label: 'conversion after relaunch' } }),
  mk('B2B commerce and checkout platform', 'Aster Group', 'E-Commerce', 'Manufacturing', 'Dubai', 2023),
  mk('Fulfillment and inventory integration', 'Cordell Logistics', 'E-Commerce', 'Manufacturing', 'Jebel Ali', 2023, { metric: { value: '99.5%', label: 'order accuracy' } }),
  mk('Subscription commerce for a clinic network', 'Northgate Health System', 'E-Commerce', 'Healthcare', 'Abu Dhabi', 2024),
  mk('Campus retail and payments platform', 'Ardent University', 'E-Commerce', 'Education', 'Toronto', 2022),
  mk('Luxury resort booking commerce', 'Marea Resorts', 'E-Commerce', 'Hospitality', 'Doha', 2024),
  mk('Government services payment portal', 'Ministry of Infrastructure', 'E-Commerce', 'Government', 'Riyadh', 2023),
  mk('Cross-border payments and tax engine', 'Nova Retail Group', 'E-Commerce', 'Retail', 'Hong Kong', 2022),
  mk('Headless storefront migration', 'Cortex Software', 'E-Commerce', 'Corporate', 'Berlin', 2024, { status: 'Ongoing' }),
  mk('Marketplace seller onboarding', 'Consumer Brands Group', 'E-Commerce', 'Retail', 'Mumbai', 2023),
  mk('Omnichannel loyalty commerce', 'Solene Hospitality', 'E-Commerce', 'Hospitality', 'Singapore', 2025),

  // — Digital Marketing —
  mk('Global rebrand and demand engine', 'Aster Group', 'Digital Marketing', 'Corporate', 'Dubai', 2024, { featured: true, metric: { value: '2.1x', label: 'qualified pipeline' } }),
  mk('Always-on performance media', 'Lumen Retail', 'Digital Marketing', 'Retail', 'London', 2023, { metric: { value: '-34%', label: 'cost per acquisition' } }),
  mk('Patient-acquisition campaign', 'Northgate Health System', 'Digital Marketing', 'Healthcare', 'Abu Dhabi', 2023),
  mk('Enrollment growth program', 'Ardent University', 'Digital Marketing', 'Education', 'Toronto', 2022, { metric: { value: '+27%', label: 'applications year over year' } }),
  mk('Hospitality brand relaunch', 'Marea Resorts', 'Digital Marketing', 'Hospitality', 'Doha', 2024, { featured: true }),
  mk('Search and content overhaul', 'Cortex Software', 'Digital Marketing', 'Corporate', 'Berlin', 2023),
  mk('Regional social strategy', 'Nova Retail Group', 'Digital Marketing', 'Retail', 'Dubai', 2022),
  mk('Manufacturer thought-leadership program', 'Cordell Industries', 'Digital Marketing', 'Manufacturing', 'Chennai', 2023),
  mk('Public-awareness campaign', 'City of Meridian', 'Digital Marketing', 'Government', 'Manama', 2021),
  mk('Product launch go-to-market', 'Consumer Brands Group', 'Digital Marketing', 'Retail', 'Singapore', 2024),
  mk('Investor-relations content system', 'Halcyon Capital', 'Digital Marketing', 'Corporate', 'New York', 2023),
  mk('Loyalty and lifecycle marketing', 'Solene Hospitality', 'Digital Marketing', 'Hospitality', 'Singapore', 2025, { status: 'Ongoing' }),

  // — Manpower Solutions —
  mk('Hospitality staffing across the Gulf', 'Solene Hospitality', 'Manpower Solutions', 'Hospitality', 'Doha', 2024, { featured: true, metric: { value: '1,800', label: 'roles placed and payrolled' } }),
  mk('Healthcare workforce onboarding', 'Northgate Health System', 'Manpower Solutions', 'Healthcare', 'Abu Dhabi', 2024),
  mk('Manufacturing shift-staffing program', 'Cordell Industries', 'Manpower Solutions', 'Manufacturing', 'Pune', 2023, { metric: { value: '24/7', label: 'coverage across three plants' } }),
  mk('Retail seasonal workforce scaling', 'Lumen Retail', 'Manpower Solutions', 'Retail', 'London', 2023),
  mk('Campus facilities workforce', 'Ardent University', 'Manpower Solutions', 'Education', 'Toronto', 2022),
  mk('Government program staffing', 'Ministry of Infrastructure', 'Manpower Solutions', 'Government', 'Riyadh', 2023),
  mk('Corporate managed services team', 'Cortex Software', 'Manpower Solutions', 'Corporate', 'Berlin', 2024),
  mk('Warehouse and logistics staffing', 'Cordell Logistics', 'Manpower Solutions', 'Manufacturing', 'Jebel Ali', 2022),
  mk('Payroll and compliance outsourcing', 'Nova Retail Group', 'Manpower Solutions', 'Retail', 'Dubai', 2023, { metric: { value: '6', label: 'countries, one payroll standard' } }),
  mk('Event and hospitality surge staffing', 'Marea Resorts', 'Manpower Solutions', 'Hospitality', 'Doha', 2024),
  mk('Clinical locum management', 'Northgate Health System', 'Manpower Solutions', 'Healthcare', 'Mumbai', 2021),
  mk('Executive search and placement', 'Halcyon Capital', 'Manpower Solutions', 'Corporate', 'New York', 2025, { status: 'Ongoing' }),
];

export const getGalleryProjects = () => galleryProjects;
