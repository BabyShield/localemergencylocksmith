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
import { SERVICES } from '@/data/services'
import { SITE_CONFIG, CONTENT_UPDATED, GOOGLE_REVIEWS } from '@/data/config'
import { ALL_BLOG_POSTS } from '@/data/blog-posts'

export const metadata: Metadata = {
  title: 'Emergency Locksmith Coventry | 24/7 Local Locksmith | No VAT | From £59',
  description:
    "Emergency locksmith in Coventry & Warwickshire. Locked out? I'll be there in 15-30 minutes. No VAT, no call-out fee. Call 024 7522 4730 now — 24/7, 365 days.",
  keywords: 'emergency locksmith coventry, locksmith coventry, locksmith near me coventry, 24/7 locksmith coventry, locked out coventry, locksmith warwickshire, local locksmith coventry, cheap locksmith coventry',
  alternates: {
    canonical: SITE_CONFIG.domain,
  },
  openGraph: {
    type: 'website',
    title: 'Emergency Locksmith Coventry | 24/7 | No VAT | From £59',
    description: 'Locked out in Coventry? Local independent locksmith, 15-30 min response. No VAT, no call-out fee. Call 024 7522 4730.',
    url: SITE_CONFIG.domain,
    images: [{ url: `${SITE_CONFIG.domain}/og-image.png`, width: 1200, height: 630 }],
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How quickly can a locksmith arrive in Coventry?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "I aim to be with you within 15-30 minutes across most of Coventry. For outlying areas like Stratford or Alcester, allow 35-45 minutes. I'll give you an honest arrival time when you call.",
      },
    },
    {
      '@type': 'Question',
      name: 'Do you charge VAT on locksmith services?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No — I do not charge VAT. This saves you 20% compared to larger companies. The price I quote is the total price, nothing added on top.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a call-out fee?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. There is never a call-out fee. You only pay if I complete the job — and I always confirm the full price before I start.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does an emergency locksmith cost in Coventry?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An emergency lockout starts from £59 including labour. A lock change starts from £69. No VAT, no call-out fee, no extra charge for evenings or weekends.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you work on weekends and bank holidays?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — 24 hours a day, 7 days a week, 365 days a year including Christmas Day. The price is always the same.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are you insured?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes — fully insured for public liability. I'm a local independent locksmith, not a call centre. You know exactly who is coming.",
      },
    },
  ],
}

const homepageFaqs = [
  {
    q: 'How quickly can a locksmith arrive in Coventry?',
    a: "I aim to be with you within 15-30 minutes across most of Coventry. For outlying areas like Stratford or Alcester, allow 35-45 minutes. I'll give you an honest arrival time when you call.",
  },
  {
    q: 'Do you charge VAT on locksmith services?',
    a: 'No — I do not charge VAT. This saves you 20% compared to larger companies. The price I quote is the total price, nothing added on top.',
  },
  {
    q: 'Is there a call-out fee?',
    a: 'No. There is never a call-out fee. You only pay if I complete the job — and I always confirm the full price before I start.',
  },
  {
    q: 'What does an emergency locksmith cost in Coventry?',
    a: 'An emergency lockout starts from £59 including labour. A lock change starts from £69. No VAT, no call-out fee, no extra charge for evenings or weekends.',
  },
  {
    q: 'Do you work on weekends and bank holidays?',
    a: 'Yes — 24 hours a day, 7 days a week, 365 days a year including Christmas Day. The price is always the same.',
  },
  {
    q: 'Are you insured?',
    a: "Yes — fully insured for public liability. I'm a local independent locksmith, not a call centre. You know exactly who is coming.",
  },
]

const latestPosts = ALL_BLOG_POSTS.slice(0, 3)

