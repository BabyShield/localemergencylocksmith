'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

interface Street {
  slug: string
  name: string
}

interface LocalStreetSearchProps {
  areaSlug: string
  areaName: string
  streets: Street[]
}

export default function LocalStreetSearch({ areaSlug, areaName, streets }: LocalStreetSearchProps) {
  const [query, setQuery] = useState('')

  const filteredStreets = useMemo(() => {
    if (!query.trim()) return streets
    const lowerQuery = query.toLowerCase()
    return streets.filter(s => s.name.toLowerCase().includes(lowerQuery))
  }, [query, streets])

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mt-4">
      <div className="relative mb-6">
        <label htmlFor="street-search" className="sr-only">Search for a street in {areaName}</label>
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </div>
        <input
          id="street-search"
          type="text"
          className="block w-full pl-11 pr-4 py-3 bg-[#F7F7F5] border-transparent rounded-xl focus:border-[#FFB800] focus:bg-white focus:ring-0 transition-colors placeholder-gray-400 font-medium"
          placeholder="For example: Barkers Butts Lane..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="max-h-96 overflow-y-auto pr-2 custom-scrollbar">
        {filteredStreets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            {filteredStreets.map((street) => (
              <Link
                key={street.slug}
                href={`/areas/${areaSlug}/streets/${street.slug}`}
                className="text-sm font-medium text-gray-600 hover:text-[#0F1B2D] hover:underline"
              >
                Locksmith on {street.name}
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 text-sm">
            No streets found matching "{query}". 
            <br />
            <span className="font-semibold text-[#0F1B2D] mt-2 block w-full">I still cover all of {areaName}. Call now!</span>
          </div>
        )}
      </div>
    </div>
  )
}
