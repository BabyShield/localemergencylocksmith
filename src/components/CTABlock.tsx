import { SITE_CONFIG } from '@/data/config'
import { whatsappHref } from '@/lib/enquiry'
import CallbackLink from '@/components/CallbackLink'

interface CTABlockProps {
  heading?: string
  subtext?: string
  callbackHref?: string
}

export default function CTABlock({
  heading = 'Locked out right now? Call me.',
  subtext = "I'm available 24 hours a day, 7 days a week, 365 days a year. No call-out fee. No VAT. Price confirmed before I start.",
  callbackHref = '/contact#callback',
}: CTABlockProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0A1628] via-[#0F1B2D] to-[#162438] text-white py-16 px-4">
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#FFB800]/5 rounded-full blur-3xl" />

      <div className="relative max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">{heading}</h2>
        <p className="text-gray-300 mb-10 text-lg max-w-xl mx-auto">{subtext}</p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <a
            href={`tel:${SITE_CONFIG.phoneTel}`}
            data-track="cta"
            className="group inline-flex flex-col items-center bg-[#FFB800] hover:bg-[#FFC933] text-[#0F1B2D] px-12 py-6 rounded-2xl font-black transition-all duration-200 shadow-[0_4px_24px_rgba(255,184,0,0.3)] hover:shadow-[0_4px_40px_rgba(255,184,0,0.5)] hover:scale-[1.02]"
          >
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#0F1B2D] mb-1">Call Now &mdash; 24/7</span>
            <span className="text-3xl md:text-4xl">{SITE_CONFIG.phone}</span>
          </a>
          <a
            href={whatsappHref()}
            data-track="cta"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-[#25D366] hover:bg-[#20BD5A] text-[#0F1B2D] px-8 py-6 rounded-2xl font-black min-h-[72px]"
          >
            WhatsApp
          </a>
        </div>
        <CallbackLink href={callbackHref} className="inline-block mt-5 text-sm font-semibold text-[#FFB800] underline underline-offset-4 hover:text-[#FFC933]">
          Can&apos;t call right now? Request a callback
        </CallbackLink>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-8 text-sm text-gray-400">
          <span>No VAT</span>
          <span>&bull;</span>
          <span>No Call-Out Fee</span>
          <span>&bull;</span>
          <span>Price Confirmed Before I Start</span>
        </div>
      </div>
    </section>
  )
}
