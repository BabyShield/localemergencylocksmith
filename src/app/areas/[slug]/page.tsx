import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, PoundSterling, CheckCircle, Lock, Clock, BookOpen } from 'lucide-react'
import { AREAS, getAreaBySlug, getAreaNeighbours } from '@/data/areas'
import { SERVICES } from '@/data/services'
import { SERVICE_PROVIDER_SCHEMA, SITE_CONFIG } from '@/data/config'
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

export const dynamic = 'force-static'
export const revalidate = false

export async function generateStaticParams() {
  return AREAS.map(area => ({ slug: area.slug }))
}

interface Props {
  params: Promise<{ slug: string }>
}

function getRelatedGuides() {
  const slugs = Array.from(new Set(Object.values(SERVICE_GUIDE_SLUGS).map(serviceSlugs => serviceSlugs[0])))
  return slugs
    .map(slug => getBlogPostBySlug(slug))
    .filter((post): post is NonNullable<typeof post> => post != null)
}

function areaGuideOrThrow(slug: string) {
  const guide = getAreaGuide(slug)
  if (!guide) throw new Error(`Missing governed area guide for ${slug}`)
  return guide
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const area = getAreaBySlug(slug)
  if (!area) return {}

  areaGuideOrThrow(slug)
  const hasDedicatedServicePages = hasTownService(area.slug, 'emergency-lockout')
  const title = hasDedicatedServicePages
    ? `Locksmith ${area.name} | 5 Local Services | From £59`
    : `Locksmith ${area.name} | 24/7 Help | From £59`
  const description = `Locksmith in ${area.name} for lockouts, lock repairs, uPVC mechanisms, boarding up and upgrades. Call for today's ETA. From £59; no VAT or call-out fee.`

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
  const neighbours = getAreaNeighbours(area)
  const areaAuthority = getAreaAuthority(area.slug)
  const relatedPosts = getRelatedGuides()
  const sourceById = new Map(guide.sources.map(source => [source.id, source]))
  const serviceGuidance = SERVICES.map(service => ({
    service,
    guidance: guide.serviceGuidance[service.slug as ServiceAreaSlug],
    href: hasTownService(area.slug, service.slug)
      ? `/areas/${area.slug}/${service.slug}`
      : `/services/${service.slug}`,
    hasDedicatedPage: hasTownService(area.slug, service.slug),
  }))
  const allFaqs = [
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
      itemListElement: serviceGuidance.map(({ service, guidance, href }) => ({
        '@type': 'Offer',
        name: `${service.shortName} in ${area.name}`,
        description: guidance.body[0],
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: String(service.priceFrom),
          priceCurrency: 'GBP',
          valueAddedTaxIncluded: false,
          description: 'Advertised starting price; the final price depends on the diagnosed scope and agreed parts.',
        },
        url: `${SITE_CONFIG.domain}${href}`,
      })),
    },
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
      <SchemaMarkup schema={faqSchema} />

      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 py-3 text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-0" itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <Link href="/" prefetch={false} itemProp="item" className="hover:text-[#FFB800]"><span itemProp="name">Home</span></Link>
            <meta itemProp="position" content="1" />
          </li>
          <span className="mx-2" aria-hidden="true">›</span>
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <Link href="/areas" prefetch={false} itemProp="item" className="hover:text-[#FFB800]"><span itemProp="name">Areas</span></Link>
            <meta itemProp="position" content="2" />
          </li>
          <span className="mx-2" aria-hidden="true">›</span>
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <span itemProp="name" className="text-gray-800 font-medium">{area.name}</span>
            <meta itemProp="position" content="3" />
          </li>
        </ol>
      </nav>

      <HeroSection
        heading={hasDedicatedServicePages
          ? `Locksmith Services in ${area.name}`
          : `Locksmith ${area.name} — Emergency Help 24/7`}
        subheading={`Locked out or dealing with a faulty or damaged lock in ${area.name}? Call for the current ETA, scope and price before attendance. No VAT or separate call-out fee.`}
        areaName={area.name}
        showResponseTime={false}
      />

      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-bold uppercase tracking-wider text-[#8A5A00] mb-3">Source-reviewed local service guide</p>
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
          <h2 className="text-2xl font-black mb-3">Five Locksmith Services in {area.name}</h2>
          <p className="text-gray-200 leading-relaxed mb-6">
            Each section below applies the cited local evidence to one service without assuming a
            property&apos;s lock, construction, ownership, access route or planning status from the
            area name. The actual entrance and authority are checked before work is agreed.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {serviceGuidance.map(({ service }) => (
              <a key={service.slug} href={`#${service.slug}`} className="rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold hover:border-[#FFB800] hover:text-[#FFB800] transition-colors">
                {service.shortName} in {area.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-[#F7F7F5]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-[#0F1B2D] mb-6">Why the Address and Door Evidence Matter</h2>
          <ul className="space-y-4">
            {[
              { Icon: MapPin, text: `The full ${area.name} address is checked against the relevant locality and property-status evidence; the ${area.postcode} outward code alone is not treated as a building description.` },
              { Icon: Lock, text: 'The door material, frame, lock markings and symptoms are inspected before a repair, replacement or upgrade is specified.' },
              { Icon: CheckCircle, text: 'Proof of a connection to the affected entrance is required, with separate authority checks for communal, rented or managed doors.' },
              { Icon: Clock, text: 'The current arrival estimate is confirmed by phone from the actual starting point and is not inferred from a static area page.' },
              { Icon: PoundSterling, text: 'The price basis, included labour, likely parts and any reason a price could change are explained before work proceeds.' },
              { Icon: BookOpen, text: `This guide was reviewed on ${guide.reviewedOn} and links to the primary locality and technical sources used.` },
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
          <h2 id="local-evidence-heading" className="text-2xl font-black text-[#0F1B2D] mb-3">Verified Local Context for {area.name}</h2>
          <p className="text-gray-600 leading-relaxed mb-7">{guide.evidenceLimits}</p>
          <div className="space-y-5">
            {guide.facts.map((fact, index) => (
              <article key={fact.text} className="rounded-xl border border-gray-200 p-5">
                <h3 className="font-black text-[#0F1B2D] mb-2">Local fact {index + 1}</h3>
                <p className="text-gray-700 leading-relaxed">{fact.text}</p>
                <p className="text-sm text-gray-600 mt-3"><strong>Why it matters here:</strong> {fact.serviceRelevance}</p>
                <p className="text-xs text-gray-500 mt-3">
                  Source{fact.sourceIds.length > 1 ? 's' : ''}:{' '}
                  {fact.sourceIds.map((sourceId, sourceIndex) => {
                    const source = sourceById.get(sourceId)
                    return source ? (
                      <span key={sourceId}>
                        {sourceIndex > 0 && ' · '}
                        <a href={source.url} target="_blank" rel="noopener noreferrer" className="underline decoration-[#FFB800] underline-offset-2 hover:text-[#8A5A00]">
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

      <section className="py-12 px-4 bg-[#F7F7F5]" aria-labelledby="service-guidance-heading">
        <div className="max-w-4xl mx-auto">
          <h2 id="service-guidance-heading" className="text-2xl md:text-3xl font-black text-[#0F1B2D] mb-3 text-center">Service-by-Service Guidance for {area.name}</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-10">
            Five separate, source-bounded guides explain what can be checked remotely and what
            still requires inspection at the exact address.
          </p>
          <div className="space-y-8">
            {serviceGuidance.map(({ service, guidance, href, hasDedicatedPage }) => (
              <article key={service.slug} id={service.slug} data-evidence-section={service.slug} data-evidence-source-ids={guidance.sourceIds.join(' ')} className="scroll-mt-28 rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#8A5A00] mb-2">From £{service.priceFrom} · no VAT</p>
                    <h3 className="text-xl md:text-2xl font-black text-[#0F1B2D]">{guidance.heading}</h3>
                  </div>
                  <Link href={href} className="shrink-0 text-sm font-bold text-[#0F1B2D] underline decoration-[#FFB800] underline-offset-4 hover:text-[#8A5A00]">
                    {hasDedicatedPage
                      ? `View ${service.shortName} in ${area.name}`
                      : `View ${service.shortName} service details`}
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
                <div className="rounded-xl bg-[#FFF9E8] border border-[#FFB800]/30 p-5 mt-6">
                  <h4 className="font-black text-[#0F1B2D] mb-2">{guidance.faq.q}</h4>
                  <p className="text-gray-700 leading-relaxed">{guidance.faq.a}</p>
                </div>
                <div className="mt-5">
                  <p className="text-xs font-bold text-gray-600">Sources for this guidance</p>
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

      <section className="py-12 px-4 bg-white" aria-labelledby="source-heading">
        <div className="max-w-3xl mx-auto">
          <h2 id="source-heading" className="text-2xl font-black text-[#0F1B2D] mb-3">Evidence Behind This {area.name} Guide</h2>
          <p className="text-gray-600 leading-relaxed">
            Locality facts and technical advice are kept separate. Each source below states the
            limited point it supports; none is used to infer a lock or access condition at an
            individual property.
          </p>
          <p className="text-sm text-gray-500 mt-3">Content reviewed <time dateTime={guide.reviewedOn}>{guide.reviewedOn}</time>.</p>
          <ul className="space-y-4 mt-7">
            {guide.sources.map(source => (
              <li id={`evidence-source-${source.id}`} key={source.id} className="scroll-mt-28 rounded-xl border border-gray-200 p-5">
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

      <section className="py-10 px-4 bg-[#F7F7F5]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-black text-[#0F1B2D] mb-2">Helpful Locksmith Guides</h2>
          <p className="text-gray-600 text-sm mb-5">Long-form advice for comparing methods, parts, standards and costs before you book.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {relatedPosts.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="bg-white border border-gray-200 hover:border-[#FFB800] rounded-xl p-4 transition-colors group">
                <p className="font-bold text-[#0F1B2D] text-sm leading-snug group-hover:text-[#8A5A00]">{post.title}</p>
                <p className="text-xs text-gray-600 mt-2">{post.readTime}</p>
              </Link>
            ))}
          </div>
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
        <section className="py-9 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-black text-gray-900 mb-4">Nearby Area Guides</h2>
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

      <FAQSection faqs={guide.faqs} heading={`Evidence and Booking Questions — ${area.name}`} />

      <CTABlock
        heading={`Need a locksmith in ${area.name}?`}
        subtext={`Available 24/7 — call for the current ETA and agreed price basis in ${area.name}. From £59, no VAT or separate call-out fee.`}
      />
    </>
  )
}
