import { SITE_CONFIG } from '@/data/config'

const NAV_LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/areas', label: 'Areas' },
  { href: '/prices', label: 'Prices' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function StickyHeader() {
  return (
    <header className="sticky top-0 z-50 bg-[#0F1B2D]/95 backdrop-blur-md shadow-lg shadow-black/10 border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between">
        {/* Native disclosure navigation — mobile only */}
        <details className="group lg:hidden">
          <summary
            className="flex items-center justify-center w-10 h-10 -ml-2 text-white cursor-pointer list-none rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB800] [&::-webkit-details-marker]:hidden"
            aria-controls="mobile-navigation"
          >
            <span className="sr-only">Toggle navigation menu</span>
            <svg className="w-6 h-6 group-open:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg className="hidden w-6 h-6 group-open:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </summary>

          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="absolute inset-x-0 top-full bg-[#0F1B2D] border-t border-white/10 px-4 pb-4 shadow-lg lg:hidden"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-3 text-gray-200 hover:text-[#FFB800] focus-visible:text-[#FFB800] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB800] font-medium text-base border-b border-white/5 last:border-0 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`tel:${SITE_CONFIG.phoneTel}`}
              className="flex items-center justify-center gap-2 bg-[#FFB800] text-[#0F1B2D] font-black py-3 rounded-xl mt-3 text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Call {SITE_CONFIG.phone}
            </a>
          </nav>
        </details>

        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5">
          {/* Padlock mark — matches the PWA icon */}
          <svg className="w-7 h-7 md:w-8 md:h-8 flex-shrink-0" viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <path d="M15 22v-6a9 9 0 0 1 18 0v6" stroke="#FFB800" strokeWidth="4" strokeLinecap="round" fill="none" />
            <rect x="10" y="21" width="28" height="20" rx="3" fill="#FFB800" />
            <circle cx="24" cy="29" r="3" fill="#0F1B2D" />
            <rect x="22.5" y="30" width="3" height="6.5" rx="1.5" fill="#0F1B2D" />
          </svg>
          <span className="flex flex-col">
            <span className="text-white font-black text-base md:text-lg leading-tight tracking-tight">
              Local Emergency Locksmith
            </span>
            <span className="text-gray-400 text-[11px] md:text-xs tracking-wide">{SITE_CONFIG.tagline}</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-6 text-sm">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-gray-300 hover:text-white transition-colors font-medium">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Call button */}
        <a
          href={`tel:${SITE_CONFIG.phoneTel}`}
          className="flex items-center gap-2 bg-[#FFB800] hover:bg-[#FFC933] text-[#0F1B2D] px-4 py-2.5 rounded-xl transition-all duration-200 min-h-[48px] hover:shadow-[0_2px_12px_rgba(255,184,0,0.3)]"
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <div className="flex flex-col items-start">
            <span className="text-[10px] font-bold uppercase tracking-wide leading-none text-[#0F1B2D]">Call Now</span>
            <span className="font-black text-sm md:text-base leading-tight">{SITE_CONFIG.phone}</span>
          </div>
        </a>
      </div>

    </header>
  )
}
