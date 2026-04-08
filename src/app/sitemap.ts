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

export async function generateSitemaps() {
  return [
    { id: 'core' },
    { id: 'areas-and-hubs' },
    { id: 'locksmith-silo' },
    { id: 'streets-part-1' },
    { id: 'streets-part-2' },
    { id: 'streets-part-3' },
    { id: 'articles-and-blogs' }
  ]
}

export default async function sitemap({ id }: { id: Promise<string> | string }): Promise<MetadataRoute.Sitemap> {
  const resolvedId = typeof id === 'string' ? id : await id;
  const base = SITE_CONFIG.domain
  const buildDate = new Date()

  if (resolvedId === 'core') {
    return [
      { url: base, lastModified: buildDate, changeFrequency: 'weekly' as const, priority: 1.0 },
      { url: `${base}/areas`, lastModified: buildDate, changeFrequency: 'weekly' as const, priority: 0.8 },
      { url: `${base}/prices`, lastModified: buildDate, changeFrequency: 'monthly' as const, priority: 0.7 },
      { url: `${base}/contact`, lastModified: buildDate, changeFrequency: 'monthly' as const, priority: 0.6 },
      { url: `${base}/blog`, lastModified: buildDate, changeFrequency: 'weekly' as const, priority: 0.7 },
      { url: `${base}/about`, lastModified: buildDate, changeFrequency: 'monthly' as const, priority: 0.7 },
      { url: `${base}/faq`, lastModified: buildDate, changeFrequency: 'monthly' as const, priority: 0.6 },
      { url: `${base}/near-me`, lastModified: buildDate, changeFrequency: 'daily' as const, priority: 0.9 },
      ...SERVICES.map((s) => ({ url: `${base}/services/${s.slug}`, lastModified: buildDate, changeFrequency: 'monthly' as const, priority: 0.9 as any })),
      ...AREAS.map(a => ({ url: `${base}/reviews/${a.slug}`, lastModified: buildDate, changeFrequency: 'monthly' as const, priority: 0.8 as any })),
      ...Array.from(new Set(AREAS.map(a => a.postcode.toLowerCase()))).map(pc => ({ url: `${base}/postcodes/${pc}`, lastModified: buildDate, changeFrequency: 'weekly' as const, priority: 0.9 as any }))
    ]
  }

  if (resolvedId === 'areas-and-hubs') {
    const areaPages = AREAS.map((a) => ({ url: `${base}/areas/${a.slug}`, lastModified: buildDate, changeFrequency: 'monthly' as const, priority: 0.8 as any }))
    const areaServicePages = AREAS.flatMap((a) =>
      SERVICES.map((s) => ({ url: `${base}/areas/${a.slug}/${s.slug}`, lastModified: buildDate, changeFrequency: 'monthly' as const, priority: 0.8 as any }))
    )
    return [...areaPages, ...areaServicePages]
  }

  if (resolvedId === 'locksmith-silo') {
    const locksmithPages = AREAS.map((a) => ({ url: `${base}/locksmith/${a.slug}`, lastModified: buildDate, changeFrequency: 'monthly' as const, priority: 0.9 as any }))
    const locksmithServicePages = AREAS.flatMap((a) =>
      SERVICES.map((s) => ({ url: `${base}/locksmith/${a.slug}/${s.slug}`, lastModified: buildDate, changeFrequency: 'monthly' as const, priority: 0.8 as any }))
    )
    return [...locksmithPages, ...locksmithServicePages]
  }

  if (resolvedId.startsWith('streets-')) {
    const allStreetPages: MetadataRoute.Sitemap = []
    AREAS.forEach((area) => {
      const areaJson = getJsonSafe(`src/data/streets/${area.slug}.json`)
      const streets = areaJson.streets || []
      streets.forEach((street: any) => {
        allStreetPages.push({ url: `${base}/areas/${area.slug}/streets/${street.slug}`, lastModified: buildDate, changeFrequency: 'yearly' as const, priority: 0.5 as any })
        allStreetPages.push({ url: `${base}/locksmith/${area.slug}/streets/${street.slug}`, lastModified: buildDate, changeFrequency: 'yearly' as const, priority: 0.5 as any })
      })
    })

    const chunkSize = Math.ceil(allStreetPages.length / 3)
    if (resolvedId === 'streets-part-1') return allStreetPages.slice(0, chunkSize)
    if (resolvedId === 'streets-part-2') return allStreetPages.slice(chunkSize, chunkSize * 2)
    if (resolvedId === 'streets-part-3') return allStreetPages.slice(chunkSize * 2)
  }

  if (resolvedId === 'articles-and-blogs') {
    const nearMeKeywords = getJsonSafe('src/data/articles-generated/near-me-keywords.json')
    const nearMePages = nearMeKeywords.flatMap((kw: any) => AREAS.map((a) => ({ url: `${base}/near-me/${kw.slug}/${a.slug}`, lastModified: buildDate, changeFrequency: 'monthly' as const, priority: 0.7 as any })))
    
    const areaArticlePages = AREAS.flatMap((a) => ARTICLE_TEMPLATES.map((t) => ({ url: `${base}/blog/${a.slug}/${t.slug}`, lastModified: buildDate, changeFrequency: 'monthly' as const, priority: 0.6 as any })))
    const blogPostPages = ALL_BLOG_POSTS.map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: new Date(p.date), changeFrequency: 'monthly' as const, priority: 0.6 as any }))
    
    const algorithmicBlogs = getJsonSafe('src/data/articles-generated/algorithmic-blogs.json')
    const algorithmicPages = Object.keys(algorithmicBlogs).map((key) => {
      const [area, topic] = key.split('/')
      return { url: `${base}/guides/${area}/${topic}`, lastModified: buildDate, changeFrequency: 'monthly' as const, priority: 0.5 as any }
    })

    return [...nearMePages, ...areaArticlePages, ...blogPostPages, ...algorithmicPages]
  }

  return []
}
