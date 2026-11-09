import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
import { galleryProjects } from '@/data/gallery';
import { portfolioProjects } from '@/data/portfolio';

const BASE = site.url; // https://www.onespheree.com

/** Build a full canonical URL from a root-relative path. */
const url = (path: string) => `${BASE}${path}`;

/** Static pages with their approximate last-modified dates and priorities. */
const staticPages: MetadataRoute.Sitemap = [
  {
    url: url('/'),
    lastModified: new Date('2025-11-01'),
    changeFrequency: 'weekly',
    priority: 1.0,
  },
  {
    url: url('/about'),
    lastModified: new Date('2025-10-15'),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: url('/services'),
    lastModified: new Date('2025-10-20'),
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  {
    url: url('/services/digital-marketing'),
    lastModified: new Date('2025-10-20'),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: url('/services/due-diligence'),
    lastModified: new Date('2025-10-20'),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: url('/services/e-commerce'),
    lastModified: new Date('2025-10-20'),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: url('/services/financial-compliance'),
    lastModified: new Date('2025-10-20'),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: url('/services/fire-safety'),
    lastModified: new Date('2025-10-20'),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: url('/services/manpower-solutions'),
    lastModified: new Date('2025-10-20'),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: url('/services/sales-consulting'),
    lastModified: new Date('2025-10-20'),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: url('/work'),
    lastModified: new Date('2025-11-01'),
    changeFrequency: 'weekly',
    priority: 0.9,
  },
  {
    url: url('/portfolio'),
    lastModified: new Date('2025-11-01'),
    changeFrequency: 'weekly',
    priority: 0.9,
  },
  {
    url: url('/contact'),
    lastModified: new Date('2025-09-01'),
    changeFrequency: 'yearly',
    priority: 0.7,
  },
  {
    url: url('/smartkarobar'),
    lastModified: new Date('2025-10-01'),
    changeFrequency: 'monthly',
    priority: 0.7,
  },
];

/** Dynamic /work/[slug] entries generated from the gallery data. */
const workPages: MetadataRoute.Sitemap = galleryProjects.map((project) => ({
  url: url(`/work/${project.slug}`),
  lastModified: new Date(`${project.year}-01-01`),
  changeFrequency: 'monthly' as const,
  priority: 0.7,
}));

/** Dynamic /portfolio/[slug] entries generated from the portfolio data. */
const portfolioPages: MetadataRoute.Sitemap = portfolioProjects.map((project) => ({
  url: url(`/portfolio/${project.slug}`),
  lastModified: new Date(`${project.year}-01-01`),
  changeFrequency: 'monthly' as const,
  priority: 0.7,
}));

export default function sitemap(): MetadataRoute.Sitemap {
  return [...staticPages, ...workPages, ...portfolioPages];
}
