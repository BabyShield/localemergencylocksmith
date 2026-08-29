import { AREAS } from '../src/data/areas.ts'
import { AREA_AUTHORITIES } from '../src/data/area-authorities.ts'
import { SERVICES } from '../src/data/services.ts'
import {
  SERVICE_AREA_SLUGS,
  TOWN_SERVICES,
  TOWN_SERVICE_PARAMS,
  TOWN_SLUGS,
  getAreaServicePublicationStatus,
} from '../src/data/governed-town-services.ts'

const EXPECTED_AREA_COUNT = 78
const EXPECTED_SERVICE_COUNT = 5
const EXPECTED_UNIVERSE_COUNT = EXPECTED_AREA_COUNT * EXPECTED_SERVICE_COUNT
const EXPECTED_PUBLISHED_COUNT = 35
const EXPECTED_REDIRECT_COUNT = EXPECTED_UNIVERSE_COUNT - EXPECTED_PUBLISHED_COUNT

// The previous hand-written town-service corpus had 591 editorial words at its
// thinnest. New governed records must clear 600 words rather than regress toward
// the old floor. Shared navigation, CTA and page-shell copy is not counted.
const MIN_EDITORIAL_WORDS = 600

// The strict metric isolates locality-specific editorial. The full metric also
// includes deliberately shared service, safety, pricing and evidence policy.
// These are the thresholds established by the preceding corpus audit.
const MAX_LOCALITY_P95_OVERLAP = 0.18
const MAX_LOCALITY_PAIR_OVERLAP = 0.25
const MAX_FULL_P95_OVERLAP = 0.35
const MAX_FULL_PAIR_OVERLAP = 0.40
const MAX_ALL_P95_OVERLAP = 0.35
const MAX_ALL_PAIR_OVERLAP = 0.45
const MAX_SAME_AREA_P95_OVERLAP = 0.40
const MAX_SAME_AREA_PAIR_OVERLAP = 0.45

const MIN_TITLE_LENGTH = 30
const MAX_TITLE_LENGTH = 60
const MIN_DESCRIPTION_LENGTH = 120
const MAX_DESCRIPTION_LENGTH = 160
const MIN_H1_LENGTH = 20
const MAX_H1_LENGTH = 70
const MAX_EVIDENCE_AGE_DAYS = 366
// The execution host clock can differ from the task's declared date. CI may
// override this explicitly; otherwise use the later of the declared review
// date and the host's UTC date so future runs continue to detect stale sources.
const DECLARED_REVIEW_DATE = '2026-08-29'
const SYSTEM_UTC_DATE = new Date().toISOString().slice(0, 10)
const AUDIT_AS_OF = process.env.SERVICE_AREA_AUDIT_AS_OF
  ?? (SYSTEM_UTC_DATE > DECLARED_REVIEW_DATE ? SYSTEM_UTC_DATE : DECLARED_REVIEW_DATE)

const TECHNICAL_SOURCE_IDS = new Set([
  'mla-service-calls',
  'warwickshire-lock-advice',
  'warwickshire-door-security',
  'warwickshire-forensics',
])

const REQUIRED_TECHNICAL_SOURCE_IDS = {
  'emergency-lockout': ['mla-service-calls'],
  'lock-change': ['warwickshire-door-security', 'mla-service-calls'],
  'upvc-lock-repair': ['warwickshire-lock-advice', 'warwickshire-door-security'],
  'boarding-up': ['warwickshire-forensics', 'mla-service-calls'],
  'lock-upgrade': ['warwickshire-lock-advice', 'warwickshire-door-security'],
}

