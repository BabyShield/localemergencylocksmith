import { spawn } from 'node:child_process'

const BASE_URL = process.env.SEO_BASE_URL ?? 'http://127.0.0.1:3000'
const CANONICAL_ORIGIN = process.env.SEO_CANONICAL_ORIGIN ?? 'https://www.localemergencylocksmith.co.uk'
const EXPECTED_SITEMAP_URLS = 201
const failures = []
const warnings = []

function check(condition, message) {
  if (!condition) failures.push(message)
}

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

function visibleText(html) {
  return decodeHtml(
    html
      .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' '),
  ).replace(/\s+/g, ' ').trim()
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

  const pages = await mapLimit(sitemapUrls, 12, async loc => {
    const productionUrl = new URL(loc)
    const { response, html } = await fetchLocal(productionUrl.pathname)
    const title = getTitle(html)
    const description = getMeta(html, 'name', 'description') ?? ''
    const robots = getMeta(html, 'name', 'robots') ?? ''
    const canonical = getCanonical(html)
    const h1Count = (html.match(/<h1\b/gi) ?? []).length
    const ogImage = getMeta(html, 'property', 'og:image')
    const pageText = visibleText(html)
    const claimText = operationalClaimText(html)

    check(response.status === 200, `${productionUrl.pathname} returned ${response.status}`)
    check(!response.headers.get('location'), `${productionUrl.pathname} redirects to ${response.headers.get('location')}`)
    check(canonical === loc, `${productionUrl.pathname} canonical is ${canonical || 'missing'}; expected ${loc}`)
    check(title.length > 0, `${productionUrl.pathname} has no title`)
    check(title.length <= 60, `${productionUrl.pathname} title is ${title.length} characters: ${title}`)
    check((title.match(/Local Emergency Locksmith/g) ?? []).length <= 1, `${productionUrl.pathname} repeats the brand in its title`)
    check(description.length > 0, `${productionUrl.pathname} has no meta description`)
    check(description.length <= 160, `${productionUrl.pathname} description is ${description.length} characters`)
    check(/index/i.test(robots) && /follow/i.test(robots) && !/noindex/i.test(robots), `${productionUrl.pathname} robots is ${robots || 'missing'}`)
    check(h1Count === 1, `${productionUrl.pathname} has ${h1Count} H1 elements`)
    check(Boolean(ogImage), `${productionUrl.pathname} has no og:image`)
    check(!html.includes('https://localemergencylocksmith.co.uk'), `${productionUrl.pathname} contains the redirecting apex origin`)

    const futureArrivalPromise = pageText.match(/\b(?:i|we)\s+(?:can|will|aim\s+to|typically|usually|normally)[^.!?]{0,80}\b(?:arrive|reach|be\s+with\s+you)[^.!?]{0,40}\b\d{1,3}\s*(?:-|–|—|to)?\s*\d{0,3}\s*minutes?\b/i)
      ?? pageText.match(/\b\d{1,3}\s*(?:-|–|—|to)\s*\d{1,3}[- ]minute\s+(?:response|arrival)\b/i)
    check(!futureArrivalPromise, `${productionUrl.pathname} contains a fixed future arrival promise: ${JSON.stringify(futureArrivalPromise?.[0])}`)

    const operationalClaim = findUnsupportedOperationalClaim(claimText)
    check(!operationalClaim, `${productionUrl.pathname} contains an ${operationalClaim?.label}: ${JSON.stringify(operationalClaim?.match)}`)

    if (/^\/areas\/[^/]+$/.test(productionUrl.pathname)) {
      check(html.includes('id="local-evidence-heading"'), `${productionUrl.pathname} is missing verified local evidence`)
      check(html.includes('id="service-guidance-heading"'), `${productionUrl.pathname} is missing service-by-service guidance`)
      check(html.includes('id="source-heading"'), `${productionUrl.pathname} is missing its evidence source register`)
      for (const serviceSlug of ['emergency-lockout', 'lock-change', 'upvc-lock-repair', 'boarding-up', 'lock-upgrade']) {
        check(html.includes(`id="${serviceSlug}"`), `${productionUrl.pathname} is missing ${serviceSlug} guidance`)
      }
      check(!pageText.includes('Common Lock Problems in'), `${productionUrl.pathname} still renders the unsupported legacy common-problems block`)
    }

    for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
      try {
        JSON.parse(match[1])
      } catch (error) {
        failures.push(`${productionUrl.pathname} has invalid JSON-LD: ${error.message}`)
      }
    }

    const links = internalPaths(html)
    if (productionUrl.pathname.startsWith('/blog/')) {
      const directAreaLinks = [...links].filter(path => /^\/areas\/[^/]+$/.test(path))
      check(directAreaLinks.length <= 25, `${productionUrl.pathname} has ${directAreaLinks.length} direct area links; expected a focused article CTA`)
    }

    return { path: productionUrl.pathname, title, description, links }
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
  const uncrawledPaths = [...allInternalPaths].filter(path => !knownPaths.has(path) && !path.startsWith('/api/'))
  await mapLimit(uncrawledPaths, 12, async path => {
    const { response } = await fetchLocal(path)
    check(response.status === 200, `internal link ${path} returned ${response.status}`)
    check(!response.headers.get('location'), `internal link ${path} redirects to ${response.headers.get('location')}`)
  })

  for (const legalPath of ['/privacy', '/terms']) {
    const { response, html } = await fetchLocal(legalPath)
    const robots = getMeta(html, 'name', 'robots') ?? ''
    check(response.status === 200, `${legalPath} returned ${response.status}`)
    check(/noindex/i.test(robots) && /follow/i.test(robots), `${legalPath} robots is ${robots || 'missing'}; expected noindex, follow`)
    check(!sitemapUrls.some(loc => new URL(loc).pathname === legalPath), `${legalPath} is noindex but present in sitemap`)
  }

  const robotsResult = await fetchLocal('/robots.txt')
  check(robotsResult.response.status === 200, `robots.txt returned ${robotsResult.response.status}`)
  check(robotsResult.html.includes(`Sitemap: ${CANONICAL_ORIGIN}/sitemap.xml`), 'robots.txt does not declare the canonical sitemap URL')

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
