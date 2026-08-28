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
