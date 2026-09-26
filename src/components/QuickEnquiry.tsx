import { SITE_CONFIG } from '@/data/config'
import { whatsappHref } from '@/lib/enquiry'
import CallbackForm from '@/components/CallbackForm'

interface QuickEnquiryProps {
  source: string
  id?: string
  heading?: string
  intro?: string
  defaultJob?: string
}

export default function QuickEnquiry({
  source,
  id = 'quick-enquiry',
  heading = 'Call now, or ask for a callback',
  intro = 'Calling or WhatsApp is the direct way to confirm attendance and the current ETA. If you cannot talk, leave your number and I will use it to call you back.',
  defaultJob,
}: QuickEnquiryProps) {
  const headingId = `${id}-heading`

  return (
    <section id={id} className="scroll-mt-24 bg-[#F7F7F5] px-4 py-12" aria-labelledby={headingId}>
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-8 lg:grid-cols-2">
        <div>
          <h2 id={headingId} className="mb-3 text-2xl font-black text-[#0F1B2D] md:text-3xl">
            {heading}
          </h2>
          <p className="mb-6 text-gray-700 leading-relaxed">{intro}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={`tel:${SITE_CONFIG.phoneTel}`}
              data-track={source}
              className="inline-flex flex-col items-center justify-center rounded-2xl bg-[#FFB800] px-6 py-4 font-black text-[#0F1B2D] shadow-md hover:bg-[#FFC933]"
            >
              <span className="text-xs uppercase tracking-wide">Call now — 24/7</span>
              <span className="text-2xl">{SITE_CONFIG.phone}</span>
            </a>
            <a
              href={whatsappHref()}
              data-track={source}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-2xl bg-[#25D366] px-6 py-4 font-black text-[#0F1B2D] hover:bg-[#20BD5A]"
            >
              WhatsApp
            </a>
          </div>
          <ul className="mt-6 space-y-1 text-sm font-semibold text-[#0F1B2D]">
            <li>No VAT added</li>
            <li>No separate call-out fee</li>
            <li>Price basis agreed before work starts</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-1 text-lg font-black text-[#0F1B2D]">Request a callback</h3>
          <p className="mb-4 text-sm text-gray-600">A phone number is enough. Postcode and the job help me call you back about the right door.</p>
          <CallbackForm source={source} defaultJob={defaultJob} />
        </div>
      </div>
    </section>
  )
}
