import type { AreaSlug } from './area-authorities'

export interface AreaSearchDescription {
  description: string
  sourceIds: string[]
}

// Regional modules author one reviewed subset each; the merged registry is
// checked for complete 78-area coverage before any guide can be published.
export type AreaSearchDescriptionRegistry = Partial<Record<AreaSlug, AreaSearchDescription>>
