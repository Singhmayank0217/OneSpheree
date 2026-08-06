export interface Service {
  slug: string;
  name: string;
  headline: string;
  /** one-line what/why/result summary for cards, mega menu, explorer */
  summary: string;
  icon: string;
  index: string; // '01'…'07'
  /** capability chips shown in the home explorer and service pages */
  capabilities: string[];
  /**
   * Service photography, served from /public/images/home. Photo-ready slot —
   * a division whose shoot has not happened yet omits it, and the scene falls
   * back to that scene's own gradient composition rather than a broken image.
   */
  image?: string;
  imageAlt?: string;
}

export const services: Service[] = [
   {
    slug: 'financial-compliance',
    name: 'Financial & Compliance Services',
    headline: 'Numbers that stand up to scrutiny.',
    summary: 'Keep books, filings and statutory obligations accurate, current and audit-ready.',
    icon: 'scale',
    index: '01',
    capabilities: ['Taxation & GST', 'Audit & assurance', 'Accounting & payroll', 'ROC compliance'],
    image: '/images/home/Finance.jpg',
    imageAlt: 'Financial and compliance review of accounts and statutory records',
  },
  {
    slug: 'digital-marketing',
    name: 'Digital Marketing',
    headline: 'Growth you can measure.',
    summary: 'Grow your brand through data-driven campaigns that create measurable business outcomes.',
    icon: 'trendingUp',
    index: '02',
    capabilities: ['Performance media', 'SEO & content', 'Brand campaigns', 'Marketing analytics'],
    image: '/images/home/Digital_marketing.jpg',
    imageAlt: 'Digital marketing team reviewing campaign performance data',
  },
  {
    slug: 'fire-safety',
    name: 'Fire Safety',
    headline: 'Protection that never sleeps.',
    summary: 'Protect people and infrastructure with compliance-focused fire safety solutions.',
    icon: 'shield',
    index: '03',
    capabilities: ['Safety audits', 'Detection & suppression', 'Compliance certification', 'Evacuation planning'],
    image: '/images/home/Fire_safety.jpg',
    imageAlt: 'Fire safety equipment installed and maintained on site',
  },
  {
    slug: 'due-diligence',
    name: 'Due Diligence',
    headline: 'Decisions built on certainty.',
    summary: 'Reduce risk through accurate verification, compliance, and strategic assessments.',
    icon: 'fileCheck',
    index: '04',
    capabilities: ['Background verification', 'Compliance audits', 'Risk assessment', 'Vendor screening'],
    image: '/images/home/Due_deligence.jpg',
    imageAlt: 'Due diligence review of compliance and verification documents',
  },
  {
    slug: 'e-commerce',
    name: 'E-Commerce',
    headline: 'Commerce built to scale.',
    summary: 'Build and operate online commerce that converts browsers into loyal customers.',
    icon: 'shoppingCart',
    index: '05',
    capabilities: ['Storefront development', 'Marketplace operations', 'Payments & checkout', 'Fulfillment integration'],
    image: '/images/home/Ecommerce_sol.jpg',
    imageAlt: 'Online commerce storefront and fulfilment operations',
  },
  {
    slug: 'manpower-solutions',
    name: 'Manpower Solutions',
    headline: 'The right people, in place.',
    summary: 'Strengthen your workforce with skilled, verified talent across every function.',
    icon: 'users',
    index: '06',
    capabilities: ['Staffing & recruitment', 'Payroll management', 'Workforce compliance', 'On-site teams'],
    image: '/images/home/Manpower.jpg',
    imageAlt: 'Deployed workforce team on assignment',
  },
  {
    slug: 'sales-consulting',
    name: 'Sales & Consulting',
    headline: 'Strategy that moves revenue.',
    summary: 'Sharpen strategy and accelerate revenue with hands-on sales and business consulting.',
    icon: 'target',
    index: '07',
    capabilities: ['Sales strategy', 'Market analysis', 'Growth roadmaps', 'Business consulting'],
    image: '/images/home/sales.jpg',
    imageAlt: 'Sales and business consulting session in progress',
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
