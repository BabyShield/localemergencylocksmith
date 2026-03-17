// Aggregates all area facts into a single lookup by slug
import type { AreaFact } from '@/components/AreaFacts'
import { COVENTRY_FACTS } from './area-facts-coventry'
import { NUNEATON_FACTS } from './area-facts-nuneaton'
import { SOUTH_FACTS } from './area-facts-south'
import { NEARBY_FACTS } from './area-facts-nearby'

export type { AreaFact }

export const AREA_FACTS: Record<string, AreaFact[]> = {
  ...COVENTRY_FACTS,
  ...NUNEATON_FACTS,
  ...SOUTH_FACTS,
  ...NEARBY_FACTS,
}

export function getAreaFacts(slug: string): AreaFact[] {
  return AREA_FACTS[slug] || []
}
