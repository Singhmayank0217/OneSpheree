import type { PortfolioProject, PortfolioService, PortfolioStatus, PortfolioMetric } from '@/types/portfolio';

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const hash = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Sep', 'Oct', 'Nov'];

const TECH: Record<PortfolioService, string[]> = {
  'Digital Marketing': ['GA4', 'Meta Ads', 'Google Ads', 'HubSpot', 'Looker', 'Webflow'],
  'Fire Safety': ['NFPA 72', 'Addressable panels', 'VESDA', 'Sprinkler CAD', 'BMS integration'],
  'Due Diligence': ['KYC / AML', 'OSINT', 'Secure data room', 'Risk scoring', 'Sanctions screening'],
  'E-Commerce': ['Next.js', 'Shopify', 'Stripe', 'Algolia', 'Contentful'],
  'Manpower Solutions': ['ATS', 'Payroll suite', 'Compliance tracker', 'Onboarding portal'],
  'Sales & Consulting': ['Salesforce', 'Pipeline analytics', 'Market model', 'Power BI', 'HubSpot'],
};

const TYPE: Record<PortfolioService, string> = {
  'Digital Marketing': 'Growth retainer',
  'Fire Safety': 'Fixed engagement',
  'Due Diligence': 'Advisory engagement',
  'E-Commerce': 'Build & operate',
  'Manpower Solutions': 'Managed service',
  'Sales & Consulting': 'Strategic advisory',
};

const VALUES: Record<PortfolioService, string[]> = {
  'Digital Marketing': ['$180K', '$240K', '$320K', '$150K'],
  'Fire Safety': ['$1.4M', '$2.4M', '$820K', '$3.1M'],
  'Due Diligence': ['$140K', '$260K', '$95K', '$420K'],
  'E-Commerce': ['$480K', '$720K', '$310K', '$1.1M'],
  'Manpower Solutions': ['$640K', '$1.2M', '$380K', '$920K'],
  'Sales & Consulting': ['$260K', '$540K', '$1.3M', '$180K'],
};

const DURATIONS: Record<PortfolioService, string[]> = {
  'Digital Marketing': ['6 months', '12 months', 'Ongoing retainer'],
  'Fire Safety': ['4 months', '9 months', '14 months'],
  'Due Diligence': ['5 weeks', '8 weeks', '12 weeks'],
  'E-Commerce': ['5 months', '8 months', '11 months'],
  'Manpower Solutions': ['3 months', '7 months', 'Ongoing'],
  'Sales & Consulting': ['4 months', '9 months', '12 months'],
};

const OVERVIEW: Record<PortfolioService, (c: string) => string> = {
  'Digital Marketing': (c) => `A full-funnel growth program turning brand attention into measurable pipeline for ${c}.`,
  'Fire Safety': (c) => `Compliance-first fire detection and suppression protecting people and infrastructure at ${c}.`,
  'Due Diligence': (c) => `An accountable verification and risk assessment that de-risked a critical decision for ${c}.`,
  'E-Commerce': (c) => `A commerce platform engineered to scale with demand across ${c}'s markets.`,
  'Manpower Solutions': (c) => `Verified, compliant workforce sourced, deployed and payrolled across ${c}'s operations.`,
  'Sales & Consulting': (c) => `A strategy and sales engagement that reset the growth trajectory for ${c}.`,
};

const DESCRIPTION: Record<PortfolioService, (c: string, loc: string) => string> = {
  'Digital Marketing': (c, loc) =>
    `${c} needed growth it could take to the board — not impressions. We built one performance framework across brand, search and paid media in ${loc}, shipped every campaign with the tracking to prove its contribution, and moved budget to what worked in near real time.`,
  'Fire Safety': (c, loc) =>
    `We audited ${c}'s facilities in ${loc} against the applicable standards, prioritised by real risk, and delivered detection, suppression and certification in staged windows around live operations — protection first, disruption last.`,
  'Due Diligence': (c, loc) =>
    `${c} faced a decision it could not afford to get wrong. One accountable team mapped every source of risk across ${loc}, set the standard of evidence up front, and verified against it, leaving a clear audit trail and a defensible outcome.`,
  'E-Commerce': (c, loc) =>
    `We designed ${c}'s platform around the operation behind it — catalogue, checkout, payments and fulfilment as one system. A phased launch across ${loc} de-risked the migration, proving performance at each step before the next market went live.`,
  'Manpower Solutions': (c, loc) =>
    `${c} needed the right people in place across ${loc}, faster than traditional hiring allowed. We treated workforce as infrastructure — one standard for screening, onboarding, payroll and compliance across every role and location.`,
  'Sales & Consulting': (c, loc) =>
    `${c} had ambition outpacing its go-to-market. We pressure-tested the market opportunity in ${loc}, rebuilt the sales motion around it, and stood up the pipeline, roadmap and cadence to make growth repeatable rather than heroic.`,
};

let seq = 0;

