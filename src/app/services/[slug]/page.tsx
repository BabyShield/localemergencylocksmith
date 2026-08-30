import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SERVICES, getServiceBySlug } from '@/data/services'
import {
  PUBLISHED_PRICE_BY_ID,
  SERVICE_PRICE_DETAILS,
  servicePriceLabel,
  type ServicePriceDetail,
} from '@/data/pricing'
import { AREAS, AREA_SERVED_SCHEMA, getAllAreasByRegion } from '@/data/areas'
import { hasTownService } from '@/data/governed-town-services'
import {
  SITE_CONFIG,
  LOCKSMITH_AUTHOR_SCHEMA,
  SERVICE_PROVIDER_SCHEMA,
} from '@/data/config'
import { SERVICE_GUIDES_REVIEWED_ON } from '@/data/content-dates'
import { getTechnicalEvidenceSource } from '@/data/locksmith-evidence'
import { getBlogPostBySlug } from '@/data/blog-posts'
import { SERVICE_GUIDE_SLUGS } from '@/data/blog-seo'
import HeroSection from '@/components/HeroSection'
import CTABlock from '@/components/CTABlock'
import FAQSection from '@/components/FAQSection'
import SchemaMarkup from '@/components/SchemaMarkup'
import DirectAnswer from '@/components/DirectAnswer'
import LastUpdated from '@/components/LastUpdated'
import ServiceIcon from '@/components/ServiceIcon'
import ContentAuthorNote from '@/components/ContentAuthorNote'

export const dynamic = 'force-static'
export const revalidate = false

const STANDARD_LOCKOUT_PRICE = PUBLISHED_PRICE_BY_ID['emergency-lockout'].price
const EURO_CYLINDER_PRICE = PUBLISHED_PRICE_BY_ID['euro-cylinder-replacement'].price
const UPVC_REPAIR_PRICE = PUBLISHED_PRICE_BY_ID['upvc-lock-repair'].price
const UPVC_GEARBOX_PRICE = PUBLISHED_PRICE_BY_ID['upvc-gearbox-replacement'].price
const BOARDING_PRICE = PUBLISHED_PRICE_BY_ID['emergency-boarding'].price
const ANTI_SNAP_PRICE = PUBLISHED_PRICE_BY_ID['anti-snap-cylinder'].price
const BS3621_PRICE = PUBLISHED_PRICE_BY_ID['bs3621-mortice'].price

const SERVICE_SOURCE_IDS: Record<string, readonly string[]> = {
  'emergency-lockout': ['mla-service-calls'],
  'lock-change': ['west-midlands-door-security', 'mla-service-calls'],
  'upvc-lock-repair': [
    'west-midlands-lock-advice',
    'west-midlands-door-security',
    'mila-door-locks-catalogue',
    'mla-service-calls',
  ],
  'boarding-up': ['west-midlands-forensics', 'mla-service-calls'],
  'lock-upgrade': [
    'west-midlands-door-security',
    'west-midlands-lock-advice',
    'bsi-bs3621-current',
    'secured-by-design-introduction',
    'dhf-ts007-current',
    'mla-service-calls',
  ],
}

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return {}
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical: `${SITE_CONFIG.domain}/services/${slug}`,
    },
    openGraph: {
      type: 'website',
      title: service.metaTitle,
      description: service.metaDescription,
      url: `${SITE_CONFIG.domain}/services/${slug}`,
      images: [{ url: `${SITE_CONFIG.domain}/api/og?title=${encodeURIComponent(service.metaTitle)}`, width: 1200, height: 630 }],
    },
  }
}

/* ------------------------------------------------------------------ */
/*  SERVICE_CONTENT — all 5 services with expanded data               */
/* ------------------------------------------------------------------ */

