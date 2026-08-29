import type { ReactNode } from 'react'

interface FAQ {
  q: string
  a: string
}

interface FAQSectionProps {
  faqs: FAQ[]
  heading?: string
  footer?: ReactNode
}

export default function FAQSection({
  faqs,
  heading = 'Frequently Asked Questions',
  footer,
}: FAQSectionProps) {
  return (
    <section className="py-14 px-4 bg-[#F7F7F5]">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-black text-[#0F1B2D] mb-2 text-center">
          {heading}
        </h2>
        <p className="text-gray-500 text-sm text-center mb-8">
          Click any question to see the answer
        </p>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <details
              key={faq.q}
              open={i === 0}
              className="group bg-white rounded-xl border border-gray-200 open:border-[#FFB800] open:shadow-sm"
            >
              <summary className="w-full cursor-pointer list-none px-6 py-5 font-bold text-[#0F1B2D] flex justify-between items-center hover:bg-gray-50/50 transition-colors min-h-[56px] rounded-xl [&::-webkit-details-marker]:hidden">
                <span className="pr-4 leading-snug">{faq.q}</span>
                <span
                  aria-hidden="true"
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-black bg-gray-100 text-gray-600 transition-all duration-200 group-open:bg-[#FFB800] group-open:text-[#0F1B2D] group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
        {footer ? <div className="mt-6">{footer}</div> : null}
      </div>
    </section>
  )
}
