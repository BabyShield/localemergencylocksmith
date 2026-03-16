'use client'

import { useState } from 'react'

interface FAQ {
  q: string
  a: string
}

interface FAQSectionProps {
  faqs: FAQ[]
  heading?: string
}

export default function FAQSection({
  faqs,
  heading = 'Frequently Asked Questions',
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-8 text-center">
          {heading}
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <button
                className="w-full text-left px-6 py-4 font-semibold text-gray-900 flex justify-between items-center hover:bg-gray-50 transition-colors min-h-[48px]"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span>{faq.q}</span>
                <span className="text-[#FFB800] text-xl ml-4 flex-shrink-0">
                  {openIndex === i ? '−' : '+'}
                </span>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-4 text-gray-700 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
