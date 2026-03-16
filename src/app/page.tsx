import type { Metadata } from 'next'
import Link from 'next/link'
import HeroSection from '@/components/HeroSection'
import CTABlock from '@/components/CTABlock'
import FAQSection from '@/components/FAQSection'
import ServiceCard from '@/components/ServiceCard'
import AreaGrid from '@/components/AreaGrid'
import PriceTable from '@/components/PriceTable'
import SchemaMarkup from '@/components/SchemaMarkup'
import { SERVICES } from '@/data/services'
import { SITE_CONFIG } from '@/data/config'

export const metadata: Metadata = {
  title: 'Emergency Locksmith Coventry | 24/7 | No VAT | Call Now',
  description:
    "Emergency locksmith in Coventry. Locked out? I'll be there in 15-30 minutes. No VAT, no call-out fee. Call 07735 336175 now — available 24/7, 365 days.",
  alternates: {
    canonical: SITE_CONFIG.domain,
  },
  openGraph: {
    title: 'Emergency Locksmith Coventry | 24/7 | No VAT',
    description: 'Locked out in Coventry? Local independent locksmith, 15-30 min response. No VAT. Call 07735 336175.',
    url: SITE_CONFIG.domain,
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

export default function HomePage() {
  return (
    <>
      <SchemaMarkup schema={faqSchema} />

      <HeroSection
        heading="Emergency Locksmith Coventry"
        subheading="Locked out? I'll be there in 15-30 minutes. Local, independent — no VAT, no call-out fee, no hidden charges."
      />

      {/* Personal trust bar */}
      <div className="bg-green-50 border-b border-green-200 py-4 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-center text-sm">
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 text-xl leading-none">★★★★★</span>
            <span className="font-bold text-gray-800">5-Star Rated on Google</span>
          </div>
          <span className="hidden sm:block text-gray-300">|</span>
          <div className="flex items-center gap-2">
            <span className="text-lg">📱</span>
            <span className="font-bold text-gray-800">I answer personally — no call centre</span>
          </div>
          <span className="hidden sm:block text-gray-300">|</span>
          <div>
            <a href={`tel:${SITE_CONFIG.phoneTel}`} className="text-green-800 font-black text-lg hover:underline">
              {SITE_CONFIG.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Why choose us */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 text-center">
            Why Choose a Local Locksmith Over a Call Centre?
          </h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            When you call me, I answer. Not a call centre. Not a middleman. I&apos;m your local Coventry
            locksmith — I&apos;ll be at your door, not a stranger dispatched from a database.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '💷',
                title: 'No VAT',
                desc: 'You save 20% compared to bigger companies. The price I quote is the price you pay.',
              },
              {
                icon: '🚗',
                title: 'No Call-Out Fee',
                desc: 'Ever. I come to you, assess the job, and only charge if I complete it.',
              },
              {
                icon: '📍',
                title: "I'm Local",
                desc: "I'm based in Coventry, not a national call centre. I know the streets and I respond fast.",
              },
              {
                icon: '⏱️',
                title: '15-30 Min Response',
                desc: 'For most of Coventry I can be with you in 15-30 minutes. No van driving from Birmingham.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 text-center">
            Locksmith Services in Coventry
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Emergency and planned locksmith services across Coventry and Warwickshire
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing snapshot */}
      <PriceTable />

      {/* 24 Hour section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
            24 Hour Locksmith Coventry — Any Time, Any Day
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg max-w-2xl mx-auto mb-4">
            Locked out at 2am on Christmas morning? I&apos;ll answer. No premium for unsociable hours.
            No extra charge for weekends. Same price, always.
          </p>
          <p className="text-green-800 font-bold mb-2">
            Covering CV1, CV2, CV3, CV4, CV5, CV6, CV7 and all surrounding postcodes
          </p>
          <a
            href={`tel:${SITE_CONFIG.phoneTel}`}
            className="inline-block mb-6 text-2xl font-black text-orange-600 hover:underline"
          >
            {SITE_CONFIG.phone}
          </a>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            {[
              '✓ Midnight lockouts',
              '✓ Bank holidays',
              '✓ Christmas & New Year',
              '✓ Early morning',
              '✓ Sunday evenings',
              '✓ Any weather',
            ].map((item) => (
              <span key={item} className="bg-green-50 text-green-800 px-3 py-1 rounded-full font-medium">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Area grid */}
      <AreaGrid />

      {/* Reviews */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
            What Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                text: '"Locked out at 11pm — arrived within 20 minutes, had me back in within 10. No VAT, exact price quoted on the phone. Brilliant."',
                name: 'Sarah T., Earlsdon',
              },
              {
                text: '"Used twice now for lock changes after moving house. Fast, professional, and so much cheaper than the big national companies."',
                name: 'Mark R., Leamington Spa',
              },
              {
                text: '"Called at 7am when I locked myself out before work. He was there in 25 minutes. Knew exactly what he was doing. Highly recommend."',
                name: 'Dave H., Rugby',
              },
            ].map((review) => (
              <div key={review.name} className="bg-gray-50 rounded-xl p-6 text-left">
                <div className="text-yellow-500 text-xl mb-3">★★★★★</div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">{review.text}</p>
                <p className="text-gray-500 text-xs font-semibold">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection faqs={homepageFaqs} />

      {/* Quick links to main areas */}
      <section className="py-8 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-lg font-bold text-gray-700 mb-4 text-center">
            Quick Links — Main Towns I Cover
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
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
                className="bg-white border border-gray-200 hover:border-green-700 text-gray-700 hover:text-green-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABlock />
    </>
  )
}
