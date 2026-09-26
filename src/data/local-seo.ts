import type { Area } from './areas.ts'
import { SITE_CONFIG } from './config.ts'

const MIN_TITLE_LENGTH = 30
const MAX_TITLE_LENGTH = 60

export const SERVICE_HOURS_SCHEMA = {
  '@type': 'OpeningHoursSpecification' as const,
  dayOfWeek: [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ],
  opens: '00:00',
  closes: '23:59',
}

function firstFittingTitle(candidates: string[], label: string): string {
  const title = candidates.find(
    candidate => candidate.length >= MIN_TITLE_LENGTH && candidate.length <= MAX_TITLE_LENGTH,
  )
  if (!title) {
    throw new Error(`No ${MIN_TITLE_LENGTH}-${MAX_TITLE_LENGTH} character search title for ${label}`)
  }
  return title
}

/**
 * Unique SERP title for an area hub. Dedicated towns keep the exact
 * `locksmith {town}` query first; other hubs keep the postcode so nearby
 * suburbs with shared outward codes stay distinct.
 */
export function getAreaSearchTitle(
  area: Pick<Area, 'slug' | 'name' | 'postcode'>,
  hasDedicatedServicePages: boolean,
): string {
  return firstFittingTitle(
    hasDedicatedServicePages
      ? [
          `Locksmith ${area.name} | 24/7 Emergency | From £59`,
          `Locksmith ${area.name} | 24/7 | From £59`,
          `Locksmith ${area.name} | From £59`,
        ]
      : [
          `Locksmith ${area.name} ${area.postcode} | 24/7 Lockouts`,
          `Locksmith ${area.name} ${area.postcode} | 24/7 Help`,
          `Locksmith ${area.name} | 24/7 Lockouts | From £59`,
          `Locksmith ${area.name} ${area.postcode} | From £59`,
          `Locksmith ${area.name} | From £59`,
        ],
    area.slug,
  )
}

export function getAreaSearchH1(
  area: Pick<Area, 'name' | 'postcode'>,
  hasDedicatedServicePages: boolean,
): string {
  // Dedicated-town H1s must remain exactly `Locksmith Services in {name}` so
  // the rendered-owner-card audit can recover the area name. Hub pages can
  // take a unique postcode suffix after an em dash.
  return hasDedicatedServicePages
    ? `Locksmith Services in ${area.name}`
    : `Locksmith Services in ${area.name} — ${area.postcode} Lockouts & Repairs`
}

export function getAreaKeywords(area: Pick<Area, 'name' | 'postcode'>): string {
  const place = area.name.toLowerCase()
  const postcode = area.postcode.toLowerCase()
  return [
    `locksmith ${place}`,
    `emergency locksmith ${place}`,
    `24 hour locksmith ${place}`,
    `locksmith ${postcode}`,
    `locked out ${place}`,
    `lock change ${place}`,
    `upvc locksmith ${place}`,
  ].join(', ')
}

export function getTownServiceKeywords(
  area: Pick<Area, 'name' | 'postcode'>,
  serviceName: string,
): string {
  const place = area.name.toLowerCase()
  return [
    `${serviceName.toLowerCase()} ${place}`,
    `locksmith ${place}`,
    `emergency locksmith ${place}`,
    `locksmith ${area.postcode.toLowerCase()}`,
    `24 hour locksmith ${place}`,
  ].join(', ')
}

export function areaPlaceSchema(
  area: Pick<Area, 'name' | 'postcode' | 'lat' | 'lng'>,
  addressRegion: string,
) {
  return {
    '@type': 'Place' as const,
    name: area.name,
    ...(typeof area.lat === 'number' && typeof area.lng === 'number'
      ? {
          geo: {
            '@type': 'GeoCoordinates' as const,
            latitude: area.lat,
            longitude: area.lng,
          },
        }
      : {}),
    address: {
      '@type': 'PostalAddress' as const,
      postalCode: area.postcode,
      addressRegion,
      addressCountry: 'GB',
    },
  }
}

export function serviceChannelSchema(pageUrl: string) {
  return {
    '@type': 'ServiceChannel' as const,
    serviceUrl: pageUrl,
    servicePhone: {
      '@type': 'ContactPoint' as const,
      telephone: SITE_CONFIG.phoneTel,
      contactType: 'customer service',
      availableLanguage: 'English',
      hoursAvailable: SERVICE_HOURS_SCHEMA,
    },
  }
}

export function pageSocialMetadata(title: string, description: string) {
  return {
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description,
    },
  }
}
