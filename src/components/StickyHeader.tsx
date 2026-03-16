import Link from 'next/link'
import { SITE_CONFIG } from '@/data/config'

export default function StickyHeader() {
  return (
    <header className="sticky top-0 z-50 bg-[#0F1B2D] shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex flex-col">
          <span className="text-white font-black text-lg md:text-xl leading-tight uppercase tracking-tight">
            Local Emergency Locksmith
          </span>
          <span className="text-gray-400 text-xs md:text-sm">{SITE_CONFIG.tagline}</span>
        </Link>
        <a
          href={`tel:${SITE_CONFIG.phoneTel}`}
          className="flex flex-col items-center bg-[#FFB800] hover:bg-[#FFC933] text-[#0F1B2D] px-4 py-2 rounded-lg transition-colors min-h-[48px] justify-center"
        >
          <span className="text-xs font-semibold uppercase tracking-wide">Call Now</span>
          <span className="font-black text-base md:text-lg leading-tight">{SITE_CONFIG.phone}</span>
        </a>
      </div>
    </header>
  )
}
