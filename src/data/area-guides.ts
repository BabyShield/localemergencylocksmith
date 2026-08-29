import type { AreaSlug } from './area-authorities'
import { AREAS } from './areas.ts'
import type {
  GovernedAreaGuideDraft,
  PublishedAreaServiceGuidance,
  PublishedGovernedAreaGuide,
} from './area-guide-types'
import {
  SERVICE_TECHNICAL_SOURCE_ROLES,
  SUPPLEMENTAL_GUIDANCE_SOURCE_IDS,
  supplementalGuidanceSourceIds,
  type TechnicalSourceRole,
} from './area-guide-evidence-policy.ts'
import { COVENTRY_AREA_GUIDES } from './area-guides-coventry.ts'
import { NORTH_EAST_AREA_GUIDES } from './area-guides-north-east.ts'
import { SOUTH_WEST_AREA_GUIDES } from './area-guides-south-west.ts'
import { getTechnicalEvidenceSource } from './locksmith-evidence.ts'
import { SERVICE_AREA_SLUGS, type ServiceAreaSlug } from './service-area-types.ts'
import { getAreaSearchDescription } from './area-search-descriptions.ts'

const mergedDraftGuides: Partial<Record<AreaSlug, GovernedAreaGuideDraft>> = {
  ...COVENTRY_AREA_GUIDES,
  ...NORTH_EAST_AREA_GUIDES,
  ...SOUTH_WEST_AREA_GUIDES,
}

const AREA_NAMES = new Map(AREAS.map(area => [area.slug, area.name]))

const SERVICE_SEARCH_HEADINGS: Record<ServiceAreaSlug, string> = {
  'emergency-lockout': 'Emergency Locksmith and Lockout Help',
  'lock-change': 'Lock Repair and Replacement',
  'upvc-lock-repair': 'uPVC Door Lock Repair',
  'boarding-up': 'Emergency Boarding Up',
  'lock-upgrade': 'Lock Upgrades and Door Security',
}

const SERVICE_FAQ_EVIDENCE_LABELS: Record<ServiceAreaSlug, string> = {
  'emergency-lockout': 'How the cited local evidence should be used for this lockout',
  'lock-change': 'How the cited local evidence should be used for lock repair or replacement',
  'upvc-lock-repair': 'How the cited local evidence should be used for uPVC lock diagnosis',
  'boarding-up': 'How the cited local evidence should be used for temporary boarding',
  'lock-upgrade': 'How the cited local evidence should be used for a lock upgrade',
}

function publishedFaq(
  guide: GovernedAreaGuideDraft,
  serviceSlug: ServiceAreaSlug,
): PublishedAreaServiceGuidance['faq'] {
  const guidance = guide.serviceGuidance[serviceSlug]
  const localFactIndex = guidance.localFactIndexes[0]
  const fact = guide.facts[localFactIndex]
  if (!fact) throw new Error(`Missing FAQ fact ${localFactIndex} for ${guide.slug}/${serviceSlug}`)

  const serviceAnswer = guidance.faq.a.trim()
  const evidenceLabel = SERVICE_FAQ_EVIDENCE_LABELS[serviceSlug]
  const evidenceGuidance = fact.serviceRelevance.trim()
  return {
    localFactIndex,
    serviceAnswer,
    evidenceLabel,
    evidenceGuidance,
    q: guidance.faq.q,
    a: `${serviceAnswer} ${evidenceLabel}: ${evidenceGuidance}`,
  }
}

function technicalSourceId(
  guide: GovernedAreaGuideDraft,
  role: TechnicalSourceRole,
): string | undefined {
  if (role === 'mla') {
    return guide.sources.find(source => source.kind === 'technical' && source.id === 'mla-service-calls')?.id
  }

  const suffixByRole = {
    lockAdvice: '-lock-advice',
    doorSecurity: '-door-security',
    forensics: '-forensics',
  } as const

  return guide.sources.find(source => (
    source.kind === 'technical' && source.id.endsWith(suffixByRole[role])
  ))?.id
}

function guidanceText(guidance: GovernedAreaGuideDraft['serviceGuidance'][ServiceAreaSlug]): string {
  return [
    ...guidance.body,
    ...guidance.checks,
    guidance.faq.q,
    guidance.faq.a,
  ].join(' ')
}

