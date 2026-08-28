export interface Service {
  slug: string
  name: string
  shortName: string
  description: string
  priceFrom: number
  keywords: string[]
  metaTitle: string
  metaDescription: string
}

export const SERVICES: Service[] = [
  {
    slug: 'emergency-lockout',
    name: 'Emergency Lockout Service',
    shortName: 'Emergency Lockout',
    description: 'Locked out of your house or flat? I offer fast, non-destructive entry across Coventry and Warwickshire, keeping damage to your door or frame to a minimum where possible.',
    priceFrom: 59,
    keywords: ['emergency locksmith coventry', 'locked out of house coventry', 'emergency lockout service coventry', '24 hour emergency locksmith coventry', 'emergency door opening coventry', 'non destructive entry coventry'],
    metaTitle: 'Emergency Locksmith for Lockouts Coventry | From £59',
    metaDescription: 'Locked out of your house in Coventry? Call a 24-hour emergency locksmith for lockout service from £59, with no VAT or call-out fee.',
  },
  {
    slug: 'lock-change',
    name: 'Door Lock Repair & Replacement',
    shortName: 'Lock Repair & Replacement',
    description: 'Door lock repairs and replacements for broken, worn or unreliable locks. Yale nightlatches, mortice locks and cylinders repaired or replaced across Coventry.',
    priceFrom: 69,
    keywords: ['front door lock replacement coventry', 'door lock replacement coventry', 'lock replacement coventry', 'door lock repair coventry', 'lock repair coventry', 'broken door lock coventry', 'lock change coventry', 'change front door lock coventry'],
    metaTitle: 'Door Lock Repair & Replacement Coventry | From £69',
    metaDescription: 'Door lock repair, front door lock replacement and lock changes in Coventry from £69. Yale, mortice and cylinder locks. No VAT or call-out fee.',
  },
  {
    slug: 'upvc-lock-repair',
    name: 'uPVC Door & Window Lock Repair',
    shortName: 'uPVC Lock Repair',
    description: 'Specialist in uPVC door lock repairs and replacements. Multipoint locking systems, cylinder replacements, and window lock repairs across Coventry.',
    priceFrom: 59,
    keywords: ['upvc door lock replacement coventry', 'upvc door lock repair coventry', 'upvc door lock mechanism replacement coventry', 'upvc lock repair coventry', 'window lock repair coventry', 'composite door lock replacement coventry'],
    metaTitle: 'uPVC Door Lock Repair & Replacement Coventry',
    metaDescription: 'uPVC door lock repair and replacement in Coventry, including failed mechanisms, multipoint locks and window locks. From £59, no VAT or call-out fee.',
  },
  {
    slug: 'boarding-up',
    name: 'Emergency Boarding Up & Burglary Repairs',
    shortName: 'Boarding Up & Burglary Repairs',
    description: 'Emergency boarding up and immediate burglary repairs for damaged doors, locks or smashed windows. Available 24/7 across Coventry and Warwickshire.',
    priceFrom: 79,
    keywords: ['emergency boarding up coventry', 'burglary repairs coventry', 'emergency boarding up service coventry', 'board up service coventry', 'emergency window boarding up coventry', 'emergency boarding up cost coventry'],
    metaTitle: 'Boarding Up & Burglary Repairs Coventry | From £79',
    metaDescription: 'Emergency boarding up and burglary repairs in Coventry for damaged doors, locks and windows. Available 24/7 from £79, with no VAT or call-out fee.',
  },
  {
    slug: 'lock-upgrade',
    name: 'Lock Upgrade & Security',
    shortName: 'Lock Upgrade',
    description: 'Upgrade your home security with British Standard BS3621 mortice locks, anti-snap cylinders, and independently certified options matched to the door and any written policy requirement.',
    priceFrom: 79,
    keywords: ['anti snap locks coventry', 'anti snap door locks coventry', 'anti snap barrel locks coventry', 'anti snap euro cylinder locks coventry', '3 star lock coventry', 'ts007 lock coventry', 'bs3621 locks coventry', 'british standard locks coventry', 'lock upgrade coventry'],
    metaTitle: 'Anti-Snap & BS3621 Locks Coventry | From £79',
    metaDescription: 'Anti-snap door locks and BS3621 lock upgrades in Coventry. Euro cylinders and mortice locks fitted, with lock upgrades from £79. No VAT or call-out fee.',
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug)
}
