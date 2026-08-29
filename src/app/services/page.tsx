import type { Metadata } from 'next'
import Link from 'next/link'
import { SERVICE_PROVIDER_SCHEMA, SITE_CONFIG } from '@/data/config'
import { SERVICES } from '@/data/services'
import { TOWN_SLUGS } from '@/data/governed-town-services'
import ServiceCard from '@/components/ServiceCard'
import CTABlock from '@/components/CTABlock'
import SchemaMarkup from '@/components/SchemaMarkup'

export const metadata: Metadata = {
  title: 'Locksmith Services Coventry | 24/7 | From £59',
  description:
    'Coventry locksmith services: emergency lockouts, lock changes, uPVC repairs, boarding up and security upgrades. From £59, with no VAT or call-out fee.',
  keywords: 'locksmith services coventry, emergency locksmith coventry, lock change coventry, upvc lock repair coventry, boarding up coventry, lock upgrade warwickshire, locksmith services warwickshire',
  alternates: { canonical: `${SITE_CONFIG.domain}/services` },
  openGraph: {
    type: 'website',
    siteName: 'Local Emergency Locksmith',
    locale: 'en_GB',
    title: 'Locksmith Services — Coventry & Warwickshire',
    description: 'Emergency lockout, lock change, uPVC repair, boarding up, security upgrades. No VAT, no call-out fee.',
    url: `${SITE_CONFIG.domain}/services`,
    images: [{ url: `${SITE_CONFIG.domain}/api/og?title=${encodeURIComponent('Locksmith Services — Coventry & Warwickshire')}`, width: 1200, height: 630 }],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_CONFIG.domain },
    { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_CONFIG.domain}/services` },
  ],
}

const servicesCatalogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_CONFIG.domain}/services#service-catalogue`,
  url: `${SITE_CONFIG.domain}/services`,
  name: 'Locksmith Services in Coventry and Warwickshire',
  serviceType: 'Locksmith',
  provider: SERVICE_PROVIDER_SCHEMA,
  areaServed: { '@type': 'Place', name: 'Coventry and Warwickshire' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Locksmith Services',
    itemListElement: SERVICES.map((s) => ({
      '@type': 'Offer',
      name: s.name,
      description: s.description,
      url: `${SITE_CONFIG.domain}/services/${s.slug}`,
      priceSpecification: {
        '@type': 'PriceSpecification',
        minPrice: String(s.priceFrom),
        priceCurrency: 'GBP',
        valueAddedTaxIncluded: false,
        description: 'Advertised starting price; the final price depends on the diagnosed scope and agreed parts.',
      },
    })),
  },
}

export default function ServicesPage() {
  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} />
      <SchemaMarkup schema={servicesCatalogSchema} />

      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 py-3 text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-0" itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <Link href="/" prefetch={false} itemProp="item" className="hover:text-[#FFB800]"><span itemProp="name">Home</span></Link>
            <meta itemProp="position" content="1" />
          </li>
          <li className="mx-2" aria-hidden="true" role="presentation">›</li>
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <span><span itemProp="name" className="text-gray-800 font-medium">Services</span></span>
            <meta itemProp="position" content="2" />
          </li>
        </ol>
      </nav>

      <section className="py-12 px-4 text-white" style={{ background: '#0F1B2D' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-black mb-4">
            Locksmith Services — Coventry & Warwickshire
          </h1>
          <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
            Emergency and planned locksmith services available 24/7. No VAT, no call-out fee.
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
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-[#F7F7F5]" aria-labelledby="town-service-guides-heading">
        <div className="max-w-6xl mx-auto">
          <h2 id="town-service-guides-heading" className="text-2xl md:text-3xl font-black text-[#0F1B2D] mb-3 text-center">
            Service Guides for the Main Towns
          </h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-9">
            These seven town directories have a separate local page for each service. Other listed
            locations keep their five service guides together on one canonical area page.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {SERVICES.map((service) => (
              <section key={service.slug} className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="font-black text-[#0F1B2D] mb-4">{service.shortName}</h3>
                <ul className="space-y-2.5 text-sm">
                  {TOWN_SLUGS.map((town) => (
                    <li key={town.slug}>
                      <Link
                        href={`/areas/${town.slug}/${service.slug}`}
                        prefetch={false}
                        className="text-gray-700 underline decoration-[#FFB800] underline-offset-4 hover:text-[#8A5A00]"
                      >
                        {service.shortName} in {town.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>

      <CTABlock />
    </>
  )
}
