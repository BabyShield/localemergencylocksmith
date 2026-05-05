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
[LOGO]  LOCAL EMERGENCY LOCKSMITH   [CALL NOW: 024 7522 4730]  ← click-to-call
        Coventry & Surrounding Areas  [Big green/orange button]
```
- Phone number visible WITHOUT scrolling on mobile
- Click-to-call `<a href="tel:+442475224730">`
- No hamburger menu hiding the phone number

### Sticky Footer CTA (mobile only)
```
Fixed bottom bar: [📞 CALL NOW - 024 7522 4730]
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
            response. No VAT, no call-out fee. Call 024 7522 4730 now."
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
Phone: 024 7522 4730 (click-to-call)
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
  locksmith, 15-30 min response. No VAT, no call-out fee. Call 024 7522 4730.">
<link rel="canonical" href="https://localemergencylocksmith.co.uk/areas/[slug]">
```

### Schema Markup (every page)
```json
{
  "@context": "https://schema.org",
  "@type": "Locksmith",
  "name": "Local Emergency Locksmith",
  "url": "https://localemergencylocksmith.co.uk",
  "telephone": "+442475224730",
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
# CLAUDE CODE BUILD PLAN #2
## SEO Area Articles — localemergencylocksmith.co.uk

**Purpose:** 10 SEO articles per area = ~950 unique pages targeting long-tail locksmith keywords across every area we serve.
**Approach:** 10 article TEMPLATES generated dynamically for each of the ~95 areas. Not 950 manually written articles — 10 templates × 95 areas = 950 unique URLs with localised content.

---

## STRATEGY

Someone in Earlsdon at midnight googling "locked out of house Earlsdon" or "how to open a locked uPVC door" needs to land on YOUR site — not a national call centre. These articles:

1. Capture long-tail searches Google loves
2. Build topical authority ("this site knows everything about locks in Coventry")
3. Create internal links back to area pages and service pages
4. Give Google 950 reasons to rank you

---

## URL STRUCTURE

```
/blog/[area-slug]/[article-slug]

Examples:
/blog/earlsdon/locked-out-at-night
/blog/tile-hill/upvc-door-lock-problems
/blog/rugby/how-much-does-emergency-locksmith-cost
/blog/nuneaton/lock-change-after-burglary
/blog/kenilworth/yale-vs-deadlock-which-is-safer
```

---

## THE 10 ARTICLE TEMPLATES

Each template has a fixed structure but every instance is localised with area name, postcode, nearby areas, and local references.

---

### ARTICLE 1: "Locked Out of Your Home in [Area]? Here's What to Do"

**Target keywords:** locked out [area], locked out of house [area], what to do when locked out [area]

**Structure:**
```
H1: Locked Out of Your Home in [Area]? Here's What to Do

P: It's [late at night / freezing cold / pouring rain] and you've
   just realised your keys are on the other side of a locked door
   in [Area]. Don't panic. Here's exactly what to do.

H2: Step 1 — Don't Try to Force the Door
- Explain why forcing entry damages door/frame and costs more
- Mention uPVC doors specifically (common in [Postcode] area)
- "A professional locksmith can open most doors without damage"

H2: Step 2 — Check Other Entry Points (Safely)
- Back door, windows left on vent
- Don't climb or break anything
- If you're locked out late at night in [Area], safety first

H2: Step 3 — Call a Local Locksmith, Not a National Call Centre
- National companies charge £150-250+ (they add VAT + dispatch fees)
- I'm based locally and cover [Area] and [Postcode] — no middleman
- "When you call 024 7522 4730, you speak to me directly"

H2: How Fast Can I Get to [Area]?
- [Area] is within my core coverage zone
- Typical response time: 15-30 minutes
- I cover [Area] and nearby [3-4 neighbouring areas with links]

H2: How Much Does It Cost?
- Emergency lockout from £59
- No VAT — I'm an independent locksmith, not a limited company
- No call-out fee — the price I quote is the price you pay
- Price confirmed before I start any work

H2: What If My Lock Needs Replacing?
- Sometimes the lock is damaged or too old to pick
- Lock replacement from £69 (includes new lock + fitting)
- I carry common lock types in my van — Yale, ERA, Avocet, etc.

CTA: Locked out in [Area] right now? Call 024 7522 4730 — I answer 24/7.

INTERNAL LINKS:
- /areas/[area-slug] (area page)
- /services/emergency-lockout
- /prices
- /blog/[area-slug]/how-much-does-emergency-locksmith-cost
```

---

### ARTICLE 2: "How Much Does an Emergency Locksmith Cost in [Area]?"

**Target keywords:** locksmith cost [area], emergency locksmith price [area], how much locksmith [area]

**Structure:**
```
H1: How Much Does an Emergency Locksmith Cost in [Area]?

P: If you're locked out in [Area] and searching for prices,
   here's a straight answer — no "call for a quote" nonsense.

H2: My Prices for [Area] ([Postcode])
- Emergency lockout: from £59
- Lock change (standard Yale): from £69
- Lock change (BS3621 deadlock): from £79
- uPVC door lock repair: from £59
- uPVC door lock replacement: from £89
- Boarding up: from £79
- No VAT on any price
- No call-out fee
- No extra charge for evenings or weekends

H2: Why Are National Locksmith Companies So Expensive?
- They charge £150-250 for the same job
- Breakdown: call centre fee + dispatcher margin + VAT + "emergency surcharge"
- You're paying for a brand name, not a better locksmith
- "I do the same work for less because there's no middleman"

H2: Why I Don't Charge VAT
- I'm a sole trader / independent locksmith
- Below VAT threshold = no VAT on any work
- That saves you 20% compared to any limited company
- "The £59 I quote is £59 you pay. Not £59 + VAT = £70.80"

H2: What Affects the Price?
- Lock type (Yale, mortice, euro cylinder, multipoint)
- Time of day (I DON'T charge extra but others do)
- Whether lock needs replacing vs just opening
- "I'll always confirm the price before starting"

H2: How to Avoid Locksmith Scams in [Area]
- Never use a locksmith who won't give a price on the phone
- Check they're genuinely local (ask what postcode they're based in)
- Avoid Google Ads results that show London numbers for [Area]
- "I'm local to [Region] — you can verify by checking my reviews"

CTA: Need a price right now? Call 024 7522 4730 — I'll quote over the phone in 30 seconds.

INTERNAL LINKS:
- /prices
- /areas/[area-slug]
- /services/emergency-lockout
- /blog/[area-slug]/locked-out-at-night
```

---

### ARTICLE 3: "uPVC Door Lock Problems in [Area] — Common Issues & Fixes"

**Target keywords:** upvc door lock problems [area], upvc door won't lock [area], upvc door lock repair [area]

**Structure:**
```
H1: uPVC Door Lock Problems in [Area] — Common Issues & Fixes

P: uPVC doors are the most common door type in [Area] and across
   [Postcode] postcodes. They're also the most common reason people
   call me. Here are the problems I see every week — and what to do.

H2: The Door Won't Lock or Unlock Properly
- Multipoint locking mechanism has failed
- Common in doors 8-15 years old
- Usually the gearbox inside the door has worn out
- Fix: replace the multipoint lock mechanism (from £89)

H2: Key Turns But the Door Won't Open
- Broken euro cylinder or snapped key inside
- DON'T try to force it — you'll damage the gearbox
- Fix: replace the euro cylinder (from £59)

H2: Door Drops and Won't Close Properly
- Hinges have worn or door has expanded
- The locking points no longer align with the frame
- Fix: adjust hinges + realign keeps (from £49)

H2: The Handle Is Loose or Floppy
- Internal spring mechanism broken
- Very common in [Area] — especially in houses built 2000-2015
- Fix: replace handle set (from £39)

H2: Door Locked and You Can't Get In
- Euro cylinder lock can snap if poor quality
- Burglars exploit cheap euro cylinders (anti-snap upgrades recommended)
- Fix: emergency entry + new anti-snap cylinder (from £79)

H2: When to Repair vs Replace Your uPVC Door Lock
- If the door is less than 10 years old: usually repair
- If the mechanism has failed completely: replace
- If you've been burgled: replace + upgrade to anti-snap
- "I carry all common parts in my van — most repairs done in one visit"

CTA: uPVC door playing up in [Area]? Call 024 7522 4730 for a quick fix.

INTERNAL LINKS:
- /services/upvc-lock-repair
- /areas/[area-slug]
- /blog/[area-slug]/yale-vs-deadlock-which-is-safer
```

---

### ARTICLE 4: "Should You Change Your Locks After a Break-In in [Area]?"

**Target keywords:** change locks after burglary [area], lock change after break in [area], burglary locksmith [area]

**Structure:**
```
H1: Should You Change Your Locks After a Break-In in [Area]?

P: Yes. Immediately. Here's why and what to do if you've been
   burgled in [Area].

H2: Why You Must Change Locks After a Burglary
- Intruders may have copied your keys
- They know your lock type and its weaknesses now
- Insurance companies may require lock changes for the claim
- Police will advise lock replacement in their crime report

H2: What to Do Straight After a Break-In
1. Call the police — you need a crime reference number
2. Don't touch anything until police have been
3. Call your insurance company
4. Call a locksmith to secure the property
5. Take photos of damage for your insurer

H2: What Locks Should You Upgrade To?
- BS3621 mortice deadlock (insurance-approved standard)
- Anti-snap euro cylinders for uPVC doors
- British Standard 3-star cylinder + handle set
- "I'll advise you on what your insurer requires"

H2: Insurance Lock Requirements
- Most home insurance requires BS3621 on final exit doors
- Some require specific cylinder ratings
- "I can check your policy requirements and fit compliant locks"
- Keep my receipt — your insurer will need it

H2: Same-Day Lock Change in [Area]
- I carry all common locks in my van
- Same-day service across [Area] and [Postcode]
- Lock change from £69 (standard) or £79 (BS3621)
- "I provide a receipt and can write a report for your insurer"

CTA: Been burgled in [Area]? Call 024 7522 4730 — I can be there within 30 minutes to secure your home.

INTERNAL LINKS:
- /services/lock-change
- /services/lock-upgrade
- /areas/[area-slug]
- /blog/[area-slug]/yale-vs-deadlock-which-is-safer
```

---

### ARTICLE 5: "Yale vs Deadlock — Which Lock Is Safer for Your [Area] Home?"

**Target keywords:** best lock for front door, yale vs deadlock, home security locks [area], BS3621 lock [area]

**Structure:**
```
H1: Yale vs Deadlock — Which Lock Is Safer for Your Home in [Area]?

P: Most front doors in [Area] have a Yale-type latch lock. Most
   of them can be opened in under 30 seconds by a burglar. Here's
   what you need to know.

H2: Yale (Nightlatch) Locks — How Secure Are They?
- Standard Yale: very poor security — can be opened with a credit card
- Deadlocking Yale: better, but still not insurance-approved alone
- "I see break-ins in [Area] every month caused by cheap Yale locks"

H2: 5-Lever Mortice Deadlocks — The Insurance Standard
- BS3621 is the British Standard for door locks
- Required by virtually all home insurance policies
- Much harder to force, pick, or snap
- Fitted into the door edge — not surface-mounted like a Yale

H2: What Your Insurance Actually Requires
- Most policies: BS3621 deadlock on every final exit door
- Some also require window locks
- "If you're unsure, I can check and advise — call me"

H2: The Best Setup for a Front Door in [Area]
- Yale nightlatch (for convenience) PLUS BS3621 deadlock (for security)
- Both should be used — Yale alone is not enough
- Anti-snap euro cylinder if you have a uPVC door
- "This combination satisfies all insurers and costs from £79 fitted"

H2: Free Security Check
- "If you live in [Area] I'll quickly check your locks for free
   when I'm doing any other job nearby — just ask"

CTA: Want to know if your locks are up to standard? Call 024 7522 4730.

INTERNAL LINKS:
- /services/lock-upgrade
- /services/lock-change
- /areas/[area-slug]
- /blog/[area-slug]/lock-change-after-burglary
```

---

### ARTICLE 6: "How to Find a Trustworthy Locksmith in [Area] (and Avoid Scams)"

**Target keywords:** locksmith scam [area], how to find locksmith [area], trustworthy locksmith [area], fake locksmith

**Structure:**
```
H1: How to Find a Trustworthy Locksmith in [Area] (and Avoid Scams)

P: The locksmith industry has a serious problem with scams —
   especially in emergency situations. Here's how to protect
   yourself in [Area].

H2: The #1 Scam: National Call Centres Pretending to Be Local
- You Google "locksmith [Area]"
- You call a number — it goes to a London/Manchester call centre
- They dispatch whoever's available (not necessarily qualified)
- They charge £150-250+ including VAT and "emergency fees"
- The "locksmith" drills your lock unnecessarily to charge for replacement

H2: Red Flags to Watch For
- Won't give a fixed price on the phone
- Gives a low phone quote then charges more on arrival
- Asks for payment before starting work
- Arrives in an unmarked van
- Wants to drill the lock immediately without trying non-destructive entry
- Can't tell you their business address

H2: How to Check a Locksmith Is Genuine
- Ask: "What postcode are you based in?"
- Check Google Reviews (real reviews mention the person by name)
- Check they have a real Google Business Profile with [Area] address
- A genuine local locksmith will quote a fixed price on the phone
- "When you call me, you get me — I answer my own phone"

H2: What a Legitimate Locksmith Should Do
- Quote a price on the phone before coming out
- Arrive in a sign-written or identifiable vehicle
- Try non-destructive entry first
- Explain what they're doing and why
- Confirm the final price before starting
- Provide a receipt

H2: Why I'm Different
- I live and work in [Region] — I'm not a call centre
- I quote fixed prices on the phone — the price I say is the price you pay
- I try non-destructive entry first — always
- No VAT, no call-out fee, no hidden charges
- "Check my Google Reviews — real [Area] customers, real names"

CTA: Need a locksmith you can trust in [Area]? Call 024 7522 4730.

INTERNAL LINKS:
- /areas/[area-slug]
- /blog/[area-slug]/how-much-does-emergency-locksmith-cost
- /blog/[area-slug]/locked-out-at-night
```

---

### ARTICLE 7: "Best Door Locks for Security in [Area] — 2026 Guide"

**Target keywords:** best door locks 2026, home security locks [area], anti-snap locks [area], secure locks [area]

**Structure:**
```
H1: Best Door Locks for Security in [Area] — 2026 Guide

P: Whether you've just moved into a new home in [Area] or want to
   upgrade your security after a nearby break-in, here are the
   locks I recommend and fit every day.

H2: For Wooden Front Doors
- BS3621 5-lever mortice deadlock (insurance requirement)
- Recommended brands: ERA Fortress, Union 2134, Yale PM562
- Combined with a good nightlatch for daily use
- Fitted from £79

H2: For uPVC Doors
- Anti-snap euro cylinder (3-star rated)
- Recommended brands: Avocet ABS, Ultion, Yale Platinum
- "I fit Avocet ABS as standard — they come with a £2,000 burglary guarantee"
- Fitted from £79

H2: For Back Doors & Side Doors
- BS3621 mortice deadlock (same standard as front)
- Key-operated — no thumb turn on external doors
- "Back doors are the most common entry point for burglars in [Area]"

H2: For Windows
- Window locks with keys (not just snib locks)
- Sash window locks for older properties in [Area]
- "Most burglars check windows before doors"

H2: Smart Locks — Are They Worth It?
- Convenient but NOT more secure than a good mechanical lock
- Yale Conexis, Nuki, Ultion Nuki
- "If you want smart access, I recommend a smart lock AS WELL AS
   a mechanical deadlock — never replace your deadlock with a smart lock"

H2: Free Security Advice
- "Call me for a free chat about your locks — I'll tell you what
   needs upgrading and what's fine as it is. No sales pressure."

CTA: Want your locks checked or upgraded in [Area]? Call 024 7522 4730.

INTERNAL LINKS:
- /services/lock-upgrade
- /services/lock-change
- /areas/[area-slug]
- /blog/[area-slug]/yale-vs-deadlock-which-is-safer
```

---

### ARTICLE 8: "Lost Your Keys in [Area]? What to Do Next"

**Target keywords:** lost keys [area], lost house keys what to do, key replacement [area], new keys cut [area]

**Structure:**
```
H1: Lost Your Keys in [Area]? What to Do Next

P: Lost your house keys somewhere in [Area]? Here's the priority
   checklist — what to do right now, and what to do tomorrow.

H2: Priority 1 — Can You Get Into Your Home?
- If locked out: call me on 024 7522 4730 (emergency lockout from £59)
- If you have a spare key / someone can let you in: you have time

H2: Priority 2 — Where Were Your Keys Lost?
- If stolen (bag theft, pickpocket): change locks TODAY
- If lost (dropped somewhere): change locks within 24-48 hours
- If you think they're just at a friend's house: still consider changing
- "If your keys had your address on them or near your address — change locks immediately"

H2: Priority 3 — Change the Locks
- Anyone who finds your keys could try your door
- Lock change from £69 — same day in [Area]
- I can do all locks in one visit (front + back + side)
- New keys provided on the spot

H2: Priority 4 — Make Spare Keys
- I can cut spare keys during the same visit
- Tip: leave a spare with a trusted neighbour in [Area]
- Don't hide a key under the mat, in a plant pot, or in a "secret" rock

H2: Does Insurance Cover Lost Keys?
- Some home insurance includes key replacement cover
- Check your policy — you may be able to claim my invoice
- "I provide proper receipts for all work"

CTA: Lost your keys in [Area]? Call 024 7522 4730 — I can change your locks today.

INTERNAL LINKS:
- /services/lock-change
- /services/emergency-lockout
- /areas/[area-slug]
- /blog/[area-slug]/lock-change-after-burglary
```

---

### ARTICLE 9: "Emergency Boarding Up in [Area] — After Break-In or Damage"

**Target keywords:** boarding up [area], emergency boarding up [area], board up after burglary [area], broken door [area]

**Structure:**
```
H1: Emergency Boarding Up in [Area] — After a Break-In or Damage

P: If your door or window has been smashed in [Area] — whether
   from a burglary, storm damage, or accident — I can board it
   up fast to secure your home tonight.

H2: When You Need Emergency Boarding Up
- After a break-in (door or window forced)
- Storm damage (window blown in, door damaged)
- Accident (vehicle impact, vandalism)
- Fire damage (door/window compromised)
- "Your home needs to be secure before you sleep"

H2: How Fast Can I Get There?
- [Area] is within my core coverage — 15-30 minute response
- Available 24/7 including bank holidays
- "Call me first, then call the police / insurance"

H2: What I Do
- Board up broken doors and windows with marine-grade plywood
- Fit temporary locks where possible
- Make the property secure enough to sleep in
- "Boarding up is a temporary fix — I can return to fit proper
   replacements the next day"

H2: Boarding Up Prices
- Emergency boarding up from £79
- Includes materials, labour, call-out
- No VAT
- "If you also need a lock change, I'll do both in one visit"

H2: Insurance Claims
- Take photos of all damage before I board up
- Keep my receipt — your insurer will cover boarding up costs
- "I can provide a written breakdown for your insurer"

CTA: Need emergency boarding up in [Area]? Call 024 7522 4730 — I'll be there fast.

INTERNAL LINKS:
- /services/boarding-up
- /areas/[area-slug]
- /blog/[area-slug]/lock-change-after-burglary
```

---

### ARTICLE 10: "Landlord Lock Change in [Area] — Between Tenants"

**Target keywords:** landlord lock change [area], change locks between tenants [area], rental property locksmith [area], landlord locksmith [area]

**Structure:**
```
H1: Landlord Lock Change in [Area] — Between Tenants

P: If you're a landlord in [Area] with properties across [Postcode]
   postcodes, changing locks between tenants isn't optional — it's
   essential. Here's what you need and what it costs.

H2: Why Change Locks Between Every Tenancy
- Previous tenants may have copied keys
- Their friends, partners, ex-partners may have copies
- You're liable if a former tenant enters and causes harm
- "I do lock changes for landlords in [Area] every week"

H2: What Locks Are Required for Rental Properties
- All final exit doors: BS3621 deadlock (insurance + mortgage requirement)
- Window locks on all accessible windows
- Fire-rated locks on HMO room doors (if applicable)
- Anti-snap euro cylinders on uPVC doors

H2: Landlord Pricing
- Single lock change: from £69
- Full property (front + back + uPVC): from £149
- HMO room locks: from £49 per door
- Multiple properties: ask about my landlord rate
- No VAT on any price

H2: Bulk & Regular Work
- I offer a standing arrangement for landlords in [Area]
- "Call me when a tenant moves out — I'll change the locks
   before the new tenant moves in, same day"
- I can also do property security checks between tenancies

H2: Key Management
- I provide 3 keys per lock as standard
- Additional keys cut during the visit
- Master key systems available for HMOs

CTA: Landlord in [Area]? Call 024 7522 4730 for a quick lock change quote.

INTERNAL LINKS:
- /services/lock-change
- /areas/[area-slug]
- /blog/[area-slug]/best-door-locks-security-guide
- /blog/[area-slug]/yale-vs-deadlock-which-is-safer
```

---

## TECHNICAL IMPLEMENTATION

### File Structure
```
/src/app/blog/[areaSlug]/[articleSlug]/page.tsx   → Dynamic route
/src/data/articles.ts                              → 10 article templates
/src/data/areas.ts                                 → Area data (from Build Plan #1)
```

### How It Works

```typescript
// /src/data/articles.ts

export const articleTemplates = [
  {
    slug: "locked-out-at-night",
    titleTemplate: "Locked Out of Your Home in {area}? Here's What to Do",
    metaTemplate: "Locked out in {area}? Local emergency locksmith, 15-30 min response. No VAT. Call 024 7522 4730.",
    // Full content template with {area}, {postcode}, {region}, {neighbours} placeholders
  },
  {
    slug: "how-much-does-emergency-locksmith-cost",
    titleTemplate: "How Much Does an Emergency Locksmith Cost in {area}?",
    metaTemplate: "Emergency locksmith prices in {area}. Lockout from £59, lock change from £69. No VAT, no call-out fee.",
  },
  // ... 8 more
];
```

### Page Generation

```typescript
// /src/app/blog/[areaSlug]/[articleSlug]/page.tsx

export async function generateStaticParams() {
  const params = [];
  for (const region of Object.values(areas)) {
    for (const area of region.areas) {
      for (const article of articleTemplates) {
        params.push({
          areaSlug: area.slug,
          articleSlug: article.slug,
        });
      }
    }
  }
  return params; // ~950 pages
}
```

### Content Generation Rules

Each article MUST have unique content per area. Not just find-replace of area name. Include:

1. **Area name** — in H1, first paragraph, subheadings, CTA
2. **Postcode** — mentioned 2-3 times naturally
3. **Neighbouring areas** — 3-4 links to nearby area articles
4. **Regional reference** — "across Coventry and Warwickshire" or "in the Rugby area"
5. **Local flavour** — vary the opening paragraphs:
   - Coventry City Centre: "in the city centre late at night"
   - Earlsdon: "in the quiet streets of Earlsdon"
   - Tile Hill: "on the west side of Coventry in Tile Hill"
   - Rugby: "in Rugby town or the surrounding villages"

### Avoid Duplicate Content Penalties

Google will penalise 950 identical pages with just the area name swapped. Each page needs:

1. **Unique opening paragraph** (at least the first 2-3 sentences vary per area)
2. **Different neighbouring area links** per page
3. **Area-specific details** where possible (postcode, distance from Coventry, etc.)
4. **Varied sentence structures** — don't use the exact same sentences across all 95 versions

**Implementation approach:** Create 3-4 content variations per article template. Assign variations based on region (Coventry areas get variation A, Nuneaton gets B, Rugby gets C, etc.). This gives enough uniqueness across the 950 pages.

---

## INTERNAL LINKING MATRIX

Every blog article links to:
- Its own area page: `/areas/[area-slug]`
- 2 related service pages
- 2 other blog articles from the same area
- 1 blog article from a neighbouring area (cross-area linking)
- Pricing page: `/prices`

This creates a dense internal link web that Google reads as "this entire site is about locksmith services in Coventry & Warwickshire."

---

## SCHEMA MARKUP PER ARTICLE

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[Article Title with Area]",
  "author": {
    "@type": "Person",
    "name": "Local Emergency Locksmith"
  },
  "publisher": {
    "@type": "LocalBusiness",
    "name": "Local Emergency Locksmith",
    "telephone": "+442475224730"
  },
  "datePublished": "2026-03-16",
  "areaServed": {
    "@type": "Place",
    "name": "[Area Name]"
  }
}
```

For articles with Q&A sections, also add FAQPage schema.

---

## BUILD ORDER FOR CLAUDE CODE

```
1. Create /src/data/articles.ts with all 10 article templates
2. Create content variation system (3-4 variations per template per region)
3. Build /src/app/blog/[areaSlug]/[articleSlug]/page.tsx
4. Add generateStaticParams() to generate all ~950 routes
5. Add generateMetadata() with unique title/desc per page
6. Add JSON-LD schema to every article
7. Add internal links component (neighbouring articles + services)
8. Add breadcrumbs: Home > Blog > [Area] > [Article Title]
9. Add "Other articles about [Area]" sidebar/section
10. Add CTA block with phone number to every article
11. Build /blog page (article hub — latest/all articles)
12. Build /blog/[areaSlug] page (all 10 articles for that area)
13. Update sitemap.ts to include all blog URLs
14. Test: verify unique titles, unique meta descriptions, unique content
15. Test: verify all internal links resolve
16. Deploy and submit updated sitemap to Google Search Console
```

---

## CONTENT CALENDAR (Post-Launch)

After the initial 950 pages are live, add 1 new article topic per month across all areas:

- Month 1: "Locksmith Prices in [Area] — Updated 2026"
- Month 2: "Is Your Home Secure? A [Area] Security Checklist"
- Month 3: "Moving House in [Area]? Don't Forget to Change the Locks"
- Month 4: "Winter Lock Problems in [Area] — Frozen & Stiff Locks"
- Month 5: "Smart Locks vs Traditional Locks in [Area] — Honest Comparison"
- Month 6: "How Burglars Break Into Homes in [Area] (And How to Stop Them)"

Each new article template = ~95 new pages = ~95 new Google rankings.

---

## EXPECTED SEO IMPACT

- **Week 1-2:** Google indexes all 950 pages via sitemap
- **Week 2-4:** Long-tail keywords start appearing in Search Console
- **Month 1-2:** Area pages climb for "[service] locksmith [area]" searches
- **Month 2-3:** Blog articles start ranking for question-based searches
- **Month 3-6:** Domain authority builds — main keywords hit page 1

The speed depends on:
1. Google Business Profile reviews (get 10+ fast)
2. NAP consistency (name/address/phone same everywhere)
3. A few backlinks (local directories, Yell, Checkatrade, etc.)

---

*AIOS — Ross Alinari Artificial Intelligence Operating System*
*Build Plan #2 — SEO Area Articles — March 2026*
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
[LOGO]  LOCAL EMERGENCY LOCKSMITH   [CALL NOW: 024 7522 4730]  ← click-to-call
        Coventry & Surrounding Areas  [Big amber button]
```
- Phone number visible WITHOUT scrolling on mobile
- Click-to-call `<a href="tel:+442475224730">`
- No hamburger menu hiding the phone number

