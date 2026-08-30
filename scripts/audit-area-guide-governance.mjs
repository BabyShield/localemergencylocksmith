import { existsSync } from 'node:fs'
import { AREAS } from '../src/data/areas.ts'
import { getAreaAuthority } from '../src/data/area-authorities.ts'
import { SERVICES } from '../src/data/services.ts'
import { AREA_GUIDES } from '../src/data/area-guides.ts'
import { COVENTRY_AREA_GUIDES } from '../src/data/area-guides-coventry.ts'
import { NORTH_EAST_AREA_GUIDES } from '../src/data/area-guides-north-east.ts'
import { SOUTH_WEST_AREA_GUIDES } from '../src/data/area-guides-south-west.ts'
import { SERVICE_AREA_SLUGS } from '../src/data/service-area-types.ts'
import { TECHNICAL_EVIDENCE_SOURCES } from '../src/data/locksmith-evidence.ts'
import { supplementalGuidanceSourceIds } from '../src/data/area-guide-evidence-policy.ts'

const EXPECTED_AREA_COUNT = 78
const EXPECTED_SERVICE_COUNT = 5
const EXPECTED_GUIDANCE_COUNT = EXPECTED_AREA_COUNT * EXPECTED_SERVICE_COUNT
const ALLOWED_AREA_FIELDS = new Set(['slug', 'name', 'postcode', 'region', 'lat', 'lng', 'neighbours'])
const RETIRED_UNGOVERNED_FILES = [
  '../src/data/area-facts.ts',
  '../src/data/area-facts-coventry.ts',
  '../src/data/area-facts-nearby.ts',
  '../src/data/area-facts-nuneaton.ts',
  '../src/data/area-facts-south.ts',
  '../src/components/AreaFacts.tsx',
  '../src/components/LockBrands.tsx',
]
const MIN_HUB_OWNED_EDITORIAL_WORDS = 900
const MIN_DEDICATED_PARENT_EDITORIAL_WORDS = 550
const MIN_AREA_FACTS = 3
const MAX_AREA_FACTS = 4
const MIN_AREA_FACT_SOURCES = 2
const MIN_GUIDANCE_WORDS = 120
const MAX_EVIDENCE_AGE_DAYS = 366
const DECLARED_REVIEW_DATE = '2026-08-30'
const SYSTEM_UTC_DATE = new Date().toISOString().slice(0, 10)
const AUDIT_AS_OF = process.env.AREA_GUIDE_AUDIT_AS_OF
  ?? (SYSTEM_UTC_DATE > DECLARED_REVIEW_DATE ? SYSTEM_UTC_DATE : DECLARED_REVIEW_DATE)

// A complete area hub deliberately discusses all five services. These limits
// compare the pair-specific guidance itself, not page chrome or navigation.
const MAX_GLOBAL_P95_OVERLAP = 0.35
const MAX_GLOBAL_PAIR_OVERLAP = 0.50
const MAX_WITHIN_AREA_P95_OVERLAP = 0.35
const MAX_WITHIN_AREA_PAIR_OVERLAP = 0.45
const MAX_WITHIN_SERVICE_P95_OVERLAP = 0.35
const MAX_WITHIN_SERVICE_PAIR_OVERLAP = 0.45
const MAX_DEDICATED_PARENT_P95_OVERLAP = 0.30
const MAX_DEDICATED_PARENT_PAIR_OVERLAP = 0.35
const MAX_WITHIN_PAGE_FAQ_ANSWER_OVERLAP = 0.65
const MIN_CHECK_UNIQUENESS_RATIO = 0.72
const MIN_PAIR_UNIQUE_CHECKS = 2
const MIN_PAIR_UNIQUE_BODY_SHINGLES = 50
const MIN_PAIR_UNIQUE_BODY_SHINGLE_RATIO = 0.35
const MIN_EXACT_DUPLICATE_SENTENCE_WORDS = 10
const MIN_CROSS_RECORD_SENTENCE_WORDS = 8
const MIN_AREA_NEUTRAL_FAQ_FAMILIES = 85
const MAX_AREA_NEUTRAL_FAQ_FAMILY_SIZE = 5

// Keep these ownership and evidence-mode lists independent from production
// routing/data so a generator change cannot silently weaken the audit.
const AUDIT_DEDICATED_AREA_SLUGS = new Set([
  'nuneaton',
  'bedworth',
  'rugby',
  'leamington-spa',
  'warwick',
  'kenilworth',
  'stratford-upon-avon',
])
const AUDIT_HUB_CONTEXT_ONLY_SLUGS = new Set()
const AUDIT_SOLIHULL_REGION_SLUGS = new Set([
  'balsall-common',
  'meriden',
  'hampton-in-arden',
])

// This is an independent release contract. Do not import the production role
// map here: otherwise weakening the generator would also weaken its audit.
const AUDIT_SERVICE_TECHNICAL_SOURCE_ROLES = Object.freeze({
  'emergency-lockout': ['mla', 'doorSecurity'],
  'lock-change': ['mla', 'doorSecurity'],
  'upvc-lock-repair': ['mla', 'lockAdvice', 'doorSecurity'],
  'boarding-up': ['mla', 'forensics'],
  'lock-upgrade': ['mla', 'doorSecurity'],
})

const AUDIT_SERVICE_SEARCH_HEADING_INTENTS = Object.freeze({
  'emergency-lockout': {
    label: 'emergency locksmith and lockout',
    patterns: [/\bemergency locksmith\b/i, /\blockout\b/i],
  },
  'lock-change': {
    label: 'lock repair and replacement',
    patterns: [/\block repair\b/i, /\breplacement\b/i],
  },
  'upvc-lock-repair': {
    label: 'uPVC door lock repair',
    patterns: [/\bupvc\b/i, /\bdoor lock repair\b/i],
  },
  'boarding-up': {
    label: 'emergency boarding up',
    patterns: [/\bemergency boarding up\b/i],
  },
  'lock-upgrade': {
    label: 'lock upgrades and door security',
    patterns: [/\block upgrades?\b/i, /\bdoor security\b/i],
  },
})

