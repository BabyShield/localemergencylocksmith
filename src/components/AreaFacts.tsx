interface AreaFact {
  text: string
  source?: { label: string; url: string }
}

interface AreaFactsProps {
  areaName: string
  facts: AreaFact[]
  postcode: string
}

export type { AreaFact }

export default function AreaFacts({ areaName, facts, postcode }: AreaFactsProps) {
  if (!facts || facts.length === 0) return null

  return (
    <section className="py-14 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-black text-[#0F1B2D] mb-2">
          5 Things You Might Not Know About {areaName}
        </h2>
        <p className="text-gray-500 text-sm mb-8">
          Local knowledge from your Coventry &amp; Warwickshire locksmith
        </p>

        <ol className="space-y-5">
          {facts.map((fact, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FFB800]/10 text-[#FFB800] font-black text-sm flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <div className="text-gray-700 leading-relaxed">
                {fact.text}
                {fact.source && (
                  <>
                    {' '}
                    <a
                      href={fact.source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#0F1B2D] font-semibold text-sm hover:text-[#FFB800] transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      {fact.source.label}
                    </a>
                  </>
                )}
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-8 bg-[#F7F7F5] rounded-xl p-5 border border-gray-100">
          <p className="text-gray-600 text-sm leading-relaxed">
            We&apos;re proud to serve {areaName} and the surrounding {postcode} area.
            If you need an emergency locksmith, call{' '}
            <a href="tel:+442475224730" className="font-black text-[#0F1B2D] hover:text-[#FFB800] transition-colors">
              024 7522 4730
            </a>
            {' '}&mdash; available 24/7, no VAT, no call-out fee.
          </p>
        </div>
      </div>
    </section>
  )
}
