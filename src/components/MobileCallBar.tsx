import { SITE_CONFIG } from '@/data/config'

export default function MobileCallBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <a
        href={`tel:${SITE_CONFIG.phoneTel}`}
        className="flex items-center justify-center gap-3 bg-orange-600 hover:bg-orange-700 text-white py-4 px-6 w-full transition-colors min-h-[56px]"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
        <span className="font-black text-lg">📞 CALL NOW — {SITE_CONFIG.phone}</span>
      </a>
    </div>
  )
}
