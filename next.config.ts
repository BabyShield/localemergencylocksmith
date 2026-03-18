import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(self)',
  },
]

// Cut article templates — redirect to parent area page (preserves link equity)
const cutArticleSlugs = [
  'yale-vs-deadlock-which-is-safer',
  'find-trustworthy-locksmith',
  'best-door-locks-security-guide',
  'lost-keys-what-to-do',
  'landlord-lock-change',
]

const nextConfig: NextConfig = {
  async redirects() {
    return cutArticleSlugs.map((slug) => ({
      source: `/blog/:area/${slug}`,
      destination: '/areas/:area',
      permanent: true,
    }))
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 768, 1024, 1280],
    minimumCacheTTL: 31536000,
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
