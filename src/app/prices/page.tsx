import type { Metadata } from 'next'
import Link from 'next/link'
import { SERVICE_PROVIDER_SCHEMA, SITE_CONFIG } from '@/data/config'
import CTABlock from '@/components/CTABlock'
import SchemaMarkup from '@/components/SchemaMarkup'
import DirectAnswer from '@/components/DirectAnswer'

export const metadata: Metadata = {
  title: 'Locksmith Prices Coventry | No VAT or Call-Out Fee',
  description:
    'Published Coventry locksmith from-prices and the factors that determine the agreed quote. Lockouts from £59; no VAT or separate call-out fee.',
  keywords: 'locksmith prices coventry, how much does a locksmith cost, emergency locksmith price coventry, lock change cost coventry, locksmith cost warwickshire, cheap locksmith coventry, locksmith no vat',
  alternates: {
    canonical: `${SITE_CONFIG.domain}/prices`,
  },
  openGraph: {
    type: 'website',
    siteName: 'Local Emergency Locksmith',
    locale: 'en_GB',
    title: 'Locksmith Prices Coventry | No VAT or Call-Out Fee',
    description:
      'Published Coventry locksmith from-prices and the factors that determine the agreed quote. Lockouts from £59; no VAT or separate call-out fee.',
    url: `${SITE_CONFIG.domain}/prices`,
    images: [{ url: `${SITE_CONFIG.domain}/api/og?title=${encodeURIComponent('Locksmith Prices — No VAT, No Call-Out Fee')}`, width: 1200, height: 630 }],
  },
}

const PRICES = [
  {
    service: 'Emergency lockout',
    price: 59,
    detail: 'Standard residential lockout where the assessed entry method and stated labour scope apply.',
  },
  {
    service: 'Euro cylinder replacement',
    price: 59,
    detail: 'Supply and fit a compatible euro cylinder where the inspected door, size and stated scope apply.',
  },
  {
    service: 'Yale nightlatch repair or replacement',
    price: 69,
    detail: 'Repair or replacement where the inspected door and compatible nightlatch allow the stated scope.',
  },
  {
    service: 'Lock change (BS3621-rated)',
    price: 79,
    detail: 'British Standard five-lever mortice deadlock. Check your own policy for the exact lock requirement.',
  },
  {
    service: 'Anti-snap euro cylinder',
    price: 59,
    detail: 'Supply and fit a compatible independently certified cylinder after the required size and door fit are checked.',
  },
  {
    service: 'uPVC lock repair',
    price: 59,
    detail: 'Repair of multipoint locking mechanism, cylinder, or handle on uPVC door.',
  },
  {
    service: 'uPVC multipoint gearbox replacement',
    price: 89,
    detail: 'Replacement gearbox where the exact mechanism is identified and a compatible part is available.',
  },
  {
    service: 'Boarding up (emergency)',
    price: 79,
    detail: 'Secure boarding of broken windows or doors after break-in or damage.',
  },
  {
    service: 'Window lock repair',
    price: 49,
    detail: 'Repair or replace espagnolette or cockspur locks on uPVC or timber windows.',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_CONFIG.domain },
    { '@type': 'ListItem', position: 2, name: 'Prices', item: `${SITE_CONFIG.domain}/prices` },
  ],
}

// Extends the homepage Organization node with the detailed price catalogue.
const offersSchema = {
  '@context': 'https://schema.org',
  ...SERVICE_PROVIDER_SCHEMA,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Locksmith Prices',
    itemListElement: PRICES.filter((p) => p.price > 0).map((p) => ({
      '@type': 'Offer',
      name: p.service,
      description: p.detail,
      priceSpecification: {
        '@type': 'PriceSpecification',
        minPrice: String(p.price),
        priceCurrency: 'GBP',
        valueAddedTaxIncluded: false,
        description: 'Advertised starting price; the final price depends on the diagnosed scope and agreed parts.',
      },
    })),
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do locksmith prices include VAT?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No VAT is added. The listed amounts are from-prices; I confirm the applicable scope and total before work proceeds.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a call-out fee?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No separate call-out fee is added to the agreed job price. I confirm the price basis by phone and agree any change in diagnosed scope before additional work proceeds.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do prices change at night or on weekends?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No — the prices listed apply 24 hours a day, 7 days a week, including bank holidays and Christmas Day. No premium for unsociable hours.',
      },
    },
  ],
}

