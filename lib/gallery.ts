import { galleryProjects } from '@/data/gallery';
import type { GalleryProject, GalleryCategory, ServiceName } from '@/types/gallery';

/**
 * Flip to `true` and drop files into `public/images/work/` to activate real
 * photography. Until then `ProjectImage` renders a token-gradient composition
 * in the same slot, so there is never a broken image and no eager network load.
 */
export const HAS_REAL_IMAGERY = false;

/**
 * The chips actually offered on /work. A vertical joins this list once it has
 * photography in the archive — the taxonomy in types/gallery.ts already carries
 * every division (including Financial & Compliance Services), so adding the
 * label here is the only step when its first project lands.
 */
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
