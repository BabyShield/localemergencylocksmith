import { Metadata } from 'next'
import Link from 'next/link'
import { AREAS } from '@/data/areas'
import { SITE_CONFIG } from '@/data/config'
import SchemaMarkup from '@/components/SchemaMarkup'
import fs from 'fs'
import path from 'path'

export const metadata: Metadata = {
  title: 'Locksmith Near Me | Find a Local Locksmith in Coventry & Warwickshire',
  description: 'Find a fast, local locksmith in your specific area. No VAT, no call-out fee. Covering all of Coventry and Warwickshire — 90+ locations.',
  keywords: 'locksmith near me, locksmith near me coventry, emergency locksmith near me, local locksmith warwickshire, 24 hour locksmith near me, find locksmith coventry',
  alternates: {
    canonical: `${SITE_CONFIG.domain}/near-me`,
  },
  openGraph: {
    title: 'Locksmith Near Me | Find a Local Locksmith',
    description: 'Find a fast, local locksmith in your specific area. No VAT, no call-out fee. 90+ locations covered.',
    url: `${SITE_CONFIG.domain}/near-me`,
    images: [{ url: `${SITE_CONFIG.domain}/api/og?title=${encodeURIComponent('Locksmith Services Near You')}`, width: 1200, height: 630 }],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_CONFIG.domain },
    { '@type': 'ListItem', position: 2, name: 'Near Me', item: `${SITE_CONFIG.domain}/near-me` },
  ],
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

export default function NearMeIndex() {
  const keywords = getKeywords()

  return (
    <div className="bg-white min-h-screen">
      <SchemaMarkup schema={breadcrumbSchema} />

      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 py-3 text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-0" itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <Link href="/" itemProp="item" className="hover:text-[#FFB800]"><span itemProp="name">Home</span></Link>
            <meta itemProp="position" content="1" />
          </li>
          <span className="mx-2" aria-hidden="true">›</span>
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <span itemProp="item"><span itemProp="name" className="text-gray-800 font-medium">Near Me</span></span>
            <meta itemProp="position" content="2" />
          </li>
        </ol>
      </nav>

      <div className="bg-[#0F1B2D] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Locksmith Services Near You
          </h1>
          <p className="text-xl text-gray-300">
            Browse my hyper-local directory to find fast emergency response in your specific area.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="space-y-16">
          {keywords.map((kw: any) => (
            <div key={kw.slug} className="bg-[#F7F7F5] rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-black text-[#0F1B2D] mb-4 capitalize border-b border-gray-200 pb-2">
                {kw.keyword}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-4">
                {AREAS.map(area => (
                  <Link 
                    key={area.slug} 
                    href={`/near-me/${kw.slug}/${area.slug}`}
                    className="text-sm text-gray-600 hover:text-[#FFB800] hover:underline"
                  >
                    in {area.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
