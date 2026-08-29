import type { Metadata } from 'next'
import Link from 'next/link'
import HeroSection from '@/components/HeroSection'
import CTABlock from '@/components/CTABlock'
import FAQSection from '@/components/FAQSection'
import ServiceCard from '@/components/ServiceCard'
import AreaGrid from '@/components/AreaGrid'
import PriceTable from '@/components/PriceTable'
import SchemaMarkup from '@/components/SchemaMarkup'
import DirectAnswer from '@/components/DirectAnswer'
import LastUpdated from '@/components/LastUpdated'
import CredentialsStrip from '@/components/CredentialsStrip'
import { SERVICES } from '@/data/services'
import { SITE_CONFIG, CONTENT_UPDATED, GOOGLE_REVIEWS, LOCKSMITH_AUTHOR_SCHEMA } from '@/data/config'
import { AREA_SERVED_SCHEMA } from '@/data/areas'
import { ALL_BLOG_POSTS } from '@/data/blog-posts'

export const metadata: Metadata = {
  title: 'Locksmith Coventry | Local 24/7 Service | From £59',
  description:
    'Local mobile locksmith in Coventry for lockouts, door lock repairs, replacements, uPVC locks and security upgrades. 24/7 from £59; no VAT or call-out fee.',
  keywords: 'locksmith coventry, local locksmith coventry, mobile locksmith coventry, locksmith near me coventry, emergency locksmith coventry, 24 hour locksmith coventry, door lock repair coventry, lock replacement coventry, locksmith warwickshire',
  alternates: {
    canonical: SITE_CONFIG.domain,
  },
  openGraph: {
    type: 'website',
    title: 'Locksmith Coventry | Local 24/7 Service | From £59',
    description: 'Local mobile Coventry locksmith for lockouts, door lock repairs, replacements and security upgrades. Call to confirm attendance; no VAT or call-out fee.',
    url: SITE_CONFIG.domain,
    images: [{ url: `${SITE_CONFIG.domain}/og-image.png`, width: 1200, height: 630 }],
  },
}

// Google requires a real physical address for LocalBusiness rich-result
// eligibility. No public street/postcode has been supplied, so the homepage
// declares the verified site identity as an Organization without inventing NAP.
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_CONFIG.domain}/#business`,
  name: SITE_CONFIG.businessName,
  url: SITE_CONFIG.domain,
  telephone: SITE_CONFIG.phoneTel,
  email: SITE_CONFIG.email,
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    telephone: SITE_CONFIG.phoneTel,
    email: SITE_CONFIG.email,
  },
  description:
    'Independent mobile locksmith serving 78 listed locations across Coventry and nearby parts of Warwickshire, Solihull, and the West Midlands.',
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_CONFIG.domain}/icon-512.png`,
    width: 512,
    height: 512,
  },
  image: `${SITE_CONFIG.domain}/og-image.png`,
  founder: LOCKSMITH_AUTHOR_SCHEMA,
  areaServed: AREA_SERVED_SCHEMA,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Locksmith Services',
    itemListElement: SERVICES.map(service => ({
      '@type': 'Offer',
      name: service.name,
      description: service.description,
      url: `${SITE_CONFIG.domain}/services/${service.slug}`,
      priceSpecification: {
        '@type': 'PriceSpecification',
        minPrice: String(service.priceFrom),
        priceCurrency: 'GBP',
        valueAddedTaxIncluded: false,
        description: 'Advertised starting price; final scope and parts are agreed after diagnosis.',
      },
    })),
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_CONFIG.domain}/#website`,
  name: SITE_CONFIG.businessName,
  url: SITE_CONFIG.domain,
  publisher: { '@id': `${SITE_CONFIG.domain}/#business` },
  inLanguage: 'en-GB',
}

const homepageFaqs = [
  {
    q: 'How quickly can a locksmith arrive in Coventry?',
    a: "I confirm the current arrival estimate from my actual starting point and your full address when you call. A static page cannot reliably promise a journey time.",
  },
  {
    q: 'Do you charge VAT on locksmith services?',
    a: 'No — I am not VAT-registered, so VAT is not added. If inspection changes the scope, I explain and agree any revised price before work proceeds.',
  },
  {
    q: 'Is there a call-out fee?',
    a: 'No separate call-out fee is added. I explain the price basis for the described scope before travelling and agree any inspection-led revision before additional work.',
  },
  {
    q: 'Do you work on weekends and bank holidays?',
    a: 'Yes — I take calls 24 hours a day, 7 days a week, including weekends and bank holidays. The published starting-price basis has no separate night, weekend or bank-holiday surcharge; the agreed total still depends on the diagnosed scope and any parts.',
  },
  {
    q: 'How is locksmith work agreed?',
    a: 'The attending name, authority check, proposed method, scope and price basis are confirmed before work starts. Ask to see any current credentials or cover evidence relevant to your decision.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: homepageFaqs.map(faq => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a,
    },
  })),
}

