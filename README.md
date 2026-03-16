# CLAUDE CODE BUILD PLAN
## Local Emergency Locksmith — localemergencylocksmith.co.uk

**Domain:** localemergencylocksmith.co.uk
**Strategy:** Emergency-first landing pages. Every page is a conversion machine — phone number, location, price, call button. No fluff.
**Tech Stack:** Next.js 14 (App Router) + Tailwind CSS + deployed to Vercel
**Why Next.js:** SSG (Static Site Generation) for instant load speed + automatic sitemap + SEO meta per page + easy area page generation from data

---

## SITE ARCHITECTURE

```
/                           → Main landing page (Coventry focus)
/areas/                     → Area hub page (all locations listed)
/areas/[slug]/              → Individual area page (e.g. /areas/earlsdon)
/services/                  → Services overview
/services/emergency-lockout → Emergency door opening
/services/lock-change       → Lock replacement / upgrade
/services/upvc-lock-repair  → uPVC door & window locks
/services/boarding-up       → Emergency boarding up
/services/lock-upgrade      → Security upgrades (BS3621)
/prices/                    → Simple pricing page
/contact/                   → Contact with form + map
/blog/                      → Optional: 2-3 SEO articles at launch
```

**Total pages at launch:** ~95 area pages + 7 service pages + 4 core pages = ~106 pages

---

## PAGE STRUCTURE — EVERY PAGE MUST HAVE

### Sticky Header (all pages)
```
[LOGO]  LOCAL EMERGENCY LOCKSMITH   [CALL NOW: 07735 336175]  ← click-to-call
        Coventry & Surrounding Areas  [Big green/orange button]
```
- Phone number visible WITHOUT scrolling on mobile
- Click-to-call `<a href="tel:+447735336175">`
- No hamburger menu hiding the phone number

### Sticky Footer CTA (mobile only)
```
Fixed bottom bar: [📞 CALL NOW - 07735 336175]
```
- Always visible on mobile
- Green/orange high-contrast background

### Trust Strip (below header, every page)
```
✓ No VAT  ✓ No Call-Out Fee  ✓ Local Independent Locksmith  ✓ 24/7 Emergency
✓ 15-30 Min Response  ✓ No Hidden Charges  ✓ All Coventry Postcodes
```

---

## PAGE TEMPLATES

### 1. HOMEPAGE (index)
**Target Keywords:** emergency locksmith coventry, locksmith coventry, 24 hour locksmith coventry

```
HERO SECTION:
  H1: "Emergency Locksmith Coventry"
  Subhead: "Locked out? We'll be there in 15-30 minutes. Local, independent, no VAT."
  [CALL NOW button - massive]
  [Phone number - massive]
  "Available 24/7 — 365 days a year"

TRUST STRIP

WHY US (4 boxes):
  → No VAT (you save 20% vs big companies)
  → No call-out fee
  → Local locksmith, not a call centre
  → 15-30 min response across Coventry

SERVICES (4 cards with icons):
  → Emergency Lockout
  → Lock Change & Replacement
  → uPVC Door & Window Locks
  → Boarding Up & Security

AREAS WE COVER (grid of area links):
  Coventry | Nuneaton | Rugby | Leamington Spa | Warwick | etc.
  (links to individual area pages)

PRICING SNAPSHOT:
  Emergency lockout: from £59
  Lock change: from £69
  uPVC lock repair: from £59
  (link to full pricing page)

FINAL CTA:
  "Locked out right now? Call us."
  [Giant phone button]

SCHEMA MARKUP:
  LocalBusiness
  Service
  AreaServed (all postcodes)
```

### 2. AREA PAGES (/areas/[slug])
**This is where you win SEO.** Each page targets "[service] locksmith [area name]"

**Template — every area page follows this EXACT structure:**