function mk(
  title: string,
  client: string,
  service: PortfolioService,
  status: PortfolioStatus,
  location: string,
  year: number,
  extra: Partial<PortfolioProject> & { metric?: PortfolioMetric } = {}
): PortfolioProject {
  seq += 1;
  const slug = extra.slug ?? slugify(title);
  const h = hash(slug);
  const tech = extra.technologies ?? TECH[service].slice(0, 3 + (h % 2));
  return {
    id: String(seq).padStart(3, '0'),
    slug,
    title,
    client,
    service,
    status,
    location,
    year,
    date: extra.date ?? `${MONTHS[h % MONTHS.length]} ${year}`,
    duration: extra.duration ?? DURATIONS[service][h % DURATIONS[service].length],
    projectType: extra.projectType ?? TYPE[service],
    projectValue: extra.projectValue ?? VALUES[service][h % VALUES[service].length],
    clientSatisfaction: extra.clientSatisfaction ?? `${92 + (h % 8)}%`,
    technologies: tech,
    overview: extra.overview ?? OVERVIEW[service](client),
    description: extra.description ?? DESCRIPTION[service](client, location),
    coverImage: extra.coverImage ?? `/images/portfolio/${slug}.jpg`,
    galleryImages: extra.galleryImages ?? [1, 2, 3, 4].map((n) => `/images/portfolio/${slug}-${n}.jpg`),
    featured: extra.featured ?? false,
    tags: extra.tags ?? [service, status],
    metric: extra.metric,
  };
}

