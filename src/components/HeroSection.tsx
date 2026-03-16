import { SITE_CONFIG } from '@/data/config'

interface HeroSectionProps {
  heading: string
  subheading: string
  areaName?: string
}

export default function HeroSection({ heading, subheading, areaName }: HeroSectionProps) {
  return (
    <section
      className="py-12 md:py-20 px-4 text-white"
      style={{ background: 'linear-gradient(135deg, #1B5E20, #2E7D32)' }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4">
          {heading}
        </h1>
        <p className="text-lg md:text-xl text-green-100 mb-8 max-w-2xl mx-auto">
          {subheading}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
          <a
            href={`tel:${SITE_CONFIG.phoneTel}`}
            className="inline-flex flex-col items-center bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-black text-xl transition-colors min-h-[72px] justify-center shadow-lg"
          >
            <span className="text-sm font-bold uppercase tracking-widest text-orange-100">Call Now — Free Quote</span>
            <span className="text-2xl">{SITE_CONFIG.phone}</span>
          </a>
        </div>
        <p className="text-green-200 text-sm md:text-base">
          Available {SITE_CONFIG.hours} — No VAT &bull; No Call-Out Fee &bull; {SITE_CONFIG.responseTime} Response
          {areaName ? ` in ${areaName}` : ''}
        </p>
      </div>
    </section>
  )
}
