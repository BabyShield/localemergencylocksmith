export interface Service {
  slug: string
  name: string
  shortName: string
  description: string
  priceFrom: number
  icon: string
  keywords: string[]
  metaTitle: string
  metaDescription: string
}

export const SERVICES: Service[] = [
  {
    slug: 'emergency-lockout',
    name: 'Emergency Lockout Service',
    shortName: 'Emergency Lockout',
    description: 'Locked out of your home or car? I offer fast, non-destructive entry across Coventry and Warwickshire. No damage to your door or frame where possible.',
    priceFrom: 59,
    icon: '🔓',
    keywords: ['emergency locksmith coventry', 'locked out of house coventry', 'emergency lockout service coventry', '24 hour emergency locksmith coventry', 'emergency door opening coventry', 'non destructive entry coventry'],
    metaTitle: 'Emergency Locksmith for Lockouts Coventry | From £59',
    metaDescription: 'Locked out of your house in Coventry? Call a 24-hour emergency locksmith for lockout service from £59, with no VAT or call-out fee.',
  },
  {
    slug: 'lock-change',
    name: 'Lock Change & Replacement',
    shortName: 'Lock Change',
    description: 'New locks fitted quickly and professionally. I supply and fit British Standard BS3621 locks, Yale locks, and all major brands. Insurance-approved locks available.',
    priceFrom: 69,
    icon: '🔑',
    keywords: ['front door lock replacement coventry', 'door lock replacement coventry', 'lock replacement coventry', 'lock change coventry', 'change front door lock coventry', 'bs3621 lock coventry'],
    metaTitle: 'Door Lock Replacement Coventry | From £69',
    metaDescription: 'Front door lock replacement and lock changes in Coventry from £69. Yale, cylinder and BS3621 locks fitted. No VAT or call-out fee. Call 024 7522 4730.',
  },
  {
    slug: 'upvc-lock-repair',
    name: 'uPVC Door & Window Lock Repair',
    shortName: 'uPVC Lock Repair',
    description: 'Specialist in uPVC door lock repairs and replacements. Multipoint locking systems, cylinder replacements, and window lock repairs across Coventry.',
    priceFrom: 59,
    icon: '🚪',
    keywords: ['upvc door lock replacement coventry', 'upvc door lock repair coventry', 'upvc door lock mechanism replacement coventry', 'upvc lock repair coventry', 'window lock repair coventry', 'composite door lock replacement coventry'],
    metaTitle: 'uPVC Door Lock Repair & Replacement Coventry',
    metaDescription: 'uPVC door lock repair and replacement in Coventry, including failed mechanisms, multipoint locks and window locks. From £59, no VAT or call-out fee.',
  },
  {
    slug: 'boarding-up',
    name: 'Emergency Boarding Up',
    shortName: 'Boarding Up',
    description: 'Emergency boarding up after break-ins, damaged doors, or smashed windows. Available 24/7 across Coventry and Warwickshire.',
    priceFrom: 79,
    icon: '🪟',
    keywords: ['emergency boarding up coventry', 'emergency boarding up service coventry', 'board up service coventry', 'emergency window boarding up coventry', 'emergency boarding up cost coventry'],
    metaTitle: 'Emergency Boarding Up Service Coventry | From £79',
    metaDescription: 'Emergency boarding up service in Coventry for damaged doors and windows. Available 24/7 from £79, with no VAT or call-out fee. Call 024 7522 4730.',
  },
  {
    slug: 'lock-upgrade',
    name: 'Lock Upgrade & Security',
    shortName: 'Lock Upgrade',
    description: 'Upgrade your home security with British Standard BS3621 mortice locks, anti-snap cylinders, and Sold Secure approved locks. Insurance-compliant upgrades.',
    priceFrom: 79,
    icon: '🛡️',
    keywords: ['anti snap locks coventry', 'anti snap door locks coventry', 'anti snap barrel locks coventry', 'anti snap euro cylinder locks coventry', 'bs3621 locks coventry', 'lock upgrade coventry'],
    metaTitle: 'Anti-Snap & BS3621 Locks Coventry | From £79',
    metaDescription: 'Anti-snap door locks and BS3621 lock upgrades in Coventry. Euro cylinders and mortice locks fitted, with lock upgrades from £79. No VAT or call-out fee.',
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug)
}