export const portfolioProjects: PortfolioProject[] = [
  // — Digital Marketing —
  mk('Global rebrand and demand engine', 'Aster Group', 'Digital Marketing', 'Completed', 'Dubai', 2024, { featured: true, metric: { value: '2.1x', label: 'qualified pipeline in year one' } }),
  mk('Always-on performance media', 'Lumen Retail', 'Digital Marketing', 'Completed', 'London', 2023, { metric: { value: '-34%', label: 'cost per acquisition' } }),
  mk('Patient-acquisition campaign', 'Northgate Health', 'Digital Marketing', 'Completed', 'Abu Dhabi', 2023),
  mk('Enrollment growth program', 'Ardent University', 'Digital Marketing', 'Ongoing', 'Toronto', 2025, { metric: { value: '+27%', label: 'applications year over year' } }),
  mk('Hospitality brand relaunch', 'Marea Resorts', 'Digital Marketing', 'Completed', 'Doha', 2024, { featured: true }),
  mk('Product launch go-to-market', 'Consumer Brands Group', 'Digital Marketing', 'Completed', 'Singapore', 2024),
  mk('Regional social strategy', 'Nova Retail Group', 'Digital Marketing', 'Ongoing', 'Dubai', 2025),
  mk('Investor-relations content system', 'Halcyon Capital', 'Digital Marketing', 'Completed', 'New York', 2023),

  // — Fire Safety —
  mk('Fire safety modernization for an international terminal', 'Gulf Aviation Group', 'Fire Safety', 'Completed', 'Dubai', 2025, { slug: 'terminal-fire-safety', featured: true, metric: { value: '100%', label: 'compliance certification, zero downtime' } }),
  mk('Hospital-wide detection and suppression upgrade', 'Northgate Health', 'Fire Safety', 'Completed', 'Abu Dhabi', 2024, { featured: true, metric: { value: '2,400', label: 'beds brought to code' } }),
  mk('Warehouse safety retrofit program', 'Cordell Logistics', 'Fire Safety', 'Completed', 'Jebel Ali', 2023, { metric: { value: '11', label: 'facilities certified' } }),
  mk('High-rise suppression retrofit', 'Meridian Towers', 'Fire Safety', 'Ongoing', 'Riyadh', 2025, { metric: { value: '42', label: 'floors, one shutdown window' } }),
  mk('Resort fire-protection systems', 'Marea Resorts', 'Fire Safety', 'Completed', 'Doha', 2024),
  mk('Data-center fire governance', 'Cortex Cloud', 'Fire Safety', 'Completed', 'Frankfurt', 2024),
  mk('Cold-chain plant protection', 'Aster Foods', 'Fire Safety', 'Completed', 'Mumbai', 2022),
  mk('School district safety rollout', 'Bright Meridian Schools', 'Fire Safety', 'Ongoing', 'Dubai', 2025),

  // — Due Diligence —
  mk('Nationwide loss-prevention program', 'Meridian Retail', 'Due Diligence', 'Completed', 'London', 2024, { slug: 'retail-loss-prevention', featured: true, metric: { value: '32%', label: 'reduction in shrinkage in six months' } }),
  mk('Cross-border acquisition review', 'Halcyon Capital', 'Due Diligence', 'Completed', 'New York', 2024, { featured: true, metric: { value: '$1.2B', label: 'transaction de-risked' } }),
  mk('Supplier verification rollout', 'Aster Group', 'Due Diligence', 'Completed', 'Pune', 2023),
  mk('Pre-IPO background verification', 'Cortex Software', 'Due Diligence', 'Ongoing', 'Berlin', 2025, { metric: { value: '300+', label: 'entities verified' } }),
  mk('Franchise compliance assessment', 'Nova Retail Group', 'Due Diligence', 'Completed', 'Dubai', 2023),
  mk('Government tender integrity review', 'Ministry of Infrastructure', 'Due Diligence', 'Completed', 'Riyadh', 2022),
  mk('Manufacturing ESG audit', 'Cordell Industries', 'Due Diligence', 'Ongoing', 'Chennai', 2025),
  mk('Real-estate portfolio verification', 'Meridian Estates', 'Due Diligence', 'Completed', 'Hong Kong', 2023),

  // — E-Commerce —
  mk('Marketplace launch across four regions', 'Consumer Brands Group', 'E-Commerce', 'Completed', 'Singapore', 2025, { slug: 'marketplace-launch', featured: true, metric: { value: '3.4x', label: 'order volume in year one' } }),
  mk('Direct-to-consumer storefront rebuild', 'Lumen Retail', 'E-Commerce', 'Completed', 'London', 2024, { featured: true, metric: { value: '+58%', label: 'conversion after relaunch' } }),
  mk('Fulfillment and inventory integration', 'Cordell Logistics', 'E-Commerce', 'Completed', 'Jebel Ali', 2023, { metric: { value: '99.5%', label: 'order accuracy' } }),
  mk('B2B commerce and checkout platform', 'Aster Group', 'E-Commerce', 'Ongoing', 'Dubai', 2025),
  mk('Luxury resort booking commerce', 'Marea Resorts', 'E-Commerce', 'Completed', 'Doha', 2024),
  mk('Headless storefront migration', 'Cortex Software', 'E-Commerce', 'Ongoing', 'Berlin', 2025),
  mk('Cross-border payments and tax engine', 'Nova Retail Group', 'E-Commerce', 'Completed', 'Hong Kong', 2022),
  mk('Omnichannel loyalty commerce', 'Solene Hospitality', 'E-Commerce', 'Completed', 'Singapore', 2024),

  // — Manpower Solutions —
  mk('Hospitality staffing across the Gulf', 'Solene Hospitality', 'Manpower Solutions', 'Completed', 'Doha', 2024, { featured: true, metric: { value: '1,800', label: 'roles placed and payrolled' } }),
  mk('Healthcare workforce onboarding', 'Northgate Health', 'Manpower Solutions', 'Completed', 'Abu Dhabi', 2024),
  mk('Manufacturing shift-staffing program', 'Cordell Industries', 'Manpower Solutions', 'Ongoing', 'Pune', 2025, { metric: { value: '24/7', label: 'coverage across three plants' } }),
  mk('Retail seasonal workforce scaling', 'Lumen Retail', 'Manpower Solutions', 'Completed', 'London', 2023),
  mk('Government program staffing', 'Ministry of Infrastructure', 'Manpower Solutions', 'Completed', 'Riyadh', 2023),
  mk('Payroll and compliance outsourcing', 'Nova Retail Group', 'Manpower Solutions', 'Ongoing', 'Dubai', 2025, { metric: { value: '6', label: 'countries, one payroll standard' } }),
  mk('Warehouse and logistics staffing', 'Cordell Logistics', 'Manpower Solutions', 'Completed', 'Jebel Ali', 2022),
  mk('Executive search and placement', 'Halcyon Capital', 'Manpower Solutions', 'Completed', 'New York', 2024),

  // — Sales & Consulting —
  mk('Go-to-market strategy and pipeline build', 'Aster Group', 'Sales & Consulting', 'Completed', 'Dubai', 2024, { featured: true, metric: { value: '+38%', label: 'net-new revenue in four quarters' } }),
  mk('Sales transformation and enablement', 'Lumen Retail', 'Sales & Consulting', 'Completed', 'London', 2024, { metric: { value: '1.9x', label: 'win rate on qualified deals' } }),
  mk('Market-entry strategy for the Gulf', 'Cortex Software', 'Sales & Consulting', 'Ongoing', 'Riyadh', 2025, { featured: true, metric: { value: '3', label: 'new markets validated' } }),
  mk('Revenue operating model redesign', 'Halcyon Capital', 'Sales & Consulting', 'Completed', 'New York', 2023, { metric: { value: '+22%', label: 'forecast accuracy' } }),
  mk('Channel and partnerships strategy', 'Consumer Brands Group', 'Sales & Consulting', 'Completed', 'Singapore', 2024),
  mk('Pricing and packaging overhaul', 'Nova Retail Group', 'Sales & Consulting', 'Ongoing', 'Dubai', 2025, { metric: { value: '+14%', label: 'average deal size' } }),
  mk('Post-merger commercial integration', 'Meridian Estates', 'Sales & Consulting', 'Completed', 'Hong Kong', 2023),
  mk('Growth roadmap and board advisory', 'Marea Resorts', 'Sales & Consulting', 'Ongoing', 'Doha', 2025),
];

export const getPortfolioProjects = () => portfolioProjects;
