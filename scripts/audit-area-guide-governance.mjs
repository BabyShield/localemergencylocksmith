import { AREAS } from '../src/data/areas.ts'
import { SERVICES } from '../src/data/services.ts'
import { AREA_GUIDES } from '../src/data/area-guides.ts'
import { COVENTRY_AREA_GUIDES } from '../src/data/area-guides-coventry.ts'
import { NORTH_EAST_AREA_GUIDES } from '../src/data/area-guides-north-east.ts'
import { SOUTH_WEST_AREA_GUIDES } from '../src/data/area-guides-south-west.ts'
import { SERVICE_AREA_SLUGS } from '../src/data/service-area-types.ts'
import { TECHNICAL_EVIDENCE_SOURCES } from '../src/data/locksmith-evidence.ts'

const EXPECTED_AREA_COUNT = 78
const EXPECTED_SERVICE_COUNT = 5
const EXPECTED_GUIDANCE_COUNT = EXPECTED_AREA_COUNT * EXPECTED_SERVICE_COUNT
const MIN_AREA_EDITORIAL_WORDS = 900
const MIN_GUIDANCE_WORDS = 120
const MAX_EVIDENCE_AGE_DAYS = 366
const DECLARED_REVIEW_DATE = '2026-08-29'
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
const MAX_WITHIN_PAGE_FAQ_ANSWER_OVERLAP = 0.65

const failures = []
const warnings = []

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
]

function check(condition, message) {
  if (!condition) failures.push(message)
}

