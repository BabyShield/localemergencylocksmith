export interface ArticleSection {
  headingTemplate: string
  paragraphs: string[] // each string may contain {area}, {postcode}, {region}, {responseTime}
}

export interface AreaContentSection {
  heading: string
  areaField: 'housingStock' | 'commonIssues' | 'localDetail' | 'uniqueContent'
  prefix: string
}

export interface ArticleTemplate {
  slug: string
  titleTemplate: string
  metaTemplate: string // max 155 chars with placeholders
  keywords: string[]
  // 3 intro variants: coventry (urban), midlands (towns), outskirts (villages/rural)
  introVariants: {
    coventry: string
    midlands: string
    outskirts: string
  }
  sections: ArticleSection[]
  areaContentSections?: AreaContentSection[]
  ctaTemplate: string
  relatedServiceSlugs: string[]
  relatedArticleSlugs: string[]
}

// Only these 5 templates are active (highest-value, best differentiation)
// The other 5 are retained in data but excluded + redirected to area pages
const KEPT_SLUGS = [
  'locked-out-at-night',
  'how-much-does-emergency-locksmith-cost',
  'upvc-door-lock-problems',
  'lock-change-after-burglary',
  'bs3621-locks-home-insurance',
]

const ALL_ARTICLE_TEMPLATES: ArticleTemplate[] = [
  // =====================================================================
  // 1. locked-out-at-night
  // =====================================================================
  {
    slug: 'locked-out-at-night',
    titleTemplate: 'Locked Out of Your Home in {area}? Here\'s What to Do',
    metaTemplate:
      'Locked out in {area}? Local emergency locksmith, {responseTime} response. From £59, no VAT, no call-out fee. Call 024 7522 4730.',
    keywords: [
      'locked out {area}',
      'locked out of house {area}',
      'what to do when locked out {area}',
    ],
    introVariants: {
      coventry:
        'Being locked out in {area} is stressful enough without having to deal with a national call centre charging you £200 for the privilege. As a local locksmith based in Coventry, I cover {area} and the {postcode} postcode every day — and I can typically be with you in {responseTime}. Here\'s exactly what to do if you find yourself locked out tonight.',
      midlands:
        'Getting locked out in {area} happens more often than you\'d think, and it always seems to happen at the worst possible moment — late at night, in the rain, or when you\'re in a hurry. I\'m a local locksmith covering {area} and the wider {region} area. I can usually be with you in {responseTime}, and I\'ll quote you a fixed price the moment you call.',
      outskirts:
        'Being locked out in {area} can feel particularly isolating, especially if you\'re in a rural or semi-rural location. National locksmiths often refuse to cover {postcode} or charge a large call-out fee to come this far. I cover {area} as part of my regular patch — {responseTime} response, fixed price from £59, and no VAT.',
    },
    sections: [
      {
        headingTemplate: 'Step 1 — Don\'t Try to Force the Door',
        paragraphs: [
          'Forcing a door is almost always a bad idea. uPVC doors — which make up the majority of front doors in {postcode} — have multipoint locking mechanisms that run the full height of the door. Forcing one doesn\'t just risk damaging the lock: it can split the door frame, bend the door itself, and leave you with a repair bill that runs into several hundred pounds on top of the locksmith fee.',
          'A professional locksmith can open most doors without causing any damage at all. The technique is called non-destructive entry, and it\'s the first method I always try. In the vast majority of lockouts in {area}, I can get you back inside within a few minutes without leaving a single mark on the door or frame.',
          'Even if you\'re tempted by a YouTube tutorial showing how to open a door with a credit card, please don\'t. That trick only works on the most basic Yale-type nightlatches with no deadlock engaged — and attempting it on a uPVC door can actually jam the mechanism and make the locksmith\'s job harder.',
        ],
      },
      {
        headingTemplate: 'Step 2 — Check Other Entry Points Safely',
        paragraphs: [
          'Before calling a locksmith, it\'s worth doing a quick check of your property. Is there a back door that might be unlocked? Did you leave a window on the vent position? A ground-floor window on the latch is something a locksmith can sometimes use to gain safe entry, which can be quicker and cheaper than picking or bypassing the front door lock.',
          'What you should not do is try to climb through a high window, use a ladder, or break a window pane. Broken glass is dangerous, and climbing into properties looks suspicious to neighbours — in {area} you might end up explaining yourself to the police before you get inside your own house.',
          'If you have a trusted neighbour with a spare key, that\'s always your first call. If not, a spare key with a trusted family member nearby is worth arranging after this experience — it can save you £59 and a wait in the cold next time.',
        ],
      },
      {
        headingTemplate: 'Step 3 — Call a Local Locksmith, Not a National Call Centre',
        paragraphs: [
          'When you search online for a locksmith in {area}, many of the results you\'ll see are national call centres that appear local but are not. They advertise with {area} or {postcode} in their listings, but when you call, you\'re speaking to someone in a call centre who dispatches whoever is available — sometimes from an hour away. Their quotes start low on the phone and escalate on arrival, often reaching £150 to £250 or more.',
          'I\'m a sole trader based locally in {region}. When you call 024 7522 4730, you speak to me directly — the person who will actually come to your door. I tell you the price on the phone, I tell you honestly when I\'ll arrive, and I do the job at the price I quoted. No surprises, no extra charges for evenings or weekends.',
          'I cover {area} and {postcode} as part of my regular patch. You\'re not an inconvenience — you\'re a local customer, and I treat you accordingly.',
        ],
      },
      {
        headingTemplate: 'How Fast Can I Get to {area}?',
        paragraphs: [
          '{area} is within my standard coverage area. My typical response time for {postcode} is {responseTime} — that\'s door-to-door from the moment you call, not from the moment I finish my previous job. I\'ll give you an honest estimate when you call, and if I\'m going to be longer than expected, I\'ll tell you.',
          'I work 24 hours a day, seven days a week, 365 days a year. There is no time of night that\'s too late to call — a lockout at 3am is not an emergency that can wait until morning, and I don\'t treat it as one. The price is the same at 3am as it is at 3pm.',
          'I also cover the neighbouring areas around {area}, so if you\'re not sure whether your exact street is within my range, just call and I\'ll confirm immediately.',
        ],
      },
      {
        headingTemplate: 'How Much Does It Cost?',
        paragraphs: [
          'A standard emergency lockout in {area} starts from £59. That\'s the full price — labour, call-out, everything. There is no VAT on top because I\'m a sole trader operating below the VAT threshold, which saves you 20% compared to larger companies. There\'s no surcharge for evenings, nights, or weekends — the price is the same whenever you call.',
          'Before I start any work, I confirm the price with you. If anything unexpected comes up — for example, if the lock turns out to be damaged and needs replacing rather than just opening — I\'ll tell you the new price before I do any additional work. You\'re never presented with a surprise bill.',
          'For context: national locksmith services routinely charge between £150 and £250 for a lockout in the {postcode} area. By calling a local independent locksmith directly, you avoid the call centre fee, the dispatcher margin, the VAT, and the emergency surcharge they all apply.',
        ],
      },
      {
        headingTemplate: 'What If My Lock Needs Replacing?',
        paragraphs: [
          'Sometimes during a lockout, it becomes clear that the lock itself is damaged — either because it was already worn, because something snapped inside it, or because a key broke off in the barrel. In these cases, simply opening the door isn\'t enough — you\'d be left with a door that won\'t lock properly.',
          'I carry a range of common locks in my van, including euro cylinders, Yale-type nightlatches, and BS3621 five-lever mortice locks. A lock change starts from £69 in {area} and includes the new lock, fitting, and new keys. If you need a lock replaced during a lockout visit, I can usually do it in the same visit without needing to go away and come back.',
          'If your lock was cheap or old, this is also a good opportunity to upgrade to an anti-snap cylinder or an insurance-approved BS3621 lock. I\'ll always advise you on your options and give you a price before doing anything.',
        ],
      },
    ],
    areaContentSections: [
      { heading: 'Door Types in {area}', areaField: 'housingStock', prefix: 'The type of lock on your door affects how quickly a locksmith can get you back in.' },
      { heading: 'Why Lockouts Happen in {area}', areaField: 'commonIssues', prefix: 'Based on my experience working in {area}, here are the most common reasons people get locked out.' },
    ],
    ctaTemplate:
      'Locked out in {area} right now? Call me on 024 7522 4730 — I\'ll answer, give you a fixed price, and be with you in {responseTime}.',
    relatedServiceSlugs: ['emergency-lockout'],
    relatedArticleSlugs: [
      'how-much-does-emergency-locksmith-cost',
      'lock-change-after-burglary',
    ],
  },

  // =====================================================================
  // 2. how-much-does-emergency-locksmith-cost
  // =====================================================================
  {
    slug: 'how-much-does-emergency-locksmith-cost',
    titleTemplate: 'How Much Does an Emergency Locksmith Cost in {area}?',
    metaTemplate:
      'Emergency locksmith prices in {area}. Lockout from £59, lock change from £69. No VAT, no call-out fee. Call 024 7522 4730.',
    keywords: [
      'locksmith cost {area}',
      'emergency locksmith price {area}',
      'how much locksmith {area}',
    ],
    introVariants: {
      coventry:
        'Locksmith pricing is one of the most opaque areas in the home services industry. In {area}, prices for the same job can range from £59 to £250+ depending on who you call — and the difference usually has nothing to do with quality. Here\'s a clear breakdown of what you should expect to pay for emergency locksmith work in {area} and the {postcode} postcode.',
      midlands:
        'If you\'ve ever tried to get a straight price from a locksmith in {area}, you\'ll know how frustrating it can be. Vague ranges, "it depends" answers, and prices that only materialise when the locksmith is already at your door. This guide gives you the actual prices for locksmith work in {area}, so you know exactly what you\'re dealing with before you pick up the phone.',
      outskirts:
        'Homeowners in {area} and the {postcode} postcode are sometimes told they\'ll face a call-out fee or higher rates because of their location. That\'s not how I work. Here\'s a clear, honest breakdown of what locksmith work actually costs in {area} — with no hidden extras.',
    },
    sections: [
      {
        headingTemplate: 'My Prices for {area} ({postcode})',
        paragraphs: [
          'These are my fixed prices for work in {area} and the surrounding {postcode} area. Emergency lockout (locked out of your home): from £59. Lock change — single lock: from £69. Lock change — uPVC multipoint mechanism: from £79. uPVC door repair (dropped door, stiff lock): from £59. Emergency boarding up: from £79. All prices include labour and any standard parts. No VAT. No call-out fee.',
          'There is no evening or weekend surcharge. Whether you call me at noon on a Tuesday or 2am on a Sunday, the price is the same. The only things that can change the final price are if an unusual lock type is needed, or if additional locks are being changed at the same visit — in which case I\'ll always tell you the updated price before I start.',
          'When I quote you a price on the phone, that is the price you pay. I\'ve been providing this guarantee since I started working in {region}, and I take it seriously. If the job turns out to require different parts, I tell you before doing it — not after.',
        ],
      },
      {
        headingTemplate: 'Why Are National Locksmith Companies So Expensive?',
        paragraphs: [
          'National locksmith companies — the ones that rank at the top of Google with big advertising budgets — typically charge between £150 and £250 for a standard lockout in the {area} area. Some charge even more. Understanding why helps you understand what you\'re actually paying for when you call them.',
          'The national company charges a call centre handling fee. They add a dispatch margin for finding and sending a contractor. The contractor they send charges their own rate, which the national company marks up. Then there\'s VAT on top of the whole lot. And most add an emergency surcharge for evenings and weekends. By the time all of this is stacked up, a job that costs £59 with an independent local locksmith costs £180 with a national company.',
          'The locksmith who shows up is often no more qualified or experienced than a local independent. In fact, many of the contractors sent by national companies are the same independents you could have called directly — just with a middleman taking a large cut. Calling local cuts out every layer of that markup.',
        ],
      },
      {
        headingTemplate: 'Why I Don\'t Charge VAT',
        paragraphs: [
          'I\'m a sole trader operating as an independent local locksmith. I\'m below the VAT registration threshold, which means I don\'t charge VAT on any of my work. This isn\'t a loophole or a workaround — it\'s simply how small independent businesses operate, and it saves my customers 20% on every job.',
          'When I quote you £59 for a lockout in {area}, that\'s £59. Not £59 plus VAT. Not £59 plus a call-out fee. £59 total. Compare that to a VAT-registered national company quoting "from £59 plus VAT plus call-out" — that\'s actually £70.80 minimum before any other additions.',
          'Larger companies often mention their VAT registration as a sign of credibility. But for a lockout job, what you want is transparent pricing and a locksmith who will actually arrive when they say they will. VAT registration doesn\'t affect either of those things.',
        ],
      },
      {
        headingTemplate: 'What Affects the Price?',
        paragraphs: [
          'A few things can affect the final price of a locksmith job in {area}. The type of lock matters: a standard uPVC euro cylinder is quicker and easier to deal with than a complex multipoint mechanism, which may require a specific gearbox that I need to source. I\'ll always tell you if this is the case.',
          'Whether the lock needs replacing also affects the price. Most lockouts can be resolved by picking or bypassing the existing lock, in which case no new parts are needed. If the lock is damaged, the key has snapped inside it, or the mechanism has failed, a replacement will be needed — and I\'ll quote you separately for that before proceeding.',
          'What doesn\'t affect my price: the time of day or night, whether it\'s a weekday or weekend, and whether it\'s a bank holiday. The rate is flat. This is deliberate — being locked out at 11pm is no less of an emergency than at 11am, and I don\'t think customers should be penalised for it.',
        ],
      },
      {
        headingTemplate: 'How to Avoid Locksmith Scams in {area}',
        paragraphs: [
          'Locksmith scams are unfortunately common across {region} and the UK generally. The most common scam is the low-ball quote on the phone followed by price escalation on arrival. A locksmith calls you back and says they can do the job for £45 — then when they arrive they say the lock is "more complex" and the price is now £150. By that point you\'re standing on your doorstep with no options.',
          'Never use a locksmith who won\'t give you a fixed price on the phone. Any genuine local locksmith knows their standard rates and can quote you immediately. Refusal to quote is almost always a sign of intent to overcharge. Also avoid locksmiths who push heavily on drilling — a competent locksmith will try non-destructive entry first, and most lockouts don\'t require drilling at all.',
          'I\'m genuinely local to {region} — I can tell you exactly which streets I cover in {area}, I have real Google Reviews from real customers, and I give fixed prices on every call. If you\'re unsure about any locksmith you\'ve found, the simplest test is to ask: "What is your fixed price for a standard lockout in {area}?" A real local locksmith answers immediately.',
        ],
      },
    ],
    areaContentSections: [
      { heading: 'Lock Types and Costs in {area}', areaField: 'housingStock', prefix: 'The cost of a locksmith callout depends partly on what type of lock you have.' },
      { heading: 'Common Jobs in {area}', areaField: 'commonIssues', prefix: 'Here are the most common locksmith jobs I do in {area} and what they typically cost.' },
    ],
    ctaTemplate:
      'Need a locksmith in {area}? Call 024 7522 4730 for a fixed price, right now. From £59, no VAT, {responseTime} response.',
    relatedServiceSlugs: ['emergency-lockout', 'lock-change'],
    relatedArticleSlugs: ['locked-out-at-night', 'find-trustworthy-locksmith'],
  },

  // =====================================================================
  // 3. upvc-door-lock-problems
  // =====================================================================
  {
    slug: 'upvc-door-lock-problems',
    titleTemplate: 'uPVC Door Lock Problems in {area} — Common Issues & Fixes',
    metaTemplate:
      'uPVC door lock repair in {area}. Stiff door, won\'t lock, broken handle? Local locksmith, from £59. No VAT. Call 024 7522 4730.',
    keywords: [
      'upvc door lock problems {area}',
      'upvc door won\'t lock {area}',
      'upvc door lock repair {area}',
    ],
    introVariants: {
      coventry:
        'uPVC doors are by far the most common door type in {area} — they were fitted as standard in most new-build and refurbished properties from the 1990s onwards, and the majority of homes in {postcode} have at least one. They\'re generally reliable, but after 10-15 years the locking mechanisms start to show their age. Here\'s a guide to the most common uPVC door problems I see in {area} and what can be done about them.',
      midlands:
        'Most homes in {area} were fitted with uPVC doors during the 1990s and 2000s housing improvement wave. Those doors are now 15-25 years old, and the multipoint locking mechanisms inside them have a finite lifespan. This guide covers the most common uPVC door problems I deal with across {area} and the {postcode} postcode, and what each repair involves.',
      outskirts:
        'uPVC doors are common across {area} whether on newer builds or on older properties that had their wooden doors replaced. The locking mechanisms — particularly the multipoint gearboxes — wear out over time, especially in properties exposed to more weather. Here are the issues I most commonly deal with in {area} and what each one typically costs to fix.',
    },
    sections: [
      {
        headingTemplate: 'The Door Won\'t Lock or Unlock Properly',
        paragraphs: [
          'This is the most common uPVC door problem I encounter in {area}. The most frequent cause is a worn or failed multipoint locking gearbox — the central mechanism inside the door edge that drives all the locking points when you turn the key or lift the handle. These gearboxes are under significant mechanical stress over their lifetime and typically last 10-15 years before they start to fail.',
          'Symptoms of a failed gearbox include the door locking partially (some hooks engage but not all), the key turning freely without engaging anything, or the handle lifting but nothing happening at the door edge. In most cases the gearbox needs replacing rather than repairing — it\'s a component, not something that can be adjusted back into service.',
          'Gearbox replacement in {area} starts from £89 including parts and labour. I carry the most common gearbox types in my van, and most repairs can be completed in a single visit. I\'ll tell you the make and model of the new part before I fit it.',
        ],
      },
      {
        headingTemplate: 'Key Turns But the Door Won\'t Open',
        paragraphs: [
          'If the key turns smoothly but the door still won\'t open, the most likely cause is a broken or failed euro cylinder — the barrel-shaped lock the key goes into. Euro cylinders can fail in two ways: the internal mechanism wears out and the cam that drives the locking points stops turning, or the cylinder snaps — which is a security failure caused by a technique called cylinder snapping used by burglars.',
          'In {area}, I\'d recommend anti-snap cylinders on all uPVC doors. Standard cylinders that extend beyond the door face are particularly vulnerable. Anti-snap cylinders (also called 3-star cylinders) are designed to break at a sacrificial point before the key mechanism is reached, stopping the attack cold. They cost only marginally more than standard cylinders and provide significantly better security.',
          'Euro cylinder replacement starts from £59 in {area}. If a key has broken off inside the cylinder I can usually extract it — if not, the cylinder will need replacing. Don\'t try to fish a broken key out yourself with a pin or tweezers, as this often pushes it further in and makes extraction harder.',
        ],
      },
      {
        headingTemplate: 'Door Drops and Won\'t Close Properly',
        paragraphs: [
          'A door that has visibly dropped — where you can see a gap at the top of the door but the bottom is tight, or where you have to lift the door to get it to close — is usually a hinge problem rather than a lock problem. Over time, uPVC door hinges wear and the door sags, pulling the locking points out of alignment with their keeps in the frame.',
          'This is very common in doors that face south or west and receive significant sun and wind exposure. The expansion and contraction cycles over many summers and winters gradually loosen the hinge fixings. The fix usually involves either tightening and adjusting the existing hinges or replacing them if they\'ve failed completely.',
          'Door drop adjustment in {area} starts from £49. It\'s worth addressing early — a door that\'s slightly out of alignment puts extra stress on the gearbox and the euro cylinder, and can turn a £49 adjustment job into a £89 gearbox replacement if left too long.',
        ],
      },
      {
        headingTemplate: 'The Handle Is Loose or Floppy',
        paragraphs: [
          'A handle that flops down without resistance and won\'t spring back up has a broken spring cartridge. This is one of the most common problems I deal with across {area} — particularly in properties built between 2000 and 2015 where builder-grade handles were fitted as standard. The handles look fine from the outside, but the spring mechanism inside has a limited lifespan.',
          'This matters because the handle spring is what provides the initial engagement of the locking mechanism. If the handle won\'t lift properly, the door may appear to lock but won\'t engage all the multipoint locking hooks correctly, leaving the door less secure than it appears. A floppy handle is both an inconvenience and a security issue.',
          'Handle set replacement in {area} starts from £39. I carry standard lever-pad and lever-lever handle sets in my van. The job typically takes 20-30 minutes. If you want to upgrade to a better quality handle at the same time — which I\'d recommend if the original was a builder-grade fitting — I can advise on options.',
        ],
      },
      {
        headingTemplate: 'Door Locked and You Can\'t Get In',
        paragraphs: [
          'If you\'re locked out of a uPVC door, the approach depends on the condition of the lock. If the euro cylinder is intact, I can usually bypass it using specialist tools without removing or damaging the cylinder — this is non-destructive entry, and it\'s my first approach for any uPVC lockout in {area}.',
          'If the euro cylinder has snapped — either from wear or from an attempted break-in — it will need to be drilled and replaced. This isn\'t as dramatic as it sounds: the cylinder is a replaceable component, and the door itself won\'t be damaged. Emergency entry plus new anti-snap cylinder in {area} starts from £79.',
          'I\'d strongly recommend fitting an anti-snap cylinder as the replacement when this happens. Standard cylinders are cheap for a reason — they offer very little resistance to a cylinder snapping attack, which takes a burglar less than 30 seconds. A 3-star anti-snap cylinder adds meaningful resistance for a small additional cost.',
        ],
      },
      {
        headingTemplate: 'When to Repair vs Replace Your uPVC Door Lock',
        paragraphs: [
          'As a general rule: if a uPVC door is under 10 years old and the frame and door leaf are still in good condition, repair is almost always the right choice. The locking components — cylinder, gearbox, handle — are all replaceable individually, and doing so extends the life of the door significantly. Replacement of a whole door is rarely necessary unless the frame has rotted or the door has been physically damaged.',
          'If the multipoint mechanism has completely failed on a door that\'s over 15 years old, it\'s worth thinking about whether the money spent on repair would be better put towards a new door. I\'ll give you an honest assessment when I arrive — I\'m not going to push you towards a more expensive repair if a cheaper fix will do the job.',
          'After any burglary attempt, regardless of the age of the door, replace the cylinder immediately and upgrade to an anti-snap model. The security of the original was clearly insufficient, and a burglar who\'s targeted your property once may return. I carry anti-snap cylinders in my van and can replace them on the same visit as any other repair in {area}.',
        ],
      },
    ],
    ctaTemplate:
      'uPVC door problem in {area}? Call 024 7522 4730 for a free diagnosis and fixed price. Typically {responseTime} response.',
    areaContentSections: [
      { heading: 'uPVC Doors in {area}', areaField: 'housingStock', prefix: 'The prevalence and age of uPVC doors varies significantly by area.' },
      { heading: 'Common uPVC Issues in {area}', areaField: 'commonIssues', prefix: 'Here are the uPVC door problems I see most often in {area}.' },
    ],
    relatedServiceSlugs: ['upvc-lock-repair'],
    relatedArticleSlugs: ['locked-out-at-night', 'best-door-locks-security-guide'],
  },

  // =====================================================================
  // 4. lock-change-after-burglary
  // =====================================================================
  {
    slug: 'lock-change-after-burglary',
    titleTemplate: 'Should You Change Your Locks After a Break-In in {area}?',
    metaTemplate:
      'Change locks after a break-in in {area}? Yes — immediately. Same-day lock change from £69. No VAT. Call 024 7522 4730 now.',
    keywords: [
      'change locks after burglary {area}',
      'lock change after break in {area}',
      'burglary locksmith {area}',
    ],
    introVariants: {
      coventry:
        'If your home in {area} has been broken into, changing your locks is not optional — it\'s essential, and it needs to happen today. A burglary leaves you vulnerable in ways that go beyond the immediate break-in. This guide covers exactly what to do in the hours after a break-in in {area}, including which locks to replace and how to satisfy your insurer.',
      midlands:
        'A burglary is one of the most unsettling things that can happen to a homeowner in {area}. Beyond the immediate shock, there are practical steps you need to take quickly to secure your home again — and changing the locks is the most urgent. Here\'s what you need to know about post-burglary security in {area} and the {postcode} area.',
      outskirts:
        'After a break-in in {area}, securing your home again is the immediate priority. Properties in more rural or semi-rural locations can take longer to respond to from emergency services, which makes physical security even more important. Here\'s a clear guide to what to do after a burglary in {area}, including same-day lock changing from £69.',
    },
    sections: [
      {
        headingTemplate: 'Why You Must Change Locks After a Burglary',
        paragraphs: [
          'The first reason is key security. During a burglary, intruders often take or copy any keys they find inside the property. Even if you change all your valuables, if the burglar has a copy of your front door key, they can return at any time. Changing the locks eliminates this risk completely — new locks mean the old keys are useless.',
          'The second reason is that burglars frequently return to properties they\'ve already targeted. They know the layout, they know what\'s there, and they know the existing security level. Statistics consistently show that re-victimisation is a real and significant risk in the weeks after a break-in. New, better locks are a deterrent.',
          'The third reason is insurance. Most home insurance policies require that the property is secured to a certain standard as a condition of cover. After a burglary, your insurer may require you to demonstrate that you\'ve improved the security before they\'ll continue to cover the property. Fitting BS3621 locks is the standard they\'re looking for. I can provide a receipt and written confirmation for your insurer.',
        ],
      },
      {
        headingTemplate: 'What to Do Straight After a Break-In in {area}',
        paragraphs: [
          'Step one: call 999 (or 101 if the intruder has left) and report the break-in. Don\'t touch anything in the affected areas until police have attended, as forensic evidence may be compromised. Get a crime reference number — you\'ll need it for your insurer and for any subsequent insurance claim.',
          'Step two: call your home insurer to notify them of the break-in. They\'ll advise on the claims process and may ask you to get a locksmith out before they\'ll process anything. Keep records of every call you make — time, date, who you spoke to.',
          'Step three: once police have attended and given you the go-ahead to secure the property, call me on 024 7522 4730. I cover {area} and {postcode} and can typically be with you in {responseTime}. I\'ll assess the damage, recommend appropriate replacements, and carry out the work the same day with full paperwork for your insurer.',
        ],
      },
      {
        headingTemplate: 'What Locks Should You Upgrade To?',
        paragraphs: [
          'For timber front and back doors, the standard you need is a BS3621 five-lever mortice deadlock. This is the British Standard for security deadlocks, and it\'s the lock type specified in virtually all home insurance policies. If you didn\'t have one before the break-in, fitting one now is a requirement before your insurer will continue cover on the same terms.',
          'For uPVC doors, the priority is an anti-snap euro cylinder — specifically a 3-star rated cylinder that meets the TS007 standard. Standard cylinders can be snapped in seconds by a burglar with a screwdriver. Anti-snap cylinders are designed to shear at a point before the key mechanism is reached, making this attack method ineffective.',
          'I\'ll advise on the exact products when I arrive in {area}. I carry BS3621 mortice locks, anti-snap cylinders, and upgrade handle sets in my van. You don\'t need to do any research in advance — tell me what was fitted and what was breached, and I\'ll advise on the right replacements to satisfy your insurer and improve your security meaningfully.',
        ],
      },
      {
        headingTemplate: 'Insurance Lock Requirements',
        paragraphs: [
          'Most standard UK home insurance policies have a security clause that requires all final exit doors (the doors you use to leave the property) to be fitted with a BS3621 five-lever mortice deadlock. This is typically listed in the policy schedule or in the policy conditions document. If your claim is for a break-in and the entry point didn\'t have a BS3621 lock, your insurer may reject the claim or reduce the payout.',
          'I can check your existing locks against the BS3621 requirement when I arrive. The BS3621 mark is stamped on the faceplate of a compliant lock — if it\'s not there, the lock doesn\'t meet the standard. Some policies also require window locks on accessible windows, and some specify key-operated locks rather than thumb-turn mechanisms on certain doors.',
          'I provide a printed receipt for all lock change work in {area}, and I can write a brief report describing what was fitted and why, for use with your insurer. Keep the packaging from the new locks too — it shows the BS3621 certification.',
        ],
      },
      {
        headingTemplate: 'Same-Day Lock Change in {area}',
        paragraphs: [
          'I can carry out same-day lock changes across {area} and the {postcode} postcode. In most cases I\'ll be with you in {responseTime} of your call, and I carry a full range of BS3621 mortice locks, anti-snap euro cylinders, and uPVC handle sets in my van. The majority of post-burglary lock changes can be completed in a single visit.',
          'Lock change pricing in {area}: single mortice lock from £69, single euro cylinder from £69, full front and back door package from £129. No VAT on any of these prices. The price I give on the phone is the final price — no additions on arrival unless there are structural repairs needed that couldn\'t be assessed over the phone.',
          'If the door frame or door itself has been damaged during the break-in, I\'ll assess whether it can be repaired or whether temporary boarding-up is needed while you arrange a replacement. Emergency boarding up starts from £79 and will secure your property overnight.',
        ],
      },
    ],
    areaContentSections: [
      { heading: 'Security in {area}', areaField: 'localDetail', prefix: 'Understanding your local area helps you make better security decisions after a break-in.' },
      { heading: 'Recommended Lock Upgrades in {area}', areaField: 'commonIssues', prefix: 'After a break-in, here are the lock changes I most commonly recommend for homes in {area}.' },
    ],
    ctaTemplate:
      'Break-in in {area}? Call 024 7522 4730 now. Same-day lock change from £69, {responseTime} response, full paperwork for insurers.',
    relatedServiceSlugs: ['lock-change', 'lock-upgrade'],
    relatedArticleSlugs: ['bs3621-locks-home-insurance', 'upvc-door-lock-problems'],
  },

  // =====================================================================
  // 5. yale-vs-deadlock-which-is-safer
  // =====================================================================
  {
    slug: 'yale-vs-deadlock-which-is-safer',
    titleTemplate: 'Yale vs Deadlock — Which Lock Is Safer for Your Home in {area}?',
    metaTemplate:
      'Yale vs deadlock — which is safer for {area} homes? A local locksmith explains. BS3621 locks from £79 fitted. Call 024 7522 4730.',
    keywords: [
      'best lock for front door {area}',
      'yale vs deadlock {area}',
      'BS3621 lock {area}',
    ],
    introVariants: {
      coventry:
        'Most homes in {area} have a Yale-type nightlatch on their front door — the kind where you press down the latch to open from inside and use the key from outside. Many people assume this is sufficient security. In my experience working as a locksmith across {area} and the broader {postcode} area, it usually isn\'t. Here\'s a clear explanation of the difference between a Yale and a deadlock, and what the right setup looks like.',
      midlands:
        'One of the most common security questions I get asked in {area} is: "Is my front door lock good enough?" The answer usually depends on whether you have just a Yale-type nightlatch, a deadlock, or both. This guide explains the difference, the security implications, and what your home insurance in the {region} area almost certainly requires.',
      outskirts:
        'In {area} and the surrounding {postcode} area, properties often have a mix of older timber doors with mortice locks and newer uPVC doors with euro cylinder locks. Understanding which type you have, what security level it provides, and what your insurer requires is important for both your safety and your insurance cover.',
    },
    sections: [
      {
        headingTemplate: 'Yale (Nightlatch) Locks — How Secure Are They?',
        paragraphs: [
          'A standard Yale nightlatch — the familiar cylinder lock that opens with a spring latch — provides a low level of security on its own. The standard version can be opened with a credit card or similar flexible tool in seconds. This is not a hypothetical: it\'s a known vulnerability, and it\'s the reason I see so many forced entries across {area} in homes that relied on a Yale lock alone.',
          'Deadlocking Yale models (where you have to turn the key to deadlock the latch before leaving) are better — the latch can\'t be pushed back without the key. But even deadlocking Yale nightlatches are not considered insurance-approved on their own. They don\'t meet the BS3621 standard, and most home insurance policies in {region} explicitly exclude them as the sole lock on a final exit door.',
          'This doesn\'t mean Yale nightlatches are useless. They serve a legitimate convenience purpose — you can pull the door shut and the latch catches automatically without needing to use your key. But they need to be used in combination with a proper deadlock, not as a standalone security solution.',
        ],
      },
      {
        headingTemplate: '5-Lever Mortice Deadlocks — The Insurance Standard',
        paragraphs: [
          'A five-lever mortice deadlock is the British Standard for residential door security. The BS3621 standard tests a lock against multiple attack methods including picking, drilling, and forced entry. Only locks that pass all these tests can carry the BS3621 mark. These are the locks your insurer is looking for when they specify "insurance-approved deadlock" in your policy.',
          'Unlike a nightlatch, a mortice deadlock is fitted into the body of the door itself, recessed into the edge. The bolt shoots into a reinforced keep in the frame, and when the key is turned to the deadlock position, the bolt cannot be pushed back from the outside. It requires either the key or significant destructive force to open.',
          'Five-lever mortice deadlocks are available from established manufacturers including ERA, Union, and Yale (confusingly, Yale also make excellent mortice deadlocks as well as their nightlatch range). I supply and fit BS3621 deadlocks in {area} from £79 including parts and labour — and I always verify that the lock I\'m fitting carries the BS3621 marking before I install it.',
        ],
      },
      {
        headingTemplate: 'What Your Insurance Actually Requires',
        paragraphs: [
          'Most standard home insurance policies require a BS3621 five-lever mortice deadlock on every door that is a final exit point — that is, every door through which someone could leave the property and close it behind them. This typically means the front door, the back door, and any side door. French doors and patio doors usually have their own requirements.',
          'Some insurers also require window locks on all accessible windows — typically those within reach from ground level. Key-operated window locks are generally specified, not just latches. If your property has a garage with internal access to the house, the connecting door also usually needs to meet the lock standard.',
          'If you\'re unsure what your specific policy requires, I\'m happy to take a look when I\'m in {area} doing any other job nearby. I\'ll tell you what you have, what you need, and what it would cost to bring everything up to the required standard. There\'s no charge for the assessment.',
        ],
      },
      {
        headingTemplate: 'The Best Setup for a Front Door in {area}',
        paragraphs: [
          'For a standard timber front door in {area}: a Yale deadlocking nightlatch plus a BS3621 five-lever mortice deadlock. The Yale gives you convenience — door pulls shut automatically. The deadlock gives you the security level required by your insurer. Both should be used every time you leave the property. This combination satisfies all mainstream home insurance requirements and provides a genuinely strong level of security. The full combination, including both locks and fitting, starts from £79 in {area}.',
          'For a uPVC front door: an anti-snap (3-star TS007 rated) euro cylinder. The multipoint locking mechanism built into the door provides the equivalent of a mortice deadlock when correctly engaged, so the key addition here is the cylinder quality. Standard euro cylinders that protrude beyond the door face can be snapped in seconds. An anti-snap cylinder eliminates this attack vector. Fitted in {area} from £79.',
          'Either way, the rule is the same: use all the security features available to you every time you leave. A deadlock that isn\'t turned, or a multipoint that isn\'t lifted and locked, provides the same protection as no security at all.',
        ],
      },
      {
        headingTemplate: 'Free Security Check',
        paragraphs: [
          'If you live in {area} and you\'re not sure whether your locks meet insurance requirements or whether your current setup is as secure as it should be, call me on 024 7522 4730. When I\'m in {area} doing any other job, I\'ll do a quick check at no charge.',
          'I\'ll tell you what locks you have, whether they meet BS3621 and TS007 standards, and what — if anything — needs upgrading. I\'ll give you a written quote for any recommended work. There\'s no obligation to book, and I won\'t pressure you. Many people find that their existing locks are actually fine — in which case I\'ll tell you that and be on my way.',
          'If you do need work doing, I carry everything I need in my van and can usually do upgrades on the same visit in {area}. Lock upgrades from £79 including parts and labour, no VAT.',
        ],
      },
    ],
    ctaTemplate:
      'Want to know if your locks are insurance-approved in {area}? Call 024 7522 4730 — free check when I\'m in the area. BS3621 locks from £79 fitted.',
    relatedServiceSlugs: ['lock-change', 'lock-upgrade'],
    relatedArticleSlugs: ['lock-change-after-burglary', 'best-door-locks-security-guide'],
  },

  // =====================================================================
  // 6. bs3621-locks-home-insurance
  // =====================================================================
  {
    slug: 'bs3621-locks-home-insurance',
    titleTemplate: 'BS3621 Locks & Home Insurance in {area} — What You Need to Know',
    metaTemplate:
      'Does your home insurance require a BS3621 lock in {area}? Most do. Local locksmith fits BS3621 locks from £79. Call 024 7522 4730.',
    keywords: [
      'BS3621 lock {area}',
      'home insurance lock requirement {area}',
      'insurance approved lock {area}',
    ],
    introVariants: {
      coventry:
        'If you have home insurance in {area}, there\'s a good chance your policy requires a BS3621 lock on your front and back doors — and a significant chance you don\'t have one, or you\'re not sure. This guide explains exactly what BS3621 means, how to check whether your current locks comply, and what to do if they don\'t.',
      midlands:
        'Home insurance policies across {region} almost universally require BS3621 five-lever mortice deadlocks on all final exit doors. The problem is that many homeowners in {area} don\'t know what BS3621 means, can\'t tell whether their existing locks meet the standard, and don\'t realise their claims could be rejected if they don\'t. This guide clears up the confusion.',
      outskirts:
        'Insurance lock requirements apply regardless of whether you\'re in a city or a rural area like {area}. In fact, properties in {postcode} and the surrounding villages can be more attractive targets for opportunistic burglars precisely because response times are longer. This guide covers everything you need to know about BS3621 locks and home insurance in {area}.',
    },
    sections: [
      {
        headingTemplate: 'What Is a BS3621 Lock?',
        paragraphs: [
          'BS3621 is the British Standard for five-lever mortice deadlocks. It\'s a testing standard maintained by the British Standards Institution that specifies how much resistance a lock must offer against picking, drilling, saw attacks, and forced entry. Only locks that pass all the required tests can carry the BS3621 kitemark.',
          'The number 3621 refers to the specific standard document. Five-lever means the lock contains five internal levers that all need to be aligned correctly by the key before the bolt will move — this is what makes these locks so difficult to pick compared to a standard two-lever lock. A BS3621 lock also has a hardened steel bolt and anti-drill pins to resist common attack methods.',
          'The key thing to know is that a Yale nightlatch — however good the brand — is NOT a BS3621 lock. Neither is a basic euro cylinder on its own. BS3621 refers specifically to five-lever mortice deadlocks fitted into the body of the door. If your policy says "BS3621", it means this specific type of lock.',
        ],
      },
      {
        headingTemplate: 'Does My Home Insurance Require One?',
        paragraphs: [
          'Almost certainly yes, if you have standard home insurance. The vast majority of home and contents insurance policies issued by mainstream UK insurers specify BS3621 five-lever mortice deadlocks on all final exit doors as a condition of cover. This isn\'t a recommendation — it\'s a policy condition, meaning that if you make a claim following a burglary and you didn\'t have the required locks, your insurer may reject the claim or reduce the payout.',
          'This is particularly important to understand because many people in {area} have made improvements to their homes over the years — fitted new uPVC doors, replaced windows, changed locks — without specifically verifying that the new locks meet the BS3621 standard. A new lock isn\'t automatically a BS3621 lock. It has to carry the mark.',
          'If you\'re in {postcode} and you\'re not sure whether your policy has this requirement, look in the policy schedule or policy conditions document under "security" or "property conditions". If you find a reference to BS3621, five-lever mortice locks, or insurance-approved locks, you need to check whether your current locks meet that standard.',
        ],
      },
      {
        headingTemplate: 'How to Check If You Have a BS3621 Lock',
        paragraphs: [
          'The simplest way to check is to look at the faceplate of your mortice lock — that\'s the metal plate you can see in the edge of the door when the door is open. A BS3621 compliant lock will have "BS3621" stamped or engraved on the faceplate. If that marking isn\'t there, the lock doesn\'t meet the standard.',
          'If you have a uPVC door with a euro cylinder, check whether the cylinder is a standard or anti-snap model. Standard cylinders that protrude beyond the door face are not BS3621 compliant on their own — the multipoint mechanism they work with provides additional security, but the cylinder itself needs to be at minimum a 3-star TS007 anti-snap model to meet most insurers\' requirements.',
          'If you\'re genuinely unsure and you\'re in {area}, call me on 024 7522 4730. I\'ll check your locks and tell you clearly whether they meet the standard. There\'s no charge for the assessment when I\'m in {postcode} for other work.',
        ],
      },
      {
        headingTemplate: 'How Much Does a BS3621 Lock Cost in {area}?',
        paragraphs: [
          'Supply and fit of a BS3621 five-lever mortice deadlock in {area} starts from £79. This includes the lock, fitting, and new keys — everything you need. There is no VAT on this price, and there is no call-out fee on top. If you need both front and back doors done at the same visit, the second lock is £69 as the call-out and setup time is already covered by the first.',
          'The price covers standard timber doors with existing mortice lock cases. If your door has never had a mortice lock and needs a fresh case cut, that adds to the time and cost — I\'ll advise you of this before I start. Most {area} properties built before 2000 already have a mortice case; the question is whether the lock inside it meets BS3621.',
          'I carry ERA Fortress and Union branded BS3621 locks in my van. Both are well-regarded UK manufacturers with locks that are consistently BS3621 certified. I can show you the certification on the packaging before I fit the lock.',
        ],
      },
      {
        headingTemplate: 'Other Insurance-Approved Upgrades',
        paragraphs: [
          'Beyond the front and back door locks, some insurance policies in {region} also require window locks on accessible windows. This typically means any window within 2 metres of ground level, or within reach from an outbuilding, fence, or extension roof. Key-operated window locks are what insurers typically specify — not just catches or latches that can be opened without a key.',
          'For uPVC doors specifically, anti-snap euro cylinders (3-star TS007 rated) are the insurance-preferred upgrade. Brands I regularly fit in {area} include Avocet ABS and Yale Platinum. The Avocet ABS comes with a £2,000 insurance guarantee against cylinder snapping attacks, which some insurers recognise specifically.',
          'If you want a full security review for your {area} property — covering all doors and accessible windows — I\'m happy to do this when I\'m in {postcode}. I\'ll give you a complete picture of what you have, what you need, and exactly what it would cost to bring everything up to insurance standard. Call 024 7522 4730 to arrange.',
        ],
      },
    ],
    areaContentSections: [
      { heading: 'Lock Standards for {area} Homes', areaField: 'housingStock', prefix: 'Whether your home needs a BS3621 lock depends on your door type and what is currently fitted.' },
      { heading: 'Insurance Lock Recommendations in {area}', areaField: 'localDetail', prefix: 'Here is what I typically recommend for homes in {area}.' },
    ],
    ctaTemplate:
      'Need a BS3621 lock in {area}? Call 024 7522 4730. Supply and fit from £79, no VAT. {responseTime} response.',
    relatedServiceSlugs: ['lock-upgrade', 'lock-change'],
    relatedArticleSlugs: ['locked-out-at-night', 'upvc-door-lock-problems'],
  },

  // =====================================================================
  // 7. find-trustworthy-locksmith
  // =====================================================================
  {
    slug: 'find-trustworthy-locksmith',
    titleTemplate: 'How to Find a Trustworthy Locksmith in {area} — and Avoid Scams',
    metaTemplate:
      'How to find a genuine locksmith in {area}. Red flags, scam tactics, and how to check. Local honest locksmith. Call 024 7522 4730.',
    keywords: [
      'trustworthy locksmith {area}',
      'how to find locksmith {area}',
      'locksmith scam {area}',
    ],
    introVariants: {
      coventry:
        'Searching for a locksmith in {area} in an emergency is one of the worst times to have to research who to call. You\'re stressed, possibly locked out in the cold, and every result online looks equally plausible. This guide gives you a clear framework for identifying genuine local locksmiths and avoiding the scammers who target exactly these high-stress moments in {area} and {postcode}.',
      midlands:
        'Locksmith scams are a national problem but they\'re particularly active in areas like {area} where people may be less familiar with who to call. The most common scams are straightforward to avoid once you know the signs. This guide explains what to watch for when searching for a locksmith in {area} and how to verify you\'re calling a genuine local tradesperson.',
      outskirts:
        'In {area} and the {postcode} area, you might assume that scam locksmiths only operate in cities. Unfortunately they don\'t — their advertising appears in every local area, and they\'ll dispatch someone to {area} regardless of the response time involved. Here\'s how to identify a genuine local locksmith and avoid being overcharged.',
    },
    sections: [
      {
        headingTemplate: 'The #1 Scam: National Call Centres Pretending to Be Local',
        paragraphs: [
          'The most widespread locksmith scam in {area} and across the UK isn\'t a particularly sophisticated one. You search for "locksmith {area}" on Google. The top results — often in the Google Ads section — show a local-looking business name, a local phone number, and a local address. You call, someone answers quickly, and they quote you something like £45 to £55 for the job.',
          'What you\'ve actually called is a national call centre that creates hundreds of fake local listings across the UK. They have no locksmiths. They dispatch whoever they can find who\'ll take the job — often someone driving an unmarked car from a different town. The "£45" quote on the phone becomes "£150 minimum" when that person arrives at your door and decides your lock is "high security" or "non-standard".',
          'The locksmith they send may also be incentivised to drill rather than pick locks, because a drilled lock requires a replacement — which they can sell you at a 400% markup. This entire model is designed around monetising your desperation when you\'re locked out in {area}. Knowing how to avoid it could save you over £100 on a single call.',
        ],
      },
      {
        headingTemplate: 'Red Flags to Watch For',
        paragraphs: [
          'Will not give a fixed price on the phone. This is the clearest red flag. Every legitimate local locksmith knows their standard rates and can give you a fixed price immediately. Refusal to quote — or giving a range like "between £40 and £200 depending on the job" — is almost always a warning sign of intent to charge whatever the traffic will bear when they arrive.',
          'Low phone quote, high on-arrival price. If a locksmith quotes £45-55 on the phone and then says £150+ when they arrive because the lock is "high security" or "needs drilling", this is a scam. Real locksmiths assess this before quoting, not after driving to your address. The right response is to refuse the work and call someone else, even if it\'s inconvenient.',
          'Arrives in an unmarked vehicle, drills immediately, asks for cash only, can\'t provide a receipt. These are all additional red flags. A legitimate tradesperson will arrive identifiably, try non-destructive entry first, accept card payment, and provide a proper receipt for the work done.',
        ],
      },
      {
        headingTemplate: 'How to Check a Locksmith Is Genuine',
        paragraphs: [
          'The simplest check: ask what postcode they\'re based in. A genuinely local locksmith in {area} can answer immediately with a nearby postcode. A call centre handler in a different city will stall, give a vague answer, or claim to be "in your area" without being specific. You can also ask which streets they know locally — a genuine locksmith who works in {area} regularly will have specific local knowledge.',
          'Check Google Reviews carefully. Look at the content of the reviews, not just the star rating. Genuine local locksmith reviews mention the person by name, describe specific jobs, and are geographically consistent. A real {area} locksmith will have reviews that mention {area}, nearby postcodes, and local landmarks. Generic reviews like "great service, fast arrival" with no location detail are often fabricated.',
          'A genuine local locksmith will quote a fixed price on the phone without hesitation. They\'ll tell you honestly when they\'ll arrive, not "as soon as possible". They\'ll have a van identifiable with their business. If any of these things aren\'t true when you call, hang up and try someone else.',
        ],
      },
      {
        headingTemplate: 'What a Legitimate Locksmith Should Do',
        paragraphs: [
          'When you call a genuine locksmith in {area}, here\'s what should happen: they answer the phone themselves (not a call handler). They ask you the type of door and lock. They give you a fixed price immediately — not a range, not a "minimum". They tell you realistically how long they\'ll take to arrive. They confirm their name and let you know what to expect.',
          'When they arrive, they show up in a vehicle that\'s identifiable with their business. They introduce themselves. Before starting any work, they confirm the price with you. They try non-destructive entry first — picking, bypassing, or manipulating the lock — and only drill as a last resort. Throughout the job they explain what they\'re doing.',
          'After the job, they give you a written receipt that lists what was done and what was charged. They accept card payment. If parts were fitted — a new lock or cylinder — they show you the packaging. This is standard professional behaviour, and any locksmith working in {area} who doesn\'t do all of these things should be viewed with suspicion.',
        ],
      },
      {
        headingTemplate: 'Why I\'m Different',
        paragraphs: [
          'I live and work in {region}. I\'m a sole trader — not a franchise, not a call centre, not a dispatching service. When you call 024 7522 4730, you speak to me directly. I know {area} and {postcode} personally. I can tell you immediately which streets I can reach in {responseTime} and which might take a little longer depending on traffic.',
          'I charge fixed prices. The price I quote on the phone is the price you pay — there are no additions on arrival. No VAT. No call-out fee. No evening or weekend surcharge. No surprise "complexity charge". If the job turns out to require parts that change the cost, I tell you before I start, and you decide whether to proceed.',
          'My Google Reviews are real. They mention specific locations in {region}, mention jobs that I actually do, and are posted by real customers. I don\'t ask for reviews, I don\'t incentivise them, and I don\'t fabricate them. The best thing you can do before calling any locksmith in {area} is read their reviews carefully — genuine reviews tell you a lot.',
        ],
      },
      {
        headingTemplate: 'The {area} Locksmith Test',
        paragraphs: [
          'Before you call any locksmith in {area}, run this simple test: call them and ask "What is your fixed price for a standard emergency lockout in {area}?" A genuine local locksmith will answer immediately with a specific number — "£59" or "£65" or whatever their rate is. They won\'t ask for more information before quoting. They won\'t give a range. They won\'t say "it depends on the lock".',
          'A call centre or scam operation will almost never give you a straight fixed price on the phone. They\'ll say things like "we need to assess the lock first" or "it\'ll be £45 minimum but could be more" or "our engineer will give you an exact price on arrival". These aren\'t signs of caution — they\'re signs of a pricing model that relies on quoting low and charging high once they\'re at your door.',
          'This test takes 30 seconds and could save you over £100. Apply it to every locksmith you call in {area}, including me. If I can\'t give you a straight answer, don\'t call me back. A locksmith who knows their trade knows their prices.',
        ],
      },
    ],
    ctaTemplate:
      'Need an honest, fixed-price locksmith in {area}? Call 024 7522 4730. I answer, I quote, I come. From £59, no VAT.',
    relatedServiceSlugs: ['emergency-lockout'],
    relatedArticleSlugs: [
      'how-much-does-emergency-locksmith-cost',
      'locked-out-at-night',
    ],
  },

  // =====================================================================
  // 8. best-door-locks-security-guide
  // =====================================================================
  {
    slug: 'best-door-locks-security-guide',
    titleTemplate: 'Best Door Locks for Security in {area} — 2026 Guide',
    metaTemplate:
      'Best door locks for {area} homes in 2026. Anti-snap cylinders, BS3621 deadlocks, security upgrades. Local locksmith. Call 024 7522 4730.',
    keywords: [
      'best door locks {area}',
      'home security locks {area}',
      'anti-snap locks {area}',
    ],
    introVariants: {
      coventry:
        'Security standards for residential locks have improved significantly over the past decade, but most homes in {area} are still protected by locks installed 15-20 years ago that predate these improvements. This guide covers the best locks currently available for each door type you\'re likely to have in {area}, based on what I actually recommend and fit in {postcode} every week.',
      midlands:
        'Every year I attend properties in {area} after a burglary or attempted break-in that could have been prevented or at least significantly impeded by better locks. This is the guide I wish every homeowner in {area} had read beforehand — a straightforward breakdown of the best locks for each door type, with real prices and real product recommendations.',
      outskirts:
        'Homes in {area} and the {postcode} area face a different security profile than city properties — fewer neighbours nearby, longer emergency service response times, and a different pattern of opportunistic crime. This guide covers the best door locks for properties in {area}, with specific attention to the lock types that provide the best protection for the type of property common in this area.',
    },
    sections: [
      {
        headingTemplate: 'For Wooden Front Doors',
        paragraphs: [
          'The gold standard for a timber front door is a BS3621 five-lever mortice deadlock combined with a good quality deadlocking nightlatch. For the deadlock, I regularly fit ERA Fortress, Union 2134, and Yale PM562 — all of which carry the BS3621 certification and have strong track records for durability and resistance to attack. Each of these is available in brass or satin chrome finishes to suit different door styles.',
          'The nightlatch provides day-to-day convenience: the door closes and latches automatically. The deadlock provides the security level your insurer requires. Both should be used every time you leave the property. A common mistake in {area} properties is fitting a good deadlock but never turning it, relying on the nightlatch alone — which typically provides no more than a few seconds of resistance to a determined intruder.',
          'Supply and fit of a BS3621 deadlock to an existing mortice case in {area} starts from £79 including the lock, fitting, and new keys. If you also want to upgrade your nightlatch at the same time, ask me about combination pricing.',
        ],
      },
      {
        headingTemplate: 'For uPVC Doors',
        paragraphs: [
          'The single most important upgrade for any uPVC door in {area} is an anti-snap euro cylinder. Standard cylinders that protrude beyond the door face can be snapped in under 30 seconds using a screwdriver and a sharp blow — this is by far the most common method of forced entry to uPVC doors in {region}. Anti-snap cylinders are designed to shear at a sacrificial point before the cam mechanism is reached, stopping this attack method cold.',
          'I fit Avocet ABS as my standard anti-snap cylinder in {area}. It\'s a 3-star TS007 rated cylinder that comes with a £2,000 burglary guarantee. The Ultion cylinder is another excellent option if budget allows — it has additional anti-pick and anti-bump features. Yale Platinum is a solid mid-range choice. All three are significantly more secure than the builder-grade cylinders fitted to most uPVC doors.',
          'Fitted in {area} from £79. The job takes about 20 minutes. You don\'t need to replace the door — just the cylinder. I\'ll check the existing cylinder length and order the correct replacement so you don\'t have to measure anything.',
        ],
      },
      {
        headingTemplate: 'For Back Doors & Side Doors',
        paragraphs: [
          'Back and side doors are the most common point of entry for domestic burglars in {region}. They\'re less visible from the street, more likely to be obscured by fencing or outbuildings, and in many {area} properties they haven\'t been upgraded in decades. A solid BS3621 mortice deadlock on the back door is exactly as important as on the front.',
          'One specific point: external back and side doors should have key-operated locks, not thumb-turn locks on the inside. A thumb-turn allows a burglar who has broken a nearby window to reach in and unlock the door. Key-operated locks require the key to open from both sides, eliminating this attack. I see this mistake in a significant proportion of {area} properties — it\'s an easy and inexpensive fix.',
          'If your back or side door is a uPVC door, the same anti-snap cylinder recommendation applies. If it\'s a timber door that\'s been there for decades, get it checked — the lock that was fitted 25 years ago is unlikely to meet current standards, and replacement is probably overdue regardless of whether it\'s technically still working.',
        ],
      },
      {
        headingTemplate: 'For Windows',
        paragraphs: [
          'Most standard uPVC double-glazed windows come with basic cockspur handles that provide only minimal security on their own. Insurance policies in {area} typically require key-operated window locks on all accessible windows — and compliant window locks are inexpensive and easy to fit. Sash window locks and frame locks are available for all common window types.',
          'Older properties in {area} with timber sash windows have their own specific vulnerabilities. Sash stop bolts fitted to both sashes prevent a window from being fully opened even if the catch is forced. These are simple, effective, and cost almost nothing to fit. If you have older timber sash windows and no secondary locks, this is a low-cost, high-impact upgrade.',
          'Most burglars check windows before doors — a window that can be opened easily is always the preferred entry point over a solid door. Fitting key-operated window locks throughout your {area} property eliminates this option and forces any would-be intruder to attempt the door instead, where they\'re more visible and where better locks are waiting for them.',
        ],
      },
      {
        headingTemplate: 'Free Security Advice in {area}',
        paragraphs: [
          'If you\'d like to know exactly where your {area} property\'s security could be improved, call me on 024 7522 4730. I\'m happy to have a free conversation about your specific situation — what doors and locks you have, what your insurance requires, and what I would and wouldn\'t bother upgrading. I\'ll give you an honest assessment, not a sales pitch.',
          'When I\'m in {postcode} for any other job, I can also do a quick walk-round check at no charge. I\'ll tell you what looks solid and what needs attention. Many properties in {area} are better secured than their owners realise — and some have one or two specific vulnerabilities that are quick and inexpensive to address.',
          'Everything I fit comes with a written receipt and a 12-month guarantee on the work. Lock upgrades from £79 in {area} and nearby areas. No VAT. No call-out fee. Same-day availability most of the time.',
        ],
      },
    ],
    ctaTemplate:
      'Want a free security assessment for your {area} home? Call 024 7522 4730. Lock upgrades from £79, fitted same day.',
    relatedServiceSlugs: ['lock-upgrade', 'lock-change'],
    relatedArticleSlugs: ['yale-vs-deadlock-which-is-safer', 'bs3621-locks-home-insurance'],
  },

  // =====================================================================
  // 9. lost-keys-what-to-do
  // =====================================================================
  {
    slug: 'lost-keys-what-to-do',
    titleTemplate: 'Lost Your Keys in {area}? Here\'s What to Do Next',
    metaTemplate:
      'Lost house keys in {area}? Here\'s what to do — and when to change your locks. Same-day lock change from £69. Call 024 7522 4730.',
    keywords: [
      'lost keys {area}',
      'lost house keys {area}',
      'lost keys what to do {area}',
    ],
    introVariants: {
      coventry:
        'Losing your house keys in {area} ranges from a minor inconvenience to a genuine security emergency depending on where you lost them and what\'s attached to them. This guide walks you through the decisions you need to make quickly — starting with whether you\'re still locked out right now, and working through when and whether you need to change your locks.',
      midlands:
        'Lost keys in {area} raise two separate problems: getting back into your home (if you\'re currently locked out), and the security question of what to do about the keys now they\'re missing. This guide covers both, with practical advice tailored to the situation you\'re likely to be in.',
      outskirts:
        'Losing your keys in {area} can feel more stressful than it would in a city — there\'s less chance a neighbour might have found them, and if you\'re locked out, getting a locksmith to {postcode} can take a little longer. Here\'s exactly what to do, in order, to resolve the situation as quickly as possible.',
    },
    sections: [
      {
        headingTemplate: 'Priority 1 — Can You Get Into Your Home?',
        paragraphs: [
          'If you\'re currently locked out of your home in {area} because your keys are lost, that\'s the first thing to resolve. Call me on 024 7522 4730 — I cover {area} and {postcode} with a typical response time of {responseTime}. Emergency lockout starts from £59, no VAT, fixed price on the phone.',
          'If you have a spare key — with a trusted neighbour in {area}, a family member nearby, or in a key safe — use that first. If you don\'t, that\'s something to put in place after this situation is resolved. A spare key with a trusted neighbour is the most reliable fallback for future lockouts and costs nothing.',
          'If you\'re not locked out because someone else is home or because you were let in another way, you have more time to deal with the security question calmly. But don\'t delay too long — if the keys are genuinely lost rather than just misplaced, the security situation needs to be addressed today or tomorrow at the latest.',
        ],
      },
      {
        headingTemplate: 'Priority 2 — Where Were Your Keys Lost?',
        paragraphs: [
          'The urgency of changing your locks depends heavily on where and how your keys were lost. If they were stolen — pickpocketed, taken from a bag in a busy area, or taken in a burglary — change your locks today. The person who has your keys may have other information about you (car keys suggest your car, loyalty cards suggest your name and address) and may intend to use them.',
          'If they were simply lost — dropped somewhere in {area} where you have no idea where — the risk is lower but still real. Someone could find them and they might recognise your address from something else on your keyring. In this case, changing within 24-48 hours is the right approach.',
          'If your keys had a name tag or address label on them (something people should never do), change your locks immediately and treat it the same as a theft. If the only thing on the keys is a key fob with no identifying information, you have a little more time — but the precautionary principle still applies.',
        ],
      },
      {
        headingTemplate: 'Priority 3 — Change the Locks',
        paragraphs: [
          'Changing your locks after losing keys is not an overreaction — it\'s the only way to be completely sure that whoever has your keys cannot use them to enter your home. A new lock means the old keys are completely useless, regardless of how many copies were ever made. I can change locks same-day across {area} and {postcode}.',
          'Lock change from £69 in {area}. I carry euro cylinders, Yale nightlatches, and BS3621 mortice locks in my van. Most lock changes take 20-30 minutes per door. If you have multiple doors to change, I can do all of them in a single visit — ask me about pricing for a full-property lock change when you call.',
          'This is also a good opportunity to upgrade your locks if they were getting old. If you\'ve had the same locks since the late 2000s or early 2010s, they\'re probably not anti-snap or BS3621 compliant. Changing them now kills two birds with one stone: eliminates the lost key risk and brings your security up to current standards.',
        ],
      },
      {
        headingTemplate: 'Priority 4 — Make Spare Keys',
        paragraphs: [
          'Once the locks are changed, make at least one spare key and leave it with a trusted person — a neighbour you know well in {area}, a family member who lives locally, or a friend who can be reached at short notice. Don\'t leave a spare key "hidden" outside your property. Under the mat, in a plant pot, under a garden ornament, or in any commercially available "key rock" are all places burglars know to look.',
          'I can cut spare keys during the same visit as any lock change in {area}. Each spare key typically costs £5-10 depending on the key type. Having a spare key in a trusted location eliminates the risk of future lockouts and means you have a way in if you ever lose your keys again.',
          'Key safes — wall-mounted combination boxes — are another option for spare key storage if you don\'t have a convenient trusted person nearby. They need to be a good quality model and fixed securely to a solid wall. I can advise on suitable models if you\'re in {area} and interested.',
        ],
      },
      {
        headingTemplate: 'Does Insurance Cover Lost Keys?',
        paragraphs: [
          'Some home insurance policies include key replacement cover as a standard feature or as an add-on. This typically covers the cost of replacing locks when keys are lost or stolen, up to a set limit (commonly £250-£500). Check your policy schedule or call your insurer to find out whether you\'re covered.',
          'If you are covered, you\'ll usually need a receipt from a locksmith for the work done. I provide proper VAT-exempt receipts for all work in {area} — keep this for your insurer. Note that some policies require you to have a crime reference number if the keys were stolen rather than lost, so call 101 to report a theft before calling your insurer.',
          'Even if insurance doesn\'t cover the full cost, a lock change from £69 is a worthwhile investment in peace of mind. The alternative — leaving your home secured by locks that someone else may have keys for — is not really a sensible option in {area} or anywhere else.',
        ],
      },
    ],
    ctaTemplate:
      'Lost keys in {area}? Call 024 7522 4730. Lock change from £69, {responseTime} response, same-day service.',
    relatedServiceSlugs: ['lock-change', 'emergency-lockout'],
    relatedArticleSlugs: [
      'lock-change-after-burglary',
      'how-much-does-emergency-locksmith-cost',
    ],
  },

  // =====================================================================
  // 10. landlord-lock-change
  // =====================================================================
  {
    slug: 'landlord-lock-change',
    titleTemplate: 'Landlord Lock Change in {area} — Between Tenants',
    metaTemplate:
      'Landlord lock change in {area} between tenants. Same-day service from £69, all lock types. No VAT. Call 024 7522 4730.',
    keywords: [
      'landlord lock change {area}',
      'change locks between tenants {area}',
      'rental property locksmith {area}',
    ],
    introVariants: {
      coventry:
        'Landlords in {area} have a legal and practical obligation to ensure their rental properties are properly secured between tenancies. Changing the locks when a tenant leaves is the most basic step — and one that\'s frequently skipped despite the risks. I do regular landlord lock changes across {area} and {postcode} and can usually work around tenancy changeover dates with same-day availability.',
      midlands:
        'As a landlord in {area}, the risk of not changing locks between tenancies is higher than many people realise. This guide covers why the practice matters, what locks are legally required in rental properties in {region}, and how the process works when you call me for a same-day landlord lock change in {area}.',
      outskirts:
        'Rental properties in {area} and the {postcode} area carry the same lock-changing obligations between tenancies as properties in cities, but landlords here sometimes find it harder to get fast same-day service. I cover {area} as part of my regular patch and can usually attend on the same day a tenant moves out.',
    },
    sections: [
      {
        headingTemplate: 'Why Change Locks Between Every Tenancy',
        paragraphs: [
          'The most basic reason to change locks between tenancies is key security. Over the course of a tenancy, a tenant may have had keys cut for partners, friends, family members, or housekeepers. When the tenancy ends, you have no way of knowing how many copies of your keys are in circulation. Changing the locks means all of those copies are immediately rendered useless — without you needing to track down or account for any of them.',
          'There\'s also a liability dimension. If a former tenant retains a key and later enters the property — for any reason — and something is taken, damaged, or a person is harmed, the landlord may face questions about whether adequate security measures were in place. Changing locks between tenancies demonstrates that you took reasonable precautions. Not changing them creates a gap in that defence.',
          'I do landlord lock changes in {area} every week. It\'s a routine part of the job. Most landlords I work with have a standing arrangement: call me when the tenant moves out, I attend the same day or the following morning, change the locks before the new tenant moves in, and provide a receipt and new key set ready for handover.',
        ],
      },
      {
        headingTemplate: 'What Locks Are Required for Rental Properties',
        paragraphs: [
          'For mortgaged properties, the mortgage lender typically requires BS3621 five-lever mortice deadlocks on all final exit doors. For insured properties — which is almost all of them — the buildings and contents insurer requires the same. If the landlord\'s insurance doesn\'t include a security condition, it\'s worth checking, because many do and a burglary claim can be rejected if the standard wasn\'t met.',
          'For uPVC doors, anti-snap euro cylinders are the recommended standard. Standard builder-grade cylinders on uPVC doors are a well-known vulnerability — if a burst of burglaries hits {area}, uPVC doors with standard cylinders are almost always the point of entry. Anti-snap cylinders are a small additional cost per door and a significant improvement in security.',
          'For HMOs — houses in multiple occupation — there are additional requirements. Fire-rated locks on all habitable room doors are typically required under HMO licensing conditions. Communal door security also needs to be robust, as the main entrance is shared by multiple tenants. I can advise on HMO lock requirements for {area} properties when you call.',
        ],
      },
      {
        headingTemplate: 'Landlord Pricing in {area}',
        paragraphs: [
          'My landlord lock change pricing for {area} and {postcode}: single lock change from £69, full residential property (front door, back door, and any side door) from £149, additional uPVC euro cylinder from £69, HMO room door lock from £49 per door. All prices include labour, new lock or cylinder, and new keys. No VAT. No call-out fee.',
          'For landlords with multiple properties in {area} or across {region} who need regular lock changes, I offer a reduced landlord rate. Call me to discuss — it\'s worth having a conversation if you\'re managing more than a couple of properties in my coverage area. The arrangement is flexible: you call when you need me, there\'s no retainer, and the pricing reflects the volume of work.',
          'I provide a proper receipt for every job, which you need for insurance purposes and which is useful documentation for your property management records. If you need a brief written statement confirming what was done — for example for a letting agency or an insurance enquiry — I can provide that too at no additional charge.',
        ],
      },
      {
        headingTemplate: 'Bulk & Regular Work',
        paragraphs: [
          'Many landlords I work with in {area} have a simple arrangement: they call or text me when a tenant moves out, I turn up the same day or the following morning, change the locks, and send them a photo of the new key set along with the receipt. The new keys are ready for the new tenant\'s move-in day. The whole thing takes 30-45 minutes for a standard two-door property.',
          'If you\'re a letting agent managing multiple properties in {area} or across {region}, I\'m happy to discuss a standing arrangement. I can prioritise call-outs for your properties and maintain consistent pricing across all work. Call 024 7522 4730 to discuss — I work with several letting agencies across the {region} area and I understand the logistics of managing multiple properties and tenancies.',
          'I\'m reliable, on-time, and I do good work. Those are the three things landlords in {area} consistently tell me matter most. Call me and see for yourself.',
        ],
      },
      {
        headingTemplate: 'Key Management',
        paragraphs: [
          'As standard, I cut three keys per lock for every lock change — one for the landlord, one for the tenant, and one spare that I\'d recommend the landlord retains. Additional keys can be cut during the same visit at £5-10 per key depending on the key type. If you need a larger set — for example for an HMO with multiple tenants needing access — tell me when you call and I\'ll bring the right cutting equipment.',
          'For HMOs, master key systems are available. A master key system allows you to open all room doors with a single master key, while each tenant has a key that only opens their own door and the main entrance. This is particularly useful for maintenance access and emergency situations. I can design and fit a basic master key system for an {area} HMO — call to discuss your specific setup.',
          'All key sets are numbered to the lock they belong to and bagged with the receipt. If a tenant ever claims to have lost their key during a tenancy, you have a clear record of what was issued at the start of the tenancy, which is useful if there are any disputes at checkout. Small detail, but it matters.',
        ],
      },
    ],
    ctaTemplate:
      'Landlord lock change in {area}? Call 024 7522 4730. Same-day, from £69, no VAT. I cover {postcode} and surrounding areas.',
    relatedServiceSlugs: ['lock-change'],
    relatedArticleSlugs: ['bs3621-locks-home-insurance', 'best-door-locks-security-guide'],
  },
]

