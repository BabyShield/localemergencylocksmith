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

  const description = `${article.title}. Local expert guide to security and locksmithing in ${area.name}. Fast, VAT-free response.`

  return {
    title: `${article.title} | ${SITE_CONFIG.domain}`,
    description,
    alternates: {
      canonical: `${SITE_CONFIG.domain}/guides/${areaSlug}/${topicSlug}`,
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
    '@type': 'Article',
    headline: article.title,
    author: {
        '@type': 'Organization',
        name: 'Local Emergency Locksmith'
    },
    publisher: {
        '@type': 'Organization',
        name: 'Local Emergency Locksmith'
    }
  }

  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} />
      <SchemaMarkup schema={articleSchema} />

      <nav className="max-w-6xl mx-auto px-4 py-3 text-sm text-gray-500">
        <Link href="/" className="hover:text-[#FFB800]">Home</Link>
        <span className="mx-2">›</span>
        <Link href={`/areas/${areaSlug}`} className="hover:text-[#FFB800]">{area.name}</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-800 font-medium">{article.title}</span>
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
