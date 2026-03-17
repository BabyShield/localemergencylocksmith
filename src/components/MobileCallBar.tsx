import { SITE_CONFIG } from '@/data/config'

export default function MobileCallBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <a
        href={`tel:${SITE_CONFIG.phoneTel}`}
        className="flex items-center justify-center gap-3 bg-[#FFB800] hover:bg-[#FFC933] text-[#0F1B2D] font-black py-3.5 px-6 w-full transition-colors shadow-[0_-2px_16px_rgba(0,0,0,0.15)]"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        <span className="text-base">CALL NOW &mdash; {SITE_CONFIG.phone}</span>
      </a>
    </div>
  )
}
