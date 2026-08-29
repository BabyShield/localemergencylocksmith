import type { ServiceAreaSlug } from './service-area-types'

export type TechnicalSourceRole = 'mla' | 'lockAdvice' | 'doorSecurity' | 'forensics'

export const SERVICE_TECHNICAL_SOURCE_ROLES: Record<ServiceAreaSlug, readonly TechnicalSourceRole[]> = {
  'emergency-lockout': ['mla', 'doorSecurity'],
  'lock-change': ['mla', 'doorSecurity'],
  'upvc-lock-repair': ['mla', 'lockAdvice', 'doorSecurity'],
  'boarding-up': ['mla', 'forensics'],
  'lock-upgrade': ['mla', 'doorSecurity'],
}

export const SUPPLEMENTAL_GUIDANCE_SOURCE_IDS = [
  'mila-door-locks-catalogue',
  'govuk-listed-building-consent',
] as const

function hasListedBuildingTerm(sentence: string): boolean {
  return /\b(?:listed-building|listed (?:buildings?|assets?|status|fabric|properties|property|premises|barns?|farmhouses?|churches?)|listed (?:and|or) (?:locally listed|scheduled) (?:buildings?|assets?)|listed(?:,\s*| (?:or|and) )(?:conservation|management|managed|managed-property|property|communal|institutional|within)|protected or listed|grade (?:i|ii\*?|iii) listed)\b/i.test(sentence)
}

function hasListedWorkInstruction(sentence: string): boolean {
  if (/\b(?:consents?|permissions?|approvals?|fabric|visible (?:work|changes?|replacements?|alterations?)|external (?:work|changes?|attachments?|alterations?)|controls?)\b/i.test(sentence)) {
    return true
  }

  const action = '(?:check\\w*|confirm\\w*|verify\\w*|resolve\\w*|obtain\\w*|apply\\w*|meet\\w*|engage\\w*|require\\w*)'
  const governedTerm = '(?:conditions?|constraints?|requirements?|rules?)'
  return new RegExp(`\\b(?:${action}.{0,100}\\b${governedTerm}|${governedTerm}.{0,100}\\b${action})\\b`, 'i').test(sentence)
}

function hasListedBuildingWorkClaim(text: string): boolean {
  const sentences = text.match(/[^.!?]+[.!?]?/g) ?? []

  const isEvidenceLimit = (sentence: string) => (
    /\b(?:do|does|did) not\b|\bcannot\b|\bnone\b|\bno listed\b|\b(?:governing evidence limit|source-backed fact selected for this decision|relevant official locality context) is:/i.test(sentence)
  )

  const hasDirectClaim = sentences.some(sentence => {
    if (!hasListedBuildingTerm(sentence)) return false

    // A sentence that limits what evidence proves is not itself consent advice.
    if (isEvidenceLimit(sentence)) return false

    return hasListedWorkInstruction(sentence)
  })

  if (hasDirectClaim) return true

  // A page can state the address-specific listed status first and give the
  // conditional consent instruction in the next sentence. Attribute that
  // combined guidance without treating a negative evidence limit as a claim.
  const hasPositiveListedContext = sentences.some(sentence => (
    hasListedBuildingTerm(sentence)
    && !isEvidenceLimit(sentence)
    && /\b(?:check\w*|confirm\w*|verify\w*|status|controls?|setting|communal|within|protected|grade|individually|named|exact)\b/i.test(sentence)
  ))
  const hasSeparateWorkAdvice = sentences.some(sentence => (
    !isEvidenceLimit(sentence)
    && /\b(?:consents?|permissions?|approvals?|fabric|visible (?:work|changes?|replacements?|alterations?)|external (?:work|changes?|attachments?|alterations?))\b/i.test(sentence)
  ))

  return hasPositiveListedContext && hasSeparateWorkAdvice
}

export function supplementalGuidanceSourceIds(text: string): string[] {
  const sourceIds: string[] = []

  if (/\b(?:faceplate|backset|centres|locking layout|component geometry|multipoint (?:part|component))\b/i.test(text)) {
    sourceIds.push('mila-door-locks-catalogue')
  }

  if (hasListedBuildingWorkClaim(text)) {
    sourceIds.push('govuk-listed-building-consent')
  }

  return sourceIds
}
