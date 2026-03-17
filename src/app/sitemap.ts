import type { MetadataRoute } from 'next'
import { AREAS } from '@/data/areas'
import { SERVICES } from '@/data/services'
import { SITE_CONFIG } from '@/data/config'
import { ARTICLE_TEMPLATES } from '@/data/articles'
import { ALL_BLOG_POSTS } from '@/data/blog-posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_CONFIG.domain
  const buildDate = new Date('2026-03-17')

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: buildDate, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/areas`, lastModified: buildDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/prices`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/contact`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/blog`, lastModified: buildDate, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/about`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/privacy`, lastModified: buildDate, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/terms`, lastModified: buildDate, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/faq`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/testimonials`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.6 },
  ]

  const servicePages: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: buildDate,
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  const areaPages: MetadataRoute.Sitemap = AREAS.map((a) => ({
    url: `${base}/areas/${a.slug}`,
    lastModified: buildDate,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  // Plan 2: Area-specific blog articles — stagger dates across Sept 2025 to March 2026
  const articleBaseDate = new Date('2025-09-01')
  const areaArticlePages: MetadataRoute.Sitemap = AREAS.flatMap((a, areaIdx) =>
    ARTICLE_TEMPLATES.map((t, articleIdx) => {
      const daysOffset = areaIdx + articleIdx * 7
      const articleDate = new Date(articleBaseDate)
      articleDate.setDate(articleDate.getDate() + daysOffset)
      return {
        url: `${base}/blog/${a.slug}/${t.slug}`,
        lastModified: articleDate,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }
    })
  )

  // Plan 3: Standalone blog posts (use their actual dates)
  const blogPostPages: MetadataRoute.Sitemap = ALL_BLOG_POSTS.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...servicePages, ...areaPages, ...areaArticlePages, ...blogPostPages]
}
