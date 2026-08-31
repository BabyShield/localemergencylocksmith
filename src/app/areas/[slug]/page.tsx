import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, PoundSterling, CheckCircle, Lock, Clock, BookOpen } from 'lucide-react'
import { AREAS, getAreaBySlug, getAreaNeighbours } from '@/data/areas'
import { SERVICES } from '@/data/services'
import { LOCKSMITH_AUTHOR_SCHEMA, SERVICE_PROVIDER_SCHEMA, SITE_CONFIG } from '@/data/config'
import { getAreaGuide } from '@/data/area-guides'
import type { ServiceAreaSlug } from '@/data/service-area-types'
import { getAreaAuthority } from '@/data/area-authorities'
import { getBlogPostBySlug } from '@/data/blog-posts'
import { SERVICE_GUIDE_SLUGS } from '@/data/blog-seo'
import { hasTownService } from '@/data/governed-town-services'
import HeroSection from '@/components/HeroSection'
import CTABlock from '@/components/CTABlock'
import FAQSection from '@/components/FAQSection'
import SchemaMarkup from '@/components/SchemaMarkup'
import ContentAuthorNote from '@/components/ContentAuthorNote'

export const dynamic = 'force-static'
export const revalidate = false

export async function generateStaticParams() {
  return AREAS.map(area => ({ slug: area.slug }))
}

interface Props {
  params: Promise<{ slug: string }>
}

function areaGuideOrThrow(slug: string) {
  const guide = getAreaGuide(slug)
  if (!guide) throw new Error(`Missing governed area guide for ${slug}`)
  return guide
}

function firstSentence(value: string): string {
  return value.match(/^[\s\S]*?[.!?](?=\s|$)/)?.[0] ?? value
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const area = getAreaBySlug(slug)
  if (!area) return {}

  const guide = areaGuideOrThrow(slug)
  const hasDedicatedServicePages = hasTownService(area.slug, 'emergency-lockout')
  const title = hasDedicatedServicePages
    ? `Locksmith ${area.name} ${area.postcode} | 5 Services | From £59`
    : `Locksmith ${area.name} ${area.postcode} | 24/7 Help | From £59`
  const description = guide.searchDescription

  return {
    title,
    description,
    alternates: { canonical: `${SITE_CONFIG.domain}/areas/${slug}` },
    openGraph: {
      type: 'website',
      title,
      description,
      url: `${SITE_CONFIG.domain}/areas/${slug}`,
      images: [{
        url: `${SITE_CONFIG.domain}/api/og?title=${encodeURIComponent(`Locksmith in ${area.name}`)}`,
        width: 1200,
        height: 630,
      }],
    },
  }
}

