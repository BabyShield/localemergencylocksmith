import Link from 'next/link'
import { SITE_CONFIG } from '@/data/config'

export default function StickyHeader() {
  return (
    <header className="sticky top-0 z-50 bg-[#0F1B2D]/95 backdrop-blur-md shadow-lg shadow-black/10 border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between">
        <Link href="/" className="flex flex-col">
          <span className="text-white font-black text-base md:text-lg leading-tight tracking-tight">
            Local Emergency Locksmith
          </span>
          <span className="text-gray-400 text-[11px] md:text-xs tracking-wide">{SITE_CONFIG.tagline}</span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm">
          <Link href="/services" className="text-gray-300 hover:text-white transition-colors font-medium">Services</Link>
          <Link href="/areas" className="text-gray-300 hover:text-white transition-colors font-medium">Areas</Link>
          <Link href="/prices" className="text-gray-300 hover:text-white transition-colors font-medium">Prices</Link>
          <Link href="/blog" className="text-gray-300 hover:text-white transition-colors font-medium">Blog</Link>
          <Link href="/contact" className="text-gray-300 hover:text-white transition-colors font-medium">Contact</Link>
        </nav>

        <a
          href={`tel:${SITE_CONFIG.phoneTel}`}
          className="flex items-center gap-2 bg-[#FFB800] hover:bg-[#FFC933] text-[#0F1B2D] px-4 py-2.5 rounded-xl transition-all duration-200 min-h-[48px] hover:shadow-[0_2px_12px_rgba(255,184,0,0.3)]"
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <div className="flex flex-col items-start">
            <span className="text-[10px] font-bold uppercase tracking-wide leading-none text-[#0F1B2D]/60">Call Now</span>
            <span className="font-black text-sm md:text-base leading-tight">{SITE_CONFIG.phone}</span>
          </div>
        </a>
      </div>
    </header>
  )
}
