const CANONICAL_ORIGIN = process.env.SEO_CANONICAL_ORIGIN
  ?? 'https://www.localemergencylocksmith.co.uk'
const EXPECTED_SITEMAP_URLS = 178
const failures = []

function check(condition, message) {
  if (!condition) failures.push(message)
}

function canonicalHref(html) {
  for (const match of html.matchAll(/<link\b[^>]*>/gi)) {
    const tag = match[0]
    if (!/\brel=["'][^"']*\bcanonical\b[^"']*["']/i.test(tag)) continue
    const href = tag.match(/\bhref=["']([^"']+)["']/i)?.[1]
    return href ? new URL(href).href : undefined
  }
  return undefined
}

async function followPermanentRedirects(startUrl, maximumHops) {
  const seen = new Set()
  const chain = []
  let currentUrl = startUrl

  for (let hop = 0; hop <= maximumHops; hop += 1) {
    check(!seen.has(currentUrl), `${startUrl} enters a redirect loop at ${currentUrl}`)
    if (seen.has(currentUrl)) return { chain, finalUrl: currentUrl }
    seen.add(currentUrl)

    const response = await fetch(currentUrl, {
      redirect: 'manual',
      headers: { 'user-agent': 'LocalEmergencyLocksmith-ProductionHostAudit/1.0' },
    })
    const location = response.headers.get('location')
    chain.push({ url: currentUrl, status: response.status, location })

    if (![301, 308].includes(response.status)) {
      const html = await response.text()
      return { chain, finalUrl: currentUrl, response, html }
    }

    check(Boolean(location), `${currentUrl} returned ${response.status} without a Location header`)
    if (!location) return { chain, finalUrl: currentUrl, response }
    currentUrl = new URL(location, currentUrl).href
  }

  failures.push(`${startUrl} exceeds ${maximumHops} permanent redirects`)
  return { chain, finalUrl: currentUrl }
}

const canonical = new URL(CANONICAL_ORIGIN)
check(canonical.protocol === 'https:', `canonical origin must use HTTPS: ${CANONICAL_ORIGIN}`)
check(canonical.hostname.startsWith('www.'), `canonical origin must use www: ${CANONICAL_ORIGIN}`)
check(canonical.pathname === '/', `canonical origin must not contain a path: ${CANONICAL_ORIGIN}`)

const apexHost = canonical.hostname.replace(/^www\./, '')
const hostCases = [
  { label: 'HTTPS canonical', url: `${canonical.origin}/`, minimumHops: 0, maximumHops: 0 },
  { label: 'HTTP www', url: `http://${canonical.hostname}/`, minimumHops: 1, maximumHops: 1 },
  { label: 'HTTPS apex', url: `https://${apexHost}/`, minimumHops: 1, maximumHops: 1 },
  { label: 'HTTP apex', url: `http://${apexHost}/`, minimumHops: 1, maximumHops: 2 },
]

for (const testCase of hostCases) {
  const result = await followPermanentRedirects(testCase.url, testCase.maximumHops)
  const redirectCount = result.chain.filter(entry => [301, 308].includes(entry.status)).length
  check(redirectCount >= testCase.minimumHops, `${testCase.label} used ${redirectCount} redirects; expected at least ${testCase.minimumHops}`)
  check(result.finalUrl === `${canonical.origin}/`, `${testCase.label} ended at ${result.finalUrl}; expected ${canonical.origin}/`)
  check(result.response?.status === 200, `${testCase.label} final response was ${result.response?.status ?? 'missing'}; expected 200`)
  if (result.html) {
    check(canonicalHref(result.html) === `${canonical.origin}/`, `${testCase.label} final page has canonical ${canonicalHref(result.html) ?? 'missing'}`)
  }
}

const sitemapResponse = await fetch(`${canonical.origin}/sitemap.xml`)
const sitemap = await sitemapResponse.text()
const sitemapUrls = Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g), match => match[1])
check(sitemapResponse.status === 200, `sitemap returned ${sitemapResponse.status}; expected 200`)
check(sitemapUrls.length === EXPECTED_SITEMAP_URLS, `sitemap has ${sitemapUrls.length} URLs; expected ${EXPECTED_SITEMAP_URLS}`)
check(sitemapUrls.every(url => new URL(url).origin === canonical.origin), 'sitemap contains a non-canonical origin')

const robotsResponse = await fetch(`${canonical.origin}/robots.txt`)
const robots = await robotsResponse.text()
check(robotsResponse.status === 200, `robots.txt returned ${robotsResponse.status}; expected 200`)
check(robots.includes(`Sitemap: ${canonical.origin}/sitemap.xml`), 'robots.txt does not declare the canonical sitemap URL')

if (failures.length > 0) {
  console.error(`Production host audit failed with ${failures.length} issue(s):`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exitCode = 1
} else {
  console.log(`Production host audit passed: HTTP/apex variants converge on ${canonical.origin}/ within two permanent redirects; sitemap and robots use the canonical origin.`)
}
