'use client'

import { useState, useEffect, useRef } from 'react'
import { SITE_CONFIG } from '@/data/config'

export default function ScrollCTA() {
  const [show, setShow] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const lastY = useRef(0)
  const maxScroll = useRef(0)
  const triggered = useRef(false)

  useEffect(() => {
    // Only on mobile
    if (typeof window === 'undefined' || window.innerWidth > 768) return

    const handler = () => {
      const y = window.scrollY
      const pageHeight = document.body.scrollHeight - window.innerHeight
      const scrollPercent = pageHeight > 0 ? y / pageHeight : 0

      if (scrollPercent > maxScroll.current) {
        maxScroll.current = scrollPercent
      }

      // Trigger: scrolled past 40%, now scrolling UP significantly
      if (maxScroll.current > 0.4 && y < lastY.current - 80 && !triggered.current) {
        triggered.current = true
        setShow(true)
        // Auto-hide after 5 seconds
        setTimeout(() => setShow(false), 5000)
      }

      // Hide on scroll down
      if (y > lastY.current + 20 && show) {
        setShow(false)
      }

      lastY.current = y
    }

    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [show])

  if (dismissed || !show) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] animate-slideDown md:hidden">
      <div className="bg-[#0F1B2D] text-white px-4 py-3 flex items-center justify-between gap-3 shadow-lg">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-400">Still need a locksmith?</p>
          <a
            href={`tel:${SITE_CONFIG.phoneTel}`}
            className="text-[#FFB800] font-black text-lg hover:underline"
          >
            Call {SITE_CONFIG.phone}
          </a>
        </div>
        <button
          onClick={() => { setDismissed(true); setShow(false) }}
          className="text-gray-400 hover:text-white p-2 -mr-2"
          aria-label="Dismiss"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
