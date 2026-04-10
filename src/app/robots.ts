import type { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/data/config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Allow /locksmith/ — Google must crawl these to read the canonical → /areas/ tag
        // Only block routes that should never be indexed
        disallow: ['/api/', '/admin/', '/_next/image'],
      },
    ],
    sitemap: `${SITE_CONFIG.domain}/sitemap.xml`,
  }
}
