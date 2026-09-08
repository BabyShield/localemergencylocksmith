import { PILLARS } from './blog-posts'

// Topic hubs turn the eight editorial pillars into real pages instead of
// anchors on /blog. Each hub owns the orientation copy for its subject, states
// what the guides underneath it can and cannot settle, and routes the reader to
// the service page that actually owns the commercial answer.
//
// Every `startHere` and `services` value must reference a real blog slug and a
// real service slug — the SEO audit crawls both and fails on a broken target.

export interface BlogTopic {
  /** Matches a PILLARS slug exactly. */
  slug: string
  /** SERP title. Kept to 60 characters or fewer. */
  metaTitle: string
  /** Meta description. Kept to 160 characters or fewer. */
  metaDescription: string
  /** On-page H1. May differ from the SERP title. */
  h1: string
  /** Short label used in breadcrumb trails and post bylines. */
  breadcrumbName: string
  /** Sentence shown under the H1. */
  standfirst: string
  /** Body paragraphs for the orientation section. */
  intro: string[]
  /** Honest boundary note — what reading cannot replace. */
  limits: string
  /** Slug of the guide worth reading first. */
  startHere: string
  /** Why that guide comes first. */
  startHereReason: string
  /** Service slugs whose commercial pages own this topic's paid outcome. */
  services: string[]
  keywords: string[]
  faqs: { q: string; a: string }[]
}

