import { spawn } from 'node:child_process'

const BASE_URL = process.env.SEO_BASE_URL ?? 'http://127.0.0.1:3000'
const CANONICAL_ORIGIN = process.env.SEO_CANONICAL_ORIGIN ?? 'https://www.localemergencylocksmith.co.uk'
const EXPECTED_SITEMAP_URLS = 178
const UNVERIFIED_PROFILE_URL = 'https://share.google/bdboAzi1gJOpOjPck'
const failures = []
const warnings = []

const SERVICE_SLUGS = ['emergency-lockout', 'lock-change', 'upvc-lock-repair', 'boarding-up', 'lock-upgrade']
const SERVICE_SHORT_NAMES = Object.freeze({
  'emergency-lockout': 'Emergency Lockout',
  'lock-change': 'Lock Repair & Replacement',
  'upvc-lock-repair': 'uPVC Lock Repair',
  'boarding-up': 'Boarding Up & Burglary Repairs',
  'lock-upgrade': 'Lock Upgrade',
})
const PRICE_OWNER_PATH = '/prices'
const PRICE_OWNER_TITLE_H1_PATTERN = /\blocksmith (?:costs?|prices)\b/i
const PRICE_OWNER_EXACT_QUESTION_PATTERN = /\bwhat does an emergency locksmith cost in coventry\b/i
const CORE_SEARCH_INTENT_CONTRACTS = Object.freeze({
  '/': [
    { label: 'local locksmith Coventry', pattern: /\blocal locksmith coventry\b/i },
    { label: 'mobile locksmith', pattern: /\bmobile locksmith\b/i },
  ],
  '/prices': [
    { label: 'locksmith prices', pattern: /\blocksmith prices\b/i },
    { label: 'locksmith cost', pattern: /\bhow much does (?:a|an) locksmith cost\b/i },
  ],
  '/services/emergency-lockout': [
    { label: 'emergency locksmith', pattern: /\bemergency locksmith\b/i },
    { label: 'lockout', pattern: /\blockouts?\b/i },
  ],
  '/services/lock-change': [
    { label: 'door lock repair', pattern: /\bdoor lock repair\b/i },
    { label: 'lock replacement', pattern: /\block replacement\b/i },
  ],
  '/services/upvc-lock-repair': [
    { label: 'uPVC door lock repair', pattern: /\bupvc door lock repair\b/i },
    { label: 'uPVC door lock replacement', pattern: /\bupvc door lock replacement\b/i },
  ],
  '/services/boarding-up': [
    { label: 'emergency boarding up', pattern: /\bemergency boarding up\b/i },
    { label: 'burglary repairs', pattern: /\bburglary repairs\b/i },
  ],
  '/services/lock-upgrade': [
    { label: 'anti-snap locks', pattern: /\banti[- ]snap locks?\b/i },
    { label: 'BS3621 locks', pattern: /\bbs\s*3621 locks?\b/i },
  ],
})
const TOWN_CENTRE_ALIASES = {
  'rugby-town-centre': 'rugby',
  'royal-leamington-spa-town-centre': 'leamington-spa',
  'warwick-town-centre': 'warwick',
  'stratford-upon-avon-town-centre': 'stratford-upon-avon',
}
const GOVERNED_TOWNS = ['nuneaton', 'bedworth', 'rugby', 'leamington-spa', 'warwick', 'kenilworth', 'stratford-upon-avon']
const HUB_CONTEXT_ONLY_AREAS = ['attleborough', 'stockingford', 'weddington', 'horeston-grange', 'camp-hill', 'bermuda-park', 'cawston', 'new-bilton']
const TOWN_SERVICE_EVIDENCE_SECTIONS = ['intro', 'local-angle', 'local-evidence', 'preparation', 'checks', 'faqs']
const SINGLE_AREA_POSTCODES = {
  cv1: 'coventry-city-centre',
  cv47: 'southam',
  b49: 'alcester',
  b80: 'studley',
  b92: 'hampton-in-arden',
}
const MULTI_AREA_POSTCODES = ['cv2', 'cv3', 'cv4', 'cv5', 'cv6', 'cv7', 'cv8', 'cv10', 'cv11', 'cv12', 'cv21', 'cv22', 'cv23', 'cv31', 'cv32', 'cv34', 'cv37']

function check(condition, message) {
  if (!condition) failures.push(message)
}

const ABSOLUTE_SAME_PRICE_PATTERN = /\b(?:same\s+price\s+(?:24\s*\/\s*7|at\b|whether\b)|(?:my|our|the)\s+(?:(?:published|advertised|listed)\s+)?(?:starting\s+)?prices?\s+(?:are|is)\s+(?:always\s+)?the\s+same|(?:the\s+)?price\s+is\s+(?:always\s+)?the\s+same|prices?\s+(?:always\s+)?(?:remain|stay)\s+the\s+same|costs?\s+the\s+same\s+as|(?:the\s+)?prices?\s+(?:listed\s+)?appl(?:y|ies)\s+24\s+hours?|prices?\s+(?:do\s+not|don't|does\s+not|doesn't)\s+change\s+(?:at\s+night|with\s+the\s+time\s+of\s+day))\b/i

function findAbsoluteSamePriceClaim(text) {
  return String(text).match(ABSOLUTE_SAME_PRICE_PATTERN)
}

for (const fixture of [
  'Same price 24/7',
  'My prices are the same 24 hours a day.',
  'My published starting prices are the same 24/7.',
  'Our advertised prices are always the same.',
  'The price is always the same.',
  'A 3am lockout costs the same as one at 3pm.',
  'The listed prices apply 24 hours a day.',
]) {
  check(Boolean(findAbsoluteSamePriceClaim(fixture)), `absolute same-price detector misses fixture: ${fixture}`)
}
check(
  !findAbsoluteSamePriceClaim('The published starting-price basis has no night surcharge; the agreed total depends on scope and parts.'),
  'absolute same-price detector rejects bounded surcharge wording',
)

function robotsDirectiveTokens(value = '') {
  return new Set(
    String(value)
      .toLowerCase()
      .split(/[,\s;:]+/)
      .map(token => token.trim())
      .filter(Boolean),
  )
}

function checkCanonicalRobots(pathname, metaValue, headerValue) {
  const meta = robotsDirectiveTokens(metaValue)
  const header = robotsDirectiveTokens(headerValue)
  check(
    meta.has('index')
      && meta.has('follow')
      && !meta.has('noindex')
      && !meta.has('nofollow')
      && !meta.has('none'),
    `${pathname} meta robots is ${metaValue || 'missing'}; expected exact index, follow directives`,
  )
  check(
    !header.has('noindex') && !header.has('nofollow') && !header.has('none'),
    `${pathname} X-Robots-Tag is ${headerValue || 'missing'}; canonical pages must not be blocked`,
  )
}

function checkUtilityRobots(pathname, metaValue, headerValue) {
  const meta = robotsDirectiveTokens(metaValue)
  const header = robotsDirectiveTokens(headerValue)
  const combined = new Set([...meta, ...header])
  check(
    meta.has('noindex')
      && meta.has('follow')
      && !meta.has('index')
      && !meta.has('nofollow')
      && !meta.has('none')
      && !meta.has('all'),
    `${pathname} meta robots is ${metaValue || 'missing'}; expected exact noindex, follow directives`,
  )
  check(
    combined.has('noindex')
      && combined.has('follow')
      && !combined.has('index')
      && !combined.has('nofollow')
      && !combined.has('none')
      && !combined.has('all'),
    `${pathname} combined robots directives conflict: meta=${metaValue || 'missing'}; X-Robots-Tag=${headerValue || 'missing'}`,
  )
}

function wildcardRobotsRules(value) {
  const rules = []
  let appliesToWildcard = false
  let groupHasDirectives = false
  let hasWildcardGroup = false

  for (const rawLine of String(value).split(/\r?\n/)) {
    const line = rawLine.replace(/#.*$/, '').trim()
    if (!line) continue
    const separator = line.indexOf(':')
    if (separator < 0) continue
    const field = line.slice(0, separator).trim().toLowerCase()
    const directive = line.slice(separator + 1).trim()

    if (field === 'user-agent') {
      if (groupHasDirectives) {
        appliesToWildcard = false
        groupHasDirectives = false
      }
      if (directive.toLowerCase() === '*') {
        appliesToWildcard = true
        hasWildcardGroup = true
      }
      continue
    }

    // Any directive closes the run of user-agent lines for this group. This
    // prevents a later bot-specific group leaking into User-agent: * merely
    // because the wildcard group used Crawl-delay or another extension first.
    groupHasDirectives = true
    if (field !== 'allow' && field !== 'disallow') continue
    if (appliesToWildcard && directive) rules.push({ type: field, pattern: directive })
  }

  return { hasWildcardGroup, rules }
}

function robotsPatternMatches(pathname, pattern) {
  const anchored = pattern.endsWith('$')
  const unanchoredPattern = anchored ? pattern.slice(0, -1) : pattern
  const escaped = unanchoredPattern
    .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
    .replace(/\*/g, '.*')
  return new RegExp(`^${escaped}${anchored ? '$' : ''}`).test(pathname)
}

function wildcardRobotsAllows(pathname, rules) {
  const matches = rules
    .filter(rule => robotsPatternMatches(pathname, rule.pattern))
    .map(rule => ({
      ...rule,
      specificity: rule.pattern.replace(/[*$]/g, '').length,
    }))
  if (matches.length === 0) return true
  const highestSpecificity = Math.max(...matches.map(rule => rule.specificity))
  return matches.some(rule => rule.specificity === highestSpecificity && rule.type === 'allow')
}

const wildcardIsolationFixture = wildcardRobotsRules([
  'User-agent: *',
  'Crawl-delay: 10',
  'User-agent: Googlebot',
  'Disallow: /private',
].join('\n'))
check(
  wildcardRobotsAllows('/private', wildcardIsolationFixture.rules),
  'robots parser leaks a bot-specific rule into the User-agent: * group',
)

function decodeHtml(value = '') {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, decimal) => String.fromCodePoint(Number(decimal)))
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&pound;/g, '£')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&nbsp;/g, ' ')
}

