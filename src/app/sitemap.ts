import type { MetadataRoute } from 'next'
import { AREAS } from '@/data/areas'
import { SERVICES } from '@/data/services'
import { SITE_CONFIG } from '@/data/config'
import { ARTICLE_TEMPLATES } from '@/data/articles'
import { ALL_BLOG_POSTS } from '@/data/blog-posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_CONFIG.domain
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/areas`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/prices`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ]

  const servicePages: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  const areaPages: MetadataRoute.Sitemap = AREAS.map((a) => ({
    url: `${base}/areas/${a.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  // Plan 2: Area-specific blog articles (78 areas × 10 templates = 780 pages)
  const areaArticlePages: MetadataRoute.Sitemap = AREAS.flatMap((a) =>
    ARTICLE_TEMPLATES.map((t) => ({
      url: `${base}/blog/${a.slug}/${t.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  )

  // Plan 3: Standalone blog posts (52 posts across 7 pillars)
  const blogPostPages: MetadataRoute.Sitemap = ALL_BLOG_POSTS.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...servicePages, ...areaPages, ...areaArticlePages, ...blogPostPages]
}
