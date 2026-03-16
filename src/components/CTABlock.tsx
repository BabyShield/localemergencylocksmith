import { SITE_CONFIG } from '@/data/config'

interface CTABlockProps {
  heading?: string
  subtext?: string
}

export default function CTABlock({
  heading = 'Locked out right now? Call me.',
  subtext = 'I\'m available 24 hours a day, 7 days a week, 365 days a year. No call-out fee. No VAT. Price confirmed before I start.',
}: CTABlockProps) {
  return (
    <section className="bg-green-800 text-white py-12 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-4xl font-black mb-4">{heading}</h2>
        <p className="text-green-100 mb-8 text-lg">{subtext}</p>
        <a
          href={`tel:${SITE_CONFIG.phoneTel}`}
          className="inline-flex flex-col items-center bg-orange-600 hover:bg-orange-700 text-white px-10 py-5 rounded-xl font-black text-xl transition-colors shadow-lg"
        >
          <span className="text-sm font-bold uppercase tracking-widest text-orange-100 mb-1">Call Now — 24/7</span>
          <span className="text-3xl">{SITE_CONFIG.phone}</span>
        </a>
        <p className="text-green-200 text-sm mt-4">
          No VAT &bull; No Call-Out Fee &bull; Price Confirmed Before I Start
        </p>
      </div>
    </section>
  )
}