const SERVICE_CONTENT: Record<string, {
  h1: string
  intro: string[]
  steps: string[]
  faqs: { q: string; a: string }[]
  howToName: string
  benefits: string[]
  whyUs: string
  scenarios: { title: string; desc: string }[]
  priceDetails: readonly ServicePriceDetail[]
  directAnswer: { question: string; answer: string }
  voiceFaqs: { q: string; a: string }[]
}> = {
  'emergency-lockout': {
    h1: 'Emergency Locksmith for House Lockouts in Coventry',
    intro: [
      "Being locked out of your house is stressful — especially late at night or in bad weather. I provide a professional emergency lockout service across Coventry and Warwickshire, available 24 hours a day, 7 days a week, 365 days a year.",
      `When you call me, I'll ask for the full address and a brief description of the door and lock. I confirm the current ETA and the price basis for the described scope — from £${STANDARD_LOCKOUT_PRICE}, with no VAT or separate call-out fee.`,
      "I try appropriate non-destructive entry methods first where the lock, door and circumstances allow. If a destructive step or replacement becomes necessary, I explain why and confirm the cost before proceeding.",
    ],
    steps: [
      "Call 024 7522 4730 — I answer 24/7",
      "Tell me your location and a brief description of your door",
      `I confirm the price basis — from £${STANDARD_LOCKOUT_PRICE}, no VAT`,
      "I confirm the current ETA from my actual starting point and your full address",
      "I open your door using non-destructive entry where possible",
      "I advise whether your lock needs replacing and give you an honest quote",
    ],
    faqs: [
      { q: 'Can you open any type of lock?', a: 'I work with common residential cylinders, nightlatches, mortice locks and multipoint systems. The safe method depends on the exact lock, its condition and proof of authority; I explain any limitation before work proceeds.' },
      { q: 'Will you damage my door or lock?', a: 'I assess whether an appropriate non-destructive method is available first. No method or damage outcome can be guaranteed from a phone description. If drilling or replacement becomes necessary, I explain why and confirm the cost before proceeding.' },
      { q: 'Do you charge more for late night callouts?', a: `The published starting-price basis has no separate night, weekend or bank-holiday surcharge. A standard lockout starts from £${STANDARD_LOCKOUT_PRICE} with no VAT or separate call-out fee; the agreed total still depends on the diagnosed work, method, parts and approved scope.` },
      { q: 'How long does it take to open a locked door?', a: 'The time depends on the lock, door, condition and available method. I inspect the entrance and explain the likely method before starting rather than promise a fixed opening time.' },
    ],
    howToName: 'How to Get an Emergency Locksmith in Coventry',
    benefits: [
      "Non-destructive entry — your lock and door stay intact where possible",
      "No separate time-of-day surcharge — the agreed total still depends on diagnosed scope and parts",
      "Current ETA confirmed from the full address before I set off",
      "Price basis confirmed for the problem described before I set off",
      "Any changed diagnosis, method or parts agreed before work proceeds",
    ],
    whyUs: "When you call, you speak directly to me. I confirm the current ETA and the price basis for the described problem, verify authority at the entrance, and explain any changed diagnosis or method before asking you to approve revised work.",
    scenarios: [
      { title: "Locked Out Late at Night", desc: "Your keys are inside and the door has closed. I confirm the current ETA, check authority, and assess the least destructive suitable entry method at the door." },
      { title: "Keys Lost or Stolen", desc: "Can't find your keys and worried about security? I assess entry and any key-control risk separately, then confirm whether a compatible lock change can be completed during the attendance." },
      { title: "Door Slammed Shut", desc: "A nightlatch can engage when the door closes. I verify authority and inspect the fitted lock before agreeing a suitable opening method or any follow-on work." },
    ],
    priceDetails: SERVICE_PRICE_DETAILS['emergency-lockout'],
    directAnswer: {
      question: 'What does a standard Coventry lockout start from?',
      answer: `An emergency locksmith in Coventry costs from £${STANDARD_LOCKOUT_PRICE} for a standard lockout. This price includes labour, with no VAT or separate call-out fee. Call with the full address and lock symptoms for the current ETA and price basis.`,
    },
    voiceFaqs: [
      { q: 'How quickly can a locksmith get to me in Coventry?', a: 'Call with the full address for a current arrival estimate. It depends on the locksmith’s actual starting point, traffic and any earlier job, so a static page should not promise a fixed journey time.' },
      { q: 'Will a locksmith damage my door when opening it?', a: 'A locksmith should assess an appropriate non-destructive method first where circumstances allow, but cannot guarantee the outcome without inspecting the lock and door. Any destructive step should be explained and priced before it is taken.' },
      { q: 'Is it more expensive to call this locksmith at night?', a: 'My published pricing does not add a night, weekend or bank-holiday premium. The agreed price still depends on the diagnosed work and any parts, so confirm the scope when you call.' },
    ],
  },
  'lock-change': {
    h1: 'Door Lock Repair & Replacement Coventry',
    intro: [
      "A stiff, broken, or unreliable door lock does not always need a full security upgrade. I diagnose door lock faults across Coventry and repair the existing lock where that is practical, or replace it when wear or damage makes replacement the better option.",
      "This service covers Yale nightlatches, mortice locks, euro cylinders, broken front-door locks, and planned lock changes after lost keys or a house move. I explain the repair and replacement options before any work starts.",
      `Door lock repair or replacement starts from £${EURO_CYLINDER_PRICE} including labour and any part explicitly stated in the quote. No VAT. No separate call-out fee.`,
    ],
    steps: [
      "Call 024 7522 4730 and describe the door, lock, and fault",
      "I inspect the lock and establish whether a repair is practical",
      "I explain the repair or replacement options and confirm the full price",
      "I repair the mechanism or remove and replace the failed lock",
      "I test the door from both sides and provide new keys where a lock was replaced",
      "I explain any maintenance or separate security-upgrade options that are relevant",
    ],
    faqs: [
      { q: 'Can a broken door lock be repaired?', a: 'Often, yes. Stiffness, alignment, a worn latch, or a replaceable cylinder may be repairable without changing the complete lock. I inspect the fault first and explain whether repair or replacement is the more practical option.' },
      { q: 'When should a door lock be replaced instead of repaired?', a: 'Replacement may be appropriate when the mechanism is badly worn, parts are unavailable, the lock has been damaged, keys are lost, or you need a fresh set of keys after moving. I confirm the reason and price before replacing it.' },
      { q: 'How long does a lock repair or replacement take?', a: 'The time and number of visits depend on the diagnosed fault, safe access, door type, suitable-part availability and whether the existing opening accepts the replacement without alteration.' },
      { q: 'Can I choose the brand of replacement lock?', a: 'Tell me if you prefer a particular brand or certification. The suitable options still depend on the inspected door, measurements, required function and current compatible-part availability.' },
    ],
    howToName: 'How to Get a Door Lock Repaired or Replaced in Coventry',
    benefits: [
      "Repair considered before a complete replacement",
      "Compatible residential part availability checked before replacement is promised",
      "Replacement options and full price explained first",
      "New keys supplied and tested when a lock is replaced",
      "Door and lock operation checked before I leave",
    ],
    whyUs: "I diagnose the cause before recommending a replacement. I identify the installed nightlatch, mortice lock or cylinder, check compatible-part availability, and explain the repair or replacement route and price before starting.",
    scenarios: [
      { title: "Broken or Stiff Door Lock", desc: "The key will not turn smoothly, the latch sticks, or the lock has stopped working. I inspect whether the existing lock can be repaired." },
      { title: "Lost Keys or House Move", desc: "You need a fresh lock and key set because keys are missing or you do not know who still has copies." },
      { title: "Worn Lock Needs Replacing", desc: "An older lock is unreliable or its parts are no longer practical to repair. I fit and test a suitable replacement." },
    ],
    priceDetails: SERVICE_PRICE_DETAILS['lock-change'],
    directAnswer: {
      question: 'How much does door lock repair or replacement cost in Coventry?',
      answer: `Door lock repair or replacement in Coventry starts from £${EURO_CYLINDER_PRICE} for a euro-cylinder replacement. The final price depends on the fault, lock type and compatible part. I confirm the price basis before work starts, with no VAT or separate call-out fee.`,
    },
    voiceFaqs: [
      { q: 'Can a locksmith repair a door lock instead of replacing it?', a: 'Often, yes. Alignment, latch, cylinder, and some mechanism faults can be repaired. The locksmith should inspect the cause and explain both options before replacing the complete lock.' },
      { q: 'Can a locksmith replace my lock on the same day?', a: 'It may be possible when the diagnosis, authority, safe access and suitable-part availability align. I confirm what can be established by phone, then agree the scope and price before work proceeds.' },
      { q: 'Should I change the locks when I move house?', a: 'Changing the external locks gives you control over the new key set when you cannot confirm how many old copies remain. The appropriate work depends on the existing door and lock type.' },
    ],
  },
  'upvc-lock-repair': {
    h1: 'uPVC Door Lock Repair & Replacement Coventry',
    intro: [
      "A stiff, sticky, or misaligned uPVC door lock is not just annoying — it can leave the door difficult to secure. I diagnose uPVC door lock repairs and replacements across Coventry and Warwickshire.",
      "I repair and replace uPVC door lock mechanisms, multipoint locks, euro cylinders, window locks, composite door locks, and door handles. A uPVC door lock replacement is proposed only when the diagnosis supports it and a compatible part is identified; I explain and quote the scope before fitting.",
      `uPVC lock repair starts from £${UPVC_REPAIR_PRICE}. No VAT. No call-out fee.`,
    ],
    steps: [
      "Call 024 7522 4730 and describe the problem with your uPVC door or window",
      "I inspect alignment, the cylinder, handles and multipoint mechanism to identify the fault",
      "I confirm the repair or replacement cost upfront",
      "I carry out the repair or fit the replacement part",
      "I test the lock and adjust the door alignment if needed",
      "I advise on maintaining your uPVC locks going forward",
    ],
    faqs: [
      { q: 'My uPVC door is stiff to lock — is that a broken lock?', a: 'Not necessarily. Possible causes include alignment, a cylinder or handle fault, or wear within the multipoint mechanism. I inspect the complete operating sequence before proposing an adjustment, repair or replacement.' },
      { q: 'Can you replace just the cylinder on a uPVC door?', a: 'Sometimes. A cylinder can be replaced separately when it is the failed or agreed component and the correct size is available. The rest of the multipoint system and door alignment are checked separately.' },
      { q: 'My uPVC door will not lock at all — is this urgent?', a: 'An entrance that cannot be secured needs prompt attention. Call with the full address and observable symptoms so I can confirm current availability, the ETA and the safe next step.' },
      { q: 'Do you repair window locks on uPVC windows?', a: 'Yes — I repair and replace espagnolette window locks and cockspur handles on uPVC and aluminium windows.' },
    ],
    howToName: 'How to Get a uPVC Lock Repaired in Coventry',
    benefits: [
      "Assessment of common uPVC multipoint systems using visible markings and measured component details",
      "Diagnose before quoting — I'll tell you if a repair is possible before recommending replacement",
      "Compatible cylinder and mechanism availability checked after identification",
      "Anti-snap cylinder options assessed where the door, fit and certification support one",
      "Door alignment checked as a separate possible cause",
    ],
    whyUs: "I inspect the cylinder, handles, alignment and multipoint mechanism before recommending work. I explain whether an adjustment, repair or replacement is supported by the diagnosis and confirm the price before starting.",
    scenarios: [
      { title: "Stiff or Sticky Lock", desc: "A key or handle is becoming harder to operate. Possible causes include alignment, cylinder, handle or mechanism faults, which need to be separated before parts are proposed." },
      { title: "Mechanism Failed", desc: "The gearbox or another multipoint component may have failed. Faceplate markings, measurements and the complete mechanism determine whether a compatible repair part is available." },
      { title: "Euro Cylinder Damaged", desc: "A cylinder has failed or shows attack damage. I assess the full door and compatible size before comparing an independently certified replacement; no cylinder can guarantee that a future attack will fail." },
    ],
    priceDetails: SERVICE_PRICE_DETAILS['upvc-lock-repair'],
    directAnswer: {
      question: 'How much does a uPVC door lock repair cost?',
      answer: `A uPVC door lock repair costs from £${UPVC_REPAIR_PRICE} for the stated repair scope and from £${UPVC_GEARBOX_PRICE} for a compatible multipoint gearbox replacement. The price includes the stated parts and labour with no VAT or separate call-out fee; timing depends on diagnosis and parts.`,
    },
    voiceFaqs: [
      { q: 'Why is my uPVC door stiff to lock?', a: 'Possible causes include alignment, hinge movement, the cylinder, handles or the multipoint mechanism. Test whether the symptom changes with the door open, stop forcing it, and have the complete entrance diagnosed before replacing parts.' },
      { q: 'What is an anti-snap cylinder and do I need one?', a: 'An anti-snap cylinder is designed and tested to resist specified cylinder attacks. Whether one is suitable depends on the door, cylinder size, surrounding furniture, current certification and any exact written requirement.' },
      { q: 'How long does a uPVC door lock last?', a: 'There is no reliable lifespan from the area or door label alone. Use, alignment, installation, maintenance, weather exposure and the particular mechanism all matter; stiffness or changed operation should be diagnosed before failure.' },
    ],
  },
  'boarding-up': {
    h1: 'Emergency Boarding Up & Burglary Repairs Coventry',
    intro: [
      "After a break-in, storm damage, or accidental breakage, a damaged door, lock, or window may need temporary securing. I provide 24/7 boarding and burglary-related lock assessment across the listed coverage locations.",
      "I board damaged openings and can replace compromised residential locks on the same visit when the suitable part is available. Permanent glazing, joinery, or structural repairs remain separate work, and I explain the temporary security scope before starting.",
      `Emergency boarding up starts from £${BOARDING_PRICE}. No VAT. No call-out fee.`,
    ],
    steps: [
      "Prioritise safety and follow police instructions before repair work begins",
      "I confirm the current ETA from my actual starting point and the full address",
      "I assess the damage and explain a suitable temporary boarding scope",
      "I fit the agreed boarding material using the inspected safe fixing points",
      "I advise on next steps for permanent repair and improved security",
    ],
    faqs: [
      { q: 'Should I call the police before calling a locksmith after a break-in?', a: 'Call 999 if an offender may still be present or anyone is in immediate danger. Otherwise follow the police reporting route and instructions for the scene, then ask your insurer what evidence its written terms require before repair work.' },
      { q: 'How long will boarding hold before I need a permanent repair?', a: 'Boarding is temporary security, not a permanent glazing, joinery or structural repair. Its suitable duration depends on the opening, fixing points, material, exposure and any insurer or property-manager requirement.' },
      { q: 'Can you change the locks after boarding up?', a: 'A compromised residential lock may be replaceable during the attendance when the correct part and authority are available. I confirm the temporary-security scope and any separate follow-on work first.' },
      { q: 'Do you board commercial openings?', a: 'Call with the exact premises, opening, dimensions and authority details. Safe fixing points, access and the inspected damage determine whether temporary boarding can be agreed.' },
    ],
    howToName: 'How to Get Emergency Boarding Up in Coventry',
    benefits: [
      "Available 24/7 — current ETA confirmed by phone",
      "Boarding method selected from the opening and safe fixing points",
      "Compromised locks assessed separately from the temporary board",
      "I'll advise on next steps for permanent repair",
      "Photographs and an itemised record of the agreed temporary work",
    ],
    whyUs: "After damage, I separate evidence preservation, immediate temporary security and permanent repair. I explain the proposed board, fixing points, limitations and current ETA before attendance, without presenting boarding as permanent glazing or joinery.",
    scenarios: [
      { title: "Break-In Damage", desc: "A door or window has been damaged during a burglary. After police evidence instructions are satisfied, I assess temporary boarding and any compromised lock as separate work." },
      { title: "Storm Damage", desc: "A window has blown in or a door has been damaged by high winds. The opening and safe fixing points are assessed before temporary work is agreed." },
      { title: "Accidental Breakage", desc: "A glass door or window is broken accidentally. Temporary boarding may reduce immediate access and exposure while glazing repair is arranged." },
    ],
    priceDetails: SERVICE_PRICE_DETAILS['boarding-up'],
    directAnswer: {
      question: 'How much does emergency boarding up cost in Coventry?',
      answer: `Temporary boarding in Coventry starts from £${BOARDING_PRICE} for one assessed damaged opening. The service is available 24 hours a day. A compromised residential lock may also be replaceable when authority, safe access and a compatible part are available. No VAT is charged.`,
    },
    voiceFaqs: [
      { q: 'Should I call the police before calling a locksmith after a break-in?', a: 'Call 999 if an offender may still be present or anyone is in immediate danger. Otherwise use the police reporting route and follow scene-preservation instructions. Ask your insurer separately what evidence its current written terms require.' },
      { q: 'How long will boarding hold before I need a permanent repair?', a: 'Boarding is a temporary way to secure a damaged opening while permanent glazing or joinery is arranged. The appropriate duration depends on the opening, material, weather exposure, and insurer requirements.' },
      { q: 'Can you change the locks after boarding up?', a: 'A compromised residential lock may be replaceable during the attendance when the correct part and authority are available. The board, lock work and any permanent repair are scoped separately.' },
    ],
  },
  'lock-upgrade': {
    h1: 'Anti-Snap Locks & BS3621 Lock Upgrades Coventry',
    intro: [
      "Anti-snap cylinders and BS3621-marked locks address different products and tested requirements. If you are following written policy wording, improving resistance to a specified attack method, or replacing a faulty lock, I assess the actual door and explain compatible options.",
      "I assess anti-snap euro cylinders, BS3621-marked mortice deadlocks and other independently certified options against the actual entrance, measurements and required function.",
      `Lock upgrade prices start from £${ANTI_SNAP_PRICE} for an anti-snap euro cylinder, including the stated lock and fitting. No VAT. No separate call-out fee.`,
    ],
    steps: [
      "Call 024 7522 4730 and describe the entrance and security objective",
      "I visit and assess your current locks and door security",
      "I compare suitable options with your door, budget and any exact written policy requirement",
      "I confirm the full price before any work starts",
      "I fit and test the new locks",
      "I record the visible product marking and agreed fitting scope; your insurer decides whether it meets the policy",
    ],
    faqs: [
      { q: 'What lock does my home insurance require?', a: 'Requirements vary by policy and door. Check the security section of your own policy or ask the insurer to confirm the standard in writing before choosing an upgrade.' },
      { q: 'What is a Secured by Design cylinder?', a: 'Secured by Design is a police security initiative with an accredited-product scheme. When comparing a cylinder, check its current product listing, independent certification, star rating, and correct fit for the door.' },
      { q: 'Is a lock upgrade worth it?', a: 'A correctly fitted, independently certified lock can improve resistance to recognised attack methods. It does not eliminate burglary risk or guarantee insurance cover, so the choice should match the door and any written policy requirement.' },
      { q: 'Can you assess more than one entrance?', a: 'The booked upgrade includes assessment of the affected entrance. If you want other doors or windows reviewed, identify them when booking so the additional scope and any price can be agreed first.' },
    ],
    howToName: 'How to Upgrade Your Home Security Locks in Coventry',
    benefits: [
      "Affected entrance assessed before an upgrade is specified",
      "Current certification and compatible product availability checked",
      "An itemised record of the visible product marking and agreed fitting scope",
      "One-visit completion where the diagnosis, authority and suitable parts allow",
      "Honest advice — I'll tell you what you need and what you don't",
    ],
    whyUs: "I assess the existing door and lock, explain the relevant certified options, and fit only the agreed upgrade. For insurance requirements, I recommend checking the exact policy wording rather than assuming one standard applies to every home.",
    scenarios: [
      { title: "Written Policy Requirement", desc: "Your policy names a lock standard. I identify the existing marking, assess the door, and document an agreed certified option; the insurer confirms whether it satisfies the policy." },
      { title: "Post-Burglary Review", desc: "After a break-in, you want damaged or unsuitable locks assessed and replaced with correctly fitted, independently certified options." },
      { title: "General Security Improvement", desc: "You want the inspected entrance reviewed against a clear objective. I record what is fitted and explain compatible, independently certified options." },
    ],
    priceDetails: SERVICE_PRICE_DETAILS['lock-upgrade'],
    directAnswer: {
      question: 'How much does a lock upgrade cost in Coventry?',
      answer: `A lock upgrade in Coventry costs from £${BS3621_PRICE} for a BS3621-rated mortice deadlock or from £${ANTI_SNAP_PRICE} for an anti-snap euro cylinder. The price includes the stated lock and fitting scope. Check any insurance requirement in your own policy before choosing a standard.`,
    },
    voiceFaqs: [
      { q: 'What is the difference between a Yale lock and a deadlock?', a: '“Yale lock” is commonly used for a nightlatch, while a mortice deadlock uses a bolt operated by a key. The suitable arrangement depends on the actual door, escape needs and any exact written requirement.' },
      { q: 'Is a lock upgrade worth the money?', a: 'A correctly fitted, independently certified lock can improve resistance to recognised attack methods. It cannot eliminate risk or guarantee insurance cover, so check the door and your own policy requirements first.' },
      { q: 'Can you assess more than one entrance?', a: 'Identify every door or window you want reviewed when booking. The scope, authority, time and any price for additional openings must be agreed rather than assumed from one lock-upgrade attendance.' },
    ],
  },
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  const content = SERVICE_CONTENT[slug]
  if (!content) notFound()

  const evidenceSourceIds = SERVICE_SOURCE_IDS[slug]
  if (!evidenceSourceIds) throw new Error(`Missing service evidence map for ${slug}`)
  const evidenceSources = evidenceSourceIds.map(sourceId => getTechnicalEvidenceSource(sourceId))

  /* ---- Schema markup ---- */

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_CONFIG.domain },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_CONFIG.domain}/services` },
      { '@type': 'ListItem', position: 3, name: service.shortName, item: `${SITE_CONFIG.domain}/services/${slug}` },
    ],
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_CONFIG.domain}/services/${slug}#service`,
    url: `${SITE_CONFIG.domain}/services/${slug}`,
    name: service.name,
    description: service.description,
    serviceType: service.shortName,
    provider: SERVICE_PROVIDER_SCHEMA,
    areaServed: AREA_SERVED_SCHEMA,
    offers: {
      '@type': 'Offer',
      url: `${SITE_CONFIG.domain}/services/${slug}`,
      priceSpecification: {
        '@type': 'PriceSpecification',
        minPrice: service.priceFrom.toString(),
        priceCurrency: 'GBP',
        valueAddedTaxIncluded: false,
        description: 'Advertised starting price; the final price depends on the diagnosed scope and agreed parts.',
      },
    },
  }

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_CONFIG.domain}/services/${slug}#webpage`,
    url: `${SITE_CONFIG.domain}/services/${slug}`,
    name: service.metaTitle,
    description: service.metaDescription,
    dateModified: SERVICE_GUIDES_REVIEWED_ON,
    author: LOCKSMITH_AUTHOR_SCHEMA,
    publisher: { '@id': `${SITE_CONFIG.domain}/#business` },
    mainEntity: { '@id': `${SITE_CONFIG.domain}/services/${slug}#service` },
    citation: evidenceSources.map(source => source.url),
  }

  // Only add voice-search questions that cover a distinct intent. The source
  // arrays contain semantic variants, so exact-string deduplication is unsafe.
  const distinctVoiceFaqIndexes: Record<string, number[]> = {
    'emergency-lockout': [0],
    'lock-change': [1, 2],
    'upvc-lock-repair': [1, 2],
    'boarding-up': [],
    'lock-upgrade': [0],
  }
  const allFaqs = [
    ...(distinctVoiceFaqIndexes[slug] ?? []).map(index => content.voiceFaqs[index]),
    ...content.faqs,
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  /* ---- Data ---- */

  const areasByRegion = getAllAreasByRegion()

  const relatedPosts = (SERVICE_GUIDE_SLUGS[slug] ?? [])
    .map((s) => getBlogPostBySlug(s))
    .filter((p): p is NonNullable<typeof p> => p != null)

  const otherServices = SERVICES.filter((s) => s.slug !== slug)

  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} />
      <SchemaMarkup schema={serviceSchema} />
      <SchemaMarkup schema={webPageSchema} />
      <SchemaMarkup schema={faqSchema} />

      {/* ============================================================ */}
      {/*  1. Breadcrumb                                                */}
      {/* ============================================================ */}
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 py-3 text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-0">
          <li>
            <Link href="/" prefetch={false} className="hover:text-[#8A5A00] transition-colors"><span>Home</span></Link>
          </li>
          <li className="mx-2 text-gray-300" aria-hidden="true" role="presentation">›</li>
          <li>
            <Link href="/services" prefetch={false} className="hover:text-[#8A5A00] transition-colors"><span>Services</span></Link>
          </li>
          <li className="mx-2 text-gray-300" aria-hidden="true" role="presentation">›</li>
          <li>
            <span><span className="text-[#0F1B2D] font-semibold">{service.shortName}</span></span>
          </li>
        </ol>
      </nav>

      {/* ============================================================ */}
      {/*  2. Hero                                                      */}
      {/* ============================================================ */}
      <HeroSection
        heading={content.h1}
        subheading={`${service.description} Call now for a price — no VAT, no call-out fee.`}
        compact
      />

      {/* ============================================================ */}
      {/*  2b. Direct Answer (AI/voice optimization)                    */}
      {/* ============================================================ */}
      {content?.directAnswer && (
        <section className="py-6 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <DirectAnswer question={content.directAnswer.question} answer={content.directAnswer.answer} />
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/*  3. Quick price + trust bar                                   */}
      {/* ============================================================ */}
      <section className="bg-[#0F1B2D] border-t-4 border-[#FFB800]">
        <div className="max-w-5xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm md:text-base text-white font-medium">
            <span className="text-[#FFB800] font-black text-lg md:text-xl">
              From &pound;{service.priceFrom}
            </span>
            <span className="hidden md:inline text-gray-500">|</span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-[#FFB800]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              No VAT
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-[#FFB800]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              No Call-Out Fee
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-[#FFB800]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              No Time-of-Day Surcharge
            </span>
          </div>
          <a
            href={`tel:${SITE_CONFIG.phoneTel}`}
            className="inline-flex items-center gap-2 bg-[#FFB800] hover:bg-[#FFC933] text-[#0F1B2D] px-6 py-3 rounded-xl font-black text-lg transition-all duration-200 shadow-[0_2px_12px_rgba(255,184,0,0.3)] hover:shadow-[0_4px_20px_rgba(255,184,0,0.5)] hover:scale-[1.02] whitespace-nowrap"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
            {SITE_CONFIG.phone}
          </a>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  4. Main intro content                                        */}
      {/* ============================================================ */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-[#0F1B2D] mb-8">
            {service.shortName} in Coventry &mdash; From &pound;{service.priceFrom}
          </h2>

          {/* First paragraph with amber left border */}
          <div className="border-l-4 border-[#FFB800] pl-6 mb-6">
            <p className="text-gray-700 text-lg leading-relaxed">
              {content.intro[0]}
            </p>
          </div>

          {/* Remaining paragraphs */}
          {content.intro.slice(1).map((para, i) => (
            <p key={i} className="text-gray-600 leading-relaxed mb-5 text-base">
              {para}
            </p>
          ))}

          {slug === 'lock-change' && (
            <div className="mb-6 rounded-xl border border-[#FFB800]/40 bg-[#FFF9E8] p-5 text-gray-700">
              Looking specifically for a BS3621, TS007, or anti-snap security improvement? See the{' '}
              <Link href="/services/lock-upgrade" className="font-bold text-[#0F1B2D] underline decoration-[#FFB800] underline-offset-4">
                Coventry lock upgrade service
              </Link>
              . This page is focused on repairing and replacing faulty or unwanted locks.
            </div>
          )}

          <LastUpdated date={SERVICE_GUIDES_REVIEWED_ON} />
        </div>
      </section>

      {/* ============================================================ */}
      {/*  5. Common Scenarios                                          */}
      {/* ============================================================ */}
      <section className="py-14 px-4 bg-[#F7F7F5]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-[#0F1B2D] mb-3 text-center">
            When Do You Need This Service?
          </h2>
          <p className="text-gray-500 text-center mb-10 max-w-xl mx-auto">
            These are situations covered by my {service.shortName.toLowerCase()} service.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.scenarios.map((scenario, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border-l-4 border-[#0F1B2D] shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[#FFB800]/10 text-[#8A5A00] font-black text-sm flex items-center justify-center">
                    {i + 1}
                  </span>
                  <h3 className="font-bold text-[#0F1B2D] text-lg leading-tight">
                    {scenario.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {scenario.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  6. What Happens When You Call — vertical timeline             */}
      {/* ============================================================ */}
      <section className="py-16 px-4 bg-gradient-to-br from-[#0A1628] via-[#0F1B2D] to-[#162438]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3 text-center">
            What Happens When You Call
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-lg mx-auto">
            From phone call to job done — here is exactly how it works.
          </p>

          <div className="relative">
            {/* Vertical dotted line */}
            <div className="absolute left-6 top-6 bottom-6 w-px border-l-2 border-dashed border-[#FFB800]/30" />

            <ol className="space-y-8">
              {content.steps.map((step, i) => (
                <li key={i} className="relative flex gap-5 items-start">
                  {/* Numbered amber circle */}
                  <span className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-[#FFB800] text-[#0F1B2D] font-black text-lg flex items-center justify-center shadow-[0_0_20px_rgba(255,184,0,0.25)]">
                    {i + 1}
                  </span>
                  {/* Step text */}
                  <span className="text-gray-200 pt-3 text-base leading-relaxed">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  7. Detailed pricing                                          */}
      {/* ============================================================ */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-[#0F1B2D] mb-3 text-center">
            {service.shortName} Prices
          </h2>
          <p className="text-gray-500 text-center mb-8">
            Published from-prices include the stated labour scope. Quote-only work is itemised after inspection. No VAT or separate call-out fee.
          </p>

          {/* Price card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            {content.priceDetails.map((item, i) => (
              <div
                key={i}
                className={`flex flex-col items-start gap-1 px-6 py-4 sm:flex-row sm:items-center sm:justify-between ${i < content.priceDetails.length - 1 ? 'border-b border-gray-100' : ''}`}
              >
                <span className="text-[#0F1B2D] font-medium">{item.item}</span>
                <span className="text-[#8A5A00] font-black text-sm sm:text-lg sm:whitespace-nowrap sm:ml-4">{servicePriceLabel(item)}</span>
              </div>
            ))}

            {/* Footer */}
            <div className="bg-[#F7F7F5] px-6 py-4 border-t border-gray-200">
              <p className="text-gray-500 text-sm text-center">
                I confirm the price basis before travelling. If inspection reveals a different scope,
                I explain and agree any revised price before additional work proceeds.
              </p>
            </div>
          </div>

          <p className="text-center mt-4">
            <Link href="/prices" className="text-sm font-bold text-[#0F1B2D] underline decoration-[#FFB800] underline-offset-4 hover:text-[#8A5A00]">
              View the full published price catalogue
            </Link>
          </p>

          {/* CTA */}
          <div className="text-center mt-8">
            <a
              href={`tel:${SITE_CONFIG.phoneTel}`}
              className="inline-flex items-center gap-3 bg-[#FFB800] hover:bg-[#FFC933] text-[#0F1B2D] px-10 py-5 rounded-2xl font-black text-xl transition-all duration-200 shadow-[0_4px_24px_rgba(255,184,0,0.3)] hover:shadow-[0_4px_32px_rgba(255,184,0,0.5)] hover:scale-[1.02]"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
              Get a Price Now
            </a>
            <p className="text-gray-600 text-sm mt-3">
              Call <strong>{SITE_CONFIG.phone}</strong> &mdash; I answer 24/7
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  8. Why Choose Us — testimonial + benefits                    */}
      {/* ============================================================ */}
      <section className="py-14 px-4 bg-[#F7F7F5]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-[#0F1B2D] mb-10 text-center">
            Why Choose Me For {service.shortName}?
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

            {/* Why-us card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 relative">
              <div className="absolute -top-4 left-8 w-10 h-10 bg-[#FFB800] rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-[#0F1B2D]" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11h4v10H0z" /></svg>
              </div>

              <p className="text-gray-600 leading-relaxed mt-2">
                {content.whyUs}
              </p>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <Link
                  href="/testimonials"
                  className="text-[#0F1B2D] font-bold text-sm hover:text-[#8A5A00] transition-colors"
                >
                  Read customer reviews &rarr;
                </Link>
              </div>
            </div>

            {/* Benefits list */}
            <div className="space-y-4">
              {content.benefits.map((benefit, i) => (
                <div key={i} className="flex gap-4 items-start bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                  <span className="flex-shrink-0 mt-0.5 w-7 h-7 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-[#0F1B2D] font-medium leading-snug">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  9. Areas covered                                             */}
      {/* ============================================================ */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-[#0F1B2D] mb-3 text-center">
            {service.shortName} Areas Covered
          </h2>
          <p className="text-gray-500 text-center mb-8 max-w-lg mx-auto">
            I serve the locations in the published area directory. Call with the full address to confirm coverage and the current ETA.
          </p>

          {/* One canonical owner per area. The seven towns with dedicated
              service pages link there; every other intent stays on its area hub. */}
          <div className="space-y-6">
            {Object.entries(areasByRegion).map(([region, areas]) => (
              <div key={region}>
                <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wide mb-3">{region}</h3>
                <div className="flex flex-wrap gap-2">
                  {areas.map((area) => (
                    <Link
                      key={area.slug}
                      href={hasTownService(area.slug, slug) ? `/areas/${area.slug}/${slug}` : `/areas/${area.slug}#${slug}`}
                      prefetch={false}
                      className="text-sm text-gray-600 hover:text-[#0F1B2D] bg-white hover:bg-white px-3 py-1.5 rounded-lg border border-gray-200 hover:border-[#FFB800] transition-all duration-200"
                    >
                      {service.shortName} in {area.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  10. Related blog posts                                       */}
      {/* ============================================================ */}
      {relatedPosts.length > 0 && (
        <section className="py-14 px-4 bg-[#F7F7F5]">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black text-[#0F1B2D] mb-3 text-center">
              Learn More About {service.shortName}
            </h2>
            <p className="text-gray-500 text-center mb-10 max-w-lg mx-auto">
              Helpful guides and advice related to this service.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl border border-gray-200 hover:border-[#FFB800] p-6 transition-all duration-200 hover:shadow-md flex flex-col"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold text-[#8A5A00] bg-[#FFB800]/10 px-2.5 py-1 rounded-full">
                      {post.pillar}
                    </span>
                    <span className="text-xs text-gray-600">{post.readTime}</span>
                  </div>
                  <h3 className="font-bold text-[#0F1B2D] group-hover:text-[#8A5A00] transition-colors leading-snug mb-3 flex-1">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                  <span className="mt-4 text-sm font-bold text-[#0F1B2D] group-hover:text-[#8A5A00] transition-colors inline-flex items-center gap-1">
                    Read article
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/*  11. FAQ section                                              */}
      {/* ============================================================ */}
      <FAQSection
        faqs={allFaqs}
        heading={`Frequently Asked Questions — ${service.shortName}`}
        footer={(
          <div className="text-center">
            <Link
              href="/faq#services"
              prefetch={false}
              className="font-bold text-[#0F1B2D] underline decoration-[#FFB800] underline-offset-4 hover:text-[#8A5A00]"
            >
              Read all locksmith service FAQs
            </Link>
          </div>
        )}
      />

      {/* ============================================================ */}
      {/*  Technical evidence and author identity                       */}
      {/* ============================================================ */}
      <section
        className="py-14 px-4 bg-[#F7F7F5]"
        aria-labelledby="service-source-heading"
        data-source-register-scope="technical-only"
        data-evidence-source-ids={evidenceSourceIds.join(' ')}
      >
        <div className="max-w-3xl mx-auto">
          <h2 id="service-source-heading" className="text-2xl md:text-3xl font-black text-[#0F1B2D] mb-4">
            Technical Sources and Review Notes
          </h2>
          <p className="text-gray-700 leading-relaxed">
            These primary references support the limited technical points stated in each record below.
            They do not verify my prices, availability, job history, response times, or the condition of
            a lock or door at an individual address. Published business terms are kept separately on the{' '}
            <Link href="/terms" prefetch={false} className="font-bold text-[#0F1B2D] underline decoration-[#FFB800] underline-offset-4">
              terms page
            </Link>
            .
          </p>
          <ContentAuthorNote reviewedOn={SERVICE_GUIDES_REVIEWED_ON} label={`${service.shortName} guide`} />
          <ul className="space-y-4 mt-6">
            {evidenceSources.map(source => (
              <li
                id={`evidence-source-${source.id}`}
                key={source.id}
                data-source-kind="technical"
                className="scroll-mt-28 rounded-xl border border-gray-200 bg-white p-5"
              >
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#0F1B2D] underline decoration-[#FFB800] underline-offset-4 hover:text-[#8A5A00]"
                >
                  {source.title}
                </a>
                <p className="text-sm text-gray-600 mt-1">{source.publisher}</p>
                <p className="text-sm text-gray-700 mt-2">{source.supports}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Source checked <time dateTime={source.checkedOn}>{source.checkedOn}</time>.
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  12. Other services                                           */}
      {/* ============================================================ */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-[#0F1B2D] mb-3 text-center">
            Other Locksmith Services
          </h2>
          <p className="text-gray-500 text-center mb-8 max-w-lg mx-auto">
            I offer the five published locksmith services across the listed coverage locations.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group bg-white border border-gray-200 hover:border-[#FFB800] rounded-2xl p-5 transition-all duration-200 hover:shadow-md flex gap-4 items-start"
              >
                {/* Icon */}
                <span className="flex-shrink-0 w-12 h-12 bg-[#0F1B2D] rounded-xl flex items-center justify-center group-hover:bg-[#162438] transition-colors">
                  <ServiceIcon slug={s.slug} className="w-6 h-6 text-[#FFB800]" />
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-bold text-[#0F1B2D] group-hover:text-[#8A5A00] transition-colors text-base leading-tight">
                      {s.shortName}
                    </h3>
                    <div className="text-right flex-shrink-0">
                      <span className="text-[#8A5A00] font-black text-lg">
                        &pound;{s.priceFrom}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mt-1 leading-relaxed line-clamp-2">
                    {s.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-gray-600">No VAT</span>
                    <span className="text-gray-300">&bull;</span>
                    <span className="text-xs text-gray-600">No call-out fee</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  13. CTA Block                                                */}
      {/* ============================================================ */}
      <CTABlock
        heading={`Need ${service.shortName.toLowerCase()} help? Call me now.`}
        subtext={`I'm available 24/7, 365 days a year. ${service.shortName} from £${service.priceFrom}. No VAT or separate call-out fee. I confirm the price basis first and agree any scope change before work proceeds.`}
      />
    </>
  )
}