```
H1: "Emergency Locksmith in [Area Name]"
P: "Locked out in [Area Name]? Our local locksmith covers [Area Name]
    and all [Postcode] postcodes. Call now for a 15-30 minute response.
    No VAT. No call-out fee. No hidden charges."

[CALL NOW button]

H2: "Why Choose Us in [Area Name]?"
- We're based locally, not a national call centre
- No VAT — you save 20% compared to big companies
- Transparent pricing — the price we quote is the price you pay
- We cover [Area Name] and nearby: [list 3-4 neighbouring areas with links]

H2: "Our Services in [Area Name]"
- Emergency lockout — from £59
- Lock change & replacement — from £69
- uPVC door & window locks — from £59
- Boarding up — from £79
- Lock upgrades (BS3621) — from £79

H2: "Postcodes We Cover Near [Area Name]"
[List relevant postcodes: CV1, CV2, etc.]

H2: "Nearby Areas"
[Internal links to 4-6 neighbouring area pages]

[FINAL CTA with phone number]

SCHEMA: LocalBusiness + areaServed: [Area Name]
META TITLE: "Emergency Locksmith [Area Name] | 24/7 | No VAT | Call Now"
META DESC: "Locked out in [Area Name]? Local emergency locksmith, 15-30 min
            response. No VAT, no call-out fee. Call 07735 336175 now."
```

### 3. SERVICE PAGES (/services/[slug])
```
H1: "[Service Name] — Coventry & Surrounding Areas"
Description of service (3-4 paragraphs)
What's included
Pricing from £XX
Areas covered (links to area pages)
[CTA with phone]
```

### 4. PRICING PAGE (/prices)
**Simple table. No "call for quote" nonsense — people hate that for emergencies.**
```
| Service                    | Price From |
|---------------------------|------------|
| Emergency lockout         | £59        |
| Lock change (standard)    | £69        |
| Lock change (BS3621)      | £79        |
| uPVC lock repair          | £59        |
| uPVC lock replacement     | £89        |
| Boarding up (emergency)   | £79        |
| Window lock repair        | £49        |
| Security survey           | FREE       |

* No VAT  * No call-out fee  * Price includes labour
* Evening/weekend: no extra charge
```

### 5. CONTACT PAGE
```
Phone: 07735 336175 (click-to-call)
Email: info@localemergencylocksmith.co.uk
Operating: 24/7 — 365 days
Areas: Coventry, Nuneaton, Rugby, Leamington Spa, Warwick, Stratford
Simple contact form (name, phone, postcode, message)
Embedded Google Map centred on Coventry
```

---

## AREA DATA (for generating all pages)

Claude Code should use this data to generate all area pages from a single template.

