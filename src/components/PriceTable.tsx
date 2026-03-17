import Link from 'next/link'
import { SITE_CONFIG } from '@/data/config'

const PRICES = [
  { service: 'Emergency lockout', price: '£59', desc: 'Non-destructive door opening' },
  { service: 'Lock change (standard)', price: '£69', desc: 'Yale or cylinder replacement' },
  { service: 'Lock change (BS3621)', price: '£79', desc: 'Insurance-approved deadlock' },
  { service: 'uPVC lock repair', price: '£59', desc: 'Cylinder or mechanism repair' },
  { service: 'uPVC lock replacement', price: '£89', desc: 'Full mechanism swap' },
  { service: 'Anti-snap cylinder upgrade', price: '£59', desc: 'Snap-resistant euro cylinder' },
  { service: 'Boarding up (emergency)', price: '£79', desc: 'Same-day emergency boarding' },
  { service: 'Window lock repair', price: '£49', desc: 'Espagnolette or cockspur' },
  { service: 'Security survey', price: 'FREE', desc: 'Full property assessment' },
]

export default function PriceTable() {
  return (
    <section className="py-14 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-[#0F1B2D] mb-3">
            Transparent Pricing — No Surprises
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Every price includes labour. No VAT. No call-out fee. No extra for evenings, weekends, or bank holidays.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          {/* Header */}
          <div className="bg-[#0F1B2D] text-white px-6 py-4 flex justify-between items-center">
            <span className="font-bold text-sm uppercase tracking-wide">Service</span>
            <span className="font-bold text-sm uppercase tracking-wide">From</span>
          </div>

          {/* Rows */}
          <div className="divide-y divide-gray-100">
            {PRICES.map((row) => (
              <div
                key={row.service}
                className="flex items-center justify-between px-6 py-4 hover:bg-[#F7F7F5] transition-colors"
              >
                <div>
                  <p className="font-bold text-[#0F1B2D] text-sm">{row.service}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{row.desc}</p>
                </div>
                <span className={`font-black text-lg flex-shrink-0 ml-4 ${row.price === 'FREE' ? 'text-green-600' : 'text-[#FFB800]'}`}>
                  {row.price}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer notes */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-6 text-xs text-gray-400">
          <span>No VAT on any price</span>
          <span>&bull;</span>
          <span>No call-out fee</span>
          <span>&bull;</span>
          <span>Evenings &amp; weekends: same price</span>
          <span>&bull;</span>
          <span>Price confirmed before work starts</span>
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <a
            href={`tel:${SITE_CONFIG.phoneTel}`}
            className="inline-flex items-center gap-2 bg-[#FFB800] hover:bg-[#FFC933] text-[#0F1B2D] font-black px-8 py-3.5 rounded-xl transition-all hover:shadow-[0_2px_16px_rgba(255,184,0,0.3)]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Get a Quote — {SITE_CONFIG.phone}
          </a>
          <p className="mt-3">
            <Link href="/prices" className="text-[#0F1B2D] text-sm font-semibold hover:underline">
              View full pricing page &rarr;
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
