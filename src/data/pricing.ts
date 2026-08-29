import type { ServiceAreaSlug } from './service-area-types'

/**
 * The single published starting-price catalogue used by the homepage, prices
 * page, structured data and service pages. New monetary claims must be added
 * here deliberately; diagnosis-led work stays quote-only.
 */
export const PUBLISHED_PRICES = [
  {
    id: 'emergency-lockout',
    service: 'Emergency lockout',
    price: 59,
    detail: 'Standard residential lockout where the assessed entry method and stated labour scope apply.',
    includes: 'Stated labour scope',
  },
  {
    id: 'euro-cylinder-replacement',
    service: 'Euro cylinder replacement',
    price: 59,
    detail: 'Supply and fit a compatible euro cylinder where the inspected door, size and stated scope apply.',
    includes: 'Cylinder + fitting',
  },
  {
    id: 'yale-nightlatch',
    service: 'Yale nightlatch repair or replacement',
    price: 69,
    detail: 'Repair or replacement where the inspected door and compatible nightlatch allow the stated scope.',
    includes: 'Agreed lock + fitting scope',
  },
  {
    id: 'bs3621-mortice',
    service: 'Lock change (BS3621-rated)',
    price: 79,
    detail: 'British Standard five-lever mortice deadlock. Check your own policy for the exact lock requirement.',
    includes: 'Lock + fitting',
  },
  {
    id: 'anti-snap-cylinder',
    service: 'Anti-snap euro cylinder',
    price: 59,
    detail: 'Supply and fit a compatible independently certified cylinder after the required size and door fit are checked.',
    includes: 'Cylinder + fitting',
  },
  {
    id: 'upvc-lock-repair',
    service: 'uPVC lock repair',
    price: 59,
    detail: 'Repair of a diagnosed multipoint-mechanism, cylinder or handle fault under the agreed scope.',
    includes: 'Agreed repair scope',
  },
  {
    id: 'upvc-gearbox-replacement',
    service: 'uPVC multipoint gearbox replacement',
    price: 89,
    detail: 'Replacement gearbox where the exact mechanism is identified and a compatible part is available.',
    includes: 'Gearbox + fitting',
  },
  {
    id: 'emergency-boarding',
    service: 'Boarding up (emergency)',
    price: 79,
    detail: 'Temporary boarding of one damaged opening after its dimensions and safe fixing points are assessed.',
    includes: 'Agreed materials + labour scope',
  },
  {
    id: 'window-lock-repair',
    service: 'Window lock repair',
    price: 49,
    detail: 'Repair or replacement of diagnosed window-lock hardware under the agreed scope.',
    includes: 'Agreed repair scope',
  },
] as const

export type PublishedPriceId = (typeof PUBLISHED_PRICES)[number]['id']
export type PublishedPrice = (typeof PUBLISHED_PRICES)[number]

export const PUBLISHED_PRICE_BY_ID = Object.fromEntries(
  PUBLISHED_PRICES.map(price => [price.id, price]),
) as Record<PublishedPriceId, PublishedPrice>

export const SERVICE_STARTING_PRICE_IDS = {
  'emergency-lockout': 'emergency-lockout',
  'lock-change': 'euro-cylinder-replacement',
  'upvc-lock-repair': 'upvc-lock-repair',
  'boarding-up': 'emergency-boarding',
  'lock-upgrade': 'anti-snap-cylinder',
} as const satisfies Record<ServiceAreaSlug, PublishedPriceId>

export function serviceStartingPrice(serviceSlug: ServiceAreaSlug): number {
  return PUBLISHED_PRICE_BY_ID[SERVICE_STARTING_PRICE_IDS[serviceSlug]].price
}

export type ServicePriceDetail =
  | { item: string; publishedPriceId: PublishedPriceId }
  | { item: string; quoteLabel: 'Quoted after inspection' | 'Itemised quote after inspection' }

export const SERVICE_PRICE_DETAILS = {
  'emergency-lockout': [
    { item: 'Standard residential lockout', publishedPriceId: 'emergency-lockout' },
    { item: 'Multipoint or failed-mechanism lockout', quoteLabel: 'Quoted after inspection' },
    { item: 'High-security or otherwise complex lockout', quoteLabel: 'Quoted after inspection' },
    { item: 'Compatible euro cylinder replacement after entry (if needed)', publishedPriceId: 'euro-cylinder-replacement' },
  ],
  'lock-change': [
    { item: 'Yale nightlatch repair or replacement', publishedPriceId: 'yale-nightlatch' },
    { item: 'Euro cylinder replacement', publishedPriceId: 'euro-cylinder-replacement' },
    { item: 'BS3621-rated mortice lock replacement', publishedPriceId: 'bs3621-mortice' },
    { item: 'Multiple lock changes', quoteLabel: 'Itemised quote after inspection' },
  ],
  'upvc-lock-repair': [
    { item: 'uPVC lock repair', publishedPriceId: 'upvc-lock-repair' },
    { item: 'Compatible mechanism or gearbox replacement', publishedPriceId: 'upvc-gearbox-replacement' },
    { item: 'Handle work', quoteLabel: 'Quoted after inspection' },
    { item: 'Door alignment work', quoteLabel: 'Quoted after inspection' },
    { item: 'Window lock repair', publishedPriceId: 'window-lock-repair' },
  ],
  'boarding-up': [
    { item: 'Temporary boarding of one assessed damaged opening', publishedPriceId: 'emergency-boarding' },
    { item: 'Additional or unusually sized openings', quoteLabel: 'Itemised quote after inspection' },
    { item: 'Separate lock, glazing, joinery or structural work', quoteLabel: 'Quoted after inspection' },
  ],
  'lock-upgrade': [
    { item: 'Compatible anti-snap euro cylinder', publishedPriceId: 'anti-snap-cylinder' },
    { item: 'BS3621-rated mortice deadlock', publishedPriceId: 'bs3621-mortice' },
    { item: 'Combined front-door upgrade', quoteLabel: 'Itemised quote after inspection' },
    { item: 'Multiple-door upgrade', quoteLabel: 'Itemised quote after inspection' },
  ],
} as const satisfies Record<ServiceAreaSlug, readonly ServicePriceDetail[]>

export function startingPriceLabel(id: PublishedPriceId): string {
  return `From £${PUBLISHED_PRICE_BY_ID[id].price}`
}

export function servicePriceLabel(detail: ServicePriceDetail): string {
  return 'publishedPriceId' in detail
    ? startingPriceLabel(detail.publishedPriceId)
    : detail.quoteLabel
}
