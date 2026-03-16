import Link from 'next/link'
import { getAllAreasByRegion } from '@/data/areas'

export default function AreaGrid() {
  const areasByRegion = getAllAreasByRegion()

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 text-center">
          Areas I Cover
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Emergency locksmith covering Coventry and all surrounding towns and villages
        </p>
        <div className="space-y-8">
          {Object.entries(areasByRegion).map(([region, areas]) => (
            <div key={region}>
              <h3 className="text-lg font-bold text-[#0F1B2D] mb-3 border-b border-[#FFB800]/30 pb-2">
                {region}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                {areas.map((area) => (
                  <Link
                    key={area.slug}
                    href={`/areas/${area.slug}`}
                    className="flex flex-col py-2 px-2 rounded hover:bg-white transition-colors group"
                  >
                    <span className="text-sm text-gray-700 group-hover:text-[#0F1B2D] font-medium leading-tight">
                      {area.name}
                    </span>
                    <span className="text-xs text-gray-400 group-hover:text-[#FFB800] mt-0.5">
                      {area.postcode}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
