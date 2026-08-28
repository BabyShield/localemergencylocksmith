'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PPCHandler() {
  const searchParams = useSearchParams()
  const [isAdTraffic, setIsAdTraffic] = useState(false)

  useEffect(() => {
    if (searchParams?.has('gclid')) {
      setIsAdTraffic(true)
    }
  }, [searchParams])

  if (!isAdTraffic) return null

  return (
    <div className="absolute top-0 left-0 w-full bg-red-600 text-white text-sm font-bold text-center py-2 z-50 animate-pulse shadow-md">
      Call now to confirm current availability, your price, and an honest arrival time.
    </div>
  )
}
