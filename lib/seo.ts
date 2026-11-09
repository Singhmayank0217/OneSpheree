import type { Metadata } from 'next';
import { site } from '@/config/site';

// ---------------------------------------------------------------------------
// Core metadata builder
// ---------------------------------------------------------------------------

/**
 * Per-page metadata: canonical + Open Graph + Twitter from one call.
 *
 * Pass `ogImage` to override the default OG image on a specific page.
 * When omitted, Next.js falls back to the `metadataBase` + default OG image
 * set in app/layout.tsx.
 */
export function buildMetadata({
  title,
  description,
  path,
  ogImage,
  type = 'website',
  publishedAt,
  updatedAt,
  authors,
}: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  /** Open Graph type — use 'article' for blog posts */
  type?: 'website' | 'article';
  /** ISO date string — only used when type='article' */
  publishedAt?: string;
  updatedAt?: string;
  authors?: string[];
}): Metadata {
  const url = `${site.url}${path === '/' ? '' : path}`;
  const images = ogImage
    ? [{ url: `${site.url}${ogImage}`, width: 1200, height: 630, alt: title }]
    : [{ url: `${site.url}/og-image.png`, width: 1200, height: 630, alt: `${site.name} — ${site.tagline}` }];

  const openGraph: Metadata['openGraph'] =
    type === 'article'
      ? {
          title,
          description,
          url,
          siteName: site.name,
          type: 'article',
          locale: 'en_US',
          images,
          ...(publishedAt && { publishedTime: publishedAt }),
          ...(updatedAt && { modifiedTime: updatedAt }),
          ...(authors && { authors }),
        }
      : {
          title,
          description,
          url,
          siteName: site.name,
          type: 'website',
          locale: 'en_US',
          images,
        };

  return {
    // the home page carries the full brand title; inner pages go through the layout template
    title: path === '/' ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph,
    twitter: { card: 'summary_large_image', title, description, images: images.map((i) => i.url) },
    robots: { index: true, follow: true },
  };
}

// ---------------------------------------------------------------------------
// Structured data helpers — all return plain objects for JSON.stringify()
// ---------------------------------------------------------------------------

/** Organization schema — injected once in the root layout. */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.url,
    logo: {
      '@type': 'ImageObject',
      url: `${site.url}/logos/onespheree-logo-full.png`,
      width: 400,
      height: 100,
    },
    description: site.description,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      url: `${site.url}/contact`,
      availableLanguage: 'English',
    },
    sameAs: [] as string[],
  };
}

/** WebSite schema — enables sitelinks search box and confirms the canonical site identity. */
export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.url,
    description: site.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${site.url}/work?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Service schema for a single service page.
 *
 * @param name       - The service name, e.g. "Digital Marketing"
 * @param description - A short description of the service
 * @param url        - The canonical URL of the service page
 * @param serviceType - A comma-separated list of sub-services or just the category
 */
export function serviceJsonLd({
  name,
  description,
  url,
  serviceType,
}: {
  name: string;
  description: string;
  url: string;
  serviceType?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    serviceType: serviceType ?? name,
    provider: {
      '@type': 'Organization',
      name: site.name,
      url: site.url,
    },
    areaServed: {
      '@type': 'Place',
      name: 'Worldwide',
    },
  };
}

/**
 * BreadcrumbList schema for deep pages (service sub-pages, project pages, etc.).
 *
 * @param crumbs - Ordered array of { name, href } from root to current page
 */
export function breadcrumbJsonLd(crumbs: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: crumb.name,
      item: `${site.url}${crumb.href}`,
    })),
  };
}

/**
 * FAQPage schema — accepts an array of { q, a } pairs.
 */
export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

/**
 * Article (BlogPosting) schema for individual blog posts.
 *
 * @param title       - Article headline
 * @param description - Article description / meta description
 * @param url         - Canonical URL of the article
 * @param publishedAt - ISO 8601 published date
 * @param updatedAt   - ISO 8601 updated date (defaults to publishedAt)
 * @param author      - Author name (defaults to site name)
 * @param ogImage     - Absolute URL of the article OG image
 */
export function articleJsonLd({
  title,
  description,
  url,
  publishedAt,
  updatedAt,
  author,
  ogImage,
}: {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  updatedAt?: string;
  author?: string;
  ogImage?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url,
    datePublished: publishedAt,
    dateModified: updatedAt ?? publishedAt,
    author: {
      '@type': 'Organization',
      name: author ?? site.name,
      url: site.url,
    },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      url: site.url,
      logo: {
        '@type': 'ImageObject',
        url: `${site.url}/logos/onespheree-logo-full.png`,
      },
    },
    image: ogImage ?? `${site.url}/og-image.png`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}
