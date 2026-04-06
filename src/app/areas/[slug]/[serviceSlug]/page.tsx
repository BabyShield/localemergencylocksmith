import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { AREAS, getAreaBySlug, getAreaNeighbours } from '@/data/areas'
import { SERVICES, getServiceBySlug } from '@/data/services'
import { SITE_CONFIG } from '@/data/config'
import HeroSection from '@/components/HeroSection'
import CTABlock from '@/components/CTABlock'
import FAQSection from '@/components/FAQSection'
import SchemaMarkup from '@/components/SchemaMarkup'

// Use ISR instead of static generation for matrix to avoid build timeouts with too many combinations
// Wait, we can statically generate if it's 30 areas * 5 services = 150 pages. That's small.
export const dynamic = 'force-static'
export const revalidate = false

export async function generateStaticParams() {
  const params: { slug: string; serviceSlug: string }[] = []
  
  for (const area of AREAS) {
    for (const service of SERVICES) {
      params.push({
        slug: area.slug,
        serviceSlug: service.slug,
      })
    }
  }
  
  return params
}

interface Props {
  params: Promise<{ slug: string; serviceSlug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, serviceSlug } = await params
  const area = getAreaBySlug(slug)
  const service = getServiceBySlug(serviceSlug)
  
  if (!area || !service) return {}

  const title = `${service.shortName} in ${area.name} | 24/7 | No VAT | Call Now`
  const description = `Need a ${service.shortName.toLowerCase()} in ${area.name}? Local emergency locksmith, ${area.responseTime} response. No VAT, no call-out fee. Call ${SITE_CONFIG.phone} now.`

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_CONFIG.domain}/areas/${slug}/${serviceSlug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.domain}/areas/${slug}/${serviceSlug}`,
    },
  }
}

export default async function AreaServicePage({ params }: Props) {
  const { slug, serviceSlug } = await params
  const area = getAreaBySlug(slug)
  const service = getServiceBySlug(serviceSlug)
  
  if (!area || !service) notFound()

  const neighbours = getAreaNeighbours(area)

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_CONFIG.domain },
      { '@type': 'ListItem', position: 2, name: 'Areas', item: `${SITE_CONFIG.domain}/areas` },
      { '@type': 'ListItem', position: 3, name: area.name, item: `${SITE_CONFIG.domain}/areas/${slug}` },
      { '@type': 'ListItem', position: 4, name: service.shortName, item: `${SITE_CONFIG.domain}/areas/${slug}/${serviceSlug}` },
    ],
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.name} in ${area.name}`,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Local Emergency Locksmith',
      telephone: SITE_CONFIG.phoneTel,
    },
    areaServed: {
      '@type': 'Place',
      name: area.name,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Locksmith Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service.name,
          },
          priceCurrency: 'GBP',
          price: service.priceFrom,
        }
      ]
    }
  }

  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} />
      <SchemaMarkup schema={serviceSchema} />

      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 py-3 text-sm text-gray-500">
        <Link href="/" className="hover:text-[#FFB800]">Home</Link>
        <span className="mx-2">›</span>
        <Link href="/areas" className="hover:text-[#FFB800]">Areas</Link>
        <span className="mx-2">›</span>
        <Link href={`/areas/${slug}`} className="hover:text-[#FFB800]">{area.name}</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-800 font-medium">{service.shortName}</span>
      </nav>

      <HeroSection
        heading={`${service.shortName} in ${area.name}`}
        subheading={`${service.description} I can be with you in ${area.responseTime}. No VAT, no call-out fee.`}
        areaName={area.name}
      />

      {/* Intro */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-gray-900 mb-4">
            {service.name} for {area.name} Residents
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you need {service.shortName.toLowerCase()} in the {area.name} area, I can help.
            {area.uniqueContent}
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            I am a local, independent locksmith covering all of {area.postcode}. Because I don&apos;t charge VAT or a call-out fee, my {service.shortName.toLowerCase()} services are often 20% cheaper than the national companies. When you call, you speak directly to me, not a call centre.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8">
             <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Response</p>
                <p className="font-black text-[#FFB800] text-lg">{area.responseTime}</p>
             </div>
             <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Price</p>
                <p className="font-black text-[#FFB800] text-lg">From £{service.priceFrom}</p>
             </div>
             <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">VAT</p>
                <p className="font-black text-[#FFB800] text-lg">None</p>
             </div>
             <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Call-Out</p>
                <p className="font-black text-[#FFB800] text-lg">£0</p>
             </div>
          </div>

          <div className="text-center">
            <a
              href={`tel:${SITE_CONFIG.phoneTel}`}
              className="inline-flex flex-col items-center bg-[#FFB800] hover:bg-[#FFC933] text-[#0F1B2D] px-8 py-4 rounded-xl font-black text-xl transition-colors shadow"
            >
              <span className="text-sm font-bold uppercase tracking-widest text-[#0F1B2D]/70">Call For A Quote</span>
              <span className="text-2xl">{SITE_CONFIG.phone}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Area specifics */}
      <section className="py-10 px-4 bg-[#F7F7F5]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-[#0F1B2D] mb-4">
            Security & Locks found in {area.name}
          </h2>
          {area.housingStock && <p className="text-gray-700 leading-relaxed mb-4">{area.housingStock}</p>}
          {area.commonIssues && (
            <>
              <h3 className="text-lg font-bold text-[#0F1B2D] mt-6 mb-3">
                Common {service.shortName} Issues
              </h3>
              <p className="text-gray-700 leading-relaxed">{area.commonIssues}</p>
            </>
          )}
        </div>
      </section>

      {/* Postcodes */}
      <section className="py-8 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-black text-gray-900 mb-4">
            {service.shortName} in Your Local Postcode
          </h2>
          <p className="text-gray-700">
            Based near {area.name}? I cover {area.postcode} and surrounding areas for all {service.shortName.toLowerCase()} requirements.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="bg-[#0F1B2D] text-white px-3 py-1 rounded-full text-sm font-semibold">
              {area.postcode}
            </span>
            {neighbours.slice(0, 3).map((n) => (
              <span key={n.slug} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                {n.postcode}
              </span>
            ))}
          </div>
        </div>
      </section>

      <FAQSection
        faqs={area.faqs}
        heading={`Frequently Asked Questions`}
      />

      <CTABlock
        heading={`Need ${service.shortName} in ${area.name}?`}
        subtext={`Available 24/7 — ${area.responseTime} response for ${area.name}. No VAT, no call-out fee.`}
      />
    </>
  )
}
