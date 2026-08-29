// Search titles are intentionally separate from article H1s. This keeps the
// SERP title focused while preserving the full editorial headline on-page.
export const BLOG_SEARCH_TITLES: Record<string, string> = {
  'what-is-lock-snapping': 'What Is Lock Snapping? How to Protect Your Door',
  'euro-cylinder-locks-explained': 'Euro Cylinder Locks: Types, Sizes and How to Measure',
  'bs3621-vs-anti-snap-vs-smart-lock': 'BS3621 vs Anti-Snap vs Smart Locks: What Matters?',
  'yale-vs-mortice-deadlock': 'Yale Lock vs Mortice Deadlock: Which Do You Need?',
  'anti-snap-locks-compared': 'Anti-Snap Locks Compared: Ultion, ABS, Yale and Avocet',
  'smart-locks-2026-are-they-secure': 'Are Smart Locks Secure Enough for Your Front Door?',
  'five-lever-mortice-deadlock-guide': '5-Lever Mortice Deadlocks: Complete UK Guide',
  'ts007-vs-ss312-lock-standards': 'TS007 3-Star vs SS312 Diamond Locks Explained',
  'how-burglars-break-into-uk-homes': 'UK Home Entry Risks and Burglary Prevention',
  'home-security-checklist-2026': 'Complete Home Security Checklist for 2026',
  'do-burglar-alarms-cctv-deter-burglars': 'Do Burglar Alarms and CCTV Deter Burglars?',
  'window-security-overlooked-weak-point': 'Window Security: Locks and Upgrade Options',
  'patio-doors-french-doors-security': 'Patio and French Door Security Upgrade Options',
  'garage-shed-security': 'Garage and Shed Security: Locks and Practical Upgrades',
  'secured-by-design-explained': 'Secured by Design: What It Means for Home Security',
  'emergency-locksmith-cost-coventry-2026': 'Emergency Locksmith Cost in Coventry: 2026 Prices',
  'emergency-locksmith-charges-explained': 'Emergency Locksmith Charges and Call-Out Costs',
  'lock-change-costs-by-type': 'Lock Change Costs by Lock Type and Door Type',
  'upvc-door-lock-replacement-costs': 'uPVC Door Lock Replacement Cost Guide',
  'rekey-or-replace-locks': 'Rekey or Replace Locks: Which Costs Less?',
  'locksmith-wont-give-price-on-phone': "Locksmith Won't Quote by Phone? Scam Warning Signs",
  'upvc-door-lock-needs-replacing': 'Does Your uPVC Door Lock Need Repair or Replacement?',
  'upvc-door-lock-mechanisms-explained': 'uPVC Door Lock Mechanisms: Gearboxes, Hooks and Rollers',
  'how-to-measure-euro-cylinder-upvc': 'How to Measure a Euro Cylinder for a uPVC Door',
  'best-euro-cylinder-upgrades-2026': 'Euro Cylinder Upgrade Options for uPVC Doors',
  'upvc-door-maintenance-guide': 'uPVC Door Maintenance to Prevent Lock Failures',
  'upvc-door-handle-problems': 'uPVC Door Handle Problems: Causes, Fixes and Costs',
  'multipoint-locking-systems-explained': 'Multipoint Locking Systems: How They Work and Fail',
  'locked-out-late-night-coventry': 'Locked Out of Your House? What to Do Safely',
  'what-to-do-after-burglary': 'What to Do After a Burglary: UK Step-by-Step Guide',
  'broken-key-stuck-in-lock': 'Key Snapped in Lock? How to Remove a Broken Key',
  'lost-keys-should-you-change-locks': 'Lost House Keys: Should You Change the Locks?',
  'how-emergency-locksmith-callouts-work': 'How Emergency Locksmith Call-Outs Work',
  'can-fire-brigade-police-help-locked-out': "Can Police or Fire Brigade Help When You're Locked Out?",
  'bs3621-locks-explained': 'BS3621 Locks: What Home Insurance May Require',
  'pas3621-bs3621-bs8621-differences': 'PAS3621 vs BS3621 vs BS8621 Lock Standards',
  'can-landlord-change-locks': 'Can a Landlord Change the Locks? UK Tenant Rights',
  'landlords-change-locks-between-tenants': 'Must Landlords Change Locks Between Tenants?',
  'insurance-payout-lock-standards': 'Will Home Insurance Pay If Locks Fail the Standard?',
  'insurance-approved-locks-explained': 'Insurance-Approved Locks: Meaning and How to Check',
  'dark-evenings-burglary-october': 'Dark Evenings and Burglary: Autumn Security Guide',
  'how-to-stop-locks-freezing-winter': 'How to Stop Door Locks Freezing This Winter',
  'christmas-home-security': 'Christmas Home Security: Protect Your Home and Gifts',
  'summer-holiday-security-checklist': 'Summer Holiday Home Security Checklist',
  'moving-house-change-locks': 'Moving House? Why You Should Change the Locks',
  'student-move-in-security-guide': 'Coventry Student Move-In Security Guide',
  'bank-holiday-lockout-guide': 'Locked Out on a Bank Holiday? What to Do',
  'new-year-home-security-audit': 'New Year Home Security Audit: Doors, Windows and Locks',
  'coventry-victorian-terraces-security': 'Security for Coventry Victorian Terraces and 1930s Semis',
  'burglary-trends-coventry-warwickshire': 'Coventry Burglary Data: What Official Sources Show',
  'common-lock-problems-coventry-homes': 'Coventry Door Lock Problems: A Diagnosis Guide',
  'choosing-locksmith-coventry': 'How to Choose a Trusted Locksmith in Coventry',
}

