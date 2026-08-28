import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_CONFIG } from '@/data/config'
import SchemaMarkup from '@/components/SchemaMarkup'
import CTABlock from '@/components/CTABlock'
import FAQSection from '@/components/FAQSection'

export const metadata: Metadata = {
  title: 'Coventry Locksmith FAQ | Prices, Response & Areas',
  description:
    'Locksmith questions answered: How much does an emergency locksmith cost in Coventry? How fast? Which areas? No VAT, no call-out fee. Call 024 7522 4730.',
  keywords: 'locksmith faq coventry, how much does a locksmith cost coventry, emergency locksmith price coventry, locksmith response time coventry, coventry locksmith questions',
  alternates: {
    canonical: `${SITE_CONFIG.domain}/faq`,
  },
  openGraph: {
    type: 'website',
    siteName: 'Local Emergency Locksmith',
    locale: 'en_GB',
    title: 'Coventry Locksmith FAQ | Prices, Response & Areas',
    description: 'Everything you need to know about emergency locksmith pricing, response times, and areas covered in Coventry.',
    url: `${SITE_CONFIG.domain}/faq`,
    images: [{ url: `${SITE_CONFIG.domain}/api/og?title=${encodeURIComponent('Locksmith FAQ — Prices, Response Times & Areas')}`, width: 1200, height: 630 }],
  },
}

const pricingFaqs = [
  {
    q: 'How much does it cost if I\'m locked out?',
    a: 'Emergency lockout starts from £59. This includes non-destructive entry using specialist tools. The exact price is confirmed on the phone before I attend — no surprises at the door. No VAT, no call-out fee.',
  },
  {
    q: 'How much does a lock change cost?',
    a: 'A lock change starts from £69, which includes a quality replacement lock and fitting. If you need a British Standard lock for insurance purposes, I\'ll let you know the cost on the phone before I set off.',
  },
  {
    q: 'How much does a uPVC lock repair cost?',
    a: 'uPVC lock repairs start from £59. This covers gearbox replacements, handle repairs, and multipoint locking mechanism issues. The exact cost depends on the parts needed, which I\'ll confirm before starting work.',
  },
  {
    q: 'Do you charge VAT?',
    a: 'No. I\'m a sole trader below the VAT threshold, so no VAT is added. The price I quote is the price you pay.',
  },
  {
    q: 'Is there a call-out fee?',
    a: 'No. I never charge a call-out fee. You only pay if I complete the job. If I can\'t fix the problem, you don\'t pay a penny.',
  },
  {
    q: 'Do you charge extra for evenings, weekends, or bank holidays?',
    a: 'No. My prices are the same 24 hours a day, 7 days a week, 365 days a year. There\'s no premium for unsociable hours — a lockout at 3am costs the same as one at 3pm.',
  },
]

const responseTimeFaqs = [
  {
    q: 'How quickly can you get to me?',
    a: 'For most of Coventry, I can be with you in 15-30 minutes. For surrounding areas like Nuneaton, Bedworth, Rugby, and Leamington Spa, allow 20-45 minutes depending on your exact location. I always give you an honest arrival time on the phone.',
  },
  {
    q: 'What areas do you cover?',
    a: 'I cover the locations listed on this site across Coventry and nearby parts of Warwickshire and Solihull, including Nuneaton, Bedworth, Rugby, Leamington Spa, Warwick, Kenilworth, and Stratford-upon-Avon. Call with your full postcode to confirm the exact address and current ETA.',
  },
  {
    q: 'Are you really available 24/7?',
    a: 'Yes. I\'m available 24 hours a day, 7 days a week, 365 days a year — including Christmas Day, New Year\'s Eve, and bank holidays. When you call, you speak directly to me, not a call centre.',
  },
]

const servicesFaqs = [
  {
    q: 'What types of locks can you work with?',
    a: 'I work with all common lock types including Yale, mortice, euro cylinder, rim cylinders, multipoint locking systems, and smart locks. I carry a wide range of stock locks in the van so most jobs can be completed in a single visit.',
  },
  {
    q: 'Can you get in without damaging my lock?',
    a: 'In most cases, yes. I use non-destructive entry techniques wherever possible — specialist tools that open your lock without damaging it. This means you can often keep your existing lock and just need a spare key cut. If the lock does need replacing, I\'ll explain why and confirm the cost before proceeding.',
  },
  {
    q: 'Can you fit insurance-approved locks?',
    a: 'Yes. I fit British Standard BS3621 mortice locks and TS007 3-star euro cylinders that meet insurance requirements. If your insurer has asked you to upgrade your locks, I can advise on the right lock and fit it the same day.',
  },
  {
    q: 'Do you repair uPVC doors and windows?',
    a: 'Yes. I repair and replace uPVC multipoint locking mechanisms, gearboxes, handles, hinges, and euro cylinders. If your uPVC door is stiff, not locking properly, or the handle is loose, I can usually fix it on the spot.',
  },
  {
    q: 'Do you offer emergency boarding up?',
    a: 'Yes. If your window or door has been broken — whether from a break-in, storm damage, or accident — I can board it up securely to protect your property until a permanent repair is arranged. Boarding up starts from £79.',
  },
]