```javascript
const areas = {
  coventry: {
    name: "Coventry",
    region: "Coventry",
    postcodes: ["CV1", "CV2", "CV3", "CV4", "CV5", "CV6", "CV7"],
    areas: [
      { slug: "coventry-city-centre", name: "Coventry City Centre", postcode: "CV1" },
      { slug: "earlsdon", name: "Earlsdon", postcode: "CV5" },
      { slug: "tile-hill", name: "Tile Hill", postcode: "CV4" },
      { slug: "canley", name: "Canley", postcode: "CV4" },
      { slug: "radford", name: "Radford", postcode: "CV6" },
      { slug: "coundon", name: "Coundon", postcode: "CV6" },
      { slug: "holbrooks", name: "Holbrooks", postcode: "CV6" },
      { slug: "foleshill", name: "Foleshill", postcode: "CV6" },
      { slug: "stoke", name: "Stoke", postcode: "CV2" },
      { slug: "wyken", name: "Wyken", postcode: "CV2" },
      { slug: "walsgrave", name: "Walsgrave", postcode: "CV2" },
      { slug: "binley", name: "Binley", postcode: "CV3" },
      { slug: "binley-woods", name: "Binley Woods", postcode: "CV3" },
      { slug: "willenhall", name: "Willenhall", postcode: "CV3" },
      { slug: "cheylesmore", name: "Cheylesmore", postcode: "CV3" },
      { slug: "whitley", name: "Whitley", postcode: "CV3" },
      { slug: "finham", name: "Finham", postcode: "CV3" },
      { slug: "styvechale", name: "Styvechale", postcode: "CV3" },
      { slug: "allesley", name: "Allesley", postcode: "CV5" },
      { slug: "allesley-park", name: "Allesley Park", postcode: "CV5" },
      { slug: "eastern-green", name: "Eastern Green", postcode: "CV5" },
      { slug: "longford", name: "Longford", postcode: "CV6" },
      { slug: "bell-green", name: "Bell Green", postcode: "CV6" },
      { slug: "courthouse-green", name: "Courthouse Green", postcode: "CV6" },
      { slug: "aldermans-green", name: "Aldermans Green", postcode: "CV2" },
      { slug: "potters-green", name: "Potters Green", postcode: "CV2" },
      { slug: "henley-green", name: "Henley Green", postcode: "CV2" },
      { slug: "wood-end", name: "Wood End", postcode: "CV2" },
      { slug: "sowe", name: "Sowe", postcode: "CV2" },
      { slug: "little-heath", name: "Little Heath", postcode: "CV6" }
    ]
  },
  nuneaton: {
    name: "Nuneaton & Bedworth",
    region: "Nuneaton",
    postcodes: ["CV10", "CV11", "CV12"],
    areas: [
      { slug: "nuneaton", name: "Nuneaton Town Centre", postcode: "CV11" },
      { slug: "attleborough", name: "Attleborough", postcode: "CV11" },
      { slug: "stockingford", name: "Stockingford", postcode: "CV10" },
      { slug: "weddington", name: "Weddington", postcode: "CV10" },
      { slug: "horeston-grange", name: "Horeston Grange", postcode: "CV11" },
      { slug: "whitestone", name: "Whitestone", postcode: "CV11" },
      { slug: "camp-hill", name: "Camp Hill", postcode: "CV10" },
      { slug: "chapel-end", name: "Chapel End", postcode: "CV10" },
      { slug: "bermuda-park", name: "Bermuda Park", postcode: "CV10" },
      { slug: "galley-common", name: "Galley Common", postcode: "CV10" },
      { slug: "hartshill", name: "Hartshill", postcode: "CV10" },
      { slug: "bedworth", name: "Bedworth", postcode: "CV12" },
      { slug: "bulkington", name: "Bulkington", postcode: "CV12" }
    ]
  },
  rugby: {
    name: "Rugby",
    region: "Rugby",
    postcodes: ["CV21", "CV22", "CV23"],
    areas: [
      { slug: "rugby", name: "Rugby Town Centre", postcode: "CV21" },
      { slug: "hillmorton", name: "Hillmorton", postcode: "CV21" },
      { slug: "bilton", name: "Bilton", postcode: "CV22" },
      { slug: "brownsover", name: "Brownsover", postcode: "CV21" },
      { slug: "cawston", name: "Cawston", postcode: "CV22" },
      { slug: "long-lawford", name: "Long Lawford", postcode: "CV23" },
      { slug: "new-bilton", name: "New Bilton", postcode: "CV21" },
      { slug: "dunchurch", name: "Dunchurch", postcode: "CV22" }
    ]
  },
  leamington: {
    name: "Leamington Spa",
    region: "Leamington Spa",
    postcodes: ["CV31", "CV32", "CV33"],
    areas: [
      { slug: "leamington-spa", name: "Royal Leamington Spa Town Centre", postcode: "CV31" },
      { slug: "milverton", name: "Milverton", postcode: "CV32" },
      { slug: "lillington", name: "Lillington", postcode: "CV32" },
      { slug: "sydenham", name: "Sydenham", postcode: "CV31" },
      { slug: "whitnash", name: "Whitnash", postcode: "CV31" },
      { slug: "heathcote", name: "Heathcote", postcode: "CV31" }
    ]
  },
  warwick: {
    name: "Warwick",
    region: "Warwick",
    postcodes: ["CV34", "CV35"],
    areas: [
      { slug: "warwick", name: "Warwick Town Centre", postcode: "CV34" },
      { slug: "woodloes-park", name: "Woodloes Park", postcode: "CV34" },
      { slug: "chase-meadow", name: "Chase Meadow", postcode: "CV34" },
      { slug: "warwick-gates", name: "Warwick Gates", postcode: "CV34" }
    ]
  },
  stratford: {
    name: "Stratford-upon-Avon",
    region: "Stratford-upon-Avon",
    postcodes: ["CV37"],
    areas: [
      { slug: "stratford-upon-avon", name: "Stratford-upon-Avon Town Centre", postcode: "CV37" },
      { slug: "tiddington", name: "Tiddington", postcode: "CV37" },
      { slug: "bishopton", name: "Bishopton", postcode: "CV37" },
      { slug: "shottery", name: "Shottery", postcode: "CV37" }
    ]
  },
  nearby: {
    name: "Nearby Towns & Villages",
    region: "Warwickshire",
    postcodes: ["CV4", "CV7", "CV8", "CV23", "CV47", "CV49"],
    areas: [
      { slug: "kenilworth", name: "Kenilworth", postcode: "CV8" },
      { slug: "balsall-common", name: "Balsall Common", postcode: "CV7" },
      { slug: "meriden", name: "Meriden", postcode: "CV7" },
      { slug: "hampton-in-arden", name: "Hampton-in-Arden", postcode: "CV7" },
      { slug: "wolston", name: "Wolston", postcode: "CV8" },
      { slug: "ryton-on-dunsmore", name: "Ryton-on-Dunsmore", postcode: "CV8" },
      { slug: "baginton", name: "Baginton", postcode: "CV8" },
      { slug: "brandon", name: "Brandon", postcode: "CV8" },
      { slug: "shilton", name: "Shilton", postcode: "CV7" },
      { slug: "brinklow", name: "Brinklow", postcode: "CV23" },
      { slug: "southam", name: "Southam", postcode: "CV47" },
      { slug: "studley", name: "Studley", postcode: "B80" },
      { slug: "alcester", name: "Alcester", postcode: "B49" }
    ]
  }
};
```

