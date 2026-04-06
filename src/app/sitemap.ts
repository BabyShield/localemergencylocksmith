import type { MetadataRoute } from 'next'
import { AREAS } from '@/data/areas'
import { SERVICES } from '@/data/services'
import { SITE_CONFIG } from '@/data/config'
import { ARTICLE_TEMPLATES } from '@/data/articles'
import { ALL_BLOG_POSTS } from '@/data/blog-posts'
import fs from 'fs'
import path from 'path'

function getJsonSafe(filePath: string) {
  try {
    const data = fs.readFileSync(path.join(process.cwd(), filePath), 'utf-8')
    return JSON.parse(data)
  } catch (e) {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE_CONFIG.domain
  const buildDate = new Date()

  // 1. Core Static Pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: buildDate, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/areas`, lastModified: buildDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/prices`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/contact`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/blog`, lastModified: buildDate, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/about`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/faq`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/near-me`, lastModified: buildDate, changeFrequency: 'daily', priority: 0.9 },
  ]

  // 2. Services Base
  const servicePages: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: buildDate,
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  // 3. Areas Base
  const areaPages: MetadataRoute.Sitemap = AREAS.map((a) => ({
    url: `${base}/areas/${a.slug}`,
    lastModified: buildDate,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  // 4. Area x Service Matrix
  const areaServicePages: MetadataRoute.Sitemap = AREAS.flatMap((a) =>
    SERVICES.map((s) => ({
      url: `${base}/areas/${a.slug}/${s.slug}`,
      lastModified: buildDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    }))
  )

  // 5. Street Data Generator (Programmatic)
  const streetDataPages: MetadataRoute.Sitemap = []
  AREAS.forEach((area) => {
    const areaJson = getJsonSafe(`src/data/streets/${area.slug}.json`)
    const streets = areaJson.streets || []
    streets.forEach((street: any) => {
      streetDataPages.push({
        url: `${base}/areas/${area.slug}/streets/${street.slug}`,
        lastModified: buildDate,
        changeFrequency: 'yearly',
        priority: 0.5,
      })
    })
  })

  // 6. Near Me Long Tail (Programmatic)
  const nearMeKeywords = getJsonSafe('src/data/articles-generated/near-me-keywords.json')
  const nearMePages: MetadataRoute.Sitemap = nearMeKeywords.flatMap((kw: any) =>
    AREAS.map((a) => ({
      url: `${base}/near-me/${kw.slug}/${a.slug}`,
      lastModified: buildDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    }))
  )

  // 7. Blog Articles Baseline
  const areaArticlePages: MetadataRoute.Sitemap = AREAS.flatMap((a) =>
    ARTICLE_TEMPLATES.map((t) => ({
      url: `${base}/blog/${a.slug}/${t.slug}`,
      lastModified: buildDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    }))
  )

  // 8. Individual Blogs
  const blogPostPages: MetadataRoute.Sitemap = ALL_BLOG_POSTS.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  // 9. Algorithmic Guides
  const algorithmicBlogs = getJsonSafe('src/data/articles-generated/algorithmic-blogs.json')
  const algorithmicPages: MetadataRoute.Sitemap = Object.keys(algorithmicBlogs).map((key) => {
     const [area, topic] = key.split('/')
     return {
        url: `${base}/guides/${area}/${topic}`,
        lastModified: buildDate,
        changeFrequency: 'monthly',
        priority: 0.5,
     }
  })

  // 10. Reviews Directory
  const reviewPages: MetadataRoute.Sitemap = AREAS.map((a) => ({
    url: `${base}/reviews/${a.slug}`,
    lastModified: buildDate,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  // 11. Postcode Hubs
  const postcodes = new Set(AREAS.map(a => a.postcode.toLowerCase()))
  const postcodePages: MetadataRoute.Sitemap = Array.from(postcodes).map(pc => ({
    url: `${base}/postcodes/${pc}`,
    lastModified: buildDate,
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  return [
    ...staticPages,
    ...servicePages,
    ...areaPages,
    ...areaServicePages,
    ...streetDataPages,
    ...nearMePages,
    ...areaArticlePages,
    ...blogPostPages,
    ...algorithmicPages,
    ...reviewPages,
    ...postcodePages,
  ]
}
