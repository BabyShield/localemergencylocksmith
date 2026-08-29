# Governed source health audit — 29 August 2026

## Scope and method

This began as a read-only snapshot of all 117 unique URLs in the published area-guide evidence registry. It did not change an external site or treat a bot block as a broken source. Four sources added from corrections and evidence enrichment later in the same review are recorded separately below.

- **117 unique URLs checked:** 70 locality, 38 property-status and 9 technical sources.
- Requests used GET, a Chrome-like user agent, manual redirect handling, bounded concurrency of 10, a 12-second timeout per hop and an eight-hop limit.
- A second content-signature pass inspected up to the first 128 KiB with bounded concurrency of 8 and a 15-second timeout.
- Semantic alignment was checked for 26 prioritised sources, including the highest-reuse technical sources and recent 2024–2026 council material. This was not a line-by-line revalidation of every claim in every full document.

## Results

- **106** URLs returned HTTP 200 directly.
- **0** finished in a redirect, 404/410, 5xx, timeout or network error.
- The content pass identified **46 valid PDFs** and **71 HTML responses**, with no soft-404 or content-signature anomaly.
- **11** official URLs returned HTTP 403 to the direct audit client:
  - West Midlands Police: `west-midlands-lock-advice`, `west-midlands-door-security`, `west-midlands-forensics`
  - Warwickshire Police: `warwickshire-lock-advice`, `warwickshire-door-security`, `warwickshire-forensics`
  - Historic England: `binley-woods-old-lodge-barn`, `stivichall-grange`, `historic-england-hartshill-castle-1011197`, `historic-england-lawford-hill-farmhouse-1299648`, `historic-england-st-john-long-lawford-1299647`

Representative pages from all three 403 publishers were readable through a browser-indexed fetch on the audit date and contained the expected official material. The 11 results are therefore recorded as **audit-client access blocks**, not confirmed broken links.

## Evidence correction made from the audit

The Rugby Borough Council Rural Sustainability Study supports Shilton's Rural Village classification, but it does not state that Shilton is within a “Shilton and Barnacle civil parish”. That parish attribution was removed from the council source. The separate [ONS Rugby area profile](https://www.ons.gov.uk/explore-local-statistics/areas/E07000220-rugby), which explicitly lists Shilton and Barnacle under Rugby's parishes, is now cited for that limited fact.

No other mismatch was found in the prioritised semantic sample. No result from this snapshot proves that a source will remain unchanged or reachable indefinitely.

## Sources added after the baseline crawl

The corrected registry contains **121 unique source IDs and 121 unique URLs**. Each of the four additions returned HTTP 200 directly and was opened to verify the exact cited passage:

- Office for National Statistics — [Rugby area profile](https://www.ons.gov.uk/explore-local-statistics/areas/E07000220-rugby)
- Coventry City Council — [Earlsdon Conservation Area Appraisal](https://www.coventry.gov.uk/downloads/file/39167/earlsdon-conservation-area-appraisal)
- The Gazette — [Notice of Variation of Nuneaton Town Centre Conservation Area](https://www.thegazette.co.uk/notice/4289465)
- Canal & River Trust — [Volunteers help spruce up Hillmorton Locks](https://canalrivertrust.org.uk/news-and-views/news/volunteers-help-spruce-up-hillmorton-locks-the-busiest-lock-flight-in-the-country)
