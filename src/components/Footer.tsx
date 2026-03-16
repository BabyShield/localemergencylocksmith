import Link from 'next/link'
import { SITE_CONFIG } from '@/data/config'
import { SERVICES } from '@/data/services'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4 pb-24 md:pb-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <h3 className="text-white font-black text-lg mb-4 uppercase">Local Emergency Locksmith</h3>
          <p className="text-sm leading-relaxed mb-4">
            Independent emergency locksmith serving Coventry, Nuneaton, Rugby, Leamington Spa, Warwick, and all surrounding areas.
          </p>
          <p className="text-sm">
            <span className="text-green-400 font-semibold">Phone: </span>
            <a href={`tel:${SITE_CONFIG.phoneTel}`} className="hover:text-white transition-colors font-bold">
              {SITE_CONFIG.phone}
            </a>
          </p>
          <p className="text-sm mt-1">
            <span className="text-green-400 font-semibold">Email: </span>
            <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-white transition-colors">
              {SITE_CONFIG.email}
            </a>
          </p>
          <p className="text-sm mt-1">
            <span className="text-green-400 font-semibold">Hours: </span>
            {SITE_CONFIG.hours}
          </p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-4">Services</h3>
          <ul className="space-y-2 text-sm">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="hover:text-white transition-colors">
                  {s.shortName}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/prices" className="hover:text-white transition-colors">
                Pricing
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-4">Main Towns</h3>
          <ul className="space-y-2 text-sm">
            {[
              { slug: 'coventry-city-centre', name: 'Coventry' },
              { slug: 'nuneaton', name: 'Nuneaton' },
              { slug: 'rugby', name: 'Rugby' },
              { slug: 'leamington-spa', name: 'Leamington Spa' },
              { slug: 'warwick', name: 'Warwick' },
              { slug: 'stratford-upon-avon', name: 'Stratford-upon-Avon' },
              { slug: 'kenilworth', name: 'Kenilworth' },
              { slug: 'bedworth', name: 'Bedworth' },
            ].map((area) => (
              <li key={area.slug}>
                <Link href={`/areas/${area.slug}`} className="hover:text-white transition-colors">
                  Locksmith {area.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/areas" className="hover:text-white transition-colors font-semibold text-green-400">
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
              { slug: 'stoke-coventry', name: 'Stoke' },
              { slug: 'wyken', name: 'Wyken' },
              { slug: 'binley', name: 'Binley' },
              { slug: 'cheylesmore', name: 'Cheylesmore' },
              { slug: 'longford', name: 'Longford' },
              { slug: 'allesley', name: 'Allesley' },
            ].map((area) => (
              <li key={area.slug}>
                <Link href={`/areas/${area.slug}`} className="hover:text-white transition-colors">
                  Locksmith {area.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <p>© {year} Local Emergency Locksmith. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/contact" className="hover:text-gray-300 transition-colors">Contact</Link>
          <Link href="/areas" className="hover:text-gray-300 transition-colors">Areas</Link>
          <Link href="/prices" className="hover:text-gray-300 transition-colors">Pricing</Link>
        </div>
      </div>
    </footer>
  )
}