function wordCount(value) {
  return typeof value === 'string'
    ? (value.match(/[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu) ?? []).length
    : 0
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
const areaWordCounts = []
const areaEditorialRecords = []

check(AREAS.length === EXPECTED_AREA_COUNT, `area registry has ${AREAS.length} entries; expected ${EXPECTED_AREA_COUNT}`)
check(SERVICES.length === EXPECTED_SERVICE_COUNT, `service registry has ${SERVICES.length} entries; expected ${EXPECTED_SERVICE_COUNT}`)
check(SERVICE_AREA_SLUGS.length === EXPECTED_SERVICE_COUNT, `service-area registry has ${SERVICE_AREA_SLUGS.length} entries; expected ${EXPECTED_SERVICE_COUNT}`)
check(new Set(areaSlugs).size === areaSlugs.length, 'area registry contains duplicate slugs')
check(new Set(serviceSlugs).size === serviceSlugs.length, 'service registry contains duplicate slugs')
check(serviceSlugs.every(slug => SERVICE_AREA_SLUGS.includes(slug)), 'canonical services and governed service slugs differ')
check(guideEntries.length === EXPECTED_AREA_COUNT, `area-guide registry has ${guideEntries.length} entries; expected ${EXPECTED_AREA_COUNT}`)

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
  check(guide.slug === area.slug, `${label} guide slug is ${guide.slug}`)
  validateDate(guide.reviewedOn, `${label} review`)
  check(Array.isArray(guide.summary) && guide.summary.length >= 2, `${label} needs at least two summary paragraphs`)
  for (const [index, paragraph] of (guide.summary ?? []).entries()) {
    check(wordCount(paragraph) >= 20, `${label} summary paragraph ${index + 1} has ${wordCount(paragraph)} words; expected at least 20`)
  }
  check(wordCount(guide.accessGuidance) >= 25, `${label} access guidance has ${wordCount(guide.accessGuidance)} words; expected at least 25`)
  check(wordCount(guide.evidenceLimits) >= 25, `${label} evidence limits have ${wordCount(guide.evidenceLimits)} words; expected at least 25`)
  check(Array.isArray(guide.facts) && guide.facts.length >= 2 && guide.facts.length <= 4, `${label} has ${guide.facts?.length ?? 0} facts; expected 2-4`)
  check(Array.isArray(guide.sources) && guide.sources.length >= 2, `${label} has ${guide.sources?.length ?? 0} sources; expected at least 2`)
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

  for (const [index, fact] of (guide.facts ?? []).entries()) {
    const factLabel = `${label} fact ${index + 1}`
    check(wordCount(fact?.text) >= 10, `${factLabel} has ${wordCount(fact?.text)} words; expected at least 10`)
    check(wordCount(fact?.serviceRelevance) >= 10, `${factLabel} service relevance has ${wordCount(fact?.serviceRelevance)} words; expected at least 10`)
    check(Array.isArray(fact?.sourceIds) && fact.sourceIds.length > 0, `${factLabel} has no source IDs`)
    for (const sourceId of fact?.sourceIds ?? []) {
      check(localSourceIds.has(sourceId), `${factLabel} references missing source ${sourceId}`)
      check(!technicalIds.has(sourceId), `${factLabel} cites technical source ${sourceId} for a locality fact`)
    }
  }

  const guidanceEntries = Object.entries(guide.serviceGuidance ?? {})
  check(guidanceEntries.length === EXPECTED_SERVICE_COUNT, `${label} has ${guidanceEntries.length} service guidance records; expected ${EXPECTED_SERVICE_COUNT}`)
  for (const serviceSlug of SERVICE_AREA_SLUGS) {
    const guidance = guide.serviceGuidance?.[serviceSlug]
    const guidanceLabel = `${label}/${serviceSlug}`
    check(Boolean(guidance), `${guidanceLabel} guidance is missing`)
    if (!guidance) continue
    check(wordCount(guidance.heading) >= 4, `${guidanceLabel} heading is too short`)
    check(guidance.heading.includes(area.name), `${guidanceLabel} heading does not name ${area.name}`)
    check(Array.isArray(guidance.body) && guidance.body.length === 2, `${guidanceLabel} needs exactly two body paragraphs`)
    for (const [index, paragraph] of (guidance.body ?? []).entries()) {
      check(wordCount(paragraph) >= 50, `${guidanceLabel} paragraph ${index + 1} has ${wordCount(paragraph)} words; expected at least 50`)
    }
    const guidanceText = (guidance.body ?? []).join(' ')
    const guidanceWords = wordCount(guidanceText)
    check(guidanceWords >= MIN_GUIDANCE_WORDS, `${guidanceLabel} has ${guidanceWords} guidance words; expected at least ${MIN_GUIDANCE_WORDS}`)
    check(Array.isArray(guidance.checks) && guidance.checks.length >= 3, `${guidanceLabel} needs at least three checks`)
    for (const [index, item] of (guidance.checks ?? []).entries()) {
      check(wordCount(item) >= 4, `${guidanceLabel} check ${index + 1} is too short`)
    }
    check(wordCount(guidance.faq?.q) >= 6, `${guidanceLabel} FAQ question is too short`)
    check(wordCount(guidance.faq?.a) >= 18, `${guidanceLabel} FAQ answer has ${wordCount(guidance.faq?.a)} words; expected at least 18`)

    guidanceRecords.push({
      key: guidanceLabel,
      areaSlug: area.slug,
      serviceSlug,
      words: guidanceWords,
      shingles: shingles(guidanceText),
    })
  }

  const pageFaqs = [
    ...(guide.faqs ?? []).map((faq, index) => ({ ...faq, owner: `guide FAQ ${index + 1}` })),
    ...SERVICE_AREA_SLUGS
      .map(serviceSlug => ({
        ...guide.serviceGuidance?.[serviceSlug]?.faq,
        owner: `${serviceSlug} FAQ`,
      }))
      .filter(faq => faq.q || faq.a),
  ]
  const faqQuestionOwners = new Map()
  const faqAnswerOwners = new Map()
  const nonFaqBlocks = [
    ...(guide.summary ?? []).map((value, index) => ({ value, owner: `summary paragraph ${index + 1}` })),
    { value: guide.accessGuidance, owner: 'access guidance' },
    { value: guide.evidenceLimits, owner: 'evidence limits' },
    ...(guide.facts ?? []).flatMap((fact, index) => [
      { value: fact.text, owner: `fact ${index + 1}` },
      { value: fact.serviceRelevance, owner: `fact ${index + 1} service relevance` },
    ]),
    ...SERVICE_AREA_SLUGS.flatMap(serviceSlug => {
      const guidance = guide.serviceGuidance?.[serviceSlug]
      return [
        ...(guidance?.body ?? []).map((value, index) => ({ value, owner: `${serviceSlug} paragraph ${index + 1}` })),
        ...(guidance?.checks ?? []).map((value, index) => ({ value, owner: `${serviceSlug} check ${index + 1}` })),
      ]
    }),
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

  const editorial = [
    ...(guide.summary ?? []),
    guide.accessGuidance,
    guide.evidenceLimits,
    ...(guide.facts ?? []).flatMap(fact => [fact.text, fact.serviceRelevance]),
    ...Object.values(guide.serviceGuidance ?? {}).flatMap(guidance => [
      guidance.heading,
      ...(guidance.body ?? []),
      ...(guidance.checks ?? []),
      guidance.faq?.q,
      guidance.faq?.a,
    ]),
    ...(guide.faqs ?? []).flatMap(faq => [faq.q, faq.a]),
  ].filter(Boolean).join(' ')
  const editorialWords = wordCount(editorial)
  areaWordCounts.push(editorialWords)
  areaEditorialRecords.push({ key: area.slug, shingles: shingles(editorial) })
  check(editorialWords >= MIN_AREA_EDITORIAL_WORDS, `${label} has ${editorialWords} governed editorial words; expected at least ${MIN_AREA_EDITORIAL_WORDS}`)
  for (const bannedClaim of BANNED_CLAIM_PATTERNS) {
    const match = editorial.match(bannedClaim.pattern)?.[0]
    if (match) failures.push(`${label} contains ${bannedClaim.label}: ${JSON.stringify(match)}`)
  }
}

for (const slug of Object.keys(AREA_GUIDES)) {
  check(areaSlugs.includes(slug), `area-guide registry contains unknown slug ${slug}`)
}

check(guidanceRecords.length === EXPECTED_GUIDANCE_COUNT, `found ${guidanceRecords.length} service guidance records; expected ${EXPECTED_GUIDANCE_COUNT}`)

const similarityReports = [
  similarityReport(
    'complete area-guide editorial',
    pairwise(areaEditorialRecords),
    MAX_GLOBAL_P95_OVERLAP,
    MAX_GLOBAL_PAIR_OVERLAP,
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
const words = summary(areaWordCounts)
console.log(`Area editorial words (minimum ${MIN_AREA_EDITORIAL_WORDS}): min ${words.min}, median ${words.median}, p95 ${words.p95}, max ${words.max}`)
const guidanceWords = summary(guidanceRecords.map(record => record.words))
console.log(`Guidance words (minimum ${MIN_GUIDANCE_WORDS}): min ${guidanceWords.min}, median ${guidanceWords.median}, p95 ${guidanceWords.p95}, max ${guidanceWords.max}`)
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