const CUSTOMER_VISIBLE_PROSE_LINTS = Object.freeze([
  {
    label: 'raw backtick',
    pattern: /`/,
  },
  {
    label: 'high-confidence a/an agreement error',
    pattern: /\ba (?:actual|address|affected|appropriate|area|authorised|available|emergency|entrance|exact|existing|individual|industrial|opening|urgent)\b|\ban (?:euro(?:[- ]\w+)?|one(?:-\w+)?|uniform|unit|universal|university|unique|upvc|user)\b/i,
  },
  {
    label: 'customer-visible implementation term "slug"',
    pattern: /\bslug\b/i,
  },
  {
    label: 'invalid noun-to-verb substitution after "after that"',
    pattern: /\bafter that (?:appraise|assess|consider|examine) should\b/i,
  },
  {
    label: 'lowercase sentence start from a style substitution',
    pattern: /(?:^|[.!?]\s+)(?:appraise|assess|clarify|consider|describe|determine|establish|evaluate|examine|outline|pinpoint|specify|verify)\b/,
  },
])

const HUB_CONTEXT_ONLY_BODY_LINTS = Object.freeze([
  {
    label: 'local-record source attribution',
    pattern: /\b(?:source|record|evidence)s?\s+(?:from|published by|provided by|shows?|states?|describes?|records?|supports?)\s+(?:the\s+)?(?:council|local authority|municipal|borough|planning|conservation|locality|park|street register|ward|rail(?:way)?|train|historic|medieval|manor|parish)\b/i,
  },
  {
    label: 'local-record source description',
    pattern: /\b(?:council|local authority|municipal|borough|planning|conservation|locality|park|street register|ward|rail(?:way)?|train|historic|medieval|manor|parish|public[- ]space|recreation ground)\s+(?:source|record|evidence|dataset|map|page|directory|register|schedule|plan|project|workstream|context|history|figure)s?\b/i,
  },
  {
    label: 'retired locality-context shorthand',
    pattern: /\b(?:area-level evidence|engagement schedule|ward pilot|station passengers?|public[- ]place|property (?:record|status|evidence|information)|current (?:record|status|evidence))\b/i,
  },
])

const failures = []
const warnings = []

const UNSUPPORTED_AGREEMENT_TO_WORK_PATTERN = /\bagree(?:d|ment|ing)?\s+(?:what\s+(?:may\s+be\s+changed|remains\s+and\s+what\s+may\s+change)|(?:to\s+)?(?:the\s+|an?\s+|any\s+)?(?:(?:proposed|supported|compatible|authorised|outside|temporary|repair|access|revised)\s+){0,3}(?:scope|work|method|measure|repair|access|security|specification))\b/i
const NON_HERITAGE_PLANNING_GUIDANCE_SLUGS = new Set(['cawston', 'new-bilton'])
const UNSUPPORTED_PHYSICAL_STATUS_CHECK_PATTERN = /\b(?:check|verify|confirm)\b[^.!?]{0,100}\b(?:listing|conservation|designation|(?:the\s+)?(?:exact\s+)?property(?:'s)?\s+(?:present\s+|current\s+)?status|current\s+status|protected(?:\s+or\s+controlled)?\s+fabric)\b/i

const BANNED_CLAIM_PATTERNS = [
  {
    label: 'fixed response-time claim',
    pattern: /\b\d{1,3}\s*(?:-|–|—|to)\s*\d{1,3}\s*minutes?\b/i,
  },
  {
    label: 'unsupported attendance-frequency claim',
    pattern: /\b(?:i|we)\s+(?:regularly|often|frequently|usually|commonly)\s+(?:attend|handle|respond|cover|work|visit)\b/i,
  },
  {
    label: 'unsupported job-frequency claim',
    pattern: /\b(?:most common|commonest|frequent(?:ly)?\s+(?:call|job|booking)|higher-than-average\s+(?:call|demand))\b/i,
  },
  {
    label: 'unsupported proximity claim',
    pattern: /\b(?:already nearby|close to (?:my|our) base|fastest (?:area|response)|quickest (?:area|response))\b/i,
  },
  {
    label: 'unsupported universal property claim',
    pattern: /\b(?:all|every)\s+(?:home|house|property|door|address)(?:s)?\s+(?:in|across|within)\b/i,
  },
  {
    label: 'ranking claim',
    pattern: /\b(?:rank(?:s|ed|ing)?\s+(?:first|number one|#1)|first[- ]page ranking|guaranteed rankings?)\b/i,
  },
  {
    label: 'unsupported symptom-to-component diagnosis',
    pattern: /\b(?:observations|symptoms|comparison|sequence)\s+(?:can|help|helps|direct|guide|let).{0,48}\b(?:alignment|keeps?|cylinder|handles?|gearbox)\b/i,
  },
  {
    label: 'unsupported inspection-to-component diagnosis',
    pattern: /\b(?:inspection can (?:then )?(?:separate|distinguish|isolate|identify)|inspection (?:distinguishes|separates|identifies)|inspection to (?:separate|distinguish|isolate|identify)|(?:diagnosis|inspection) can distinguish|the locksmith can examine.{0,80}\bdetermine|components? can then be (?:assessed|identified|isolated))\b/i,
  },
  {
    label: 'unsupported boarding specification',
    pattern: /\b(?:board (?:dimensions?|size|materials?|construction)|fastenings|fixing (?:points?|positions?|locations?)|(?:intended|proposed|temporary|safe) support (?:points?|positions?|locations?)|(?:inspected\s+)?substrate\s+supports?\s+(?:the\s+)?attachment|authori[sz]ed\s+attachment\s+(?:points?|positions?|locations?))\b/i,
  },
  {
    label: 'unsupported generic product-performance claim',
    pattern: /\b(?:tested resistance|certified component|verified testing|marked certification|product performance|tested product evidence|tested conditions|product properties)\b/i,
  },
  {
    label: 'unscoped fire-door claim',
    pattern: /\b(?:fire[- ]door|fire[- ]rated|fire[- ]safety)\b/i,
  },
  {
    label: 'unsupported MLA scope attribution',
    pattern: /\bMLA (?:source|guidance|evidence)\b[^.!?]{0,140}\b(?:scope|method|technique|work)\b/i,
  },
  {
    label: 'unsupported agreement to work or scope',
    pattern: UNSUPPORTED_AGREEMENT_TO_WORK_PATTERN,
  },
  {
    label: 'unsupported work-and-price agreement bundle',
    pattern: /\b(?:scope|work|method|measure|repair|access|specification)\s+(?:and|or|,)\s+(?:the\s+)?(?:(?:expected|likely|anticipated|revised)\s+)?(?:price|cost|charge)\s+(?:is|are|be|being|was|were)?\s*agree(?:d|ment|ing)?\b/i,
  },
  {
    label: 'unsupported price-and-work agreement bundle',
    pattern: /\bagree(?:d|ment|ing)?\b[^.!?]{0,100}\b(?:price|cost|charge)\s+(?:and|or|,)\s+(?:the\s+)?(?:scope|work|method|measure|repair|access|specification)\b/i,
  },
]

function check(condition, message) {
  if (!condition) failures.push(message)
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

for (const fixture of [
  'agreeing temporary scope',
  'agreeing temporary work',
  'agreeing a method',
  'agreeing what may be changed',
  'agreeing what remains and what may change',
  'agreeing temporary security',
]) {
  check(UNSUPPORTED_AGREEMENT_TO_WORK_PATTERN.test(fixture), `unsupported agreement detector misses fixture: ${fixture}`)
}
check(
  !UNSUPPORTED_AGREEMENT_TO_WORK_PATTERN.test('obtain agreement if the service-call price changes'),
  'unsupported agreement detector rejects bounded changed-price wording',
)
check(
  UNSUPPORTED_PHYSICAL_STATUS_CHECK_PATTERN.test('check the exact property current status before visible alteration'),
  'unsupported physical-status detector misses an exact-property status check',
)
check(
  !UNSUPPORTED_PHYSICAL_STATUS_CHECK_PATTERN.test('confirm the responsible controller before changing shared hardware'),
  'unsupported physical-status detector rejects a bounded controller check',
)

check(
  !supplementalGuidanceSourceIds('The records do not prove listed or conservation status, access permission or service conditions.').includes('govuk-listed-building-consent'),
  'listed-building source policy must reject a negative evidence-limit sentence',
)
check(
  !supplementalGuidanceSourceIds('The council-listed community spaces do not identify a private entrance.').includes('govuk-listed-building-consent'),
  'listed-building source policy must reject listed as a general verb',
)
check(
  !supplementalGuidanceSourceIds('Reinstatement or external alteration is listed separately.').includes('govuk-listed-building-consent'),
  'listed-building source policy must reject listed as an adverbial description',
)
check(
  supplementalGuidanceSourceIds('Obtain any listed-building consent required before altering visible fabric.').includes('govuk-listed-building-consent'),
  'listed-building source policy must recognise conditional consent guidance',
)
check(
  supplementalGuidanceSourceIds("The exact property's listed status must be checked separately. Obtain any heritage consent required before visible work.").includes('govuk-listed-building-consent'),
  'listed-building source policy must recognise listed context and consent advice split across sentences',
)
check(
  supplementalGuidanceSourceIds('Listed, conservation or managed-property controls must be checked before external work.').includes('govuk-listed-building-consent'),
  'listed-building source policy must recognise a punctuated listed-property control instruction',
)
check(
  supplementalGuidanceSourceIds('If the entrance belongs to a listed, communal or institutional setting, confirm the applicable permissions.').includes('govuk-listed-building-consent'),
  'listed-building source policy must recognise list punctuation and plural permissions',
)
check(
  supplementalGuidanceSourceIds('If the request concerns the named listed barn, its record must inform permission checks.').includes('govuk-listed-building-consent'),
  'listed-building source policy must recognise a specifically listed barn',
)
check(
  !supplementalGuidanceSourceIds('The parish record describes a boundary alteration. Historic England separately records one named listed barn.').includes('govuk-listed-building-consent'),
  'listed-building source policy must not treat historical boundary alteration as consent advice',
)
check(
  supplementalGuidanceSourceIds('Before external work, check whether the building is one of the listed or locally listed buildings.').includes('govuk-listed-building-consent'),
  'listed-building source policy must recognise plural listed-building wording',
)
check(
  supplementalGuidanceSourceIds('The named property is individually Grade II listed. Confirm its permissions before a visible change.').includes('govuk-listed-building-consent'),
  'listed-building source policy must recognise a Grade II listed property across sentences',
)
check(
  supplementalGuidanceSourceIds('Check any listed or managed status before visible change.').includes('govuk-listed-building-consent'),
  'listed-building source policy must recognise listed-or-managed status guidance',
)
check(
  !supplementalGuidanceSourceIds('The report records archaeological constraint areas and eight listed buildings. Obtain the customer property permission before work.').includes('govuk-listed-building-consent'),
  'listed-building source policy must reject bare area counts followed by generic property permission',
)
check(
  supplementalGuidanceSourceIds('Before any visible change, check the exact designation because the character area includes listed assets.').includes('govuk-listed-building-consent'),
  'listed-building source policy must recognise an explicit designation check before visible change',
)
check(
  supplementalGuidanceSourceIds('Because the area totals include eight listed buildings, verify whether the address has protected status before visible changes.').includes('govuk-listed-building-consent'),
  'listed-building source policy must recognise protected-status verification tied to visible change',
)
check(
  supplementalGuidanceSourceIds('Record the faceplate, backset and PZ centres before checking the part.').includes('mila-door-locks-catalogue'),
  'Mila source policy must recognise the dimensions its cited pages document',
)
check(
  !supplementalGuidanceSourceIds('The borough lists Rugby Town Centre and several named local centres.').includes('mila-door-locks-catalogue'),
  'Mila source policy must not treat geographic centres as lock geometry',
)
check(
  !supplementalGuidanceSourceIds('Confirm that any proposed component is compatible after inspection.').includes('mila-door-locks-catalogue'),
  'Mila source policy must not attach to generic compatibility wording alone',
)

function wordCount(value) {
  return typeof value === 'string'
    ? (value.match(/[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu) ?? []).length
    : 0
}

function firstSentence(value) {
  return String(value ?? '').match(/^[\s\S]*?[.!?](?=\s|$)/)?.[0] ?? String(value ?? '')
}

function normalise(value) {
  return String(value ?? '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function areaNeutralFaqKey(value, area) {
  const areaTokens = new Set(normalise(`${area.name} ${area.postcode}`).split(' ').filter(Boolean))
  return normalise(value)
    .split(' ')
    .filter(token => !areaTokens.has(token))
    .join(' ')
}

function exactLongSentenceDuplicates(blocks) {
  const occurrencesBySentence = new Map()

  for (const block of blocks) {
    const sentences = String(block.value ?? '').match(/[^.!?]+(?:[.!?]+|$)/g) ?? []
    const seenInBlock = new Set()
    for (const sentence of sentences) {
      if (wordCount(sentence) < MIN_EXACT_DUPLICATE_SENTENCE_WORDS) continue
      const key = normalise(sentence)
      if (!key || seenInBlock.has(key)) continue
      seenInBlock.add(key)
      const occurrences = occurrencesBySentence.get(key) ?? []
      occurrences.push({ owner: block.owner, sentence: sentence.trim() })
      occurrencesBySentence.set(key, occurrences)
    }
  }

  return [...occurrencesBySentence.values()].filter(occurrences => (
    new Set(occurrences.map(occurrence => occurrence.owner)).size > 1
  ))
}

function longSentenceKeys(values, minimumWords = MIN_CROSS_RECORD_SENTENCE_WORDS) {
  return values.flatMap(value => {
    const sentences = String(value ?? '').match(/[^.!?]+(?:[.!?]+|$)/g) ?? []
    return sentences
      .filter(sentence => wordCount(sentence) >= minimumWords)
      .map(sentence => normalise(sentence))
      .filter(Boolean)
  })
}

function shingles(value, width = 5) {
  const words = normalise(value).split(' ').filter(Boolean)
  const result = new Set()
  for (let index = 0; index <= words.length - width; index += 1) {
    result.add(words.slice(index, index + width).join(' '))
  }
  return result
}

function overlapCoefficient(left, right) {
  const denominator = Math.min(left.size, right.size)
  if (denominator === 0) return 0
  let intersection = 0
  for (const item of left) if (right.has(item)) intersection += 1
  return intersection / denominator
}

function percentile(values, fraction) {
  if (values.length === 0) return 0
  const sorted = [...values].sort((left, right) => left - right)
  return sorted[Math.min(sorted.length - 1, Math.ceil(sorted.length * fraction) - 1)]
}

function summary(values) {
  if (values.length === 0) return { min: 0, median: 0, p95: 0, max: 0 }
  const sorted = [...values].sort((left, right) => left - right)
  return {
    min: sorted[0],
    median: percentile(sorted, 0.5),
    p95: percentile(sorted, 0.95),
    max: sorted.at(-1),
  }
}

function validateDate(value, label) {
  check(/^\d{4}-\d{2}-\d{2}$/.test(value ?? ''), `${label} must be YYYY-MM-DD: ${JSON.stringify(value)}`)
  const date = new Date(`${value}T00:00:00Z`)
  if (Number.isNaN(date.getTime())) return null
  const asOf = new Date(`${AUDIT_AS_OF}T00:00:00Z`)
  check(date.getTime() <= asOf.getTime(), `${label} is in the future: ${value}`)
  const ageDays = (asOf.getTime() - date.getTime()) / 86_400_000
  check(ageDays <= MAX_EVIDENCE_AGE_DAYS, `${label} is ${Math.floor(ageDays)} days old; maximum is ${MAX_EVIDENCE_AGE_DAYS}`)
  return date
}

function validateDeepHttpsUrl(value, label) {
  try {
    const url = new URL(value)
    const pathSegments = url.pathname.split('/').filter(Boolean)
    check(url.protocol === 'https:', `${label} must use HTTPS: ${value}`)
    check(Boolean(url.hostname), `${label} has no hostname: ${value}`)
    check(pathSegments.length > 0, `${label} must be a claim-level URL, not a homepage: ${value}`)
    check(!url.username && !url.password, `${label} must not contain URL credentials`)
  } catch {
    failures.push(`${label} is not a valid URL: ${JSON.stringify(value)}`)
  }
}

function technicalSourceId(sources, role) {
  if (role === 'mla') {
    return sources.find(source => source.kind === 'technical' && source.id === 'mla-service-calls')?.id
  }

  const suffixByRole = {
    lockAdvice: '-lock-advice',
    doorSecurity: '-door-security',
    forensics: '-forensics',
  }

  return sources.find(source => (
    source.kind === 'technical' && source.id.endsWith(suffixByRole[role])
  ))?.id
}

function auditSupplementalGuidanceSourceIds(text) {
  const sourceIds = []

  if (/\b(?:faceplate|backset|locking layout|component geometry|multipoint (?:part|component)|(?:handle|spindle|fixing|pz) centres?)\b/i.test(text)) {
    sourceIds.push('mila-door-locks-catalogue')
  }

  const sentences = text.match(/[^.!?]+[.!?]?/g) ?? []
  const hasListedTerm = sentence => /\b(?:listed-building|listed (?:buildings?|assets?|status|fabric|properties|property|premises|barns?|farmhouses?|churches?)|listed (?:and|or) (?:locally listed|scheduled) (?:buildings?|assets?)|listed(?:,\s*| (?:or|and) )(?:conservation|management|managed|managed-property|property|communal|institutional|within)|protected or listed|grade (?:i|ii\*?|iii) listed)\b/i.test(sentence)
  const isEvidenceLimit = sentence => /\b(?:do|does|did) not\b|\bcannot\b|\bnone\b|\bno listed\b|\b(?:governing evidence limit|source-backed fact selected for this decision|relevant official locality context) is:/i.test(sentence)
  const hasListedWorkInstruction = sentence => {
    if (/\b(?:consents?|permissions?|approvals?|fabric|visible (?:work|changes?|replacements?|alterations?)|external (?:work|changes?|attachments?|alterations?)|controls?)\b/i.test(sentence)) return true
    const action = '(?:check\\w*|confirm\\w*|verify\\w*|resolve\\w*|obtain\\w*|apply\\w*|meet\\w*|engage\\w*|require\\w*)'
    const governedTerm = '(?:conditions?|constraints?|requirements?|rules?)'
    return new RegExp(`\\b(?:${action}.{0,100}\\b${governedTerm}|${governedTerm}.{0,100}\\b${action})\\b`, 'i').test(sentence)
  }
  const hasDirectClaim = sentences.some(sentence => (
    hasListedTerm(sentence)
    && !isEvidenceLimit(sentence)
    && hasListedWorkInstruction(sentence)
  ))
  const hasPositiveListedContext = sentences.some(sentence => (
    hasListedTerm(sentence)
    && !isEvidenceLimit(sentence)
    && /\b(?:check\w*|confirm\w*|verify\w*|status|controls?|setting|communal|within|protected|grade|individually|named|exact)\b/i.test(sentence)
  ))
  const hasSeparateWorkAdvice = sentences.some(sentence => (
    !isEvidenceLimit(sentence)
    && /\b(?:consents?|permissions?|approvals?|fabric|visible (?:work|changes?|replacements?|alterations?)|external (?:work|changes?|attachments?|alterations?))\b/i.test(sentence)
  ))
  const hasListedBuildingWorkClaim = hasDirectClaim || (hasPositiveListedContext && hasSeparateWorkAdvice)

  if (hasListedBuildingWorkClaim) sourceIds.push('govuk-listed-building-consent')
  return sourceIds
}

function expectedGuidanceTechnicalSourceIds(sources, serviceSlug, guidance) {
  const roles = [...AUDIT_SERVICE_TECHNICAL_SOURCE_ROLES[serviceSlug]]
  const text = [
    ...(guidance?.body ?? []),
    ...(guidance?.checks ?? []),
    guidance?.faq?.q,
    guidance?.faq?.a,
  ].filter(Boolean).join(' ')

  if (serviceSlug === 'lock-upgrade' && /\bTS\s*007\b/i.test(text)) roles.push('lockAdvice')

  const roleSources = roles.map(role => ({ role, sourceId: technicalSourceId(sources, role) }))
  const supplementalSources = auditSupplementalGuidanceSourceIds(text)
    .map(sourceId => ({ role: sourceId, sourceId }))

  return [...roleSources, ...supplementalSources]
}

function pairwise(records, predicate = () => true) {
  const pairs = []
  for (let leftIndex = 0; leftIndex < records.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < records.length; rightIndex += 1) {
      const left = records[leftIndex]
      const right = records[rightIndex]
      if (!predicate(left, right)) continue
      pairs.push({
        left: left.key,
        right: right.key,
        overlap: overlapCoefficient(left.shingles, right.shingles),
      })
    }
  }
  return pairs
}

function similarityReport(name, pairs, p95Limit, pairLimit) {
  const overlaps = pairs.map(pair => pair.overlap)
  const p95 = percentile(overlaps, 0.95)
  const highestPair = [...pairs].sort((left, right) => right.overlap - left.overlap)[0]
  check(p95 <= p95Limit, `${name} 5-word-shingle p95 overlap is ${(p95 * 100).toFixed(2)}%; maximum is ${(p95Limit * 100).toFixed(0)}%`)
  check((highestPair?.overlap ?? 0) <= pairLimit, `${name} highest 5-word-shingle overlap is ${((highestPair?.overlap ?? 0) * 100).toFixed(2)}% on ${highestPair?.left} vs ${highestPair?.right}; maximum is ${(pairLimit * 100).toFixed(0)}%`)
  return { name, count: pairs.length, p95, max: highestPair?.overlap ?? 0, highestPair }
}

const areaSlugs = AREAS.map(area => area.slug)
const serviceSlugs = SERVICES.map(service => service.slug)
const guideEntries = Object.entries(AREA_GUIDES)
const technicalIds = new Set(Object.keys(TECHNICAL_EVIDENCE_SOURCES))
const sourceCanonicals = new Map()
const sourceUrls = new Map()
const guidanceRecords = []
const hubOwnedAreaWordCounts = []
const dedicatedParentWordCounts = []
const areaFactCounts = []
const areaFactSourceCounts = []
const areaEditorialRecords = []
const hubOwnedAreaEditorialRecords = []
const dedicatedParentEditorialRecords = []
const searchDescriptionOwners = new Map()
const factHeadingOwners = new Map()

check(AREAS.length === EXPECTED_AREA_COUNT, `area registry has ${AREAS.length} entries; expected ${EXPECTED_AREA_COUNT}`)
check(SERVICES.length === EXPECTED_SERVICE_COUNT, `service registry has ${SERVICES.length} entries; expected ${EXPECTED_SERVICE_COUNT}`)
check(SERVICE_AREA_SLUGS.length === EXPECTED_SERVICE_COUNT, `service-area registry has ${SERVICE_AREA_SLUGS.length} entries; expected ${EXPECTED_SERVICE_COUNT}`)
check(new Set(areaSlugs).size === areaSlugs.length, 'area registry contains duplicate slugs')
check(new Set(serviceSlugs).size === serviceSlugs.length, 'service registry contains duplicate slugs')
check(serviceSlugs.every(slug => SERVICE_AREA_SLUGS.includes(slug)), 'canonical services and governed service slugs differ')
check(guideEntries.length === EXPECTED_AREA_COUNT, `area-guide registry has ${guideEntries.length} entries; expected ${EXPECTED_AREA_COUNT}`)

const areaSlugSet = new Set(areaSlugs)
for (const area of AREAS) {
  check(Array.isArray(area.neighbours) && area.neighbours.length > 0, `${area.slug} has no reviewed neighbour links`)
  check(new Set(area.neighbours).size === area.neighbours.length, `${area.slug} repeats a neighbour link`)
  check(!area.neighbours.includes(area.slug), `${area.slug} links to itself as a neighbour`)
  for (const neighbourSlug of area.neighbours) {
    check(areaSlugSet.has(neighbourSlug), `${area.slug} references missing neighbour ${neighbourSlug}`)
  }
  const inboundNeighbourCount = AREAS.filter(candidate => candidate.neighbours.includes(area.slug)).length
  check(inboundNeighbourCount > 0, `${area.slug} receives no reviewed neighbour link`)
  if (AUDIT_SOLIHULL_REGION_SLUGS.has(area.slug)) {
    check(
      area.region === 'Solihull / West Midlands',
      `${area.slug} navigation region is ${JSON.stringify(area.region)}; expected Solihull / West Midlands`,
    )
  }
}

const solihullRegionMembers = AREAS
  .filter(area => area.region === 'Solihull / West Midlands')
  .map(area => area.slug)
check(
  solihullRegionMembers.length === AUDIT_SOLIHULL_REGION_SLUGS.size
    && solihullRegionMembers.every(slug => AUDIT_SOLIHULL_REGION_SLUGS.has(slug)),
  `Solihull / West Midlands navigation region contains ${solihullRegionMembers.join(', ') || 'no areas'}; expected exactly ${[...AUDIT_SOLIHULL_REGION_SLUGS].join(', ')}`,
)
for (const slug of AUDIT_SOLIHULL_REGION_SLUGS) {
  const authority = getAreaAuthority(slug)
  check(
    authority.addressRegion === 'West Midlands'
      && authority.localAuthority === 'Solihull Metropolitan Borough Council',
    `${slug} authority is ${authority.addressRegion} / ${authority.localAuthority}; expected West Midlands / Solihull Metropolitan Borough Council`,
  )
}

for (const relativePath of RETIRED_UNGOVERNED_FILES) {
  check(!existsSync(new URL(relativePath, import.meta.url)), `retired ungoverned content file has returned: ${relativePath}`)
}

for (const area of AREAS) {
  const unexpectedFields = Object.keys(area).filter(field => !ALLOWED_AREA_FIELDS.has(field))
  check(
    unexpectedFields.length === 0,
    `${area.slug} routing record contains publishable or unsupported fields: ${unexpectedFields.join(', ')}`,
  )
}

const clusters = [
  ['coventry', COVENTRY_AREA_GUIDES, 30],
  ['north-east', NORTH_EAST_AREA_GUIDES, 21],
  ['south-west', SOUTH_WEST_AREA_GUIDES, 27],
]
const clusterOwners = new Map()
for (const [clusterName, clusterGuides, expectedCount] of clusters) {
  const clusterSlugs = Object.keys(clusterGuides)
  check(clusterSlugs.length === expectedCount, `${clusterName} cluster has ${clusterSlugs.length} guides; expected ${expectedCount}`)
  for (const slug of clusterSlugs) {
    const previousOwner = clusterOwners.get(slug)
    check(!previousOwner, `${slug} appears in both ${previousOwner} and ${clusterName} clusters`)
    if (!previousOwner) clusterOwners.set(slug, clusterName)
  }
}
check(clusterOwners.size === EXPECTED_AREA_COUNT, `cluster union has ${clusterOwners.size} unique guides; expected ${EXPECTED_AREA_COUNT}`)

for (const area of AREAS) {
  const guide = AREA_GUIDES[area.slug]
  check(Boolean(guide), `missing governed area guide for ${area.slug}`)
  if (!guide) continue

  const label = area.slug
  const hasDedicatedOwnerPages = AUDIT_DEDICATED_AREA_SLUGS.has(area.slug)
  const serviceEvidenceMode = guide.serviceEvidenceMode ?? 'pair-linked'
  const expectedServiceEvidenceMode = AUDIT_HUB_CONTEXT_ONLY_SLUGS.has(area.slug)
    ? 'hub-context-only'
    : 'pair-linked'
  check(
    serviceEvidenceMode === expectedServiceEvidenceMode,
    `${label} service evidence mode is ${serviceEvidenceMode}; expected ${expectedServiceEvidenceMode}`,
  )
  check(guide.slug === area.slug, `${label} guide slug is ${guide.slug}`)
  validateDate(guide.reviewedOn, `${label} review`)
  check(Array.isArray(guide.summary) && guide.summary.length >= 2, `${label} needs at least two summary paragraphs`)
  for (const [index, paragraph] of (guide.summary ?? []).entries()) {
    check(wordCount(paragraph) >= 20, `${label} summary paragraph ${index + 1} has ${wordCount(paragraph)} words; expected at least 20`)
  }
  check(wordCount(guide.accessGuidance) >= 25, `${label} access guidance has ${wordCount(guide.accessGuidance)} words; expected at least 25`)
  check(wordCount(guide.evidenceLimits) >= 25, `${label} evidence limits have ${wordCount(guide.evidenceLimits)} words; expected at least 25`)
  check(
    Array.isArray(guide.facts) && guide.facts.length >= MIN_AREA_FACTS && guide.facts.length <= MAX_AREA_FACTS,
    `${label} has ${guide.facts?.length ?? 0} facts; expected ${MIN_AREA_FACTS}-${MAX_AREA_FACTS}`,
  )
  check(Array.isArray(guide.sources) && guide.sources.length >= 2, `${label} has ${guide.sources?.length ?? 0} sources; expected at least 2`)
  if (area.slug === 'wolston') {
    const wolstonPlanSource = (guide.sources ?? []).find(source => source?.id === 'rbc-wolston-plan-page')
    const wolstonEvidenceText = [
      ...(guide.summary ?? []),
      ...(guide.facts ?? []).map(fact => fact?.text),
    ].filter(Boolean).join(' ')
    check(Boolean(wolstonPlanSource), 'wolston must retain the rbc-wolston-plan-page source')
    check(
      wolstonPlanSource?.publisher === 'Rugby Borough Council'
        && wolstonPlanSource?.url === 'https://www.rugby.gov.uk/w/wolston-neighbourhood-plan',
      'wolston plan evidence must retain the verified Rugby Borough Council source and URL',
    )
    check(
      wolstonPlanSource?.supports === 'The neighbourhood-area designation, Call for Sites and November 2024 screening determination records published by the council.',
      'wolston plan source must retain its bounded support statement',
    )
    check(
      wolstonEvidenceText.includes('neighbourhood-area designation, Call for Sites and November 2024 screening determination records'),
      'wolston evidence must retain the verified designation, Call for Sites and November 2024 screening wording',
    )
    check(
      !/later consultation-stage documents/i.test(wolstonEvidenceText),
      'wolston evidence must not claim unverified later consultation-stage documents',
    )
    check(
      !/\b(?:plan|it)\s+(?:is|was|has been)\s+(?:made|adopted)\b/i.test(wolstonEvidenceText),
      'wolston evidence must not state that the plan is made or adopted',
    )
  }
  check(Array.isArray(guide.faqs) && guide.faqs.length >= 2, `${label} needs at least two evidence or booking FAQs`)
  for (const [index, faq] of (guide.faqs ?? []).entries()) {
    check(wordCount(faq?.q) >= 6, `${label} FAQ ${index + 1} question is too short`)
    check(wordCount(faq?.a) >= 18, `${label} FAQ ${index + 1} answer has ${wordCount(faq?.a)} words; expected at least 18`)
  }

  const localSourceIds = new Set()
  const sources = Array.isArray(guide.sources) ? guide.sources : []
  for (const [index, source] of sources.entries()) {
    const sourceLabel = `${label} source ${index + 1}`
    for (const field of ['id', 'title', 'publisher', 'url', 'supports', 'checkedOn', 'kind']) {
      check(typeof source?.[field] === 'string' && source[field].trim().length > 0, `${sourceLabel} has missing ${field}`)
    }
    check(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(source?.id ?? ''), `${sourceLabel} has invalid source id ${JSON.stringify(source?.id)}`)
    check(['locality', 'property-status', 'technical'].includes(source?.kind), `${sourceLabel} has invalid kind ${JSON.stringify(source?.kind)}`)
    check(wordCount(source?.supports) >= 5, `${sourceLabel} has an inadequate supports statement`)
    validateDeepHttpsUrl(source?.url, sourceLabel)
    const sourceDate = validateDate(source?.checkedOn, sourceLabel)
    const reviewDate = new Date(`${guide.reviewedOn}T00:00:00Z`)
    if (sourceDate && !Number.isNaN(reviewDate.getTime())) {
      check(sourceDate.getTime() <= reviewDate.getTime(), `${sourceLabel} was checked after the guide review date`)
    }
    check(!localSourceIds.has(source?.id), `${label} repeats source id ${source?.id}`)
    localSourceIds.add(source?.id)

    if (source?.kind === 'technical') {
      check(technicalIds.has(source.id), `${sourceLabel} uses unrecognised technical source id ${source.id}`)
    }

    const canonical = JSON.stringify({
      title: source?.title,
      publisher: source?.publisher,
      url: source?.url,
      checkedOn: source?.checkedOn,
    })
    const existing = sourceCanonicals.get(source?.id)
    check(!existing || existing.canonical === canonical, `${sourceLabel} conflicts with source id used by ${existing?.owner}`)
    if (!existing) sourceCanonicals.set(source?.id, { canonical, owner: label })
    const urlOwner = sourceUrls.get(source?.url)
    check(!urlOwner || urlOwner.id === source?.id, `${sourceLabel} URL is also assigned to source id ${urlOwner?.id}`)
    if (!urlOwner) sourceUrls.set(source?.url, { id: source?.id, owner: label })
  }
  check(sources.some(source => source.kind === 'locality' || source.kind === 'property-status'), `${label} has no locality or property-status source`)
  check(sources.some(source => source.id === 'mla-service-calls'), `${label} is missing MLA service-call evidence`)

  const searchDescription = guide.searchDescription?.trim() ?? ''
  const searchDescriptionSourceIds = guide.searchDescriptionSourceIds ?? []
  check(searchDescription.length >= 125, `${label} search description is ${searchDescription.length} characters; expected at least 125`)
  check(searchDescription.length <= 160, `${label} search description is ${searchDescription.length} characters; expected at most 160`)
  check(searchDescription.includes(area.name), `${label} search description does not name ${area.name}`)
  check(/\blocksmith\b/i.test(searchDescription), `${label} search description does not express locksmith intent`)
  check(Array.isArray(searchDescriptionSourceIds) && searchDescriptionSourceIds.length > 0, `${label} search description has no source IDs`)
  check(new Set(searchDescriptionSourceIds).size === searchDescriptionSourceIds.length, `${label} search description repeats a source ID`)
  const previousDescriptionOwner = searchDescriptionOwners.get(searchDescription)
  check(!previousDescriptionOwner, `${label} repeats the search description used by ${previousDescriptionOwner}`)
  if (searchDescription) searchDescriptionOwners.set(searchDescription, label)

  const factSourceIds = new Set((guide.facts ?? []).flatMap(fact => fact.sourceIds ?? []))
  areaFactCounts.push(guide.facts?.length ?? 0)
  areaFactSourceCounts.push(factSourceIds.size)
  check(
    factSourceIds.size >= MIN_AREA_FACT_SOURCES,
    `${label} facts use ${factSourceIds.size} unique sources; expected at least ${MIN_AREA_FACT_SOURCES}`,
  )
  for (const sourceId of searchDescriptionSourceIds) {
    check(localSourceIds.has(sourceId), `${label} search description references missing source ${sourceId}`)
    check(factSourceIds.has(sourceId), `${label} search description source ${sourceId} is not attached to a visible local fact`)
    check(!technicalIds.has(sourceId), `${label} search description cites technical source ${sourceId} for a locality cue`)
  }
  check(
    sources.some(source => searchDescriptionSourceIds.includes(source.id) && (source.kind === 'locality' || source.kind === 'property-status')),
    `${label} search description has no locality or property-status source`,
  )

  check(
    guide.factOnlySourceIds === undefined || Array.isArray(guide.factOnlySourceIds),
    `${label} fact-only source IDs must be an array when provided`,
  )
  const factOnlySourceIds = Array.isArray(guide.factOnlySourceIds) ? guide.factOnlySourceIds : []
  const factOnlySourceIdSet = new Set(factOnlySourceIds)
  check(factOnlySourceIdSet.size === factOnlySourceIds.length, `${label} repeats a fact-only source ID`)
  for (const sourceId of factOnlySourceIds) {
    check(localSourceIds.has(sourceId), `${label} fact-only source ${sourceId} is missing from sources`)
    check(factSourceIds.has(sourceId), `${label} fact-only source ${sourceId} is not attached to a visible local fact`)
    check(!technicalIds.has(sourceId), `${label} fact-only source ${sourceId} cannot be a technical source`)
  }

  const localFactHeadings = new Set()
  for (const [index, fact] of (guide.facts ?? []).entries()) {
    const factLabel = `${label} fact ${index + 1}`
    const heading = fact?.heading?.trim() ?? ''
    const headingKey = normalise(heading)
    check(wordCount(heading) >= 3 && wordCount(heading) <= 12, `${factLabel} heading has ${wordCount(heading)} words; expected 3-12`)
    check(!/^\s*(?:local\s+)?fact(?:\s+\d+)?\b/i.test(heading), `${factLabel} uses a generic heading: ${JSON.stringify(heading)}`)
    check(!localFactHeadings.has(headingKey), `${factLabel} repeats a heading within ${label}: ${JSON.stringify(heading)}`)
    const previousHeadingOwner = factHeadingOwners.get(headingKey)
    check(!previousHeadingOwner, `${factLabel} repeats the heading used by ${previousHeadingOwner}: ${JSON.stringify(heading)}`)
    if (headingKey) {
      localFactHeadings.add(headingKey)
      if (!previousHeadingOwner) factHeadingOwners.set(headingKey, factLabel)
    }
    check(wordCount(fact?.text) >= 10, `${factLabel} has ${wordCount(fact?.text)} words; expected at least 10`)
    check(wordCount(fact?.serviceRelevance) >= 10, `${factLabel} service relevance has ${wordCount(fact?.serviceRelevance)} words; expected at least 10`)
    check(Array.isArray(fact?.sourceIds) && fact.sourceIds.length > 0, `${factLabel} has no source IDs`)
    for (const sourceId of fact?.sourceIds ?? []) {
      check(localSourceIds.has(sourceId), `${factLabel} references missing source ${sourceId}`)
      check(!technicalIds.has(sourceId), `${factLabel} cites technical source ${sourceId} for a locality fact`)
    }
  }

  const allEligibleFactLocalSourceIds = new Set((guide.facts ?? []).flatMap(fact => (
    (fact.sourceIds ?? []).filter(sourceId => {
      const source = sources.find(candidate => candidate.id === sourceId)
      return !factOnlySourceIdSet.has(sourceId)
        && (source?.kind === 'locality' || source?.kind === 'property-status')
    })
  )))

  const guidanceEntries = Object.entries(guide.serviceGuidance ?? {})
  check(guidanceEntries.length === EXPECTED_SERVICE_COUNT, `${label} has ${guidanceEntries.length} service guidance records; expected ${EXPECTED_SERVICE_COUNT}`)
  for (const serviceSlug of SERVICE_AREA_SLUGS) {
    const guidance = guide.serviceGuidance?.[serviceSlug]
    const guidanceLabel = `${label}/${serviceSlug}`
    check(Boolean(guidance), `${guidanceLabel} guidance is missing`)
    if (!guidance) continue
    const searchHeading = guidance.searchHeading ?? ''
    const searchIntent = AUDIT_SERVICE_SEARCH_HEADING_INTENTS[serviceSlug]
    check(wordCount(searchHeading) >= 4, `${guidanceLabel} search heading is too short`)
    check(searchHeading.includes(area.name), `${guidanceLabel} search heading does not name ${area.name}`)
    check(Boolean(searchIntent), `${guidanceLabel} has no independent search-heading intent contract`)
    if (searchIntent) {
      const missingIntent = searchIntent.patterns.filter(pattern => !pattern.test(searchHeading))
      check(
        missingIntent.length === 0,
        `${guidanceLabel} search heading does not express ${searchIntent.label}: ${JSON.stringify(searchHeading)}`,
      )
    }
    check(wordCount(guidance.heading) >= 4, `${guidanceLabel} heading is too short`)
    check(guidance.heading.includes(area.name), `${guidanceLabel} heading does not name ${area.name}`)
    check(Array.isArray(guidance.body) && guidance.body.length === 2, `${guidanceLabel} needs exactly two body paragraphs`)
    for (const [index, paragraph] of (guidance.body ?? []).entries()) {
      check(wordCount(paragraph) >= 50, `${guidanceLabel} paragraph ${index + 1} has ${wordCount(paragraph)} words; expected at least 50`)
    }
    const guidanceText = (guidance.body ?? []).join(' ')
    const guidanceEvidenceText = [
      guidanceText,
      ...(guidance.checks ?? []),
      guidance.faq?.q,
      guidance.faq?.a,
    ].filter(Boolean).join(' ')
    if (NON_HERITAGE_PLANNING_GUIDANCE_SLUGS.has(area.slug)) {
      const unsupportedPhysicalStatusCheck = guidanceEvidenceText.match(UNSUPPORTED_PHYSICAL_STATUS_CHECK_PATTERN)?.[0]
      check(
        !unsupportedPhysicalStatusCheck,
        `${guidanceLabel} contains a physical heritage/status check unsupported by its planning evidence: ${JSON.stringify(unsupportedPhysicalStatusCheck)}`,
      )
    }
    const guidanceSimilarityText = [searchHeading, guidance.heading, guidanceText].filter(Boolean).join(' ')
    const guidanceWords = wordCount(guidanceText)
    check(guidanceWords >= MIN_GUIDANCE_WORDS, `${guidanceLabel} has ${guidanceWords} guidance words; expected at least ${MIN_GUIDANCE_WORDS}`)
    check(Array.isArray(guidance.checks) && guidance.checks.length >= 3, `${guidanceLabel} needs at least three checks`)
    for (const [index, item] of (guidance.checks ?? []).entries()) {
      check(wordCount(item) >= 4, `${guidanceLabel} check ${index + 1} is too short`)
    }
    if (serviceEvidenceMode === 'hub-context-only') {
      for (const lint of HUB_CONTEXT_ONLY_BODY_LINTS) {
        const match = guidanceText.match(lint.pattern)?.[0]
        check(!match, `${guidanceLabel} contains ${lint.label}: ${JSON.stringify(match)}`)
      }
      for (const [index, item] of (guidance.checks ?? []).entries()) {
        const checkStem = item.trim().replace(/[.!?]+$/, '')
        const unpunctuatedInterpolation = checkStem
          ? (guidance.body ?? []).some(paragraph => new RegExp(
              `(?:^|[^\\p{L}\\p{N}])${escapeRegExp(checkStem)}(?=["'”’)]*(?:$|[\\s,;:—–-]))`,
              'u',
            ).test(paragraph))
          : false
        check(!unpunctuatedInterpolation, `${guidanceLabel} interpolates check ${index + 1} without terminal punctuation`)
      }
    }
    check(wordCount(guidance.faq?.q) >= 6, `${guidanceLabel} FAQ question is too short`)
    check(wordCount(guidance.faq?.a) >= 18, `${guidanceLabel} FAQ answer has ${wordCount(guidance.faq?.a)} words; expected at least 18`)

    check(Array.isArray(guidance.localFactIndexes), `${guidanceLabel} localFactIndexes must be an array`)
    const localFactIndexes = Array.isArray(guidance.localFactIndexes) ? guidance.localFactIndexes : []
    if (serviceEvidenceMode === 'hub-context-only') {
      check(localFactIndexes.length === 0, `${guidanceLabel} selects local facts despite hub-context-only evidence mode`)
    } else {
      check(localFactIndexes.length > 0, `${guidanceLabel} must select at least one local fact`)
    }
    check(new Set(localFactIndexes).size === localFactIndexes.length, `${guidanceLabel} repeats a local fact index`)
    for (const factIndex of localFactIndexes) {
      check(Number.isInteger(factIndex), `${guidanceLabel} local fact index ${JSON.stringify(factIndex)} is not an integer`)
      check(factIndex >= 0 && factIndex < guide.facts.length, `${guidanceLabel} local fact index ${factIndex} is out of range`)
    }
    const selectedFacts = localFactIndexes
      .filter(factIndex => Number.isInteger(factIndex) && factIndex >= 0 && factIndex < guide.facts.length)
      .map(factIndex => guide.facts[factIndex])

    for (const [index, fact] of selectedFacts.entries()) {
      check(
        !fact.sourceIds.some(sourceId => factOnlySourceIdSet.has(sourceId)),
        `${guidanceLabel} selected local fact ${localFactIndexes[index]} uses a fact-only source`,
      )
    }
    const expectedLocalSourceIds = new Set(selectedFacts.flatMap(fact => (
      fact.sourceIds.filter(sourceId => {
        const source = sources.find(candidate => candidate.id === sourceId)
        return !factOnlySourceIdSet.has(sourceId)
          && (source?.kind === 'locality' || source?.kind === 'property-status')
      })
    )))
    if (serviceEvidenceMode === 'hub-context-only') {
      check(expectedLocalSourceIds.size === 0, `${guidanceLabel} resolves local sources despite hub-context-only evidence mode`)
    } else {
      check(expectedLocalSourceIds.size > 0, `${guidanceLabel} selected facts resolve no eligible local source`)
    }

    check(Array.isArray(guidance.sourceIds) && guidance.sourceIds.length > 0, `${guidanceLabel} has no source IDs`)
    const guidanceSourceIds = new Set(guidance.sourceIds ?? [])
    check(guidanceSourceIds.size === (guidance.sourceIds ?? []).length, `${guidanceLabel} repeats a source ID`)
    for (const sourceId of guidance.sourceIds ?? []) {
      check(localSourceIds.has(sourceId), `${guidanceLabel} references missing source ${sourceId}`)
      check(!factOnlySourceIdSet.has(sourceId), `${guidanceLabel} cites fact-only source ${sourceId}`)
    }
    const guidanceLocalSources = sources.filter(source => (
      guidanceSourceIds.has(source.id) && (source.kind === 'locality' || source.kind === 'property-status')
    ))
    if (serviceEvidenceMode === 'hub-context-only') {
      check(guidanceLocalSources.length === 0, `${guidanceLabel} cites locality evidence reserved for the area hub`)
    } else {
      check(guidanceLocalSources.length > 0, `${guidanceLabel} has no locality or property-status source`)
    }
    const actualLocalSourceIds = new Set((guidance.sourceIds ?? []).filter(sourceId => {
      const source = sources.find(candidate => candidate.id === sourceId)
      return source?.kind === 'locality' || source?.kind === 'property-status'
    }))
    check(
      actualLocalSourceIds.size === expectedLocalSourceIds.size
        && [...actualLocalSourceIds].every(sourceId => expectedLocalSourceIds.has(sourceId)),
      `${guidanceLabel} local sources ${[...actualLocalSourceIds].join(', ') || 'none'} do not exactly match selected facts ${[...expectedLocalSourceIds].join(', ') || 'none'}`,
    )

    const expectedTechnicalSources = expectedGuidanceTechnicalSourceIds(sources, serviceSlug, guidance)
    for (const { role, sourceId } of expectedTechnicalSources) {
      check(Boolean(sourceId), `${guidanceLabel} cannot resolve required ${role} technical source`)
      if (sourceId) check(guidanceSourceIds.has(sourceId), `${guidanceLabel} is missing required technical source ${sourceId}`)
    }
    const expectedTechnicalIds = new Set(expectedTechnicalSources.map(({ sourceId }) => sourceId).filter(Boolean))
    const actualTechnicalIds = (guidance.sourceIds ?? []).filter(sourceId => technicalIds.has(sourceId))
    for (const sourceId of actualTechnicalIds) {
      check(expectedTechnicalIds.has(sourceId), `${guidanceLabel} includes unexpected technical source ${sourceId}`)
    }

    guidanceRecords.push({
      key: guidanceLabel,
      areaSlug: area.slug,
      serviceSlug,
      words: guidanceWords,
      shingles: shingles(guidanceSimilarityText),
      bodyShingles: shingles(guidanceText),
      checks: [...(guidance.checks ?? [])],
      localFactIndexes: [...localFactIndexes],
      selectedLocalSourceCount: expectedLocalSourceIds.size,
      broadLocalSourceCount: allEligibleFactLocalSourceIds.size,
      serviceEvidenceMode,
      bodySentenceKeys: longSentenceKeys(guidance.body ?? []),
      faqQuestionKey: normalise(guidance.faq?.q),
      faqQuestionNeutralKey: areaNeutralFaqKey(guidance.faq?.q, area),
      faqAnswerKey: areaNeutralFaqKey(guidance.faq?.a, area),
      faqExactAnswerKey: normalise(guidance.faq?.a),
    })
  }

  const pageFaqs = [
    ...(guide.faqs ?? []).map((faq, index) => ({ ...faq, owner: `guide FAQ ${index + 1}` })),
    ...(hasDedicatedOwnerPages
      ? []
      : SERVICE_AREA_SLUGS
        .map(serviceSlug => ({
          ...guide.serviceGuidance?.[serviceSlug]?.faq,
          owner: `${serviceSlug} FAQ`,
        }))
        .filter(faq => faq.q || faq.a)),
  ]
  const faqQuestionOwners = new Map()
  const faqAnswerOwners = new Map()
  const visibleServiceBlocks = hasDedicatedOwnerPages
    ? SERVICE_AREA_SLUGS.flatMap(serviceSlug => {
        const guidance = guide.serviceGuidance?.[serviceSlug]
        const service = SERVICES.find(candidate => candidate.slug === serviceSlug)
        return [
          { value: guidance?.heading, owner: `${serviceSlug} owner-card local heading` },
          { value: service?.description, owner: `${serviceSlug} owner-card summary` },
          ...(guidance?.checks ?? []).map((value, index) => ({
            value,
            owner: `${serviceSlug} owner-card preview check ${index + 1}`,
          })),
          {
            value: firstSentence(guidance?.body?.[0]),
            owner: `${serviceSlug} owner-card decision preview`,
          },
        ]
      })
    : SERVICE_AREA_SLUGS.flatMap(serviceSlug => {
        const guidance = guide.serviceGuidance?.[serviceSlug]
        return [
          { value: guidance?.searchHeading, owner: `${serviceSlug} search heading` },
          { value: guidance?.heading, owner: `${serviceSlug} local heading` },
          ...(guidance?.body ?? []).map((value, index) => ({ value, owner: `${serviceSlug} paragraph ${index + 1}` })),
          ...(guidance?.checks ?? []).map((value, index) => ({ value, owner: `${serviceSlug} check ${index + 1}` })),
        ]
      })
  const nonFaqBlocks = [
    ...(guide.summary ?? []).map((value, index) => ({ value, owner: `summary paragraph ${index + 1}` })),
    { value: guide.accessGuidance, owner: 'access guidance' },
    { value: guide.evidenceLimits, owner: 'evidence limits' },
    ...(guide.facts ?? []).flatMap((fact, index) => [
      { value: fact.text, owner: `fact ${index + 1}` },
      { value: fact.serviceRelevance, owner: `fact ${index + 1} service relevance` },
    ]),
    ...visibleServiceBlocks,
  ]
  const nonFaqOwners = new Map(
    nonFaqBlocks
      .map(block => [normalise(block.value), block.owner])
      .filter(([value]) => value),
  )
  for (const faq of pageFaqs) {
    const questionKey = normalise(faq.q)
    const answerKey = normalise(faq.a)
    const questionOwner = faqQuestionOwners.get(questionKey)
    const answerOwner = faqAnswerOwners.get(answerKey)
    const nonFaqOwner = nonFaqOwners.get(answerKey)
    check(!questionOwner, `${label} repeats the same FAQ question in ${questionOwner} and ${faq.owner}`)
    check(!answerOwner, `${label} repeats the same FAQ answer in ${answerOwner} and ${faq.owner}`)
    check(!nonFaqOwner, `${label} repeats ${nonFaqOwner} verbatim as the answer to ${faq.owner}`)
    if (questionKey && !questionOwner) faqQuestionOwners.set(questionKey, faq.owner)
    if (answerKey && !answerOwner) faqAnswerOwners.set(answerKey, faq.owner)
  }
  for (let leftIndex = 0; leftIndex < pageFaqs.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < pageFaqs.length; rightIndex += 1) {
      const left = pageFaqs[leftIndex]
      const right = pageFaqs[rightIndex]
      const answerOverlap = overlapCoefficient(shingles(left.a), shingles(right.a))
      check(
        answerOverlap <= MAX_WITHIN_PAGE_FAQ_ANSWER_OVERLAP,
        `${label} FAQ answers in ${left.owner} and ${right.owner} overlap ${(answerOverlap * 100).toFixed(2)}%; maximum is ${(MAX_WITHIN_PAGE_FAQ_ANSWER_OVERLAP * 100).toFixed(0)}%`,
      )
    }
  }

  const customerVisibleBlocks = [
    ...nonFaqBlocks,
    ...pageFaqs.flatMap(faq => [
      { value: faq.q, owner: `${faq.owner} question` },
      { value: faq.a, owner: `${faq.owner} answer` },
    ]),
  ].filter(block => typeof block.value === 'string' && block.value.trim().length > 0)

  for (const block of customerVisibleBlocks) {
    for (const lint of CUSTOMER_VISIBLE_PROSE_LINTS) {
      const match = block.value.match(lint.pattern)?.[0]
      if (match) failures.push(`${label} ${block.owner} contains ${lint.label}: ${JSON.stringify(match)}`)
    }
  }

  for (const duplicate of exactLongSentenceDuplicates(customerVisibleBlocks)) {
    const owners = [...new Set(duplicate.map(occurrence => occurrence.owner))]
    failures.push(
      `${label} repeats a ${wordCount(duplicate[0].sentence)}-word sentence in ${owners.join(' and ')}: ${JSON.stringify(duplicate[0].sentence)}`,
    )
  }

  const editorial = customerVisibleBlocks.map(block => block.value).join(' ')
  const editorialWords = wordCount(editorial)
  areaEditorialRecords.push({ key: area.slug, shingles: shingles(editorial) })
  if (hasDedicatedOwnerPages) {
    dedicatedParentWordCounts.push(editorialWords)
    dedicatedParentEditorialRecords.push({ key: area.slug, shingles: shingles(editorial) })
    check(
      editorialWords >= MIN_DEDICATED_PARENT_EDITORIAL_WORDS,
      `${label} dedicated parent renders ${editorialWords} governed editorial words; expected at least ${MIN_DEDICATED_PARENT_EDITORIAL_WORDS}`,
    )
  } else {
    hubOwnedAreaWordCounts.push(editorialWords)
    hubOwnedAreaEditorialRecords.push({ key: area.slug, shingles: shingles(editorial) })
    check(
      editorialWords >= MIN_HUB_OWNED_EDITORIAL_WORDS,
      `${label} hub-owned page renders ${editorialWords} governed editorial words; expected at least ${MIN_HUB_OWNED_EDITORIAL_WORDS}`,
    )
  }
  for (const bannedClaim of BANNED_CLAIM_PATTERNS) {
    const match = editorial.match(bannedClaim.pattern)?.[0]
    if (match) failures.push(`${label} contains ${bannedClaim.label}: ${JSON.stringify(match)}`)
  }
}