// Active templates (5 kept, 5 cut and redirected to area pages)
export const ARTICLE_TEMPLATES = ALL_ARTICLE_TEMPLATES.filter((t) => KEPT_SLUGS.includes(t.slug))

// Cut template slugs (for redirect config)
export const CUT_ARTICLE_SLUGS = ALL_ARTICLE_TEMPLATES
  .filter((t) => !KEPT_SLUGS.includes(t.slug))
  .map((t) => t.slug)

// Helper: render template string with area data
export function renderTemplate(
  template: string,
  area: { name: string; postcode: string; region: string; responseTime: string }
): string {
  return template
    .replace(/\{area\}/g, area.name)
    .replace(/\{postcode\}/g, area.postcode)
    .replace(/\{region\}/g, area.region)
    .replace(/\{responseTime\}/g, area.responseTime)
}

// Helper: pick intro variant based on region
export function getIntroVariant(template: ArticleTemplate, region: string): string {
  if (region === 'Coventry') return template.introVariants.coventry
  if (
    region.includes('Nuneaton') ||
    region.includes('Bedworth') ||
    region.includes('Rugby')
  )
    return template.introVariants.midlands
  return template.introVariants.outskirts
}

export function getArticleBySlug(slug: string): ArticleTemplate | undefined {
  return ARTICLE_TEMPLATES.find((a) => a.slug === slug)
}
