import type { AreaSlug } from './area-authorities'
import type { ServiceAreaSlug } from './service-area-types'
import type { EvidenceSource } from './locksmith-evidence'

export type AreaGuideSourceKind = 'locality' | 'property-status' | 'technical'

export interface AreaGuideSource extends EvidenceSource {
  kind: AreaGuideSourceKind
}

export interface AreaGuideFact {
  text: string
  sourceIds: string[]
  serviceRelevance: string
}

export interface AreaServiceGuidance {
  heading: string
  body: string[]
  checks: string[]
  faq: { q: string; a: string }
}

export interface GovernedAreaGuide {
  slug: AreaSlug
  reviewedOn: string
  summary: string[]
  accessGuidance: string
  evidenceLimits: string
  facts: AreaGuideFact[]
  sources: AreaGuideSource[]
  serviceGuidance: Record<ServiceAreaSlug, AreaServiceGuidance>
  faqs: { q: string; a: string }[]
}