// Only excerpts that exceed the metadata budget need an override. Article-card
// excerpts remain untouched, so editorial summaries and search descriptions can
// evolve independently.
export const BLOG_META_DESCRIPTIONS: Record<string, string> = {
  'what-is-lock-snapping': 'Learn how lock snapping works, which euro cylinders are vulnerable and how anti-snap upgrades can better protect your door.',
  'euro-cylinder-locks-explained': 'Understand euro cylinder types and sizes, how to measure your lock correctly and what to consider before buying a replacement.',
  'yale-vs-mortice-deadlock': 'Compare Yale nightlatches and mortice deadlocks, find out whether you need both and choose the right setup for your front door.',
  'anti-snap-locks-compared': 'Compare named anti-snap cylinders by current certification, fit, documented features and the limits of brand-level comparisons.',
  'smart-locks-2026-are-they-secure': "A locksmith's guide to smart lock security, including what to consider before replacing a traditional front-door deadlock.",
  'five-lever-mortice-deadlock-guide': 'Learn how 5-lever mortice deadlocks work, how to identify one and why BS3621 may matter for wooden doors and home insurance.',
  'ts007-vs-ss312-lock-standards': 'Understand TS007, SS312 and Sold Secure ratings, what each lock standard means and which protection may suit your door.',
  'how-burglars-break-into-uk-homes': 'Use official prevention guidance to assess door, window and access risks without treating national advice as a property-level finding.',
  'do-burglar-alarms-cctv-deter-burglars': 'See what research says about burglar alarms and CCTV, plus practical security measures that can make a home less attractive to burglars.',
  'window-security-overlooked-weak-point': 'Use official guidance and an opening-specific check to review accessible windows, locks, frames and suitable upgrade options.',
  'patio-doors-french-doors-security': 'Review patio and French door security by inspecting the exact door, frame, locking points and compatible upgrade options.',
  'emergency-locksmith-cost-coventry-2026': 'See published Coventry from-prices and the factors that determine a lockout, lock repair or replacement quote.',
  'best-euro-cylinder-upgrades-2026': 'Compare euro-cylinder certification, dimensions and compatibility before choosing an upgrade for an inspected uPVC door.',
  'upvc-door-handle-problems': 'Learn why a uPVC door handle may drop, loosen or become stiff and why diagnosis should precede a repair quote.',
  'multipoint-locking-systems-explained': 'Learn how multipoint locking systems work, what symptoms to record and why inspection determines repair or replacement.',
  'locked-out-late-night-coventry': 'Locked out in Coventry? Follow safe steps to check access options, avoid damage and know when to call an emergency locksmith.',
  'what-to-do-after-burglary': 'A clear UK checklist for what to do after a burglary, from contacting the police and insurer to securing damaged doors and locks.',
  'broken-key-stuck-in-lock': 'Find out why keys snap in locks, what you can safely try and when to stop before causing more damage to the cylinder.',
  'can-fire-brigade-police-help-locked-out': 'Learn when police or the fire brigade may help with a lockout, when they cannot and when to call an emergency locksmith.',
  'pas3621-bs3621-bs8621-differences': 'Compare PAS3621, BS3621 and BS8621, understand what each lock standard covers and check which one applies to your door.',
  'insurance-payout-lock-standards': 'Understand how lock standards can affect a home insurance claim and what to check in your policy before a break-in happens.',
  'insurance-approved-locks-explained': 'Learn what insurance-approved locks means, which standards may apply and how to check whether your locks meet your policy.',
  'christmas-home-security': 'Practical Christmas home-security checks for doors, windows, lighting and holiday plans to help protect your home and gifts.',
  'summer-holiday-security-checklist': 'Use this holiday security checklist to review locks, lighting, neighbours and online sharing before you leave home.',
  'moving-house-change-locks': 'Changing locks after moving protects against unknown spare keys. Learn which locks to check first and how to plan the work.',
  'student-move-in-security-guide': 'A Coventry student move-in security guide covering shared homes, HMOs, door locks and questions to raise with your landlord.',
  'new-year-home-security-audit': 'Use a structured home-security audit to review doors, windows and locks and record items that need property-specific advice.',
  'coventry-victorian-terraces-security': 'Use Coventry housing context carefully while checking the actual door, window and lock rather than inferring risk from property age.',
  'burglary-trends-coventry-warwickshire': 'Learn what current national and local burglary sources can show, their geographic limits and practical steps for a property-specific security check.',
  'common-lock-problems-coventry-homes': 'Record observable door and lock symptoms, then distinguish cylinder, mortice and multipoint checks from postcode assumptions.',
  'choosing-locksmith-coventry': 'Learn how to compare Coventry locksmiths, check local credentials, spot warning signs and ask for clear pricing before booking.',
}