export default function HomePage() {
  return (
    <>
      <SchemaMarkup schema={faqSchema} />

      {/* 1. Hero */}
      <HeroSection
        heading="Emergency Locksmith Coventry"
        subheading="Locked out? I'll be there in 15-30 minutes. Local, independent — no VAT, no call-out fee, no hidden charges."
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
            question="How much does an emergency locksmith cost in Coventry?"
            answer="An emergency locksmith in Coventry costs from £59 for a standard lockout. This includes labour with no VAT and no call-out fee. Response time is 15 to 30 minutes across most of Coventry. The same price applies 24 hours a day, 7 days a week, including bank holidays."
          />
        </div>
      </section>

      {/* 3. Stats / numbers section */}
      <section className="bg-[#0F1B2D] py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: '15-30', label: 'Minutes Average Response' },
            { number: '24/7', label: 'Day or Night, 365 Days' },
            { number: '£59', label: 'Lockouts From' },
            { number: '0%', label: 'VAT Charged — Ever' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-[#FFB800] text-4xl md:text-5xl font-black mb-2">{stat.number}</div>
              <div className="text-white text-sm md:text-base font-medium opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Why choose a local locksmith */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-[#0F1B2D] mb-3 text-center">
            Why Choose a Local Locksmith Over a Call Centre?
          </h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto leading-relaxed">
            When you call me, I answer. Not a call centre. Not a middleman. I&apos;m your local Coventry
            locksmith — I&apos;ll be at your door, not a stranger dispatched from a database.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '💷',
                title: 'No VAT',
                desc: 'You save 20% compared to bigger companies. The price I quote is the price you pay — no surprises at the door.',
              },
              {
                icon: '🚗',
                title: 'No Call-Out Fee',
                desc: 'Ever. I come to you, assess the job, and only charge if I complete it. Zero risk to you.',
              },
              {
                icon: '📍',
                title: "I'm Local",
                desc: "I'm based in Coventry, not a national call centre. I know the streets, the housing stock, and I respond fast.",
              },
              {
                icon: '⏱️',
                title: '15-30 Min Response',
                desc: 'For most of Coventry I can be with you in 15-30 minutes. No van driving across from Birmingham.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-[#162438] rounded-2xl p-7 text-center border border-white/10 hover:border-[#FFB800]/30 transition-colors"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-[#FFB800] text-lg mb-3">{item.title}</h3>
                <p className="text-white/90 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Services grid */}
      <section className="py-14 px-4 bg-[#F7F7F5]">
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
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-[#0F1B2D] mb-3 text-center">
            How It Works
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-lg mx-auto">
            Three simple steps from locked out to problem solved. No middlemen, no surprises.
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
                  desc: 'I give you a firm price on the phone and an honest arrival time. No surprises.',
                },
                {
                  step: '3',
                  title: 'Problem Solved',
                  desc: 'Door open, lock changed, or security upgraded. Pay the price I quoted — nothing more.',
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
      <PriceTable />

      {/* 8. 24 Hour section */}
      <section className="py-16 px-4 bg-[#0F1B2D] relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 font-semibold text-sm">Available Now</span>
          </div>
          <div className="text-[#FFB800] text-7xl md:text-8xl font-black mb-4">24/7</div>
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
            Emergency Locksmith Coventry — Any Time, Any Day
          </h2>
          <p className="text-white/80 leading-relaxed text-lg max-w-2xl mx-auto mb-6">
            Locked out at 2am on Christmas morning? I&apos;ll answer. No premium for unsociable hours.
            No extra charge for weekends or bank holidays. Same price, always.
          </p>
          <a
            href="tel:+442475224730"
            className="inline-block mb-8 text-2xl font-black text-[#FFB800] hover:text-amber-300 transition-colors"
          >
            024 7522 4730
          </a>
          <p className="text-white/70 font-medium mb-4 text-sm">Covering all Coventry and Warwickshire postcodes:</p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {['CV1', 'CV2', 'CV3', 'CV4', 'CV5', 'CV6', 'CV7'].map((code) => (
              <span key={code} className="bg-[#FFB800]/15 text-[#FFB800] border border-[#FFB800]/30 px-4 py-1.5 rounded-full font-bold text-sm">
                {code}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            {[
              'Midnight lockouts',
              'Bank holidays',
              'Christmas & New Year',
              'Early morning',
              'Sunday evenings',
              'Any weather',
            ].map((item) => (
              <span key={item} className="bg-white/10 text-white px-4 py-1.5 rounded-full font-medium">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Area grid */}
      <AreaGrid />

      {/* 10. Reviews / testimonials */}
      <section className="py-16 px-4 bg-[#F7F7F5]">
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
            What Coventry Customers Say
          </h2>
          <p className="text-gray-600 text-center max-w-xl mx-auto mb-8">
            Every job is done personally by me — read what customers across Coventry
            and Warwickshire say about the service.
          </p>
          <div className="text-center">
            <Link
              href="/testimonials"
              className="inline-block bg-[#0F1B2D] text-white font-bold px-8 py-3.5 rounded-full hover:bg-[#162438] transition-colors"
            >
              Read Customer Reviews
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
      <section className="py-14 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-[#0F1B2D] mb-2 text-center">
            Security Tips &amp; Advice
          </h2>
          <p className="text-gray-600 text-center mb-10 max-w-lg mx-auto">
            Practical locksmith advice from someone who works on Coventry doors every day.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-[#F7F7F5] rounded-2xl p-6 border border-gray-100 hover:border-[#FFB800]/40 transition-colors"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-[#0F1B2D] text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {post.pillar}
                  </span>
                  <span className="text-gray-400 text-xs">{post.readTime}</span>
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
      <FAQSection faqs={homepageFaqs} />

      {/* Multi-language emergency */}
      <section className="py-8 px-4 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
            Emergency? I can help.
          </h3>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm">
            <p lang="pl" className="text-gray-600">
              <span className="font-bold text-gray-800">Zamknięty?</span> Zadzwoń teraz:{' '}
              <a href="tel:+442475224730" className="font-black text-[#0F1B2D]">024 7522 4730</a>
            </p>
            <p lang="ro" className="text-gray-600">
              <span className="font-bold text-gray-800">Blocat afară?</span> Sunați acum:{' '}
              <a href="tel:+442475224730" className="font-black text-[#0F1B2D]">024 7522 4730</a>
            </p>
            <p lang="ur" dir="rtl" className="text-gray-600">
              <span className="font-bold text-gray-800">ایمرجنسی؟</span> ابھی کال کریں:{' '}
              <a href="tel:+442475224730" className="font-black text-[#0F1B2D]">024 7522 4730</a>
            </p>
            <p lang="hi" className="text-gray-600">
              <span className="font-bold text-gray-800">बंद हो गए?</span> अभी कॉल करें:{' '}
              <a href="tel:+442475224730" className="font-black text-[#0F1B2D]">024 7522 4730</a>
            </p>
          </div>
        </div>
      </section>

      {/* Last updated */}
      <div className="text-center py-4 px-4 bg-white">
        <LastUpdated date={CONTENT_UPDATED} />
      </div>

      {/* 13. Quick area links */}
      <section className="py-10 px-4 bg-[#F7F7F5]">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-lg font-bold text-[#0F1B2D] mb-5 text-center">
            Quick Links — Main Towns I Cover
          </h3>
          <div className="flex flex-wrap justify-center gap-2.5">
            {[
              { href: '/areas/coventry-city-centre', label: 'Locksmith Coventry' },
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
                className="bg-white border border-gray-200 hover:border-[#FFB800] hover:shadow-sm text-[#0F1B2D] px-5 py-2 rounded-full text-sm font-semibold transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 14. CTA */}
      <CTABlock />
    </>
  )
}
