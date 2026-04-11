import type { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/data/config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/image',
          '/areas/*/streets/',
          '/near-me/*/*',
          '/guides/',
          '/blog/*/*',
        ],
      },
    ],
    sitemap: `${SITE_CONFIG.domain}/sitemap.xml`,
  }
}
