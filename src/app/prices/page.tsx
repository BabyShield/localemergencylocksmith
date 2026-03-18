import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_CONFIG } from '@/data/config'
import CTABlock from '@/components/CTABlock'
import SchemaMarkup from '@/components/SchemaMarkup'

export const metadata: Metadata = {
  title: 'Locksmith Prices Coventry | Transparent Pricing | No VAT | No Call-Out Fee',
  description:
    'Clear locksmith prices for Coventry and Warwickshire. Emergency lockout from £59. No VAT, no call-out fee, no hidden charges. Call 07735 336175.',
  alternates: {
    canonical: `${SITE_CONFIG.domain}/prices`,
  },
  openGraph: {
    title: 'Locksmith Prices Coventry | Transparent Pricing | No VAT | No Call-Out Fee',
    description:
      'Clear locksmith prices for Coventry and Warwickshire. Emergency lockout from £59. No VAT, no call-out fee, no hidden charges. Call 07735 336175.',
    url: `${SITE_CONFIG.domain}/prices`,
  },
}

const PRICES = [
  {
    service: 'Emergency lockout',
    price: 59,
    detail: 'Standard residential lockout using non-destructive entry. Includes first 30 minutes of labour.',
  },
  {
    service: 'Lock change (standard)',
    price: 69,
    detail: 'Supply and fit a new cylinder or Yale lock. Includes one set of keys.',
  },
  {
    service: 'Lock change (BS3621 insurance-approved)',
    price: 79,
    detail: 'British Standard five-lever mortice deadlock — required by most home insurance policies.',
  },
  {
    service: 'uPVC lock repair',
    price: 59,
    detail: 'Repair of multipoint locking mechanism, cylinder, or handle on uPVC door.',
  },
  {
    service: 'uPVC lock replacement',
    price: 89,
    detail: 'Full replacement of multipoint lock gearbox or new euro cylinder. Includes new keys.',
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
  {
    service: 'Security survey',
    price: 0,
    detail: 'Free assessment of all external doors and windows with security recommendations.',
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

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do locksmith prices include VAT?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No — all prices listed are the final price with no VAT added. This saves you 20% compared to companies that charge VAT on top.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a call-out fee?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No — there is never a call-out fee. You only pay if I complete the job, and the price I quote on the phone is the price you pay.',
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
      <SchemaMarkup schema={faqSchema} />

      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 py-3 text-sm text-gray-500">
        <Link href="/" className="hover:text-[#FFB800]">Home</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-800 font-medium">Prices</span>
      </nav>

      {/* Hero */}
      <section className="py-12 px-4 text-white" style={{ background: '#0F1B2D' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-black mb-4">
            Transparent Locksmith Prices
          </h1>
          <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
            No VAT. No call-out fee. No &ldquo;call for a quote&rdquo; — just real prices. The price you see
            is the price you pay.
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
                      <p className="text-sm text-gray-500 mt-1">{row.detail}</p>
                    </td>
                    <td className={`px-6 py-4 text-right font-black text-xl align-top pt-5 text-[#FFB800]`}>
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
              <li>✓ No VAT — all prices are the final total</li>
              <li>✓ No call-out fee — ever</li>
              <li>✓ Labour included in all prices</li>
              <li>✓ Parts included where stated</li>
              <li>✓ Same price 24/7 — no evening or weekend premium</li>
              <li>✓ Price confirmed on the phone before I come out</li>
            </ul>
          </div>

          <div className="mt-6 bg-[#0F1B2D] rounded-xl p-6 border border-[#162438]">
            <h3 className="font-bold text-[#FFB800] text-lg mb-2">Why no VAT?</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              As an independent sole trader, I am not VAT registered. This means I do not add 20% VAT to
              my prices. A national company charging £59 + VAT is actually charging you £70.80. My £59 is
              £59 — no additions, no surprises.
            </p>
          </div>
        </div>
      </section>

      {/* Us vs National Companies */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-gray-900 mb-6 text-center">Us vs National Companies</h2>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <table className="w-full">
              <caption className="px-6 py-3 text-sm text-gray-500 bg-gray-50 text-left">
                Price comparison: Local Emergency Locksmith vs national locksmith companies (2026)
              </caption>
              <thead>
                <tr className="bg-[#0F1B2D] text-white">
                  <th className="text-left px-4 py-3 font-bold text-sm">Service</th>
                  <th className="text-right px-4 py-3 font-bold text-sm">Our Price</th>
                  <th className="text-right px-4 py-3 font-bold text-sm">National Company</th>
                  <th className="text-right px-4 py-3 font-bold text-sm">You Save</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-white">
                  <td className="px-4 py-3 font-semibold text-gray-900 text-sm">Emergency lockout</td>
                  <td className="px-4 py-3 text-right font-black text-[#FFB800]">£59</td>
                  <td className="px-4 py-3 text-right text-gray-500 text-sm">£150–£250</td>
                  <td className="px-4 py-3 text-right font-bold text-green-600 text-sm">£91–£191</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="px-4 py-3 font-semibold text-gray-900 text-sm">Lock change</td>
                  <td className="px-4 py-3 text-right font-black text-[#FFB800]">£69</td>
                  <td className="px-4 py-3 text-right text-gray-500 text-sm">£120–£200</td>
                  <td className="px-4 py-3 text-right font-bold text-green-600 text-sm">£51–£131</td>
                </tr>
                <tr className="border-b border-gray-100 bg-white">
                  <td className="px-4 py-3 font-semibold text-gray-900 text-sm">uPVC repair</td>
                  <td className="px-4 py-3 text-right font-black text-[#FFB800]">£59</td>
                  <td className="px-4 py-3 text-right text-gray-500 text-sm">£100–£180</td>
                  <td className="px-4 py-3 text-right font-bold text-green-600 text-sm">£41–£121</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="px-4 py-3 font-semibold text-gray-900 text-sm">Boarding up</td>
                  <td className="px-4 py-3 text-right font-black text-[#FFB800]">£79</td>
                  <td className="px-4 py-3 text-right text-gray-500 text-sm">£150–£300</td>
                  <td className="px-4 py-3 text-right font-bold text-green-600 text-sm">£71–£221</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 font-semibold text-gray-900 text-sm">Lock upgrade</td>
                  <td className="px-4 py-3 text-right font-black text-[#FFB800]">£79</td>
                  <td className="px-4 py-3 text-right text-gray-500 text-sm">£130–£220</td>
                  <td className="px-4 py-3 text-right font-bold text-green-600 text-sm">£51–£141</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="bg-gray-50 border-t border-gray-200">
                  <td colSpan={4} className="px-4 py-3 text-xs text-gray-500">
                    National company prices include VAT and typical call-out fees
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="mt-8 space-y-4 text-gray-700 leading-relaxed">
            <p>
              I accept payment by <strong>cash or card</strong> — whatever is easiest for you. There is no
              surcharge for card payments. I can also provide a receipt and invoice for insurance claims or
              landlord records.
            </p>
            <p>
              All lock fittings come with a <strong>12-month guarantee</strong> on parts and labour. If a lock
              I have fitted develops a fault within 12 months, I will return and fix it at no cost to you.
            </p>
            <p>
              There are <strong>no evening or weekend surcharges</strong> — the price is the same whether you
              call at 2pm on a Tuesday or 2am on Christmas Day. I do not charge extra for unsociable hours
              because emergencies do not wait for office hours.
            </p>
            <p>
              Every job is <strong>priced and confirmed on the phone before I come out</strong>. I will tell
              you the exact cost, and that is what you pay. If I arrive and the job turns out to be more
              complex than expected, I will discuss any change with you before proceeding — you are never
              committed to a higher price without agreeing to it first.
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
                a: 'I always agree the full price before I start. If an unexpected complication arises mid-job, I will stop and discuss any price change with you before continuing. You are never committed to a higher price without agreeing to it first.',
              },
              {
                q: 'Do you charge more for more expensive properties?',
                a: 'No — the price is based on the type of work required, not the value of the property. A lock change is the same price whether it is a flat or a detached house.',
              },
              {
                q: 'Do prices include parts?',
                a: 'For a lock change or replacement, the new lock is included in the quoted price. For emergency lockouts where the lock stays intact, parts are not needed. I always clarify exactly what is included when I quote.',
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