for (const slug of Object.keys(AREA_GUIDES)) {
  check(areaSlugs.includes(slug), `area-guide registry contains unknown slug ${slug}`)
}

check(guidanceRecords.length === EXPECTED_GUIDANCE_COUNT, `found ${guidanceRecords.length} service guidance records; expected ${EXPECTED_GUIDANCE_COUNT}`)

const allChecks = guidanceRecords.flatMap(record => (
  record.checks.map(value => ({ key: normalise(value), owner: record.key }))
))
const checkCounts = new Map()
for (const item of allChecks) {
  checkCounts.set(item.key, (checkCounts.get(item.key) ?? 0) + 1)
}
const checkUniquenessRatio = checkCounts.size / Math.max(1, allChecks.length)
check(
  checkUniquenessRatio >= MIN_CHECK_UNIQUENESS_RATIO,
  `service checks are ${(checkUniquenessRatio * 100).toFixed(2)}% unique; expected at least ${(MIN_CHECK_UNIQUENESS_RATIO * 100).toFixed(0)}%`,
)
for (const record of guidanceRecords) {
  check(
    new Set(record.checks.map(normalise)).size === record.checks.length,
    `${record.key} repeats a check within its own guidance`,
  )
  const uniqueChecks = record.checks.filter(value => checkCounts.get(normalise(value)) === 1)
  check(
    uniqueChecks.length >= MIN_PAIR_UNIQUE_CHECKS,
    `${record.key} has ${uniqueChecks.length} pair-unique checks; expected at least ${MIN_PAIR_UNIQUE_CHECKS}`,
  )
}

