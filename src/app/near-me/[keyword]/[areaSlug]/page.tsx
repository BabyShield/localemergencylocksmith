import fs from 'fs'
import path from 'path'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { AREAS, getAreaBySlug } from '@/data/areas'
import { SITE_CONFIG } from '@/data/config'
import HeroSection from '@/components/HeroSection'
import CTABlock from '@/components/CTABlock'
import FAQSection from '@/components/FAQSection'
import SchemaMarkup from '@/components/SchemaMarkup'

interface Props {
  params: Promise<{ keyword: string; areaSlug: string }>
}

function getKeywords() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'articles-generated', 'near-me-keywords.json')
    const data = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (e) {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { keyword, areaSlug } = await params
  const area = getAreaBySlug(areaSlug)
  const keywords = getKeywords()
  
  const kwMatch = keywords.find((k: any) => k.slug === keyword)
  if (!area || !kwMatch) return {}

  // "local locksmith near me 24/7 in Earlsdon"
  const titleText = kwMatch.keyword.replace(/near me/gi, `near me in ${area.name}`)
  const title = `${titleText.charAt(0).toUpperCase() + titleText.slice(1)} | Locksmith`

  const desc = `Looking for a ${kwMatch.keyword} around ${area.name}? Local independent locksmith, ${area.responseTime} response. No VAT, no call-out fee. Call ${SITE_CONFIG.phone} now.`

  return {
    title,
    description: desc,
    robots: { index: false, follow: true },
    keywords: `${kwMatch.keyword} ${area.name}, ${kwMatch.keyword} ${area.postcode}, locksmith near me ${area.name}, emergency locksmith ${area.name}`,
    alternates: {
      canonical: `${SITE_CONFIG.domain}/near-me/${keyword}/${areaSlug}`,
    },
    openGraph: {
      title,
      description: desc,
      url: `${SITE_CONFIG.domain}/near-me/${keyword}/${areaSlug}`,
      images: [
        {
          url: `${SITE_CONFIG.domain}/api/og?title=${encodeURIComponent(titleText.charAt(0).toUpperCase() + titleText.slice(1))}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}

export default async function KeywordAreaPage({ params }: Props) {
  const { keyword, areaSlug } = await params
  const area = getAreaBySlug(areaSlug)
  const keywords = getKeywords()
  
  const kwMatch = keywords.find((k: any) => k.slug === keyword)
  
  if (!area || !kwMatch) notFound()

  const prettyKeyword = kwMatch.keyword.replace(/near me/gi, `near me in ${area.name}`)

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_CONFIG.domain },
      { '@type': 'ListItem', position: 2, name: 'Near Me', item: `${SITE_CONFIG.domain}/near-me` },
      { '@type': 'ListItem', position: 3, name: area.name, item: `${SITE_CONFIG.domain}/near-me/${keyword}/${areaSlug}` },
    ],
  }

  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} />

      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 py-3 text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-0" itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <Link href="/" itemProp="item" className="hover:text-[#FFB800]"><span itemProp="name">Home</span></Link>
            <meta itemProp="position" content="1" />
          </li>
          <span className="mx-2" aria-hidden="true">›</span>
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <Link href="/near-me" itemProp="item" className="hover:text-[#FFB800]"><span itemProp="name">Near Me</span></Link>
            <meta itemProp="position" content="2" />
          </li>
          <span className="mx-2" aria-hidden="true">›</span>
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <span itemProp="item"><span itemProp="name" className="text-gray-800 font-medium capitalize">{prettyKeyword}</span></span>
            <meta itemProp="position" content="3" />
          </li>
        </ol>
      </nav>

      <HeroSection
        heading={prettyKeyword.split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
        subheading={`Are you searching for "${kwMatch.keyword}"? As a local ${area.name} locksmith, I provide a fast, reliable, VAT-free service direct to your door.`}
        areaName={area.name}
      />

      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-[#0F1B2D] mb-6 capitalize">
            {kwMatch.keyword} in {area.name}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you&apos;re looking for a <strong>{kwMatch.keyword}</strong>, you need someone who knows the local area and can arrive quickly. Because I cover {area.name} and the {area.postcode} area extensively, my response time is typically {area.responseTime}.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Many websites advertising as a &quot;{kwMatch.keyword}&quot; are actually national call centres. They charge VAT, add hidden call-out fees, and sub-contract the work. I am an independent locksmith based locally to {area.name}.
          </p>

          <div className="text-center my-8">
            <a
              href={`tel:${SITE_CONFIG.phoneTel}`}
              className="inline-flex flex-col items-center bg-[#FFB800] hover:bg-[#FFC933] text-[#0F1B2D] px-8 py-4 rounded-xl font-black text-xl transition-colors shadow"
            >
              <span className="text-sm font-bold uppercase tracking-widest text-[#0F1B2D]/70">Call Direct</span>
              <span className="text-2xl">{SITE_CONFIG.phone}</span>
            </a>
          </div>
          
          {area.housingStock && (
            <div className="bg-[#F7F7F5] p-6 rounded-xl">
              <h3 className="font-bold text-lg mb-2">Local Locks in {area.name}</h3>
              <p className="text-sm text-gray-700">{area.housingStock}</p>
            </div>
          )}
        </div>
      </section>

      <FAQSection
        faqs={area.faqs}
        heading={`FAQs for ${area.name}`}
      />

      <CTABlock
        heading={`Looking for ${kwMatch.keyword}?`}
        subtext={`Call me now. Available 24/7 in ${area.name}.`}
      />
    </>
  )
}
