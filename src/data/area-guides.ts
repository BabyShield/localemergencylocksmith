import type { AreaSlug } from './area-authorities'
import type { GovernedAreaGuide } from './area-guide-types'
import { COVENTRY_AREA_GUIDES } from './area-guides-coventry.ts'
import { NORTH_EAST_AREA_GUIDES } from './area-guides-north-east.ts'
import { SOUTH_WEST_AREA_GUIDES } from './area-guides-south-west.ts'

const mergedGuides: Partial<Record<AreaSlug, GovernedAreaGuide>> = {
  ...COVENTRY_AREA_GUIDES,
  ...NORTH_EAST_AREA_GUIDES,
  ...SOUTH_WEST_AREA_GUIDES,
}

export const AREA_GUIDES = mergedGuides as Record<AreaSlug, GovernedAreaGuide>

export function getAreaGuide(areaSlug: string): GovernedAreaGuide | undefined {
  return AREA_GUIDES[areaSlug as AreaSlug]
}