const bodyShingleDocumentFrequency = new Map()
for (const record of guidanceRecords) {
  for (const shingle of record.bodyShingles) {
    bodyShingleDocumentFrequency.set(shingle, (bodyShingleDocumentFrequency.get(shingle) ?? 0) + 1)
  }
}
const bodyShingleUniqueness = []
for (const record of guidanceRecords) {
  const uniqueCount = [...record.bodyShingles].filter(shingle => bodyShingleDocumentFrequency.get(shingle) === 1).length
  const uniqueRatio = uniqueCount / Math.max(1, record.bodyShingles.size)
  bodyShingleUniqueness.push({ key: record.key, uniqueCount, uniqueRatio })
  check(
    uniqueCount >= MIN_PAIR_UNIQUE_BODY_SHINGLES,
    `${record.key} has ${uniqueCount} globally unique body 5-word shingles; expected at least ${MIN_PAIR_UNIQUE_BODY_SHINGLES}`,
  )
  check(
    uniqueRatio >= MIN_PAIR_UNIQUE_BODY_SHINGLE_RATIO,
    `${record.key} has ${(uniqueRatio * 100).toFixed(2)}% globally unique body 5-word shingles; expected at least ${(MIN_PAIR_UNIQUE_BODY_SHINGLE_RATIO * 100).toFixed(0)}%`,
  )
}
const minimumBodyShingleCount = Math.min(...bodyShingleUniqueness.map(record => record.uniqueCount))
const minimumBodyShingleRatio = Math.min(...bodyShingleUniqueness.map(record => record.uniqueRatio))

