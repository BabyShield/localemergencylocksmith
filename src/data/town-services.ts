// Hand-written town-specific service page content — 7 towns x 5 services.
// Every entry was drafted from the town's real housing/area data in areas.ts
// and checked for UK English, honest response times/prices, and uniqueness.
// Only towns listed here get /areas/[town]/[service] pages; all other
// area x service URLs 301 to the parent area (see next.config.ts TOWN_SLUGS —
// keep that list in sync with this file).

export interface TownServiceContent {
  service: string
  metaTitle: string
  metaDescription: string
  h1: string
  intro: string[]
  localAngleHeading: string
  localAngleBody: string
  commonJobs: string[]
  faqs: { q: string; a: string }[]
  priceNote: string
}

export const TOWN_SLUGS: { slug: string; name: string }[] = [
  { slug: 'nuneaton', name: 'Nuneaton' },
  { slug: 'bedworth', name: 'Bedworth' },
  { slug: 'rugby', name: 'Rugby' },
  { slug: 'leamington-spa', name: 'Leamington Spa' },
  { slug: 'warwick', name: 'Warwick' },
  { slug: 'kenilworth', name: 'Kenilworth' },
  { slug: 'stratford-upon-avon', name: 'Stratford-upon-Avon' },
]

export const TOWN_SERVICES: Record<string, TownServiceContent[]> = {
  "nuneaton": [
    {
      "service": "emergency-lockout",
      "metaTitle": "Emergency Lockout Nuneaton | From £59 | No VAT | 24/7",
      "metaDescription": "Locked out in Nuneaton? I reach most CV11 addresses in 20-30 minutes, day or night. Non-destructive entry first, from £59. Call Ross on 024 7522 4730.",
      "h1": "Emergency Lockout Locksmith in Nuneaton",
      "intro": [
        "If you're stood outside your front door in Nuneaton with no way in, call me on 024 7522 4730 and I'll head straight over. I'm an independent locksmith based in Coventry, and the A444 brings me into town quickly — I reach most CV11 addresses within 20-30 minutes, whether you're in a terrace off Abbey Street or out on one of the newer estates. I answer the phone myself, day or night.",
        "Non-destructive entry always comes first. Most lockouts — a slammed door on a nightlatch, keys lost on a night out, a key snapped off in a worn mortice lock — can be opened without damaging the door or the lock. I carry the tools for snapped key extraction and can usually leave your existing lock working exactly as it was. If a lock genuinely has to be drilled, I'll tell you before I touch it and fit a replacement on the same visit.",
        "Pricing is straightforward: lockouts start from £59, there's no VAT on top and no call-out fee, and I'll confirm the price on the phone before I set off so there are no surprises when I arrive."
      ],
      "localAngleHeading": "Lockouts in Nuneaton's Town Centre Terraces",
      "localAngleBody": "A high proportion of my Nuneaton lockout calls come from the Victorian and Edwardian terraces around Abbey Street, Queen's Road, and the streets off Bond Gate. Many of these red-brick houses still have their original solid wood doors with five-lever mortice locks, and the failure patterns are predictable: nightlatches that give up without warning, keys that snap off in mortice locks worn smooth by decades of use, and jammed cylinders on the uPVC doors fitted as replacements over the years. Further out, lockouts in Attleborough and Whitestone tend to involve the mix of original and replacement doors on the 1950s and 1960s semis, while Horeston Grange calls are usually composite doors with multipoint locks. I carry a comprehensive kit that covers all of it, so one visit is normally enough.",
      "commonJobs": [
        "Opening slammed nightlatch doors on the terraces around Abbey Street and Queen's Road",
        "Extracting snapped keys from worn mortice locks in the town centre",
        "Gaining entry to composite doors on Horeston Grange after lost keys",
        "Freeing jammed cylinders on uPVC replacement doors in Attleborough and Whitestone",
        "Late-night lockouts at the modern apartments near Nuneaton railway station"
      ],
      "faqs": [
        {
          "q": "Will you damage my door getting me back in?",
          "a": "Almost never. Non-destructive entry is always my first approach, and most Nuneaton lockouts — slammed nightlatches, locked uPVC doors — are opened with no damage at all. If a lock is genuinely beyond picking or bypassing, I'll explain why before drilling and fit a working replacement on the same visit, so you're never left unsecured."
        },
        {
          "q": "My key has snapped off in the lock — can you get it out?",
          "a": "Yes. Snapped keys in worn mortice locks are one of my most common calls in Nuneaton's older terraces. I extract the broken section without damaging the lock wherever possible, then check why it snapped — usually a worn mechanism binding on the key. If the lock is past its best, I can replace it there and then."
        },
        {
          "q": "Do you attend Nuneaton lockouts in the middle of the night?",
          "a": "Yes — I'm genuinely 24 hours, and I answer the phone myself rather than passing calls to a national call centre. The A444 is quiet at night, so the 20-30 minute response applies at 3am just as it does at 3pm. Call 024 7522 4730 whenever you're stuck."
        },
        {
          "q": "What do you need from me to prove it's my home?",
          "a": "Photo ID showing the address is ideal, but I know people get locked out without their wallet. Once the door is open, post or documents in your name inside will do. If you can't show any connection to the property, I won't open it — that protects every homeowner in Nuneaton, including you."
        }
      ],
      "priceNote": "Emergency lockouts in Nuneaton start from £59 with no VAT and no call-out fee — I'll confirm the exact price on the phone before I travel."
    },
    {
      "service": "lock-change",
      "metaTitle": "Lock Change Nuneaton | From £69 | No VAT | 24/7",
      "metaDescription": "Lock changes across Nuneaton from £69 — moving house, lost keys, end of tenancy. BS3621 options fitted. 20-30 minute response. Call 024 7522 4730.",
      "h1": "Lock Change & Replacement in Nuneaton",
      "intro": [
        "Moving into a new house in Nuneaton? Taking a rental property back at the end of a tenancy? A lock change is the only way to be certain who can open your door, and I fit new locks across the whole of CV11 and the CV10 suburbs, usually on the same day you call. From my base in Coventry it's a straightforward run up the A444, and I typically reach Nuneaton addresses within 20-30 minutes.",
        "I fit BS3621 five-lever mortice locks on timber doors — the standard most home insurance policies ask for — and replacement euro cylinders on uPVC and composite doors. Whether it's one front door or every lock in the house after a burglary or a lost set of keys, I carry the stock to finish the job in a single visit.",
        "Lock changes start from £69. The final price depends on the lock type and how many doors need doing, so I'll ask a couple of questions and confirm the cost on the phone before I travel — no VAT added, no call-out fee."
      ],
      "localAngleHeading": "Lock Changes for Nuneaton's Rental Market and Older Terraces",
      "localAngleBody": "Nuneaton has a significant rental market, and lock changes between tenancies make up a steady share of my work here — landlords and letting agents across the town centre, Attleborough, and Stockingford call me when keys change hands. The housing stock shapes what I fit: the red-brick terraces around Abbey Street and Queen's Road mostly have solid wood doors that take five-lever mortice locks, and where the existing lock isn't BS3621 rated I'll fit one that is, so the property meets insurance requirements. The 1950s and 1960s semis in Attleborough and Whitestone carry a real mix of original and replacement doors, so I bring both mortice locks and euro cylinders to every job. On Horeston Grange and the newer estates it's almost always a euro cylinder swap in a composite door.",
      "commonJobs": [
        "Full lock changes for buyers moving into 1950s and 1960s semis in Attleborough and Whitestone",
        "Between-tenancy lock changes for landlords with terraces in the town centre",
        "Replacing non-BS3621 mortice locks on solid wood doors around Abbey Street and Queen's Road",
        "Euro cylinder changes on Horeston Grange composite doors after key loss",
        "Securing every external door with new locks after a burglary"
      ],
      "faqs": [
        {
          "q": "Should I change the locks when I buy a house in Nuneaton?",
          "a": "I'd always recommend it. Previous owners, their family, tradespeople, and old neighbours may all hold keys, and you've no way of knowing how many copies exist. A lock change on completion day is quick and inexpensive compared to the risk, and I can usually fit around your moving schedule."
        },
        {
          "q": "Do I need a whole new lock, or just a new cylinder?",
          "a": "It depends on the door. On uPVC and composite doors — common in Attleborough, Whitestone, and Horeston Grange — swapping the euro cylinder is usually all that's needed, which keeps the cost down. On the solid wood doors in the town centre terraces, a mortice lock change means replacing the full lock body. I'll tell you which applies when you call."
        },
        {
          "q": "Will my new locks satisfy my home insurance?",
          "a": "If you ask for it, yes. Most policies specify BS3621 five-lever mortice locks on final exit timber doors, and I fit locks that carry the kitemark and the standard number so you can point your insurer to them. Check your own policy wording, as requirements do vary between insurers."
        },
        {
          "q": "How long does a lock change take?",
          "a": "Usually well under an hour for a single door, including testing the new keys with you before I leave. A whole-house change after moving in or losing a full set of keys takes longer, but I carry enough stock to do it in one visit rather than coming back."
        }
      ],
      "priceNote": "Lock changes in Nuneaton start from £69 with no VAT and no call-out fee, and I'll give you a firm price on the phone once I know your door and lock type."
    },
    {
      "service": "upvc-lock-repair",
      "metaTitle": "uPVC Door Lock Repair Nuneaton | From £59 | No VAT",
      "metaDescription": "uPVC door lock repairs in Nuneaton from £59 — failed gearboxes, seized mechanisms, misaligned doors. 20-30 minute response. Call Ross on 024 7522 4730.",
      "h1": "uPVC Door Lock Repair in Nuneaton",
      "intro": [
        "A uPVC door that needs the handle forcing upwards, won't lock unless you pull it towards you, or has jammed shut altogether is usually telling you the multipoint mechanism is failing. I repair uPVC and composite door locks across Nuneaton — gearbox failures, seized mechanisms, misaligned doors, and worn euro cylinders — and I can reach most CV11 addresses within 20-30 minutes when a door won't secure.",
        "Often the fix is simpler than people fear. A door that's dropped on its hinges needs realignment, not a new mechanism, and a stiff key often means a worn cylinder rather than a failed gearbox. Where the gearbox genuinely has died, I carry a range of replacements to suit the mechanisms fitted across the town, so most repairs are done on the first visit. If you're locked out because the mechanism has seized, I'll open the door first and then fix the fault.",
        "Repairs start from £59, and the price depends on what's actually failed — describe the symptoms when you call 024 7522 4730 and I'll confirm the cost before setting off. No VAT, no call-out fee."
      ],
      "localAngleHeading": "uPVC and Composite Door Repairs Across Nuneaton's Estates",
      "localAngleBody": "The newer estates on Nuneaton's outskirts were built with uPVC and composite doors carrying multipoint locks as standard, and those mechanisms don't last forever. Horeston Grange generates more multipoint lock calls than anywhere else in town for me — composite doors where the gearbox has worn to the point the handle spins or the hooks won't throw. In the town centre, plenty of the Victorian terraces around Abbey Street and Bond Gate have had uPVC doors fitted as replacements over the years, and jammed cylinders on those doors are one of the most frequent faults I attend in CV11. Attleborough and Whitestone sit somewhere in between, with replacement doors of varying ages on the post-war semis. Whatever the estate and whatever the brand of mechanism, I aim to complete the repair in one visit.",
      "commonJobs": [
        "Replacing failed multipoint gearboxes in composite doors on Horeston Grange",
        "Freeing jammed euro cylinders on uPVC replacement doors in the town centre terraces",
        "Realigning dropped uPVC doors on post-war semis in Attleborough and Whitestone",
        "Swapping worn euro cylinders where keys have become stiff to turn",
        "Opening uPVC doors jammed shut by seized mechanisms, then repairing the fault"
      ],
      "faqs": [
        {
          "q": "The handle on my uPVC door is floppy and won't lift — what's happened?",
          "a": "That's the classic sign of a failed gearbox — the central part of the multipoint mechanism that the handle drives. It's the most common uPVC fault I see in Nuneaton, especially on doors that have been stiff for months beforehand. The gearbox can usually be replaced without changing the whole door or the full mechanism."
        },
        {
          "q": "Do I need a new door if the multipoint lock has failed?",
          "a": "Very rarely. Multipoint gearboxes, full mechanisms, and euro cylinders are all replaceable parts, and repairing them costs a fraction of a new door. I carry a range of gearboxes to suit the mechanisms fitted across Nuneaton's estates, so there's normally no need to wait for parts either."
        },
        {
          "q": "Why do I have to slam or pull my door to lock it?",
          "a": "The door has usually dropped or the frame keeps have shifted, so the hooks and bolts no longer line up. Realignment is a quick, inexpensive fix — and worth doing promptly, because forcing a misaligned door is exactly what wears the gearbox out and turns a small job into a bigger one."
        },
        {
          "q": "Can you open a uPVC door that's jammed shut in Nuneaton?",
          "a": "Yes. When a mechanism seizes with the door locked, I open the door first — non-destructively wherever possible — then repair or replace the failed parts. It's a regular call on Nuneaton's uPVC replacement doors in the town centre as well as on the newer estates. Call 024 7522 4730."
        }
      ],
      "priceNote": "uPVC lock repairs in Nuneaton start from £59 with no VAT and no call-out fee — describe the fault when you call and I'll confirm the price before I set off."
    },
    {
      "service": "boarding-up",
      "metaTitle": "Emergency Boarding Up Nuneaton | From £79 | 24/7",
      "metaDescription": "Emergency boarding up in Nuneaton from £79 — broken windows and doors secured fast, 20-30 minute response, lock change same visit. Call 024 7522 4730.",
      "h1": "Emergency Boarding Up in Nuneaton",
      "intro": [
        "When a window's been put through or a door forced, the priority is simple: make the property secure before you do anything else. I provide emergency boarding up across Nuneaton around the clock, and because I'm based in Coventry with a quick run up the A444, I can be with most CV11 addresses within 20-30 minutes of your call — which matters when your home is standing open at 2am.",
        "I board broken windows and damaged doors with properly fixed boards, secure damaged frames, and leave the property weathertight and safe until permanent repairs can be arranged. If the break-in has compromised your locks, I can change them on the same visit rather than leaving you to book a second appointment. I attend homes and businesses alike — Nuneaton's commercial premises along Stratford Street and Bond Gate included.",
        "Boarding up starts from £79. The price depends on the size and number of openings, so tell me what's been damaged when you call and I'll confirm the cost before I set off — no VAT, no call-out fee."
      ],
      "localAngleHeading": "Securing Nuneaton Homes and Shops After Break-Ins",
      "localAngleBody": "Boarding up work in Nuneaton splits between homes and businesses. The commercial premises along Stratford Street and Bond Gate need glazing boarded quickly after break-ins or accidental damage — an unsecured shopfront left overnight is an open invitation. On the residential side, the Victorian terraces around Abbey Street and Queen's Road have original solid wood doors that splinter around the lock when forced, and I can board the damaged section, secure the frame, and fit a new lock in one visit. On estates like Horeston Grange, a forced composite door often means the multipoint mechanism and frame keeps are damaged too, so I check and secure the whole door rather than just the visible hole. Whatever the property, I don't leave until it's genuinely secure.",
      "commonJobs": [
        "Boarding broken shopfront glazing along Stratford Street and Bond Gate",
        "Securing forced solid wood doors on the terraces around Abbey Street and Queen's Road",
        "Boarding damaged windows on the post-war semis in Attleborough and Whitestone",
        "Same-visit lock changes alongside boarding after burglaries across CV11",
        "Making rental properties secure for Nuneaton landlords after break-ins or damage"
      ],
      "faqs": [
        {
          "q": "Can you change the locks and board up in the same visit?",
          "a": "Yes — that's exactly how I prefer to work after a break-in. If the door lock has been forced or keys taken, I'll board the damaged opening and fit new locks in one visit, so the property is fully secure without waiting for a second appointment. It also keeps the total cost down."
        },
        {
          "q": "Is boarding up secure enough to leave the property overnight?",
          "a": "Yes. I fix boards properly to the frame rather than resting them in the opening, leaving windows and doors solid, weathertight, and secure until a glazier or joiner completes the permanent repair. It's a temporary measure by design, but it will do its job for as long as you need it to."
        },
        {
          "q": "Do you board up shops and commercial premises in Nuneaton?",
          "a": "Yes — I attend commercial premises as well as homes, including the businesses along Stratford Street and Bond Gate in the town centre. Broken shopfront glazing left open overnight is a serious risk, so I treat commercial call-outs with the same urgency as residential ones, 24 hours a day."
        },
        {
          "q": "Should I call the police before I call you?",
          "a": "If there's been a break-in, yes — report it and get a crime reference number, which your insurer will ask for, and photograph the damage before anything is moved. I can usually board up as soon as the police are done with the scene, and I'll work around whatever they need."
        }
      ],
      "priceNote": "Emergency boarding up in Nuneaton starts from £79 with no VAT and no call-out fee, and I'll confirm the price on the phone once you've described the damage."
    },
    {
      "service": "lock-upgrade",
      "metaTitle": "Lock Upgrade Nuneaton | From £79 | No VAT | BS3621",
      "metaDescription": "Lock upgrades in Nuneaton from £79 — BS3621 deadlocks and anti-snap cylinders fitted, insurance compliant. 20-30 minutes away. Call 024 7522 4730.",
      "h1": "Insurance-Approved Lock Upgrades in Nuneaton",
      "intro": [
        "Plenty of Nuneaton homes are still secured by locks their insurer no longer accepts. Lock upgrades are one of the highest-volume jobs I do in the town — often prompted by a renewal document mentioning BS3621 for the first time — and I fit insurance-approved deadlocks and anti-snap cylinders across CV11 and the CV10 suburbs. I'm based in Coventry, 20-30 minutes from most Nuneaton addresses via the A444, and upgrade work can be booked for a time that suits you rather than treated as an emergency.",
        "On timber doors the upgrade is a BS3621 five-lever mortice deadlock, the standard most insurers name in their policy wording. On uPVC and composite doors it's an anti-snap euro cylinder, and I carry premium options including Ultion and ABS for anyone who wants the strongest protection available. If you'd like the whole house brought up to standard, I'll survey every door and price the lot in one go.",
        "Upgrades start from £79. Tell me what doors and locks you have when you call and I'll confirm the price before booking you in — with no VAT and no call-out fee on top."
      ],
      "localAngleHeading": "Bringing Nuneaton's Older Locks Up to Insurance Standard",
      "localAngleBody": "Upgrade work is one of my biggest call types in Nuneaton, and the housing explains why. The Victorian and Edwardian terraces around Abbey Street, Queen's Road, and the streets off Bond Gate still have solid wood doors, and while many carry five-lever mortice locks, a large number of those locks pre-date the BS3621 standard that insurers now ask for — the lock works, but it wouldn't satisfy a claims assessor. The 1950s and 1960s semis in Attleborough and Whitestone are similar, with a mix of original and replacement locks of varying quality. On Horeston Grange and the newer estates the doors are modern, but factory-fitted euro cylinders are often the basic type, and swapping them for anti-snap versions is a quick, worthwhile upgrade. I'll always tell you honestly which of your locks are fine as they are.",
      "commonJobs": [
        "Fitting BS3621 deadlocks to solid wood doors on the Abbey Street and Queen's Road terraces",
        "Swapping basic euro cylinders for anti-snap versions on the newer estates",
        "Whole-house upgrades ahead of home insurance renewals across CV11",
        "Bringing rental properties up to insurance standard for Nuneaton landlords",
        "Fitting Ultion and ABS premium cylinders for homeowners wanting the best protection"
      ],
      "faqs": [
        {
          "q": "How do I know whether my locks already meet BS3621?",
          "a": "Look at the faceplate on the edge of the door — a compliant lock is stamped with BS3621 and a kitemark. Many locks in Nuneaton's older terraces carry neither, because they pre-date the standard. If you're unsure, I can check every lock in the house during a single visit and tell you which ones pass."
        },
        {
          "q": "What is an anti-snap cylinder, and does my door need one?",
          "a": "Snapping the euro cylinder is one of the most widely used ways of forcing uPVC and composite doors nationally. Anti-snap cylinders have sacrificial sections that break away and leave the mechanism secure. If your door has a basic cylinder — as many on Nuneaton's newer estates do — it's one of the most worthwhile upgrades available."
        },
        {
          "q": "Can you upgrade my locks without spoiling my Victorian door?",
          "a": "Yes. A BS3621 mortice deadlock fits into the same style of pocket as the older locks on the solid wood doors around Abbey Street and Queen's Road, so the door keeps its character while gaining modern security. Where an old mortice has left a larger recess, I'll make the new lock a neat fit."
        },
        {
          "q": "Is an Ultion or ABS cylinder worth the extra cost?",
          "a": "For some doors, yes. A decent anti-snap cylinder is a big step up from a basic one, and Ultion and ABS sit above that again with higher attack resistance. I'll give you an honest recommendation based on your door and what you're protecting rather than pushing the most expensive option."
        }
      ],
      "priceNote": "Lock upgrades in Nuneaton start from £79 with no VAT and no call-out fee — I'll confirm the exact cost on the phone before booking your visit."
    }
  ],
  "bedworth": [
    {
      "service": "emergency-lockout",
      "metaTitle": "Emergency Lockout Bedworth | From £59 | No VAT | 24/7",
      "metaDescription": "Locked out in Bedworth? I'm an independent locksmith reaching CV12 in 25-35 minutes, day or night. Non-destructive entry from £59. Call 024 7522 4730.",
      "h1": "Emergency Lockout Locksmith in Bedworth",
      "intro": [
        "Locked out of your house in Bedworth? I'm Ross, an independent locksmith based in Coventry, and I cover the whole CV12 area — from the terraces around Newdigate Road to the estates towards Bedworth Heath and out to Bulkington. I come straight up the A444, which puts most Bedworth addresses 25-35 minutes away from the moment you call, day or night.",
        "I always try non-destructive entry first. Most lockouts — a slammed door on a nightlatch, keys left inside, a key snapped off in the cylinder — can be opened without damaging the lock or the door, so you're back inside with nothing to replace. If a lock genuinely has to be drilled because it has failed internally, I'll tell you before I start and fit a replacement on the same visit.",
        "Pricing is simple: lockouts start from £59, there's no VAT and no call-out fee, and I'll confirm the price on the phone before I set off. Call me on 024 7522 4730 and I'll tell you exactly how soon I can be with you."
      ],
      "localAngleHeading": "Getting Into Bedworth's Older Terraces Without Damage",
      "localAngleBody": "The most common lockout call I take in Bedworth is a failed nightlatch on one of the older terraces — the former miners' cottages around Newdigate Road and Coalpit Field Road still have their solid wood doors, and many of the nightlatches on them have been in place for decades. They fail without warning: the door swings shut, the latch won't pull back, and you're stood on the step. The good news is that these doors respond well to non-destructive entry, so I can usually get you in cleanly. On the post-war estates towards Bedworth Heath it's more often a worn cylinder that has stopped accepting its own key. Either way, I carry replacement nightlatches, cylinders, and mortice locks on the van, so if a lock is beyond saving I fit a new one there and then rather than leaving you with a temporary fix.",
      "commonJobs": [
        "Opening a slammed door with a failed nightlatch on a terrace off Newdigate Road",
        "Extracting a snapped key from a worn mortice lock in a solid wood door",
        "Gaining entry after lost keys on the post-war estates towards Bedworth Heath",
        "Night-time lockouts at homes around the town centre and High Street",
        "Getting back into a house near the Coventry Road developments when a cylinder jams"
      ],
      "faqs": [
        {
          "q": "Will you damage my door getting me back into my Bedworth home?",
          "a": "I use non-destructive entry techniques first on every lockout, and the majority of doors in Bedworth — including the nightlatch-fitted terraces — open cleanly with no damage at all. If a lock has failed internally and drilling is the only option, I'll explain that before touching anything and fit a replacement lock on the same visit."
        },
        {
          "q": "My key has snapped off in the lock — can you get it out?",
          "a": "Yes. Snapped keys are a regular Bedworth call, particularly in older mortice locks that have worn over the decades. I extract the broken piece with specialist tools, and in most cases the lock itself survives. If it's worn to the point of failing again, I'll tell you straight and can replace it there and then."
        },
        {
          "q": "Do you attend lockouts in Bedworth in the middle of the night?",
          "a": "Yes — I'm genuinely 24-hour, not a call centre that books you in for the morning. A night lockout gets exactly the same service as a daytime one: you speak to me directly on 024 7522 4730, I give you a firm price, and I set off. Nobody should be left sitting in a porch or a car until dawn waiting for a locksmith."
        },
        {
          "q": "Do I need to prove the property is mine before you open it?",
          "a": "Yes — I'll ask for photo ID and something linking you to the address, or another reasonable way of confirming you're entitled to be there. It's standard practice for any legitimate locksmith and it protects you as much as anyone: nobody should be able to have your door opened without that check."
        }
      ],
      "priceNote": "Emergency lockouts in Bedworth start from £59 with no VAT and no call-out fee — I'll confirm the exact price on the phone before I set off."
    },
    {
      "service": "lock-change",
      "metaTitle": "Lock Change Bedworth | From £69 | No VAT | 24/7",
      "metaDescription": "Lock changes across Bedworth CV12 from £69 — moving house, lost keys, tenancy change. I reach the town in 25-35 minutes. Call Ross on 024 7522 4730.",
      "h1": "Lock Change & Replacement in Bedworth",
      "intro": [
        "When a Bedworth property needs its locks changed — after moving in, losing a set of keys, a break-in, or a tenant moving on — I can usually sort it the same day. I'm an independent locksmith, so the person you speak to on 024 7522 4730 is the person who turns up with the van, and Bedworth is a 25-35 minute run from my Coventry base via the A444.",
        "I supply and fit everything from BS3621 five-lever mortice deadlocks for timber doors through to euro cylinders for uPVC and composite doors. If you've just completed on a house, changing the locks is the only way to know exactly who holds a key. If you rent property out, I can change locks between tenancies and hand you every key that exists for the new lock.",
        "Lock changes start from £69 with no VAT and no call-out fee. Tell me the door type and lock on the phone and I'll give you a firm price before anything is booked."
      ],
      "localAngleHeading": "New Locks for Every Era of Bedworth Housing",
      "localAngleBody": "Bedworth's housing covers more than a century of building, and the right lock depends on the era of the door. The Victorian and Edwardian terraces — many originally miners' cottages — have solid wood doors that take traditional five-lever mortice deadlocks and nightlatches. The 1930s semis around Mill Street and Park Road are similar, though the doors have often been replaced over the years. On the post-war estates towards the Bedworth Heath and Exhall boundaries, the standard Yale-and-mortice combination fitted decades ago is still common, and a lock change is a good moment to step up to BS3621-rated replacements. The newer developments near the Tesco superstore off the Coventry Road bring composite doors into the mix, where the change is a euro cylinder swap. I carry stock for all of them.",
      "commonJobs": [
        "Full lock changes for buyers moving into the 1930s semis around Mill Street and Park Road",
        "Replacing tired Yale-and-mortice pairings on post-war estate houses with BS3621-rated locks",
        "Euro cylinder changes on composite doors at the newer developments off the Coventry Road",
        "Urgent lock changes after lost or stolen keys anywhere in CV12, Bulkington included",
        "Changing locks between tenancies for landlords with property in Bedworth"
      ],
      "faqs": [
        {
          "q": "I've just bought a house in Bedworth — should I change the locks?",
          "a": "Yes, and ideally on completion day. Previous owners, their family, trades, and past tenants may all hold keys, and there's no way of knowing how many copies exist. A full change from £69 means every key to the property is in your hand, and I can usually do it the same day you collect the keys."
        },
        {
          "q": "Can you fit locks that meet my home insurance requirements?",
          "a": "Yes. Most policies ask for BS3621 five-lever mortice deadlocks on final exit timber doors, and I fit these as standard. Check the exact wording of your policy — I can look at what's currently on the door and tell you whether it complies before you decide anything."
        },
        {
          "q": "Do I need to buy the locks before you arrive?",
          "a": "No — I carry a stock of mortice locks, nightlatches, and euro cylinders on the van, so supply and fitting happen in one visit. If you'd prefer a specific model I don't carry, I can source it and fit it on a booked return visit."
        },
        {
          "q": "How long does a lock change take in Bedworth?",
          "a": "A straightforward euro cylinder swap takes well under an hour; a mortice deadlock in a timber door takes a little longer, especially if the new lock is a different size to the old one. Most single-door changes are finished within the hour, and I'll give you a realistic estimate on the phone."
        }
      ],
      "priceNote": "Lock changes in Bedworth start from £69 with no VAT and no call-out fee, and I confirm the full price on the phone before booking the visit."
    },
    {
      "service": "upvc-lock-repair",
      "metaTitle": "uPVC Lock Repair Bedworth | From £59 | No VAT | 24/7",
      "metaDescription": "uPVC door lock repairs in Bedworth from £59 — failed gearboxes, seized mechanisms, snapped cylinders. 25-35 minute response. Call 024 7522 4730.",
      "h1": "uPVC Door Lock Repair in Bedworth",
      "intro": [
        "A uPVC door that won't lock is one of the most frequent problems I attend in Bedworth. It's usually the multipoint gearbox — the mechanism inside the door that throws the hooks and rollers when you lift the handle. When it fails, the door either refuses to lock or refuses to open, and forcing the handle only makes things worse. Stop, leave it as it is, and ring me on 024 7522 4730.",
        "I replace failed gearboxes, free seized mechanisms, correct dropped and misaligned doors, and swap worn euro cylinders. In most cases the door and frame are perfectly sound and only the internal mechanism needs replacing — a fraction of the cost of a new door. I cover the whole of CV12 including Bulkington and reach most Bedworth addresses in 25-35 minutes via the A444.",
        "Repairs start from £59 with no VAT and no call-out fee. Describe the fault on the phone and I'll give you a price and confirm it before any work begins."
      ],
      "localAngleHeading": "Why Bedworth's 1990s uPVC Doors Are Failing Now",
      "localAngleBody": "A large share of Bedworth's uPVC doors went in during the 1990s and 2000s, when older timber doors across the terraces and the post-war estates were replaced. Those multipoint mechanisms are now twenty to thirty years old and reaching the end of their working lives — which is exactly why gearbox failures are a growing part of my Bedworth workload. Gearboxes wear internally, doors drop on their hinges so the hooks no longer meet the keeps, and handles that once lifted smoothly start to grind and stick. Almost all of it is repairable: a matching or adapted gearbox restores the door without replacing it. The composite doors on the newer developments near the Tesco superstore are younger, but even there I attend cylinder and alignment problems from time to time.",
      "commonJobs": [
        "Replacing failed multipoint gearboxes in uPVC doors fitted during the 1990s and 2000s",
        "Releasing and repairing doors jammed shut by a seized mechanism",
        "Realigning dropped uPVC doors so the hooks and rollers meet the keeps again",
        "Euro cylinder replacements where the key turns but the mechanism doesn't respond",
        "Handle and gearbox repairs on estate houses towards Bedworth Heath and Exhall"
      ],
      "faqs": [
        {
          "q": "My uPVC door handle flops up and down and won't lock — what's wrong?",
          "a": "That's the classic sign of a failed multipoint gearbox — the spring or gears inside the central case have given up. It doesn't mean you need a new door: I replace the gearbox with a matching or adapted unit and the door works as it did when new. It's the single most common uPVC fault I repair in Bedworth."
        },
        {
          "q": "My uPVC door is jammed shut — can you open it without destroying it?",
          "a": "In most cases, yes. A jammed multipoint mechanism can usually be released with specialist techniques that leave the door and frame intact, and then I replace the failed part. Forcing the door yourself is what tends to cause real damage, so leave it shut and call me."
        },
        {
          "q": "Do you carry parts for uPVC doors fitted in the 1990s and 2000s?",
          "a": "Yes — a lot of Bedworth's uPVC doors date from that period, so I stock a range of gearboxes and full mechanisms covering the common brands, plus adaptable units for discontinued models. Most failed mechanisms from that era can be matched or adapted on the first visit."
        },
        {
          "q": "Is it cheaper to repair my uPVC door lock or replace the whole door?",
          "a": "Repair, almost every time. If the door and frame are sound, replacing the gearbox or cylinder costs a fraction of a new door — repairs start from £59. I'll tell you honestly if a door is too far gone, but in Bedworth that's the exception rather than the rule."
        }
      ],
      "priceNote": "uPVC door lock repairs start from £59 — no VAT, no call-out fee, and the price is confirmed on the phone once you've described the fault."
    },
    {
      "service": "boarding-up",
      "metaTitle": "Emergency Boarding Up Bedworth | From £79 | 24/7",
      "metaDescription": "Emergency boarding up in Bedworth from £79 — broken windows and doors secured fast, 25-35 minute response, same-visit lock change. Call 024 7522 4730.",
      "h1": "Emergency Boarding Up in Bedworth",
      "intro": [
        "After a break-in or a smashed window, the first job is making the property secure — everything else can wait until morning. I provide emergency boarding up across Bedworth and the wider CV12 area, 24 hours a day, for houses, flats, and commercial premises alike. I'm typically 25-35 minutes away via the A444 when you call 024 7522 4730.",
        "I cut boards to size on site and fix them properly, so a broken window or forced door is weather-tight and can't be used to get back in. Where a door has been forced and the lock compromised, I can change the locks in the same visit — one trade, one bill, and the house is fully secure before I leave.",
        "Boarding up starts from £79 with no VAT and no call-out fee. Describe the damage over the phone and I'll confirm the price before I head over."
      ],
      "localAngleHeading": "Securing Bedworth Homes and Shops After Damage",
      "localAngleBody": "Bedworth's older terraces have solid wood doors, and when one of those is forced the timber usually splits around the lock — the door itself often survives, but it needs boarding or bracing and a new lock before the house is secure again. On the estates, a forced uPVC door frequently jams with the mechanism destroyed, so I make the door safe and can replace the gearbox or cylinder on the same visit. The town centre adds a commercial side to the work: the Victorian and Edwardian buildings around All Saints Square and High Street have shopfront glazing that occasionally needs securing after damage, whatever the hour. In every case the aim is the same — cut, fit, and fix boards properly on site so the property is weather-tight and can't be entered until repairs are done.",
      "commonJobs": [
        "Boarding a forced front door on an older terrace, with a lock change in the same visit",
        "Securing broken glazing at commercial premises around All Saints Square and High Street",
        "Boarding smashed windows after vandalism or accidental damage",
        "Making a forced uPVC door safe when the mechanism will no longer lock",
        "Overnight boarding to keep a property secure while insurance repairs are arranged"
      ],
      "faqs": [
        {
          "q": "Can you change the locks at the same time as boarding up?",
          "a": "Yes — that's usually the right call after a break-in. I board the damaged window or door and change any compromised locks in the same visit, so the property is fully secure again with one visit rather than two separate trades."
        },
        {
          "q": "Do you board up in Bedworth at night?",
          "a": "Yes — break-ins and broken windows don't keep office hours, so the boarding up service runs 24 hours a day. I'm typically 25-35 minutes from Bedworth via the A444 whatever the time, and I'll secure the property properly before I leave, not just lean a board against the gap."
        },
        {
          "q": "Will boarding up satisfy my insurance company after a break-in?",
          "a": "Insurers generally expect you to take reasonable steps to secure the property promptly, and professional boarding with a lock change is the standard way to do that. I can't speak for your individual policy, so keep photographs of the damage and your receipt from me for the claim."
        },
        {
          "q": "Do you board up shops and commercial premises in Bedworth?",
          "a": "Yes — I cover commercial properties as well as homes, including the older commercial buildings around All Saints Square and High Street. Broken shopfront glazing or a forced rear door can be secured the same way, day or night, so the premises are protected until repairs are arranged."
        }
      ],
      "priceNote": "Emergency boarding up starts from £79 with no VAT and no call-out fee; I'll confirm the price on the phone once I know the extent of the damage."
    },
    {
      "service": "lock-upgrade",
      "metaTitle": "Lock Upgrade Bedworth | From £79 | No VAT | Anti-Snap",
      "metaDescription": "Insurance-approved lock upgrades in Bedworth from £79 — BS3621 deadlocks and anti-snap cylinders fitted, 25-35 minutes away. Call 024 7522 4730.",
      "h1": "Lock Upgrades for Bedworth Homes",
      "intro": [
        "Plenty of the locks I inspect in Bedworth wouldn't satisfy a modern insurance policy. Across CV12 there are still a lot of doors carrying locks that fall short of BS3621 — the standard most insurers now expect on final exit doors — and a lot of uPVC and composite doors fitted with basic euro cylinders that have no snap protection at all.",
        "I fit BS3621 insurance-approved five-lever mortice deadlocks on timber doors and anti-snap euro cylinders — including premium brands such as Ultion and ABS — on uPVC and composite doors. If you'd like the whole house reviewed, I'll walk round every external door with you, tell you honestly which locks are worth upgrading and which are fine as they are, and price the job before any work starts.",
        "Upgrades are planned work rather than emergencies, so I'll book a time that suits you — Bedworth is a 25-35 minute trip for me via the A444. Prices start from £79 with no VAT and no call-out fee, confirmed on the phone."
      ],
      "localAngleHeading": "Bringing Bedworth's Older Locks Up to Insurance Standard",
      "localAngleBody": "A striking number of Bedworth properties are still secured by locks that don't meet BS3621, the standard most insurers now expect. The former miners' cottages around Newdigate Road and Coalpit Field Road often carry lock setups that predate any modern standard, and the post-war estate houses commonly still have the basic Yale-and-mortice pairing fitted when they were built. On timber doors like these, the fix is an insurance-approved five-lever deadlock fitted to the existing door. On the uPVC doors installed across town in the 1990s and 2000s, the weak point is the basic euro cylinder — swapping it for an anti-snap version is quick and removes the most common method of forced entry. The composite doors on the newer developments off the Coventry Road usually only need a cylinder check to confirm what's fitted.",
      "commonJobs": [
        "Fitting BS3621 five-lever deadlocks to timber doors on the terraces around Newdigate Road",
        "Swapping basic euro cylinders for anti-snap versions on 1990s and 2000s uPVC doors",
        "Ultion and ABS premium cylinder installations on main entrance doors",
        "Whole-house security upgrades covering every external door in one visit",
        "Replacing locks flagged at an insurance renewal or property survey"
      ],
      "faqs": [
        {
          "q": "What is an anti-snap euro cylinder and do I need one in Bedworth?",
          "a": "Cylinder snapping is a forced-entry method that targets basic euro cylinders — the type fitted to most of the uPVC doors installed in Bedworth through the 1990s and 2000s. An anti-snap cylinder is built with sacrificial sections and reinforcement so that attack fails. If your uPVC or composite door still has its original cylinder, it's the single most worthwhile upgrade you can make."
        },
        {
          "q": "Are Ultion and ABS cylinders worth the extra money?",
          "a": "For a main entrance door, usually yes. Both are premium anti-snap cylinders accredited to the top cylinder security standards, defending against snapping, drilling, and picking. On a rarely used side door, a standard anti-snap cylinder may be enough — I'll give you an honest steer rather than sell you the dearest option."
        },
        {
          "q": "Will upgrading my locks reduce my home insurance premium?",
          "a": "I can't promise savings — that's between you and your insurer. What I can say is that many policies require BS3621 locks on final exit doors, and a claim can be challenged if the locks don't comply. Upgrading makes sure you actually have the cover you're paying for."
        },
        {
          "q": "Can you upgrade all the locks in my house in one visit?",
          "a": "Usually, yes. I'll ask about each external door on the phone, bring the right deadlocks and cylinders, and work through them in a single booked visit. For a whole-house job I'll price everything up front, starting from £79, so there are no surprises at the end."
        }
      ],
      "priceNote": "Lock upgrades start from £79 with no VAT and no call-out fee — I'll confirm the exact price on the phone based on the doors and locks involved."
    }
  ],
  "rugby": [
    {
      "service": "emergency-lockout",
      "metaTitle": "Emergency Lockout Rugby | From £59 | No VAT | 24/7",
      "metaDescription": "Locked out in Rugby? I open doors 24/7, non-destructive first, typically with you in 25-35 minutes. From £59, no VAT. Call Ross on 024 7522 4730.",
      "h1": "Emergency Lockout Locksmith in Rugby",
      "intro": [
        "Locked out in Rugby? I'm Ross, an independent locksmith based in Coventry, and I attend lockouts across CV21 and CV22 around the clock — the town centre, Hillmorton, Brownsover, New Bilton, Bilton and Cawston. Coming up the M6 to Junction 1 and in on the A426, I can typically be with you in 25-35 minutes, day or night.",
        "I always try non-destructive entry first. Most Rugby lockouts — a nightlatch that's slammed shut behind you, a key snapped off in a worn cylinder, keys lost on a night out — can be opened without damaging the door or the lock. If a lock does have to be drilled, I'll tell you before I start, not after, and I carry replacements on the van so you're never left unsecured.",
        "Pricing is straightforward: lockouts start from £59, and I'll confirm the price on the phone before I set off. What you're quoted is what you pay — no surprises added at the door."
      ],
      "localAngleHeading": "Getting You Back Into Rugby's Converted Flats and Terraces",
      "localAngleBody": "A big share of my Rugby lockout calls come from the Victorian and Edwardian terraces around Church Street, Lawrence Sheriff Street and Hillmorton Road, many of which are now converted into flats and student HMOs. That conversion history matters: I'm often opening two doors, not one — a communal entrance with an ageing lock, then a flat door with a basic nightlatch that locks behind you the moment it closes. Term time brings a steady run of student lockouts around the town centre. Out at Brownsover and Cawston it's a different picture — modern uPVC and composite doors where a failed multipoint mechanism or a snapped euro cylinder leaves the door refusing to open even with the right key. I carry the tools and parts for both ends of the town, so one visit usually sorts it.",
      "commonJobs": [
        "Opening a slammed nightlatch on a converted flat off Hillmorton Road",
        "Extracting a snapped key from a worn mortice lock in a Bilton semi",
        "Gaining entry to a Brownsover composite door with a failed multipoint mechanism",
        "Letting a tenant back into a town centre HMO after keys were lost",
        "Opening a communal entrance door when the lock has failed"
      ],
      "faqs": [
        {
          "q": "Can you open my door in Rugby without drilling the lock?",
          "a": "In most cases, yes. Non-destructive entry is always my first approach, and the majority of Rugby lockouts — nightlatches, euro cylinders, mortice locks — open without damage. If drilling turns out to be the only option, I'll explain why first and fit a replacement lock on the same visit."
        },
        {
          "q": "Do you ask for proof of address before opening a door?",
          "a": "Yes. Once the door is open I'll ask to see something linking you to the property — photo ID, a bank statement, a tenancy agreement, or a neighbour who can vouch for you. It protects you as much as anyone; a lockout at an HMO especially needs that check."
        },
        {
          "q": "My key has snapped in the lock — do I need a whole new lock?",
          "a": "Not necessarily. I can usually extract the broken piece and, if the lock itself is undamaged, get it working again on the spot. Snapped keys are common in Rugby's older terraces where mortice locks have decades of wear. If the lock is worn beyond saving, I'll say so and quote before replacing it."
        },
        {
          "q": "Can you open a communal front door on a converted Rugby property?",
          "a": "Yes — communal entrances on converted terraces are a regular part of my Rugby work. I'll open the door without damaging it wherever possible, and because other residents rely on that lock, I can repair or replace it there and then if it has failed rather than just letting you in."
        }
      ],
      "priceNote": "Emergency lockouts in Rugby start from £59 — no VAT, no call-out fee, and I'll confirm the price on the phone before I travel."
    },
    {
      "service": "lock-change",
      "metaTitle": "Lock Change Rugby | From £69 | No VAT | 24/7",
      "metaDescription": "Lock changes across Rugby CV21 and CV22 — moving house, lost keys, end of tenancy. Typically 25-35 minutes away. From £69, no VAT. Call 024 7522 4730.",
      "h1": "Lock Change & Replacement in Rugby",
      "intro": [
        "When the locks on a Rugby property need changing — after a house move, a lost set of keys, a break-in, or a tenant handing back keys you can't fully account for — I can usually sort it the same day. I'm Ross, an independent locksmith covering the whole of Rugby from Coventry, typically 25-35 minutes away via the M6 and A426, wherever you are in CV21 or CV22.",
        "I supply and fit the lot: BS3621 five-lever mortice deadlocks for timber doors, euro cylinders for uPVC and composite doors, and nightlatches for the town's many converted flats. Everything is fitted from stock on the van, and every lock change comes with a full set of new keys.",
        "Lock changes start from £69 including the new lock. Tell me what's on the door when you call — a photo helps — and I'll give you a fixed price before I set off, so there's nothing to haggle over on the doorstep."
      ],
      "localAngleHeading": "Lock Changes for Rugby's Landlords and Movers",
      "localAngleBody": "Rugby's rental market keeps me busy with planned lock changes. The converted terraces around the town centre change tenants often — student lets especially turn over every summer — and a sensible landlord changes the locks between tenancies rather than trusting that every key came back. I regularly work through HMOs changing several flat doors plus the communal entrance in a single visit. Owner-occupiers call me for a different reason: moving into one of the 1930s semis in Hillmorton or an interwar house in Bilton, where nobody knows how many keys the previous owners handed out over the years. On the modern estates at Brownsover and Cawston, a lock change usually means swapping the euro cylinder rather than the whole mechanism, which keeps the job quick and the cost down.",
      "commonJobs": [
        "Changing all locks for a family moving into a Hillmorton semi",
        "Between-tenancy lock changes on flat doors in a town centre HMO",
        "Replacing a euro cylinder on a Cawston composite door after keys went missing",
        "Fitting a BS3621 mortice deadlock to a timber door on a New Bilton terrace",
        "Changing a communal entrance lock and supplying keys for every flat"
      ],
      "faqs": [
        {
          "q": "Should I change the locks when I buy a house in Rugby?",
          "a": "I'd always recommend it. Whether it's a Hillmorton semi or a new build at Cawston, you have no way of knowing who holds keys from before — trades, relatives, previous tenants. A lock change on completion day is quick, starts from £69, and means the only keys in circulation are yours."
        },
        {
          "q": "Can you change several locks in one visit for a Rugby HMO?",
          "a": "Yes — that's a regular job for me in the converted terraces around the town centre. I can change every flat door lock and the communal entrance in one visit, key each flat differently, and provide the number of keys per door that you need. Multi-lock jobs are priced as one visit, not several."
        },
        {
          "q": "Do I need a full lock change, or just a new cylinder?",
          "a": "It depends on the door. On uPVC and composite doors — most of Brownsover and Cawston — swapping the euro cylinder usually does the job, because the cylinder is what the keys operate. Timber doors with mortice locks or nightlatches need the lock itself changed. I'll tell you honestly which applies before quoting."
        },
        {
          "q": "Will my new locks meet my home insurance requirements?",
          "a": "If your policy asks for BS3621 — most do for timber doors — I'll fit a five-lever mortice deadlock that carries the kitemark and point it out to you on the faceplate. For uPVC and composite doors, I can fit cylinders that satisfy insurers too. Just mention insurance when you call."
        }
      ],
      "priceNote": "Lock changes in Rugby start from £69 with no VAT and no call-out fee — I'll confirm an exact price on the phone once I know what's fitted to your door."
    },
    {
      "service": "upvc-lock-repair",
      "metaTitle": "uPVC Door Lock Repair Rugby | From £59 | No VAT",
      "metaDescription": "uPVC door lock repairs in Rugby — failed gearboxes, stiff mechanisms, misaligned doors. From £59, no VAT, typically 25-35 minutes away. Ring 024 7522 4730.",
      "h1": "uPVC Door Lock Repair in Rugby",
      "intro": [
        "A uPVC door that won't lock is more common in Rugby than you might think. Brownsover went up through the 1980s and 1990s, and that's the age at which multipoint gearboxes start to give out — the handle won't lift, the key turns without moving anything, or the door needs a hard pull before it will lock. I'm Ross, an independent locksmith based in Coventry, and I repair these mechanisms across Rugby, typically reaching CV21 and CV22 addresses within 25-35 minutes.",
        "Repair comes before replacement wherever it makes sense. Often the fix is realignment — dropped hinges or a swollen frame putting strain on the mechanism — or a new gearbox in the existing strip rather than a whole new locking system. Where the euro cylinder itself has failed or snapped, I carry a full range of replacements on the van.",
        "Repairs start from £59. Describe what the door is doing when you ring and I'll give you an honest steer on whether it's a repair or a replacement job, along with a price before I head over."
      ],
      "localAngleHeading": "uPVC and Composite Door Problems on Brownsover and Cawston",
      "localAngleBody": "The two ends of Rugby's modern housing give me two distinct types of call. Brownsover's 1980s and 1990s uPVC doors are reaching the end of their original mechanisms' working life — seized gearboxes, handles that flop uselessly, doors that have dropped out of alignment as hinges wear. Cawston is much newer, but I still attend it regularly: some of the door furniture fitted on recent developments is built to a price, and snapped euro cylinders on otherwise sound composite doors are a recurring job there. I also see plenty of uPVC replacement doors on the older terraces and the interwar streets of Bilton and New Bilton, where a door fitted twenty-odd years ago has quietly stiffened until one cold evening it refuses to lock at all. Most of these are repairable in a single visit.",
      "commonJobs": [
        "Replacing a failed multipoint gearbox on a Brownsover uPVC front door",
        "Realigning a dropped composite door at Cawston so it locks without force",
        "Swapping a snapped euro cylinder on a modern estate door",
        "Freeing a seized mechanism on a uPVC back door in Bilton",
        "Adjusting hinges and keeps so a stiff door locks smoothly again"
      ],
      "faqs": [
        {
          "q": "My uPVC door handle won't lift to lock — what's gone wrong?",
          "a": "Usually one of two things: the multipoint gearbox has failed, or the door has dropped so the locking points no longer line up with the frame. Alignment is the cheaper fix and I always check it first. Either way it's normally repairable in one visit with parts from the van."
        },
        {
          "q": "Do I need a whole new door if the mechanism has failed?",
          "a": "Almost never. Multipoint gearboxes are replaceable parts, and I carry the common patterns for the uPVC doors fitted across Brownsover and Rugby's other estates. A new gearbox or full strip costs a fraction of a new door and gets the door locking as it should again."
        },
        {
          "q": "My uPVC door is locked shut and won't open — can you free it without damage?",
          "a": "Yes, in most cases. A jammed multipoint mechanism can usually be released without damaging the door or the frame, even when the gearbox has failed with the door locked. I'll then repair or replace the mechanism on the same visit so the door works properly again."
        },
        {
          "q": "Is a stiff uPVC door worth fixing before it fails completely?",
          "a": "Definitely — a door that needs lifting, pulling or shoulder pressure to lock is a mechanism under strain, and in my experience they tend to fail at the worst moment, often on a cold night. A realignment and service visit from £59 is far cheaper than an emergency call once it jams shut."
        }
      ],
      "priceNote": "uPVC door lock repairs in Rugby are from £59 — no VAT, no call-out fee — with the exact price agreed on the phone before I attend."
    },
    {
      "service": "boarding-up",
      "metaTitle": "Emergency Boarding Up Rugby | From £79 | 24/7",
      "metaDescription": "Emergency boarding up in Rugby after break-ins or damage. Doors and windows made safe, typically 25-35 minutes away. From £79 with no VAT. Phone 024 7522 4730.",
      "h1": "Emergency Boarding Up in Rugby",
      "intro": [
        "After a break-in, the priority is making the property safe again — fast. I provide 24/7 emergency boarding up across Rugby, securing broken windows, damaged doors and smashed panels so the property can't be entered again that night. From my base in Coventry I'm typically on site in 25-35 minutes via the M6 and A426.",
        "It isn't only burglaries. I board up after accidental damage, storm damage, and for landlords needing an empty rental secured between tenants — a regular request given the size of Rugby's lettings market. Everything is cut to size on site and fixed properly: solid timber boarding that genuinely resists a second attempt, not a token sheet tacked over the gap.",
        "Boarding up starts from £79, and because I'm a locksmith first, I can change or repair any damaged locks on the same visit — one call-out covers both, and I'll confirm the full price on the phone before travelling."
      ],
      "localAngleHeading": "Securing Rugby Homes After Break-Ins and Damage",
      "localAngleBody": "The property mix in Rugby shapes the boarding work I do here. The Victorian terraces around the town centre often have glazed door panels that shatter easily when forced, and on converted buildings a damaged communal entrance leaves every flat exposed until it's secured. On the modern estates at Brownsover and Cawston, forced uPVC and composite doors are the typical damage — sometimes the frame splits rather than the glass breaking, which still needs boarding and bracing until a repair or new door is arranged. I also get calls from landlords across CV21 and CV22 whose empty properties have been broken into between tenancies. Whatever the property, I secure it the same visit, photograph the work if you need evidence for an insurer, and change any compromised locks while I'm there.",
      "commonJobs": [
        "Boarding a smashed door panel on a town centre terrace after a break-in",
        "Securing a forced composite door on a Brownsover house until a replacement is fitted",
        "Boarding a broken ground-floor window and changing the locks on the same visit",
        "Making a communal entrance safe on a converted flat building",
        "Securing an empty rental property in CV21 between tenancies"
      ],
      "faqs": [
        {
          "q": "Do you do boarding up in Rugby at night?",
          "a": "Yes — boarding up is a 24/7 service and most of these calls come in outside working hours. Whatever the time, I aim to be with you in 25-35 minutes from Coventry, secure the property properly, and sort any damaged locks in the same visit."
        },
        {
          "q": "Can you change the locks at the same time as boarding up?",
          "a": "Yes, and after a break-in I'd strongly advise it — locks are often damaged in a forced entry even when they look intact, and you can't be sure keys weren't taken. I carry boarding materials and a full range of locks on the van, so both jobs happen in one visit."
        },
        {
          "q": "Will the boarding be good enough for my insurance claim?",
          "a": "Insurers expect you to take reasonable steps to secure the property after damage, and professional boarding does exactly that. I fix boards securely rather than resting them in place, and I'm happy to provide an invoice describing the work, which most insurers ask for with a claim."
        },
        {
          "q": "Can you secure a damaged communal door on a converted Rugby property?",
          "a": "Yes — on the converted terraces around the town centre, a broken communal entrance affects every flat behind it, so I treat these as a priority. I'll board or brace the door so the building is secure overnight, and repair or replace the entrance lock so residents can still get in and out."
        }
      ],
      "priceNote": "Emergency boarding up in Rugby starts from £79 — no VAT, no call-out fee — and I'll confirm the price when you call, before I set off."
    },
    {
      "service": "lock-upgrade",
      "metaTitle": "Lock Upgrade Rugby | BS3621 & Anti-Snap | From £79",
      "metaDescription": "Lock upgrades in Rugby — BS3621 deadlocks and anti-snap cylinders fitted, typically 25-35 minutes away. From £79, no VAT. Ring Ross on 024 7522 4730.",
      "h1": "Lock Upgrades in Rugby",
      "intro": [
        "Plenty of Rugby homes are secured by locks that wouldn't satisfy a modern insurance policy — or a determined burglar. I upgrade locks across CV21 and CV22: BS3621 insurance-approved mortice deadlocks for timber doors, anti-snap euro cylinders for uPVC and composite doors, and full whole-house packages where every entry point is brought up to standard in one visit.",
        "For higher-security cylinder work I fit premium brands including Ultion and ABS — cylinders designed to defeat lock snapping, which targets the standard euro cylinders fitted to so many modern doors. On older timber doors, a kitemarked five-lever deadlock is usually the single most worthwhile improvement you can make.",
        "Upgrades start from £79. This is planned rather than emergency work, so I'll usually book a time that suits you — and as I'm typically 25-35 minutes from Rugby, fitting around your day is straightforward. I'll price the exact locks with you on the phone first, so you know the cost before I arrive."
      ],
      "localAngleHeading": "Bringing Rugby's Older Locks Up to Insurance Standard",
      "localAngleBody": "The upgrade work Rugby generates splits neatly by area. In Hillmorton and Bilton, the 1930s semis and interwar houses often still carry worn mortice locks and old Yale nightlatches — the exact locks insurers now expect to see replaced with BS3621-rated equivalents. Around the town centre, landlords of converted flats and HMOs upgrade to keep policies valid and tenants secure, and a communal door is only as good as its weakest lock. On the modern estates, the risk is different: Brownsover and Cawston doors mostly rely on euro cylinders, and where cheaper door furniture was fitted, those cylinders are vulnerable to snapping. Swapping them for anti-snap versions — Ultion or ABS at the top end — is a quick, relatively inexpensive fix that closes off the most common attack on a modern door.",
      "commonJobs": [
        "Fitting anti-snap euro cylinders to a composite door at Cawston",
        "Upgrading a Hillmorton semi to BS3621 deadlocks for a new insurance policy",
        "Whole-house upgrade after moving in — front, back and side doors in one visit",
        "Fitting Ultion cylinders for a homeowner wanting the highest-rated option",
        "Upgrading flat door locks across an HMO for a town centre landlord"
      ],
      "faqs": [
        {
          "q": "What is lock snapping and are Rugby doors at risk?",
          "a": "Snapping is a forced-entry method that breaks a standard euro cylinder in seconds using basic tools. Any uPVC or composite door with an ordinary cylinder is potentially vulnerable — which covers a lot of Brownsover and Cawston. An anti-snap cylinder is engineered to break in a controlled way that keeps the door locked."
        },
        {
          "q": "How do I know if my current locks meet BS3621?",
          "a": "Look at the faceplate on the door edge — a BS3621 lock carries a British Standard kitemark stamped into the metal. No kitemark usually means no compliance. If you're unsure, describe or photograph the lock when you call and I'll tell you straight away whether it needs upgrading."
        },
        {
          "q": "Is an Ultion cylinder worth the extra cost over a standard anti-snap?",
          "a": "For many doors a good mid-range anti-snap cylinder is perfectly adequate, and I'll say so rather than upsell. Ultion and ABS sit at the top of the range with additional protection against snapping, drilling and picking — worth considering on a main entrance or a higher-value property. I'll price both options for you."
        },
        {
          "q": "Can you upgrade every door in my Rugby house in one visit?",
          "a": "Yes — whole-house upgrades are a job I do regularly. I'll survey each door, recommend the right lock for each one rather than a one-size-fits-all fix, and fit everything in a single appointment. It's the most cost-effective way to do it, since the work is priced as one visit."
        }
      ],
      "priceNote": "Lock upgrades in Rugby start from £79 with no VAT and no call-out fee — I'll agree the exact price for your chosen locks on the phone before booking."
    }
  ],
  "leamington-spa": [
    {
      "service": "emergency-lockout",
      "metaTitle": "Emergency Lockout Leamington Spa | From £59 | 24/7",
      "metaDescription": "Locked out in Leamington Spa? I'm an independent locksmith reaching CV31 and CV32 in 25-35 minutes, day or night. From £59, no VAT. Call 024 7522 4730.",
      "h1": "Emergency Lockout Service in Leamington Spa",
      "intro": [
        "Locked out in Leamington Spa? I'm Ross, an independent locksmith based in Coventry, and I answer my own phone day or night. I cover the whole of CV31 and CV32 — the town centre, Milverton, Lillington, Sydenham, Whitnash and Heathcote — travelling in via the A46 or the A425, and I can honestly reach most Leamington addresses in 25-35 minutes.",
        "Non-destructive entry always comes first. Most lockouts, whether it's a nightlatch on a Victorian terrace or a euro cylinder on a composite door, can be opened with picking and bypass techniques rather than drilling, so your lock survives and you don't end up paying for a replacement you never needed. If a key has snapped in the lock I can extract it, and if your keys are lost altogether I can get you in and change the locks in the same visit.",
        "Pricing is straightforward: lockouts start from £59 with no VAT and no call-out fee, and I'll give you a clear price on the phone before I start driving, so there are no surprises at the door."
      ],
      "localAngleHeading": "Opening Doors in Leamington's Converted Georgian Flats",
      "localAngleBody": "Leamington's town centre is unlike anywhere else I cover. The Georgian and Regency terraces along the Parade, Clarendon Avenue and Newbold Terrace are mostly divided into flats, which means a lockout often involves two doors — a communal entrance with an ageing shared lock or intercom, and your own flat door behind it. I'm used to both, and to the oversized period mortice locks still fitted to many original doors, which seize with age and snap keys without warning. Around Portland Street and Clemens Street, the Victorian terraces let to students and young professionals produce a steady run of lockouts, especially in September and around exam season. And in Sydenham, Whitnash and Heathcote it's modern composite doors — a different job entirely, but one I handle just as routinely.",
      "commonJobs": [
        "Opening a converted-flat door off the Parade after the keys were left inside",
        "Extracting a snapped key from a seized period mortice lock on a Victorian terrace near Portland Street",
        "Non-destructive entry to a composite door in Sydenham after a lost set of keys",
        "Getting a tenant back into a house share around Clemens Street late at night",
        "Opening a jammed communal entrance door on a converted Georgian building"
      ],
      "faqs": [
        {
          "q": "Will you have to drill my lock to get me in?",
          "a": "Rarely. Non-destructive entry is always my first approach — picking and bypass techniques open the majority of doors without damage, including nightlatches on Leamington's older terraces and euro cylinders on modern doors. Drilling is a last resort, and if it's ever genuinely needed I'll explain why first and fit a replacement lock straight away."
        },
        {
          "q": "My key has snapped off inside an old mortice lock — can it be saved?",
          "a": "Usually, yes. Snapped keys are common in the oversized period mortice locks on Leamington's Georgian and Victorian doors, where mechanisms have stiffened with age. I extract the broken section, then either service the lock so it runs freely again or replace it if it's genuinely worn out."
        },
        {
          "q": "I'm locked out of a flat with a shared entrance — can you deal with both doors?",
          "a": "Yes. Converted buildings in Leamington town centre usually mean a communal entrance plus your own flat door, and I can open both. If the shared door lock has failed rather than you losing keys, mention it on the phone — that's a repair affecting every flat, and it's worth telling your managing agent or freeholder too."
        },
        {
          "q": "How do you know I actually live at the property?",
          "a": "I'll ask for ID or proof of address once the door is open — a driving licence, a bank letter, anything showing your name at that address. If you can't demonstrate a connection to the property, I won't complete the job. It protects Leamington residents, and it's a check any reputable locksmith should make."
        }
      ],
      "priceNote": "Emergency lockouts in Leamington Spa start from £59 — no VAT, no call-out fee, and I'll confirm the exact price on the phone before I set off."
    },
    {
      "service": "lock-change",
      "metaTitle": "Lock Change Leamington Spa | From £69 | No VAT | 24/7",
      "metaDescription": "Lock change in Leamington Spa from £69. BS3621 mortice locks and anti-snap cylinders, fitted by an independent locksmith 25-35 minutes away. 024 7522 4730.",
      "h1": "Lock Change & Replacement in Leamington Spa",
      "intro": [
        "Most lock change calls I get from Leamington Spa come down to one of four things: you've just moved in, you've lost a set of keys, there's been a break-in, or a tenancy has changed hands. Whatever the reason, I fit new locks across CV31 and CV32 — usually same day, and typically 25-35 minutes after your call if the job is urgent.",
        "I carry stock for both sides of Leamington's housing: BS3621 five-lever mortice deadlocks for the timber doors on the town's period terraces and semis, and euro cylinders in a full range of sizes for the uPVC and composite doors on the newer estates. Every lock I fit comes with its keys handed straight to you, and the old locks are removed and taken away.",
        "Lock changes start from £69 per lock fitted, with no VAT and no call-out fee. Tell me on the phone what type of door you have — a photo helps — and I'll confirm the exact price before I attend."
      ],
      "localAngleHeading": "Lock Changes From the Parade to Sydenham",
      "localAngleBody": "Leamington's rental market keeps me busy with lock changes. Landlords managing flats and house shares across CV31 and CV32 — particularly the converted buildings in the town centre and the student terraces around Portland Street and Clemens Street — book me between tenancies so old keys stop mattering. For homeowners, the job varies by area: the Edwardian and 1930s semis in Milverton usually have timber doors that take a proper five-lever mortice deadlock, Lillington's post-war houses tend to have simpler setups that are quick to swap, and the newer homes in Sydenham, Whitnash and Heathcote need correctly sized euro cylinders for their multipoint locks. I measure and fit the right lock for the door in front of me rather than forcing one standard answer on every property.",
      "commonJobs": [
        "Full lock change for a family moving into an Edwardian semi in Milverton",
        "Landlord lock changes between tenancies across CV31 and CV32",
        "BS3621 five-lever mortice deadlock fitted to a timber door on a town centre terrace",
        "Euro cylinder replacement on a composite door in Whitnash after keys went missing",
        "New locks throughout following a burglary, fitted in a single visit"
      ],
      "faqs": [
        {
          "q": "I've just bought a house in Leamington — do I really need the locks changed?",
          "a": "I'd always recommend it. You have no way of knowing how many keys previous owners, their relatives, trades or old cleaners still hold. A lock change from £69 means the only keys in circulation are the ones I hand you on the day — a small price for certainty in a new home."
        },
        {
          "q": "Can you change the locks on a rental property between tenants?",
          "a": "Yes — landlord changeovers are regular work for me across CV31 and CV32, including the flats and house shares in the town centre. I can meet you or a letting agent at the property, fit new locks in one visit, and supply however many keys the new tenancy needs. From £69 per lock."
        },
        {
          "q": "Will the new locks satisfy my home insurance?",
          "a": "If you ask for insurance-rated locks, yes. Most policies specify a BS3621 five-lever mortice deadlock on timber final-exit doors, and I fit these as standard when required. For uPVC and composite doors, insurers generally accept the multipoint lock with a sound euro cylinder. Check your policy wording and I'll match the locks to it."
        },
        {
          "q": "How long does a lock change take in practice?",
          "a": "A straightforward swap — a like-for-like euro cylinder or nightlatch — takes around half an hour. A mortice lock in a timber door takes longer if the new case is a different size and the door needs adjusting. Most Leamington lock changes are finished in a single visit, and I'll give you a realistic estimate on the phone."
        }
      ],
      "priceNote": "Lock changes in Leamington Spa start from £69 per lock fitted — no VAT, no call-out fee, and I'll confirm the price for your door type on the phone before booking."
    },
    {
      "service": "upvc-lock-repair",
      "metaTitle": "uPVC Door Lock Repair Leamington Spa | From £59 | No VAT",
      "metaDescription": "uPVC door lock repair in Leamington Spa from £59. Multipoint gearboxes, cylinders and alignment fixed — 25-35 minute response, no VAT. Call 024 7522 4730.",
      "h1": "uPVC Door Lock Repairs Across Leamington Spa",
      "intro": [
        "When a uPVC door in Leamington Spa stops locking, the culprit is nearly always one of two things: a failed multipoint gearbox or a door that has dropped out of alignment so the locking points no longer meet their keeps. Both are fixable — usually without replacing the door, and often without replacing the whole mechanism.",
        "I repair and replace multipoint gearboxes, free up seized mechanisms, sort misaligned doors, replace worn euro cylinders and fit new handles across the whole Leamington area, from the town centre out to Sydenham, Whitnash, Lillington and Heathcote. If your door has failed shut and you can't secure the house, I treat it as urgent and can typically be with you in 25-35 minutes; routine repairs I book in at a time that suits you.",
        "Repairs start from £59 with no VAT and no call-out fee. Describe the fault on the phone — what the handle does, whether the key turns — and I'll give you an honest price before I come out."
      ],
      "localAngleHeading": "uPVC and Composite Door Repairs in Sydenham, Whitnash and Heathcote",
      "localAngleBody": "The south side of Leamington is where most of my uPVC work comes from. Sydenham's developments date from the 1980s onwards, and Whitnash and Heathcote have grown with newer estates — street after street of doors with multipoint mechanisms now anywhere from a few years to a few decades old. Gearboxes from the earlier builds are reaching the end of their working lives, and doors drop on their hinges over time until the locking points grind against the keeps. Lillington adds to the workload too, as many of its post-war houses have had replacement uPVC doors fitted over the years. Failed multipoint mechanisms are the most common modern-lock call I get from Leamington, and I carry gearboxes, keeps and cylinders on the van to fix most of them in one visit.",
      "commonJobs": [
        "Replacing a failed multipoint gearbox on a uPVC door in Sydenham",
        "Realigning a dropped door in Whitnash that would only lock when slammed",
        "Freeing a seized mechanism that had left a Heathcote back door stuck shut",
        "Swapping a worn euro cylinder that had started sticking before it failed completely",
        "Fitting new handles where worn springs had left the originals drooping"
      ],
      "faqs": [
        {
          "q": "The handle on my uPVC door has gone floppy and won't lift — what's happened?",
          "a": "That's the classic sign of a failed multipoint gearbox — the central mechanism the handle drives has broken internally. The door often ends up stuck locked or stuck shut. Don't force it, as that can make the repair harder. I carry replacement gearboxes for the common mechanisms and can usually fix it in one visit."
        },
        {
          "q": "Do I need a whole new door if the mechanism has failed?",
          "a": "Almost never. The multipoint mechanism, gearbox and cylinder are all replaceable parts, and the door and frame are usually fine. Replacing the failed part costs a fraction of a new door. I'll only suggest a new door if the door itself is damaged beyond sensible repair — and that's rare."
        },
        {
          "q": "My door only locks if I slam it or force the handle up — is that worth fixing?",
          "a": "Yes, and sooner rather than later. That's misalignment: the door has dropped so the locking points grind against their keeps. Left alone it wears out the gearbox, turning a cheap adjustment into a bigger repair. Realigning the hinges and keeps is quick work and often saves the mechanism entirely."
        },
        {
          "q": "Can you just replace the cylinder on my uPVC door in Leamington?",
          "a": "Yes — if the cylinder is stiff, worn or you want it keyed differently, I can swap it without touching the rest of the mechanism. It's also a good moment to fit an anti-snap cylinder, which resists the forcing method used in many uPVC door burglaries. I carry a full range of sizes."
        }
      ],
      "priceNote": "uPVC lock repairs in Leamington Spa start from £59 — no VAT, no call-out fee, and I'll confirm the price on the phone once you've described the fault."
    },
    {
      "service": "boarding-up",
      "metaTitle": "Emergency Boarding Up Leamington Spa | From £79 | 24/7",
      "metaDescription": "Emergency boarding up in Leamington Spa from £79. Broken windows and doors secured 24/7, typically 25-35 minutes away. No VAT. Call 024 7522 4730.",
      "h1": "Emergency Boarding Up in Leamington Spa — 24 Hours",
      "intro": [
        "After a break-in, the first job is making the property safe — and that's what my emergency boarding service is for. I board up broken windows, damaged doors and smashed glazing panels across Leamington Spa 24 hours a day, reaching most CV31 and CV32 addresses in 25-35 minutes via the A46 or A425.",
        "I fix strong timber sheeting over the opening, screwed and secured so the property can't simply be pushed back open — solid enough to leave overnight or over a weekend while you arrange a glazier or a new door. If a lock was forced during the break-in, I can change it in the same visit, so the house is properly secured before I leave rather than just patched.",
        "Boarding up starts from £79 with no VAT and no call-out fee — I'll price the job on the phone based on the size of the opening, so you know the cost before I set off."
      ],
      "localAngleHeading": "Securing Homes and Shops Across Leamington Spa",
      "localAngleBody": "Boarding jobs in Leamington split roughly between the town centre and the suburbs. In the centre, I secure damaged glazing for shops and business premises around the Parade, Warwick Street and Bath Street — usually out of hours, when the priority is making the frontage safe until repairs can be arranged. In the converted Georgian and Victorian buildings, a forced communal entrance affects every flat behind it, so I treat those as urgent and can repair or replace the shared lock as well as securing the door itself. In residential Milverton, Lillington and Sydenham, it's typically a back door or window forced during a burglary — I'll board the opening and change any compromised locks in the same visit, so you're not left overnight in an unsecured house.",
      "commonJobs": [
        "Boarding a forced back door in Lillington after a burglary, with a lock change in the same visit",
        "Securing smashed glazing at a business premises near the Parade out of hours",
        "Boarding a broken ground-floor window at a rental property while the landlord arranged a glazier",
        "Making safe a damaged communal entrance on a converted town centre building",
        "Boarding a door panel broken by accidental damage until a replacement could be fitted"
      ],
      "faqs": [
        {
          "q": "Is boarding up available in the middle of the night?",
          "a": "Yes — boarding is a genuinely 24-hour service, because break-ins don't keep office hours. Whether it's a shop window in the town centre or a forced back door in Sydenham at 3am, I'll attend, secure the opening and make the property safe. I'm typically 25-35 minutes from Leamington addresses."
        },
        {
          "q": "Can you change the locks as well as boarding up?",
          "a": "Yes, and it's usually the right call. If a door was forced, its lock has often been damaged or can no longer be trusted, so I carry replacement locks on the van and can fit them during the same visit. One visit, one bill, and the property is fully secured rather than half-done."
        },
        {
          "q": "Is the boarding strong enough to leave the property empty afterwards?",
          "a": "Yes — I fit solid timber sheeting screwed firmly into the surrounding frame or structure, not tacked on. It's designed to resist someone trying to pull it off and to stay weathertight until your glazier or door fitter arrives. Insurers generally expect a property to be secured promptly after damage, and proper boarding does exactly that."
        },
        {
          "q": "Do you board up shops and commercial premises in Leamington town centre?",
          "a": "Yes — I secure business premises around the Parade, Warwick Street and Bath Street as well as homes. For a shopfront, I'll board the damaged glazing so the premises are safe and weathertight, and I can attend out of hours so you're not exposed overnight. Priced by the size of the opening, from £79."
        }
      ],
      "priceNote": "Emergency boarding in Leamington Spa starts from £79 — no VAT, no call-out fee, and I'll confirm the price on the phone based on the size of the opening."
    },
    {
      "service": "lock-upgrade",
      "metaTitle": "Lock Upgrade Leamington Spa | From £79 | No VAT",
      "metaDescription": "Lock upgrades in Leamington Spa from £79 — BS3621 deadlocks and anti-snap cylinders inc. Ultion. Independent, 25-35 minutes away. Call 024 7522 4730.",
      "h1": "Lock Upgrades for Leamington Spa Homes",
      "intro": [
        "A lot of my Leamington Spa work is planned rather than emergency: homeowners and landlords upgrading locks that are decades old, don't meet insurance requirements, or simply aren't up to the standard the property deserves. I fit BS3621 insurance-approved deadlocks, anti-snap euro cylinders — including premium brands like Ultion and ABS — and complete whole-house security upgrades across CV31 and CV32.",
        "Because I'm based in Coventry, appointments are easy to arrange — I'm typically 25-35 minutes from Leamington, so same-day and next-day slots are usually available. I'll look at every external door, tell you plainly which locks are fine, which are weak, and which your insurer would take issue with, then quote for only what's actually worth doing. There's no pressure and no upselling — if a lock is doing its job, I'll say so.",
        "Upgrades start from £79 with no VAT and no call-out fee, and I'll confirm the price for your specific doors and choice of locks on the phone before anything is booked in."
      ],
      "localAngleHeading": "Upgrading Security Without Spoiling Leamington's Period Doors",
      "localAngleBody": "Leamington presents two very different upgrade jobs. On the Georgian and Regency terraces along the Parade, Clarendon Avenue and Newbold Terrace, the challenge is bringing security up to modern insurance standards without ruining an original door — I fit BS3621 deadlocks sized and positioned to suit period timber, and I'll always discuss placement before cutting anything. Milverton's Edwardian and 1930s semis are similar territory: solid doors that deserve a proper five-lever mortice rather than the tired locks many still carry. In Sydenham, Whitnash and Heathcote, the weak point is usually the euro cylinder on a composite or uPVC door — a standard cylinder can be snapped by force in seconds, and swapping it for an anti-snap version such as Ultion or ABS is the single most effective upgrade those doors can have.",
      "commonJobs": [
        "Fitting Ultion anti-snap cylinders to composite doors in Sydenham and Heathcote",
        "Adding a BS3621 deadlock to a Georgian front door while keeping the original furniture",
        "Whole-house lock upgrades on Milverton and Lillington semis to meet insurance wording",
        "Bringing student lets around Portland Street and Clemens Street up to standard for landlords",
        "Replacing older euro cylinders that predate anti-snap standards on estate uPVC doors"
      ],
      "faqs": [
        {
          "q": "My insurer has asked for BS3621 locks — what does that actually involve?",
          "a": "BS3621 is the British Standard for thief-resistant locks, and insurers commonly require it on final-exit doors. On a timber door it usually means fitting a five-lever mortice deadlock carrying the kitemark. I fit BS3621 locks across Leamington from £79, and I'll show you the kitemark on the faceplate so you can evidence it to your insurer."
        },
        {
          "q": "Are premium cylinders like Ultion really worth it over a standard anti-snap?",
          "a": "It depends on the door and the risk. A basic anti-snap cylinder is already a big step up from a standard one. Ultion and ABS go further, with additional protection against snapping, drilling and picking. For a main entrance, or a property that's been targeted before, the extra cost is usually justified — and I'll give you an honest recommendation either way."
        },
        {
          "q": "Can you upgrade the locks on a converted flat in Leamington town centre?",
          "a": "Yes. In Leamington's converted Georgian and Victorian buildings I can upgrade your own flat door — often the weakest point — with a BS3621 deadlock or a better cylinder. The communal entrance belongs to the freeholder or managing agent, but I'm happy to quote for that too if they authorise the work."
        },
        {
          "q": "Can you upgrade every lock in the house in one visit?",
          "a": "Usually, yes. A typical whole-house upgrade — front door, back door and any side or patio doors — takes a few hours and one appointment. I'll survey each door first, agree exactly what's being fitted and the total price, then complete everything in a single visit so you're only handing out new keys once."
        }
      ],
      "priceNote": "Lock upgrades in Leamington Spa start from £79 — no VAT, no call-out fee, and I'll confirm the price for your chosen locks on the phone before any work is booked."
    }
  ],
  "warwick": [
    {
      "service": "emergency-lockout",
      "metaTitle": "Emergency Lockout Warwick | From £59 | No VAT | 24/7",
      "metaDescription": "Locked out in Warwick? I'm an independent locksmith reaching CV34 in 25-35 minutes, 24/7. Non-destructive entry from £59, no VAT. Call 024 7522 4730.",
      "h1": "Emergency Lockout Locksmith in Warwick",
      "intro": [
        "Locked out in Warwick? I'm Ross, an independent locksmith based in Coventry, and I attend lockouts across the whole CV34 area day and night — from the period houses around Jury Street and Smith Street to the modern estates at Woodloes Park, Chase Meadow and Warwick Gates. I travel via the A46 and can typically reach Warwick addresses in 25-35 minutes.",
        "My approach is always non-destructive first. Most doors can be opened by picking or slipping the lock without any damage, which matters everywhere but especially in a town like Warwick, where so many front doors are old, listed or simply irreplaceable. If a lock genuinely has to be drilled as a last resort, I'll tell you before I start and fit a replacement on the same visit. I also extract snapped keys — a common failure on the older mortice locks found in the town centre.",
        "Pricing is straightforward: lockouts start from £59 with no VAT and no call-out fee, and I'll give you a clear price on the phone before I head over. Call 024 7522 4730 whenever you're stuck."
      ],
      "localAngleHeading": "Opening Doors in Warwick's Medieval Centre Without Damage",
      "localAngleBody": "The streets around Castle Hill, Jury Street, Church Street and the Market Place are lined with Tudor, Georgian and Victorian buildings, many of them Grade II listed. Being locked out of one of these is a different job from a standard lockout: the door might be centuries old, the lock could be an original iron rim lock or a Victorian five-lever mortice, and drilling is not an acceptable first move. I use non-destructive entry techniques as standard and take particular care with historic fabric — if a lock has seized rather than simply locked, I work it open rather than force it. Out at Woodloes Park, Chase Meadow and Warwick Gates the picture is different: composite and uPVC doors with multipoint locks, where a lockout usually means slipping the latch or, if the cylinder has failed, replacing it there and then.",
      "commonJobs": [
        "Late-night lockouts from period houses around Jury Street, Smith Street and the Market Place",
        "Snapped key extraction from older mortice locks in the town centre",
        "Locked-out households at Woodloes Park, Chase Meadow and Warwick Gates with multipoint doors",
        "Gaining entry to converted period properties when a communal entry lock fails",
        "Full key loss — opening the door, then changing the cylinder on the same visit"
      ],
      "faqs": [
        {
          "q": "Will you have to drill my lock to get back into my Warwick home?",
          "a": "Almost never as a first resort. I pick or slip most locks open without damage, which matters in a town with as many listed and period doors as Warwick. If drilling ever is the only option, I'll explain why before I start and fit a replacement lock on the same visit."
        },
        {
          "q": "My key has snapped off inside the lock — can you get it out?",
          "a": "Yes. Snapped keys are a common failure on the older mortice locks in Warwick's town centre houses. I extract the broken piece, and in most cases the lock itself survives — so you may only need a new key cut rather than a new lock."
        },
        {
          "q": "I've lost my keys completely — what happens once you've let me in?",
          "a": "Once you're back inside, I'd recommend changing the cylinder or lock, since your keys are unaccounted for. I carry stock on the van and can do it in the same visit — the lock change is priced separately and I'll be clear about the cost before doing anything."
        },
        {
          "q": "Do you need proof that it's my house before opening the door?",
          "a": "Yes — I'll ask for ID or some evidence you live at the property, such as post inside once the door is open. It's a standard safeguard every reputable locksmith follows, and it protects you as much as anyone."
        }
      ],
      "priceNote": "Emergency lockouts in Warwick start from £59 — no VAT, no call-out fee — and I'll confirm the exact price on the phone before I set off."
    },
    {
      "service": "lock-change",
      "metaTitle": "Lock Change Warwick | From £69 | No VAT | 24/7",
      "metaDescription": "Lock change and replacement in Warwick from £69, no VAT. BS3621 mortice locks and euro cylinders, 25-35 minute response to CV34. Call 024 7522 4730.",
      "h1": "Lock Change & Replacement in Warwick",
      "intro": [
        "New house, lost keys, a tenancy ending, or a break-in — there are plenty of reasons to want fresh locks, and I change them across Warwick most weeks. I'm Ross, an independent locksmith covering the whole CV34 area from Coventry, and I can usually be with you in 25-35 minutes via the A46, or at a booked time that suits you.",
        "I carry a wide range of stock: BS3621 five-lever mortice locks for timber doors, euro cylinders for uPVC and composite doors, plus nightlatches and rim locks for older houses. That range matters in Warwick, where a short walk can take you from a Georgian front door to a modern composite one. Whatever is on your door, I'll fit a like-for-like replacement or talk you through better options — honestly, without upselling.",
        "Lock changes start from £69 — no VAT, no call-out fee — and I'll confirm the exact price for your door and lock type when you call 024 7522 4730."
      ],
      "localAngleHeading": "From Georgian Front Doors to Warwick Gates Composites",
      "localAngleBody": "Warwick's housing runs the full spread. In the centre, along Jury Street, Castle Street, Church Street and the High Street, timber doors on Tudor, Georgian and Victorian buildings carry everything from Georgian lever locks to Victorian five-lever mortice deadlocks — and where a building is listed, replacements have to be chosen carefully so nothing of historic value is altered or damaged. Around Myton Road and Coten End, the Edwardian and 1930s homes generally take standard mortice and nightlatch replacements. On the modern estates — Woodloes Park, Chase Meadow and Warwick Gates — a lock change usually means a euro cylinder swap on a uPVC or composite door, which is quick and keeps the existing multipoint mechanism. I match the replacement to the door in front of me rather than forcing one solution on every property.",
      "commonJobs": [
        "Full lock changes for new owners moving into homes around Myton Road and Coten End",
        "Euro cylinder swaps on composite doors at Warwick Gates and Chase Meadow after key loss",
        "Landlord lock changes between tenancies across CV34",
        "BS3621 five-lever mortice deadlocks fitted to timber doors in the town centre",
        "Sympathetic replacements for worn-out locks on listed and period doors"
      ],
      "faqs": [
        {
          "q": "I've just bought a house in Warwick — should I change the locks straight away?",
          "a": "I'd always recommend it. You have no way of knowing how many keys previous owners, trades or agents still hold. A cylinder swap on a modern door or a mortice change on a timber one is quick, and I can usually fit you in within a day or two of calling — often same day."
        },
        {
          "q": "Can you change the locks on a rental property between tenants?",
          "a": "Yes — tenancy changeovers are regular work for me in Warwick. On most modern doors it's a straightforward euro cylinder swap, which keeps the cost down for landlords. I can also arrange the keys to suit however you manage the property."
        },
        {
          "q": "Can you fit locks so one key opens every door in my house?",
          "a": "Often, yes. Keyed-alike euro cylinders are simple to arrange on uPVC and composite doors, so front and back doors work on a single key. Bringing timber-door mortice locks into the same suite is more limited, but I'll tell you honestly what's achievable on your particular doors."
        },
        {
          "q": "How long does a lock change take?",
          "a": "A euro cylinder swap typically takes under half an hour. A mortice lock change on a timber door takes longer, particularly if the new case needs the door adjusting to fit, but most single-lock changes in Warwick are finished well within an hour of me arriving."
        }
      ],
      "priceNote": "Lock changes in Warwick start from £69 with no VAT and no call-out fee — I'll confirm the exact price for your lock type on the phone before booking you in."
    },
    {
      "service": "upvc-lock-repair",
      "metaTitle": "uPVC Door Lock Repair Warwick | From £59 | No VAT",
      "metaDescription": "uPVC door lock repairs in Warwick from £59 — gearbox failures, seized mechanisms and euro cylinders sorted. 25-35 minutes to CV34. Call 024 7522 4730.",
      "h1": "uPVC Door Lock Repair in Warwick",
      "intro": [
        "A uPVC door that won't lock is one of the most common calls I get from Warwick's modern estates. Usually the culprit is the multipoint gearbox — the central mechanism that throws all the locking points when you lift the handle — which wears over the years and then fails, often without much warning. I'm Ross, an independent locksmith, and I repair these doors across the whole CV34 area.",
        "Most uPVC and composite door problems don't need a new door. A failed gearbox can be replaced, a seized mechanism can often be freed and serviced, a misaligned door can be adjusted so it locks smoothly again, and a worn euro cylinder can be swapped in minutes. For emergencies — a door stuck locked, or one that won't secure at all — I can reach Warwick in 25-35 minutes via the A46, and I book non-urgent repairs in at a time that suits you.",
        "Repairs start from £59 with no VAT and no call-out fee. Describe the fault when you call 024 7522 4730 and I'll give you an honest price and a likely diagnosis over the phone."
      ],
      "localAngleHeading": "Multipoint Lock Failures at Woodloes Park, Chase Meadow and Warwick Gates",
      "localAngleBody": "Warwick's three big modern estates — Woodloes Park off the Kenilworth Road, Chase Meadow to the west and Warwick Gates to the south — were built from the 1990s through to the 2010s with uPVC and composite doors and multipoint locks as standard. Those mechanisms are now anywhere up to thirty years old, and gearbox failures and stiff, misaligned doors are exactly what I see on estates of this age. A handle that needs forcing upwards, a key that only turns when you pull the door towards you, or a mechanism that has suddenly gone slack are all early warnings worth acting on — a serviced and adjusted door is a far cheaper job than a snapped gearbox with the door stuck shut. I carry the common gearbox types and cylinder sizes on the van.",
      "commonJobs": [
        "Multipoint gearbox replacements on uPVC doors at Woodloes Park",
        "Realigning dropped composite doors at Warwick Gates so they lock without force",
        "Freeing and servicing seized multipoint mechanisms at Chase Meadow",
        "Euro cylinder replacements where keys have become stiff or stopped turning",
        "Handle and spring repairs on uPVC doors across CV34"
      ],
      "faqs": [
        {
          "q": "My handle lifts but the key won't turn — what's gone wrong?",
          "a": "That usually points to the gearbox inside the multipoint strip or a failing euro cylinder, and occasionally to the door dropping out of alignment. I can normally tell which from your description over the phone, and I carry parts for the common failures on Warwick's estate doors."
        },
        {
          "q": "Do I need a whole new door if the multipoint lock fails?",
          "a": "Very rarely. The gearbox is a replaceable part, and full multipoint strips can be swapped too. Replacing the mechanism costs a fraction of a new door and keeps the door and glazing you already have. I'd only suggest a new door if the door itself is beyond saving."
        },
        {
          "q": "My uPVC door has become very stiff to lock — should I wait until it fails?",
          "a": "No — stiffness is the warning stage. Forcing the handle up is usually what snaps a worn gearbox, and a door stuck shut is a bigger, dearer job. An adjustment and service while everything still works is the cheap fix."
        },
        {
          "q": "Can you repair composite doors as well as uPVC?",
          "a": "Yes — the composite doors on Warwick's newer estates use the same multipoint mechanisms and euro cylinders as uPVC doors, so the repairs are the same. Alignment work differs slightly because composite doors are heavier, but it's all everyday work for me."
        }
      ],
      "priceNote": "uPVC door lock repairs in Warwick start from £59 — no VAT, no call-out fee — with the price confirmed on the phone once you've described the fault."
    },
    {
      "service": "boarding-up",
      "metaTitle": "Boarding Up Warwick | From £79 | No VAT | 24/7",
      "metaDescription": "Emergency boarding up in Warwick from £79 — broken windows and doors secured 24/7, 25-35 minute response, same-visit lock change. Call 024 7522 4730.",
      "h1": "Emergency Boarding Up in Warwick",
      "intro": [
        "After a break-in or damage to a door or window, the priority is simple: make the property secure again, fast. I provide 24/7 emergency boarding up across Warwick — homes and business premises alike — and I can typically be with you in 25-35 minutes via the A46.",
        "I board over broken glazing and damaged doors with securely fixed timber sheeting, leaving the property weathertight and protected until proper repairs can be arranged. If the lock was forced or the intruder took keys, I can change the locks in the same visit rather than leaving you waiting for a second appointment. I work cleanly, and even a badly damaged opening can usually be made safe within the hour.",
        "Boarding up starts from £79 with no VAT and no call-out fee — the final price depends on the size and number of openings, and I'll confirm it on the phone. Call 024 7522 4730, any hour."
      ],
      "localAngleHeading": "Securing Warwick Homes and Shops After Break-Ins",
      "localAngleBody": "Boarding work in Warwick splits between the historic centre and the estates. Around the Market Place, Smith Street and Jury Street, many buildings have period frontages and a good number are listed, so I fix boarding in ways that secure the opening without doing avoidable damage to old timber and historic fabric. Residential period properties need the same considered approach — a broken sash or a forced timber door on a Georgian or Victorian house shouldn't be treated like a modern one. Out at Woodloes Park, Chase Meadow and Warwick Gates, the typical job is a forced uPVC or composite door or a broken double-glazed unit; there the boarding is usually a stopgap while a replacement panel or glass unit is ordered, and a same-visit lock or cylinder change gets the household properly secure overnight.",
      "commonJobs": [
        "Boarding forced front doors after break-ins, with a same-visit lock change",
        "Securing broken shop windows around the Market Place and Smith Street",
        "Boarding smashed double-glazed units on estate homes while replacement glass is ordered",
        "Making forced uPVC and composite doors safe at Warwick Gates and Chase Meadow",
        "Careful temporary boarding on period and listed buildings in the town centre"
      ],
      "faqs": [
        {
          "q": "Can you change the locks at the same time as boarding up?",
          "a": "Yes, and after a burglary I'd recommend it — locks are often damaged in a forced entry, and sometimes keys are taken. Doing both in one visit means the property is properly secure before I leave, with no need for a second appointment."
        },
        {
          "q": "Should I wait for the police before anything is boarded up?",
          "a": "Report the break-in and get a crime reference number first, and photograph the damage for your insurer. If the police want to examine the scene, I can board around the affected area or wait until they've finished — but don't leave the property open overnight; securing it promptly is reasonable and expected."
        },
        {
          "q": "How long can the boarding stay in place?",
          "a": "It's a temporary measure, but a solid one — securely fixed timber sheeting will keep the property weathertight and secure for the days or weeks it takes to arrange a glazier or a replacement door. I fix it so it can be removed cleanly when the repair happens."
        },
        {
          "q": "Do you board up commercial premises in Warwick as well as homes?",
          "a": "Yes — shopfronts and business premises included, day or night. Many commercial buildings in Warwick's centre have period frontages, and I take care to secure them without unnecessary damage to the fabric. If entry doors were forced, I can replace the locks on the same visit."
        }
      ],
      "priceNote": "Emergency boarding up in Warwick starts from £79 — no VAT, no call-out fee — with the exact price confirmed on the phone based on the size and number of openings."
    },
    {
      "service": "lock-upgrade",
      "metaTitle": "Lock Upgrade Warwick | From £79 | No VAT | BS3621",
      "metaDescription": "Lock upgrades in Warwick from £79 — BS3621 deadlocks and anti-snap cylinders incl. Ultion, fitted across CV34. 25-35 min response. Call 024 7522 4730.",
      "h1": "Lock Upgrades in Warwick",
      "intro": [
        "Warwick homeowners have good reason to take security seriously — many of the town's properties are valuable, characterful and, in the centre, centuries old. I upgrade locks across CV34: BS3621 insurance-approved mortice deadlocks for timber doors, anti-snap euro cylinders for uPVC and composite doors, and whole-house packages where you want every external door brought up to standard in one visit.",
        "I carry premium cylinders including Ultion and ABS alongside solid mid-range options, and I recommend based on your doors and your insurance requirements rather than pushing the dearest product. Upgrades are usually planned work, so I'll book a time that suits you — though being 25-35 minutes from Warwick via the A46, I can often fit urgent requests in quickly.",
        "Upgrades start from £79 with no VAT and no call-out fee. Tell me what's currently on your doors when you call 024 7522 4730 and I'll price the work honestly before I attend."
      ],
      "localAngleHeading": "Modern Security for a Town of Listed Buildings",
      "localAngleBody": "Upgrading locks in Warwick's centre takes judgement. The Tudor, Georgian and Victorian houses along Jury Street, Castle Street, Church Street and the High Street — many of them Grade II listed — often carry original rim locks, Georgian lever locks or ageing mortice deadlocks that fall short of what insurers expect today. The upgrade has to add real security without damaging historic fabric, which usually means a carefully positioned BS3621 mortice deadlock or a discreet additional lock, fitted with respect for the door. It's exactly the kind of request I get from Warwick owners wanting to protect a valuable period property without spoiling its character. On the newer estates the job is simpler but just as worthwhile: many builder-fitted euro cylinders at Woodloes Park, Chase Meadow and Warwick Gates aren't anti-snap, and swapping them is a quick, meaningful improvement.",
      "commonJobs": [
        "BS3621 mortice deadlocks fitted to timber doors on period houses in the town centre",
        "Anti-snap cylinder upgrades, including Ultion and ABS, on estate composite doors",
        "Whole-house security upgrades covering front, back and side doors in one visit",
        "Discreet additional security for listed and conservation-area properties",
        "Insurance-driven upgrades where a policy requires BS3621 locks"
      ],
      "faqs": [
        {
          "q": "My insurer requires BS3621 locks — what does that actually mean?",
          "a": "BS3621 is the British Standard for thief-resistant locks — typically a five-lever mortice deadlock carrying the kitemark. Many older Warwick doors have five-lever locks that look similar but were never tested to the standard. I can check what you have and fit compliant locks where needed."
        },
        {
          "q": "Is it worth upgrading the cylinders on a newer house at Warwick Gates or Chase Meadow?",
          "a": "Usually, yes. Builder-fitted euro cylinders on 1990s-2010s doors are often not anti-snap, and cylinder snapping is a well-known burglary method on uPVC and composite doors. Swapping to an anti-snap cylinder is a quick job that removes the door's most obvious weakness."
        },
        {
          "q": "Do you fit Ultion and ABS cylinders in Warwick?",
          "a": "Yes — I carry premium anti-snap cylinders including Ultion and ABS as well as good mid-range alternatives. I'll explain the practical differences and price each option clearly, so you can choose what suits your doors and budget rather than being steered to the most expensive."
        },
        {
          "q": "Can you upgrade every door in the house in one visit?",
          "a": "Yes — whole-house upgrades are regular work for me. I look at each external door, recommend the right lock or cylinder for it, and fit everything in a single visit where stock allows. Keyed-alike cylinders can be included so one key covers several doors."
        }
      ],
      "priceNote": "Lock upgrades in Warwick start from £79 — no VAT and no call-out fee — and I'll confirm the exact price for the locks you choose on the phone before I attend."
    }
  ],
  "kenilworth": [
    {
      "service": "emergency-lockout",
      "metaTitle": "Emergency Lockout Kenilworth | From £59 | No VAT | 24/7",
      "metaDescription": "Locked out in Kenilworth? I'm an independent locksmith, 25-35 minutes away via the A429. Non-destructive entry from £59, no VAT. Call 024 7522 4730.",
      "h1": "Emergency Lockout Locksmith in Kenilworth",
      "intro": [
        "Locked out in Kenilworth? I'm Ross, an independent locksmith based in Coventry, and I cover the whole CV8 area day and night. I come down the A429, and from a call I can usually be at your door in 25-35 minutes — whether you're in a terrace on Station Road, a detached house on Castle Road, or one of the newer homes off Farmer Ward Road.",
        "I always try non-destructive entry first. Most lockouts — a slammed door, a jammed mortice, a key snapped off in the cylinder — can be opened without damaging the lock or the door, which matters when the door is a quality piece of hardwood or a modern composite. If a lock genuinely has to be drilled, I'll tell you before I start, not after.",
        "Pricing is straightforward: lockouts start from £59 with no VAT and no call-out fee, and I'll confirm the price on the phone before I set off. It's the same price at 3am as it is at 3pm. Call 024 7522 4730 and I'll get moving."
      ],
      "localAngleHeading": "Getting Into Kenilworth's Better-Quality Doors Without Damage",
      "localAngleBody": "Kenilworth locks are, on the whole, better than the average I see around Coventry — and that changes how a lockout should be handled. The Victorian and Edwardian terraces along Station Road and the lower end of Warwick Road still have solid wood doors with traditional mortice locks, and a jammed or seized mortice is one of the most common reasons I'm called out here. The substantial period and interwar homes around Abbey Fields, Castle Road, and Abbey Hill usually have quality hardwood doors with high-specification locks — exactly the doors you don't want attacked with a drill. On the newer developments at Castle Fields and off Farmer Ward Road, lockouts tend to involve euro cylinders on composite doors. In every case my approach is the same: pick, manipulate, and open cleanly first; drill only as a last resort, and only with your say-so.",
      "commonJobs": [
        "Opening a jammed mortice lock on a Victorian terrace on Station Road",
        "Non-destructive entry to a composite door on the estates off Farmer Ward Road after lost keys",
        "Snapped key extraction from a hardwood front door near Abbey Fields",
        "Late-night lockout at a detached home on Castle Road with a high-security cylinder",
        "Gaining entry for a resident whose only set of keys was lost while out in town"
      ],
      "faqs": [
        {
          "q": "Will you damage my door getting me back into my Kenilworth home?",
          "a": "Almost never. I open the vast majority of doors non-destructively by picking or manipulating the lock, which matters on Kenilworth's hardwood and composite doors. If a lock is beyond saving and has to be drilled, I'll explain why before I start and can usually fit a replacement in the same visit."
        },
        {
          "q": "Can you open high-security and anti-snap cylinders if I'm locked out?",
          "a": "Yes, though they take longer than standard locks — that's exactly what they're designed for. Plenty of Kenilworth homes have premium cylinders fitted, and I carry the tools to deal with them. Worst case, the cylinder is replaced and you're back inside with new keys the same visit."
        },
        {
          "q": "My key has snapped off in the lock — do I need a whole new lock?",
          "a": "Often not. I can usually extract the broken piece, and if the lock itself is undamaged your spare key will work exactly as before. If the key snapped because the lock or cylinder was already failing, I'll show you the problem and quote for a replacement on the spot."
        },
        {
          "q": "Do you need to see ID before you open my door?",
          "a": "Yes — I'll ask for photo ID and something linking you to the address, or another reasonable way of showing the property is yours to enter. It protects you as much as me. If your wallet is locked inside, I can complete the check once the door is open."
        }
      ],
      "priceNote": "Emergency lockouts in Kenilworth start from £59 — no VAT and no call-out fee, and I'll confirm the exact price on the phone before I head over."
    },
    {
      "service": "lock-change",
      "metaTitle": "Lock Change Kenilworth | From £69 | No VAT | 24/7",
      "metaDescription": "Lock changes across Kenilworth CV8 from £69 with no VAT. Independent locksmith, typically 25-35 minutes away. BS3621 options fitted. Call 024 7522 4730.",
      "h1": "Lock Change & Replacement in Kenilworth",
      "intro": [
        "Moving into a new home, losing a set of keys, or taking a property back at the end of a tenancy all lead to the same sensible decision: change the locks. I'm Ross, an independent locksmith covering Kenilworth from Coventry, and I fit new locks across the whole CV8 area — typically with you within 25-35 minutes via the A429 for urgent jobs, or at a time that suits you for planned work.",
        "I carry a full range on the van: BS3621 five-lever mortice deadlocks for timber doors, euro cylinders for uPVC and composite doors, and nightlatches for terraced front doors. Every lock change comes with a fresh set of keys, and I'll tell you honestly whether a full lock change or a simple cylinder swap is the right job for your door.",
        "Prices start from £69 with no VAT and no call-out fee. Tell me the door and lock type over the phone on 024 7522 4730 and I'll give you a clear price before I arrive."
      ],
      "localAngleHeading": "New Locks for New Owners Around Abbey Fields and Castle Road",
      "localAngleBody": "Kenilworth's property market sits at the premium end, and buyers here take the sensible view that a lock change belongs on moving-in day — you have no idea how many keys previous owners handed to cleaners, trades, and neighbours over the years. On the substantial homes around Abbey Fields, Castle Road, and Abbey Hill, that usually means replacing quality mortice locks in hardwood doors, and I fit like-for-like or better — BS3621 where your insurance requires it. The Victorian terraces on Station Road and the lower end of Warwick Road often need a mortice and nightlatch renewed as a pair. On the newer executive homes at Castle Fields and off Farmer Ward Road, a lock change is usually a euro cylinder swap in a composite door — a quicker job, and priced accordingly.",
      "commonJobs": [
        "Full lock change on completion day for buyers of a detached home near Abbey Fields",
        "Replacing a mortice deadlock and nightlatch together on a Station Road terrace",
        "Euro cylinder change on a composite door in the Castle Fields development after keys went missing",
        "Lock change following a lost handbag containing both keys and address details",
        "End-of-tenancy lock change with the new keys handed over the same day"
      ],
      "faqs": [
        {
          "q": "Should I change the locks when I buy a house in Kenilworth?",
          "a": "I'd always recommend it, and in Kenilworth most buyers do. Estate agents, previous owners, trades, and relatives may all hold keys you'll never see. A lock change on moving-in day means the only keys in circulation are the ones I hand to you — usually done within the hour for a standard front and back door."
        },
        {
          "q": "Can you fit new locks that all work from one key?",
          "a": "Yes — euro cylinders can be keyed alike, so your front, back, and side doors all open on a single key. It's a popular request on Kenilworth's larger homes with several external doors. Tell me how many doors you have when you call and I'll bring matched cylinders."
        },
        {
          "q": "What's the difference between changing the lock and just changing the cylinder?",
          "a": "On uPVC and composite doors, the cylinder is the part your key turns — swapping it changes the keys without touching the multipoint mechanism, which is quicker and cheaper. On timber doors, a lock change usually means replacing the full mortice case or nightlatch. I'll always do the smaller job where it's the right one."
        },
        {
          "q": "How quickly can you change locks after a break-in in Kenilworth?",
          "a": "Break-in lock changes are treated as emergencies — typically 25-35 minutes to reach CV8 at any hour. I'll replace or secure the damaged locks on the spot, and if the door or frame is too damaged to lock properly, I can board it up in the same visit so the house is safe overnight."
        }
      ],
      "priceNote": "Lock changes in Kenilworth start from £69 — no VAT, no call-out fee, and the exact price is confirmed on the phone once I know your door and lock type."
    },
    {
      "service": "upvc-lock-repair",
      "metaTitle": "uPVC Lock Repair Kenilworth | From £59 | No VAT | 24/7",
      "metaDescription": "uPVC and composite door lock repairs in Kenilworth from £59, no VAT. Gearbox failures, misalignment, cylinders — 25-35 minutes away. Call 024 7522 4730.",
      "h1": "uPVC Door Lock Repair in Kenilworth",
      "intro": [
        "A uPVC or composite door that's getting harder to lock is a mechanism telling you it's about to fail — and it usually picks the worst possible moment. I repair multipoint locks, gearboxes, and euro cylinders across Kenilworth, from the newer estates to replacement doors on older properties, and I can typically be with you in 25-35 minutes when a door has failed outright.",
        "Most calls fall into a few patterns: a handle that won't lift to throw the locking points, a gearbox that's failed with the door shut, a key that turns without unlocking anything, or a door that's dropped and no longer meets its keeps. I carry gearboxes and cylinders on the van, so the majority of repairs are finished in a single visit — and where the fix is a simple realignment, that's what you'll pay for, not a new mechanism you didn't need.",
        "Repairs start from £59 with no VAT and no call-out fee. Describe the symptoms on 024 7522 4730 and I'll tell you what's likely wrong before I set off."
      ],
      "localAngleHeading": "Multipoint Lock Repairs on Castle Fields and the Farmer Ward Road Estates",
      "localAngleBody": "The newer developments in Kenilworth — the executive homes on the former Castle Fields site and the estates off Farmer Ward Road — came with composite doors and multipoint locking as standard, and servicing and adjusting those mechanisms is now a regular part of my work in town. Composite doors are heavy; over time the hinges settle and the locking points drift out of line with their keeps. Caught early, that's a realignment job rather than a breakdown — left alone, the strain transfers to the gearbox, which is the part that eventually gives up. Euro cylinder trouble on composite doors is the other pattern I see in CV8: stiff keys, cylinders failing mid-turn, the occasional snapped key. And if your home has a uPVC replacement door of any age, I repair those mechanisms too — a failed gearbox is not a reason to buy a new door.",
      "commonJobs": [
        "Replacing a failed multipoint gearbox on a composite door at Castle Fields",
        "Realigning a dropped composite door off Farmer Ward Road so the handle lifts smoothly again",
        "Euro cylinder replacement where the key had started sticking mid-turn",
        "Freeing a multipoint mechanism jammed in the locked position with the owner stood outside",
        "Adjusting keeps and hinges on a door that would only lock when slammed"
      ],
      "faqs": [
        {
          "q": "My handle won't lift to lock the door — what's actually wrong?",
          "a": "Usually one of two things. If the door locks fine when you pull it firmly towards you, it's misalignment — the locking points are missing their keeps, and an adjustment sorts it. If lifting the handle does nothing even with the door open, the gearbox inside the multipoint strip has failed and needs replacing."
        },
        {
          "q": "The gearbox has failed — do I need a whole new door?",
          "a": "No. The gearbox is a replaceable component, and I carry the common types on the van. Even on Kenilworth's composite doors, a failed mechanism is a repair, not a door replacement — it typically costs a fraction of a new door and is usually done in one visit."
        },
        {
          "q": "Can you repair composite doors on the newer Kenilworth estates, or just uPVC?",
          "a": "Both. The homes at Castle Fields and off Farmer Ward Road mostly have composite doors, and their multipoint mechanisms and euro cylinders are the same families of hardware I work on daily. Adjustment, gearbox replacement, and cylinder swaps are all routine jobs on composite doors."
        },
        {
          "q": "The door has failed shut and I can't get in — is that still a repair job?",
          "a": "Yes, and it's common — gearboxes tend to fail in the locked position. I'll open the door first, non-destructively wherever possible, then replace the failed mechanism in the same visit. If you're stood outside a Kenilworth door that won't open, call 024 7522 4730 — I'm typically 25-35 minutes away."
        }
      ],
      "priceNote": "uPVC and composite door lock repairs in Kenilworth start from £59 — no VAT, no call-out fee, and I'll confirm the price on the phone once you've described the fault."
    },
    {
      "service": "boarding-up",
      "metaTitle": "Emergency Boarding Up Kenilworth | From £79 | 24/7",
      "metaDescription": "24/7 boarding up in Kenilworth after break-ins or damage. From £79, no VAT, usually with you in 25-35 minutes. Same-visit lock change. Call 024 7522 4730.",
      "h1": "Emergency Boarding Up in Kenilworth",
      "intro": [
        "After a break-in or accidental damage, the priority is simple: make the property secure before anything else. I provide 24-hour emergency boarding up across Kenilworth and the wider CV8 area, securing broken windows, damaged doors, and smashed glazing with solid timber boarding that holds until permanent repairs are arranged.",
        "I'm based in Coventry and come down the A429, typically reaching Kenilworth in 25-35 minutes. Because I'm a locksmith first, I can deal with the whole problem in one visit — board the broken window or door, then change or repair any locks that were forced at the same time, so you're not left waiting for a second trade before the house is properly secure.",
        "Boarding up starts from £79 with no VAT and no call-out fee. Call 024 7522 4730, tell me what's been damaged, and I'll confirm the price and get on the road."
      ],
      "localAngleHeading": "Securing Kenilworth Homes After Break-Ins and Damage",
      "localAngleBody": "Kenilworth's housing puts a particular slant on boarding-up work. The substantial detached homes around Castle Road, Abbey Hill, and Abbey Fields are exactly the properties where a forced door or broken window feels most exposed — and where owners want the place properly secured the same night, not patched with a bin bag and tape. Period properties here often have glazed panels in and around quality hardwood doors, which need careful boarding that protects the opening without wrecking the surrounding joinery. On the newer developments at Castle Fields and off Farmer Ward Road, damage usually involves composite doors and their frames — sometimes the door still functions and only needs the lock replaced, sometimes it needs boarding until a replacement door arrives. Either way, I won't leave until the property is secure, weathertight, and lockable.",
      "commonJobs": [
        "Boarding a smashed glazed panel beside a hardwood front door near Abbey Fields",
        "Securing a forced rear door at a detached home on Castle Road after an attempted burglary",
        "Boarding a broken ground-floor window and changing the front door lock in the same visit",
        "Making a damaged composite door safe on one of the Farmer Ward Road estates while a replacement is on order",
        "Overnight boarding after accidental glass breakage so the house stays secure until a glazier attends"
      ],
      "faqs": [
        {
          "q": "Can you change the locks at the same time as boarding up?",
          "a": "Yes, and after a break-in you usually should — if a door was forced, the lock is often damaged, and if keys were taken you need new locks regardless. I carry boarding materials and a full range of locks on the van, so both jobs are done in a single visit."
        },
        {
          "q": "Is boarding up secure enough to leave the house overnight?",
          "a": "Yes. I fix solid timber boarding into sound frame or masonry rather than tacking on a loose sheet, so a boarded window or door is a genuine barrier — often harder to get through quietly than the glass it replaced. It's temporary, but it's something you can safely sleep behind or leave unattended."
        },
        {
          "q": "Will you come out to Kenilworth for boarding up in the middle of the night?",
          "a": "Yes — break-ins don't keep office hours, and most boarding calls come in late. I run a genuine 24-hour service to Kenilworth, typically arriving within 25-35 minutes, and the from-price is the same at night as during the day: from £79 with no VAT and no call-out fee."
        },
        {
          "q": "What happens after the boarding — do you do the permanent repair too?",
          "a": "The boarding keeps the property secure and weathertight until permanent repairs happen. I handle everything lock-related — replacement locks, cylinders, and mechanisms — while new glazing or a new door comes from a glazier or door supplier. The boarding will hold for as long as that takes, and I provide an invoice you can use for any insurance claim."
        }
      ],
      "priceNote": "Emergency boarding up in Kenilworth starts from £79 — no VAT, no call-out fee, and I'll confirm the price on the phone before I set off."
    },
    {
      "service": "lock-upgrade",
      "metaTitle": "Lock Upgrades Kenilworth | From £79 | Anti-Snap | BS3621",
      "metaDescription": "Anti-snap cylinders and BS3621 locks fitted across Kenilworth from £79, no VAT. Independent locksmith, 25-35 minutes away. Call Ross on 024 7522 4730.",
      "h1": "Lock Upgrades & High-Security Locks in Kenilworth",
      "intro": [
        "Upgrade work makes up more of my Kenilworth diary than any other job — it's the most security-conscious town I cover, and understandably so given the value of the housing here. I fit BS3621 insurance-approved mortice deadlocks, anti-snap euro cylinders including premium brands like Ultion and ABS, and complete whole-house security upgrades across the CV8 area.",
        "Most upgrades are planned visits booked at a time that suits you, though I can attend quickly when something has prompted the change — typically 25-35 minutes from Coventry via the A429. I'll walk the house with you, look at every external door, and tell you plainly which locks are fine, which fall short of your insurance small print, and which would be the weak point a burglar goes for.",
        "Upgrades start from £79 with no VAT and no call-out fee. Call 024 7522 4730, tell me what doors you have, and I'll price the work before I arrive."
      ],
      "localAngleHeading": "Whole-House Security for Kenilworth's Higher-Value Homes",
      "localAngleBody": "Security upgrades are the most requested job in Kenilworth for a straightforward reason: the homes here are worth protecting properly. The substantial period and interwar houses around Castle Road, Abbey Hill, and Abbey Fields usually have quality hardwood doors already — the upgrade is making sure the locks match the door, with BS3621 five-lever mortice deadlocks and, where there's a cylinder, one that resists snapping. On the executive homes at Castle Fields and off Farmer Ward Road, the composite doors themselves are sound, but the factory-fitted euro cylinders are often standard grade — the single component that snapping attacks target, and the first thing I'd swap for an Ultion or ABS. Even the Victorian terraces on Station Road benefit: many still carry older mortice locks that a modern insurance-rated replacement improves at modest cost.",
      "commonJobs": [
        "Fitting Ultion or ABS anti-snap cylinders to the front and back doors of a Castle Fields home",
        "Upgrading an ageing mortice to a BS3621 deadlock on a Victorian terrace on Station Road",
        "Whole-house upgrade with keyed-alike high-security cylinders at a detached home near Abbey Fields",
        "Swapping standard factory cylinders on an estate house off Farmer Ward Road after the owner read about lock snapping",
        "Adding a high-security mortice deadlock to a hardwood door on Abbey Hill"
      ],
      "faqs": [
        {
          "q": "How do I know if my current euro cylinder is anti-snap?",
          "a": "Look at the face of the cylinder around the keyhole: genuine anti-snap cylinders usually carry a kitemark with a star rating, and brands like Ultion are clearly stamped. Plain, unbranded cylinders are almost certainly standard grade. If you're unsure, describe or photograph it and ask when you call 024 7522 4730."
        },
        {
          "q": "Do I need new locks or just new cylinders to upgrade a composite door?",
          "a": "Usually just the cylinder. On composite and uPVC doors the multipoint mechanism is generally sound — the vulnerability is the standard euro cylinder, and swapping it for an anti-snap version transforms the door's security in around twenty minutes. If the mechanism itself is worn I'll say so, but I won't sell you parts you don't need."
        },
        {
          "q": "Can you upgrade every door in the house in one visit?",
          "a": "Yes — whole-house upgrades are one of my most common Kenilworth bookings. I survey each external door, fit the right lock or cylinder to each, and can key the cylinders alike so one key runs the house. Most whole-house jobs are completed in a single visit; I'll confirm timing when you book."
        },
        {
          "q": "Is lock snapping really a risk on Kenilworth homes?",
          "a": "Lock snapping is a well-documented burglary method that targets standard euro cylinders — the type factory-fitted to many composite and uPVC doors, including on Kenilworth's newer estates. I can't give you street-by-street crime figures, but the fix is inexpensive and permanent: an accredited anti-snap cylinder removes that attack route altogether."
        }
      ],
      "priceNote": "Lock upgrades in Kenilworth start from £79 — no VAT, no call-out fee, and I'll confirm the full price on the phone once I know how many doors you want upgraded."
    }
  ],
  "stratford-upon-avon": [
    {
      "service": "emergency-lockout",
      "metaTitle": "Emergency Lockout Stratford-upon-Avon | From £59 | 24/7",
      "metaDescription": "Locked out in Stratford-upon-Avon? I open doors 24/7, non-destructive first. Typically 35-45 minutes to CV37, from £59. Call Ross on 024 7522 4730.",
      "h1": "Emergency Lockout Service in Stratford-upon-Avon",
      "intro": [
        "Locked out in Stratford-upon-Avon? I'm Ross, an independent locksmith based in Coventry, and I attend lockouts across the whole CV37 area day and night. Stratford sits at the southern edge of my patch, so I'll be honest with you upfront: my typical response time is 35-45 minutes, travelling down via the A46 and A422. If I'm on another job when you ring, I'll tell you exactly how long you'll wait — no promises I can't keep.",
        "Non-destructive entry always comes first. Most lockouts — a slammed door, a lost key, a key snapped off in the cylinder — can be resolved by picking or bypassing the lock, which means you keep your existing lock and keys. Snapped key extraction is a routine part of the job here, particularly on the older mortice locks found throughout Stratford's period housing.",
        "Pricing starts from £59 and I'll confirm the exact figure on the phone before I set off, so there are no surprises at the door. Call 024 7522 4730 any time."
      ],
      "localAngleHeading": "Gaining Entry to Stratford's Period Doors",
      "localAngleBody": "A lockout in Stratford is rarely a standard job. The town centre's Tudor and Georgian buildings along Henley Street, Chapel Street, and Sheep Street often have original rim locks or heavy Victorian mortice mechanisms, and many are listed — so forcing the door simply isn't an option. I open these with picks and specialist tools, taking my time around historic fabric. The Victorian terraces around Scholars Lane and Arden Street lean towards worn mortice locks and tired nightlatches that give up at the worst possible moment. And with so many holiday lets and B&Bs in town, I'm sometimes letting in a guest stuck outside with a key that won't turn in an unfamiliar lock. Whatever door you're locked out of, my first goal is getting you in without damaging it.",
      "commonJobs": [
        "Opening slammed nightlatch doors on the Victorian terraces around Scholars Lane and Arden Street",
        "Extracting snapped keys from seized mortice locks in town centre period properties",
        "Letting guests and property managers back into holiday lets and B&Bs near the centre",
        "Non-destructive entry to listed buildings where the door must not be marked",
        "Late-night lockouts on the modern estates along Stratford's southern edge"
      ],
      "faqs": [
        {
          "q": "Will you damage my door or lock getting me back in?",
          "a": "My aim is always non-destructive entry — picking or bypassing the lock so both the door and the lock survive intact. On the rare occasion a lock has genuinely failed and has to be drilled, I'll explain why before touching it and fit a replacement on the same visit."
        },
        {
          "q": "My key has snapped off inside the lock — can you get it out?",
          "a": "Yes — snapped keys are one of my most common Stratford extractions, especially from older mortice locks where worn levers grip the blade. I remove the broken piece without drilling wherever possible, check the lock still runs smoothly, and if it's worn beyond saving I can replace it on the spot."
        },
        {
          "q": "Do I need to prove I live at the property before you open it?",
          "a": "Yes — I'll ask for ID or another reasonable proof of connection to the address, which can be documents inside the property once the door is open. It protects you as much as anyone: no honest locksmith should open a door without checking who they're opening it for."
        },
        {
          "q": "Can you attend a lockout in Stratford in the middle of the night?",
          "a": "Yes — I answer the phone around the clock and attend Stratford lockouts at night as well as during the day. Because I travel down from Coventry, the honest wait is 35-45 minutes, so call 024 7522 4730 as soon as you know you're stuck rather than struggling with the door first."
        }
      ],
      "priceNote": "Emergency lockouts in Stratford-upon-Avon start from £59 with no VAT and no call-out fee — I'll confirm the exact price on the phone before I set off."
    },
    {
      "service": "lock-change",
      "metaTitle": "Lock Change Stratford-upon-Avon | From £69 | No VAT",
      "metaDescription": "Lock changes across Stratford-upon-Avon from £69 — moves, lost keys, tenancy changes. BS3621 options fitted. 35-45 min response. Call 024 7522 4730.",
      "h1": "Lock Change & Replacement in Stratford-upon-Avon",
      "intro": [
        "New house, new locks — it's the one security job I'd urge every mover in Stratford-upon-Avon to sort in the first week. You've no idea how many copies of the old keys are floating about, and the same logic applies after a lost handbag, a burglary, or a tenant moving on. I change locks across the whole CV37 area, from the town centre out to Shottery, Bishopton, and the estates on the southern fringe.",
        "I fit BS3621 five-lever mortice locks for timber doors — the standard most home insurance policies ask for — and euro cylinders for uPVC and composite doors, including anti-snap options. Working from Coventry, I'm typically 35-45 minutes away, and most lock changes are completed in a single visit with the new keys handed over on the spot.",
        "Prices start from £69 per lock and I'll give you a clear figure on the phone before anything is booked in. Call 024 7522 4730."
      ],
      "localAngleHeading": "Lock Changes for Stratford's Georgian Townhouses and Victorian Terraces",
      "localAngleBody": "Stratford's housing asks a lot of a locksmith's van stock. The Victorian terraces around Scholars Lane and Arden Street mostly need traditional five-lever mortice work on timber doors, while the substantial Edwardian and 1930s homes along Tiddington Road and the Banbury Road often carry a mortice-and-nightlatch pairing that's decades old. On the town centre's Georgian townhouses, many in conservation areas, I fit replacements that sit within the original door without altering its appearance. The modern estates on the southern edge and around Shottery and Bishopton are euro cylinder territory — a quicker swap. There's also steady changeover work from holiday-let owners and B&Bs needing locks changed when keys go astray between guests; with the tourist trade here, unaccounted-for keys are a genuine business risk rather than a minor nuisance.",
      "commonJobs": [
        "Full lock changes for buyers moving into homes along Tiddington Road and the Banbury Road",
        "Landlord and tenancy changeover lock changes across CV37",
        "Replacing locks at holiday lets and B&Bs after keys go missing between guests",
        "Fitting BS3621 five-lever mortice deadlocks to timber doors on the Victorian terraces",
        "Euro cylinder changes on composite doors on the newer southern estates"
      ],
      "faqs": [
        {
          "q": "Should I change the locks when I buy a house in Stratford?",
          "a": "I'd say yes, and quickly. Previous owners, their relatives, trades, and cleaners may all still hold keys, and you have no way of knowing how many copies exist. A lock change from £69 on completion day or soon after puts you back in control of exactly who can get in."
        },
        {
          "q": "Can you change the lock without replacing my period front door?",
          "a": "Yes — a lock change never means a door change. On Stratford's older timber doors I fit new mortice locks into the existing pocket wherever sizes allow, or make neat adjustments where they don't. The door itself, including any original furniture you want kept, stays exactly as it is."
        },
        {
          "q": "What lock does my insurer mean by a five-lever mortice to BS3621?",
          "a": "It's a deadlock tested to British Standard 3621, with a kitemark stamped on the faceplate, and it's what many policies require on final exit doors. Plenty of Stratford homes still have older five-lever locks without the kitemark — I can check yours in seconds and swap it if needed."
        },
        {
          "q": "How fast can you change locks after a burglary in Stratford?",
          "a": "I treat burglaries as emergencies, so usually the same day — realistically I'm 35-45 minutes from Stratford once I'm free to travel. If a door or window has been damaged beyond locking, I can board it up on the same visit so the property is left properly secure."
        }
      ],
      "priceNote": "Lock changes in Stratford-upon-Avon start from £69 per lock, with no VAT and no call-out fee — the exact price is confirmed on the phone before I travel."
    },
    {
      "service": "upvc-lock-repair",
      "metaTitle": "uPVC Door Lock Repair Stratford-upon-Avon | From £59",
      "metaDescription": "uPVC door lock repairs in Stratford-upon-Avon — gearbox failures, seized mechanisms, cylinders. From £59, typically 35-45 minutes. Ring 024 7522 4730.",
      "h1": "uPVC Door Lock Repair in Stratford-upon-Avon",
      "intro": [
        "A uPVC door that needs the handle forced up, won't lock unless you pull it towards you, or has a key that suddenly spins without engaging — these are the warning signs of a multipoint lock on its way out, and they account for a good share of my calls to Stratford-upon-Avon. Ignore them and the mechanism usually fails shut, leaving you locked in or locked out.",
        "I repair and replace multipoint gearboxes, free seized mechanisms, swap euro cylinders, and realign doors that have dropped so the hooks and rollers actually meet their keeps. Most repairs are finished in one visit from the parts I carry; where a gearbox is obsolete, I'll identify the model and source the correct replacement.",
        "I come down from Coventry via the A46, typically reaching Stratford in 35-45 minutes for an emergency and by appointment for planned repairs. Prices start from £59, confirmed on the phone before I set off. Ring 024 7522 4730."
      ],
      "localAngleHeading": "Multipoint Lock Failures on Stratford's Modern Estates",
      "localAngleBody": "Stratford's town centre may be famous for its timber-doored period buildings, but a large share of the town's housing is far more ordinary — and that's where the uPVC work is. The newer developments on the southern fringe were built with uPVC and composite doors and multipoint locks as standard, and those mechanisms have a working life; once the gearbox wears, the handle stiffens and eventually jams altogether. Around Shottery and Bishopton, the mix of village character properties and modern estates produces the same steady run of gearbox failures and dropped doors. I also see uPVC replacement doors fitted to older houses on the residential streets, where movement over the years means the door no longer meets its keeps — an alignment fix that's far cheaper than the new door people fear they need.",
      "commonJobs": [
        "Replacing failed multipoint gearboxes on composite doors on the southern estates",
        "Freeing seized mechanisms where the handle has jammed and the door won't open",
        "Realigning dropped uPVC doors around Shottery and Bishopton so they lock without force",
        "Euro cylinder replacements, including upgrades to anti-snap cylinders",
        "Emergency openings where a multipoint mechanism has failed with the door locked shut"
      ],
      "faqs": [
        {
          "q": "My uPVC handle lifts but the key won't turn — what's wrong?",
          "a": "Usually one of two things: the gearbox inside the multipoint strip has failed, or the door has dropped so the locking points bind against the frame. I can normally tell which over the phone from the symptoms. Both are repairable — you very rarely need a new door."
        },
        {
          "q": "Can you open a uPVC door that's jammed shut in Stratford?",
          "a": "Yes — a jammed multipoint mechanism is a common emergency call. I open the door with the least possible damage, then repair or replace the failed gearbox, usually within the same visit. If a part has to be ordered, I'll leave the door secure in the meantime."
        },
        {
          "q": "Is it worth fitting an anti-snap cylinder while you're repairing the door?",
          "a": "Often, yes. If your euro cylinder is a basic unprotected one, snapping is the most common forced-entry method on uPVC and composite doors. Since the door furniture is already apart during a repair, upgrading the cylinder at the same time keeps the overall cost down."
        },
        {
          "q": "My uPVC door mechanism is old — can you still get parts?",
          "a": "Almost always. I carry common gearboxes in the van and can identify obsolete models from measurements and markings, then source a compatible replacement. Full multipoint strips can also be swapped for modern equivalents, so even discontinued mechanisms on Stratford's older uPVC doors can usually be sorted."
        }
      ],
      "priceNote": "uPVC door lock repairs in Stratford-upon-Avon start from £59 with no VAT and no call-out fee, and I'll confirm the price for your particular repair on the phone."
    },
    {
      "service": "boarding-up",
      "metaTitle": "Emergency Boarding Up Stratford-upon-Avon | From £79",
      "metaDescription": "Emergency boarding up in Stratford-upon-Avon from £79 — broken windows and doors secured, 35-45 minute response, locks changed same visit. 024 7522 4730.",
      "h1": "Emergency Boarding Up in Stratford-upon-Avon",
      "intro": [
        "After a break-in, a smashed window, or storm damage, the priority is simple: make the property secure before you deal with anything else. I provide emergency boarding up across Stratford-upon-Avon, cutting and fixing solid timber boards over broken windows and doors so your home or business can't be entered again that night.",
        "Because I'm a locksmith first, I can do what a boarding-only service can't — change or repair the damaged locks on the same visit. If intruders forced the door, snapped the cylinder, or took keys with them, you get the boarding and the new locks sorted in one trip rather than waiting on two separate trades.",
        "Stratford is at the southern end of my coverage, so I'm honest about timing: typically 35-45 minutes from Coventry via the A46. Boarding starts from £79 and I'll confirm the price when you call 024 7522 4730 — any hour, any night."
      ],
      "localAngleHeading": "Securing Stratford's Homes, Businesses, and Holiday Lets",
      "localAngleBody": "Boarding work in Stratford splits between homes and the town's visitor trade. The centre around Henley Street, Sheep Street, and Bridge Street is dense with businesses and guest accommodation, where a broken window can't wait until morning — an unsecured premises is an open invitation, and for a B&B or holiday let it can mean cancelled bookings on top of the damage. On period and listed buildings I board with care, fixing to sound material rather than historic fabric wherever possible, so a temporary repair doesn't leave a permanent scar. Out on the residential streets and the newer estates on the southern edge, the typical call is a door panel kicked through or glazing broken during a burglary — I board the opening and replace the compromised locks before I leave.",
      "commonJobs": [
        "Boarding broken windows at town centre businesses and guest accommodation overnight",
        "Securing forced front doors after burglaries, with lock changes on the same visit",
        "Boarding damaged glazing at holiday lets between guest stays",
        "Careful temporary boarding on period and listed buildings without harming original frames",
        "Storm and accidental damage boarding for homes across CV37"
      ],
      "faqs": [
        {
          "q": "Can you board up and change the locks in one visit?",
          "a": "Yes — that's the main advantage of using a locksmith for boarding. If the break-in damaged your locks or keys were taken, I carry boards, tools, and a full range of locks, so the opening gets boarded and the door gets new locks in a single visit, with the lock work priced separately from the £79 boarding."
        },
        {
          "q": "Is emergency boarding strong enough to leave the property overnight?",
          "a": "Yes — I use solid timber boarding cut to size and fixed securely, not a sheet leant against the frame. It's designed to resist another entry attempt and keep the weather out until your glazier or insurer arranges the permanent repair. The property is left genuinely secure, however late the job finishes."
        },
        {
          "q": "Will boarding up affect my insurance claim after a break-in?",
          "a": "It usually helps it. Most policies require you to take reasonable steps to secure the property after damage, and boarding is exactly that. Keep my invoice — emergency securing costs are often recoverable as part of the claim, though your insurer will confirm what your particular policy covers."
        },
        {
          "q": "Do you board up listed and period buildings in Stratford town centre?",
          "a": "Yes, with extra care. On listed buildings I fix boarding so it does the least possible harm to original frames and fabric, and I'll talk the approach through with you before starting. The aim is a secure property tonight without creating restoration work for you tomorrow."
        }
      ],
      "priceNote": "Emergency boarding up in Stratford-upon-Avon starts from £79 with no VAT and no call-out fee — I'll confirm the price on the phone before heading down."
    },
    {
      "service": "lock-upgrade",
      "metaTitle": "Lock Upgrade Stratford-upon-Avon | From £79 | No VAT",
      "metaDescription": "Lock upgrades in Stratford-upon-Avon — BS3621 deadlocks and anti-snap cylinders fitted from £79. Typically 35-45 minutes away. Call me on 024 7522 4730.",
      "h1": "Lock Upgrades in Stratford-upon-Avon",
      "intro": [
        "Plenty of Stratford-upon-Avon homes are secured by locks that are decades older than the insurance policies covering them. I upgrade locks across CV37 — BS3621 insurance-approved mortice deadlocks for timber doors, anti-snap euro cylinders for uPVC and composite doors, and whole-house upgrades where every external door is brought up to standard in one visit.",
        "This is planned work rather than emergency work, so I'll book a time that suits you; travelling from Coventry, I'm typically 35-45 minutes away. I carry premium cylinders including Ultion and ABS for anyone who wants the strongest widely available protection, and I'll always tell you honestly when a mid-range lock is all a particular door needs.",
        "Upgrades start from £79 and I'll price the full job on the phone once I know what doors and locks you have. Call 024 7522 4730 for straightforward advice."
      ],
      "localAngleHeading": "Bringing Period Security Up to Standard on Tiddington Road and Banbury Road",
      "localAngleBody": "Security upgrades are a regular request in Stratford, and the housing explains why. The substantial Edwardian and 1930s homes along Tiddington Road and the Banbury Road are exactly the properties where an original or mid-century mortice lock is still doing all the work — solid doors, but locks that predate BS3621 and wouldn't satisfy a modern insurer. The Victorian terraces around Scholars Lane and Arden Street often rely on an ageing nightlatch alone. In the conservation streets of the town centre, I fit upgrades that keep the door's appearance intact — a kitemarked deadlock in the existing position, with no new visible hardware where it isn't wanted. And for the holiday lets and B&Bs trading on the tourist season, upgraded locks and properly accounted-for keys protect both guests and bookings.",
      "commonJobs": [
        "Upgrading pre-BS3621 mortice locks on Edwardian homes along Tiddington Road and the Banbury Road",
        "Fitting anti-snap cylinders, including Ultion and ABS, to composite doors on the newer estates",
        "Adding kitemarked deadlocks to Victorian terraces relying on a nightlatch alone",
        "Whole-house upgrades bringing every external door up to insurance standard in one visit",
        "Discreet security upgrades on conservation area doors in the town centre"
      ],
      "faqs": [
        {
          "q": "How do I know if my current locks meet my insurance requirements?",
          "a": "Check the faceplate of your mortice lock for a British Standard kitemark and the marking BS3621. No kitemark usually means no compliance, however solid the lock feels. Send me a photo or ask me to look when I'm with you — identifying a lock takes moments and the advice costs nothing."
        },
        {
          "q": "What is an anti-snap cylinder and does my Stratford home need one?",
          "a": "Euro cylinders on uPVC and composite doors can be snapped in seconds unless they're built to resist it. If your cylinder protrudes from the handle and carries no security rating, it's the weakest point of the house. Anti-snap cylinders, from solid rated units up to Ultion and ABS, remove that vulnerability."
        },
        {
          "q": "Do you do whole-house security upgrades in Stratford?",
          "a": "Yes — for a whole-house upgrade I'll walk round every external door with you, tell you what's already adequate, and quote only for what genuinely needs changing. Plenty of doors need nothing more than a cylinder swap rather than a full new lock, and I'll say so when that's the case."
        },
        {
          "q": "I run a holiday let in Stratford — which locks do you recommend?",
          "a": "For short lets, the priorities are key control and locks guests can operate easily. I typically fit anti-snap cylinders that are cheap to swap when keys go astray, alongside insurance-compliant deadlocks where your policy requires them. Across several properties, I can keep the cylinders on a consistent platform to simplify management."
        }
      ],
      "priceNote": "Lock upgrades in Stratford-upon-Avon start from £79 with no VAT and no call-out fee, and I'll confirm a full price on the phone once I know your doors and locks."
    }
  ]
}

export const TOWN_SERVICE_PARAMS = Object.entries(TOWN_SERVICES).flatMap(([slug, services]) =>
  services.map((s) => ({ slug, serviceSlug: s.service }))
)

export function getTownService(areaSlug: string, serviceSlug: string): TownServiceContent | undefined {
  return TOWN_SERVICES[areaSlug]?.find((s) => s.service === serviceSlug)
}

export function hasTownService(areaSlug: string, serviceSlug: string): boolean {
  return getTownService(areaSlug, serviceSlug) !== undefined
}