const latestPosts = [...ALL_BLOG_POSTS]
  .sort((left, right) => right.date.localeCompare(left.date))
  .slice(0, 3)

export default function HomePage() {
  return (
    <>
      <SchemaMarkup schema={organizationSchema} />
      <SchemaMarkup schema={websiteSchema} />
      <SchemaMarkup schema={faqSchema} />

      {/* 1. Hero */}
      <HeroSection
        heading="Local Locksmith Coventry — Available 24/7"
        subheading="Lockouts, door lock repairs and replacements handled personally. Call for the current ETA and agreed price basis — no VAT or separate call-out fee."
        showResponseTime={false}
      />

      {/* 2. Personal trust bar */}
      <div className="bg-[#F7F7F5] border-l-4 border-[#FFB800] py-5 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {GOOGLE_REVIEWS.rating != null && GOOGLE_REVIEWS.count != null ? (
              <>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-6 h-6 text-[#FFB800]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div>
                  <span className="font-bold text-[#0F1B2D] text-sm">{GOOGLE_REVIEWS.rating} out of 5</span>
                  <span className="text-gray-500 text-sm ml-1">({GOOGLE_REVIEWS.count} Google Reviews)</span>
                </div>
              </>
            ) : (
              <span className="font-bold text-[#0F1B2D] text-sm">Local independent locksmith — established in Coventry</span>
            )}
          </div>
          <div className="flex items-center gap-2 text-[#0F1B2D]">
            <svg className="w-5 h-5 text-[#FFB800]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="font-semibold text-sm">I answer personally — no call centre</span>
          </div>
          <a
            href="tel:+442475224730"
            className="bg-[#FFB800] text-[#0F1B2D] font-black text-lg px-6 py-2.5 rounded-full hover:bg-amber-400 transition-colors shadow-md"
          >
            024 7522 4730
          </a>
        </div>
      </div>

      {/* Direct Answer */}
      <section className="py-6 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <DirectAnswer
            question="Where can I check current Coventry locksmith prices?"
            answer="The published price list shows the starting scope for lockouts, lock changes, uPVC repairs, boarding and security upgrades. The confirmed total depends on the inspected lock, suitable method, parts and agreed work."
          />
          <p className="mt-3 text-sm text-gray-700">
            <Link href="/prices" className="font-bold underline decoration-[#FFB800] underline-offset-4 hover:text-[#8A5A00]">
              View current Coventry locksmith costs and prices
            </Link>
          </p>
        </div>
      </section>

      <section className="py-12 px-4 bg-[#F7F7F5]" aria-labelledby="mobile-locksmith-heading">
        <div className="max-w-3xl mx-auto">
          <h2 id="mobile-locksmith-heading" className="text-2xl md:text-3xl font-black text-[#0F1B2D] mb-4">
            Mobile Locksmith Callouts in Coventry
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            I provide a mobile locksmith service at the affected property. Call with the full
            address, exact entrance and observed symptoms; I confirm whether I can attend, the
            current ETA and the price basis before travelling.
          </p>
          <p className="text-gray-700 leading-relaxed">
            At the address, the fitted door, lock, condition and authority to enter are checked
            before a method and scope are agreed. Review the five advertised{' '}
            <Link href="/services" className="font-semibold underline decoration-[#FFB800] underline-offset-4 hover:text-[#8A5A00]">
              locksmith services
            </Link>{' '}
            and the{' '}
            <Link href="/areas" className="font-semibold underline decoration-[#FFB800] underline-offset-4 hover:text-[#8A5A00]">
              listed service areas
            </Link>
            {', then call to confirm the exact address and current availability.'}
          </p>
        </div>
      </section>

      {/* 3. Stats / numbers section */}
      <section className="bg-[#0F1B2D] py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: 'Live', label: 'ETA Confirmed by Phone' },
            { number: '24/7', label: 'Day or Night, 365 Days' },
            { number: '£59', label: 'Lockouts From' },
            { number: 'No VAT', label: 'Added to Agreed Prices' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-[#FFB800] text-4xl md:text-5xl font-black mb-2">{stat.number}</div>
              <div className="text-white text-sm md:text-base font-medium opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Credentials */}
      <CredentialsStrip />

      {/* 5. Services grid */}
      <section className="defer-render py-14 px-4 bg-[#F7F7F5]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-[#0F1B2D] mb-2 text-center">
            Locksmith Services in Coventry
          </h2>
          <p className="text-gray-600 text-center mb-10 max-w-xl mx-auto">
            From emergency lockouts to security upgrades — every job handled personally by me, your local Coventry locksmith.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. How It Works */}
      <section className="defer-render py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-[#0F1B2D] mb-3 text-center">
            How It Works
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-lg mx-auto">
            Three simple steps: speak directly, confirm the scope, then authorise the work.
          </p>
          <div className="relative">
            {/* Connecting line - desktop only */}
            <div className="hidden md:block absolute top-10 left-[calc(16.67%+20px)] right-[calc(16.67%+20px)] h-0.5 bg-gray-200" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
              {[
                {
                  step: '1',
                  title: 'Call Me',
                  desc: 'Call 024 7522 4730. I answer personally — day or night, 365 days a year.',
                },
                {
                  step: '2',
                  title: "I'm On My Way",
                  desc: 'I confirm the current ETA and the price basis for the problem described on the phone.',
                },
                {
                  step: '3',
                  title: 'Work Agreed',
                  desc: 'The inspected scope and price are agreed before work; any change needs your approval first.',
                },
              ].map((item) => (
                <div key={item.step} className="text-center relative">
                  <div className="relative z-10 w-16 h-16 rounded-full bg-[#FFB800] text-[#0F1B2D] font-black text-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-[#0F1B2D] text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-10">
            <a
              href="tel:+442475224730"
              className="inline-block bg-[#FFB800] text-[#0F1B2D] font-black text-lg px-8 py-3.5 rounded-full hover:bg-amber-400 transition-colors shadow-lg"
            >
              Call 024 7522 4730 Now
            </a>
          </div>
        </div>
      </section>

      {/* 7. Price table */}
      <div className="defer-render">
        <PriceTable />
      </div>

      {/* 8. 24 Hour section */}
      <section className="defer-render py-16 px-4 bg-[#0F1B2D] relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2.5 h-2.5 bg-[#FFB800] rounded-full" aria-hidden="true" />
            <span className="text-[#FFB800] font-semibold text-sm">24/7 service — call to confirm availability</span>
          </div>
          <div className="text-[#FFB800] text-7xl md:text-8xl font-black mb-4">24/7</div>
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
            24/7 Locksmith Availability in Coventry
          </h2>
          <p className="text-white/80 leading-relaxed text-lg max-w-2xl mx-auto mb-6">
            Call with the full postcode to confirm the exact address, current availability and ETA.
            The published starting-price basis does not add a night, weekend or bank-holiday
            premium; the itemised total still depends on the diagnosed scope and any parts.
          </p>
          <p className="text-white/80 leading-relaxed max-w-2xl mx-auto mb-6">
            Locked out now? Read the steps and scope on the{' '}
            <Link href="/services/emergency-lockout" prefetch={false} className="font-bold text-[#FFB800] underline underline-offset-4 hover:text-amber-300">
              emergency locksmith and lockout service page
            </Link>.
          </p>
          <a
            href="tel:+442475224730"
            className="inline-block text-2xl font-black text-[#FFB800] hover:text-amber-300 transition-colors"
          >
            024 7522 4730
          </a>
        </div>
      </section>

      {/* 9. Area grid */}
      <div className="defer-render">
        <AreaGrid />
      </div>

      {/* 10. Reviews / testimonials */}
      <section className="defer-render py-16 px-4 bg-[#F7F7F5]">
        <div className="max-w-5xl mx-auto">
          {/* Aggregate rating badge — renders only when real GBP figures are configured */}
          {GOOGLE_REVIEWS.rating != null && GOOGLE_REVIEWS.count != null && (
            <div className="text-center mb-10">
              <div className="inline-flex flex-col items-center bg-white rounded-2xl px-8 py-5 shadow-sm border border-gray-100">
                <div className="flex gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-7 h-7 text-[#FFB800]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-[#0F1B2D] font-black text-xl">{GOOGLE_REVIEWS.rating} out of 5 stars</span>
                {GOOGLE_REVIEWS.profileUrl ? (
                  <a href={GOOGLE_REVIEWS.profileUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 text-sm hover:text-[#0F1B2D] underline">
                    Based on {GOOGLE_REVIEWS.count} Google reviews
                  </a>
                ) : (
                  <span className="text-gray-500 text-sm">Based on {GOOGLE_REVIEWS.count} Google reviews</span>
                )}
              </div>
            </div>
          )}
          <h2 className="text-2xl md:text-3xl font-black text-[#0F1B2D] mb-4 text-center">
            Check Current Public Feedback
          </h2>
          <p className="text-gray-600 text-center max-w-xl mx-auto mb-8">
            Ratings and review extracts are not copied onto this site without a source record.
            {GOOGLE_REVIEWS.profileUrl
              ? ' Use the linked public profile to check the feedback currently attributed there.'
              : ' No public profile link is shown while its business identity details are being verified.'}
          </p>
          <div className="text-center">
            <Link
              href="/testimonials"
              className="inline-block bg-[#0F1B2D] text-white font-bold px-8 py-3.5 rounded-full hover:bg-[#162438] transition-colors"
            >
              Review Information
            </Link>
            {GOOGLE_REVIEWS.profileUrl && (
              <p className="mt-4">
                <a
                  href={GOOGLE_REVIEWS.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0F1B2D] text-sm font-semibold underline hover:text-[#FFB800]"
                >
                  See all reviews on Google
                </a>
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 11. Blog preview section */}
      <section className="defer-render py-14 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-[#0F1B2D] mb-2 text-center">
            Security Tips &amp; Advice
          </h2>
          <p className="text-gray-600 text-center mb-10 max-w-lg mx-auto">
            Source-aware guides to locks, security standards and practical decisions for Coventry homes.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                prefetch={false}
                className="group bg-[#F7F7F5] rounded-2xl p-6 border border-gray-100 hover:border-[#FFB800]/40 transition-colors"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-[#0F1B2D] text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {post.pillar}
                  </span>
                  <span className="text-gray-600 text-xs">{post.readTime}</span>
                </div>
                <h3 className="font-bold text-[#0F1B2D] text-base mb-2 group-hover:text-[#FFB800] transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/blog"
              prefetch={false}
              className="inline-flex items-center gap-1.5 text-[#0F1B2D] font-bold hover:text-[#FFB800] transition-colors text-sm"
            >
              View all articles
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 12. FAQ */}
      <div className="defer-render">
        <FAQSection
          faqs={homepageFaqs}
          footer={(
            <div className="text-center">
              <Link
                href="/faq"
                prefetch={false}
                className="font-bold text-[#0F1B2D] underline decoration-[#FFB800] underline-offset-4 hover:text-[#8A5A00]"
              >
                Read all locksmith FAQs
              </Link>
            </div>
          )}
        />
      </div>

      {/* Last updated */}
      <div className="text-center py-4 px-4 bg-white">
        <LastUpdated date={CONTENT_UPDATED} />
      </div>

      {/* 13. Quick area links */}
      <section className="defer-render py-10 px-4 bg-[#F7F7F5]">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-lg font-bold text-[#0F1B2D] mb-5 text-center">
            Quick Links — Main Towns I Cover
          </h3>
          <div className="flex flex-wrap justify-center gap-2.5">
            {[
              { href: '/areas/coventry-city-centre', label: 'Locksmith Coventry City Centre' },
              { href: '/areas/nuneaton', label: 'Locksmith Nuneaton' },
              { href: '/areas/rugby', label: 'Locksmith Rugby' },
              { href: '/areas/leamington-spa', label: 'Locksmith Leamington Spa' },
              { href: '/areas/warwick', label: 'Locksmith Warwick' },
              { href: '/areas/stratford-upon-avon', label: 'Locksmith Stratford' },
              { href: '/areas/kenilworth', label: 'Locksmith Kenilworth' },
              { href: '/areas/bedworth', label: 'Locksmith Bedworth' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch={false}
                className="bg-white border border-gray-200 hover:border-[#FFB800] hover:shadow-sm text-[#0F1B2D] px-5 py-2 rounded-full text-sm font-semibold transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 14. CTA */}
      <div className="defer-render">
        <CTABlock />
      </div>
    </>
  )
}
