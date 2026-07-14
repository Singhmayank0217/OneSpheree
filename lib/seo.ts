import type { Metadata } from 'next';
import { site } from '@/config/site';

/** Per-page metadata: canonical + Open Graph + Twitter from one call. */
export function buildMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${site.url}${path === '/' ? '' : path}`;
  return {
    // the home page carries the full brand title; inner pages go through the layout template
    title: path === '/' ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      type: 'website',
      locale: 'en_US',
    },
    twitter: { card: 'summary_large_image', title, description },
    robots: { index: true, follow: true },
  };
}

/** Organization structured data injected once in the root layout. */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.url,
    logo: `${site.url}/logos/onespheree-logo-full.png`,
    description: site.description,
  };
}