function getAttribute(tag, name) {
  const match = tag.match(new RegExp(`\\s${name}=["']([^"']*)["']`, 'i'))
  return match ? decodeHtml(match[1]) : null
}

function getMeta(html, attribute, value) {
  for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
    if (getAttribute(tag, attribute)?.toLowerCase() === value.toLowerCase()) {
      return getAttribute(tag, 'content')
    }
  }
  return null
}

function getCanonical(html) {
  for (const tag of html.match(/<link\b[^>]*>/gi) ?? []) {
    if (getAttribute(tag, 'rel')?.toLowerCase() === 'canonical') return getAttribute(tag, 'href')
  }
  return null
}

function getTitle(html) {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
  return match ? decodeHtml(match[1]).replace(/\s+/g, ' ').trim() : ''
}

function schemaNodes(value) {
  if (Array.isArray(value)) return value.flatMap(schemaNodes)
  if (!value || typeof value !== 'object') return []
  return [value, ...Object.values(value).flatMap(schemaNodes)]
}

function hasSchemaType(node, type) {
  const types = Array.isArray(node?.['@type']) ? node['@type'] : [node?.['@type']]
  return types.includes(type)
}

function redirectPath(response) {
  const location = response.headers.get('location')
  return location ? new URL(location, BASE_URL).pathname : null
}

function visibleText(html) {
  return decodeHtml(
    html
      .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' '),
  ).replace(/\s+/g, ' ').trim()
}

function markedVisibleTexts(html, attribute) {
  const pattern = new RegExp(
    `<([a-z][\\w:-]*)\\b(?=[^>]*\\b${attribute}=["']true["'])[^>]*>([\\s\\S]*?)<\\/\\1>`,
    'gi',
  )
  return Array.from(html.matchAll(pattern), match => visibleText(match[2]))
}

function mainContent(html) {
  return html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? ''
}