const bodySentenceDocumentFrequency = new Map()
for (const record of guidanceRecords) {
  for (const sentenceKey of new Set(record.bodySentenceKeys)) {
    const owners = bodySentenceDocumentFrequency.get(sentenceKey) ?? new Set()
    owners.add(record.key)
    bodySentenceDocumentFrequency.set(sentenceKey, owners)
  }
}
const bodySentenceOccurrences = guidanceRecords.flatMap(record => record.bodySentenceKeys)
const reusedBodySentenceOccurrences = bodySentenceOccurrences.filter(sentenceKey => (
  (bodySentenceDocumentFrequency.get(sentenceKey)?.size ?? 0) > 1
))
const reusedBodySentenceFamilies = [...bodySentenceDocumentFrequency.values()].filter(owners => owners.size > 1).length
const bodySentenceReuseRatio = reusedBodySentenceOccurrences.length / Math.max(1, bodySentenceOccurrences.length)
check(
  reusedBodySentenceOccurrences.length === 0,
  `cross-record exact body-sentence reuse is ${reusedBodySentenceOccurrences.length}/${bodySentenceOccurrences.length} `
  + `occurrences (${(bodySentenceReuseRatio * 100).toFixed(2)}%) across ${reusedBodySentenceFamilies} repeated families; expected zero`,
)

