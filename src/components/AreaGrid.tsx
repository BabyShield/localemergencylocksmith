import Link from 'next/link'
import { getAllAreasByRegion } from '@/data/areas'

export default function AreaGrid() {
  const areasByRegion = getAllAreasByRegion()

  return (
    <section className="py-14 px-4 bg-[#F7F7F5]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-[#0F1B2D] mb-3">
            Areas I Cover
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Emergency locksmith covering Coventry, Warwickshire, and all surrounding towns and villages. 15-30 minute response across Coventry.
          </p>
        </div>

        <div className="space-y-8">
          {Object.entries(areasByRegion).map(([region, areas]) => (
            <div key={region}>
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-lg font-black text-[#0F1B2D]">{region}</h3>
                <div className="flex-1 h-px bg-gradient-to-r from-[#FFB800]/30 to-transparent" />
                <span className="text-xs text-gray-400 font-medium">{areas.length} areas</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                {areas.map((area) => (
                  <Link
                    key={area.slug}
                    href={`/areas/${area.slug}`}
                    className="flex items-center justify-between bg-white rounded-lg border border-gray-100 py-2.5 px-3 hover:border-[#FFB800]/50 hover:shadow-sm transition-all group"
                  >
                    <span className="text-sm text-gray-700 group-hover:text-[#0F1B2D] font-medium leading-tight truncate">
                      {area.name}
                    </span>
                    <span className="text-[10px] bg-gray-100 group-hover:bg-[#FFB800]/10 group-hover:text-[#0F1B2D] text-gray-400 font-bold px-1.5 py-0.5 rounded ml-1.5 flex-shrink-0">
                      {area.postcode}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/areas"
            className="inline-flex items-center gap-2 text-[#0F1B2D] font-bold text-sm hover:text-[#FFB800] transition-colors"
          >
            View all areas with full details
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