export default async function AreaPage({ params }: Props) {
  const { slug } = await params
  const area = getAreaBySlug(slug)
  if (!area) notFound()

  const guide = areaGuideOrThrow(slug)
  const hasDedicatedServicePages = hasTownService(area.slug, 'emergency-lockout')
  const hasPairLinkedServiceEvidence = guide.serviceEvidenceMode !== 'hub-context-only'
  const neighbours = getAreaNeighbours(area)
  const areaAuthority = getAreaAuthority(area.slug)
  const pageSources = hasDedicatedServicePages
    ? guide.sources.filter(source => source.kind !== 'technical')
    : guide.sources
  const sourceById = new Map(pageSources.map(source => [source.id, source]))
  const serviceGuidance = SERVICES.map(service => {
    const primaryGuideSlug = SERVICE_GUIDE_SLUGS[service.slug]?.[0]
    const primaryGuide = primaryGuideSlug ? getBlogPostBySlug(primaryGuideSlug) : undefined
    if (!primaryGuide) throw new Error(`Missing primary ${service.slug} guide for ${area.slug}`)

    return {
      service,
      guidance: guide.serviceGuidance[service.slug as ServiceAreaSlug],
      primaryGuide,
      detailsHref: hasTownService(area.slug, service.slug)
        ? `/areas/${area.slug}/${service.slug}`
        : `/services/${service.slug}`,
      localOwnerHref: hasTownService(area.slug, service.slug)
        ? `/areas/${area.slug}/${service.slug}`
        : `/areas/${area.slug}#${service.slug}`,
    }
  })
  const allFaqs = hasDedicatedServicePages
    ? guide.faqs
    : [
        ...guide.faqs,
        ...serviceGuidance.map(({ guidance }) => guidance.faq),
      ]

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_CONFIG.domain },
      { '@type': 'ListItem', position: 2, name: 'Areas', item: `${SITE_CONFIG.domain}/areas` },
      { '@type': 'ListItem', position: 3, name: area.name, item: `${SITE_CONFIG.domain}/areas/${slug}` },
    ],
  }

  const areaSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_CONFIG.domain}/areas/${slug}#service`,
    serviceType: 'Locksmith services',
    name: `Locksmith services in ${area.name}`,
    url: `${SITE_CONFIG.domain}/areas/${slug}`,
    description: `Lockout help, lock repair and replacement, uPVC lock repair, boarding up and lock upgrades in ${area.name}. Call to confirm the current ETA and price basis.`,
    provider: SERVICE_PROVIDER_SCHEMA,
    areaServed: {
      '@type': 'Place',
      name: area.name,
      address: {
        '@type': 'PostalAddress',
        postalCode: area.postcode,
        addressRegion: areaAuthority.addressRegion,
        addressCountry: 'GB',
      },
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Locksmith services in ${area.name}`,
      itemListElement: serviceGuidance.map(({ service, guidance, localOwnerHref }) => ({
        '@type': 'Offer',
        name: `${service.shortName} in ${area.name}`,
        description: hasDedicatedServicePages ? service.description : guidance.body[0],
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: String(service.priceFrom),
          priceCurrency: 'GBP',
          valueAddedTaxIncluded: false,
          description: 'Advertised starting price; the final price depends on the diagnosed scope and agreed parts.',
        },
        url: `${SITE_CONFIG.domain}${localOwnerHref}`,
      })),
    },
  }

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_CONFIG.domain}/areas/${slug}#webpage`,
    url: `${SITE_CONFIG.domain}/areas/${slug}`,
    name: `Locksmith services in ${area.name}`,
    description: guide.searchDescription,
    dateModified: guide.reviewedOn,
    author: LOCKSMITH_AUTHOR_SCHEMA,
    publisher: { '@id': `${SITE_CONFIG.domain}/#business` },
    mainEntity: { '@id': `${SITE_CONFIG.domain}/areas/${slug}#service` },
    citation: pageSources.map(source => source.url),
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} />
      <SchemaMarkup schema={areaSchema} />
      <SchemaMarkup schema={webPageSchema} />
      <SchemaMarkup schema={faqSchema} />

      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 py-3 text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-0">
          <li>
            <Link href="/" prefetch={false} className="hover:text-[#FFB800]"><span>Home</span></Link>
          </li>
          <li className="mx-2" aria-hidden="true" role="presentation">›</li>
          <li>
            <Link href="/areas" prefetch={false} className="hover:text-[#FFB800]"><span>Areas</span></Link>
          </li>
          <li className="mx-2" aria-hidden="true" role="presentation">›</li>
          <li>
            <span className="text-gray-800 font-medium">{area.name}</span>
          </li>
        </ol>
      </nav>

      <HeroSection
        heading={hasDedicatedServicePages
          ? `Locksmith Services in ${area.name}`
          : `Locksmith Services in ${area.name} — Emergency & Planned Help`}
        subheading={`Locked out or dealing with a faulty or damaged lock in ${area.name}? Call for the current ETA, scope and price before attendance. No VAT or separate call-out fee.`}
        areaName={area.name}
        showResponseTime={false}
      />

      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-bold uppercase tracking-wider text-[#8A5A00] mb-3">Practical local booking guide</p>
          <h2 className="text-2xl font-black text-gray-900 mb-5">Local Locksmith Guidance for {area.name}</h2>
          {guide.summary.map(paragraph => (
            <p key={paragraph.slice(0, 64)} className="text-gray-700 leading-relaxed mb-4">{paragraph}</p>
          ))}
          <div className="rounded-xl border border-[#FFB800]/40 bg-[#FFF9E8] p-5 mt-6">
            <h3 className="font-black text-[#0F1B2D] mb-2">What to tell me when you call</h3>
            <p className="text-gray-700 leading-relaxed">{guide.accessGuidance}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8">
            {[
              { label: 'Current ETA', value: 'Confirmed by phone' },
              { label: 'Emergency Lockout', value: 'From £59' },
              { label: 'VAT', value: 'None' },
              { label: 'Call-Out Fee', value: 'None' },
            ].map(item => (
              <div key={item.label} className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{item.label}</p>
                <p className="font-black text-[#8A5A00] text-lg">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href={`tel:${SITE_CONFIG.phoneTel}`} className="inline-flex flex-col items-center bg-[#FFB800] hover:bg-[#FFC933] text-[#0F1B2D] px-8 py-4 rounded-xl font-black text-xl transition-colors shadow">
              <span className="text-sm font-bold uppercase tracking-widest text-[#0F1B2D]/70">Call Now — Free Quote</span>
              <span className="text-2xl">{SITE_CONFIG.phone}</span>
            </a>
          </div>
        </div>
      </section>

      <section className="py-10 px-4 bg-[#0F1B2D] text-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black mb-3">
            {hasDedicatedServicePages
              ? `Choose a Locksmith Service in ${area.name}`
              : `Five Locksmith Services in ${area.name}`}
          </h2>
          <p className="text-gray-200 leading-relaxed mb-6">
            {hasDedicatedServicePages
              ? `Each service below has its own ${area.name} guide, while this page remains the source-reviewed area overview.`
              : 'Use these five service sections to understand what to describe when you call, which checks can be made before booking, and what still depends on the exact entrance, authority and on-site inspection.'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {serviceGuidance.map(({ service, localOwnerHref }) => (
              hasDedicatedServicePages ? (
                <Link key={service.slug} href={localOwnerHref} prefetch={false} className="rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold hover:border-[#FFB800] hover:text-[#FFB800] transition-colors">
                  {service.shortName} in {area.name}
                </Link>
              ) : (
                <a key={service.slug} href={`#${service.slug}`} className="rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold hover:border-[#FFB800] hover:text-[#FFB800] transition-colors">
                  {service.shortName} in {area.name}
                </a>
              )
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-[#F7F7F5]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-[#0F1B2D] mb-6">What to Check Before Booking</h2>
          <ul className="space-y-4">
            {[
              { Icon: MapPin, text: `The full ${area.name} address is recorded before any source-specific check is applied; the ${area.postcode} outward code alone is not treated as a building description.` },
              { Icon: Lock, text: 'The door material, frame, lock markings and symptoms are inspected before a repair, replacement or upgrade is specified.' },
              { Icon: CheckCircle, text: 'Proof of a connection to the affected entrance is required, with separate authority checks for communal, rented or managed doors.' },
              { Icon: Clock, text: 'The current arrival estimate is confirmed by phone from the actual starting point and is not inferred from a static area page.' },
              { Icon: PoundSterling, text: 'The price basis, included labour, likely parts and any reason a price could change are explained before work proceeds.' },
              {
                Icon: BookOpen,
                text: hasDedicatedServicePages
                  ? `This area overview was reviewed on ${guide.reviewedOn} and links to the primary locality sources used; each dedicated service guide carries its own technical evidence.`
                  : `This guide was reviewed on ${guide.reviewedOn} and links to the primary locality and technical sources used.`,
              },
            ].map(item => (
              <li key={item.text} className="flex gap-3 items-start">
                <span className="flex-shrink-0 mt-0.5 flex items-center justify-center w-8 h-8 rounded-lg bg-[#0F1B2D]/5">
                  <item.Icon className="w-4.5 h-4.5 text-[#0F1B2D]" aria-hidden="true" />
                </span>
                <span className="text-gray-700">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-12 px-4 bg-white" aria-labelledby="local-evidence-heading">
        <div className="max-w-3xl mx-auto">
          <h2 id="local-evidence-heading" className="text-2xl font-black text-[#0F1B2D] mb-3">Local Access and Property Considerations for {area.name}</h2>
          <p className="text-gray-600 leading-relaxed mb-7">{guide.evidenceLimits}</p>
          <div className="space-y-5">
            {guide.facts.map((fact, index) => (
              <article
                key={fact.text}
                id={`local-fact-${index + 1}`}
                data-evidence-section={`local-fact-${index + 1}`}
                data-evidence-source-ids={fact.sourceIds.join(' ')}
                className="scroll-mt-28 rounded-xl border border-gray-200 p-5"
              >
                <h3 data-local-fact-heading="true" className="font-black text-[#0F1B2D] mb-2">{fact.heading}</h3>
                <p className="text-gray-700 leading-relaxed">{fact.text}</p>
                <p className="text-sm text-gray-600 mt-3"><strong>Why it matters here:</strong> {fact.serviceRelevance}</p>
                <p className="text-xs text-gray-500 mt-3">
                  Source{fact.sourceIds.length > 1 ? 's' : ''}:{' '}
                  {fact.sourceIds.map((sourceId, sourceIndex) => {
                    const source = sourceById.get(sourceId)
                    return source ? (
                      <span key={sourceId}>
                        {sourceIndex > 0 && ' · '}
                        <a href={`#evidence-source-${source.id}`} className="underline decoration-[#FFB800] underline-offset-2 hover:text-[#8A5A00]">
                          {source.publisher}: {source.title}
                        </a>
                      </span>
                    ) : null
                  })}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {hasDedicatedServicePages ? (
        <section className="py-12 px-4 bg-[#F7F7F5]" aria-labelledby="service-guidance-heading">
          <div className="max-w-4xl mx-auto">
            <h2 id="service-guidance-heading" className="text-2xl md:text-3xl font-black text-[#0F1B2D] mb-3 text-center">Emergency, Lock Repair and Door Security Guides for {area.name}</h2>
            <p className="text-gray-600 text-center max-w-3xl mx-auto mb-10">
              Choose the guide for an emergency lockout, lock repair or replacement, uPVC or
              multipoint fault, damaged-opening boarding, or a measured security upgrade. Each
              page keeps its diagnosis, booking checks and service-specific evidence together.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5" data-dedicated-service-owner-links="true">
              {serviceGuidance.map(({ service, guidance, localOwnerHref }) => (
                <article
                  key={service.slug}
                  data-dedicated-service-owner={service.slug}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-[#8A5A00] mb-2">From £{service.priceFrom} · no VAT</p>
                  <h3 className="text-xl font-black text-[#0F1B2D]">{service.shortName} in {area.name}</h3>
                  <p className="text-gray-700 leading-relaxed mt-3" data-owner-summary="true">
                    <strong>{guidance.heading}.</strong> {service.description}
                  </p>
                  <p className="text-sm text-gray-600 mt-4" data-owner-first-check="true">
                    <strong>Guide preview:</strong> {guidance.checks.join(' · ')}
                  </p>
                  <p className="text-sm text-gray-700 mt-4" data-owner-decision-preview="true">
                    <strong>Decision context:</strong> {firstSentence(guidance.body[0])}
                  </p>
                  <Link href={localOwnerHref} prefetch={false} className="inline-flex mt-5 text-sm font-bold text-[#0F1B2D] underline decoration-[#FFB800] underline-offset-4 hover:text-[#8A5A00]">
                    Read the complete {service.shortName} guide for {area.name}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="py-12 px-4 bg-[#F7F7F5]" aria-labelledby="service-guidance-heading">
          <div className="max-w-4xl mx-auto">
            <h2 id="service-guidance-heading" className="text-2xl md:text-3xl font-black text-[#0F1B2D] mb-3 text-center">Emergency, Lock Repair and Door Security Guidance for {area.name}</h2>
            <p className="text-gray-600 text-center max-w-3xl mx-auto mb-10">
              {hasPairLinkedServiceEvidence
                ? 'Five practical guides cover emergency lockouts, lock repair or replacement, uPVC and multipoint faults, temporary boarding, and measured security upgrades. Each explains what can be checked remotely and what needs inspection at the exact opening. Each locality-specific point remains linked to its source.'
                : `These five service sections provide operational and technical checks only. They are not presented as locally evidenced diagnoses for ${area.name}; the separately cited area facts are not used to infer any property's lock, access, demand or condition.`}
            </p>
            <div className="space-y-8">
              {serviceGuidance.map(({ service, guidance, detailsHref, primaryGuide }) => (
                <article
                  key={service.slug}
                  id={service.slug}
                  data-evidence-section={service.slug}
                  data-evidence-source-ids={guidance.sourceIds.join(' ')}
                  data-local-fact-indexes={guidance.localFactIndexes.map(factIndex => factIndex + 1).join(' ')}
                  data-service-evidence-mode={guide.serviceEvidenceMode ?? 'pair-linked'}
                  className="scroll-mt-28 rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#8A5A00] mb-2">From £{service.priceFrom} · no VAT</p>
                      <h3 className="text-xl md:text-2xl font-black text-[#0F1B2D]">{guidance.searchHeading}</h3>
                      {guidance.heading !== guidance.searchHeading && (
                        <h4 className="text-sm font-semibold text-gray-600 mt-2">Local decision focus: {guidance.heading}</h4>
                      )}
                    </div>
                    <Link href={detailsHref} prefetch={false} className="shrink-0 text-sm font-bold text-[#0F1B2D] underline decoration-[#FFB800] underline-offset-4 hover:text-[#8A5A00]">
                      View {service.shortName} service details
                    </Link>
                  </div>
                  {guidance.body.map(paragraph => (
                    <p key={paragraph.slice(0, 64)} className="text-gray-700 leading-relaxed mb-4">{paragraph}</p>
                  ))}
                  <h4 className="font-black text-[#0F1B2D] mt-6 mb-3">Checks before the work is agreed</h4>
                  <ul className="space-y-3">
                    {guidance.checks.map(check => (
                      <li key={check} className="flex gap-3 items-start">
                        <span className="text-[#FFB800] font-bold flex-shrink-0 mt-0.5">✓</span>
                        <span className="text-gray-700">{check}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/blog/${primaryGuide.slug}`}
                    data-primary-service-guide={service.slug}
                    className="inline-flex mt-6 text-sm font-bold text-[#0F1B2D] underline decoration-[#FFB800] underline-offset-4 hover:text-[#8A5A00]"
                  >
                    Read: {primaryGuide.title}
                  </Link>
                  <div className="rounded-xl bg-[#FFF9E8] border border-[#FFB800]/30 p-5 mt-6" data-service-faq="true">
                    <h4 className="font-black text-[#0F1B2D] mb-2" data-faq-question="true">{guidance.faq.q}</h4>
                    <p className="text-gray-700 leading-relaxed" data-faq-answer="true">{guidance.faq.a}</p>
                  </div>
                  <div className="mt-5">
                    {guidance.localFactIndexes.length > 0 && (
                      <p className="text-xs font-bold text-gray-600" data-selected-local-fact-links="true">
                        Local facts used:{' '}
                        {guidance.localFactIndexes.map((factIndex, index) => (
                          <span key={factIndex}>
                            {index > 0 && ' · '}
                            <a
                              href={`#local-fact-${factIndex + 1}`}
                              data-local-fact-link="true"
                              className="underline decoration-[#FFB800] underline-offset-2 hover:text-[#8A5A00]"
                            >
                              {guide.facts[factIndex].heading}
                            </a>
                          </span>
                        ))}
                      </p>
                    )}
                    <p className="text-xs font-bold text-gray-600">Guidance sources</p>
                    <ul className="flex flex-wrap gap-2 mt-2" aria-label={`Sources for ${guidance.heading}`}>
                    {guidance.sourceIds.map(sourceId => {
                      const source = sourceById.get(sourceId)
                      return source ? (
                        <li key={sourceId}>
                          <a
                            href={`#evidence-source-${source.id}`}
                            className="inline-flex rounded-full border border-[#FFB800]/40 bg-white px-3 py-1.5 text-xs leading-snug text-gray-700 underline decoration-[#FFB800] underline-offset-2 hover:border-[#FFB800] hover:text-[#8A5A00]"
                          >
                            {source.publisher}: {source.title}
                          </a>
                        </li>
                      ) : null
                    })}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section
        className="py-12 px-4 bg-white"
        aria-labelledby="source-heading"
        data-source-register-scope={hasDedicatedServicePages ? 'locality-only' : 'locality-and-technical'}
      >
        <div className="max-w-3xl mx-auto">
          <h2 id="source-heading" className="text-2xl font-black text-[#0F1B2D] mb-3">Sources and Review Notes for This {area.name} Guide</h2>
          <p className="text-gray-600 leading-relaxed">
            {hasDedicatedServicePages
              ? 'This overview lists the locality and property-status sources used for the area facts. Technical sources stay on each dedicated service guide so their claims remain with the canonical service owner.'
              : 'Locality facts and technical advice are kept separate. Each source below states the limited point it supports; none is used to infer a lock or access condition at an individual property.'}
          </p>
          <ContentAuthorNote reviewedOn={guide.reviewedOn} label={`${area.name} area guide`} />
          <ul className="space-y-4 mt-7">
            {pageSources.map(source => (
              <li id={`evidence-source-${source.id}`} key={source.id} data-source-kind={source.kind} className="scroll-mt-28 rounded-xl border border-gray-200 p-5">
                <p className="text-xs uppercase tracking-wider font-bold text-[#8A5A00] mb-2">{source.kind.replace('-', ' ')}</p>
                <a href={source.url} target="_blank" rel="noopener noreferrer" className="font-bold text-[#0F1B2D] underline decoration-[#FFB800] underline-offset-4 hover:text-[#8A5A00]">{source.title}</a>
                <p className="text-sm text-gray-600 mt-1">{source.publisher}</p>
                <p className="text-sm text-gray-700 mt-2">{source.supports}</p>
                <p className="text-xs text-gray-500 mt-2">Source checked <time dateTime={source.checkedOn}>{source.checkedOn}</time>.</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-9 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-black text-gray-900 mb-3">{area.name}, {area.postcode} and Exact-Address Coverage</h2>
          <p className="text-gray-700 leading-relaxed">
            This page uses {area.postcode} as an outward-code reference for {area.name}; it does
            not claim that the code defines the locality boundary. Call with the full postcode to
            confirm the address, current coverage and arrival estimate.
          </p>
        </div>
      </section>

      {neighbours.length > 0 && (
        <section className="py-9 px-4 bg-gray-50" data-service-directory-links="true">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-black text-gray-900 mb-4">Other Area Guides in the Service Directory</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {neighbours.map(neighbour => (
                <Link key={neighbour.slug} href={`/areas/${neighbour.slug}`} className="bg-white hover:bg-gray-50 border border-gray-200 hover:border-[#FFB800] text-gray-700 hover:text-[#0F1B2D] px-4 py-3 rounded-lg text-sm font-medium transition-colors">
                  Locksmith {neighbour.name}
                  <span className="block text-xs text-gray-500 mt-1">{neighbour.postcode}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <FAQSection faqs={guide.faqs} heading={`Booking Questions — ${area.name}`} />

      <CTABlock
        heading={`Need a locksmith in ${area.name}?`}
        subtext={`Available 24/7 — call for the current ETA and agreed price basis in ${area.name}. From £59, no VAT or separate call-out fee.`}
      />
    </>
  )
}
