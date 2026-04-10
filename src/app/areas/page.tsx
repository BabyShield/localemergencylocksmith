import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_CONFIG } from '@/data/config'
import { getAllAreasByRegion } from '@/data/areas'
import CTABlock from '@/components/CTABlock'
import SchemaMarkup from '@/components/SchemaMarkup'

export const metadata: Metadata = {
  title: 'Locksmith Areas Covered | Coventry & Warwickshire | 90+ Locations',
  description:
    'Local locksmith covering Coventry, Nuneaton, Rugby, Leamington Spa, Warwick, Stratford-upon-Avon and 90+ surrounding areas. Emergency 24/7, no VAT, no call-out fee.',
  keywords: 'locksmith coventry areas, locksmith warwickshire, locksmith near me, emergency locksmith coventry, locksmith nuneaton, locksmith rugby, locksmith leamington spa',
  alternates: {
    canonical: `${SITE_CONFIG.domain}/areas`,
  },
  openGraph: {
    title: 'Locksmith Areas Covered | Coventry & Warwickshire | 90+ Locations',
    description: 'Local locksmith covering 90+ towns and villages across Coventry and Warwickshire. Emergency 24/7.',
    url: `${SITE_CONFIG.domain}/areas`,
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_CONFIG.domain },
    { '@type': 'ListItem', position: 2, name: 'Areas', item: `${SITE_CONFIG.domain}/areas` },
  ],
}

export default function AreasPage() {
  const areasByRegion = getAllAreasByRegion()

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
            <span itemProp="item"><span itemProp="name" className="text-gray-800 font-medium">All Areas</span></span>
            <meta itemProp="position" content="2" />
          </li>
        </ol>
      </nav>

      <section className="py-12 px-4 text-white" style={{ background: '#0F1B2D' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-black mb-4">
            Emergency Locksmith — All Areas Covered
          </h1>
          <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
            I cover Coventry and the whole of Warwickshire — over 90 towns, villages, and suburbs.
            No VAT, no call-out fee, 15-30 minute response for most areas.
          </p>
          <a
            href={`tel:${SITE_CONFIG.phoneTel}`}
            className="inline-flex flex-col items-center bg-[#FFB800] hover:bg-[#FFC933] text-[#0F1B2D] px-8 py-4 rounded-xl font-black text-xl transition-colors shadow"
          >
            <span className="text-sm font-bold uppercase tracking-widest text-[#0F1B2D]/70">Call Now — Free Quote</span>
            <span className="text-2xl">{SITE_CONFIG.phone}</span>
          </a>
        </div>
      </section>

      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto space-y-10">
          {Object.entries(areasByRegion).map(([region, areas]) => (
            <div key={region}>
              <h2 className="text-2xl font-black text-gray-900 mb-4 pb-2 border-b-2 border-[#0F1B2D]">
                {region}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {areas.map((area) => (
                  <Link
                    key={area.slug}
                    href={`/areas/${area.slug}`}
                    className="block bg-gray-50 hover:bg-white border border-gray-200 hover:border-[#FFB800] rounded-xl p-4 transition-all group"
                  >
                    <p className="font-bold text-gray-900 group-hover:text-[#FFB800]">
                      Locksmith {area.name}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{area.postcode}</p>
                    <p className="text-xs text-[#FFB800] mt-1">{area.responseTime}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTABlock />
    </>
  )
}
