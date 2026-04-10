import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_CONFIG } from '@/data/config'
import { SERVICES } from '@/data/services'
import ServiceCard from '@/components/ServiceCard'
import CTABlock from '@/components/CTABlock'
import SchemaMarkup from '@/components/SchemaMarkup'

export const metadata: Metadata = {
  title: 'Locksmith Services Coventry | Emergency, Lock Change, uPVC | No VAT',
  description:
    'Full range of locksmith services in Coventry and Warwickshire. Emergency lockout, lock change, uPVC repair, boarding up, security upgrades. No VAT, no call-out fee.',
  keywords: 'locksmith services coventry, emergency locksmith coventry, lock change coventry, upvc lock repair coventry, boarding up coventry, lock upgrade warwickshire, locksmith services warwickshire',
  alternates: { canonical: `${SITE_CONFIG.domain}/services` },
  openGraph: {
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
  serviceType: 'Locksmith',
  provider: { '@type': 'LocalBusiness', '@id': `${SITE_CONFIG.domain}/#business` },
  areaServed: { '@type': 'Place', name: 'Coventry and Warwickshire' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Locksmith Services',
    itemListElement: SERVICES.map((s) => ({
      '@type': 'Offer',
      name: s.name,
      description: s.description,
      price: String(s.priceFrom),
      priceCurrency: 'GBP',
      availability: 'https://schema.org/InStock',
      url: `${SITE_CONFIG.domain}/services/${s.slug}`,
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: String(s.priceFrom),
        priceCurrency: 'GBP',
        valueAddedTaxIncluded: false,
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
            <Link href="/" itemProp="item" className="hover:text-[#FFB800]"><span itemProp="name">Home</span></Link>
            <meta itemProp="position" content="1" />
          </li>
          <span className="mx-2" aria-hidden="true">›</span>
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <span itemProp="item"><span itemProp="name" className="text-gray-800 font-medium">Services</span></span>
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

      <CTABlock />
    </>
  )
}