// Only bump dates for articles whose editorial body was materially reviewed.
export const BLOG_CONTENT_UPDATED: Record<string, string> = {
  'what-is-lock-snapping': '2026-08-28',
  'euro-cylinder-locks-explained': '2026-08-28',
  'bs3621-vs-anti-snap-vs-smart-lock': '2026-08-28',
  'yale-vs-mortice-deadlock': '2026-08-28',
  'anti-snap-locks-compared': '2026-08-28',
  'smart-locks-2026-are-they-secure': '2026-08-28',
  'five-lever-mortice-deadlock-guide': '2026-08-28',
  'how-burglars-break-into-uk-homes': '2026-08-28',
  'home-security-checklist-2026': '2026-08-28',
  'patio-doors-french-doors-security': '2026-08-28',
  'garage-shed-security': '2026-08-28',
  'do-burglar-alarms-cctv-deter-burglars': '2026-08-28',
  'window-security-overlooked-weak-point': '2026-08-28',
  'emergency-locksmith-cost-coventry-2026': '2026-08-28',
  'emergency-locksmith-charges-explained': '2026-08-28',
  'lock-change-costs-by-type': '2026-08-28',
  'upvc-door-lock-replacement-costs': '2026-08-28',
  'rekey-or-replace-locks': '2026-08-28',
  'upvc-door-lock-needs-replacing': '2026-08-28',
  'upvc-door-lock-mechanisms-explained': '2026-08-28',
  'how-to-measure-euro-cylinder-upvc': '2026-08-28',
  'best-euro-cylinder-upgrades-2026': '2026-08-28',
  'multipoint-locking-systems-explained': '2026-08-28',
  'locksmith-wont-give-price-on-phone': '2026-08-28',
  'burglary-trends-coventry-warwickshire': '2026-08-28',
  'coventry-victorian-terraces-security': '2026-08-28',
  'common-lock-problems-coventry-homes': '2026-08-28',
  'ts007-vs-ss312-lock-standards': '2026-08-28',
  'secured-by-design-explained': '2026-08-28',
  'what-to-do-after-burglary': '2026-08-28',
  'broken-key-stuck-in-lock': '2026-08-28',
  'lost-keys-should-you-change-locks': '2026-08-28',
  'how-emergency-locksmith-callouts-work': '2026-08-28',
  'can-fire-brigade-police-help-locked-out': '2026-08-28',
  'bank-holiday-lockout-guide': '2026-08-28',
  'bs3621-locks-explained': '2026-08-28',
  'pas3621-bs3621-bs8621-differences': '2026-08-28',
  'can-landlord-change-locks': '2026-08-28',
  'landlords-change-locks-between-tenants': '2026-08-28',
  'insurance-payout-lock-standards': '2026-08-28',
  'insurance-approved-locks-explained': '2026-08-28',
  'dark-evenings-burglary-october': '2026-08-28',
  'how-to-stop-locks-freezing-winter': '2026-08-28',
  'christmas-home-security': '2026-08-28',
  'summer-holiday-security-checklist': '2026-08-28',
  'student-move-in-security-guide': '2026-08-28',
  'new-year-home-security-audit': '2026-08-28',
  'moving-house-change-locks': '2026-08-28',
  'choosing-locksmith-coventry': '2026-08-28',
}

export interface BlogServiceCta {
  href: string
  label: string
  heading: string
  description: string
}

