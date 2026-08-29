import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_CONFIG } from '@/data/config'
import { getAllAreasByRegion } from '@/data/areas'
import CTABlock from '@/components/CTABlock'
import SchemaMarkup from '@/components/SchemaMarkup'

export const metadata: Metadata = {
  title: 'Locksmith Areas | Coventry & Warwickshire',
  description:
    'Browse 78 locksmith area guides across Coventry and Warwickshire, with outward codes, services, source-reviewed guidance and a live ETA by phone.',
  keywords: 'locksmith coventry areas, locksmith warwickshire, locksmith near me, emergency locksmith coventry, locksmith nuneaton, locksmith rugby, locksmith leamington spa',
  alternates: {
    canonical: `${SITE_CONFIG.domain}/areas`,
  },
  openGraph: {
    type: 'website',
    siteName: 'Local Emergency Locksmith',
    locale: 'en_GB',
    title: 'Locksmith Areas | Coventry & Warwickshire',
    description: 'Local locksmith covering 78 towns and villages across Coventry and Warwickshire. Emergency 24/7.',
    url: `${SITE_CONFIG.domain}/areas`,
    images: [{ url: `${SITE_CONFIG.domain}/api/og?title=${encodeURIComponent('Locksmith Areas — Coventry & Warwickshire')}`, width: 1200, height: 630 }],
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
  const allAreas = Object.values(areasByRegion).flat()
  const areaListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Locksmith area guides across Coventry and Warwickshire',
    numberOfItems: allAreas.length,
    itemListElement: allAreas.map((area, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `Locksmith ${area.name}`,
      url: `${SITE_CONFIG.domain}/areas/${area.slug}`,
    })),
  }

  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} />
      <SchemaMarkup schema={areaListSchema} />

      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 py-3 text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-0" itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <Link href="/" prefetch={false} itemProp="item" className="hover:text-[#FFB800]"><span itemProp="name">Home</span></Link>
            <meta itemProp="position" content="1" />
          </li>
          <li className="mx-2" aria-hidden="true" role="presentation">›</li>
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <span><span itemProp="name" className="text-gray-800 font-medium">All Areas</span></span>
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
            I cover the 78 listed towns, villages, and suburbs across Coventry and Warwickshire.
            Each area has a source-reviewed local guide. Call with the full postcode for the
            current ETA; no VAT or separate call-out fee.
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
                    prefetch={false}
                    className="block bg-gray-50 hover:bg-white border border-gray-200 hover:border-[#FFB800] rounded-xl p-4 transition-all group"
                  >
                    <p className="font-bold text-gray-900 group-hover:text-[#FFB800]">
                      Locksmith {area.name}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{area.postcode}</p>
                    <p className="text-xs text-[#8A5A00] mt-1">Source-reviewed local guide</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTABlock subtext="Available 24/7. Call with the full postcode for the current ETA and agreed price basis. No VAT or separate call-out fee." />
    </>
  )
}