const renderedHubGuidanceRecords = guidanceRecords.filter(record => !AUDIT_DEDICATED_AREA_SLUGS.has(record.areaSlug))
const hubContextOnlyGuidanceRecords = renderedHubGuidanceRecords.filter(record => record.serviceEvidenceMode === 'hub-context-only')
check(
  renderedHubGuidanceRecords.length === (EXPECTED_AREA_COUNT - AUDIT_DEDICATED_AREA_SLUGS.size) * EXPECTED_SERVICE_COUNT,
  `found ${renderedHubGuidanceRecords.length} rendered hub-owned service FAQs; expected ${(EXPECTED_AREA_COUNT - AUDIT_DEDICATED_AREA_SLUGS.size) * EXPECTED_SERVICE_COUNT}`,
)
check(
  hubContextOnlyGuidanceRecords.length === AUDIT_HUB_CONTEXT_ONLY_SLUGS.size * EXPECTED_SERVICE_COUNT,
  `found ${hubContextOnlyGuidanceRecords.length} hub-context-only service records; expected ${AUDIT_HUB_CONTEXT_ONLY_SLUGS.size * EXPECTED_SERVICE_COUNT}`,
)
const faqQuestionOwners = new Map()
const faqAnswerOwners = new Map()
const faqExactAnswerOwners = new Map()
for (const record of renderedHubGuidanceRecords) {
  for (const [key, owners] of [
    [record.faqQuestionNeutralKey, faqQuestionOwners],
    [record.faqAnswerKey, faqAnswerOwners],
    [record.faqExactAnswerKey, faqExactAnswerOwners],
  ]) {
    if (key) owners.set(key, (owners.get(key) ?? 0) + 1)
  }
}
const largestFaqQuestionFamily = Math.max(0, ...faqQuestionOwners.values())
const largestFaqAnswerFamily = Math.max(0, ...faqAnswerOwners.values())
const largestExactFaqAnswerFamily = Math.max(0, ...faqExactAnswerOwners.values())
check(faqQuestionOwners.size >= MIN_AREA_NEUTRAL_FAQ_FAMILIES, `rendered service FAQs have only ${faqQuestionOwners.size} area-neutral question families; expected at least ${MIN_AREA_NEUTRAL_FAQ_FAMILIES}`)
check(faqAnswerOwners.size >= MIN_AREA_NEUTRAL_FAQ_FAMILIES, `rendered service FAQs have only ${faqAnswerOwners.size} area-neutral answer families; expected at least ${MIN_AREA_NEUTRAL_FAQ_FAMILIES}`)
check(faqExactAnswerOwners.size >= MIN_AREA_NEUTRAL_FAQ_FAMILIES, `rendered service FAQs have only ${faqExactAnswerOwners.size} exact answer families; expected at least ${MIN_AREA_NEUTRAL_FAQ_FAMILIES}`)
check(largestFaqQuestionFamily <= MAX_AREA_NEUTRAL_FAQ_FAMILY_SIZE, `largest area-neutral FAQ question family is ${largestFaqQuestionFamily}; expected at most ${MAX_AREA_NEUTRAL_FAQ_FAMILY_SIZE}`)
check(largestFaqAnswerFamily <= MAX_AREA_NEUTRAL_FAQ_FAMILY_SIZE, `largest area-neutral FAQ answer family is ${largestFaqAnswerFamily}; expected at most ${MAX_AREA_NEUTRAL_FAQ_FAMILY_SIZE}`)
check(largestExactFaqAnswerFamily <= MAX_AREA_NEUTRAL_FAQ_FAMILY_SIZE, `largest exact FAQ answer family is ${largestExactFaqAnswerFamily}; expected at most ${MAX_AREA_NEUTRAL_FAQ_FAMILY_SIZE}`)

