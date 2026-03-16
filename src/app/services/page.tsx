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
  alternates: { canonical: `${SITE_CONFIG.domain}/services` },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_CONFIG.domain },
    { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_CONFIG.domain}/services` },
  ],
}

export default function ServicesPage() {
  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} />

      <nav className="max-w-6xl mx-auto px-4 py-3 text-sm text-gray-500">
        <Link href="/" className="hover:text-green-700">Home</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-800 font-medium">Services</span>
      </nav>

      <section className="py-12 px-4 text-white" style={{ background: 'linear-gradient(135deg, #1B5E20, #2E7D32)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-black mb-4">
            Locksmith Services — Coventry & Warwickshire
          </h1>
          <p className="text-green-100 text-lg mb-6 max-w-2xl mx-auto">
            Emergency and planned locksmith services available 24/7. No VAT, no call-out fee.
          </p>
          <a
            href={`tel:${SITE_CONFIG.phoneTel}`}
            className="inline-flex flex-col items-center bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-black text-xl transition-colors shadow"
          >
            <span className="text-sm font-bold uppercase tracking-widest text-orange-100">Call Now — Free Quote</span>
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
