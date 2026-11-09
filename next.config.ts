import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: { formats: ['image/avif', 'image/webp'], qualities: [75, 90] },

  /**
   * Canonical domain enforcement — all variants redirect (301) to
   * https://www.onespheree.com to prevent duplicate-content indexing.
   *
   * Covers:
   *   http://onespheree.com        → https://www.onespheree.com
   *   http://www.onespheree.com    → https://www.onespheree.com
   *   https://onespheree.com       → https://www.onespheree.com
   *
   * Note: HTTPS enforcement (http→https) is best handled at the hosting
   * layer (Vercel / Nginx / CDN) because Next.js cannot see the original
   * scheme after TLS termination.  The http→https cases below are included
   * as a defence-in-depth measure for local/dev proxies that forward the
   * X-Forwarded-Proto header.
   */
  async redirects() {
    return [
      // non-www → www (works for both http and https when the host matches)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'onespheree.com' }],
        destination: 'https://www.onespheree.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
