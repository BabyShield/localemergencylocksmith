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
    keywords: ['emergency lockout coventry', 'locked out coventry', 'emergency door opening coventry', 'non destructive entry coventry'],
    metaTitle: 'Emergency Lockout Service Coventry | 24/7 | From £59 | No VAT',
    metaDescription: 'Locked out in Coventry? Emergency lockout service, 15-30 min response. Non-destructive entry, from £59. No VAT, no call-out fee. Call 024 7522 4730 now.',
  },
  {
    slug: 'lock-change',
    name: 'Lock Change & Replacement',
    shortName: 'Lock Change',
    description: 'New locks fitted quickly and professionally. I supply and fit British Standard BS3621 locks, Yale locks, and all major brands. Insurance-approved locks available.',
    priceFrom: 69,
    icon: '🔑',
    keywords: ['lock change coventry', 'lock replacement coventry', 'new lock fitting coventry', 'bs3621 lock coventry'],
    metaTitle: 'Lock Change Coventry | BS3621 Insurance Locks | From £69 | No VAT',
    metaDescription: 'Lock change and replacement in Coventry. BS3621 insurance-approved locks fitted from £69. No VAT, no call-out fee. Call 024 7522 4730.',
  },
  {
    slug: 'upvc-lock-repair',
    name: 'uPVC Door & Window Lock Repair',
    shortName: 'uPVC Lock Repair',
    description: 'Specialist in uPVC door lock repairs and replacements. Multipoint locking systems, cylinder replacements, and window lock repairs across Coventry.',
    priceFrom: 59,
    icon: '🚪',
    keywords: ['upvc lock repair coventry', 'upvc door lock replacement coventry', 'upvc window lock coventry', 'multipoint lock coventry'],
    metaTitle: 'uPVC Lock Repair Coventry | Door & Window Locks | From £59 | No VAT',
    metaDescription: 'uPVC door and window lock repair in Coventry. Multipoint lock repairs from £59. No VAT, no call-out fee. Fast response. Call 024 7522 4730.',
  },
  {
    slug: 'boarding-up',
    name: 'Emergency Boarding Up',
    shortName: 'Boarding Up',
    description: 'Emergency boarding up after break-ins, damaged doors, or smashed windows. Available 24/7 across Coventry and Warwickshire.',
    priceFrom: 79,
    icon: '🪟',
    keywords: ['emergency boarding up coventry', 'broken window boarding coventry', 'board up service coventry'],
    metaTitle: 'Emergency Boarding Up Coventry | 24/7 | From £79 | No VAT',
    metaDescription: 'Emergency boarding up in Coventry after break-ins or damage. Available 24/7, from £79. No VAT, no call-out fee. Call 024 7522 4730 now.',
  },
  {
    slug: 'lock-upgrade',
    name: 'Lock Upgrade & Security',
    shortName: 'Lock Upgrade',
    description: 'Upgrade your home security with British Standard BS3621 mortice locks, anti-snap cylinders, and Sold Secure approved locks. Insurance-compliant upgrades.',
    priceFrom: 79,
    icon: '🛡️',
    keywords: ['lock upgrade coventry', 'bs3621 lock upgrade', 'insurance approved lock coventry', 'anti snap lock coventry'],
    metaTitle: 'Lock Upgrade Coventry | BS3621 Security Locks | From £79 | No VAT',
    metaDescription: 'Lock security upgrades in Coventry. BS3621 and anti-snap locks from £79. Insurance-compliant. No VAT, no call-out fee. Call 024 7522 4730.',
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug)
}
