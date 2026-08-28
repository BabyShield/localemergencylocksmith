import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAreaBySlug, getAreaNeighbours } from '@/data/areas'
import { SERVICES, getServiceBySlug } from '@/data/services'
import { SITE_CONFIG } from '@/data/config'
import { getTownService, TOWN_SERVICE_PARAMS } from '@/data/town-services'
import { getBlogPostBySlug } from '@/data/blog-posts'
import { SERVICE_GUIDE_SLUGS } from '@/data/blog-seo'
import HeroSection from '@/components/HeroSection'
import CTABlock from '@/components/CTABlock'
import FAQSection from '@/components/FAQSection'
import SchemaMarkup from '@/components/SchemaMarkup'

export const dynamic = 'force-static'
export const revalidate = false

// Only the 7 towns with hand-written town×service content get pages here —
// every other area×service combination 301s to its parent area page via
// next.config.ts. Do not widen this without writing real content first.
export async function generateStaticParams() {
  return TOWN_SERVICE_PARAMS
}

interface Props {
  params: Promise<{ slug: string; serviceSlug: string }>
}

const SERVICE_SEARCH_INTENT_COPY: Record<string, {
  heading: (areaName: string) => string
  body: (areaName: string) => string
}> = {
  'emergency-lockout': {
    heading: (areaName) => `Locked Out of Your House in ${areaName}?`,
    body: (areaName) => `This emergency lockout service covers calls in ${areaName} when you are locked out of the house, have lost your keys, or need a 24-hour emergency locksmith.`,
  },
  'lock-change': {
    heading: (areaName) => `Door Lock Repair & Replacement in ${areaName}`,
    body: (areaName) => `This service covers door lock repair, broken front-door locks, lock replacement, cylinder replacement, Yale nightlatches, and planned lock changes in ${areaName}. Security-standard upgrades have their own dedicated service page.`,
  },
  'upvc-lock-repair': {
    heading: (areaName) => `uPVC Door Lock Repair & Replacement in ${areaName}`,
    body: (areaName) => `This service covers uPVC door lock repair, uPVC door lock replacement, failed lock mechanisms, multipoint locks, window locks, and composite door locks in ${areaName}.`,
  },
  'boarding-up': {
    heading: (areaName) => `Boarding Up & Burglary Repairs in ${areaName}`,
    body: (areaName) => `This service covers emergency boarding up and immediate burglary repairs for damaged doors, locks, and windows in ${areaName}, including break-in damage, storm damage, and accidental breakage.`,
  },
  'lock-upgrade': {
    heading: (areaName) => `Anti-Snap & BS3621 Locks in ${areaName}`,
    body: (areaName) => `This service covers anti-snap door locks, anti-snap euro cylinders, BS3621 locks, and targeted lock upgrades in ${areaName}.`,
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, serviceSlug } = await params
  const content = getTownService(slug, serviceSlug)
  const area = getAreaBySlug(slug)
  const service = getServiceBySlug(serviceSlug)
  if (!content || !area || !service) return {}

  const intentTitle = serviceSlug === 'lock-change'
    ? `Lock Repair & Replacement in ${area.name} | From £${service.priceFrom}`
    : serviceSlug === 'boarding-up'
      ? `Boarding & Burglary Repairs ${area.name} | From £${service.priceFrom}`
      : content.metaTitle
  const intentDescription = serviceSlug === 'lock-change'
    ? `Door lock repair, replacement and planned lock changes in ${area.name}. From £${service.priceFrom}, with no VAT or call-out fee. ${area.responseTime} response.`
    : serviceSlug === 'boarding-up'
      ? `Emergency boarding up and immediate burglary repairs in ${area.name} for damaged doors, locks and windows. From £${service.priceFrom}, no VAT or call-out fee.`
      : content.metaDescription

  return {
    title: intentTitle,
    description: intentDescription,
    alternates: {
      canonical: `${SITE_CONFIG.domain}/areas/${slug}/${serviceSlug}`,
    },
    openGraph: {
      type: 'website',
      title: intentTitle,
      description: intentDescription,
      url: `${SITE_CONFIG.domain}/areas/${slug}/${serviceSlug}`,
      images: [
        {
          url: `${SITE_CONFIG.domain}/api/og?title=${encodeURIComponent(intentTitle)}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}

export default async function TownServicePage({ params }: Props) {
  const { slug, serviceSlug } = await params
  const content = getTownService(slug, serviceSlug)
  const area = getAreaBySlug(slug)
  const service = getServiceBySlug(serviceSlug)
  if (!content || !area || !service) notFound()

  const neighbours = getAreaNeighbours(area)
  const otherServices = SERVICES.filter((s) => s.slug !== serviceSlug)
  const searchIntentCopy = SERVICE_SEARCH_INTENT_COPY[serviceSlug]
  const pageHeading = serviceSlug === 'lock-change'
    ? `Door Lock Repair & Replacement in ${area.name}`
    : serviceSlug === 'boarding-up'
      ? `Emergency Boarding Up & Burglary Repairs in ${area.name}`
      : content.h1
  const guidePosts = (SERVICE_GUIDE_SLUGS[serviceSlug] ?? [])
    .map((guideSlug) => getBlogPostBySlug(guideSlug))
    .filter((post): post is NonNullable<typeof post> => post != null)

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

  // Service in this town, provided by the single canonical business entity
  // defined in layout.tsx — no rating markup, no entity redefinition.
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.shortName,
    name: pageHeading,
    url: `${SITE_CONFIG.domain}/areas/${slug}/${serviceSlug}`,
    description: serviceSlug === 'lock-change'
      ? `Door lock repair, replacement and planned lock changes in ${area.name}.`
      : serviceSlug === 'boarding-up'
        ? `Emergency boarding up and immediate burglary repairs in ${area.name}.`
        : content.metaDescription,
    provider: { '@id': `${SITE_CONFIG.domain}/#business` },
    areaServed: {
      '@type': 'Place',
      name: area.name,
      address: {
        '@type': 'PostalAddress',
        postalCode: area.postcode,
        addressRegion: area.region,
        addressCountry: 'GB',
      },
    },
    offers: {
      '@type': 'Offer',
      price: String(service.priceFrom),
      priceCurrency: 'GBP',
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: String(service.priceFrom),
        priceCurrency: 'GBP',
        valueAddedTaxIncluded: false,
      },
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} />
      <SchemaMarkup schema={serviceSchema} />
      <SchemaMarkup schema={faqSchema} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 py-3 text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-0" itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <Link href="/" itemProp="item" className="hover:text-[#FFB800]"><span itemProp="name">Home</span></Link>
            <meta itemProp="position" content="1" />
          </li>
          <span className="mx-2" aria-hidden="true">›</span>
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <Link href="/areas" itemProp="item" className="hover:text-[#FFB800]"><span itemProp="name">Areas</span></Link>
            <meta itemProp="position" content="2" />
          </li>
          <span className="mx-2" aria-hidden="true">›</span>
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <Link href={`/areas/${slug}`} itemProp="item" className="hover:text-[#FFB800]"><span itemProp="name">{area.name}</span></Link>
            <meta itemProp="position" content="3" />
          </li>
          <span className="mx-2" aria-hidden="true">›</span>
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <span><span itemProp="name" className="text-gray-800 font-medium">{service.shortName}</span></span>
            <meta itemProp="position" content="4" />
          </li>
        </ol>
      </nav>

      <HeroSection
        heading={pageHeading}
        subheading={`${service.description} ${area.responseTime} response in ${area.name}. No VAT, no call-out fee.`}
        areaName={area.name}
        responseTime={area.responseTime}
        compact
      />

      {/* Intro */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          {content.intro.map((para) => (
            <p key={para.slice(0, 40)} className="text-gray-700 leading-relaxed mb-4">
              {para}
            </p>
          ))}

          {searchIntentCopy && (
            <div className="my-8 rounded-xl border border-[#FFB800]/40 bg-[#FFF9E8] p-6">
              <h2 className="text-xl font-black text-[#0F1B2D] mb-3">
                {searchIntentCopy.heading(area.name)}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {searchIntentCopy.body(area.name)}
              </p>
            </div>
          )}

          {/* Quick info boxes */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8">
            {[
              { label: 'Response Time', value: area.responseTime },
              { label: service.shortName, value: `From £${service.priceFrom}` },
              { label: 'VAT', value: 'None' },
              { label: 'Call-Out Fee', value: 'None' },
            ].map((item) => (
              <div key={item.label} className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{item.label}</p>
                <p className="font-black text-[#FFB800] text-lg">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href={`tel:${SITE_CONFIG.phoneTel}`}
              className="inline-flex flex-col items-center bg-[#FFB800] hover:bg-[#FFC933] text-[#0F1B2D] px-8 py-4 rounded-xl font-black text-xl transition-colors shadow"
            >
              <span className="text-sm font-bold uppercase tracking-widest text-[#0F1B2D]/70">Call Now — Free Quote</span>
              <span className="text-2xl">{SITE_CONFIG.phone}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Local angle */}
      <section className="py-12 px-4 bg-[#F7F7F5]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-[#0F1B2D] mb-4">{content.localAngleHeading}</h2>
          <p className="text-gray-700 leading-relaxed">{content.localAngleBody}</p>
        </div>
      </section>

      {/* Common jobs */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-[#0F1B2D] mb-6">
            {service.shortName} Jobs I Attend in {area.name}
          </h2>
          <ul className="space-y-4">
            {content.commonJobs.map((job) => (
              <li key={job.slice(0, 40)} className="flex gap-3 items-start">
                <span className="text-[#FFB800] font-bold flex-shrink-0 mt-0.5">✓</span>
                <span className="text-gray-700">{job}</span>
              </li>
            ))}
          </ul>
          <p className="text-gray-600 text-sm mt-6">{content.priceNote}</p>
        </div>
      </section>

      {/* Service-specific guides strengthen the topic path on every hand-written town page. */}
      {guidePosts.length > 0 && (
        <section className="py-10 px-4 bg-[#F7F7F5]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-black text-[#0F1B2D] mb-2">
              Guides for {service.shortName}
            </h2>
            <p className="text-gray-600 text-sm mb-5">
              Practical advice related to this service before you book in {area.name}.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {guidePosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="bg-white border border-gray-200 hover:border-[#FFB800] rounded-xl p-4 transition-colors group"
                >
                  <p className="font-bold text-[#0F1B2D] text-sm leading-snug group-hover:text-[#8A5A00]">
                    {post.title}
                  </p>
                  <p className="text-xs text-gray-600 mt-2">{post.readTime}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <FAQSection
        faqs={content.faqs}
        heading={`${service.shortName} in ${area.name} — Your Questions`}
      />

      {/* Other services in this town */}
      <section className="py-10 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-black text-[#0F1B2D] mb-5">
            Other Locksmith Services in {area.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/areas/${slug}/${s.slug}`}
                className="bg-[#F7F7F5] hover:bg-white border border-gray-100 hover:border-[#FFB800]/50 rounded-xl p-4 transition-all hover:shadow-sm group"
              >
                <p className="font-bold text-[#0F1B2D] text-sm group-hover:text-[#FFB800] transition-colors">
                  {s.shortName} in {area.name}
                </p>
                <p className="text-xs text-gray-500 mt-1">From £{s.priceFrom} — no VAT</p>
              </Link>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link href={`/areas/${slug}`} className="text-[#0F1B2D] font-bold hover:text-[#FFB800] transition-colors">
              &larr; Locksmith {area.name}
            </Link>
            <Link href={`/services/${serviceSlug}`} className="text-[#0F1B2D] font-bold hover:text-[#FFB800] transition-colors">
              {service.shortName} across Coventry &amp; Warwickshire &rarr;
            </Link>
          </div>
          {neighbours.length > 0 && (
            <p className="text-sm text-gray-500 mt-4">
              Nearby:{' '}
              {neighbours.slice(0, 4).map((n, i) => (
                <span key={n.slug}>
                  {i > 0 && ' · '}
                  <Link href={`/areas/${n.slug}`} className="underline hover:text-[#0F1B2D]">
                    Locksmith {n.name}
                  </Link>
                </span>
              ))}
            </p>
          )}
        </div>
      </section>

      <CTABlock
        heading={`Need ${service.shortName.toLowerCase()} in ${area.name}?`}
        subtext={`Available 24/7 — ${area.responseTime} response for ${area.name}. From £${service.priceFrom}, no VAT, no call-out fee.`}
      />
    </>
  )
}
