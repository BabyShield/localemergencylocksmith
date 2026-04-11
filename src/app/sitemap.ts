import type { MetadataRoute } from 'next'
import { AREAS } from '@/data/areas'
import { SERVICES } from '@/data/services'
import { SITE_CONFIG } from '@/data/config'
import { ALL_BLOG_POSTS } from '@/data/blog-posts'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE_CONFIG.domain
  const buildDate = new Date()

  return [
    // Core pages
    { url: base, lastModified: buildDate, changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${base}/areas`, lastModified: buildDate, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${base}/prices`, lastModified: buildDate, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${base}/contact`, lastModified: buildDate, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${base}/blog`, lastModified: buildDate, changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${base}/about`, lastModified: buildDate, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${base}/faq`, lastModified: buildDate, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${base}/near-me`, lastModified: buildDate, changeFrequency: 'daily' as const, priority: 0.9 },

    // Service pages
    ...SERVICES.map((s) => ({
      url: `${base}/services/${s.slug}`,
      lastModified: buildDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),

    // Area pages
    ...AREAS.map((a) => ({
      url: `${base}/areas/${a.slug}`,
      lastModified: buildDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),

    // Area × service pages
    ...AREAS.flatMap((a) =>
      SERVICES.map((s) => ({
        url: `${base}/areas/${a.slug}/${s.slug}`,
        lastModified: buildDate,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      }))
    ),

    // Review pages
    ...AREAS.map((a) => ({
      url: `${base}/reviews/${a.slug}`,
      lastModified: buildDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),

    // Postcode pages
    ...Array.from(new Set(AREAS.map((a) => a.postcode.toLowerCase()))).map((pc) => ({
      url: `${base}/postcodes/${pc}`,
      lastModified: buildDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),

    // Hand-written blog posts only
    ...ALL_BLOG_POSTS.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
