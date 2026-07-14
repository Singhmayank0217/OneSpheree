import { portfolioProjects } from '@/data/portfolio';
import type {
  PortfolioProject,
  PortfolioService,
  PortfolioCategory,
  DetailBlock,
} from '@/types/portfolio';

export const portfolioServices: PortfolioService[] = [
  'Digital Marketing',
  'Fire Safety',
  'Due Diligence',
  'E-Commerce',
  'Manpower Solutions',
  'Sales & Consulting',
];

/** Primary filter chips (service verticals). */
export const serviceFilters: PortfolioCategory[] = [
  { label: 'All Projects', value: 'All' },
  ...portfolioServices.map((s) => ({ label: s, value: s })),
];

/** Secondary filter chips (delivery status). */
export const statusFilters: PortfolioCategory[] = [
  { label: 'All', value: 'All' },
  { label: 'Ongoing', value: 'Ongoing' },
  { label: 'Completed', value: 'Completed' },
];

export function searchPortfolio(list: PortfolioProject[], query: string): PortfolioProject[] {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  return list.filter((p) =>
    [p.title, p.client, p.service, p.location, p.status, ...p.tags].join(' ').toLowerCase().includes(q)
  );
}

/** Combined service + status + search — the single source of the visible set. */
export function filterPortfolio(service: string, status: string, query: string): PortfolioProject[] {
  return searchPortfolio(
    portfolioProjects.filter(
      (p) => (service === 'All' || p.service === service) && (status === 'All' || p.status === status)
    ),
    query
  );
}

export const getPortfolioBySlug = (slug: string) => portfolioProjects.find((p) => p.slug === slug);

