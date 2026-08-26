import type { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/data/config'

// One indexation mechanism per page family: removed routes 301 (must stay
// crawlable so Google can see the redirects), private pages use meta noindex.
// Only the API is disallowed — except the OG image endpoint, which must stay
// fetchable for social link previews.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/api/og'],
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${SITE_CONFIG.domain}/sitemap.xml`,
  }
}