export const BLOG_CTA_BY_PILLAR: Record<string, BlogServiceCta> = {
  'lock-types-security': {
    href: '/services/lock-upgrade',
    label: 'View lock upgrade service',
    heading: 'Need help choosing or upgrading a lock?',
    description: 'See the Coventry lock upgrade service, standards covered and current from-price before you call.',
  },
  'home-security': {
    href: '/services/lock-upgrade',
    label: 'View lock security upgrades',
    heading: 'Want a practical lock security upgrade?',
    description: 'Compare anti-snap cylinders and BS3621 lock upgrades, with pricing shown before you call.',
  },
  'locksmith-costs': {
    href: '/prices',
    label: 'View locksmith prices',
    heading: 'Compare current locksmith prices',
    description: 'See published from-prices for lockouts, lock changes, uPVC repairs, boarding and upgrades.',
  },
  'upvc-door-locks': {
    href: '/services/upvc-lock-repair',
    label: 'View uPVC lock repair service',
    heading: 'Need a uPVC lock diagnosed or repaired?',
    description: 'See the Coventry uPVC lock repair service, common faults and current from-price.',
  },
  'emergency-situations': {
    href: '/services/emergency-lockout',
    label: 'View emergency lockout service',
    heading: 'Locked out or dealing with a lock emergency?',
    description: 'See the 24/7 lockout service, what happens on a call-out and the current from-price.',
  },
  'legal-insurance': {
    href: '/services/lock-upgrade',
    label: 'View lock upgrade service',
    heading: 'Need your locks checked or upgraded?',
    description: 'See the lock standards fitted and ask your insurer which standard your own policy requires.',
  },
  'seasonal-security': {
    href: '/services/lock-upgrade',
    label: 'View home lock upgrades',
    heading: 'Ready to improve your door security?',
    description: 'Compare practical Coventry lock upgrades and published from-prices.',
  },
  'coventry-local': {
    href: '/services',
    label: 'View all locksmith services',
    heading: 'Need a locksmith in Coventry or Warwickshire?',
    description: 'Compare the five residential locksmith services, prices and the areas covered.',
  },
}

const LOCK_REPAIR_REPLACEMENT_CTA: BlogServiceCta = {
  href: '/services/lock-change',
  label: 'View lock repair and replacement',
  heading: 'Need a door lock repaired or replaced?',
  description: 'See the Coventry door lock repair and replacement service, common lock types and current from-price.',
}

const BOARDING_BURGLARY_REPAIR_CTA: BlogServiceCta = {
  href: '/services/boarding-up',
  label: 'View boarding and burglary repairs',
  heading: 'Need to secure burglary damage now?',
  description: 'See the 24/7 temporary boarding and burglary-related lock service, with scope agreed after the opening is assessed.',
}

// Specific article intent wins over the broader editorial pillar. This keeps
// each guide connected to the closest service instead of sending every article
// in a broad topic cluster to the same commercial page.
export const BLOG_CTA_BY_SLUG: Record<string, BlogServiceCta> = {
  'what-to-do-after-burglary': BOARDING_BURGLARY_REPAIR_CTA,
  'burglary-trends-coventry-warwickshire': BLOG_CTA_BY_PILLAR['home-security'],
  'lost-keys-should-you-change-locks': LOCK_REPAIR_REPLACEMENT_CTA,
  'moving-house-change-locks': LOCK_REPAIR_REPLACEMENT_CTA,
  'lock-change-costs-by-type': LOCK_REPAIR_REPLACEMENT_CTA,
  'rekey-or-replace-locks': LOCK_REPAIR_REPLACEMENT_CTA,
  'broken-key-stuck-in-lock': BLOG_CTA_BY_PILLAR['emergency-situations'],
  'locked-out-late-night-coventry': BLOG_CTA_BY_PILLAR['emergency-situations'],
  'bank-holiday-lockout-guide': BLOG_CTA_BY_PILLAR['emergency-situations'],
  'what-is-lock-snapping': BLOG_CTA_BY_PILLAR['lock-types-security'],
  'anti-snap-locks-compared': BLOG_CTA_BY_PILLAR['lock-types-security'],
  'bs3621-locks-explained': BLOG_CTA_BY_PILLAR['legal-insurance'],
}

// One canonical guide set per service, reused by service pages and every
// hand-written town×service page.
export const SERVICE_GUIDE_SLUGS: Record<string, readonly string[]> = {
  'emergency-lockout': [
    'locked-out-late-night-coventry',
    'broken-key-stuck-in-lock',
    'can-fire-brigade-police-help-locked-out',
  ],
  'lock-change': [
    'lock-change-costs-by-type',
    'lost-keys-should-you-change-locks',
    'moving-house-change-locks',
  ],
  'upvc-lock-repair': [
    'upvc-door-lock-needs-replacing',
    'upvc-door-lock-mechanisms-explained',
    'upvc-door-maintenance-guide',
  ],
  'boarding-up': [
    'what-to-do-after-burglary',
    'how-burglars-break-into-uk-homes',
    'home-security-checklist-2026',
  ],
  'lock-upgrade': [
    'bs3621-locks-explained',
    'anti-snap-locks-compared',
    'insurance-approved-locks-explained',
  ],
}
