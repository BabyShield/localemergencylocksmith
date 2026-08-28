import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { AREAS, getAreaBySlug, getAreaNeighbours } from '@/data/areas'
import { SERVICES } from '@/data/services'
import { SITE_CONFIG } from '@/data/config'
import { ALL_BLOG_POSTS } from '@/data/blog-posts'
import { hasTownService } from '@/data/town-services'
import HeroSection from '@/components/HeroSection'
import CTABlock from '@/components/CTABlock'
import FAQSection from '@/components/FAQSection'
import AreaFacts from '@/components/AreaFacts'
import SchemaMarkup from '@/components/SchemaMarkup'
import { getAreaFacts } from '@/data/area-facts'
import { MapPin, PoundSterling, CheckCircle, Lock, Clock, Home } from 'lucide-react'

export const dynamic = 'force-static'
export const revalidate = false

export async function generateStaticParams() {
  return AREAS.map((a) => ({ slug: a.slug }))
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const area = getAreaBySlug(slug)
  if (!area) return {}

  const title = `Locksmith ${area.name} | 24/7 | From £59`
  const description = `Need a local or emergency locksmith in ${area.name}? ${area.responseTime} response, 24 hours a day. No VAT or call-out fee. Locked out? Call ${SITE_CONFIG.phone}.`

  return {
    title,
    description,
    keywords: `locksmith ${area.name}, locksmiths ${area.name}, emergency locksmith ${area.name}, locksmith near me ${area.name}, 24 hour locksmith ${area.name}, locksmith ${area.postcode}, local locksmith ${area.name}, locked out of house ${area.name}`,
    alternates: {
      canonical: `${SITE_CONFIG.domain}/areas/${slug}`,
    },
    openGraph: {
      type: 'website',
      title,
      description,
      url: `${SITE_CONFIG.domain}/areas/${slug}`,
      images: [
        {
          url: `${SITE_CONFIG.domain}/api/og?title=${encodeURIComponent(`Locksmith in ${area.name}`)}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}

export default async function AreaPage({ params }: Props) {
  const { slug } = await params
  const area = getAreaBySlug(slug)
  if (!area) notFound()

  const neighbours = getAreaNeighbours(area)
  const facts = getAreaFacts(slug)

  // 4 hand-written posts, rotated by area index so every post gets area-page
  // links and each area links a different set.
  const areaIdx = Math.max(0, AREAS.findIndex((a) => a.slug === slug))
  const relatedPosts = Array.from(
    { length: 4 },
    (_, i) => ALL_BLOG_POSTS[(areaIdx * 4 + i) % ALL_BLOG_POSTS.length]
  )

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_CONFIG.domain },
      { '@type': 'ListItem', position: 2, name: 'Areas', item: `${SITE_CONFIG.domain}/areas` },
      { '@type': 'ListItem', position: 3, name: area.name, item: `${SITE_CONFIG.domain}/areas/${slug}` },
    ],
  }

  // Service offered in this area, provided by the single canonical business
  // entity defined in layout.tsx — never redefines /#business properties.
  const areaSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Emergency locksmith',
    name: `Emergency Locksmith in ${area.name}`,
    url: `${SITE_CONFIG.domain}/areas/${slug}`,
    description: `Emergency locksmith serving ${area.name} and the ${area.postcode} postcode. ${area.responseTime} response, 24/7, 365 days. No VAT, no call-out fee.`,
    provider: { '@id': `${SITE_CONFIG.domain}/#business` },
    areaServed: [
      {
        '@type': 'Place',
        name: area.name,
        address: {
          '@type': 'PostalAddress',
          postalCode: area.postcode,
          addressRegion: area.region,
          addressCountry: 'GB',
        },
      },
      ...neighbours.slice(0, 4).map(n => ({
        '@type': 'Place',
        name: n.name,
        address: {
          '@type': 'PostalAddress',
          postalCode: n.postcode,
          addressCountry: 'GB',
        },
      })),
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Locksmith Services in ${area.name}`,
      itemListElement: SERVICES.map(s => ({
        '@type': 'Offer',
        name: s.shortName,
        description: s.description,
        price: String(s.priceFrom),
        priceCurrency: 'GBP',
        availability: 'https://schema.org/InStock',
        areaServed: { '@type': 'Place', name: area.name },
      })),
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: area.faqs.map((faq) => ({
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
            <span><span itemProp="name" className="text-gray-800 font-medium">{area.name}</span></span>
            <meta itemProp="position" content="3" />
          </li>
        </ol>
      </nav>

      <HeroSection
        heading={`Locksmith ${area.name} — Emergency 24/7`}
        subheading={`Locked out of your house in ${area.name}? Local 24-hour locksmith — ${area.responseTime} response. No VAT, no call-out fee.`}
        areaName={area.name}
        responseTime={area.responseTime}
      />

      {/* Intro */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-gray-900 mb-4">
            Local Locksmith in {area.name} — {area.responseTime} Response, 24/7
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            {area.uniqueContent}
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            I&apos;m an independent local locksmith — not a national call centre. When you call{' '}
            <a href={`tel:${SITE_CONFIG.phoneTel}`} className="text-[#0F1B2D] font-bold hover:underline">
              {SITE_CONFIG.phone}
            </a>
            , I answer. I give you a price on the phone, I tell you honestly when I&apos;ll arrive, and
            I do the job at the price agreed. No VAT. No call-out fee. No surprises.
          </p>

          {/* Quick info boxes */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8">
            {[
              { label: 'Response Time', value: area.responseTime },
              { label: 'Emergency Lockout', value: 'From £59' },
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

      {/* Semrush-aligned service summary; canonical ownership stays on this area hub. */}
      <section className="py-8 px-4 bg-[#0F1B2D] text-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-black mb-4">
            Need a Local or Emergency Locksmith in {area.name}?
          </h2>
          <p className="text-gray-200 leading-relaxed mb-5">
            If you are locked out of your house, need a 24-hour emergency locksmith, or are
            looking for a locksmith near you in {area.postcode}, call for a price and an honest
            arrival time. I also cover the following residential lock services in {area.name}.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {[
              `Emergency lockout service in ${area.name}`,
              `Front door lock replacement in ${area.name}`,
              `uPVC door lock repair and replacement in ${area.name}`,
              `Emergency boarding up service in ${area.name}`,
              `Anti-snap door locks in ${area.postcode}`,
              `BS3621 lock upgrades in ${area.postcode}`,
            ].map((serviceLabel) => (
              <li key={serviceLabel} className="flex items-center gap-2">
                <span className="text-[#FFB800] font-bold flex-shrink-0">✓</span>
                <span className="text-gray-200">{serviceLabel}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-gray-900 mb-6">
            Why {area.name} Residents Choose a Local Independent Locksmith
          </h2>
          <ul className="space-y-4">
            {[
              {
                Icon: MapPin,
                text: area.localDetail
                  ? `I'm based locally and know ${area.name} well — ${area.localDetail.split('.')[0]}.`
                  : `I'm based locally, not a national call centre. I know ${area.name} and I respond fast.`,
              },
              {
                Icon: PoundSterling,
                text: 'No VAT — you save 20% compared to bigger companies. The price I quote is the price you pay.',
              },
              {
                Icon: CheckCircle,
                text: 'Transparent pricing — I always confirm the price on the phone before I come out. No hidden charges.',
              },
              {
                Icon: Lock,
                text: area.commonIssues
                  ? `${area.commonIssues.split('.')[0]}. I always try non-destructive entry first.`
                  : 'No lock drilling unless absolutely necessary — I always try non-destructive entry first.',
              },
              {
                Icon: Clock,
                text: `${area.responseTime} response for ${area.name} — I cover the entire ${area.postcode} postcode area.`,
              },
              {
                Icon: Home,
                text: area.housingStock
                  ? `${area.housingStock.split('.')[0]}.`
                  : `I work on all lock types found in ${area.name} — Yale, mortice, uPVC multipoint, and euro cylinders.`,
              },
            ].map((item) => (
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

      {/* Services */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-gray-900 mb-6">
            Locksmith Services in {area.name} — Prices &amp; Details
          </h2>
          <div className="space-y-3">
            {SERVICES.map((s) => (
              <div key={s.slug} className="flex justify-between items-center py-3 border-b border-gray-100">
                <div>
                  <p className="font-semibold text-gray-900">{s.shortName} in {area.name}</p>
                  <p className="text-sm text-gray-600">{s.description}</p>
                  <Link
                    href={hasTownService(slug, s.slug) ? `/areas/${slug}/${s.slug}` : `/services/${s.slug}`}
                    className="inline-block mt-1 text-sm font-semibold text-[#0F1B2D] hover:text-[#FFB800] hover:underline"
                  >
                    {hasTownService(slug, s.slug)
                      ? `View ${s.shortName.toLowerCase()} in ${area.name}`
                      : `View ${s.shortName.toLowerCase()} service details`}
                  </Link>
                </div>
                <span className="text-[#FFB800] font-black text-lg ml-4 flex-shrink-0">
                  From £{s.priceFrom}
                </span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4">
            * No VAT &bull; No call-out fee &bull; Same price evenings and weekends
          </p>
        </div>
      </section>

      {/* Housing stock & common issues — rendered if data exists */}
      {area.housingStock && (
        <section className="py-10 px-4 bg-[#F7F7F5]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-black text-[#0F1B2D] mb-4">
              Locksmith Services for {area.name} Homes
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">{area.housingStock}</p>
            {area.commonIssues && (
              <>
                <h3 className="text-lg font-bold text-[#0F1B2D] mt-6 mb-3">
                  Common Lock Problems in {area.name}
                </h3>
                <p className="text-gray-700 leading-relaxed">{area.commonIssues}</p>
              </>
            )}
            {area.localDetail && (
              <>
                <h3 className="text-lg font-bold text-[#0F1B2D] mt-6 mb-3">
                  About {area.name}
                </h3>
                <p className="text-gray-700 leading-relaxed">{area.localDetail}</p>
              </>
            )}
          </div>
        </section>
      )}

      {/* Helpful guides — hand-written blog posts, rotated per area to spread link equity */}
      <section className="py-10 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-black text-[#0F1B2D] mb-2">
            Helpful Locksmith Guides
          </h2>
          <p className="text-gray-500 text-sm mb-5">
            Practical advice from the locksmith who covers {area.name} and {area.postcode}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {relatedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-[#F7F7F5] hover:bg-white border border-gray-100 hover:border-[#FFB800]/50 rounded-xl p-4 transition-all hover:shadow-sm group"
              >
                <p className="font-bold text-[#0F1B2D] text-sm group-hover:text-[#FFB800] transition-colors leading-snug">
                  {post.title}
                </p>
                <p className="text-xs text-gray-400 mt-1">{post.readTime}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Postcodes */}
      <section className="py-8 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-black text-gray-900 mb-4">
            {area.name} and {area.postcode} Postcodes I Cover
          </h2>
          <p className="text-gray-700">
            I cover all of {area.name} and the {area.postcode} postcode area. Whether you are in the
            town centre, on an estate, or in a rural lane — if you&apos;re in {area.postcode}, call me
            and I&apos;ll come.
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

      {/* Nearby areas */}
      {neighbours.length > 0 && (
        <section className="py-8 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-black text-gray-900 mb-4">
              Nearby Areas I Also Cover
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {neighbours.map((n) => (
                <Link
                  key={n.slug}
                  href={`/areas/${n.slug}`}
                  className="bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-[#FFB800] text-gray-700 hover:text-[#0F1B2D] px-4 py-3 rounded-lg text-sm font-medium transition-colors"
                >
                  Locksmith {n.name}
                  <span className="block text-xs text-gray-500 mt-1">{n.postcode}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Area Facts */}
      {facts.length > 0 && (
        <AreaFacts areaName={area.name} facts={facts} postcode={area.postcode} />
      )}

      {/* FAQ */}
      <FAQSection
        faqs={area.faqs}
        heading={`Frequently Asked Questions — ${area.name} Locksmith`}
      />

      <CTABlock
        heading={`Locked out in ${area.name}? Call me now.`}
        subtext={`Available 24/7 — ${area.responseTime} response for ${area.name}. No VAT, no call-out fee. The price I quote is the price you pay.`}
      />
    </>
  )
}
