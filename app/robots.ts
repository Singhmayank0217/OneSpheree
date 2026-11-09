import type { MetadataRoute } from 'next';
import { site } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Block Next.js internals and any private/admin paths if added in future
        disallow: ['/api/', '/_next/', '/admin/'],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