export default function PricesPage() {
  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} />
      <SchemaMarkup schema={offersSchema} />
      <SchemaMarkup schema={faqSchema} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 py-3 text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-0" itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <Link href="/" prefetch={false} itemProp="item" className="hover:text-[#FFB800]"><span itemProp="name">Home</span></Link>
            <meta itemProp="position" content="1" />
          </li>
          <li className="mx-2" aria-hidden="true" role="presentation">›</li>
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <span><span itemProp="name" className="text-gray-800 font-medium">Prices</span></span>
            <meta itemProp="position" content="2" />
          </li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="py-12 px-4 text-white" style={{ background: '#0F1B2D' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-black mb-4">
            Locksmith Prices in Coventry
          </h1>
          <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
            No VAT or separate call-out fee. These are genuine starting prices; I confirm the
            applicable scope and total before work starts.
          </p>
          <a
            href={`tel:${SITE_CONFIG.phoneTel}`}
            className="inline-flex flex-col items-center bg-[#FFB800] hover:bg-[#FFC933] text-[#0F1B2D] px-8 py-4 rounded-xl font-black text-xl transition-colors shadow"
          >
            <span className="text-sm font-bold uppercase tracking-widest text-[#0F1B2D]/70">Get a Quote Now</span>
            <span className="text-2xl">{SITE_CONFIG.phone}</span>
          </a>
        </div>
      </section>

      <section className="py-6 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <DirectAnswer
            question="How much does a locksmith cost in Coventry?"
            answer="A standard residential lockout and a compatible euro-cylinder replacement each start from £59; a Yale nightlatch starts from £69, a BS3621-rated mortice option from £79, and emergency boarding from £79. The final quote depends on the lock, fault, parts and agreed scope. No VAT or separate call-out fee is added."
          />
        </div>
      </section>

      {/* Price table */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="bg-[#0F1B2D] text-white">
                  <th className="text-left px-6 py-4 font-bold">Service</th>
                  <th className="text-right px-6 py-4 font-bold whitespace-nowrap">Price From</th>
                </tr>
              </thead>
              <tbody>
                {PRICES.map((row, i) => (
                  <tr key={row.service} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">{row.service}</p>
                      <p className="text-sm text-gray-600 mt-1">{row.detail}</p>
                    </td>
                    <td className={`px-6 py-4 text-right font-black text-xl align-top pt-5 ${row.price === 0 ? 'text-green-700' : 'text-[#8A5A00]'}`}>
                      {row.price === 0 ? 'FREE' : `£${row.price}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 bg-[#F7F7F5] rounded-xl p-6 border border-gray-200">
            <h3 className="font-bold text-[#0F1B2D] text-lg mb-3">What these prices include:</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>✓ No VAT is added to the agreed price</li>
              <li>✓ No separate call-out fee added</li>
              <li>✓ Labour included within each stated starting scope</li>
              <li>✓ Parts included where stated</li>
              <li>✓ Same price 24/7 — no evening or weekend premium</li>
              <li>✓ Price basis confirmed on the phone before I come out</li>
            </ul>
          </div>

          <div className="mt-6 bg-[#0F1B2D] rounded-xl p-6 border border-[#162438]">
            <h3 className="font-bold text-[#FFB800] text-lg mb-2">Why no VAT?</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              As an independent sole trader, I am not VAT registered. This means I do not add 20% VAT to
              my prices. The published from-prices are shown without VAT additions; any part or scope that
              changes the quote is discussed before work begins.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing factors */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-gray-900 mb-3 text-center">What Affects the Final Locksmith Price?</h2>
          <p className="text-gray-600 text-center mb-6">
            Published prices are starting points. The quote depends on the actual fault and agreed work, not an unsupported comparison with another company.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: 'Lock and fault', text: 'The lock type, access method, wear, alignment, and damage determine what work is needed.' },
              { title: 'Parts required', text: 'A repair may need no replacement part; a new cylinder, mechanism, or complete lock changes the total.' },
              { title: 'Agreed scope', text: 'I explain what is included and confirm any change before carrying out extra work.' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="font-bold text-[#0F1B2D] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-4 text-gray-700 leading-relaxed">
            <p>
              I accept payment by <strong>cash or card</strong> — whatever is easiest for you. There is no
              surcharge for card payments. I can also provide a receipt and invoice for insurance claims or
              landlord records.
            </p>
            <p>
              Lock fittings come with the stated <strong>12-month guarantee</strong> on the supplied parts and
              fitting work. If a covered fault develops within that period, call so I can inspect it and apply
              the guarantee terms.
            </p>
            <p>
              There are <strong>no evening or weekend surcharges</strong> — the price is the same whether you
              call at 2pm on a Tuesday or 2am on Christmas Day. I do not charge extra for unsociable hours
              because emergencies do not wait for office hours.
            </p>
            <p>
              Every job has its <strong>price basis confirmed on the phone before I come out</strong>. The
              quote applies to the described and agreed scope. If inspection shows that different or extra
              work is needed, I stop, explain it and agree any revised price before proceeding.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-gray-900 mb-6 text-center">Price FAQs</h2>
          <div className="space-y-4">
            {[
              {
                q: 'What if the job takes longer than expected?',
                a: 'I agree the price for the diagnosed scope before work starts. If inspection or work exposes a different fault, part or additional scope, I stop, explain it and seek approval for the revised price before continuing.',
              },
              {
                q: 'Do you charge more for more expensive properties?',
                a: 'The property value is not a pricing factor. The quote depends on the actual lock, fault, access, agreed work and parts; different entrances can require different scopes regardless of property type.',
              },
              {
                q: 'Do prices include parts?',
                a: 'A replacement part is included only where the quote states it. A lockout may need no part, while a diagnosed repair or replacement may need one; I identify exactly what is included before work starts.',
              },
            ].map((faq) => (
              <div key={faq.q} className="bg-white rounded-lg border border-gray-200 p-6">
                <p className="font-semibold text-gray-900 mb-2">{faq.q}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABlock />
    </>
  )
}