---

## SEO REQUIREMENTS

### Meta Tags (per page)
```html
<title>Emergency Locksmith [Area] | 24/7 | No VAT | Call Now</title>
<meta name="description" content="Locked out in [Area]? Local emergency
  locksmith, 15-30 min response. No VAT, no call-out fee. Call 07735 336175.">
<link rel="canonical" href="https://localemergencylocksmith.co.uk/areas/[slug]">
```

### Schema Markup (every page)
```json
{
  "@context": "https://schema.org",
  "@type": "Locksmith",
  "name": "Local Emergency Locksmith",
  "url": "https://localemergencylocksmith.co.uk",
  "telephone": "+447735336175",
  "email": "info@localemergencylocksmith.co.uk",
  "areaServed": [
    { "@type": "City", "name": "Coventry" },
    { "@type": "City", "name": "Nuneaton" },
    { "@type": "City", "name": "Rugby" },
    { "@type": "City", "name": "Leamington Spa" },
    { "@type": "City", "name": "Warwick" },
    { "@type": "City", "name": "Stratford-upon-Avon" }
  ],
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "00:00",
    "closes": "23:59"
  },
  "priceRange": "££",
  "paymentAccepted": "Cash, Card",
  "currenciesAccepted": "GBP"
}
```

### Sitemap
- Auto-generated via Next.js `sitemap.ts`
- Submit to Google Search Console on day 1

### robots.txt
```
User-agent: *
Allow: /
Sitemap: https://localemergencylocksmith.co.uk/sitemap.xml
```

---

## DESIGN RULES

### Colours
```
Primary:    #1B5E20 (dark green — trust, go, call)
Accent:     #FF6F00 (orange — urgency, CTA buttons)
Dark:       #1A1A1A
Light BG:   #F5F5F5
White:      #FFFFFF
```

### Typography
- Headings: Inter or DM Sans — bold, clean
- Body: Same family — 16px minimum on mobile
- Phone number: ALWAYS 24px+ on mobile

### Mobile-First Rules
1. Phone number visible without scrolling — ALWAYS
2. Sticky bottom CTA bar on mobile — ALWAYS
3. No hamburger menu — use simple visible links
4. Maximum 3 seconds load time (target < 1.5s with SSG)
5. Thumb-friendly tap targets (48px minimum)
6. No popups, no cookie banners blocking the phone number

---

## GOOGLE BUSINESS PROFILE (Do alongside website)

