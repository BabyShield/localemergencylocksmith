import fs from 'fs'
import path from 'path'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { AREAS, getAreaBySlug } from '@/data/areas'
import { SITE_CONFIG } from '@/data/config'
import HeroSection from '@/components/HeroSection'
import CTABlock from '@/components/CTABlock'
import SchemaMarkup from '@/components/SchemaMarkup'

export const dynamic = 'force-static'
export const revalidate = false

interface Props {
  params: Promise<{ areaSlug: string; topicSlug: string }>
}

function getAlgorithmicArticles() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'articles-generated', 'algorithmic-blogs.json')
    const data = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (e) {
    return {}
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { areaSlug, topicSlug } = await params
  const area = getAreaBySlug(areaSlug)
  const articles = getAlgorithmicArticles()
  
  const articleKey = `${areaSlug}/${topicSlug}`
  const article = articles[articleKey]

  if (!area || !article) return {}

  const description = `${article.title} — expert locksmith guide for ${area.name} residents. Local independent locksmith covering ${area.postcode}. No VAT, no call-out fee.`

  return {
    title: `${article.title} | Locksmith ${area.name}`,
    description,
    keywords: `locksmith ${area.name}, ${article.title.toLowerCase()}, ${area.postcode} locksmith, security guide ${area.name}`,
    alternates: {
      canonical: `${SITE_CONFIG.domain}/guides/${areaSlug}/${topicSlug}`,
    },
    openGraph: {
      title: `${article.title} | Locksmith ${area.name}`,
      description,
      url: `${SITE_CONFIG.domain}/guides/${areaSlug}/${topicSlug}`,
      type: 'article',
      images: [{ url: `${SITE_CONFIG.domain}/api/og?title=${encodeURIComponent(article.title)}`, width: 1200, height: 630 }],
    },
  }
}

export default async function GuidesPage({ params }: Props) {
  const { areaSlug, topicSlug } = await params
  const area = getAreaBySlug(areaSlug)
  const articles = getAlgorithmicArticles()
  
  const articleKey = `${areaSlug}/${topicSlug}`
  const article = articles[articleKey]

  if (!area || !article) notFound()

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_CONFIG.domain },
      { '@type': 'ListItem', position: 2, name: 'Areas', item: `${SITE_CONFIG.domain}/areas` },
      { '@type': 'ListItem', position: 3, name: area.name, item: `${SITE_CONFIG.domain}/areas/${areaSlug}` },
      { '@type': 'ListItem', position: 4, name: article.title, item: `${SITE_CONFIG.domain}/guides/${areaSlug}/${topicSlug}` },
    ],
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: `${article.intro} Local expert guide for ${area.name} residents.`,
    url: `${SITE_CONFIG.domain}/guides/${areaSlug}/${topicSlug}`,
    datePublished: '2025-10-01',
    dateModified: '2026-03-17',
    author: {
      '@type': 'Person',
      name: 'Ross',
      jobTitle: 'Locksmith',
      worksFor: { '@type': 'LocalBusiness', '@id': `${SITE_CONFIG.domain}/#business` },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Local Emergency Locksmith',
      url: SITE_CONFIG.domain,
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_CONFIG.domain}/guides/${areaSlug}/${topicSlug}` },
    about: { '@type': 'Place', name: area.name, address: { '@type': 'PostalAddress', postalCode: area.postcode, addressCountry: 'GB' } },
  }

  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} />
      <SchemaMarkup schema={articleSchema} />

      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 py-3 text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-0" itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <Link href="/" itemProp="item" className="hover:text-[#FFB800]"><span itemProp="name">Home</span></Link>
            <meta itemProp="position" content="1" />
          </li>
          <span className="mx-2" aria-hidden="true">›</span>
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <Link href={`/areas/${areaSlug}`} itemProp="item" className="hover:text-[#FFB800]"><span itemProp="name">{area.name}</span></Link>
            <meta itemProp="position" content="2" />
          </li>
          <span className="mx-2" aria-hidden="true">›</span>
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <span itemProp="item"><span itemProp="name" className="text-gray-800 font-medium">{article.title}</span></span>
            <meta itemProp="position" content="3" />
          </li>
        </ol>
      </nav>

      <HeroSection
        heading={article.title}
        subheading={article.intro}
        areaName={area.name}
      />

      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-[#0F1B2D] mb-6">
            Expert Security Advice for {area.name}
          </h2>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
             {article.content.map((paragraph: string, index: number) => (
                <p key={index} className="leading-relaxed">
                   {paragraph}
                </p>
             ))}
          </div>

          <div className="mt-12 bg-[#F7F7F5] border border-gray-200 rounded-xl p-6 text-center">
             <h3 className="font-bold text-xl mb-3">Require local assistance?</h3>
             <p className="mb-4">I cover all of {area.name} directly. Bypass the national call centres.</p>
             <a
              href={`tel:${SITE_CONFIG.phoneTel}`}
              className="inline-flex bg-[#FFB800] hover:bg-[#FFC933] text-[#0F1B2D] px-8 py-3 rounded-lg font-black text-lg transition-colors shadow"
             >
              Call {SITE_CONFIG.phone}
             </a>
          </div>
        </div>
      </section>

      <CTABlock
        heading={`Fast response in ${area.name}`}
        subtext={`No VAT, no call-out fee. From £59.`}
      />
    </>
  )
}
