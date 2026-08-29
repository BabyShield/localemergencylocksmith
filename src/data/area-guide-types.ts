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
  /** Zero-based indexes of guide.facts that directly inform this service guidance. */
  localFactIndexes: number[]
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
  /**
   * `hub-context-only` keeps locality facts and their citations on the area hub
   * without presenting them as evidence for a service diagnosis or method.
   */
  serviceEvidenceMode?: 'pair-linked' | 'hub-context-only'
  reviewedOn: string
  summary: string[]
  accessGuidance: string
  evidenceLimits: string
  facts: AreaGuideFact[]
  sources: AreaGuideSource[]
  /**
   * Local sources that support a visible factual profile only. These are kept
   * off service-guidance citations unless a service paragraph explicitly earns
   * a narrower claim-to-source relationship in future.
   */
  factOnlySourceIds?: string[]
  serviceGuidance: Record<ServiceAreaSlug, AreaServiceGuidanceDraft>
  faqs: { q: string; a: string }[]
}

export type GovernedAreaGuide = GovernedAreaGuideDraft

export interface PublishedGovernedAreaGuide extends Omit<GovernedAreaGuideDraft, 'serviceGuidance'> {
  searchDescription: string
  searchDescriptionSourceIds: string[]
  serviceGuidance: Record<ServiceAreaSlug, PublishedAreaServiceGuidance>
}
