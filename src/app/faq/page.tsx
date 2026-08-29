import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_CONFIG } from '@/data/config'
import SchemaMarkup from '@/components/SchemaMarkup'
import CTABlock from '@/components/CTABlock'
import FAQSection from '@/components/FAQSection'

export const metadata: Metadata = {
  title: 'Coventry Locksmith FAQ | Prices, ETA & Areas',
  description:
    'Coventry locksmith questions answered: published from-prices, how the current ETA is confirmed, services and the 78 listed coverage locations.',
  keywords: 'locksmith faq coventry, how much does a locksmith cost coventry, emergency locksmith price coventry, locksmith response time coventry, coventry locksmith questions',
  alternates: {
    canonical: `${SITE_CONFIG.domain}/faq`,
  },
  openGraph: {
    type: 'website',
    siteName: 'Local Emergency Locksmith',
    locale: 'en_GB',
    title: 'Coventry Locksmith FAQ | Prices, ETA & Areas',
    description: 'Published from-prices, current ETA guidance, services and the listed Coventry-area coverage locations.',
    url: `${SITE_CONFIG.domain}/faq`,
    images: [{ url: `${SITE_CONFIG.domain}/api/og?title=${encodeURIComponent('Locksmith FAQ — Prices, Response Times & Areas')}`, width: 1200, height: 630 }],
  },
}

const pricingFaqs = [
  {
    q: 'How much does it cost if I\'m locked out?',
    a: 'Emergency lockout starts from £59. I confirm the price basis for the described scope before attending. If inspection changes the diagnosis, method or parts required, I explain and agree any revised price before work proceeds. No VAT or separate call-out fee is added.',
  },
  {
    q: 'How much does a lock change cost?',
    a: 'A compatible euro-cylinder replacement starts from £59, a Yale nightlatch from £69 and a BS3621-rated mortice option from £79. These prices include the stated lock and fitting. I confirm the suitable part and agreed scope before work starts; your insurer must confirm any exact policy requirement.',
  },
  {
    q: 'How much does a uPVC lock repair cost?',
    a: 'uPVC lock repair starts from £59 for an agreed repair scope; a compatible multipoint gearbox replacement starts from £89. Cylinder, handle, alignment and mechanism faults can require different work, so I confirm the diagnosis, included parts and price before starting.',
  },
  {
    q: 'Do you charge VAT?',
    a: 'No. I am not VAT-registered, so no VAT is added. The agreed price can change only if inspection changes the scope and you approve the revised work and price first.',
  },
  {
    q: 'Is there a call-out fee?',
    a: 'No separate call-out fee is added to the agreed work price. I explain the known price basis before travelling; if inspection changes the diagnosis, scope or parts required, I explain and agree the revised work and price before it proceeds.',
  },
  {
    q: 'Do you charge extra for evenings, weekends, or bank holidays?',
    a: 'No. My prices are the same 24 hours a day, 7 days a week, 365 days a year. There\'s no premium for unsociable hours — a lockout at 3am costs the same as one at 3pm.',
  },
]

const responseTimeFaqs = [
  {
    q: 'How quickly can you get to me?',
    a: 'I confirm the current arrival estimate when you call, using my actual starting point and your full address. Traffic and an earlier job can change it, so this site does not publish a fixed journey-time promise.',
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
    a: 'I assess common residential nightlatches, mortice locks, euro and rim cylinders, multipoint systems and identifiable smart-lock installations. The exact product, fault and compatible-part availability determine whether work can be completed in one visit.',
  },
  {
    q: 'Can you get in without damaging my lock?',
    a: 'I assess an appropriate non-destructive method first where the lock, door and circumstances allow, but no damage outcome can be guaranteed from a phone description. If drilling or replacement becomes necessary, I explain why and confirm the revised scope and price before proceeding.',
  },
  {
    q: 'Can you fit a lock named in my written insurance policy?',
    a: 'I can identify marked BS3621 mortice locks and independently certified cylinder options, then assess whether the product suits the actual door. Your insurer must confirm what its exact written wording requires and whether any change affects cover.',
  },
  {
    q: 'Do you repair uPVC doors and windows?',
    a: 'Yes. I diagnose uPVC multipoint mechanisms, gearboxes, handles, hinges and euro cylinders. A stiff door, failed lock or loose handle can have several causes, so inspection and compatible-part availability determine whether adjustment, repair or replacement can be completed during the attendance.',
  },
  {
    q: 'Do you offer emergency boarding up?',
    a: 'Yes. After police evidence instructions are satisfied, I can assess temporary boarding for a broken door or window. The method depends on the opening and safe fixing points; it reduces immediate access and exposure while permanent repair is arranged. Prices start from £79.',
  },
]

const trustFaqs = [
  {
    q: 'What should I check before allowing locksmith work?',
    a: 'Confirm who is attending, the phone number, the authority needed for the affected entrance, the proposed scope and the price basis. Ask to see any current identity, training or insurance evidence that matters to your decision before granting access.',
  },
  {
    q: 'Does a website badge prove a locksmith\'s credentials?',
    a: 'No. A badge or claim on a website is not evidence by itself. Ask for current documentation relevant to the booking and check that the attending person and agreed business details match.',
  },
  {
    q: 'How do I verify who is attending?',
    a: 'Confirm the attending name and phone number when booking, then ask to see matching identification before granting access. If anything does not match what was agreed, pause and call 024 7522 4730 before work starts.',
  },
  {
    q: 'How do I spot a rogue locksmith?',
    a: 'Before booking, ask who will attend, how the price is calculated, what identification or insurance evidence is available, and whether any destructive work will need separate approval. Treat unexplained price changes, pressure to proceed, or drilling without a clear reason as warning signs; no single checklist proves that a trader is legitimate.',
  },
]

const areasFaqs = [
  {
    q: 'Which postcodes do you cover?',
    a: 'The area directory lists 78 towns, suburbs and villages, and each entry shows its recorded outward postcode. An outward postcode alone does not confirm every address in that district, so use the individual area guide or call with the full postcode to confirm coverage.',
  },
  {
    q: 'How far will you travel?',
    a: 'Coverage follows the locations listed in the area directory rather than a promised radius or county-wide claim. Call with the full address so I can confirm address-level coverage and the current ETA.',
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
            <Link href="/" prefetch={false} itemProp="item" className="hover:text-[#0F1B2D] transition-colors"><span itemProp="name">Home</span></Link>
            <meta itemProp="position" content="1" />
          </li>
          <li className="mx-2" aria-hidden="true" role="presentation">›</li>
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
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#0F1B2D] mb-1">
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