const trustFaqs = [
  {
    q: 'Are you insured?',
    a: 'Yes. I carry full public liability insurance covering all work I carry out. This protects you in the unlikely event that any damage occurs during a job.',
  },
  {
    q: 'Are you DBS checked?',
    a: 'Yes. I hold an enhanced DBS (Disclosure and Barring Service) check, which means I\'ve been vetted by the government to work in people\'s homes. I\'m happy to show you my DBS certificate on arrival.',
  },
  {
    q: 'Will you show ID when you arrive?',
    a: 'Yes. I always carry identification and will show it when I arrive. I\'ll also arrive in a clearly marked vehicle. If you\'re ever unsure, call me back on 024 7522 4730 to confirm it\'s me at your door.',
  },
  {
    q: 'How do I spot a rogue locksmith?',
    a: 'Watch out for these warning signs: they won\'t give a fixed price on the phone, they quote one price and charge more at the door, they insist on drilling your lock when it isn\'t necessary, they can\'t show ID or insurance, and their website has no real address. A genuine locksmith will always confirm the price before attending and show ID on arrival.',
  },
]

const areasFaqs = [
  {
    q: 'Which postcodes do you cover?',
    a: 'I cover CV1 through CV37, which includes all of Coventry, Nuneaton, Bedworth, Rugby, Leamington Spa, Warwick, Kenilworth, Stratford-upon-Avon, and surrounding villages. I also cover parts of B46 and B76 on the Coventry/Birmingham border.',
  },
  {
    q: 'How far will you travel?',
    a: 'I cover a roughly 25-mile radius from Coventry city centre. This takes in all of Warwickshire and parts of the West Midlands. If you\'re on the edge of my area, just call and I\'ll let you know if I can reach you.',
  },
  {
    q: 'Do you cover student areas like Canley and Earlsdon?',
    a: 'I cover listed Coventry locations including Canley, Earlsdon, Stoke, Tile Hill, and the city centre. Call with the full postcode and describe the private or communal entrance so I can confirm coverage, authority requirements, and the current ETA.',
  },
]

const allFaqs = [
  ...pricingFaqs,
  ...responseTimeFaqs,
  ...servicesFaqs,
  ...trustFaqs,
  ...areasFaqs,
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: allFaqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a,
    },
  })),
}

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
      name: 'FAQ',
      item: `${SITE_CONFIG.domain}/faq`,
    },
  ],
}

export default function FAQPage() {
  return (
    <>
      <SchemaMarkup schema={faqSchema} />
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
            <span><span itemProp="name" className="text-[#0F1B2D] font-medium">FAQ</span></span>
            <meta itemProp="position" content="2" />
          </li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-black text-[#0F1B2D] mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 text-lg max-w-xl mx-auto mb-2">
            Everything you need to know about my locksmith services in Coventry and Warwickshire.
          </p>
          <p className="text-gray-500 text-sm">
            Can&apos;t find your answer? Call{' '}
            <a
              href={`tel:${SITE_CONFIG.phoneTel}`}
              className="font-black text-[#0F1B2D] hover:text-[#FFB800] transition-colors"
            >
              {SITE_CONFIG.phone}
            </a>
            {' '}and I&apos;ll answer directly.
          </p>
        </div>
      </section>

      {/* Quick Jump Links */}
      <section className="px-4 pb-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { label: 'Pricing', id: 'pricing' },
              { label: 'Response Times', id: 'response-times' },
              { label: 'Services', id: 'services' },
              { label: 'Trust & Safety', id: 'trust-safety' },
              { label: 'Areas', id: 'areas' },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="px-4 py-2 bg-[#F7F7F5] hover:bg-[#0F1B2D] hover:text-white text-[#0F1B2D] rounded-lg text-sm font-bold transition-colors border border-gray-200 hover:border-[#0F1B2D]"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing FAQs */}
      <div id="pricing">
        <FAQSection faqs={pricingFaqs} heading="Pricing" />
      </div>

      {/* Response Times FAQs */}
      <div id="response-times" className="bg-white">
        <FAQSection faqs={responseTimeFaqs} heading="Response Times" />
      </div>

      {/* Services FAQs */}
      <div id="services">
        <FAQSection faqs={servicesFaqs} heading="Services" />
      </div>

      {/* Trust & Safety FAQs */}
      <div id="trust-safety" className="bg-white">
        <FAQSection faqs={trustFaqs} heading="Trust & Safety" />
      </div>

      {/* Areas FAQs */}
      <div id="areas">
        <FAQSection faqs={areasFaqs} heading="Areas I Cover" />
      </div>

      {/* Click-to-Call CTA */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-[#0F1B2D] rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-black text-white mb-3">
              Still have a question?
            </h2>
            <p className="text-white/70 mb-6">
              Call me directly and I&apos;ll answer straight away. No call centre, no waiting.
            </p>
            <a
              href={`tel:${SITE_CONFIG.phoneTel}`}
              className="inline-flex flex-col items-center bg-[#FFB800] hover:bg-[#FFC933] text-[#0F1B2D] px-10 py-5 rounded-2xl font-black transition-all duration-200 shadow-[0_4px_24px_rgba(255,184,0,0.3)] hover:shadow-[0_4px_40px_rgba(255,184,0,0.5)] hover:scale-[1.02]"
            >
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#0F1B2D]/60 mb-1">
                Call Now — 24/7
              </span>
              <span className="text-2xl md:text-3xl">{SITE_CONFIG.phone}</span>
            </a>
          </div>
        </div>
      </section>

      <CTABlock />
    </>
  )
}
