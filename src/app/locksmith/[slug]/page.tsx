import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { AREAS, getAreaBySlug, getAreaNeighbours } from '@/data/areas'
import { SERVICES } from '@/data/services'
import { ARTICLE_TEMPLATES } from '@/data/articles'
import { SITE_CONFIG } from '@/data/config'
import HeroSection from '@/components/HeroSection'
import CTABlock from '@/components/CTABlock'
import FAQSection from '@/components/FAQSection'
import AreaFacts from '@/components/AreaFacts'
import SchemaMarkup from '@/components/SchemaMarkup'
import InternalLinkingMatrix from '@/components/InternalLinkingMatrix'
import { getAreaFacts } from '@/data/area-facts'

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

  const title = `Locksmith ${area.name} | 24/7 Local Expert | No Call-Out Fee`
  const description = `Locksmith near me in ${area.name}? Local emergency locksmith, ${area.responseTime} response. No VAT, no call-out fee. Call ${SITE_CONFIG.phone} now.`

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_CONFIG.domain}/locksmith/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.domain}/locksmith/${slug}`,
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
    '@type': ['LocalBusiness', 'Locksmith'],
    '@id': `${SITE_CONFIG.domain}/#business`,
    name: 'Local Emergency Locksmith',
    url: SITE_CONFIG.domain,
    telephone: SITE_CONFIG.phoneTel,
    ...(area.lat && area.lng ? {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: area.lat,
        longitude: area.lng,
      },
    } : {}),
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
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
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
      <nav className="max-w-6xl mx-auto px-4 py-3 text-sm text-gray-500">
        <Link href="/" className="hover:text-[#FFB800]">Home</Link>
        <span className="mx-2">›</span>
        <Link href="/areas" className="hover:text-[#FFB800]">Areas</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-800 font-medium">{area.name}</span>
      </nav>

      <HeroSection
        heading={`Locksmith ${area.name}`}
        subheading={`Locked out in ${area.name}? I can be with you in ${area.responseTime}. No VAT, no call-out fee, no hidden charges.`}
        areaName={area.name}
      />

      {/* Intro */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-gray-900 mb-4">
            Locked Out in {area.name}? I Can Be There in {area.responseTime}
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

      {/* Why choose us */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-gray-900 mb-6">
            Why {area.name} Residents Choose a Local Independent Locksmith
          </h2>
          <ul className="space-y-4">
            {[
              {
                icon: '📍',
                text: area.localDetail
                  ? `I'm based locally and know ${area.name} well — ${area.localDetail.split('.')[0]}.`
                  : `I'm based locally, not a national call centre. I know ${area.name} and I respond fast.`,
              },
              {
                icon: '💷',
                text: 'No VAT — you save 20% compared to bigger companies. The price I quote is the price you pay.',
              },
              {
                icon: '✅',
                text: 'Transparent pricing — I always confirm the price on the phone before I come out. No hidden charges.',
              },
              {
                icon: '🔒',
                text: area.commonIssues
                  ? `${area.commonIssues.split('.')[0]}. I always try non-destructive entry first.`
                  : 'No lock drilling unless absolutely necessary — I always try non-destructive entry first.',
              },
              {
                icon: '⏱️',
                text: `${area.responseTime} response for ${area.name} — I cover the entire ${area.postcode} postcode area.`,
              },
              {
                icon: '🏠',
                text: area.housingStock
                  ? `${area.housingStock.split('.')[0]}.`
                  : `I work on all lock types found in ${area.name} — Yale, mortice, uPVC multipoint, and euro cylinders.`,
              },
            ].map((item) => (
              <li key={item.text} className="flex gap-3 items-start">
                <span className="text-2xl flex-shrink-0 mt-1">{item.icon}</span>
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
            Our Services in {area.name}
          </h2>
          <div className="space-y-3">
            {SERVICES.map((s) => (
              <div key={s.slug} className="flex justify-between items-center py-3 border-b border-gray-100">
                <div>
                  <Link
                    href={`/services/${s.slug}`}
                    className="font-semibold text-gray-900 hover:text-[#0F1B2D] hover:underline"
                  >
                    {s.shortName}
                  </Link>
                  <p className="text-sm text-gray-600">{s.description}</p>
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

      {/* Helpful guides for this area — links to area-specific blog articles */}
      <section className="py-10 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-black text-[#0F1B2D] mb-2">
            Helpful Guides for {area.name}
          </h2>
          <p className="text-gray-500 text-sm mb-5">
            Locksmith advice tailored to {area.name} and the {area.postcode} area
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ARTICLE_TEMPLATES.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${slug}/${article.slug}`}
                className="bg-[#F7F7F5] hover:bg-white border border-gray-100 hover:border-[#FFB800]/50 rounded-xl p-4 transition-all hover:shadow-sm group"
              >
                <p className="font-bold text-[#0F1B2D] text-sm group-hover:text-[#FFB800] transition-colors leading-snug">
                  {article.titleTemplate.replace(/\{area\}/g, area.name)}
                </p>
                <p className="text-xs text-gray-400 mt-1">5 min read</p>
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
                  href={`/locksmith/${n.slug}`}
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

      {/* Programmatic Streets Linking */}
      <section className="py-10 px-4 bg-[#F7F7F5]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-black text-gray-900 mb-4">
            Streets I Cover in {area.name}
          </h2>
          <p className="text-gray-700 text-sm">
            I provide fast emergency response to all residential and commercial addresses down the following local streets in {area.name}:
          </p>
          
          {(() => {
            try {
              const fs = require('fs');
              const path = require('path');
              const filePath = path.join(process.cwd(), 'src', 'data', 'streets', `${slug}.json`);
              const data = fs.readFileSync(filePath, 'utf-8');
              const streetsData = JSON.parse(data);
              
              if (!streetsData.streets || streetsData.streets.length === 0) return <p className="mt-4">Fully covering {area.name}</p>;

              // Requires the new Client Component to handle parsing the array
              const LocalStreetSearch = require('@/components/LocalStreetSearch').default;

              return <LocalStreetSearch areaSlug={slug} areaName={area.name} streets={streetsData.streets} />;
            } catch (e) {
              return <p className="text-sm text-gray-500 mt-4">Covering all main roads and avenues in {area.name}.</p>;
            }
          })()}
        </div>
      </section>

      {/* Area Facts */}
      {facts.length > 0 && (
        <AreaFacts areaName={area.name} facts={facts} postcode={area.postcode} />
      )}

      {/* FAQ */}
      <FAQSection
        faqs={area.faqs}
        heading={`Frequently Asked Questions — ${area.name} Locksmith`}
      />

      <InternalLinkingMatrix 
        areaSlug={slug} 
        areaName={area.name} 
        parentHierarchy="locksmith" 
      />

      <CTABlock
        heading={`Locked out in ${area.name}? Call me now.`}
        subtext={`Available 24/7 — ${area.responseTime} response for ${area.name}. No VAT, no call-out fee. The price I quote is the price you pay.`}
      />
    </>
  )
}
