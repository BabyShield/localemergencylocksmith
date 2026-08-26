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

// The 5 service slugs — used to constrain redirect patterns so nothing else is swallowed
const SERVICE_SLUGS = 'emergency-lockout|lock-change|upvc-lock-repair|boarding-up|lock-upgrade'

// The 7 towns with hand-written town×service pages — excluded (via lookahead)
// from the area×service redirect so their real pages serve. Keep in sync with
// src/data/town-services.ts.
const TOWN_SLUGS = 'nuneaton|bedworth|rugby|leamington-spa|warwick|kenilworth|stratford-upon-avon'

// Boilerplate town-centre areas consolidated into their rich siblings
const TOWN_CENTRE_REDIRECTS = [
  ['rugby-town-centre', 'rugby'],
  ['royal-leamington-spa-town-centre', 'leamington-spa'],
  ['warwick-town-centre', 'warwick'],
  ['stratford-upon-avon-town-centre', 'stratford-upon-avon'],
]

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // ── Removed doorway surfaces → canonical pages (most specific first) ──
      { source: '/areas/:slug/streets/:street', destination: '/areas/:slug', permanent: true },
      { source: `/areas/:slug((?!(?:${TOWN_SLUGS})/)[a-z0-9-]+)/:service(${SERVICE_SLUGS})`, destination: '/areas/:slug', permanent: true },
      { source: '/locksmith/:slug/streets/:street', destination: '/areas/:slug', permanent: true },
      { source: `/locksmith/:slug/:service(${SERVICE_SLUGS})`, destination: '/areas/:slug', permanent: true },
      { source: '/locksmith/:slug', destination: '/areas/:slug', permanent: true },
      { source: '/locksmith', destination: '/areas', permanent: true },
      { source: '/reviews/:areaSlug', destination: '/areas/:areaSlug', permanent: true },
      { source: '/reviews', destination: '/testimonials', permanent: true },
      // Covers all templated area articles, incl. the 5 previously cut slugs
      { source: '/blog/:areaSlug/:articleSlug', destination: '/areas/:areaSlug', permanent: true },
      { source: '/guides/:path*', destination: '/blog', permanent: true },
      { source: '/near-me/:keyword/:areaSlug', destination: '/areas/:areaSlug', permanent: true },
      { source: '/near-me/:keyword', destination: '/', permanent: true },
      { source: '/near-me', destination: '/', permanent: true },
      // ── Consolidated boilerplate areas → rich siblings ──
      ...TOWN_CENTRE_REDIRECTS.map(([from, to]) => ({
        source: `/areas/${from}`,
        destination: `/areas/${to}`,
        permanent: true,
      })),
      // ── Stale URLs from the domain's previous owner, still in Google's index ──
      { source: '/local-emergency-locksmith/:path*', destination: '/', permanent: true },
      { source: '/local-emergency-locksmith', destination: '/', permanent: true },
      { source: '/locksmith-windsor-and-maidenhead', destination: '/', permanent: true },
      { source: '/collections/lock-replacement-services', destination: '/services/lock-change', permanent: true },
      { source: '/collections/:path*', destination: '/services', permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      {
        source: '/areas/:path*',
        headers: [
          { key: 'Cache-Control', value: 's-maxage=86400, stale-while-revalidate=2592000' }
        ],
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
