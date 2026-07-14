import { galleryProjects } from '@/data/gallery';
import type { GalleryProject, GalleryCategory, ProjectNarrative, ServiceName } from '@/types/gallery';

/**
 * Flip to `true` and drop files into `public/images/work/` to activate real
 * photography. Until then `ProjectImage` renders a token-gradient composition
 * in the same slot, so there is never a broken image and no eager network load.
 */
export const HAS_REAL_IMAGERY = false;

const SERVICES: ServiceName[] = [
  'Digital Marketing',
  'Due Diligence',
  'Fire Safety',
  'E-Commerce',
  'Manpower Solutions',
];

const INDUSTRIES = ['Corporate', 'Healthcare', 'Manufacturing', 'Retail', 'Education', 'Hospitality', 'Government'];

/** Filter chips: All, then services, then industries (union taxonomy). */
export const galleryCategories: GalleryCategory[] = [
  { label: 'All', kind: 'all' },
  ...SERVICES.map((label) => ({ label, kind: 'service' as const })),
  ...INDUSTRIES.map((label) => ({ label, kind: 'industry' as const })),
];

export function matchesCategory(project: GalleryProject, category: string): boolean {
  if (category === 'All') return true;
  return project.service === category || project.industry === category;
}

export function searchProjects(projects: GalleryProject[], query: string): GalleryProject[] {
  const q = query.trim().toLowerCase();
  if (!q) return projects;
  return projects.filter((p) =>
    [p.title, p.client, p.industry, p.service, p.location, ...p.tags]
      .join(' ')
      .toLowerCase()
      .includes(q)
  );
}

/** Combined filter + search — the single source of the visible set. */
export function filterProjects(category: string, query: string): GalleryProject[] {
  return searchProjects(
    galleryProjects.filter((p) => matchesCategory(p, category)),
    query
  );
}

export const getProjectBySlug = (slug: string) => galleryProjects.find((p) => p.slug === slug);

export function getRelatedProjects(project: GalleryProject, count = 3): GalleryProject[] {
  const scored = galleryProjects
    .filter((p) => p.slug !== project.slug)
    .map((p) => ({
      p,
      score: (p.service === project.service ? 2 : 0) + (p.industry === project.industry ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, count).map((s) => s.p);
}

export function getNextProject(project: GalleryProject): GalleryProject {
  const i = galleryProjects.findIndex((p) => p.slug === project.slug);
  return galleryProjects[(i + 1) % galleryProjects.length];
}

/* -------------------------------------------------------------------------- */
/*  Templated detail narrative (Challenge → Approach → Execution → Results)     */
/* -------------------------------------------------------------------------- */

const NARRATIVE: Record<ServiceName, (p: GalleryProject) => ProjectNarrative> = {
  'Digital Marketing': (p) => ({
    challenge: `${p.client} needed growth it could measure — not impressions, but qualified demand from the ${p.industry.toLowerCase()} market in ${p.location} and beyond.`,
    approach: `We mapped the buying journey end to end, then built a single performance framework across brand, search and paid media with one shared definition of a good outcome.`,
    execution: `Creative, media and analytics worked as one team. Every campaign shipped with the tracking to prove its contribution, and budget followed what worked in near real time.`,
    results: `The program moved the numbers that matter to the board — pipeline, cost of acquisition, and repeatable growth ${p.client} now runs as standard.`,
  }),
  'Due Diligence': (p) => ({
    challenge: `${p.client} faced a decision it could not afford to get wrong, with risk spread across suppliers, records and jurisdictions in ${p.location}.`,
    approach: `One accountable team mapped every source of risk, set the standard of evidence up front, and verified against it — no assumptions carried forward.`,
    execution: `Background verification, compliance checks and on-the-ground assessment ran in parallel, each finding documented with a clear audit trail.`,
    results: `${p.client} moved forward with confidence — the risk understood, the decision defensible, and the process now reusable for the next one.`,
  }),
  'Fire Safety': (p) => ({
    challenge: `${p.client} had to bring ${p.industry.toLowerCase()} facilities in ${p.location} to code without disrupting the people and operations that depend on them.`,
    approach: `We audited the current state against the applicable standards, prioritised by real risk, and planned the work around live operations from day one.`,
    execution: `Detection, suppression and certification were delivered in staged windows, each signed off before the next began — protection first, disruption last.`,
    results: `Every facility reached compliance with the evidence to prove it, and ${p.client} now runs a monitoring routine that keeps it there.`,
  }),
  'E-Commerce': (p) => ({
    challenge: `${p.client} needed commerce that could scale with demand across ${p.location} — not a storefront that broke under its own success.`,
    approach: `We designed the platform around the operation behind it: catalogue, checkout, payments and fulfilment as one system, not four integrations.`,
    execution: `A phased launch de-risked the migration, with performance, payments and inventory proven at each step before the next region went live.`,
    results: `${p.client} now runs a commerce platform that grows with the business — measurably faster to buy from, and built to add the next market.`,
  }),
  'Manpower Solutions': (p) => ({
    challenge: `${p.client} needed the right people in place across ${p.location} — verified, compliant and ready — faster than traditional hiring allowed.`,
    approach: `We treated workforce as infrastructure: one standard for screening, onboarding, payroll and compliance across every role and location.`,
    execution: `Teams were sourced, verified and deployed against agreed SLAs, with payroll and compliance handled centrally so the client's managers could focus on delivery.`,
    results: `${p.client} scaled its workforce without adding overhead — the right people in place, governed to one standard, wherever the operation needed them.`,
  }),
};

export const getProjectNarrative = (project: GalleryProject): ProjectNarrative =>
  NARRATIVE[project.service](project);

/* -------------------------------------------------------------------------- */
/*  Deterministic visual helpers (so placeholder compositions vary, editorial) */
/* -------------------------------------------------------------------------- */

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

const ASPECTS = ['4 / 5', '1 / 1', '4 / 3', '3 / 4', '5 / 4'] as const;
/** Stable aspect ratio per project — drives the asymmetric grid rhythm. */
export const projectAspect = (slug: string) => ASPECTS[hash(slug) % ASPECTS.length];

const GRADIENTS = [
  'linear-gradient(135deg, var(--violet-500), var(--blue-500))',
  'linear-gradient(150deg, var(--violet-600), var(--violet-900))',
  'linear-gradient(140deg, var(--blue-500), var(--blue-700))',
  'linear-gradient(120deg, var(--blue-600), var(--violet-700))',
  'linear-gradient(160deg, var(--violet-500), var(--blue-600))',
] as const;
/** Stable placeholder gradient per project. */
export const projectGradient = (slug: string) => GRADIENTS[hash(slug + 'g') % GRADIENTS.length];

/** 0..3 motif variant so compositions don't repeat side by side. */
export const projectMotif = (slug: string) => hash(slug + 'm') % 4;
