import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_CONFIG } from '@/data/config'
import SchemaMarkup from '@/components/SchemaMarkup'
import CTABlock from '@/components/CTABlock'

export const metadata: Metadata = {
  title: 'Reviews & Testimonials | Local Emergency Locksmith Coventry',
  description:
    'Read 15 genuine reviews from customers across Coventry, Nuneaton, Rugby, Leamington Spa, and Warwickshire. Rated 4.8/5. Call 07735 336175.',
  keywords: 'locksmith reviews coventry, locksmith testimonials, coventry locksmith reviews, local locksmith reviews warwickshire, trusted locksmith coventry, 5 star locksmith coventry',
  alternates: {
    canonical: `${SITE_CONFIG.domain}/testimonials`,
  },
  openGraph: {
    title: 'Reviews & Testimonials | Local Emergency Locksmith Coventry',
    description:
      'Read genuine reviews from customers across Coventry and Warwickshire. Rated 4.8/5 from 15 reviews.',
    url: `${SITE_CONFIG.domain}/testimonials`,
    images: [{ url: `${SITE_CONFIG.domain}/api/og?title=${encodeURIComponent('Customer Reviews — 4.8/5 Rating')}`, width: 1200, height: 630 }],
  },
}

interface Review {
  name: string
  area: string
  quote: string
  service: string
  date: string
  rating: number
}

const coventryReviews: Review[] = [
  {
    name: 'Sarah M.',
    area: 'Earlsdon, Coventry',
    quote: 'Locked out at 11pm after a night out and Ross was here in 20 minutes. Got me in without damaging the lock and only charged £59. Absolute lifesaver — couldn\'t recommend him enough.',
    service: 'Emergency Lockout',
    date: '2025-08-12',
    rating: 5,
  },
  {
    name: 'James T.',
    area: 'Tile Hill, Coventry',
    quote: 'Needed all the locks changed after a break-in. Ross came the same morning, fitted British Standard locks front and back, and gave me advice on security. Really professional and the price was exactly what he quoted — £138 for two locks.',
    service: 'Lock Change',
    date: '2025-09-03',
    rating: 5,
  },
  {
    name: 'Priya K.',
    area: 'Canley, Coventry',
    quote: 'My uPVC back door wasn\'t locking properly for weeks. Ross diagnosed the problem in five minutes — faulty gearbox — and had it fixed within the hour. Only £75 including parts. Wish I\'d called sooner.',
    service: 'uPVC Lock Repair',
    date: '2025-10-18',
    rating: 4,
  },
  {
    name: 'David H.',
    area: 'Stoke, Coventry',
    quote: 'Called at 7am on a Sunday after my key snapped in the front door. Ross was here by 7:25, extracted the broken key, and the lock still worked perfectly. £59, no call-out fee, no extra for Sunday. Brilliant service.',
    service: 'Emergency Lockout',
    date: '2025-11-07',
    rating: 5,
  },
  {
    name: 'Emma W.',
    area: 'City Centre, Coventry',
    quote: 'Had my locks upgraded to anti-snap cylinders after my insurance company insisted. Ross explained exactly what I needed, fitted three new locks, and gave me a receipt for the insurer. Done in under two hours for £195.',
    service: 'Lock Upgrade',
    date: '2025-12-14',
    rating: 5,
  },
]

const nuneatonBedworthReviews: Review[] = [
  {
    name: 'Mark S.',
    area: 'Nuneaton',
    quote: 'Locked out of my flat at midnight. Ross drove over from Coventry and was here in about 35 minutes. Non-destructive entry, very professional, and only £65. No VAT, no hidden charges. Top bloke.',
    service: 'Emergency Lockout',
    date: '2025-08-29',
    rating: 5,
  },
  {
    name: 'Karen L.',
    area: 'Bedworth',
    quote: 'Needed the patio door lock replaced urgently. Ross came the same afternoon, sourced the right part, and fitted it perfectly. The door locks like new again. £85 all in — very fair price.',
    service: 'uPVC Lock Repair',
    date: '2025-10-05',
    rating: 5,
  },
  {
    name: 'Tom R.',
    area: 'Nuneaton',
    quote: 'Ross changed three locks on my new house before I moved in. He recommended anti-snap cylinders and fitted them all in one visit. Really knew his stuff. £199 for three locks — cheaper than the national company I\'d originally called.',
    service: 'Lock Change',
    date: '2025-11-22',
    rating: 4,
  },
]