export const BLOG_TOPICS: BlogTopic[] = [
  {
    slug: 'lock-types-security',
    metaTitle: 'Lock Types and Security Ratings Explained',
    metaDescription:
      'Guides to UK lock types, British Standard markings, cylinder attack ratings and the checks that decide which lock actually fits your door.',
    h1: 'Lock Types and Security Ratings',
    breadcrumbName: 'Lock Types & Ratings',
    standfirst:
      'What the markings on a lock mean, which standards apply to which lock, and what still has to be measured at the door.',
    intro: [
      'Most lock questions turn out to be two questions wearing one coat. The first is about the standard — what BS3621, TS007 or SS312 actually certify, and whether a marking on your lock means what a product listing implies. The second is about fit: whether a given lock can physically go into the door you have, in the condition that door is in today.',
      'The guides in this topic separate those two. Standards are published, checkable and the same for everyone, so those sections cite the standards bodies and police-backed sources rather than my own opinion. Fit is specific to your door — its thickness, its backset, the gap it currently closes on — and that part is written as a list of things to measure or photograph, not as a conclusion.',
      'If you are choosing between named products, start with what your door and any written insurance wording require, then narrow by certification, then by price. Doing it in the other order is how people end up with a certified cylinder that will not seat properly in the door it was bought for.',
    ],
    limits:
      'These guides can tell you what a standard certifies and which questions to ask. They cannot confirm what is fitted to your door, whether it was installed correctly, or whether a specific replacement will fit — those need the actual lock in front of someone.',
    startHere: 'what-is-lock-snapping',
    startHereReason:
      'Lock snapping is the failure mode most Coventry-area readers arrive asking about, and it explains why cylinder certification and mortice-lock certification are not interchangeable.',
    services: ['lock-upgrade', 'lock-change'],
    keywords: [
      'lock types explained uk',
      'british standard lock ratings',
      'bs3621 explained',
      'ts007 3 star cylinder',
      'anti-snap lock guide',
    ],
    faqs: [
      {
        q: 'Which lock standard should I look for on a front door?',
        a: 'It depends on the lock, not the door alone. A mortice deadlock is usually assessed against BS3621, while a euro cylinder is assessed against cylinder-specific schemes such as TS007 or SS312. Check any written insurance wording first, because the policy names the requirement you actually have to meet.',
      },
      {
        q: 'Does a certified cylinder make the whole door secure?',
        a: 'No. A cylinder rating covers attacks on that cylinder. The door leaf, frame, hinges, glazing and the multipoint mechanism behind the handle all fail in their own ways, so an upgrade is only as useful as the weakest part it leaves untouched.',
      },
      {
        q: 'Can I tell what lock I have from a photograph?',
        a: 'Often partly. A clear photo of the lock face, the edge of the door and any kitemark or stamped text usually narrows it to a family of locks. Confirming the exact model, size and condition still needs measurement at the door.',
      },
    ],
  },
  {
    slug: 'home-security',
    metaTitle: 'Home Security and Burglary Prevention Guides',
    metaDescription:
      'Practical UK home security guidance on entry points, windows, patio doors, outbuildings and alarms, using police and standards-body sources.',
    h1: 'Home Security and Burglary Prevention',
    breadcrumbName: 'Home Security',
    standfirst:
      'Where homes are actually entered, which upgrades address which entry point, and how to judge advice that sounds convincing.',
    intro: [
      'Home security advice online has a recognisable failure pattern: a confident list of tips with no source, no order of priority and no acknowledgement that houses differ. These guides are written the other way round. Where a claim comes from published police guidance, Secured by Design material or a British Standard, the source is named and linked. Where it does not, it is written as a judgement rather than a fact.',
      'The practical thread running through the topic is that entry points fail in different ways. A front door usually fails at the lock or the frame. A window usually fails at the handle or the glazing bead. A patio door usually fails at the track or the multipoint gearbox. An outbuilding usually fails because it was never secured at all. Grouping upgrades by entry point tends to produce better decisions than grouping them by product.',
      'Cost matters too, and it is rarely the thing people expect. The cheapest meaningful improvement on many homes is not a new lock; it is repairing the door that no longer closes squarely, so the lock that is already there can engage properly.',
    ],
    limits:
      'Nothing here predicts risk for an individual address. Published patterns describe what has happened across large numbers of properties; they cannot tell you what will happen at yours, and no upgrade removes risk entirely.',
    startHere: 'home-security-checklist-2026',
    startHereReason:
      'It works through a property in the order an assessment would, so you can see which of the other guides in this topic apply to your home before reading them.',
    services: ['lock-upgrade', 'boarding-up'],
    keywords: [
      'home security checklist uk',
      'burglary prevention advice',
      'window security upgrades',
      'patio door security',
      'secured by design homes',
    ],
    faqs: [
      {
        q: 'What is the single most useful home security upgrade?',
        a: 'There is no single answer that holds for every property. On homes where the door no longer closes cleanly, repairing the door and its alignment usually does more than any new lock. On homes with a sound door and an older cylinder, an independently certified cylinder is usually the better first step.',
      },
      {
        q: 'Do alarms and cameras actually deter burglars?',
        a: 'Published research and police guidance treat visible security measures as one factor among several rather than as a guarantee. The guides in this topic set out what the available sources do and do not establish, so you can weigh the spend honestly.',
      },
      {
        q: 'Are ground-floor windows worth upgrading?',
        a: 'Often yes, because window handles and locking points are a common weak point on older uPVC units. The relevant checks are whether the handle locks the mechanism, whether the keep engages, and whether the glazing is internally beaded.',
      },
    ],
  },
  {
    slug: 'locksmith-costs',
    metaTitle: 'Understanding Locksmith Quotes and Charges',
    metaDescription:
      'How UK locksmith pricing works: what a starting price includes, which findings change a quote, and how to compare call-out charges fairly.',
    h1: 'Understanding Locksmith Quotes and Charges',
    breadcrumbName: 'Quotes & Charges',
    standfirst:
      'What a published starting price does and does not cover, and which questions make two quotes genuinely comparable.',
    intro: [
      'Locksmith pricing confuses people because the headline number and the final number answer different questions. A starting price describes a defined scope: a particular job, on a typical door, with no parts beyond the expected ones. The final price reflects what was actually found — a seized mechanism, a non-standard cylinder length, a door that needs realignment before anything will latch.',
      'These guides are about making that gap visible before you book rather than after. That means asking for the price basis, not just the price: what is included, which parts are assumed, what would change the figure, and whether the change would be explained before the work continued.',
      'They also cover the warning signs worth taking seriously. A provider who will not describe any price basis at all over the phone, or who quotes a figure that no realistic parts cost could support, is telling you something useful about how the visit is likely to go.',
      'My own published prices start from £59 and carry no VAT and no separate call-out fee, and the full list is on the pricing page. What that figure cannot do is survive contact with a diagnosis it did not assume, which is exactly what these guides explain.',
    ],
    limits:
      'No article can quote your job. Reading these will tell you which questions to ask and which answers should worry you; the number that applies to your door still depends on what is found there.',
    startHere: 'lock-change-costs-by-type',
    startHereReason:
      'Lock changes are the job where the same request produces the widest spread of legitimate prices, so it shows the cost drivers most clearly.',
    services: ['lock-change', 'emergency-lockout'],
    keywords: [
      'locksmith prices uk',
      'locksmith call out charge',
      'lock change cost',
      'how much does a locksmith cost',
      'compare locksmith quotes',
    ],
    faqs: [
      {
        q: 'Why will some locksmiths not quote a fixed figure by phone?',
        a: 'A responsible answer over the phone is a price basis rather than a guaranteed total, because the fitted lock, its condition and the door itself have not been seen. What you should still get by phone is the starting price, what it assumes, and which findings would change it.',
      },
      {
        q: 'Should an emergency call-out cost more at night?',
        a: 'Some providers apply time-of-day surcharges and some do not, so it is worth asking directly. My published starting-price basis has no separate night, weekend or bank-holiday surcharge, though the agreed total still depends on the diagnosed scope and any parts.',
      },
      {
        q: 'What makes two locksmith quotes comparable?',
        a: 'Ask each provider for the same five things: any attendance fee, the labour included, the likely parts and their specification, whether VAT is added, and which inspection findings would change the total. Quotes are rarely comparable until those are matched.',
      },
    ],
  },
  {
    slug: 'upvc-door-locks',
    metaTitle: 'uPVC Door Lock Guides — Repair and Replacement',
    metaDescription:
      'Diagnose uPVC door lock faults: multipoint gearboxes, handles, cylinders and alignment, plus what to measure before ordering a replacement.',
    h1: 'uPVC Door Locks',
    breadcrumbName: 'uPVC Door Locks',
    standfirst:
      'How multipoint doors fail, how to tell a repair from a replacement, and what to measure before anything is ordered.',
    intro: [
      'A uPVC door is not one lock. It is a cylinder, a gearbox, a strip of hooks, rollers or deadbolts, a handle pair on a spindle, and a frame full of keeps that all have to line up. Almost every symptom people describe — the handle lifts but the key will not turn, the door only locks when pulled hard, the handle went floppy — points at a different component in that chain.',
      'These guides work symptom-first, because that is how the problem arrives. Each one describes what the symptom usually indicates, what else it can indicate, and which checks separate the two without dismantling the door. That matters commercially: a cylinder is a modest part, a full multipoint mechanism is not, and the two are frequently confused in quotes.',
      'The measuring guides are the ones worth bookmarking. Cylinder sizing is the single most common ordering mistake, and getting the internal and external dimensions the right way round is the difference between a lock that sits flush and one that protrudes far enough to be a liability.',
    ],
    limits:
      'Symptom guides narrow the likely cause; they do not confirm it. Two doors with identical symptoms can need different work, and gearbox models are frequently identifiable only once the mechanism is out of the door.',
    startHere: 'upvc-door-lock-needs-replacing',
    startHereReason:
      'It draws the repair-or-replace line first, which decides whether the rest of the topic is relevant to your door at all.',
    services: ['upvc-lock-repair', 'lock-change'],
    keywords: [
      'upvc door lock repair',
      'multipoint lock mechanism',
      'upvc door will not lock',
      'measure euro cylinder',
      'upvc door handle problems',
    ],
    faqs: [
      {
        q: 'My uPVC handle lifts but the key will not turn. What does that mean?',
        a: 'That combination usually points at the cylinder or the cam behind it rather than the multipoint mechanism, because the handle lift proves the gearbox is still driving the hooks. It is not conclusive on its own, and alignment problems can produce the same symptom.',
      },
      {
        q: 'Is a uPVC lock repair cheaper than a replacement?',
        a: 'Usually, when the fault is genuinely in one component such as a cylinder, handle or keep. Once the gearbox itself has failed, the economics change, because the gearbox is often only available as part of a full mechanism.',
      },
      {
        q: 'What should I measure before ordering a euro cylinder?',
        a: 'Measure from the centre of the fixing screw hole to the outside face of the door, then from the same centre point to the inside face. Those two figures, in that order, describe the cylinder. Guessing from the overall length is the usual cause of a badly fitting replacement.',
      },
    ],
  },
  {
    slug: 'emergency-situations',
    metaTitle: 'Locksmith Emergency Guides — Lockouts, Broken Keys',
    metaDescription:
      'Step-by-step guidance for lockouts, snapped keys, lost keys and post-burglary repairs, including who to call and what to check first.',
    h1: 'Locksmith Emergencies',
    breadcrumbName: 'Emergencies',
    standfirst:
      'What to do first when you are locked out, a key has snapped, keys are lost, or a door has been forced.',
    intro: [
      'Emergencies are where bad decisions are cheapest to make and most expensive to live with. Someone locked out at eleven at night will accept a price they would have questioned at eleven in the morning, and will let almost anyone near their door. These guides are written for that moment: short first steps, then the detail.',
      'The recurring theme is that damage is a choice, not an inevitability. Most residential lockouts can be approached non-destructively depending on the fitted lock, the door and its condition, and a provider who reaches for a drill first should be asked why. Similarly, a snapped key is usually an extraction job rather than a lock replacement, unless the break happened because the lock was already failing.',
      'The burglary guide is deliberately different in shape. It covers the order things need to happen in — police reference, insurer, evidence, temporary security, then permanent repair — because doing them out of order is what causes claims to stall.',
    ],
    limits:
      'These are decision aids, not instructions to force entry to a property. Any method depends on the actual lock, the door and proof that you are entitled to be there, all of which are established at the address.',
    startHere: 'locked-out-late-night-coventry',
    startHereReason:
      'It is the most common emergency and it sets out the authority, method and price questions that apply to every other situation in this topic.',
    services: ['emergency-lockout', 'boarding-up'],
    keywords: [
      'locked out of house',
      'broken key in lock',
      'lost house keys',
      'emergency locksmith call out',
      'what to do after a burglary',
    ],
    faqs: [
      {
        q: 'Will an emergency locksmith always have to drill the lock?',
        a: 'No. Many residential lockouts can be attempted non-destructively, though whether that succeeds depends on the fitted lock, the door and its condition. A provider should explain the proposed method and its price basis before starting.',
      },
      {
        q: 'What proof do I need that I live at the address?',
        a: 'Expect to be asked for something that links you to the property, such as ID with the address, a tenancy agreement or a bill. A locksmith who never asks is skipping a check that protects you as much as them.',
      },
      {
        q: 'Should I change the locks after losing my keys?',
        a: 'It depends on whether the keys can be linked to the address and whether the lock can be rekeyed rather than replaced. The lost-keys guide sets out the questions that decide it, including what any written insurance wording requires.',
      },
    ],
  },
  {
    slug: 'legal-insurance',
    metaTitle: 'Lock Standards, Insurance and Tenancy Rules',
    metaDescription:
      'What insurers mean by approved locks, how BS3621 and its relatives differ, and the legal position on changing locks in rented homes.',
    h1: 'Legal and Insurance Requirements',
    breadcrumbName: 'Legal & Insurance',
    standfirst:
      'What a policy actually requires, how the lock standards differ, and where landlords and tenants stand on changing a lock.',
    intro: [
      'This is the topic where guessing is most expensive. An insurance policy that names a lock standard is a contractual requirement, not a suggestion, and the difference between BS3621, BS8621 and PAS3621 is not cosmetic — they describe different key and thumbturn arrangements intended for different escape and access situations.',
      'The guides here set out what each standard covers and what the common policy wordings tend to require, then say plainly that the wording in your own document is what governs. I can describe how these standards work; I cannot tell you what your insurer will accept, and neither can any article that has not read your schedule.',
      'The tenancy guides cover the other frequent question: who may change a lock, when, and what has to happen with the keys afterwards. That subject has real legal consequences on both sides, so those guides point to the underlying position rather than offering a shortcut around it.',
    ],
    limits:
      'This is general explanation, not legal or insurance advice. Your policy schedule and your tenancy agreement contain the terms that actually bind you, and a solicitor or your insurer is the right source for a decision that turns on them.',
    startHere: 'bs3621-locks-explained',
    startHereReason:
      'BS3621 is the standard most often named in UK home insurance wording, so it is the one worth understanding before reading anything else here.',
    services: ['lock-upgrade', 'lock-change'],
    keywords: [
      'insurance approved locks',
      'bs3621 insurance requirement',
      'landlord change locks law uk',
      'tenant lock rights',
      'bs8621 vs bs3621',
    ],
    faqs: [
      {
        q: 'Does my insurer require a BS3621 lock?',
        a: 'Some policies name it and some do not. The only reliable answer is in your own policy schedule or endorsement wording, which states the lock requirement as a condition. Check that document before buying anything on the strength of a general article.',
      },
      {
        q: 'What is the difference between BS3621 and BS8621?',
        a: 'Broadly, BS3621 covers locks that are key-operated from both sides, while BS8621 covers locks that can be opened from inside without a key, which matters where escape without hunting for a key is required. The guides set out the distinctions in full.',
      },
      {
        q: 'Can a landlord change the locks while a tenancy is running?',
        a: 'Changing locks to exclude a tenant during a live tenancy has serious legal consequences in the UK, and the guides here explain the general position and where to get advice. Routine replacement between tenancies is a different situation entirely.',
      },
    ],
  },
  {
    slug: 'seasonal-security',
    metaTitle: 'Seasonal Home Security Guides by Month',
    metaDescription:
      'Security advice that changes with the calendar: frozen locks, dark evenings, holiday absences, student move-in and moving house.',
    h1: 'Seasonal Security Guides',
    breadcrumbName: 'Seasonal Guides',
    standfirst:
      'The security jobs that are worth doing at a particular time of year, and the failures that only show up in certain weather.',
    intro: [
      'Locks fail seasonally more than people expect. Cold weather stiffens cylinders and reveals lubrication that was already marginal. Summer heat expands uPVC doors until a mechanism that engaged all winter suddenly needs the door pulled hard. Autumn brings dark evenings and a different pattern of household routine. None of that changes what a lock is; it changes when its weaknesses become obvious.',
      'The other half of this topic is life events rather than weather. Moving house, a student moving into shared accommodation, a long holiday, the turn of the year — each is a natural point to deal with keys of unknown provenance and locks nobody has checked.',
      'These guides are short by design. They are meant to be read once, acted on in an afternoon, and revisited the following year rather than studied.',
    ],
    limits:
      'Seasonal patterns are general. Whether the stiff lock on your door is a lubrication issue or a mechanism starting to fail is a diagnosis, and cold weather can mask either one.',
    startHere: 'moving-house-change-locks',
    startHereReason:
      'Moving house is the seasonal trigger with the clearest security case, because you have no way to know how many working keys exist for the door you just acquired.',
    services: ['lock-change', 'lock-upgrade'],
    keywords: [
      'frozen door lock winter',
      'holiday home security checklist',
      'moving house change locks',
      'student house security',
      'christmas home security',
    ],
    faqs: [
      {
        q: 'Why does my lock stiffen in cold weather?',
        a: 'Cold thickens residual lubricant and slightly contracts metal components, so a mechanism with existing wear or the wrong lubricant becomes noticeably harder to turn. The winter guide covers which lubricants are appropriate and which make the problem permanent.',
      },
      {
        q: 'Should I change the locks when I move into a new home?',
        a: 'It is a reasonable default, because you cannot establish how many working keys exist or who holds them. Whether that means replacement or rekeying depends on the fitted lock and any written insurance requirement.',
      },
      {
        q: 'What should I check before going away for a long period?',
        a: 'Work through the entry points rather than the calendar: that every external door actually deadlocks, that window handles lock, that outbuildings are secured, and that the property does not visibly signal an absence. The holiday guide sets out the full sequence.',
      },
    ],
  },
  {
    slug: 'coventry-local',
    metaTitle: 'Coventry and Warwickshire Security Guides',
    metaDescription:
      'Local guidance for Coventry-area homes: Victorian terrace doors, common lock faults in local housing stock, and using crime data responsibly.',
    h1: 'Coventry and Warwickshire Guides',
    breadcrumbName: 'Coventry & Warwickshire',
    standfirst:
      'Guidance written around the housing stock, door types and local sources that actually apply across the Coventry area.',
    intro: [
      'Local content is worth writing only when the locality genuinely changes the answer. In and around Coventry it sometimes does. Victorian and Edwardian terraces bring original timber doors, non-standard backsets and frames that have moved over a century. Post-war estates and later infill bring a different mix. Purpose-built student accommodation and converted HMOs bring communal entrances and rules about who may change what.',
      'These guides deal with that rather than repeating national advice with a place name attached. Where a claim rests on published crime data, it also explains what that data can and cannot support — recorded-crime figures describe recorded incidents in an area over a period, which is a much narrower statement than most articles make of them.',
      'If you want the coverage detail for a specific location instead — the postcode, the local authority, what to describe when you call — the area guides are the better starting point, and they link back to these articles where the subject overlaps.',
    ],
    limits:
      'Local housing patterns describe what is common, not what is at your address. A terrace on one street may have had its doors replaced twice since it was built, and published crime data cannot be read as a prediction about any individual property.',
    startHere: 'common-lock-problems-coventry-homes',
    startHereReason:
      'It maps the faults that recur across local housing stock, which is the fastest way to work out which of the other local guides applies to your door.',
    services: ['emergency-lockout', 'lock-change'],
    keywords: [
      'coventry home security',
      'coventry victorian terrace doors',
      'warwickshire burglary data',
      'choosing a locksmith coventry',
      'common lock problems coventry',
    ],
    faqs: [
      {
        q: 'Do older Coventry terraces need different locks?',
        a: 'Often they need different measurements rather than different standards. Original timber doors frequently have non-standard backsets, thinner stiles or frames that have moved, so a lock that suits a modern door may not physically fit without alteration.',
      },
      {
        q: 'How should I read local burglary statistics?',
        a: 'Treat published figures as a record of what was reported in an area over a stated period. They do not measure risk at a single address, and small local counts move sharply for reasons unrelated to security.',
      },
      {
        q: 'How do I check a Coventry locksmith is genuine?',
        a: 'Ask for the trading name and a landline or local number, ask who will actually attend, and ask for the price basis and method before travel. The local guide sets out the full list of checks worth making before you book.',
      },
    ],
  },
]

const TOPIC_BY_SLUG = new Map(BLOG_TOPICS.map(topic => [topic.slug, topic]))

export function getBlogTopic(slug: string): BlogTopic | undefined {
  return TOPIC_BY_SLUG.get(slug)
}

// Fail loudly at build time rather than shipping a hub with no pillar behind it
// or a pillar with no hub — both would leave orphaned links in the crawl graph.
const PILLAR_SLUGS = new Set<string>(PILLARS.map(pillar => pillar.slug))
for (const topic of BLOG_TOPICS) {
  if (!PILLAR_SLUGS.has(topic.slug)) {
    throw new Error(`Blog topic hub ${topic.slug} has no matching editorial pillar`)
  }
}
for (const pillar of PILLARS) {
  if (!TOPIC_BY_SLUG.has(pillar.slug)) {
    throw new Error(`Editorial pillar ${pillar.slug} has no topic hub`)
  }
}