export function getRelatedPortfolio(project: PortfolioProject, count = 3): PortfolioProject[] {
  return portfolioProjects
    .filter((p) => p.slug !== project.slug)
    .map((p) => ({ p, score: p.service === project.service ? 2 : p.status === project.status ? 1 : 0 }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((s) => s.p);
}

export function getNextPortfolio(project: PortfolioProject): PortfolioProject {
  const i = portfolioProjects.findIndex((p) => p.slug === project.slug);
  return portfolioProjects[(i + 1) % portfolioProjects.length];
}

/* -------------------------------------------------------------------------- */
/*  Service-adaptive detail composition — each vertical produces a different    */
/*  sequence of blocks, built from the project's structured fields so the       */
/*  layout stays CMS-ready. One unified design language, six distinct shapes.   */
/* -------------------------------------------------------------------------- */

const statsFrom = (p: PortfolioProject) => {
  const base = p.metric ? [p.metric] : [];
  return [
    ...base,
    { value: p.clientSatisfaction, label: 'client satisfaction' },
    { value: p.duration, label: 'engagement duration' },
  ];
};

export function getDetailBlocks(project: PortfolioProject): DetailBlock[] {
  const p = project;
  switch (p.service) {
    case 'Digital Marketing':
      return [
        { type: 'prose', label: 'Campaign overview', body: p.description },
        { type: 'chips', label: 'Branding · Website · SEO · Social · Paid', items: ['Brand system', 'Website', 'SEO & content', 'Social media', 'Paid advertising'] },
        { type: 'metrics', label: 'Performance', items: statsFrom(p) },
        { type: 'gallery', label: 'Campaign gallery' },
      ];
    case 'Fire Safety':
      return [
        { type: 'prose', label: 'Building overview', body: p.description },
        {
          type: 'specs',
          label: 'Installed systems',
          items: [
            { k: 'Detection', v: 'Addressable panels · VESDA aspirating' },
            { k: 'Suppression', v: 'Sprinkler network · clean-agent gas' },
            { k: 'Coverage', v: `${p.client}, ${p.location}` },
            { k: 'Monitoring', v: 'BMS-integrated, 24/7' },
          ],
        },
        { type: 'chips', label: 'Compliance standards', items: ['NFPA 72', 'NFPA 13', 'Civil Defense', 'ISO 45001'] },
        { type: 'metrics', label: 'Certification', items: statsFrom(p) },
        { type: 'gallery', label: 'Installation gallery' },
        { type: 'status', label: 'Completion status' },
      ];
    case 'Due Diligence':
      return [
        {
          type: 'specs',
          label: 'Engagement',
          items: [
            { k: 'Client', v: p.client },
            { k: 'Objective', v: 'De-risk a critical decision with defensible evidence' },
            { k: 'Scope', v: `${p.location} · entities, records, jurisdictions` },
          ],
        },
        {
          type: 'process',
          label: 'Investigation',
          steps: [
            { title: 'Scope & standard', body: 'Set the evidence bar and map every source of risk up front.' },
            { title: 'Investigation', body: 'Background verification and OSINT across parties and records.' },
            { title: 'Compliance', body: 'KYC / AML and sanctions screening against current lists.' },
            { title: 'Risk assessment', body: 'Scored findings with a clear, documented audit trail.' },
          ],
        },
        { type: 'prose', label: 'Findings', body: p.description },
        { type: 'quote', body: `The engagement gave us the confidence to proceed — the risk understood, the decision defensible.`, attribution: `${p.client}` },
      ];
    case 'E-Commerce':
      return [
        { type: 'prose', label: 'Store overview', body: p.description },
        { type: 'gallery', label: 'Interface & mobile preview' },
        { type: 'chips', label: 'Features', items: ['Headless storefront', 'Payments & checkout', 'Search & merchandising', 'Fulfilment integration', 'Analytics'] },
        { type: 'chips', label: 'Technology stack', items: p.technologies },
        { type: 'metrics', label: 'Analytics & performance', items: statsFrom(p) },
      ];
    case 'Manpower Solutions':
      return [
        {
          type: 'specs',
          label: 'Engagement',
          items: [
            { k: 'Client', v: p.client },
            { k: 'Workforce', v: p.metric?.value ?? 'Multi-site teams' },
            { k: 'Hiring timeline', v: p.duration },
            { k: 'Model', v: p.projectType },
          ],
        },
        {
          type: 'process',
          label: 'Recruitment process',
          steps: [
            { title: 'Source', body: 'Targeted sourcing against agreed role profiles and SLAs.' },
            { title: 'Screen & verify', body: 'Background verification and compliance to one standard.' },
            { title: 'Onboard', body: 'Structured onboarding so teams are productive from day one.' },
            { title: 'Payroll & compliance', body: 'Centralised payroll and ongoing compliance management.' },
          ],
        },
        { type: 'metrics', label: 'Statistics', items: statsFrom(p) },
        { type: 'quote', body: `OneSpheree scaled our workforce without adding overhead — the right people, governed to one standard.`, attribution: `${p.client}` },
      ];
    case 'Sales & Consulting':
      return [
        { type: 'prose', label: 'Business overview', body: p.description },
        {
          type: 'specs',
          label: 'Client objectives',
          items: [
            { k: 'Client', v: p.client },
            { k: 'Ambition', v: 'Make growth repeatable, not heroic' },
            { k: 'Market', v: p.location },
          ],
        },
        {
          type: 'process',
          label: 'Approach',
          steps: [
            { title: 'Market analysis', body: 'Pressure-test the opportunity, ICP and competitive position.' },
            { title: 'Sales strategy', body: 'Rebuild the motion — segmentation, offer, and cadence.' },
            { title: 'Consulting services', body: 'Stand up pipeline, forecasting and enablement.' },
            { title: 'Growth roadmap', body: 'A staged plan the board can hold the team to.' },
          ],
        },
        { type: 'metrics', label: 'Revenue impact & KPIs', items: statsFrom(p) },
        { type: 'quote', body: `They reset our trajectory — a sharper strategy and a pipeline we can actually forecast.`, attribution: `${p.client}` },
      ];
  }
}
