import type { MetadataRoute } from 'next'
import { AREAS } from '@/data/areas'
import { SERVICES } from '@/data/services'
import { SITE_CONFIG } from '@/data/config'
import { ALL_BLOG_POSTS } from '@/data/blog-posts'
import { getAreaGuide } from '@/data/area-guides'
import { getTownService, TOWN_SERVICE_PARAMS } from '@/data/governed-town-services'
import { BLOG_CONTENT_UPDATED } from '@/data/blog-seo'
import { CORE_ROUTE_LAST_MODIFIED, SERVICE_GUIDES_REVIEWED_ON } from '@/data/content-dates'

// Exactly the canonical indexable set — every URL here returns 200 with a
// self-canonical and no noindex. Each authored route owns its lastModified
// value; never replace these evidence dates with the current build time.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE_CONFIG.domain

  return [
    // Core pages
    { url: base, lastModified: new Date(CORE_ROUTE_LAST_MODIFIED['/']), changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${base}/areas`, lastModified: new Date(CORE_ROUTE_LAST_MODIFIED['/areas']), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${base}/services`, lastModified: new Date(CORE_ROUTE_LAST_MODIFIED['/services']), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${base}/prices`, lastModified: new Date(CORE_ROUTE_LAST_MODIFIED['/prices']), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(CORE_ROUTE_LAST_MODIFIED['/contact']), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${base}/blog`, lastModified: new Date(CORE_ROUTE_LAST_MODIFIED['/blog']), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${base}/about`, lastModified: new Date(CORE_ROUTE_LAST_MODIFIED['/about']), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${base}/faq`, lastModified: new Date(CORE_ROUTE_LAST_MODIFIED['/faq']), changeFrequency: 'monthly' as const, priority: 0.6 },

    // Service pages
    ...SERVICES.map((s) => ({
      url: `${base}/services/${s.slug}`,
      lastModified: new Date(SERVICE_GUIDES_REVIEWED_ON),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),

    // Area pages (AREAS is deduped at the source)
    ...AREAS.map((a) => {
      const guide = getAreaGuide(a.slug)
      if (!guide) throw new Error(`Missing governed area guide for sitemap route ${a.slug}`)

      return {
        url: `${base}/areas/${a.slug}`,
        lastModified: new Date(guide.reviewedOn),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      }
    }),

    // Hand-written town × service pages (7 towns × 5 services)
    ...TOWN_SERVICE_PARAMS.map((p) => {
      const content = getTownService(p.slug, p.serviceSlug)
      if (!content) throw new Error(`Missing governed town-service content for sitemap route ${p.slug}/${p.serviceSlug}`)

      return {
        url: `${base}/areas/${p.slug}/${p.serviceSlug}`,
        lastModified: new Date(content.reviewedOn),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      }
    }),

    // Hand-written blog posts only
    ...ALL_BLOG_POSTS.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(BLOG_CONTENT_UPDATED[p.slug] ?? p.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
