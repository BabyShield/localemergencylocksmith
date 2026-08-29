import Link from 'next/link'
import { SITE_CONFIG } from '@/data/config'
import { SERVICES } from '@/data/services'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#0F1B2D] text-gray-300 py-12 px-4 pb-24 md:pb-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <h3 className="text-white font-black text-lg mb-4 uppercase">Local Emergency Locksmith</h3>
          <p className="text-sm leading-relaxed mb-4">
            Independent emergency locksmith serving 78 listed locations across Coventry and nearby parts of Warwickshire, Solihull, and the West Midlands.
          </p>
          <p className="text-sm">
            <span className="text-[#FFB800] font-semibold">Phone: </span>
            <a href={`tel:${SITE_CONFIG.phoneTel}`} className="hover:text-white transition-colors font-bold">
              {SITE_CONFIG.phone}
            </a>
          </p>
          <p className="text-sm mt-1">
            <span className="text-[#FFB800] font-semibold">Email: </span>
            <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-white transition-colors">
              {SITE_CONFIG.email}
            </a>
          </p>
          <p className="text-sm mt-1">
            <span className="text-[#FFB800] font-semibold">Hours: </span>
            {SITE_CONFIG.hours}
          </p>
          <p className="text-sm mt-1">
            <span className="text-[#FFB800] font-semibold">WhatsApp: </span>
            <a
              href={`https://wa.me/442475224730?text=${encodeURIComponent('Hi, I need a locksmith. Can you help?')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Message me
            </a>
          </p>
          <p className="text-xs mt-3 text-gray-400">
            Direct booking &bull; Current ETA confirmed by phone &bull; Cash or card
          </p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-4">Services</h3>
          <ul className="space-y-2 text-sm">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} prefetch={false} className="hover:text-white transition-colors">
                  {s.shortName}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/prices" prefetch={false} className="hover:text-white transition-colors">
                Pricing
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-4">Main Towns</h3>
          <ul className="space-y-2 text-sm">
            {[
              { slug: 'coventry-city-centre', name: 'Coventry City Centre' },
              { slug: 'nuneaton', name: 'Nuneaton' },
              { slug: 'rugby', name: 'Rugby' },
              { slug: 'leamington-spa', name: 'Leamington Spa' },
              { slug: 'warwick', name: 'Warwick' },
              { slug: 'stratford-upon-avon', name: 'Stratford-upon-Avon' },
              { slug: 'kenilworth', name: 'Kenilworth' },
              { slug: 'bedworth', name: 'Bedworth' },
            ].map((area) => (
              <li key={area.slug}>
                <Link href={`/areas/${area.slug}`} prefetch={false} className="hover:text-white transition-colors">
                  Locksmith {area.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/areas" prefetch={false} className="hover:text-white transition-colors font-semibold text-[#FFB800]">
                All Areas →
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-4">Coventry Suburbs</h3>
          <ul className="space-y-2 text-sm">
            {[
              { slug: 'earlsdon', name: 'Earlsdon' },
              { slug: 'tile-hill', name: 'Tile Hill' },
              { slug: 'canley', name: 'Canley' },
              { slug: 'radford', name: 'Radford' },
              { slug: 'stoke', name: 'Stoke' },
              { slug: 'wyken', name: 'Wyken' },
              { slug: 'binley', name: 'Binley' },
              { slug: 'cheylesmore', name: 'Cheylesmore' },
              { slug: 'longford', name: 'Longford' },
              { slug: 'allesley', name: 'Allesley' },
            ].map((area) => (
              <li key={area.slug}>
                <Link href={`/areas/${area.slug}`} prefetch={false} className="hover:text-white transition-colors">
                  Locksmith {area.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-gray-700">
        {/* Multi-language emergency line */}
        <div
          className="flex flex-wrap justify-center gap-x-6 gap-y-1.5 text-xs text-gray-400 pb-4"
          style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
        >
          <span lang="pl"><span className="font-semibold text-gray-400">Zamknięty?</span> Zadzwoń: <a href={`tel:${SITE_CONFIG.phoneTel}`} className="text-white underline decoration-[#FFB800] underline-offset-2 hover:text-[#FFB800]">{SITE_CONFIG.phone}</a></span>
          <span lang="ro"><span className="font-semibold text-gray-400">Blocat afară?</span> Sunați: <a href={`tel:${SITE_CONFIG.phoneTel}`} className="text-white underline decoration-[#FFB800] underline-offset-2 hover:text-[#FFB800]">{SITE_CONFIG.phone}</a></span>
          <span lang="ur" dir="rtl"><span className="font-semibold text-gray-400">ایمرجنسی؟</span> کال کریں: <a href={`tel:${SITE_CONFIG.phoneTel}`} className="text-white underline decoration-[#FFB800] underline-offset-2 hover:text-[#FFB800]">{SITE_CONFIG.phone}</a></span>
          <span lang="hi"><span className="font-semibold text-gray-400">बंद हो गए?</span> कॉल करें: <a href={`tel:${SITE_CONFIG.phoneTel}`} className="text-white underline decoration-[#FFB800] underline-offset-2 hover:text-[#FFB800]">{SITE_CONFIG.phone}</a></span>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 pt-4 border-t border-gray-800">
          <p>&copy; {year} Local Emergency Locksmith. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/about" prefetch={false} className="hover:text-gray-300 transition-colors">About</Link>
            <Link href="/blog" prefetch={false} className="hover:text-gray-300 transition-colors">Blog</Link>
            <Link href="/contact" prefetch={false} className="hover:text-gray-300 transition-colors">Contact</Link>
            <Link href="/areas" prefetch={false} className="hover:text-gray-300 transition-colors">Areas</Link>
            <Link href="/prices" prefetch={false} className="hover:text-gray-300 transition-colors">Pricing</Link>
            <Link href="/testimonials" prefetch={false} className="hover:text-gray-300 transition-colors">Reviews</Link>
            <Link href="/faq" prefetch={false} className="hover:text-gray-300 transition-colors">FAQ</Link>
            <Link href="/privacy" prefetch={false} className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" prefetch={false} className="hover:text-gray-300 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