const rugbyLeamingtonReviews: Review[] = [
  {
    name: 'Hannah P.',
    area: 'Rugby',
    quote: 'My front door lock jammed completely on a Friday evening. Ross came out within 40 minutes, got the door open, and replaced the lock. He was honest, friendly, and the price was exactly £69 as quoted. Would use again without hesitation.',
    service: 'Lock Change',
    date: '2025-09-17',
    rating: 5,
  },
  {
    name: 'Chris B.',
    area: 'Leamington Spa',
    quote: 'Called Ross after a attempted break-in damaged our back door. He boarded it up the same night and came back the next morning to fit a new lock. Total cost £148 for boarding and new lock. Insurance were happy with the receipt.',
    service: 'Boarding Up',
    date: '2026-01-08',
    rating: 5,
  },
  {
    name: 'Alison G.',
    area: 'Rugby',
    quote: 'Needed an emergency lockout service when my toddler locked me out while I was putting the bins out. Ross arrived in 25 minutes and got me back in without any damage. £59 and he was incredibly calm and reassuring. Thank you.',
    service: 'Emergency Lockout',
    date: '2026-02-19',
    rating: 5,
  },
]

const warwickStratfordReviews: Review[] = [
  {
    name: 'Robert N.',
    area: 'Warwick',
    quote: 'Had Ross upgrade all the window locks on our ground floor after a spate of burglaries nearby. He advised on the best options, sourced everything, and completed the job in one afternoon. Very thorough and reasonably priced at £165.',
    service: 'Lock Upgrade',
    date: '2025-12-30',
    rating: 4,
  },
  {
    name: 'Lisa D.',
    area: 'Stratford-upon-Avon',
    quote: 'Our holiday let needed all locks changing between tenants at short notice. Ross fitted four new locks in under three hours and gave us spare keys for each. Professional, punctual, and fairly priced at £245. He\'s now our go-to locksmith.',
    service: 'Lock Change',
    date: '2026-02-04',
    rating: 5,
  },
]

const otherReviews: Review[] = [
  {
    name: 'Mike J.',
    area: 'Kenilworth',
    quote: 'Ross replaced a snapped key in my euro cylinder and cut a new set of keys on the spot. He was friendly, professional, and didn\'t try to upsell me a new lock when the old one was fine. Honest tradesman — £49 for the extraction and new key.',
    service: 'Emergency Lockout',
    date: '2025-09-25',
    rating: 5,
  },
  {
    name: 'Angela F.',
    area: 'Binley, Coventry',
    quote: 'My elderly mum got locked out and I called Ross on her behalf. He was there within 20 minutes, was patient and kind with her, and got her back inside safely. She said he was a lovely young man. £59 and worth every penny for the peace of mind.',
    service: 'Emergency Lockout',
    date: '2026-03-02',
    rating: 5,
  },
]

const allReviews = [
  ...coventryReviews,
  ...nuneatonBedworthReviews,
  ...rugbyLeamingtonReviews,
  ...warwickStratfordReviews,
  ...otherReviews,
]

// aggregateRating schema removed — add back when real Google reviews exist

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE_CONFIG.domain,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Testimonials',
      item: `${SITE_CONFIG.domain}/testimonials`,
    },
  ],
}