function headingOutline(html) {
  const headings = []
  for (const match of html.matchAll(/<h([1-6])\b([^>]*)>([\s\S]*?)<\/h\1>/gi)) {
    if (/\baria-hidden=["']true["']/i.test(match[2])) continue
    headings.push({
      level: Number(match[1]),
      text: visibleText(match[3]),
    })
  }
  return headings
}

function firstHeadingLevelSkip(headings) {
  for (let index = 1; index < headings.length; index += 1) {
    if (headings[index].level > headings[index - 1].level + 1) {
      return { previous: headings[index - 1], current: headings[index] }
    }
  }
  return null
}

function evidenceBlock(html, tagName, section) {
  return html.match(new RegExp(
    `<${tagName}\\b(?=[^>]*data-evidence-section=["']${section}["'])[^>]*>[\\s\\S]*?<\\/${tagName}>`,
    'i',
  ))?.[0] ?? ''
}

function checkEvidenceBlockContract(block, label) {
  const openingTag = block.match(/^<[^>]+>/)?.[0] ?? ''
  const declaredIds = (getAttribute(openingTag, 'data-evidence-source-ids') ?? '')
    .split(/\s+/)
    .filter(Boolean)
  const linkedIds = Array.from(
    block.matchAll(/<a\b(?![^>]*data-faq-source-link=["']true["'])[^>]*href=["']#evidence-source-([a-z0-9-]+)["'][^>]*>/gi),
    match => match[1],
  )

  check(declaredIds.length > 0, `${label} declares no evidence source IDs`)
  check(new Set(declaredIds).size === declaredIds.length, `${label} repeats a declared evidence source ID`)
  check(new Set(linkedIds).size === linkedIds.length, `${label} repeats a section evidence link`)
  check(
    linkedIds.length === declaredIds.length
      && linkedIds.every(sourceId => declaredIds.includes(sourceId)),
    `${label} links ${linkedIds.join(', ') || 'none'}; declared ${declaredIds.join(', ') || 'none'}`,
  )
}

function operationalClaimText(html) {
  // Reviews describe completed historical jobs; they are evidence, not a promise
  // that the same timing, stock or outcome will apply to a future attendance.
  return visibleText(
    html
      .replace(/<blockquote\b[\s\S]*?<\/blockquote>/gi, ' ')
      .replace(/<q\b[\s\S]*?<\/q>/gi, ' '),
  )
}

const OPERATIONAL_CLAIM_RULES = [
  {
    label: 'unsupported job-frequency claim',
    conditional: false,
    patterns: [
      /\b(?:i|we)\s+(?:regularly|daily|weekly)\s+(?:get\s+called|attend|handle|repair|replace|fit|service|see|encounter|change|extract|do|work\s+on)\b[^.!?]{0,120}/gi,
      /\b(?:i|we)\s+(?:(?:am|are)\s+)?(?:get\s+called|called|attend|handle|repair|replace|fit|service|see|encounter|change|extract|work\s+on)\b[^.!?]{0,120}\b(?:every\s+(?:day|week|month)|daily|weekly|year\s+after\s+year|on\s+a\s+(?:daily|weekly)\s+basis)\b/gi,
      /\b(?:someone|a\s+locksmith|ross)\s+who\s+(?:regularly\s+)?(?:works?\s+on|handles?|repairs?|replaces?|fits?|services?)\b[^.!?]{0,120}\b(?:every\s+(?:day|week|month)|daily|weekly)\b/gi,
      /\b(?:one\s+of\s+)?(?:my|our)\s+most\s+(?:common|frequent)\s+(?:calls?|jobs?|callouts?|repairs?|replacements?|services?)\b/gi,
      /\b(?:the\s+)?most\s+(?:common|frequent)\s+(?:calls?|jobs?|callouts?|faults?|problems?|failures?|issues?)\b[^.!?]{0,100}\b(?:i|we)\s+(?:(?:am|are)\s+)?(?:called|asked|attend|handle|repair|replace|fit|service|see|encounter)\b/gi,
      /\b(?:i|we)\s+(?:(?:am|are)\s+)?(?:called|asked|attend|handle|repair|replace|fit|service|see|encounter)\b[^.!?]{0,100}\b(?:the\s+)?most\s+(?:common|frequent)\s+(?:calls?|jobs?|callouts?|faults?|problems?|failures?|issues?)\b/gi,
    ],
  },
  {
    label: 'unsupported personal-volume or client-history claim',
    conditional: false,
    patterns: [
      /\b(?:i(?:'|’)ve|i\s+have)\b[^.!?]{0,100}\b(?:fitted|repaired|replaced|attended|handled|completed|done)\b[^.!?]{0,60}\b(?:hundreds|thousands)\s+of\b/gi,
      /\bbased\s+on\s+(?:my\s+)?(?:hundreds|thousands)\s+of\s+(?:jobs?|calls?|callouts?|repairs?|replacements?)\b/gi,
      /\bi\s+(?:work|have\s+worked)\s+with\s+(?:many|several|dozens|hundreds)\b/gi,
      /\bi\s+have\s+attended\s+(?:many|multiple|dozens|hundreds)\s+(?:jobs?|calls?|callouts?)\b/gi,
      /\bi\s+(?:typically|usually|often)\s+see\b[^.!?]{0,100}\b\d{1,3}\s*(?:-|–|—|to)\s*\d{1,3}\s+years?\b/gi,
    ],
  },
  {
    label: 'unsupported full-stock claim',
    conditional: false,
    patterns: [
      /\b(?:carry|stock|keep|hold)\b[^.!?]{0,100}\b(?:a|the)\s+full\s+(?:range|stock)\s+of\s+(?:brands|sizes|locks|cylinders|mechanisms|gearboxes|parts|products)\b/gi,
      /\b(?:carry|stock|keep|hold)\b[^.!?]{0,100}\b(?:stock\s+of\s+)?all\s+(?:the\s+)?(?:(?:main|major|common|standard|small)\s+)?(?:brands|sizes|locks|cylinders|mechanisms|gearboxes|parts|products)\b/gi,
      /\b(?:van|vehicle|inventory)\b[^.!?]{0,100}\b(?:has|holds|includes|contains|carries)\b[^.!?]{0,80}\b(?:a\s+full\s+(?:range|stock)|all\s+(?:the\s+)?(?:main|major|common|standard|small)\s+(?:brands|sizes|locks|cylinders|mechanisms|gearboxes|parts|products))\b/gi,
    ],
  },
  {
    label: 'unconditional fixed completion or sourcing claim',
    conditional: true,
    patterns: [
      /(?:\b(?:i|we)\s+(?:can|will|usually|typically|normally)|\b(?:i|we)(?:'|’)ll)\s+(?:(?:usually|typically|normally)\s+)?(?:complete|finish|fit|repair|replace|source|supply|obtain|secure|accommodate|resolve|fix|do)\b[^.!?]{0,120}\b(?:same[- ]day|the\s+same\s+day|next[- ]day|the\s+next\s+day|in\s+(?:a\s+)?(?:single|one)\s+visit|on\s+the\s+spot|within\s+(?:an?|one|\d{1,3})\s*(?:-|–|—|to)?\s*\d{0,3}\s*(?:hours?|days?))\b/gi,
      /\b(?:i|we)\s+(?:complete|finish|fit|repair|replace|source|supply|obtain|secure|accommodate|resolve|fix|do)\b[^.!?]{0,120}\b(?:same[- ]day|the\s+same\s+day|next[- ]day|the\s+next\s+day|in\s+(?:a\s+)?(?:single|one)\s+visit|on\s+the\s+spot|within\s+(?:an?|one|\d{1,3})\s*(?:-|–|—|to)?\s*\d{0,3}\s*(?:hours?|days?))\b/gi,
      /\b(?:most|all)\s+(?:jobs?|repairs?|replacements?|callouts?|problems?|faults?|requests?)\s+(?:(?:can|will)\s+be|are\s+(?:(?:usually|typically|normally)\s+)?)(?:completed|finished|handled|resolved|fixed|accommodated)\b[^.!?]{0,80}\b(?:same[- ]day|the\s+same\s+day|next[- ]day|the\s+next\s+day|in\s+(?:a\s+)?(?:single|one)\s+visit|on\s+the\s+spot|within\s+(?:an?|one|\d{1,3})\s*(?:-|–|—|to)?\s*\d{0,3}\s*(?:hours?|days?))\b/gi,
      /\b(?:same[- ]day|next[- ]day)\s+(?:completion|repair|replacement|fitting|fit|boarding|sourcing|supply|service|appointment|availability)\b/gi,
      /\b(?:parts?|products?|locks?|cylinders?|mechanisms?|materials?)\s+(?:(?:can|will)\s+be|are\s+(?:(?:usually|typically|normally)\s+)?)(?:sourced|supplied|obtained)\b[^.!?]{0,80}\bwithin\s+(?:an?|one|\d{1,3})\s*(?:-|–|—|to)?\s*\d{0,3}\s*(?:hours?|days?)\b/gi,
    ],
  },
]

function claimContext(text, index, length) {
  const before = text.slice(0, index)
  const start = Math.max(before.lastIndexOf('.'), before.lastIndexOf('!'), before.lastIndexOf('?')) + 1
  const tail = text.slice(index + length)
  const offsets = [tail.indexOf('.'), tail.indexOf('!'), tail.indexOf('?')].filter(offset => offset >= 0)
  const end = offsets.length > 0 ? index + length + Math.min(...offsets) + 1 : text.length
  return text.slice(start, end).trim()
}

function isExplicitlyNegated(context) {
  return /\b(?:not|never)\s+(?:guaranteed|promised)\b/i.test(context)
    || /\b(?:cannot|can't|do\s+not|don't|will\s+not|won't|never)\s+(?:promise|guarantee)\b/i.test(context)
    || /\bwithout\s+(?:a\s+)?(?:fixed\s+)?(?:completion|sourcing|stock|same[- ]day)\s+(?:promise|guarantee)\b/i.test(context)
}

function isExplicitlyConditional(context) {
  return /\b(?:depends?|depending)\s+on\b/i.test(context)
    || /\bsubject\s+to\b/i.test(context)
    || /\b(?:may|might|could)\s+(?:be\s+)?(?:possible|require|need|depend)\b/i.test(context)
    || /\b(?:if|when|where|provided)\b[^.!?]{0,100}\b(?:available|availability|compatible|suitable|supported|diagnosis|inspection|assessment|in\s+stock)\b/i.test(context)
    || /\b(?:check|confirm|agree|determine|quote)\b[^.!?]{0,80}\b(?:availability|lead\s+time|number\s+of\s+visits?|completion\s+date|fitting\s+date|appointment)\b/i.test(context)
    || /\b(?:availability|lead\s+time|number\s+of\s+visits?|completion\s+date|fitting\s+date|appointment)\b[^.!?]{0,60}\b(?:checked|confirmed|agreed|determined|quoted|required)\b/i.test(context)
    || /\bbefore\s+(?:promising|confirming|committing\s+to)\b/i.test(context)
}

function findUnsupportedOperationalClaim(text) {
  for (const rule of OPERATIONAL_CLAIM_RULES) {
    for (const pattern of rule.patterns) {
      for (const match of text.matchAll(pattern)) {
        const context = claimContext(text, match.index ?? 0, match[0].length)
        if (isExplicitlyNegated(context)) continue
        if (rule.conditional && isExplicitlyConditional(context)) continue
        return { label: rule.label, match: match[0] }
      }
    }
  }
  return null
}

function internalPaths(html) {
  const paths = new Set()
  for (const tag of html.match(/<a\b[^>]*>/gi) ?? []) {
    const href = getAttribute(tag, 'href')
    if (!href || /^(?:#|tel:|mailto:|javascript:)/i.test(href)) continue
    let url
    try {
      url = new URL(href, CANONICAL_ORIGIN)
    } catch {
      continue
    }
    if (url.origin !== CANONICAL_ORIGIN || url.pathname.startsWith('/_next/')) continue
    paths.add(url.pathname.replace(/\/$/, '') || '/')
  }
  return paths
}

function internalHrefs(html) {
  const hrefs = new Set()
  for (const tag of html.match(/<a\b[^>]*>/gi) ?? []) {
    const href = getAttribute(tag, 'href')
    if (!href || /^(?:tel:|mailto:|javascript:)/i.test(href)) continue
    if (href.startsWith('#')) {
      hrefs.add(href)
      continue
    }
    let url
    try {
      url = new URL(href, CANONICAL_ORIGIN)
    } catch {
      continue
    }
    if (url.origin !== CANONICAL_ORIGIN || url.pathname.startsWith('/_next/')) continue
    hrefs.add(`${url.pathname.replace(/\/$/, '') || '/'}${url.hash}`)
  }
  return hrefs
}

async function mapLimit(items, limit, task) {
  const results = new Array(items.length)
  let cursor = 0
  async function worker() {
    while (cursor < items.length) {
      const index = cursor++
      results[index] = await task(items[index], index)
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker))
  return results
}

async function fetchLocal(pathname) {
  const response = await fetch(new URL(pathname, BASE_URL), { redirect: 'manual' })
  return { response, html: await response.text() }
}

async function checkOneHopPermanentRedirect(pathname, expectedPath) {
  const { response } = await fetchLocal(pathname)
  const actualPath = redirectPath(response)
  check(response.status === 308, `${pathname} returned ${response.status}; expected permanent 308`)
  check(actualPath === expectedPath, `${pathname} redirects to ${actualPath || 'nowhere'}; expected ${expectedPath}`)

  const { response: finalResponse, html: finalHtml } = await fetchLocal(expectedPath)
  check(finalResponse.status === 200, `${pathname} final target ${expectedPath} returned ${finalResponse.status}; expected 200`)
  check(!finalResponse.headers.get('location'), `${pathname} final target ${expectedPath} redirects again to ${finalResponse.headers.get('location')}`)
  check(
    getCanonical(finalHtml) === `${CANONICAL_ORIGIN}${expectedPath}`,
    `${pathname} final target ${expectedPath} does not self-canonicalise`,
  )
}

async function waitForServer() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(new URL('/robots.txt', BASE_URL))
      if (response.ok) return true
    } catch {
      // Production server is still starting.
    }
    await new Promise(resolve => setTimeout(resolve, 250))
  }
  return false
}

let ownedServer = null

try {
  if (!(await waitForServer())) {
    const base = new URL(BASE_URL)
    if (!['127.0.0.1', 'localhost'].includes(base.hostname)) {
      throw new Error(`SEO_BASE_URL is unreachable: ${BASE_URL}`)
    }
    ownedServer = spawn(
      process.execPath,
      ['node_modules/next/dist/bin/next', 'start', '--hostname', base.hostname, '--port', base.port || '3000'],
      { stdio: 'ignore', windowsHide: true }
    )
    if (!(await waitForServer())) throw new Error('Timed out waiting for next start')
  }

  const sitemapResult = await fetchLocal('/sitemap.xml')
  check(sitemapResult.response.status === 200, `sitemap.xml returned ${sitemapResult.response.status}`)
  const sitemapUrls = Array.from(
    sitemapResult.html.matchAll(/<loc>([\s\S]*?)<\/loc>/g),
    match => decodeHtml(match[1].trim())
  )

  check(sitemapUrls.length === EXPECTED_SITEMAP_URLS, `sitemap has ${sitemapUrls.length} URLs; expected ${EXPECTED_SITEMAP_URLS}`)
  check(new Set(sitemapUrls).size === sitemapUrls.length, 'sitemap contains duplicate URLs')

  for (const loc of sitemapUrls) {
    const url = new URL(loc)
    check(url.origin === CANONICAL_ORIGIN, `sitemap URL uses the wrong origin: ${loc}`)
  }

  const robotsResult = await fetchLocal('/robots.txt')
  check(robotsResult.response.status === 200, `robots.txt returned ${robotsResult.response.status}`)
  check(robotsResult.html.includes(`Sitemap: ${CANONICAL_ORIGIN}/sitemap.xml`), 'robots.txt does not declare the canonical sitemap URL')
  const wildcardRobots = wildcardRobotsRules(robotsResult.html)
  check(wildcardRobots.hasWildcardGroup, 'robots.txt has no User-agent: * group')
  for (const loc of sitemapUrls) {
    const pathname = new URL(loc).pathname
    check(wildcardRobotsAllows(pathname, wildcardRobots.rules), `robots.txt blocks sitemap URL ${pathname} for User-agent: *`)
  }

  const pages = await mapLimit(sitemapUrls, 12, async loc => {
    const productionUrl = new URL(loc)
    const { response, html } = await fetchLocal(productionUrl.pathname)
    const title = getTitle(html)
    const description = getMeta(html, 'name', 'description') ?? ''
    const robots = getMeta(html, 'name', 'robots') ?? ''
    const canonical = getCanonical(html)
    const h1Count = (html.match(/<h1\b/gi) ?? []).length
    const ogImage = getMeta(html, 'property', 'og:image')
    const ogDescription = getMeta(html, 'property', 'og:description')
    const pageText = visibleText(html)
    const mainHtml = mainContent(html)
    const mainText = visibleText(mainHtml)
    const mainHeadings = headingOutline(mainHtml)
    const primaryHeading = mainHeadings.find(heading => heading.level === 1)?.text ?? ''
    const headingLevelSkip = firstHeadingLevelSkip(mainHeadings)
    const mainHrefs = internalHrefs(mainHtml)
    const claimText = operationalClaimText(html)
    const evidenceReferences = Array.from(
      mainHtml.matchAll(/href=["']#(evidence-source-[a-z0-9-]+)["']/gi),
      match => match[1],
    )
    const evidenceTargets = Array.from(
      mainHtml.matchAll(/id=["'](evidence-source-[a-z0-9-]+)["']/gi),
      match => match[1],
    )

    check(response.status === 200, `${productionUrl.pathname} returned ${response.status}`)
    check(!response.headers.get('location'), `${productionUrl.pathname} redirects to ${response.headers.get('location')}`)
    check(canonical === loc, `${productionUrl.pathname} canonical is ${canonical || 'missing'}; expected ${loc}`)
    check(title.length > 0, `${productionUrl.pathname} has no title`)
    check(title.length <= 60, `${productionUrl.pathname} title is ${title.length} characters: ${title}`)
    check((title.match(/Local Emergency Locksmith/g) ?? []).length <= 1, `${productionUrl.pathname} repeats the brand in its title`)
    check(description.length > 0, `${productionUrl.pathname} has no meta description`)
    check(description.length <= 160, `${productionUrl.pathname} description is ${description.length} characters`)
    checkCanonicalRobots(productionUrl.pathname, robots, response.headers.get('x-robots-tag') ?? '')
    check(h1Count === 1, `${productionUrl.pathname} has ${h1Count} H1 elements`)
    check(
      !headingLevelSkip,
      `${productionUrl.pathname} main heading order jumps from H${headingLevelSkip?.previous.level ?? '?'} to H${headingLevelSkip?.current.level ?? '?'} at ${JSON.stringify(headingLevelSkip?.current.text || 'unnamed heading')}`,
    )
    check(Boolean(ogImage), `${productionUrl.pathname} has no og:image`)
    check(mainHtml.length > 0, `${productionUrl.pathname} has no main content landmark`)
    check(!html.includes('https://localemergencylocksmith.co.uk'), `${productionUrl.pathname} contains the redirecting apex origin`)
    check(!html.includes(UNVERIFIED_PROFILE_URL), `${productionUrl.pathname} exposes the unverified differently named Google profile`)

    for (const intent of CORE_SEARCH_INTENT_CONTRACTS[productionUrl.pathname] ?? []) {
      check(
        intent.pattern.test(mainText),
        `${productionUrl.pathname} does not visibly express measured ${intent.label} intent`,
      )
    }

    const priceOwnerSignal = `${title}\n${primaryHeading}`.match(PRICE_OWNER_TITLE_H1_PATTERN)
    if (productionUrl.pathname === PRICE_OWNER_PATH) {
      check(Boolean(priceOwnerSignal), `${PRICE_OWNER_PATH} title/H1 does not own broad locksmith cost-and-price intent`)
      check(PRICE_OWNER_EXACT_QUESTION_PATTERN.test(mainText), `${PRICE_OWNER_PATH} is missing its emergency locksmith cost question`)
    } else {
      check(
        !priceOwnerSignal,
        `${productionUrl.pathname} competes with ${PRICE_OWNER_PATH} in its title/H1: ${JSON.stringify(priceOwnerSignal?.[0])}`,
      )
      check(
        !PRICE_OWNER_EXACT_QUESTION_PATTERN.test(mainText),
        `${productionUrl.pathname} repeats ${PRICE_OWNER_PATH}'s emergency locksmith cost question`,
      )
    }

    if (productionUrl.pathname === '/faq') {
      check(/\bid=["']pricing["']/i.test(mainHtml), '/faq is missing its #pricing fragment target')
      check(/\bid=["']services["']/i.test(mainHtml), '/faq is missing its #services fragment target')
    }

    const futureArrivalPromise = pageText.match(/\b(?:i|we)\s+(?:can|will|aim\s+to|typically|usually|normally)[^.!?]{0,80}\b(?:arrive|reach|be\s+with\s+you)[^.!?]{0,40}\b\d{1,3}\s*(?:-|–|—|to)?\s*\d{0,3}\s*minutes?\b/i)
      ?? pageText.match(/\b\d{1,3}\s*(?:-|–|—|to)\s*\d{1,3}[- ]minute\s+(?:response|arrival)\b/i)
    check(!futureArrivalPromise, `${productionUrl.pathname} contains a fixed future arrival promise: ${JSON.stringify(futureArrivalPromise?.[0])}`)

    const operationalClaim = findUnsupportedOperationalClaim(claimText)
    check(!operationalClaim, `${productionUrl.pathname} contains an ${operationalClaim?.label}: ${JSON.stringify(operationalClaim?.match)}`)
    const unsupportedPersonalVolume = pageText.match(/\b(?:called|attended|handled)\b[^.!?]{0,100}\bmore times than (?:i|we) can count\b/i)
    check(!unsupportedPersonalVolume, `${productionUrl.pathname} contains an unverified personal-volume anecdote: ${JSON.stringify(unsupportedPersonalVolume?.[0])}`)
    const unsupportedEaseOfEntry = pageText.match(/\bnotoriously easy to (?:break|force|get) into\b/i)
    check(!unsupportedEaseOfEntry, `${productionUrl.pathname} contains an unsupported ease-of-entry claim: ${JSON.stringify(unsupportedEaseOfEntry?.[0])}`)

    if (/^\/areas\/[^/]+$/.test(productionUrl.pathname)) {
      const areaSlug = productionUrl.pathname.split('/')[2]
      check(/\blocksmith\b/i.test(description), `${productionUrl.pathname} meta description does not express locksmith intent`)
      check(ogDescription === description, `${productionUrl.pathname} Open Graph description does not match its governed meta description`)
      check(!description.includes("Call for today's ETA"), `${productionUrl.pathname} still uses the retired boilerplate area description`)
      check(html.includes('id="local-evidence-heading"'), `${productionUrl.pathname} is missing verified local evidence`)
      check(html.includes('id="service-guidance-heading"'), `${productionUrl.pathname} is missing service-by-service guidance`)
      check(html.includes('id="source-heading"'), `${productionUrl.pathname} is missing its evidence source register`)
      const localFactBlocks = Array.from(
        mainHtml.matchAll(/<article\b(?=[^>]*data-evidence-section=["']local-fact-(\d+)["'])[^>]*>[\s\S]*?<\/article>/gi),
        match => ({ index: match[1], block: match[0] }),
      )
      check(localFactBlocks.length >= 2, `${productionUrl.pathname} renders fewer than two source-linked local facts`)
      check(
        new Set(localFactBlocks.map(fact => fact.index)).size === localFactBlocks.length,
        `${productionUrl.pathname} repeats a local-fact evidence marker`,
      )
      const localFactTargets = new Set(localFactBlocks.map(fact => `local-fact-${fact.index}`))
      for (const fact of localFactBlocks) {
        check(
          new RegExp(`\\bid=["']local-fact-${fact.index}["']`, 'i').test(fact.block),
          `${productionUrl.pathname} local fact ${fact.index} has no link target`,
        )
        checkEvidenceBlockContract(fact.block, `${productionUrl.pathname} local fact ${fact.index}`)
      }
      const hasDedicatedOwnerPages = GOVERNED_TOWNS.includes(areaSlug)
      const sourceRegisterScope = mainHtml.match(/<section\b[^>]*\bdata-source-register-scope=["']([^"']+)["'][^>]*>/i)?.[1] ?? ''
      const renderedSourceKinds = Array.from(
        mainHtml.matchAll(/<li\b[^>]*\bdata-source-kind=["']([^"']+)["'][^>]*>/gi),
        match => match[1],
      )
      check(!pageText.includes('Common Lock Problems in'), `${productionUrl.pathname} still renders the unsupported legacy common-problems block`)
      if (hasDedicatedOwnerPages) {
        check(sourceRegisterScope === 'locality-only', `${productionUrl.pathname} source register scope is ${sourceRegisterScope || 'missing'}; expected locality-only`)
        check(!renderedSourceKinds.includes('technical'), `${productionUrl.pathname} locality-only source register still renders a technical source`)
        check(pageText.includes('links to the primary locality sources used'), `${productionUrl.pathname} does not disclose its locality-only review sources`)
        check(
          pageText.includes('Technical sources stay on each dedicated service guide'),
          `${productionUrl.pathname} does not explain where its technical service evidence is published`,
        )
        check(
          !pageText.includes('links to the primary locality and technical sources used'),
          `${productionUrl.pathname} incorrectly claims its parent source register includes technical sources`,
        )
        check(
          html.includes('data-dedicated-service-owner-links="true"'),
          `${productionUrl.pathname} is missing its dedicated service-owner directory`,
        )
        const ownerCards = Array.from(
          mainHtml.matchAll(/<article\b(?=[^>]*data-dedicated-service-owner=["']([^"']+)["'])[^>]*>[\s\S]*?<\/article>/gi),
          match => ({ serviceSlug: match[1], block: match[0] }),
        )
        check(ownerCards.length === SERVICE_SLUGS.length, `${productionUrl.pathname} renders ${ownerCards.length} dedicated owner cards; expected ${SERVICE_SLUGS.length}`)
        check(new Set(ownerCards.map(card => card.serviceSlug)).size === SERVICE_SLUGS.length, `${productionUrl.pathname} repeats a dedicated service-owner card`)
        for (const serviceSlug of SERVICE_SLUGS) {
          const ownerHref = `/areas/${areaSlug}/${serviceSlug}`
          const ownerCard = ownerCards.find(card => card.serviceSlug === serviceSlug)
          check(Boolean(ownerCard), `${productionUrl.pathname} is missing its ${serviceSlug} owner card`)
          check(mainHrefs.has(ownerHref), `${productionUrl.pathname} does not link directly to ${ownerHref}`)
          check(!html.includes(`id="${serviceSlug}"`), `${productionUrl.pathname} retains duplicate #${serviceSlug} guidance beside its dedicated owner`)
          check(!html.includes(`data-evidence-section="${serviceSlug}"`), `${productionUrl.pathname} retains duplicate ${serviceSlug} evidence beside its dedicated owner`)
          if (ownerCard) {
            check(internalHrefs(ownerCard.block).has(ownerHref), `${productionUrl.pathname} ${serviceSlug} owner card does not link to ${ownerHref}`)
            check(visibleText(ownerCard.block).includes('Guide preview:'), `${productionUrl.pathname} ${serviceSlug} owner card is missing its guide-preview label`)
            check(!visibleText(ownerCard.block).includes('First useful check:'), `${productionUrl.pathname} ${serviceSlug} owner card presents preview copy as sourced parent guidance`)
            const summaryBlock = ownerCard.block.match(/<p\b(?=[^>]*data-owner-summary=["']true["'])[^>]*>[\s\S]*?<\/p>/i)?.[0] ?? ''
            const previewBlock = ownerCard.block.match(/<p\b(?=[^>]*data-owner-first-check=["']true["'])[^>]*>[\s\S]*?<\/p>/i)?.[0] ?? ''
            check(visibleText(summaryBlock).split(/\s+/).filter(Boolean).length >= 8, `${productionUrl.pathname} ${serviceSlug} owner card has no substantive visible summary`)
            check(visibleText(previewBlock).split(/\s+/).filter(Boolean).length >= 5, `${productionUrl.pathname} ${serviceSlug} owner card has no substantive visible guide preview`)
            check(visibleText(ownerCard.block).includes('Read the complete'), `${productionUrl.pathname} ${serviceSlug} owner card has no visible owner-link cue`)
            check(!/data-service-faq|data-selected-local-fact-links|data-evidence-source-ids/i.test(ownerCard.block), `${productionUrl.pathname} ${serviceSlug} owner card embeds duplicate full guidance or evidence`)
            const ownerHeadings = headingOutline(ownerCard.block)
            check(ownerHeadings.length === 1 && ownerHeadings[0].level === 3, `${productionUrl.pathname} ${serviceSlug} owner card has an invalid heading structure`)
            check(ownerHeadings[0]?.text === SERVICE_SHORT_NAMES[serviceSlug], `${productionUrl.pathname} ${serviceSlug} owner-card heading is ${JSON.stringify(ownerHeadings[0]?.text)}; expected ${JSON.stringify(SERVICE_SHORT_NAMES[serviceSlug])}`)
          }
        }
      } else {
        const expectsPairLinkedLocalFacts = !HUB_CONTEXT_ONLY_AREAS.includes(areaSlug)
        check(sourceRegisterScope === 'locality-and-technical', `${productionUrl.pathname} source register scope is ${sourceRegisterScope || 'missing'}; expected locality-and-technical`)
        check(renderedSourceKinds.includes('technical'), `${productionUrl.pathname} combined source register renders no technical source`)
        check(
          pageText.includes('Locality facts and technical advice are kept separate'),
          `${productionUrl.pathname} does not explain its combined locality and technical source register`,
        )
        check(!html.includes('data-dedicated-service-owner-links="true"'), `${productionUrl.pathname} renders a dedicated-owner directory without dedicated pages`)
        for (const serviceSlug of SERVICE_SLUGS) {
          check(html.includes(`id="${serviceSlug}"`), `${productionUrl.pathname} is missing ${serviceSlug} guidance`)
          check(mainHrefs.has(`#${serviceSlug}`), `${productionUrl.pathname} has no visible jump link to #${serviceSlug}`)
          const block = evidenceBlock(mainHtml, 'article', serviceSlug)
          check(Boolean(block), `${productionUrl.pathname} is missing the ${serviceSlug} evidence section marker`)
          if (block) {
            checkEvidenceBlockContract(block, `${productionUrl.pathname} ${serviceSlug} guidance`)
            const selectedLocalFactBlock = block.match(
              /<p\b(?=[^>]*data-selected-local-fact-links=["']true["'])[^>]*>[\s\S]*?<\/p>/i,
            )?.[0] ?? ''
            const localFactLinks = Array.from(
              selectedLocalFactBlock.matchAll(/href=["']#(local-fact-\d+)["']/gi),
              match => match[1],
            )
            const openingTag = block.match(/^<article\b[^>]*>/i)?.[0] ?? ''
            const declaredLocalFactIndexes = (getAttribute(openingTag, 'data-local-fact-indexes') ?? '')
              .trim()
              .split(/\s+/)
              .filter(Boolean)
            const declaredLocalFactLinks = declaredLocalFactIndexes.map(index => `local-fact-${index}`)
            if (expectsPairLinkedLocalFacts) {
              check(declaredLocalFactIndexes.length > 0, `${productionUrl.pathname} ${serviceSlug} guidance declares no selected local facts`)
              check(Boolean(selectedLocalFactBlock), `${productionUrl.pathname} ${serviceSlug} guidance renders no selected-local-facts block`)
            } else {
              check(declaredLocalFactIndexes.length === 0, `${productionUrl.pathname} ${serviceSlug} declares local facts despite hub-context-only evidence mode`)
              check(!selectedLocalFactBlock, `${productionUrl.pathname} ${serviceSlug} renders selected local facts despite hub-context-only evidence mode`)
            }
            check(
              declaredLocalFactIndexes.every(index => /^[1-9]\d*$/.test(index)),
              `${productionUrl.pathname} ${serviceSlug} guidance has an invalid selected local fact declaration`,
            )
            check(
              localFactLinks.join(' ') === declaredLocalFactLinks.join(' '),
              `${productionUrl.pathname} ${serviceSlug} rendered local fact links do not match its declared selections`,
            )
            if (expectsPairLinkedLocalFacts) {
              check(localFactLinks.length > 0, `${productionUrl.pathname} ${serviceSlug} guidance links no selected local fact`)
            } else {
              check(localFactLinks.length === 0, `${productionUrl.pathname} ${serviceSlug} links local facts despite hub-context-only evidence mode`)
            }
            check(new Set(localFactLinks).size === localFactLinks.length, `${productionUrl.pathname} ${serviceSlug} guidance repeats a selected local fact link`)
            for (const localFactLink of localFactLinks) {
              check(localFactTargets.has(localFactLink), `${productionUrl.pathname} ${serviceSlug} guidance links missing #${localFactLink}`)
            }
            const serviceFaqBlocks = Array.from(
              block.matchAll(/<div\b(?=[^>]*data-service-faq=["']true["'])[^>]*>[\s\S]*?<\/div>/gi),
              match => match[0],
            )
            check(serviceFaqBlocks.length === 1, `${productionUrl.pathname} ${serviceSlug} guidance renders ${serviceFaqBlocks.length} service FAQ blocks; expected one`)
            const serviceFaqBlock = serviceFaqBlocks[0] ?? ''
            const serviceFaqHeadings = headingOutline(serviceFaqBlock)
            check(serviceFaqHeadings.length === 1 && serviceFaqHeadings[0].level === 4, `${productionUrl.pathname} ${serviceSlug} service FAQ has an invalid heading structure`)
            check(visibleText(serviceFaqBlock).split(/\s+/).filter(Boolean).length >= 24, `${productionUrl.pathname} ${serviceSlug} service FAQ is too short`)
            check(!/data-faq-(?:local-fact|evidence|source)/i.test(serviceFaqBlock), `${productionUrl.pathname} ${serviceSlug} service FAQ still manufactures a local-evidence suffix`)
            const expectedDetailsHref = `/services/${serviceSlug}`
            check(
              internalHrefs(block).has(expectedDetailsHref),
              `${productionUrl.pathname} ${serviceSlug} guidance does not link to ${expectedDetailsHref}`,
            )
          }
        }
      }
    }

    if (/^\/areas\/[^/]+\/[^/]+$/.test(productionUrl.pathname)) {
      const renderedSections = Array.from(
        mainHtml.matchAll(/data-evidence-section=["']([^"']+)["']/gi),
        match => match[1],
      )
      check(
        renderedSections.length === TOWN_SERVICE_EVIDENCE_SECTIONS.length
          && new Set(renderedSections).size === TOWN_SERVICE_EVIDENCE_SECTIONS.length,
        `${productionUrl.pathname} renders evidence sections ${renderedSections.join(', ') || 'none'}; expected six unique sections`,
      )
      for (const section of TOWN_SERVICE_EVIDENCE_SECTIONS) {
        const block = evidenceBlock(mainHtml, 'details', section)
        check(Boolean(block), `${productionUrl.pathname} is missing evidence section ${section}`)
        if (block) checkEvidenceBlockContract(block, `${productionUrl.pathname} evidence section ${section}`)
      }
    }

    if (/^\/areas\/[^/]+(?:\/[^/]+)?$/.test(productionUrl.pathname)) {
      const targetCounts = new Map()
      for (const target of evidenceTargets) targetCounts.set(target, (targetCounts.get(target) ?? 0) + 1)
      check(evidenceReferences.length > 0, `${productionUrl.pathname} has no section-to-source evidence links`)
      check(evidenceTargets.length > 0, `${productionUrl.pathname} has no evidence bibliography targets`)
      for (const reference of new Set(evidenceReferences)) {
        check(targetCounts.get(reference) === 1, `${productionUrl.pathname} evidence link #${reference} has ${targetCounts.get(reference) ?? 0} targets; expected 1`)
      }
      for (const target of new Set(evidenceTargets)) {
        check(targetCounts.get(target) === 1, `${productionUrl.pathname} repeats evidence target ${target}`)
        check(evidenceReferences.includes(target), `${productionUrl.pathname} bibliography target ${target} is never cited by a section`)
      }
    }

    const parsedSchemaNodes = []
    for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
      try {
        parsedSchemaNodes.push(...schemaNodes(JSON.parse(match[1])))
      } catch (error) {
        failures.push(`${productionUrl.pathname} has invalid JSON-LD: ${error.message}`)
      }
    }

    const visibleFaqQuestions = markedVisibleTexts(mainHtml, 'data-faq-question')
    const visibleFaqAnswers = markedVisibleTexts(mainHtml, 'data-faq-answer')
    const faqPageNodes = parsedSchemaNodes.filter(node => hasSchemaType(node, 'FAQPage'))
    if (visibleFaqQuestions.length > 0 || visibleFaqAnswers.length > 0 || faqPageNodes.length > 0) {
      check(
        visibleFaqQuestions.length === visibleFaqAnswers.length,
        `${productionUrl.pathname} renders ${visibleFaqQuestions.length} marked FAQ questions and ${visibleFaqAnswers.length} marked answers`,
      )
      check(
        visibleFaqQuestions.length > 0 && visibleFaqQuestions.every(Boolean) && visibleFaqAnswers.every(Boolean),
        `${productionUrl.pathname} has FAQPage data without complete, non-empty visible FAQ markers`,
      )
      check(faqPageNodes.length === 1, `${productionUrl.pathname} has ${faqPageNodes.length} FAQPage nodes for ${visibleFaqQuestions.length} visible FAQs`)
      const schemaFaqPairs = Array.isArray(faqPageNodes[0]?.mainEntity)
        ? faqPageNodes[0].mainEntity.map(item => ({
            q: String(item?.name ?? '').replace(/\s+/g, ' ').trim(),
            a: String(item?.acceptedAnswer?.text ?? '').replace(/\s+/g, ' ').trim(),
          }))
        : []
      const visibleFaqPairs = visibleFaqQuestions.map((q, index) => ({ q, a: visibleFaqAnswers[index] ?? '' }))
      const sortedPairs = pairs => [...pairs].sort((left, right) => (
        left.q.localeCompare(right.q) || left.a.localeCompare(right.a)
      ))
      check(
        JSON.stringify(sortedPairs(schemaFaqPairs)) === JSON.stringify(sortedPairs(visibleFaqPairs)),
        `${productionUrl.pathname} FAQPage question/answer text does not exactly match its visible FAQs`,
      )
    }

    const websiteNodes = parsedSchemaNodes.filter(node => hasSchemaType(node, 'WebSite'))
    check(websiteNodes.length === (productionUrl.pathname === '/' ? 1 : 0), `${productionUrl.pathname} has ${websiteNodes.length} WebSite nodes`)

    const breadcrumbNodes = parsedSchemaNodes.filter(node => hasSchemaType(node, 'BreadcrumbList'))
    const microdataBreadcrumbNodes = Array.from(
      html.matchAll(/<[^>]+\bitemtype=["']https:\/\/schema\.org\/BreadcrumbList["'][^>]*>/gi),
    )
    const breadcrumbNodeCount = breadcrumbNodes.length + microdataBreadcrumbNodes.length
    check(
      breadcrumbNodeCount === (productionUrl.pathname === '/' ? 0 : 1),
      `${productionUrl.pathname} has ${breadcrumbNodeCount} BreadcrumbList nodes across JSON-LD and Microdata; expected ${productionUrl.pathname === '/' ? 0 : 1}`,
    )

    const serviceNodes = parsedSchemaNodes.filter(node => hasSchemaType(node, 'Service'))

    if (productionUrl.pathname === '/') {
      const headHtml = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? ''
      const criticalRenderCss = headHtml.match(
        /<style\b(?=[^>]*\bdata-critical-render-css=["']true["'])[^>]*>([\s\S]*?)<\/style>/i,
      )?.[1] ?? ''
      check(Boolean(criticalRenderCss), '/ head has no inline critical-render style')
      check(criticalRenderCss.includes('body.site-system-font{font-family:system-ui'), '/ critical style has no system-font override')
      check(criticalRenderCss.includes('.defer-render{content-visibility:auto'), '/ critical style has no below-fold rendering rule')
      check(/<body\b[^>]*class=["'][^"']*\bsite-system-font\b/i.test(html), '/ body is missing the scoped system-font class')
      const business = parsedSchemaNodes.find(
        node => hasSchemaType(node, 'Organization') && node?.['@id'] === `${CANONICAL_ORIGIN}/#business`,
      )
      check(Boolean(business), '/ has no canonical business Organization node')
      check(Array.isArray(business?.areaServed) && business.areaServed.length === 78, '/ business areaServed does not contain 78 governed places')
      check(business?.areaServed?.every(place => place?.['@type'] === 'Place'), '/ business areaServed contains a non-Place entry')
      check(business?.contactPoint?.['@type'] === 'ContactPoint', '/ business has no ContactPoint')
      check(business?.contactPoint?.contactType === 'customer service', '/ business ContactPoint has the wrong contact type')
      check(business?.contactPoint?.telephone === '+442475224730', '/ business ContactPoint has the wrong telephone')
      check(business?.contactPoint?.email === 'info@localemergencylocksmith.co.uk', '/ business ContactPoint has the wrong email')
    }

    for (const serviceNode of serviceNodes) {
      const provider = serviceNode.provider
      check(provider?.['@type'] === 'Organization', `${productionUrl.pathname} Service provider is not an Organization`)
      check(provider?.['@id'] === `${CANONICAL_ORIGIN}/#business`, `${productionUrl.pathname} Service provider has the wrong @id`)
      check(provider?.name === 'Local Emergency Locksmith', `${productionUrl.pathname} Service provider has the wrong name`)
      check(provider?.url === CANONICAL_ORIGIN, `${productionUrl.pathname} Service provider has the wrong URL`)
      check(provider?.telephone === '+442475224730', `${productionUrl.pathname} Service provider has the wrong telephone`)
    }

    const areaMatch = productionUrl.pathname.match(/^\/areas\/([^/]+)$/)
    const townServiceMatch = productionUrl.pathname.match(/^\/areas\/([^/]+)\/([^/]+)$/)
    const genericServiceMatch = productionUrl.pathname.match(/^\/services\/([^/]+)$/)
    const expectsServiceSchema = Boolean(areaMatch || townServiceMatch || genericServiceMatch || productionUrl.pathname === '/services')
    check(
      serviceNodes.length === (expectsServiceSchema ? 1 : 0),
      `${productionUrl.pathname} has ${serviceNodes.length} Service nodes; expected ${expectsServiceSchema ? 1 : 0}`,
    )

    if (serviceNodes.length === 1 && expectsServiceSchema) {
      const serviceNode = serviceNodes[0]
      const expectedId = productionUrl.pathname === '/services'
        ? `${loc}#service-catalogue`
        : `${loc}#service`
      check(serviceNode['@id'] === expectedId, `${productionUrl.pathname} Service @id is ${serviceNode['@id'] || 'missing'}; expected ${expectedId}`)
      check(serviceNode.url === loc, `${productionUrl.pathname} Service URL is ${serviceNode.url || 'missing'}; expected ${loc}`)

      if (areaMatch) {
        const areaSlug = areaMatch[1]
        const offers = serviceNode.hasOfferCatalog?.itemListElement
        check(Array.isArray(offers) && offers.length === SERVICE_SLUGS.length, `${productionUrl.pathname} Service catalog does not contain five offers`)
        if (Array.isArray(offers)) {
          const actualOfferUrls = new Set(offers.map(offer => offer?.url))
          const expectedOfferUrls = SERVICE_SLUGS.map(serviceSlug => GOVERNED_TOWNS.includes(areaSlug)
            ? `${loc}/${serviceSlug}`
            : `${loc}#${serviceSlug}`)
          for (const expectedUrl of expectedOfferUrls) {
            check(actualOfferUrls.has(expectedUrl), `${productionUrl.pathname} Service catalog is missing local owner URL ${expectedUrl}`)
          }
        }
      }

      if (productionUrl.pathname === '/services') {
        const offers = serviceNode.hasOfferCatalog?.itemListElement
        check(Array.isArray(offers) && offers.length === SERVICE_SLUGS.length, '/services Service catalog does not contain five offers')
        if (Array.isArray(offers)) {
          const actualOfferUrls = new Set(offers.map(offer => offer?.url))
          for (const serviceSlug of SERVICE_SLUGS) {
            check(actualOfferUrls.has(`${loc}/${serviceSlug}`), `/services catalog is missing ${loc}/${serviceSlug}`)
          }
        }
      }

      if (productionUrl.pathname === '/services' || genericServiceMatch) {
        check(Array.isArray(serviceNode.areaServed) && serviceNode.areaServed.length === 78, `${productionUrl.pathname} Service areaServed does not contain 78 governed places`)
        check(serviceNode.areaServed?.every(place => place?.['@type'] === 'Place'), `${productionUrl.pathname} Service areaServed contains a non-Place entry`)
      }

      if (genericServiceMatch || townServiceMatch) {
        check(serviceNode.offers?.url === loc, `${productionUrl.pathname} Offer URL is ${serviceNode.offers?.url || 'missing'}; expected ${loc}`)
      }
    }

    if (productionUrl.pathname.startsWith('/blog/')) {
      const article = parsedSchemaNodes.find(node => hasSchemaType(node, 'BlogPosting'))
      const author = article?.author
      check(author?.['@type'] === 'Person', `${productionUrl.pathname} BlogPosting author is not a Person`)
      check(author?.['@id'] === `${CANONICAL_ORIGIN}/about#ross`, `${productionUrl.pathname} BlogPosting author has the wrong @id`)
      check(author?.name === 'Ross', `${productionUrl.pathname} BlogPosting author has the wrong name`)
      check(author?.url === `${CANONICAL_ORIGIN}/about`, `${productionUrl.pathname} BlogPosting author does not link to /about`)
      check(author?.worksFor?.['@id'] === `${CANONICAL_ORIGIN}/#business`, `${productionUrl.pathname} BlogPosting author has the wrong worksFor reference`)
      check(article?.publisher?.['@id'] === `${CANONICAL_ORIGIN}/#business`, `${productionUrl.pathname} BlogPosting publisher has the wrong @id`)
      check(typeof article?.datePublished === 'string', `${productionUrl.pathname} BlogPosting has no datePublished`)
      check(typeof article?.dateModified === 'string', `${productionUrl.pathname} BlogPosting has no dateModified`)
      const visibleDateTimes = Array.from(
        html.matchAll(/<time\b[^>]*\bdateTime=["']([^"']+)["'][^>]*>/gi),
        match => match[1],
      )
      check(visibleDateTimes.includes(article?.datePublished), `${productionUrl.pathname} does not visibly expose its BlogPosting datePublished in a semantic time element`)
      check(visibleDateTimes.includes(article?.dateModified), `${productionUrl.pathname} does not visibly expose its BlogPosting dateModified in a semantic time element`)
    }

    if (productionUrl.pathname === '/about') {
      const profilePage = parsedSchemaNodes.find(node => hasSchemaType(node, 'ProfilePage'))
      const person = parsedSchemaNodes.find(node => hasSchemaType(node, 'Person') && node?.['@id'] === `${CANONICAL_ORIGIN}/about#ross`)
      check(profilePage?.mainEntity?.['@id'] === `${CANONICAL_ORIGIN}/about#ross`, '/about ProfilePage does not identify Ross as its main entity')
      check(profilePage?.about?.['@id'] === `${CANONICAL_ORIGIN}/#business`, '/about ProfilePage does not reference the business it describes')
      check(person?.url === `${CANONICAL_ORIGIN}/about`, '/about has no stable Person author URL')
      check(person?.worksFor?.['@id'] === `${CANONICAL_ORIGIN}/#business`, '/about Person has the wrong worksFor reference')
    }

    if (!productionUrl.pathname.startsWith('/blog/')) {
      const unsupportedTrustClaim = pageText.match(/\b(?:DBS[- ]checked|fully insured(?:\s+with)?\s+public liability|full public liability insurance)\b/i)
      check(!unsupportedTrustClaim, `${productionUrl.pathname} contains an unsupported credential claim: ${JSON.stringify(unsupportedTrustClaim?.[0])}`)
    }
    const fixedFinalPriceClaim = pageText.match(/\b(?:the\s+)?price\s+i\s+quote(?:d)?\s+is\s+the\s+(?:price\s+you\s+pay|final\s+price)|\bpay\s+the\s+price\s+i\s+quoted|\bfirm\s+price\s+on\s+the\s+phone\b/i)
    check(!fixedFinalPriceClaim, `${productionUrl.pathname} contains a fixed final-price claim: ${JSON.stringify(fixedFinalPriceClaim?.[0])}`)

    const absoluteSamePriceClaim = findAbsoluteSamePriceClaim(`${pageText} ${JSON.stringify(parsedSchemaNodes)}`)
    check(!absoluteSamePriceClaim, `${productionUrl.pathname} contains an absolute same-price claim: ${JSON.stringify(absoluteSamePriceClaim?.[0])}`)

    const unsupportedOutcomePaymentClaim = pageText.match(/\byou\s+only\s+pay\s+if\s+i\s+complete\s+the\s+job\b|\bif\s+i\s+can(?:not|'t)\s+fix\s+the\s+problem,?\s+you\s+(?:do\s+not|don't)\s+pay\s+(?:a\s+penny|anything)\b/i)
    check(!unsupportedOutcomePaymentClaim, `${productionUrl.pathname} contains an unsupported outcome-payment claim: ${JSON.stringify(unsupportedOutcomePaymentClaim?.[0])}`)

    const unsupportedFreeAssessment = pageText.match(/\b(?:offer|book|arrange)\s+(?:a\s+)?free\s+(?:visual\s+)?(?:security|lock|home[- ]security)\s+(?:survey|check|assessment)\b|\bsecurity\s+survey\s+free\b/i)
    check(!unsupportedFreeAssessment, `${productionUrl.pathname} contains an unsupported free-assessment offer: ${JSON.stringify(unsupportedFreeAssessment?.[0])}`)

    const unsupportedLiveAvailability = pageText.match(/\bavailable\s+now\b/i)
    check(!unsupportedLiveAvailability, `${productionUrl.pathname} presents a static page as a live availability signal: ${JSON.stringify(unsupportedLiveAvailability?.[0])}`)

    const ungovernedPriceRange = pageText.match(/£\d+(?:\.\d+)?\s*(?:-|–|—|to)\s*£?\d+(?:\.\d+)?/i)
    check(!ungovernedPriceRange, `${productionUrl.pathname} contains an ungoverned price range: ${JSON.stringify(ungovernedPriceRange?.[0])}`)

    const genericCommercialAnchor = mainText.match(/\b(?:open the full local service page|view full service details)\b/i)
    check(!genericCommercialAnchor, `${productionUrl.pathname} contains a generic commercial anchor: ${JSON.stringify(genericCommercialAnchor?.[0])}`)

    const links = internalPaths(html)
    const mainLinks = internalPaths(mainHtml)
    if (productionUrl.pathname.startsWith('/blog/')) {
      const directAreaLinks = [...links].filter(path => /^\/areas\/[^/]+$/.test(path))
      check(directAreaLinks.length <= 25, `${productionUrl.pathname} has ${directAreaLinks.length} direct area links; expected a focused article CTA`)
    }

    return { path: productionUrl.pathname, title, description, links, mainLinks, mainHrefs }
  })

  const titleOwners = new Map()
  const descriptionOwners = new Map()
  for (const page of pages) {
    if (titleOwners.has(page.title)) failures.push(`duplicate title on ${titleOwners.get(page.title)} and ${page.path}: ${page.title}`)
    else titleOwners.set(page.title, page.path)
    if (descriptionOwners.has(page.description)) failures.push(`duplicate description on ${descriptionOwners.get(page.description)} and ${page.path}`)
    else descriptionOwners.set(page.description, page.path)
  }

  const knownPaths = new Set(pages.map(page => page.path))
  const allInternalPaths = new Set(pages.flatMap(page => [...page.links]))
  const linkedNoindexPostcodes = MULTI_AREA_POSTCODES
    .map(postcode => `/postcodes/${postcode}`)
    .filter(path => allInternalPaths.has(path))
  check(linkedNoindexPostcodes.length === 0, `canonical pages link to noindex postcode utilities: ${linkedNoindexPostcodes.join(', ')}`)
  const uncrawledPaths = [...allInternalPaths].filter(path => !knownPaths.has(path) && !path.startsWith('/api/'))
  await mapLimit(uncrawledPaths, 12, async path => {
    const { response } = await fetchLocal(path)
    check(response.status === 200, `internal link ${path} returned ${response.status}`)
    check(!response.headers.get('location'), `internal link ${path} redirects to ${response.headers.get('location')}`)
  })

  for (const noindexPath of ['/privacy', '/terms', '/testimonials', '/review', ...MULTI_AREA_POSTCODES.map(postcode => `/postcodes/${postcode}`)]) {
    const { response, html } = await fetchLocal(noindexPath)
    const robots = getMeta(html, 'name', 'robots') ?? ''
    check(response.status === 200, `${noindexPath} returned ${response.status}`)
    checkUtilityRobots(noindexPath, robots, response.headers.get('x-robots-tag') ?? '')
    check(!sitemapUrls.some(loc => new URL(loc).pathname === noindexPath), `${noindexPath} is noindex but present in sitemap`)
  }

  const reviewResult = await fetchLocal('/review')
  const reviewText = visibleText(reviewResult.html)
  check(!/if you were happy/i.test(reviewText), '/review selectively asks only happy customers for feedback')
  check(!/what brought you to call|how quickly i arrived|your area \(e\.g\./i.test(reviewText), '/review requests specified review content')
  const publishesGoogleReviewLink = /leave a google review/i.test(reviewText)
  if (publishesGoogleReviewLink) {
    check(/positive, negative, or mixed feedback is welcome/i.test(reviewText), '/review does not explicitly welcome balanced feedback')
    check(/must not be exchanged for a discount, payment, or other incentive/i.test(reviewText), '/review does not state the no-incentive policy')
  } else {
    check(/not published while its public business details are being verified/i.test(reviewText), '/review hides its Google link without explaining the identity check')
    check(!/https:\/\/(?:www\.)?(?:google\.|share\.google)/i.test(reviewResult.html), '/review exposes an unverified Google destination')
  }

  for (const [postcode, area] of Object.entries(SINGLE_AREA_POSTCODES)) {
    const path = `/postcodes/${postcode}`
    const { response } = await fetchLocal(path)
    check(response.status === 308, `${path} returned ${response.status}; expected permanent 308`)
    check(redirectPath(response) === `/areas/${area}`, `${path} redirects to ${redirectPath(response) || 'nowhere'}; expected /areas/${area}`)
  }

  const manifestResult = await fetchLocal('/manifest.json')
  check(manifestResult.response.status === 200, `manifest.json returned ${manifestResult.response.status}`)
  try {
    const manifest = JSON.parse(manifestResult.html)
    check(!/\b\d{1,3}\s*(?:-|–|—|to)\s*\d{1,3}\s*(?:minute|min)\s+(?:response|arrival)\b/i.test(manifest.description ?? ''), 'manifest.json contains a fixed response-time promise')
  } catch (error) {
    failures.push(`manifest.json is invalid JSON: ${error.message}`)
  }

  // Every valid area x service pair must have exactly one outcome: a published
  // self-canonical 200 in the sitemap, or a permanent redirect to the area hub.
  const areaPaths = sitemapUrls
    .map(loc => new URL(loc).pathname)
    .filter(path => /^\/areas\/[^/]+$/.test(path))
  const serviceSlugs = sitemapUrls
    .map(loc => new URL(loc).pathname.match(/^\/services\/([^/]+)$/)?.[1])
    .filter(Boolean)
  const publishedPairPaths = new Set(
    sitemapUrls
      .map(loc => new URL(loc).pathname)
      .filter(path => /^\/areas\/[^/]+\/[^/]+$/.test(path))
  )

  check(areaPaths.length === 78, `service-area contract found ${areaPaths.length} area hubs; expected 78`)
  check(serviceSlugs.length === 5, `service-area contract found ${serviceSlugs.length} services; expected 5`)
  check(publishedPairPaths.size === 35, `service-area contract found ${publishedPairPaths.size} published pairs; expected 35`)

  const pageByPath = new Map(pages.map(page => [page.path, page]))
  const clickDepth = new Map([['/', 0]])
  const crawlQueue = ['/']
  while (crawlQueue.length > 0) {
    const currentPath = crawlQueue.shift()
    const nextDepth = clickDepth.get(currentPath) + 1
    for (const linkedPath of pageByPath.get(currentPath)?.links ?? []) {
      if (!pageByPath.has(linkedPath) || clickDepth.has(linkedPath)) continue
      clickDepth.set(linkedPath, nextDepth)
      crawlQueue.push(linkedPath)
    }
  }
  const beyondTwoClicks = pages
    .filter(page => (clickDepth.get(page.path) ?? Number.POSITIVE_INFINITY) > 2)
    .map(page => `${page.path} (${clickDepth.get(page.path) ?? 'unreachable'})`)
  check(beyondTwoClicks.length === 0, `canonical pages beyond two clicks from /: ${beyondTwoClicks.join(', ')}`)

  const focusPagesWithoutContextualInbound = pages
    .filter(page => page.path === '/faq' || /^\/(?:areas|services|blog)(?:\/|$)/.test(page.path))
    .filter(page => !pages.some(source => source.path !== page.path && source.mainLinks.has(page.path)))
    .map(page => page.path)
  check(
    focusPagesWithoutContextualInbound.length === 0,
    `SEO focus pages without a contextual inbound link: ${focusPagesWithoutContextualInbound.join(', ')}`,
  )

  for (const areaPath of areaPaths) {
    const contextualInboundCount = pages.filter(source => (
      source.path !== areaPath && source.mainLinks.has(areaPath)
    )).length
    check(
      contextualInboundCount >= 6,
      `${areaPath} has ${contextualInboundCount} contextual inbound links; expected at least 6`,
    )
  }

  check(pageByPath.get('/')?.mainHrefs.has('/faq'), '/ main content does not link to /faq')
  check(pageByPath.get('/prices')?.mainHrefs.has('/faq#pricing'), '/prices main content does not link to /faq#pricing')
  for (const serviceSlug of SERVICE_SLUGS) {
    check(
      pageByPath.get(`/services/${serviceSlug}`)?.mainHrefs.has('/faq#services'),
      `/services/${serviceSlug} main content does not link to /faq#services`,
    )
  }

  for (const areaPath of areaPaths) {
    const areaSlug = areaPath.split('/')[2]
    for (const serviceSlug of serviceSlugs) {
      const expectedOwnerHref = GOVERNED_TOWNS.includes(areaSlug)
        ? `${areaPath}/${serviceSlug}`
        : `${areaPath}#${serviceSlug}`
      check(
        pageByPath.get(`/services/${serviceSlug}`)?.mainHrefs.has(expectedOwnerHref),
        `/services/${serviceSlug} main content does not link to canonical owner ${expectedOwnerHref}`,
      )
    }
  }

  const servicesDirectory = pageByPath.get('/services')
  for (const pairPath of publishedPairPaths) {
    const match = pairPath.match(/^\/areas\/([^/]+)\/([^/]+)$/)
    const areaSlug = match?.[1]
    const serviceSlug = match?.[2]
    check(servicesDirectory?.mainLinks.has(pairPath), `/services main content does not link to ${pairPath}`)
    check(pageByPath.get(`/areas/${areaSlug}`)?.mainLinks.has(pairPath), `/areas/${areaSlug} main content does not link to ${pairPath}`)
    check(pageByPath.get(`/services/${serviceSlug}`)?.mainLinks.has(pairPath), `/services/${serviceSlug} main content does not link to ${pairPath}`)
  }

  await mapLimit(
    areaPaths.flatMap(areaPath => serviceSlugs.map(serviceSlug => ({
      areaPath,
      pairPath: `${areaPath}/${serviceSlug}`,
    }))),
    12,
    async ({ areaPath, pairPath }) => {
      const { response, html } = await fetchLocal(pairPath)
      if (publishedPairPaths.has(pairPath)) {
        check(response.status === 200, `${pairPath} returned ${response.status}; expected published 200`)
        check(!response.headers.get('location'), `${pairPath} unexpectedly redirects to ${response.headers.get('location')}`)
        check(getCanonical(html) === `${CANONICAL_ORIGIN}${pairPath}`, `${pairPath} does not self-canonicalise`)
      } else {
        check(response.status === 308, `${pairPath} returned ${response.status}; expected permanent 308`)
        check(response.headers.get('location')?.endsWith(areaPath), `${pairPath} redirects to ${response.headers.get('location') || 'nowhere'}; expected ${areaPath}`)
      }
    }
  )

  const townCentreAliasRedirectCases = Object.entries(TOWN_CENTRE_ALIASES).flatMap(([alias, owner]) => {
    const ownerPath = `/areas/${owner}`
    return [
      { path: `/areas/${alias}`, expected: ownerPath },
      { path: `/areas/${alias}/streets/high-street`, expected: ownerPath },
      ...SERVICE_SLUGS.map(serviceSlug => ({
        path: `/areas/${alias}/${serviceSlug}`,
        expected: `${ownerPath}/${serviceSlug}`,
      })),
      { path: `/locksmith/${alias}`, expected: ownerPath },
      { path: `/locksmith/${alias}/streets/high-street`, expected: ownerPath },
      ...SERVICE_SLUGS.map(serviceSlug => ({
        path: `/locksmith/${alias}/${serviceSlug}`,
        expected: `${ownerPath}/${serviceSlug}`,
      })),
      { path: `/reviews/${alias}`, expected: ownerPath },
      { path: `/blog/${alias}/retired-local-guide`, expected: ownerPath },
      { path: `/near-me/emergency-locksmith/${alias}`, expected: ownerPath },
    ]
  })

  await mapLimit(
    townCentreAliasRedirectCases,
    12,
    async ({ path, expected }) => checkOneHopPermanentRedirect(path, expected),
  )

  await mapLimit(
    GOVERNED_TOWNS.flatMap(town => SERVICE_SLUGS.map(serviceSlug => ({ town, serviceSlug }))),
    12,
    async ({ town, serviceSlug }) => {
      const path = `/locksmith/${town}/${serviceSlug}`
      const expected = `/areas/${town}/${serviceSlug}`
      const { response } = await fetchLocal(path)
      check(response.status === 308, `${path} returned ${response.status}; expected permanent 308`)
      check(redirectPath(response) === expected, `${path} redirects to ${redirectPath(response) || 'nowhere'}; expected ${expected}`)
    }
  )

  for (const invalidPath of ['/areas/not-a-real-place/emergency-lockout', '/areas/nuneaton/not-a-real-service']) {
    const { response } = await fetchLocal(invalidPath)
    check(response.status === 404, `${invalidPath} returned ${response.status}; expected 404`)
  }

  if (warnings.length > 0) console.warn(warnings.join('\n'))
  if (failures.length > 0) {
    console.error(`SEO audit failed with ${failures.length} issue(s):`)
    for (const failure of failures) console.error(`- ${failure}`)
    process.exitCode = 1
  } else {
    console.log(`SEO audit passed: ${pages.length} canonical pages, ${titleOwners.size} unique titles, ${descriptionOwners.size} unique descriptions, no broken internal links.`)
  }
} finally {
  if (ownedServer) ownedServer.kill()
}
