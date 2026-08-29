import Link from 'next/link'
import { SITE_CONFIG } from '@/data/config'

const PRICES = [
  { service: 'Emergency lockout', price: '£59', desc: 'Low-damage method assessed first', includes: 'Labour, no VAT' },
  { service: 'Lock change (standard)', price: '£69', desc: 'Yale or cylinder replacement', includes: 'New lock + fitting' },
  { service: 'Lock change (BS3621)', price: '£79', desc: 'Marked British Standard option', includes: 'Lock + fitting' },
  { service: 'Anti-snap cylinder', price: '£59', desc: 'Snap-resistant euro cylinder', includes: 'Cylinder + fitting' },
  { service: 'uPVC lock repair', price: '£59', desc: 'Cylinder or mechanism repair', includes: 'Labour, no VAT' },
  { service: 'uPVC lock replacement', price: '£89', desc: 'Full mechanism swap', includes: 'Mechanism + fitting' },
  { service: 'Boarding up (emergency)', price: '£79', desc: 'Temporary boarding after assessment', includes: 'Materials + labour' },
  { service: 'Window lock repair', price: '£49', desc: 'Espagnolette or cockspur', includes: 'Labour, no VAT' },
  { service: 'Security survey', price: 'FREE', desc: 'Full property assessment', includes: 'No obligation' },
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

        {/* Semantic HTML table for AI/snippet extraction */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200">
            <caption className="sr-only">Emergency locksmith prices in Coventry — 2026</caption>
            <thead>
              <tr className="bg-[#0F1B2D] text-white">
                <th scope="col" className="text-left px-5 py-3 text-sm font-bold uppercase tracking-wide">Service</th>
                <th scope="col" className="text-right px-5 py-3 text-sm font-bold uppercase tracking-wide">From</th>
                <th scope="col" className="text-left px-5 py-3 text-sm font-bold uppercase tracking-wide hidden sm:table-cell">Includes</th>
              </tr>
            </thead>
            <tbody>
              {PRICES.map((row, i) => (
                <tr
                  key={row.service}
                  className={`border-b border-gray-100 hover:bg-[#F7F7F5] transition-colors ${i % 2 === 0 ? '' : 'bg-gray-50/50'}`}
                >
                  <td className="px-5 py-3.5">
                    <span className="font-bold text-[#0F1B2D] text-sm block">{row.service}</span>
                    <span className="text-xs text-gray-600 sm:hidden">{row.desc}</span>
                  </td>
                  <td className={`px-5 py-3.5 text-right font-black text-lg whitespace-nowrap ${row.price === 'FREE' ? 'text-green-700' : 'text-[#8A5A00]'}`}>
                    {row.price}
                  </td>
                  <td className="px-5 py-3.5 text-gray-500 text-sm hidden sm:table-cell">{row.includes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer notes */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-6 text-xs text-gray-600">
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