const BANNED_CLAIM_PATTERNS = [
  {
    label: 'unsupported first-person job-frequency claim',
    pattern: /\b(?:i|we)\s+(?:regularly|frequently|often|commonly|usually)\s+(?:attend|receive|handle|get|see|respond(?:\s+to)?)\b/i,
  },
  {
    label: 'unsupported most-common job claim',
    pattern: /\b(?:the\s+)?most\s+(?:common|frequent)\s+(?:call|calls|job|jobs|problem|problems|issue|issues)\b/i,
  },
  {
    label: 'unsupported local call or crime rate',
    pattern: /\b(?:high(?:er|-than-average)?|highest)\s+(?:number|volume|rate|proportion)\s+of\s+(?:calls|lockouts|burglar(?:y|ies)|break-ins)\b/i,
  },
  {
    label: 'fixed arrival-time promise',
    pattern: /\b(?:arriv(?:e|al)|reach|response(?:\s+time)?|be\s+(?:with|there))[^.!?]{0,50}\b\d{1,3}\s*(?:-|\u2013|\u2014|to)\s*\d{1,3}\s*minutes?\b/i,
  },
  {
    label: 'unsupported local-base claim',
    pattern: /\b(?:i\s+am|i['\u2019]m|we\s+are|we['\u2019]re)\s+based\s+(?:locally|in\s+[\p{L}][\p{L}'\u2019-]+)\b/iu,
  },
  {
    label: 'universal insurance approval claim',
    pattern: /\b(?:insurance[- ]approved|approved\s+by\s+(?:all|your)\s+insurer|satisf(?:y|ies|ied)\s+(?:all|your)\s+insurance)\b/i,
    negationAware: true,
  },
  {
    label: 'guaranteed non-destructive entry',
    pattern: /\b(?:guaranteed?\s+non[- ]destructive|non[- ]destructive\s+entry\s+(?:is\s+)?guaranteed)\b/i,
    negationAware: true,
  },
  {
    label: 'absolute forced-entry resistance claim',
    pattern: /\b(?:burglar[- ]proof|burglary[- ]proof|attack[- ]proof|impossible\s+to\s+breach|cannot\s+be\s+breached)\b/i,
    negationAware: true,
  },
  {
    label: 'unsupported same-day or one-visit promise',
    pattern: /\b(?:guaranteed\s+same[- ]day|same[- ]day\s+guarantee|one\s+visit\s+is\s+(?:always|normally)\s+enough)\b/i,
  },
  {
    label: 'absolute no-damage claim',
    pattern: /\b(?:no\s+damage|without\s+damaging\s+(?:the|your)\s+door)\b/i,
  },
]

const failures = []
const warnings = []

function check(condition, message) {
  if (!condition) failures.push(message)
}

function words(value) {
  if (typeof value !== 'string') return []
  return value.toLowerCase().match(/[\p{L}\p{N}]+(?:['\u2019][\p{L}\p{N}]+)?/gu) ?? []
}

function wordCount(value) {
  return words(value).length
}

function editorialText(content) {
  return [
    ...(Array.isArray(content.intro) ? content.intro : []),
    content.localAngleHeading,
    content.localAngleBody,
    ...(Array.isArray(content.contextGuidance) ? content.contextGuidance : []),
    ...(Array.isArray(content.commonJobs) ? content.commonJobs : []),
    ...(Array.isArray(content.faqs)
      ? content.faqs.flatMap(faq => [faq?.q, faq?.a])
      : []),
    content.priceNote,
    content.evidenceSummary,
    ...(Array.isArray(content.preparationSteps) ? content.preparationSteps : []),
  ].filter(value => typeof value === 'string' && value.trim().length > 0).join(' ')
}

function localityEditorialText(content) {
  return [
    ...(Array.isArray(content.intro) ? content.intro.slice(0, 1) : []),
    content.localAngleHeading,
    content.localAngleBody,
    ...(Array.isArray(content.contextGuidance) ? content.contextGuidance : []),
    ...(Array.isArray(content.commonJobs) ? content.commonJobs.slice(0, 3) : []),
    ...(Array.isArray(content.faqs) && content.faqs[0]
      ? [content.faqs[0].q, content.faqs[0].a]
      : []),
    content.evidenceSummary,
    content.priceNote,
  ].filter(value => typeof value === 'string' && value.trim().length > 0).join(' ')
}

function claimText(content) {
  return [
    ...(Array.isArray(content.intro) ? content.intro : []),
    content.localAngleBody,
    ...(Array.isArray(content.contextGuidance) ? content.contextGuidance : []),
    ...(Array.isArray(content.commonJobs) ? content.commonJobs : []),
    ...(Array.isArray(content.faqs) ? content.faqs.map(faq => faq?.a) : []),
    content.priceNote,
    content.evidenceSummary,
    ...(Array.isArray(content.preparationSteps) ? content.preparationSteps : []),
    content.metaDescription,
  ].filter(value => typeof value === 'string' && value.trim().length > 0).join(' ')
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function normaliseLocality(text, area) {
  let normalised = text.toLowerCase().normalize('NFKC')
  const aliases = new Set([
    area.name,
    area.slug.replaceAll('-', ' '),
    area.postcode,
  ])

  for (const alias of aliases) {
    if (typeof alias !== 'string' || alias.trim().length === 0) continue
    normalised = normalised.replace(new RegExp(escapeRegExp(alias.toLowerCase()), 'g'), ' {area} ')
  }

  return normalised.replace(/\s+/g, ' ').trim()
}

function shingles(text, size = 5) {
  const tokens = words(text)
  const result = new Set()
  for (let index = 0; index <= tokens.length - size; index += 1) {
    result.add(tokens.slice(index, index + size).join(' '))
  }
  return result
}

function overlapCoefficient(left, right) {
  if (left.size === 0 || right.size === 0) return 0
  const smaller = left.size <= right.size ? left : right
  const larger = left.size <= right.size ? right : left
  let shared = 0
  for (const value of smaller) {
    if (larger.has(value)) shared += 1
  }
  return shared / smaller.size
}

function percentile(values, percentileValue) {
  if (values.length === 0) return 0
  const sorted = [...values].sort((left, right) => left - right)
  const position = (sorted.length - 1) * percentileValue
  const lowerIndex = Math.floor(position)
  const upperIndex = Math.ceil(position)
  const fraction = position - lowerIndex
  return sorted[lowerIndex] + (sorted[upperIndex] - sorted[lowerIndex]) * fraction
}

function numericSummary(values) {
  if (values.length === 0) return { min: 0, median: 0, p95: 0, max: 0 }
  return {
    min: Math.min(...values),
    median: percentile(values, 0.5),
    p95: percentile(values, 0.95),
    max: Math.max(...values),
  }
}

function validIsoDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null
  const date = new Date(`${value}T00:00:00.000Z`)
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) return null
  return date
}

function validateCheckedDate(value, label) {
  const date = validIsoDate(value)
  check(Boolean(date), `${label} has invalid checked date ${JSON.stringify(value)}`)
  if (!date) return null

  const auditDate = validIsoDate(AUDIT_AS_OF)
  if (!auditDate) throw new Error(`SERVICE_AREA_AUDIT_AS_OF is not a valid YYYY-MM-DD date: ${AUDIT_AS_OF}`)
  const ageDays = Math.floor((auditDate.getTime() - date.getTime()) / 86_400_000)
  check(ageDays >= 0, `${label} has a future checked date ${value}`)
  check(ageDays <= MAX_EVIDENCE_AGE_DAYS, `${label} evidence is stale at ${ageDays} days old (${value})`)
  return date
}

function findBannedClaim(text, { pattern, negationAware = false }) {
  const flags = pattern.flags.includes('g') ? pattern.flags : `${pattern.flags}g`
  const matcher = new RegExp(pattern.source, flags)
  for (const match of text.matchAll(matcher)) {
    if (negationAware) {
      const precedingContext = text.slice(Math.max(0, (match.index ?? 0) - 100), match.index).toLowerCase()
      const isNegated = /\b(?:no|not|never|cannot|can't|doesn't|does\s+not|do\s+not|should\s+not|must\s+not)\b[^.!?]{0,85}$/.test(precedingContext)
      if (isNegated) continue
    }
    return match[0]
  }
  return null
}

function validateDeepHttpsUrl(value, label) {
  try {
    const url = new URL(value)
    const pathSegments = url.pathname.split('/').filter(Boolean)
    check(url.protocol === 'https:', `${label} must use HTTPS: ${value}`)
    check(Boolean(url.hostname), `${label} has no hostname: ${value}`)
    check(pathSegments.length > 0, `${label} must link to a claim-level page, not a site homepage: ${value}`)
    check(!url.username && !url.password, `${label} must not contain URL credentials: ${value}`)
  } catch {
    failures.push(`${label} is not a valid URL: ${JSON.stringify(value)}`)
  }
}

function addUniqueOwner(owners, value, owner, label) {
  if (typeof value !== 'string' || value.trim().length === 0) return
  const previousOwner = owners.get(value)
  if (previousOwner) failures.push(`duplicate ${label} on ${previousOwner} and ${owner}: ${value}`)
  else owners.set(value, owner)
}

const areaSlugs = AREAS.map(area => area.slug)
const serviceSlugs = SERVICES.map(service => service.slug)
const areaBySlug = new Map(AREAS.map(area => [area.slug, area]))
const serviceBySlug = new Map(SERVICES.map(service => [service.slug, service]))

check(AREAS.length === EXPECTED_AREA_COUNT, `area registry has ${AREAS.length} entries; expected ${EXPECTED_AREA_COUNT}`)
check(new Set(areaSlugs).size === AREAS.length, 'area registry contains duplicate slugs')
check(Object.keys(AREA_AUTHORITIES).length === EXPECTED_AREA_COUNT, `authority registry has ${Object.keys(AREA_AUTHORITIES).length} entries; expected ${EXPECTED_AREA_COUNT}`)
for (const areaSlug of areaSlugs) {
  const authority = AREA_AUTHORITIES[areaSlug]
  check(Boolean(authority), `authority registry is missing ${areaSlug}`)
  check(['West Midlands', 'Warwickshire'].includes(authority?.addressRegion), `${areaSlug} has invalid addressRegion ${JSON.stringify(authority?.addressRegion)}`)
  check(typeof authority?.localAuthority === 'string' && authority.localAuthority.length > 0, `${areaSlug} has no local authority`)
}
for (const areaSlug of Object.keys(AREA_AUTHORITIES)) {
  check(areaBySlug.has(areaSlug), `authority registry contains unknown area ${areaSlug}`)
}
check(SERVICES.length === EXPECTED_SERVICE_COUNT, `service registry has ${SERVICES.length} entries; expected ${EXPECTED_SERVICE_COUNT}`)
check(new Set(serviceSlugs).size === SERVICES.length, 'service registry contains duplicate slugs')
check(SERVICE_AREA_SLUGS.length === EXPECTED_SERVICE_COUNT, `governed service registry has ${SERVICE_AREA_SLUGS.length} slugs; expected ${EXPECTED_SERVICE_COUNT}`)

const canonicalServiceSet = new Set(serviceSlugs)
const governedServiceSet = new Set(SERVICE_AREA_SLUGS)
for (const serviceSlug of canonicalServiceSet) {
  check(governedServiceSet.has(serviceSlug), `canonical service ${serviceSlug} is missing from SERVICE_AREA_SLUGS`)
}
for (const serviceSlug of governedServiceSet) {
  check(canonicalServiceSet.has(serviceSlug), `governed service ${serviceSlug} is not in the canonical service registry`)
}

const titleOwners = new Map()
const descriptionOwners = new Map()
const h1Owners = new Map()
const sourceById = new Map()
const sourceUrlOwners = new Map()
const publishedByKey = new Map()
const publishedRecords = []
let rawPublishedCount = 0

for (const [areaSlug, records] of Object.entries(TOWN_SERVICES)) {
  check(areaBySlug.has(areaSlug), `published registry contains unknown area ${areaSlug}`)
  check(Array.isArray(records), `published registry value for ${areaSlug} is not an array`)
  if (!Array.isArray(records)) continue

  const localServiceSlugs = new Set()
  for (const content of records) {
    rawPublishedCount += 1
    const serviceSlug = content?.service
    const key = `${areaSlug}/${serviceSlug}`
    const area = areaBySlug.get(areaSlug)

    check(content && typeof content === 'object' && !Array.isArray(content), `${key} content record is missing or invalid`)
    if (!content || typeof content !== 'object' || Array.isArray(content)) continue

    check(typeof serviceSlug === 'string' && serviceBySlug.has(serviceSlug), `${key} maps to an unknown service`)
    check(!localServiceSlugs.has(serviceSlug), `${areaSlug} has duplicate ${serviceSlug} records`)
    localServiceSlugs.add(serviceSlug)
    check(!publishedByKey.has(key), `duplicate published record ${key}`)
    publishedByKey.set(key, content)

    if (!area || !serviceBySlug.has(serviceSlug)) continue

    const record = {
      area,
      areaSlug,
      serviceSlug,
      key,
      content,
      editorial: editorialText(content),
      localityEditorial: localityEditorialText(content),
    }
    publishedRecords.push(record)

    check(content.metaTitle?.includes(area.name), `${key} meta title does not name ${area.name}`)
    check(content.metaDescription?.includes(area.name), `${key} meta description does not name ${area.name}`)
    check(content.h1?.includes(area.name), `${key} H1 does not name ${area.name}`)

    const canonicalStartingPrice = `£${serviceBySlug.get(serviceSlug).priceFrom}`
    check(content.metaDescription?.includes(canonicalStartingPrice), `${key} meta description does not use canonical starting price ${canonicalStartingPrice}`)
    check(content.intro?.at(-1)?.includes(canonicalStartingPrice), `${key} introduction does not use canonical starting price ${canonicalStartingPrice}`)
    check(content.priceNote?.includes(canonicalStartingPrice), `${key} price note does not use canonical starting price ${canonicalStartingPrice}`)

    const titleLength = typeof content.metaTitle === 'string' ? content.metaTitle.length : 0
    const descriptionLength = typeof content.metaDescription === 'string' ? content.metaDescription.length : 0
    const h1Length = typeof content.h1 === 'string' ? content.h1.length : 0
    check(titleLength >= MIN_TITLE_LENGTH && titleLength <= MAX_TITLE_LENGTH, `${key} title is ${titleLength} characters; expected ${MIN_TITLE_LENGTH}-${MAX_TITLE_LENGTH}`)
    check(descriptionLength >= MIN_DESCRIPTION_LENGTH && descriptionLength <= MAX_DESCRIPTION_LENGTH, `${key} description is ${descriptionLength} characters; expected ${MIN_DESCRIPTION_LENGTH}-${MAX_DESCRIPTION_LENGTH}`)
    check(h1Length >= MIN_H1_LENGTH && h1Length <= MAX_H1_LENGTH, `${key} H1 is ${h1Length} characters; expected ${MIN_H1_LENGTH}-${MAX_H1_LENGTH}`)

    addUniqueOwner(titleOwners, content.metaTitle, key, 'title')
    addUniqueOwner(descriptionOwners, content.metaDescription, key, 'description')
    addUniqueOwner(h1Owners, content.h1, key, 'H1')

    check(Array.isArray(content.intro) && content.intro.length >= 3, `${key} needs at least 3 introduction paragraphs`)
    check(wordCount(content.localAngleBody) >= 75, `${key} local service analysis has ${wordCount(content.localAngleBody)} words; expected at least 75`)
    const expectedContextParagraphs = ['emergency-lockout', 'lock-change'].includes(serviceSlug) ? 4 : 3
    check(Array.isArray(content.contextGuidance) && content.contextGuidance.length === expectedContextParagraphs, `${key} needs ${expectedContextParagraphs - 2} service-selected locality paragraph(s) plus exactly 2 pair-specific guidance paragraphs`)
    if (Array.isArray(content.contextGuidance)) {
      for (const [index, paragraph] of content.contextGuidance.entries()) {
        const minimumWords = index < content.contextGuidance.length - 2 ? 45 : 80
        check(wordCount(paragraph) >= minimumWords, `${key} locality guidance paragraph ${index + 1} has ${wordCount(paragraph)} words; expected at least ${minimumWords}`)
      }
    }
    check(Array.isArray(content.commonJobs) && content.commonJobs.length >= 5, `${key} needs at least 5 service checks or scenarios`)
    check(Array.isArray(content.preparationSteps) && content.preparationSteps.length >= 3, `${key} needs at least 3 preparation steps`)
    check(wordCount(content.evidenceSummary) >= 40, `${key} evidence summary has ${wordCount(content.evidenceSummary)} words; expected at least 40`)

    const editorialWords = wordCount(record.editorial)
    record.editorialWords = editorialWords
    check(editorialWords >= MIN_EDITORIAL_WORDS, `${key} has ${editorialWords} editorial words; expected at least ${MIN_EDITORIAL_WORDS}`)

    check(Array.isArray(content.faqs) && content.faqs.length >= 4, `${key} has ${content.faqs?.length ?? 0} FAQs; expected at least 4`)
    if (Array.isArray(content.faqs)) {
      const localQuestions = new Set()
      for (const [index, faq] of content.faqs.entries()) {
        const faqLabel = `${key} FAQ ${index + 1}`
        check(typeof faq?.q === 'string' && faq.q.trim().length >= 12, `${faqLabel} has a missing or very short question`)
        check(wordCount(faq?.a) >= 15, `${faqLabel} answer has ${wordCount(faq?.a)} words; expected at least 15`)
        if (typeof faq?.q === 'string') {
          const normalisedQuestion = faq.q.trim().toLowerCase()
          check(!localQuestions.has(normalisedQuestion), `${key} repeats FAQ question: ${faq.q}`)
          localQuestions.add(normalisedQuestion)
        }
      }
    }

    const reviewedDate = validateCheckedDate(content.reviewedOn, `${key} review`)
    check(content.evidenceSummary?.includes(content.reviewedOn), `${key} evidence summary does not display its reviewed date`)

    check(Array.isArray(content.sources), `${key} sources must be an array`)
    const sources = Array.isArray(content.sources) ? content.sources : []
    const sourceIds = new Set()
    const technicalSources = []
    const localitySources = []

    for (const [index, source] of sources.entries()) {
      const sourceLabel = `${key} source ${index + 1}`
      check(source && typeof source === 'object', `${sourceLabel} is missing`)
      if (!source || typeof source !== 'object') continue

      for (const field of ['id', 'title', 'publisher', 'url', 'supports', 'checkedOn']) {
        check(typeof source[field] === 'string' && source[field].trim().length > 0, `${sourceLabel} has missing ${field}`)
      }
      check(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(source.id ?? ''), `${sourceLabel} has invalid source id ${JSON.stringify(source.id)}`)
      check((source.supports?.trim().length ?? 0) >= 20, `${sourceLabel} has an inadequate supports statement`)
      validateDeepHttpsUrl(source.url, sourceLabel)

      const sourceDate = validateCheckedDate(source.checkedOn, sourceLabel)
      if (reviewedDate && sourceDate) {
        check(sourceDate.getTime() <= reviewedDate.getTime(), `${sourceLabel} was checked after the record review date`)
      }

      check(!sourceIds.has(source.id), `${key} repeats source id ${source.id}`)
      sourceIds.add(source.id)

      if (TECHNICAL_SOURCE_IDS.has(source.id)) technicalSources.push(source)
      else localitySources.push(source)

      const canonicalSource = JSON.stringify({
        title: source.title,
        publisher: source.publisher,
        url: source.url,
        supports: source.supports,
        checkedOn: source.checkedOn,
      })
      const previousSource = sourceById.get(source.id)
      check(!previousSource || previousSource.canonical === canonicalSource, `${sourceLabel} conflicts with source id ${source.id} used by ${previousSource?.owner}`)
      if (!previousSource) sourceById.set(source.id, { canonical: canonicalSource, owner: key })

      const previousUrlOwner = sourceUrlOwners.get(source.url)
      check(!previousUrlOwner || previousUrlOwner.id === source.id, `${sourceLabel} URL is also assigned to source id ${previousUrlOwner?.id}`)
      if (!previousUrlOwner) sourceUrlOwners.set(source.url, { id: source.id, owner: key })
    }

    check(localitySources.length >= 2, `${key} has ${localitySources.length} locality sources; expected at least 2`)
    check(technicalSources.length >= 1, `${key} has no recognised technical source`)
    for (const requiredSourceId of REQUIRED_TECHNICAL_SOURCE_IDS[serviceSlug] ?? []) {
      check(sourceIds.has(requiredSourceId), `${key} is missing required technical source ${requiredSourceId}`)
    }

    const claims = claimText(content)
    for (const bannedClaim of BANNED_CLAIM_PATTERNS) {
      const match = findBannedClaim(claims, bannedClaim)
      if (match) failures.push(`${key} contains ${bannedClaim.label}: ${JSON.stringify(match)}`)
    }
  }
}

check(rawPublishedCount === EXPECTED_PUBLISHED_COUNT, `published registry contains ${rawPublishedCount} records; expected ${EXPECTED_PUBLISHED_COUNT}`)
check(publishedByKey.size === EXPECTED_PUBLISHED_COUNT, `published registry contains ${publishedByKey.size} unique pairs; expected ${EXPECTED_PUBLISHED_COUNT}`)

const publishedTownSlugs = new Set(Object.keys(TOWN_SERVICES))
const townSlugEntries = new Set()
for (const town of TOWN_SLUGS) {
  check(typeof town?.slug === 'string' && areaBySlug.has(town.slug), `TOWN_SLUGS contains unknown area ${town?.slug}`)
  check(!townSlugEntries.has(town?.slug), `TOWN_SLUGS repeats ${town?.slug}`)
  townSlugEntries.add(town?.slug)
  const area = areaBySlug.get(town?.slug)
  check(!area || town.name === area.name, `TOWN_SLUGS name for ${town?.slug} is ${town?.name}; expected ${area?.name}`)
}
check(townSlugEntries.size === publishedTownSlugs.size, `TOWN_SLUGS has ${townSlugEntries.size} areas but the published registry has ${publishedTownSlugs.size}`)
for (const areaSlug of publishedTownSlugs) check(townSlugEntries.has(areaSlug), `published area ${areaSlug} is missing from TOWN_SLUGS`)
for (const areaSlug of townSlugEntries) check(publishedTownSlugs.has(areaSlug), `TOWN_SLUGS area ${areaSlug} has no published records`)

const paramKeys = new Set()
for (const param of TOWN_SERVICE_PARAMS) {
  const key = `${param?.slug}/${param?.serviceSlug}`
  check(areaBySlug.has(param?.slug), `static param ${key} has an unknown area`)
  check(serviceBySlug.has(param?.serviceSlug), `static param ${key} has an unknown service`)
  check(!paramKeys.has(key), `static params repeat ${key}`)
  paramKeys.add(key)
}
check(TOWN_SERVICE_PARAMS.length === EXPECTED_PUBLISHED_COUNT, `static params contain ${TOWN_SERVICE_PARAMS.length} records; expected ${EXPECTED_PUBLISHED_COUNT}`)
check(paramKeys.size === publishedByKey.size, `static params contain ${paramKeys.size} unique pairs but published registry contains ${publishedByKey.size}`)
for (const key of publishedByKey.keys()) check(paramKeys.has(key), `published pair ${key} is missing from static params`)
for (const key of paramKeys) check(publishedByKey.has(key), `static param ${key} has no published record`)

let universeCount = 0
let indexableCount = 0
let redirectCount = 0
const publishedCountsByService = new Map(serviceSlugs.map(serviceSlug => [serviceSlug, 0]))

for (const area of AREAS) {
  for (const service of SERVICES) {
    universeCount += 1
    const key = `${area.slug}/${service.slug}`
    const status = getAreaServicePublicationStatus(area.slug, service.slug)
    check(status === 'indexable' || status === 'redirect', `${key} has invalid publication status ${JSON.stringify(status)}`)

    if (status === 'indexable') {
      indexableCount += 1
      publishedCountsByService.set(service.slug, (publishedCountsByService.get(service.slug) ?? 0) + 1)
      check(publishedByKey.has(key), `${key} is indexable but has no governed content record`)
    } else if (status === 'redirect') {
      redirectCount += 1
      check(!publishedByKey.has(key), `${key} redirects despite having a governed content record`)
    }
  }
}

check(universeCount === EXPECTED_UNIVERSE_COUNT, `computed universe has ${universeCount} pairs; expected ${EXPECTED_UNIVERSE_COUNT}`)
check(indexableCount === EXPECTED_PUBLISHED_COUNT, `publication policy marks ${indexableCount} pairs indexable; expected ${EXPECTED_PUBLISHED_COUNT}`)
check(redirectCount === EXPECTED_REDIRECT_COUNT, `publication policy marks ${redirectCount} pairs as redirects; expected ${EXPECTED_REDIRECT_COUNT}`)
for (const serviceSlug of serviceSlugs) {
  check(publishedCountsByService.get(serviceSlug) === 7, `${serviceSlug} has ${publishedCountsByService.get(serviceSlug)} published areas; expected 7`)
}

const wordCountsByService = new Map(serviceSlugs.map(serviceSlug => [serviceSlug, []]))
const recordsByService = new Map(serviceSlugs.map(serviceSlug => [serviceSlug, []]))
const localityRecordsByService = new Map(serviceSlugs.map(serviceSlug => [serviceSlug, []]))
for (const record of publishedRecords) {
  wordCountsByService.get(record.serviceSlug)?.push(record.editorialWords)
  recordsByService.get(record.serviceSlug)?.push({
    key: record.key,
    shingles: shingles(normaliseLocality(record.editorial, record.area), 5),
  })
  localityRecordsByService.get(record.serviceSlug)?.push({
    key: record.key,
    shingles: shingles(normaliseLocality(record.localityEditorial, record.area), 5),
  })
}

function buildSimilarityReports(groupedRecords) {
  const reports = []
  for (const serviceSlug of serviceSlugs) {
    const records = groupedRecords.get(serviceSlug) ?? []
    const pairs = []
    for (let leftIndex = 0; leftIndex < records.length; leftIndex += 1) {
      for (let rightIndex = leftIndex + 1; rightIndex < records.length; rightIndex += 1) {
        const left = records[leftIndex]
        const right = records[rightIndex]
        pairs.push({
          left: left.key,
          right: right.key,
          overlap: overlapCoefficient(left.shingles, right.shingles),
        })
      }
    }

    const overlaps = pairs.map(pair => pair.overlap)
    const p95 = percentile(overlaps, 0.95)
    const highestPair = [...pairs].sort((left, right) => right.overlap - left.overlap)[0]
    reports.push({
      serviceSlug,
      pairCount: pairs.length,
      p95,
      max: highestPair?.overlap ?? 0,
      highestPair,
    })
  }
  return reports
}

const localitySimilarityReports = buildSimilarityReports(localityRecordsByService)
const fullSimilarityReports = buildSimilarityReports(recordsByService)

function buildCrossCorpusReport(records, predicate = () => true) {
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
  const overlaps = pairs.map(pair => pair.overlap)
  const highestPair = [...pairs].sort((left, right) => right.overlap - left.overlap)[0]
  return {
    pairCount: pairs.length,
    p95: percentile(overlaps, 0.95),
    max: highestPair?.overlap ?? 0,
    highestPair,
  }
}

const allFullRecords = publishedRecords.map(record => ({
  key: record.key,
  areaSlug: record.areaSlug,
  serviceSlug: record.serviceSlug,
  shingles: shingles(normaliseLocality(record.editorial, record.area), 5),
}))
const allFullReport = buildCrossCorpusReport(allFullRecords)
const sameAreaCrossServiceReport = buildCrossCorpusReport(
  allFullRecords,
  (left, right) => left.areaSlug === right.areaSlug && left.serviceSlug !== right.serviceSlug,
)

for (const report of localitySimilarityReports) {
  check(report.p95 <= MAX_LOCALITY_P95_OVERLAP, `${report.serviceSlug} locality-specific 5-word-shingle p95 overlap is ${(report.p95 * 100).toFixed(2)}%; maximum is ${(MAX_LOCALITY_P95_OVERLAP * 100).toFixed(0)}%`)
  check(report.max <= MAX_LOCALITY_PAIR_OVERLAP, `${report.serviceSlug} highest locality-specific 5-word-shingle overlap is ${(report.max * 100).toFixed(2)}% on ${report.highestPair?.left} vs ${report.highestPair?.right}; maximum is ${(MAX_LOCALITY_PAIR_OVERLAP * 100).toFixed(0)}%`)
}

for (const report of fullSimilarityReports) {
  check(report.p95 <= MAX_FULL_P95_OVERLAP, `${report.serviceSlug} full-editorial 5-word-shingle p95 overlap is ${(report.p95 * 100).toFixed(2)}%; maximum is ${(MAX_FULL_P95_OVERLAP * 100).toFixed(0)}%`)
  check(report.max <= MAX_FULL_PAIR_OVERLAP, `${report.serviceSlug} highest full-editorial 5-word-shingle overlap is ${(report.max * 100).toFixed(2)}% on ${report.highestPair?.left} vs ${report.highestPair?.right}; maximum is ${(MAX_FULL_PAIR_OVERLAP * 100).toFixed(0)}%`)
}

check(allFullReport.p95 <= MAX_ALL_P95_OVERLAP, `all-page full-editorial 5-word-shingle p95 overlap is ${(allFullReport.p95 * 100).toFixed(2)}%; maximum is ${(MAX_ALL_P95_OVERLAP * 100).toFixed(0)}%`)
check(allFullReport.max <= MAX_ALL_PAIR_OVERLAP, `all-page highest full-editorial 5-word-shingle overlap is ${(allFullReport.max * 100).toFixed(2)}% on ${allFullReport.highestPair?.left} vs ${allFullReport.highestPair?.right}; maximum is ${(MAX_ALL_PAIR_OVERLAP * 100).toFixed(0)}%`)
check(sameAreaCrossServiceReport.p95 <= MAX_SAME_AREA_P95_OVERLAP, `same-area cross-service full-editorial p95 overlap is ${(sameAreaCrossServiceReport.p95 * 100).toFixed(2)}%; maximum is ${(MAX_SAME_AREA_P95_OVERLAP * 100).toFixed(0)}%`)
check(sameAreaCrossServiceReport.max <= MAX_SAME_AREA_PAIR_OVERLAP, `same-area cross-service highest full-editorial overlap is ${(sameAreaCrossServiceReport.max * 100).toFixed(2)}% on ${sameAreaCrossServiceReport.highestPair?.left} vs ${sameAreaCrossServiceReport.highestPair?.right}; maximum is ${(MAX_SAME_AREA_PAIR_OVERLAP * 100).toFixed(0)}%`)

console.log('Service-area governance audit')
console.log(`Evidence as-of date: ${AUDIT_AS_OF}`)
console.log(`Universe: ${AREAS.length} areas x ${SERVICES.length} services = ${universeCount} pairs`)
console.log(`Publication: ${indexableCount} indexable, ${redirectCount} redirect`)
console.log(`Evidence registry: ${sourceById.size} unique source IDs, ${sourceUrlOwners.size} unique URLs`)
console.log('')
console.log(`Editorial word counts (hard minimum ${MIN_EDITORIAL_WORDS})`)
for (const serviceSlug of serviceSlugs) {
  const summary = numericSummary(wordCountsByService.get(serviceSlug) ?? [])
  console.log(`- ${serviceSlug}: min ${summary.min}, median ${summary.median.toFixed(0)}, p95 ${summary.p95.toFixed(0)}, max ${summary.max}`)
}
console.log('')
console.log(`Locality-specific within-service 5-word-shingle overlap (p95 <= ${(MAX_LOCALITY_P95_OVERLAP * 100).toFixed(0)}%, every pair <= ${(MAX_LOCALITY_PAIR_OVERLAP * 100).toFixed(0)}%)`)
for (const report of localitySimilarityReports) {
  console.log(`- ${report.serviceSlug}: ${report.pairCount} pairs, p95 ${(report.p95 * 100).toFixed(2)}%, max ${(report.max * 100).toFixed(2)}% (${report.highestPair?.left} vs ${report.highestPair?.right})`)
}
console.log('')
console.log(`Full editorial within-service 5-word-shingle overlap (p95 <= ${(MAX_FULL_P95_OVERLAP * 100).toFixed(0)}%, every pair <= ${(MAX_FULL_PAIR_OVERLAP * 100).toFixed(0)}%)`)
for (const report of fullSimilarityReports) {
  console.log(`- ${report.serviceSlug}: ${report.pairCount} pairs, p95 ${(report.p95 * 100).toFixed(2)}%, max ${(report.max * 100).toFixed(2)}% (${report.highestPair?.left} vs ${report.highestPair?.right})`)
}
console.log('')
console.log(`All-page full-editorial overlap: ${allFullReport.pairCount} pairs, p95 ${(allFullReport.p95 * 100).toFixed(2)}%, max ${(allFullReport.max * 100).toFixed(2)}% (${allFullReport.highestPair?.left} vs ${allFullReport.highestPair?.right})`)
console.log(`Same-area cross-service overlap: ${sameAreaCrossServiceReport.pairCount} pairs, p95 ${(sameAreaCrossServiceReport.p95 * 100).toFixed(2)}%, max ${(sameAreaCrossServiceReport.max * 100).toFixed(2)}% (${sameAreaCrossServiceReport.highestPair?.left} vs ${sameAreaCrossServiceReport.highestPair?.right})`)

if (warnings.length > 0) {
  console.warn('')
  console.warn(`Warnings (${warnings.length})`)
  for (const warning of warnings) console.warn(`- ${warning}`)
}

if (failures.length > 0) {
  console.error('')
  console.error(`Governance audit failed with ${failures.length} issue(s):`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exitCode = 1
} else {
  console.log('')
  console.log('Governance audit passed.')
}
