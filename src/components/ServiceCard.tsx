import Link from 'next/link'
import type { Service } from '@/data/services'

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="block bg-white rounded-xl border border-gray-200 hover:border-green-700 hover:shadow-md transition-all p-6 group"
    >
      <div className="text-4xl mb-3">{service.icon}</div>
      <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-800 mb-2">
        {service.shortName}
      </h3>
      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{service.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-green-800 font-black text-lg">From £{service.priceFrom}</span>
        <span className="text-orange-600 font-semibold text-sm group-hover:underline">
          Learn more →
        </span>
      </div>
    </Link>
  )
}