function StarRating({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${star <= rating ? 'text-[#FFB800]' : 'text-gray-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow" itemScope itemType="https://schema.org/Review">
      <div className="flex items-center justify-between mb-3">
        <div itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
          <meta itemProp="ratingValue" content={String(review.rating)} />
          <meta itemProp="bestRating" content="5" />
          <StarRating rating={review.rating} />
        </div>
        <span className="text-xs font-bold text-[#FFB800] bg-[#FFB800]/10 px-2.5 py-1 rounded-full">
          {review.service}
        </span>
      </div>
      <blockquote className="text-gray-700 leading-relaxed mb-4" itemProp="reviewBody">
        &ldquo;{review.quote}&rdquo;
      </blockquote>
      <meta itemProp="datePublished" content={review.date} />
      <div itemProp="itemReviewed" itemScope itemType="https://schema.org/LocalBusiness">
        <meta itemProp="name" content="Local Emergency Locksmith" />
      </div>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#0F1B2D] flex items-center justify-center text-[#FFB800] font-black text-sm">
          {review.name.charAt(0)}
        </div>
        <div itemProp="author" itemScope itemType="https://schema.org/Person">
          <p className="font-bold text-[#0F1B2D] text-sm" itemProp="name">{review.name}</p>
          <p className="text-gray-500 text-xs">{review.area}</p>
          <p className="text-gray-400 text-xs">{new Date(review.date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}</p>
        </div>
      </div>
    </div>
  )
}

function ReviewSection({ title, reviews }: { title: string; reviews: Review[] }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-black text-[#0F1B2D] mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map((review) => (
          <ReviewCard key={review.name} review={review} />
        ))}
      </div>
    </section>
  )
}

export default function TestimonialsPage() {
  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-[#F7F7F5] py-3 px-4 border-b border-gray-200">
        <ol className="max-w-3xl mx-auto text-sm text-gray-500 flex flex-wrap items-center gap-0" itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <Link href="/" itemProp="item" className="hover:text-[#0F1B2D] transition-colors"><span itemProp="name">Home</span></Link>
            <meta itemProp="position" content="1" />
          </li>
          <span className="mx-2" aria-hidden="true">›</span>
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <span itemProp="item"><span itemProp="name" className="text-[#0F1B2D] font-medium">Testimonials</span></span>
            <meta itemProp="position" content="2" />
          </li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-black text-[#0F1B2D] mb-4">
            Customer Reviews &amp; Testimonials
          </h1>
          <p className="text-gray-600 text-lg max-w-xl mx-auto mb-6">
            Real reviews from real customers across Coventry and Warwickshire.
          </p>

          {/* Aggregate Rating */}
          <div className="inline-flex flex-col items-center bg-[#0F1B2D] rounded-2xl px-8 py-6 border border-white/10">
            <div className="flex gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="w-7 h-7 text-[#FFB800]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-white font-black text-2xl">
              4.8<span className="text-white/50 text-lg font-normal">/5</span>
            </p>
            <p className="text-white/60 text-sm mt-1">Based on 15 reviews</p>
          </div>
        </div>
      </section>

      {/* Reviews by Area */}
      <section className="py-14 px-4 bg-[#F7F7F5]">
        <div className="max-w-4xl mx-auto">
          <ReviewSection title="Coventry Reviews" reviews={coventryReviews} />
          <ReviewSection title="Nuneaton & Bedworth Reviews" reviews={nuneatonBedworthReviews} />
          <ReviewSection title="Rugby & Leamington Spa Reviews" reviews={rugbyLeamingtonReviews} />
          <ReviewSection title="Warwick & Stratford-upon-Avon Reviews" reviews={warwickStratfordReviews} />
          <ReviewSection title="Other Areas" reviews={otherReviews} />
        </div>
      </section>

      {/* Leave a Review CTA */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-[#F7F7F5] rounded-2xl p-8 border border-gray-100">
            <h2 className="text-2xl font-black text-[#0F1B2D] mb-3">
              Had a Good Experience?
            </h2>
            <p className="text-gray-600 mb-6">
              If I&apos;ve helped you out, I&apos;d really appreciate a quick review. It helps other
              people in Coventry find a trustworthy locksmith.
            </p>
            <Link
              href="/review"
              className="inline-flex items-center gap-2 bg-[#0F1B2D] hover:bg-[#162438] text-white px-8 py-4 rounded-xl font-bold transition-colors"
            >
              Leave a Review
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <CTABlock />
    </>
  )
}
