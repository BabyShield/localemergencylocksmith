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

export interface AreaServiceGuidanceDraft {
  heading: string
  body: string[]
  checks: string[]
  faq: { q: string; a: string }
}

// Keep the authored guide modules on the draft shape. The public registry
// normalises every record before it can be rendered.
export type AreaServiceGuidance = AreaServiceGuidanceDraft

export interface PublishedAreaServiceGuidance extends AreaServiceGuidanceDraft {
  searchHeading: string
  sourceIds: string[]
}

export interface GovernedAreaGuideDraft {
  slug: AreaSlug
  reviewedOn: string
  summary: string[]
  accessGuidance: string
  evidenceLimits: string
  facts: AreaGuideFact[]
  sources: AreaGuideSource[]
  serviceGuidance: Record<ServiceAreaSlug, AreaServiceGuidanceDraft>
  faqs: { q: string; a: string }[]
}

export type GovernedAreaGuide = GovernedAreaGuideDraft

export interface PublishedGovernedAreaGuide extends Omit<GovernedAreaGuideDraft, 'serviceGuidance'> {
  searchDescription: string
  searchDescriptionSourceIds: string[]
  serviceGuidance: Record<ServiceAreaSlug, PublishedAreaServiceGuidance>
}
