import { readFile } from 'node:fs/promises'
import { SERVICES } from '../src/data/services.ts'
import {
  PUBLISHED_PRICES,
  PUBLISHED_PRICE_BY_ID,
  SERVICE_PRICE_DETAILS,
} from '../src/data/pricing.ts'

const failures = []

function check(condition, message) {
  if (!condition) failures.push(message)
}

const EXPECTED_STARTING_PRICE_IDS = {
  'emergency-lockout': 'emergency-lockout',
  'lock-change': 'euro-cylinder-replacement',
  'upvc-lock-repair': 'upvc-lock-repair',
  'boarding-up': 'emergency-boarding',
  'lock-upgrade': 'anti-snap-cylinder',
}

check(PUBLISHED_PRICES.length === 9, `published catalogue has ${PUBLISHED_PRICES.length} rows; expected 9`)

const ids = new Set()
const serviceNames = new Set()
for (const price of PUBLISHED_PRICES) {
  check(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(price.id), `invalid published price id ${JSON.stringify(price.id)}`)
  check(!ids.has(price.id), `duplicate published price id ${price.id}`)
  check(!serviceNames.has(price.service), `duplicate published service label ${price.service}`)
  check(Number.isInteger(price.price) && price.price > 0, `${price.id} has invalid price ${price.price}`)
  check(price.detail.trim().length >= 45, `${price.id} needs a scope-specific detail of at least 45 characters`)
  check(price.includes.trim().length >= 5, `${price.id} has an inadequate includes label`)
  ids.add(price.id)
  serviceNames.add(price.service)
}

check(Object.keys(PUBLISHED_PRICE_BY_ID).length === PUBLISHED_PRICES.length, 'published price lookup does not match the catalogue')

const serviceSlugs = new Set(SERVICES.map(service => service.slug))
check(Object.keys(SERVICE_PRICE_DETAILS).length === SERVICES.length, 'service price-detail registry does not cover every service')

const referencedPriceIds = new Set()
for (const [serviceSlug, details] of Object.entries(SERVICE_PRICE_DETAILS)) {
  check(serviceSlugs.has(serviceSlug), `price-detail registry contains unknown service ${serviceSlug}`)
  check(details.length >= 3, `${serviceSlug} has fewer than three useful price/quote rows`)

  for (const [index, detail] of details.entries()) {
    const label = `${serviceSlug} price row ${index + 1}`
    check(detail.item.trim().length >= 8, `${label} has an inadequate item label`)
    const hasPublishedPrice = 'publishedPriceId' in detail
    const hasQuoteLabel = 'quoteLabel' in detail
    check(hasPublishedPrice !== hasQuoteLabel, `${label} must use exactly one published price or quote label`)

    if (hasPublishedPrice) {
      check(ids.has(detail.publishedPriceId), `${label} references unknown published price ${detail.publishedPriceId}`)
      referencedPriceIds.add(detail.publishedPriceId)
    } else if (hasQuoteLabel) {
      check(!/£|\bfrom\s+\d/i.test(detail.quoteLabel), `${label} embeds an amount in quote-only wording`)
    }
  }
}

for (const priceId of ids) {
  check(referencedPriceIds.has(priceId), `published price ${priceId} is not used by any service page`)
}

for (const service of SERVICES) {
  const expectedPriceId = EXPECTED_STARTING_PRICE_IDS[service.slug]
  check(Boolean(expectedPriceId), `${service.slug} has no independently assigned catalogue owner`)
  const publishedPrice = PUBLISHED_PRICE_BY_ID[expectedPriceId]
  check(Boolean(publishedPrice), `${service.slug} owner price ${expectedPriceId} is missing`)
  check(publishedPrice?.price === service.priceFrom, `${service.slug} starts at £${service.priceFrom}, but ${expectedPriceId} is £${publishedPrice?.price}`)
  check(
    SERVICE_PRICE_DETAILS[service.slug]?.some(detail => (
      'publishedPriceId' in detail && detail.publishedPriceId === expectedPriceId
    )),
    `${service.slug} service page does not show its canonical starting-price row ${expectedPriceId}`,
  )
}

const architectureFiles = [
  ['prices page', 'src/app/prices/page.tsx', "@/data/pricing", false],
  ['homepage price table', 'src/components/PriceTable.tsx', "@/data/pricing", false],
  ['service page', 'src/app/services/[slug]/page.tsx', "@/data/pricing", true],
  ['service registry', 'src/data/services.ts', "./pricing.ts", true],
  ['dedicated-town service registry', 'src/data/governed-town-services.ts', "./pricing.ts", true],
]

for (const [label, relativePath, importToken, rejectLiteralAmounts] of architectureFiles) {
  const source = await readFile(new URL(`../${relativePath}`, import.meta.url), 'utf8')
  check(source.includes(importToken), `${label} does not use the canonical pricing module`)
  check(!/\bconst\s+PRICES\s*=/.test(source), `${label} defines a competing local price catalogue`)
  if (rejectLiteralAmounts) {
    check(!/£\d/.test(source), `${label} embeds a literal monetary amount outside the canonical pricing module`)
  }
}

if (failures.length > 0) {
  console.error(`Pricing governance failed with ${failures.length} issue(s):`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(
  `Pricing governance passed: ${PUBLISHED_PRICES.length} published scopes, `
  + `${referencedPriceIds.size} service-page references and ${SERVICES.length} canonical service owners.`,
)