function sourceIdsForGuidance(
  guide: GovernedAreaGuideDraft,
  serviceSlug: ServiceAreaSlug,
  guidanceOverride?: GovernedAreaGuideDraft['serviceGuidance'][ServiceAreaSlug],
): string[] {
  const guidance = guidanceOverride ?? guide.serviceGuidance[serviceSlug]
  const sourceById = new Map(guide.sources.map(source => [source.id, source]))
  const factOnlySourceIds = new Set(guide.factOnlySourceIds ?? [])
  const localFactIndexes = guidance.localFactIndexes

  if (
    !Array.isArray(localFactIndexes)
    || localFactIndexes.length === 0
    || new Set(localFactIndexes).size !== localFactIndexes.length
    || localFactIndexes.some(index => !Number.isInteger(index) || index < 0 || index >= guide.facts.length)
  ) {
    throw new Error(`Invalid localFactIndexes for ${guide.slug}/${serviceSlug}`)
  }

  const selectedFacts = localFactIndexes.map(index => guide.facts[index])
  if (selectedFacts.some(fact => fact.sourceIds.some(sourceId => factOnlySourceIds.has(sourceId)))) {
    throw new Error(`Fact-only source selected for ${guide.slug}/${serviceSlug}`)
  }

  const localitySourceIds = selectedFacts
    .flatMap(fact => fact.sourceIds)
    .filter(sourceId => {
      const kind = sourceById.get(sourceId)?.kind
      return !factOnlySourceIds.has(sourceId)
        && (kind === 'locality' || kind === 'property-status')
    })

  if (localitySourceIds.length === 0) {
    throw new Error(`No eligible local source selected for ${guide.slug}/${serviceSlug}`)
  }

  const roles = [...SERVICE_TECHNICAL_SOURCE_ROLES[serviceSlug]]
  if (
    serviceSlug === 'lock-upgrade'
    && /\bTS\s*007\b/i.test(guidanceText(guidance))
  ) {
    roles.push('lockAdvice')
  }

  const technicalSourceIds = roles
    .map(role => technicalSourceId(guide, role))
    .filter((sourceId): sourceId is string => Boolean(sourceId))

  const text = guidanceText(guidance)
  const supplementalSourceIds = supplementalGuidanceSourceIds(text)

  return [...new Set([...localitySourceIds, ...technicalSourceIds, ...supplementalSourceIds])]
}

function publishGuide(guide: GovernedAreaGuideDraft): PublishedGovernedAreaGuide {
  const areaName = AREA_NAMES.get(guide.slug)
  if (!areaName) throw new Error(`Missing area name for governed guide ${guide.slug}`)

  const guidanceWithPublishedFaqs = Object.fromEntries(
    SERVICE_AREA_SLUGS.map(serviceSlug => [
      serviceSlug,
      {
        ...guide.serviceGuidance[serviceSlug],
        faq: publishedFaq(guide, serviceSlug),
      },
    ]),
  ) as unknown as GovernedAreaGuideDraft['serviceGuidance']
  const allGuidanceText = SERVICE_AREA_SLUGS
    .map(serviceSlug => guidanceText(guidanceWithPublishedFaqs[serviceSlug]))
    .join(' ')
  const sources = [...guide.sources]

  for (const sourceId of SUPPLEMENTAL_GUIDANCE_SOURCE_IDS) {
    if (
      supplementalGuidanceSourceIds(allGuidanceText).includes(sourceId)
      && !sources.some(source => source.id === sourceId)
    ) {
      sources.push({ ...getTechnicalEvidenceSource(sourceId), kind: 'technical' })
    }
  }

  const augmentedGuide: GovernedAreaGuideDraft = {
    ...guide,
    sources,
    serviceGuidance: guidanceWithPublishedFaqs,
  }
  const searchDescription = getAreaSearchDescription(guide.slug)
  const serviceGuidance = Object.fromEntries(
    SERVICE_AREA_SLUGS.map((serviceSlug) => {
      const guidance = augmentedGuide.serviceGuidance[serviceSlug]
      return [
        serviceSlug,
        {
          ...guidance,
          searchHeading: `${SERVICE_SEARCH_HEADINGS[serviceSlug]} in ${areaName}`,
          sourceIds: sourceIdsForGuidance(augmentedGuide, serviceSlug, guidance),
        },
      ]
    }),
  ) as Record<ServiceAreaSlug, PublishedAreaServiceGuidance>

  return {
    ...augmentedGuide,
    searchDescription: searchDescription.description,
    searchDescriptionSourceIds: [...searchDescription.sourceIds],
    serviceGuidance,
  }
}

export const AREA_GUIDES = Object.fromEntries(
  Object.entries(mergedDraftGuides).map(([slug, guide]) => [slug, publishGuide(guide)]),
) as Record<AreaSlug, PublishedGovernedAreaGuide>

export function getAreaGuide(areaSlug: string): PublishedGovernedAreaGuide | undefined {
  return AREA_GUIDES[areaSlug as AreaSlug]
}
