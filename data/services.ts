export interface Service {
  slug: string;
  name: string;
  headline: string;
  /** one-line what/why/result summary for cards, mega menu, explorer */
  summary: string;
  icon: string;
  index: string; // '01'…'06'
  /** capability chips shown in the home explorer and service pages */
  capabilities: string[];
}

export const services: Service[] = [
  {
    slug: 'digital-marketing',
    name: 'Digital Marketing',
    headline: 'Growth you can measure.',
    summary: 'Grow your brand through data-driven campaigns that create measurable business outcomes.',
    icon: 'trendingUp',
    index: '01',
    capabilities: ['Performance media', 'SEO & content', 'Brand campaigns', 'Marketing analytics'],
  },
  {
    slug: 'fire-safety',
    name: 'Fire Safety',
    headline: 'Protection that never sleeps.',
    summary: 'Protect people and infrastructure with compliance-focused fire safety solutions.',
    icon: 'shield',
    index: '02',
    capabilities: ['Safety audits', 'Detection & suppression', 'Compliance certification', 'Evacuation planning'],
  },
  {
    slug: 'due-diligence',
    name: 'Due Diligence',
    headline: 'Decisions built on certainty.',
    summary: 'Reduce risk through accurate verification, compliance, and strategic assessments.',
    icon: 'fileCheck',
    index: '03',
    capabilities: ['Background verification', 'Compliance audits', 'Risk assessment', 'Vendor screening'],
  },
  {
    slug: 'e-commerce',
    name: 'E-Commerce',
    headline: 'Commerce built to scale.',
    summary: 'Build and operate online commerce that converts browsers into loyal customers.',
    icon: 'shoppingCart',
    index: '04',
    capabilities: ['Storefront development', 'Marketplace operations', 'Payments & checkout', 'Fulfillment integration'],
  },
  {
    slug: 'manpower-solutions',
    name: 'Manpower Solutions',
    headline: 'The right people, in place.',
    summary: 'Strengthen your workforce with skilled, verified talent across every function.',
    icon: 'users',
    index: '05',
    capabilities: ['Staffing & recruitment', 'Payroll management', 'Workforce compliance', 'On-site teams'],
  },
  {
    slug: 'sales-consulting',
    name: 'Sales & Consulting',
    headline: 'Strategy that moves revenue.',
    summary: 'Sharpen strategy and accelerate revenue with hands-on sales and business consulting.',
    icon: 'target',
    index: '06',
    capabilities: ['Sales strategy', 'Market analysis', 'Growth roadmaps', 'Business consulting'],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