1. Create GBP at business.google.com
2. Category: "Emergency Locksmith" (primary) + "Locksmith" (secondary)
3. Service area: Coventry + all surrounding areas listed above
4. Add services with prices
5. Add photos (van, tools, locks, you working)
6. Get 5 reviews ASAP from friends/family/first customers
7. Post weekly updates (Google Posts)
8. NAP consistency: Name, Address, Phone must match website EXACTLY

---

## TECHNICAL BUILD ORDER (for Claude Code)

### Phase 1: Project Setup
```bash
npx create-next-app@latest localemergencylocksmith --typescript --tailwind --app --src-dir
cd localemergencylocksmith
```

### Phase 2: Core Components
Build these reusable components first:
1. `StickyHeader` — logo + phone number + call button
2. `MobileCallBar` — fixed bottom CTA on mobile
3. `TrustStrip` — the no-VAT / no-fee / 24-7 badges
4. `HeroSection` — H1 + subhead + call button (accepts area name as prop)
5. `ServiceCard` — icon + title + price + link
6. `AreaGrid` — grid of area links
7. `PriceTable` — services and prices
8. `CTABlock` — final call-to-action with phone
9. `SchemaMarkup` — JSON-LD component
10. `Footer` — phone, email, areas, legal links

### Phase 3: Data Layer
1. Create `/src/data/areas.ts` with all area data (from above)
2. Create `/src/data/services.ts` with service definitions
3. Create `/src/data/config.ts` with phone number, email, business name

### Phase 4: Page Generation
1. Build homepage (`/src/app/page.tsx`)
2. Build area template (`/src/app/areas/[slug]/page.tsx`)
3. Use `generateStaticParams()` to generate all ~95 area pages at build time
4. Build service pages
5. Build pricing page
6. Build contact page
7. Build area hub page

### Phase 5: SEO
1. Add `generateMetadata()` to every page with unique title/description
2. Create `sitemap.ts` in app root
3. Create `robots.ts`
4. Add JSON-LD schema to every page
5. Add Open Graph meta tags

### Phase 6: Deploy
1. Push to GitHub
2. Connect to Vercel
3. Point domain localemergencylocksmith.co.uk to Vercel
4. Submit sitemap to Google Search Console
5. Set up Google Business Profile

---

## CONTENT RULES

### Words to USE everywhere:
- "Local" / "Independent" / "Your local locksmith"
- "No VAT" / "No call-out fee" / "No hidden charges"
- "15-30 minute response"
- "24/7" / "365 days"
- "Emergency" / "Locked out?"
- Area names and postcodes (naturally, not stuffed)

### Words to AVOID:
- "We are a leading..." / "We pride ourselves..."
- "Competitive prices" (say the actual price instead)
- "Get in touch" (say "Call now" — it's an emergency)
- "Our team of experts" (it's you, keep it personal)
- Any corporate waffle

### Tone:
- Direct, human, urgent
- "Locked out in Earlsdon? I'll be there in 15 minutes. £59, no VAT, no surprises."
- First person where possible — "I'm your local Coventry locksmith"
- Short sentences. Short paragraphs. Big phone numbers.

---

## INTERNAL LINKING STRATEGY

Every area page links to:
- 4-6 neighbouring area pages ("Also covering nearby: [links]")
- Relevant service pages
- Pricing page
- Homepage

This creates a web of internal links that Google crawls efficiently and associates all pages with the "locksmith Coventry" topic cluster.

---

## LAUNCH CHECKLIST

- [ ] All ~95 area pages generated and rendering
- [ ] All service pages live
- [ ] Pricing page with real prices
- [ ] Phone number is real and rings
- [ ] Click-to-call works on mobile
- [ ] Google Search Console verified + sitemap submitted
- [ ] Google Business Profile created
- [ ] Schema markup validates (test at schema.org validator)
- [ ] Page speed < 2 seconds (test at PageSpeed Insights)
- [ ] Mobile responsive — phone number visible without scroll
- [ ] SSL certificate active (Vercel handles this)
- [ ] Meta titles and descriptions unique per page
- [ ] No placeholder text remaining
- [ ] Domain pointing correctly

---

*AIOS — Ross Alinari Artificial Intelligence Operating System*
*Build Plan — March 2026*