const similarityReports = [
  similarityReport(
    'rendered area-hub editorial',
    pairwise(areaEditorialRecords),
    MAX_GLOBAL_P95_OVERLAP,
    MAX_GLOBAL_PAIR_OVERLAP,
  ),
  similarityReport(
    'rendered hub-owned area editorial',
    pairwise(hubOwnedAreaEditorialRecords),
    MAX_GLOBAL_P95_OVERLAP,
    MAX_GLOBAL_PAIR_OVERLAP,
  ),
  similarityReport(
    'rendered dedicated-parent editorial',
    pairwise(dedicatedParentEditorialRecords),
    MAX_DEDICATED_PARENT_P95_OVERLAP,
    MAX_DEDICATED_PARENT_PAIR_OVERLAP,
  ),
  similarityReport(
    'all service-area guidance',
    pairwise(guidanceRecords),
    MAX_GLOBAL_P95_OVERLAP,
    MAX_GLOBAL_PAIR_OVERLAP,
  ),
  similarityReport(
    'same-area cross-service guidance',
    pairwise(guidanceRecords, (left, right) => left.areaSlug === right.areaSlug && left.serviceSlug !== right.serviceSlug),
    MAX_WITHIN_AREA_P95_OVERLAP,
    MAX_WITHIN_AREA_PAIR_OVERLAP,
  ),
  similarityReport(
    'same-service cross-area guidance',
    pairwise(guidanceRecords, (left, right) => left.serviceSlug === right.serviceSlug && left.areaSlug !== right.areaSlug),
    MAX_WITHIN_SERVICE_P95_OVERLAP,
    MAX_WITHIN_SERVICE_PAIR_OVERLAP,
  ),
]

