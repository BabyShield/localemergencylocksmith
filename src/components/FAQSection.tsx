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
  const [openIndex, setOpenIndex] = useState<number | null>(0)

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
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div
                key={i}
                className={`bg-white rounded-xl border transition-all duration-200 ${isOpen ? 'border-[#FFB800] shadow-sm' : 'border-gray-200'}`}
              >
                <button
                  className="w-full text-left px-6 py-5 font-bold text-[#0F1B2D] flex justify-between items-center hover:bg-gray-50/50 transition-colors min-h-[56px] rounded-xl"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="pr-4 leading-snug">{faq.q}</span>
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-black transition-all duration-200 ${isOpen ? 'bg-[#FFB800] text-[#0F1B2D] rotate-45' : 'bg-gray-100 text-gray-400'}`}>
                    +
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                    {faq.a}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
