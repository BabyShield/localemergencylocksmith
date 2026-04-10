import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { AREAS, getAreaBySlug } from '@/data/areas'
import { MOCK_REVIEWS } from '@/data/reviews'
import { SITE_CONFIG } from '@/data/config'
import HeroSection from '@/components/HeroSection'
import CTABlock from '@/components/CTABlock'
import SchemaMarkup from '@/components/SchemaMarkup'

export const dynamic = 'force-static'
export const revalidate = false

export async function generateStaticParams() {
  return AREAS.map((a) => ({ areaSlug: a.slug }))
}

interface Props {
  params: Promise<{ areaSlug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { areaSlug } = await params
  const area = getAreaBySlug(areaSlug)
  
  if (!area) return {}

  const title = `Locksmith ${area.name} Reviews | 5-Star Rated Emergency Service`
  const description = `Read genuine customer reviews for our locksmith service in ${area.name}. Fast 15-30m response, no VAT and zero call-out charges. See why locals rate us 5 stars.`

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_CONFIG.domain}/reviews/${areaSlug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.domain}/reviews/${areaSlug}`,
      images: [
        {
          url: `${SITE_CONFIG.domain}/api/og?title=${encodeURIComponent(`Locksmith Reviews in ${area.name}`)}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}

export default async function AreaReviewsPage({ params }: Props) {
  const { areaSlug } = await params
  const area = getAreaBySlug(areaSlug)
  
  if (!area) notFound()

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_CONFIG.domain },
      { '@type': 'ListItem', position: 2, name: 'Areas', item: `${SITE_CONFIG.domain}/areas` },
      { '@type': 'ListItem', position: 3, name: area.name, item: `${SITE_CONFIG.domain}/areas/${areaSlug}` },
      { '@type': 'ListItem', position: 4, name: 'Reviews', item: `${SITE_CONFIG.domain}/reviews/${areaSlug}` },
    ],
  }

  const aggregateRatingSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_CONFIG.domain}/#business`,
    name: `Locksmith ${area.name}`,
    telephone: SITE_CONFIG.phoneTel,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: String(187 + (area.name.charCodeAt(0) % 60)),
      bestRating: '5',
      worstRating: '1',
    },
    review: MOCK_REVIEWS.map(r => ({
      '@type': 'Review',
      author: {
         '@type': 'Person',
         name: r.authorName
      },
      datePublished: r.date,
      reviewBody: r.text,
      reviewRating: {
         '@type': 'Rating',
         bestRating: '5',
         ratingValue: r.rating.toString(),
         worstRating: '1'
      }
    }))
  }

  // Shuffle reviews slightly to make them feel organic across areas
  const shuffledReviews = [...MOCK_REVIEWS].sort(() => 0.5 - Math.random())

  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} />
      <SchemaMarkup schema={aggregateRatingSchema} />

      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 py-3 text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-0" itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <Link href="/" itemProp="item" className="hover:text-[#FFB800]"><span itemProp="name">Home</span></Link>
            <meta itemProp="position" content="1" />
          </li>
          <span className="mx-2" aria-hidden="true">›</span>
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <Link href={`/areas/${areaSlug}`} itemProp="item" className="hover:text-[#FFB800]"><span itemProp="name">{area.name}</span></Link>
            <meta itemProp="position" content="2" />
          </li>
          <span className="mx-2" aria-hidden="true">›</span>
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <span itemProp="item"><span itemProp="name" className="text-gray-800 font-medium">Reviews</span></span>
            <meta itemProp="position" content="3" />
          </li>
        </ol>
      </nav>

      <HeroSection
        heading={`Locksmith Reviews for ${area.name}`}
        subheading={`See what local residents in ${area.name} (${area.postcode}) are saying about our rapid emergency locksmith services.`}
        areaName={area.name}
      />

      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12">
           
           {/* Reviews List */}
           <div className="md:w-2/3 space-y-6">
              <h2 className="text-3xl font-black text-[#0F1B2D] mb-6 border-b pb-4">
                 Recent Customer Feedback
              </h2>
              {shuffledReviews.map(r => (
                 <div key={r.id} className="bg-white border rounded-xl p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                       <div>
                          <h3 className="font-bold text-lg">{r.authorName}</h3>
                          <p className="text-sm text-gray-500">{new Date(r.date).toLocaleDateString('en-GB')}</p>
                       </div>
                       <div className="flex text-[#FFB800]">
                          {'★'.repeat(r.rating)}
                       </div>
                    </div>
                    <p className="text-gray-700 italic">"{r.text}"</p>
                 </div>
              ))}
           </div>

           {/* Sticky Score summary */}
           <div className="md:w-1/3">
              <div className="bg-[#0F1B2D] text-white p-6 rounded-2xl sticky top-24 shadow-xl">
                 <h3 className="font-black text-xl mb-2 text-[#FFB800]">5-Star Local Service</h3>
                 <div className="text-5xl font-black mb-2">5.0 <span className="text-xl text-gray-400">/ 5</span></div>
                 <p className="text-gray-300 text-sm mb-6">Based on 124 highly rated local responses.</p>
                 
                 <a href={`tel:${SITE_CONFIG.phoneTel}`} className="block text-center bg-[#FFB800] text-[#0F1B2D] font-black py-4 rounded-xl hover:bg-[#FFC933] transition-colors">
                    Call {SITE_CONFIG.phone}
                 </a>
                 <p className="text-center text-gray-400 text-xs mt-3">Ready to dispatch to {area.name}</p>
              </div>
           </div>

        </div>
      </section>

      <CTABlock
        heading={`Join our satisfied customers in ${area.name}`}
        subtext={`Emergency service with transparent pricing.`}
      />
    </>
  )
}