console.log('Area-guide governance audit')
console.log(`Evidence as-of date: ${AUDIT_AS_OF}`)
console.log(`Registry: ${guideEntries.length} area guides, ${guidanceRecords.length} service-area guidance records`)
console.log(`Evidence: ${sourceCanonicals.size} source IDs, ${sourceUrls.size} unique URLs`)
const factCounts = summary(areaFactCounts)
const factSourceCounts = summary(areaFactSourceCounts)
const totalAreaFactCount = areaFactCounts.reduce((total, count) => total + count, 0)
check(
  factHeadingOwners.size === totalAreaFactCount,
  `fact-heading registry has ${factHeadingOwners.size} unique labels for ${totalAreaFactCount} facts`,
)
console.log(`Area facts (required ${MIN_AREA_FACTS}-${MAX_AREA_FACTS}): min ${factCounts.min}, median ${factCounts.median}, max ${factCounts.max}`)
console.log(`Descriptive fact headings: ${factHeadingOwners.size}/${totalAreaFactCount} unique labels`)
console.log(`Area fact sources (minimum ${MIN_AREA_FACT_SOURCES}): min ${factSourceCounts.min}, median ${factSourceCounts.median}, max ${factSourceCounts.max}`)
const hubOwnedWords = summary(hubOwnedAreaWordCounts)
const dedicatedParentWords = summary(dedicatedParentWordCounts)
console.log(`Rendered hub-owned editorial words (minimum ${MIN_HUB_OWNED_EDITORIAL_WORDS}): min ${hubOwnedWords.min}, median ${hubOwnedWords.median}, p95 ${hubOwnedWords.p95}, max ${hubOwnedWords.max}`)
console.log(`Rendered dedicated-parent editorial words (minimum ${MIN_DEDICATED_PARENT_EDITORIAL_WORDS}): min ${dedicatedParentWords.min}, median ${dedicatedParentWords.median}, p95 ${dedicatedParentWords.p95}, max ${dedicatedParentWords.max}`)
const guidanceWords = summary(guidanceRecords.map(record => record.words))
console.log(`Guidance words (minimum ${MIN_GUIDANCE_WORDS}): min ${guidanceWords.min}, median ${guidanceWords.median}, p95 ${guidanceWords.p95}, max ${guidanceWords.max}`)
const selectedFactLinks = renderedHubGuidanceRecords.reduce((total, record) => total + record.localFactIndexes.length, 0)
const selectedLocalCitationLinks = renderedHubGuidanceRecords.reduce((total, record) => total + record.selectedLocalSourceCount, 0)
const broadLocalCitationLinks = renderedHubGuidanceRecords.reduce((total, record) => total + record.broadLocalSourceCount, 0)
console.log(
  `Rendered hub service provenance: ${selectedFactLinks} fact selections and ${selectedLocalCitationLinks} local citation links; `
  + `${broadLocalCitationLinks - selectedLocalCitationLinks} unselected broad citation links excluded`,
)
console.log(`Hub-context-only service records: ${hubContextOnlyGuidanceRecords.length}; local fact selections 0 by contract`)
console.log(`Service-check uniqueness: ${checkCounts.size}/${allChecks.length} (${(checkUniquenessRatio * 100).toFixed(2)}%)`)
console.log(`Per-record body information gain: minimum ${minimumBodyShingleCount} globally unique 5-word shingles and ${(minimumBodyShingleRatio * 100).toFixed(2)}% unique ratio`)
console.log(`Cross-record exact body-sentence reuse: ${reusedBodySentenceOccurrences.length}/${bodySentenceOccurrences.length} occurrences (${(bodySentenceReuseRatio * 100).toFixed(2)}%) across ${reusedBodySentenceFamilies} repeated families`)
console.log(`Rendered service FAQ diversity: ${faqQuestionOwners.size} area-neutral question families, ${faqAnswerOwners.size} area-neutral answer families and ${faqExactAnswerOwners.size} exact answer families; largest question/answer families ${largestFaqQuestionFamily}/${largestFaqAnswerFamily}`)
for (const report of similarityReports) {
  console.log(`${report.name}: ${report.count} pairs, p95 ${(report.p95 * 100).toFixed(2)}%, max ${(report.max * 100).toFixed(2)}% (${report.highestPair?.left ?? 'n/a'} vs ${report.highestPair?.right ?? 'n/a'})`)
}

if (warnings.length > 0) {
  console.warn(`Warnings (${warnings.length})`)
  for (const warning of warnings) console.warn(`- ${warning}`)
}

if (failures.length > 0) {
  console.error(`Area-guide governance audit failed with ${failures.length} issue(s):`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exitCode = 1
} else {
  console.log('Area-guide governance audit passed.')
}
