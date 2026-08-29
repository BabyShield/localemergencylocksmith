# Service-area publication governance — 2026-08-29

## Canonical ownership

- The service-area universe is 78 areas × 5 services = 390 combinations.
- 35 combinations (seven towns × five services) have an explicit evidence-reviewed content record and may return an indexable `200` page.
- The remaining 355 valid combinations permanently redirect to their parent area hub.
- Invalid area or service slugs return `404`.
- The governed registry is the only source for static params, sitemap membership and service-area internal links.
- The area registry contains routing and geographic-navigation fields only. Publishable local facts, service guidance and FAQs must come from the evidence-governed guide registries.

This keeps one canonical owner for each query family and prevents a URL from becoming indexable merely because an area and service slug can be combined. A new combination must be added to the governed registry before it can enter the sitemap or internal-link graph.

## Publication checks

Run:

```powershell
npm run audit:service-areas
npm run audit:area-guides
npm run audit:pricing
npm run typecheck
npm run build
$env:SEO_BASE_URL='http://127.0.0.1:3101'; npm run check:seo
```

The governance audit fails closed on:

- an incomplete or duplicated 390-pair policy;
- drift between the canonical service list, published records and static params;
- missing locality or technical sources, homepage-only source URLs, missing claim-support notes, stale checks or invalid dates;
- reintroduced legacy area fields, orphaned local-fact registries or unverified brand-inventory components;
- fewer than four FAQs, missing preparation/local-guidance sections, or fewer than 600 editorial words;
- unsupported frequency, fixed-arrival, universal-insurance, guaranteed-entry or absolute-security claims;
- duplicate or out-of-range titles, descriptions and H1s;
- fewer than 50 globally unique body five-word sequences or less than a 35% unique-sequence share in any area×service guidance record;
- excessive five-word-shingle overlap in locality-specific or full editorial copy.

The audits also report distributed exact-sentence reuse and the pair-specific share of dedicated town-service editorial. These are visibility metrics for the next reviewed de-templating wave, not release gates yet; setting thresholds without first replacing the legacy shared copy would disguise rather than solve the editorial work.

The HTTP SEO audit crawls all 178 canonical sitemap URLs and all 390 area-service combinations. It requires each combination to be either a self-canonical published `200` or a `308` to its parent hub, and checks invalid combinations for `404`.

## Evidence boundary

The published guides cite council or police pages and the Master Locksmiths Association for the claims those sources support. Local context is deliberately conditional: a town, postcode, conservation area or neighbouring building does not prove an individual door's construction, lock type, property status, insurance terms, access authority or travel time.

Prices, no-VAT status, no separate call-out fee and operating availability are business-policy statements. Current ETA, exact scope, authority to enter, compatible parts and any customer-specific insurer, landlord, manager, fire-door or planning requirement must be confirmed for the actual call.

## Outcome boundary

Passing these checks establishes a crawlable, internally consistent and evidence-governed release. It does not prove Google indexing, impressions, enquiries or rankings; those require later search-console and query-level observation.
