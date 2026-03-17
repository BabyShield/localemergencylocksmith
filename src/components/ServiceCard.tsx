import Link from 'next/link'
import type { Service } from '@/data/services'

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative bg-white rounded-2xl border border-gray-100 hover:border-[#FFB800]/50 transition-all duration-300 p-6 hover:shadow-lg hover:shadow-[#FFB800]/5 hover:-translate-y-0.5"
    >
      {/* Price badge */}
      <div className="absolute top-4 right-4 bg-[#0F1B2D] text-[#FFB800] font-black text-sm px-3 py-1 rounded-lg">
        from &pound;{service.priceFrom}
      </div>

      <div className="text-4xl mb-4">{service.icon}</div>

      <h3 className="text-lg font-black text-[#0F1B2D] mb-2 pr-20">
        {service.shortName}
      </h3>

      <p className="text-gray-500 text-sm mb-5 leading-relaxed line-clamp-2">{service.description}</p>

      <div className="flex items-center text-[#0F1B2D] font-bold text-sm group-hover:text-[#FFB800] transition-colors">
        Learn more
        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  )
}