### Sticky Footer CTA (mobile only)
```
Fixed bottom bar: [📞 CALL NOW - 024 7522 4730]
```
- Always visible on mobile
- Amber background, navy text — maximum contrast and urgency

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
            response. No VAT, no call-out fee. Call 024 7522 4730 now."
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
Phone: 024 7522 4730 (click-to-call)
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
  locksmith, 15-30 min response. No VAT, no call-out fee. Call 024 7522 4730.">
<link rel="canonical" href="https://localemergencylocksmith.co.uk/areas/[slug]">
```

### Schema Markup (every page)
```json
{
  "@context": "https://schema.org",
  "@type": "Locksmith",
  "name": "Local Emergency Locksmith",
  "url": "https://localemergencylocksmith.co.uk",
  "telephone": "+442475224730",
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
Primary:      #0F1B2D (deep navy — trust, authority, emergency-service feel)
Primary Alt:  #162438 (slightly lighter navy — cards, feature boxes, footer)
CTA:          #FFB800 (strong amber — urgency, hazard, "call now" psychology)
CTA Hover:    #FFC933 (lighter amber — hover/active states)
Dark Text:    #1A1A1A (near-black — body text on white backgrounds)
Light BG:     #F7F7F5 (warm off-white — section backgrounds)
White:        #FFFFFF (cards, content areas)
Success:      #22C55E (green — checkmarks, "available now" indicators only)
```

**Colour rules:**
- Hero section: navy background, white text, amber H1 keyword, amber CTA button
- Trust strip: amber background, navy text (maximum contrast + readability)
- Feature boxes: navy background, amber headings, white subtext
- CTA buttons: ALWAYS amber bg + navy text — never the reverse
- Service cards: white bg, navy headings, amber price text, amber "learn more" links
- Footer: dark navy (#0F1B2D), amber headings, white/grey links
- Sticky mobile bar: amber bg, navy text + phone icon
- Body text: dark (#1A1A1A) on white, never grey-on-grey
- Green (#22C55E) used ONLY for checkmarks and "available" dots — never as a background
- NO orange anywhere — amber only
- NO green backgrounds — navy + amber + white only

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