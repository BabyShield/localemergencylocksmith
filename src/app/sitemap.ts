import type { MetadataRoute } from 'next'
import { AREAS } from '@/data/areas'
import { SERVICES } from '@/data/services'
import { SITE_CONFIG, CONTENT_UPDATED } from '@/data/config'
import { ALL_BLOG_POSTS } from '@/data/blog-posts'

// Exactly the canonical indexable set — every URL here returns 200 with a
// self-canonical and no noindex. lastModified comes from CONTENT_UPDATED
// (bumped by hand on real edits) or the post's stored date, never new Date().
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE_CONFIG.domain
  const contentDate = new Date(CONTENT_UPDATED)

  return [
    // Core pages
    { url: base, lastModified: contentDate, changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${base}/areas`, lastModified: contentDate, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${base}/services`, lastModified: contentDate, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${base}/prices`, lastModified: contentDate, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${base}/contact`, lastModified: contentDate, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${base}/blog`, lastModified: contentDate, changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${base}/about`, lastModified: contentDate, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${base}/faq`, lastModified: contentDate, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${base}/testimonials`, lastModified: contentDate, changeFrequency: 'monthly' as const, priority: 0.6 },

    // Service pages
    ...SERVICES.map((s) => ({
      url: `${base}/services/${s.slug}`,
      lastModified: contentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),

    // Area pages (AREAS is deduped at the source)
    ...AREAS.map((a) => ({
      url: `${base}/areas/${a.slug}`,
      lastModified: contentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),

    // Postcode coverage hubs
    ...Array.from(new Set(AREAS.map((a) => a.postcode.toLowerCase()))).map((pc) => ({
      url: `${base}/postcodes/${pc}`,
      lastModified: contentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
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
