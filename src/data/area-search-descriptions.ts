import type { AreaSlug } from './area-authorities.ts'
import type { AreaSearchDescription, AreaSearchDescriptionRegistry } from './area-search-description-types.ts'
import { COVENTRY_AREA_SEARCH_DESCRIPTIONS } from './area-search-descriptions-coventry.ts'
import { NORTH_EAST_AREA_SEARCH_DESCRIPTIONS } from './area-search-descriptions-north-east.ts'
import { SOUTH_WEST_AREA_SEARCH_DESCRIPTIONS } from './area-search-descriptions-south-west.ts'

const mergedDescriptions: AreaSearchDescriptionRegistry = {
  ...COVENTRY_AREA_SEARCH_DESCRIPTIONS,
  ...NORTH_EAST_AREA_SEARCH_DESCRIPTIONS,
  ...SOUTH_WEST_AREA_SEARCH_DESCRIPTIONS,
}

export const AREA_SEARCH_DESCRIPTIONS = mergedDescriptions

export function getAreaSearchDescription(slug: AreaSlug): AreaSearchDescription {
  const entry = AREA_SEARCH_DESCRIPTIONS[slug]
  if (!entry) throw new Error(`Missing governed search description for ${slug}`)
  return entry
}
