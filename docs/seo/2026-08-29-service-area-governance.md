# Service-area publication governance — 2026-08-29

## Canonical ownership

- The service-area universe is 78 areas × 5 services = 390 combinations.
- 35 combinations (seven towns × five services) have an explicit evidence-reviewed content record and may return an indexable `200` page.
- The remaining 355 valid combinations permanently redirect to their parent area hub.
- Invalid area or service slugs return `404`.
- The governed registry is the only source for static params, sitemap membership and service-area internal links.
- The area registry contains routing and geographic-navigation fields only. Publishable local facts, service guidance and FAQs must come from the evidence-governed guide registries.
- Every area×service record explicitly selects the zero-based local fact indexes that inform its guidance. Only sources attached to those selected facts may appear as that service section's local citations.
- Fact selection is editorial, not automatic: the service prose must directly use the selected fact as a decision, limitation or address-verification point. Merely sharing a town, source or keyword is not enough.
- Every area hub carries three or four visible, governed local facts supported by at least two distinct fact sources. A facility-specific fact can add useful address context, but its source must be marked fact-only and cannot support a general residential or commercial service claim.

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
npm run check:production-hosts
```

The governance audit fails closed on:

- an incomplete or duplicated 390-pair policy;
- drift between the canonical service list, published records and static params;
- missing locality or technical sources, homepage-only source URLs, missing claim-support notes, stale checks or invalid dates;
- fewer than three visible local facts, more than four facts, or fewer than two distinct sources attached to those facts;
- missing, duplicated or out-of-range pair-level fact selections, use of a fact-only source, or any difference between selected-fact sources and rendered service-section citations;
- reintroduced legacy area fields, orphaned local-fact registries or unverified brand-inventory components;
- fewer than four FAQs, missing preparation/local-guidance sections, or fewer than 600 editorial words;
- unsupported frequency, fixed-arrival, universal-insurance, guaranteed-entry or absolute-security claims;
- attribution of method, work or scope agreement to the MLA charter, or copy that bundles agreement to work with pricing instead of limiting agreement to a changed service-call price;
- duplicate or out-of-range titles, descriptions and H1s;
- fewer than 50 globally unique body five-word sequences or less than a 35% unique-sequence share in any area×service guidance record;
- any exact body sentence of eight or more words reused by more than one of the 390 area×service guidance records;
- less than 39% pair-specific editorial or more than 51% repeated exact-sentence words on any of the 35 dedicated town×service pages;
- excessive five-word-shingle overlap in locality-specific or full editorial copy.

The 35 dedicated pages include two hand-authored decision extensions per town×service pair. Their pair-specific and repeated-sentence measures are release gates at the thresholds above. The 390 area-hub service sections also use manually reviewed, pair-specific bodies instead of rotated protocol copy; the source audit now rejects every cross-record exact body-sentence repeat of eight or more words. Five-word overlap and globally unique-sequence gates remain in place so adding a place name or other metric-only wording cannot substitute for substantive local guidance.

The HTTP SEO audit crawls all 178 canonical sitemap URLs and all 390 area-service combinations. It requires each combination to be either a self-canonical published `200` or a `308` to its parent hub, checks invalid combinations for `404`, and requires every area hub to have at least six contextual inbound links from other main-content pages.

The production-host audit checks that HTTP and apex-host variants reach the HTTPS `www` canonical host through permanent redirects, and that the live sitemap and robots file use that canonical origin.

Each area hub displays numbered local facts. Every service section links back to the exact numbered fact or facts it uses, while technical citations remain separately labelled. This makes the local evidence relationship reviewable by users and fail-closed in source and rendered-HTML audits.

Each published area-service FAQ is also bound to one of that pair's selected local facts. The original customer question and service answer remain intact, followed by a separately labelled note showing how the cited local evidence should be used. The rendered note links directly to the complete fact and its source badges. The source audit requires all 390 FAQ fact pointers and evidence notes to resolve, and requires all 390 complete answers to remain unique even after area and postcode terms are removed.

## Evidence boundary

The published guides cite council or police pages and the Master Locksmiths Association for the claims those sources support. Local context is deliberately conditional: a town, postcode, conservation area or neighbouring building does not prove an individual door's construction, lock type, property status, insurance terms, access authority or travel time.

Prices, no-VAT status, no separate call-out fee and operating availability are business-policy statements. Current ETA, exact scope, authority to enter, compatible parts and any customer-specific insurer, landlord, manager, fire-door or planning requirement must be confirmed for the actual call.

## Outcome boundary

Passing these checks establishes a crawlable, internally consistent and evidence-governed release. It does not prove Google indexing, impressions, enquiries or rankings; those require later search-console and query-level observation.
