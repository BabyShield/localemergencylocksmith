import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SERVICES, getServiceBySlug } from '@/data/services'
import { AREAS, getAllAreasByRegion } from '@/data/areas'
import { SITE_CONFIG } from '@/data/config'
import { ALL_BLOG_POSTS, getBlogPostBySlug } from '@/data/blog-posts'
import HeroSection from '@/components/HeroSection'
import CTABlock from '@/components/CTABlock'
import FAQSection from '@/components/FAQSection'
import SchemaMarkup from '@/components/SchemaMarkup'
import DirectAnswer from '@/components/DirectAnswer'
import LastUpdated from '@/components/LastUpdated'

export const dynamic = 'force-static'
export const revalidate = false

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
    keywords: [...service.keywords, `locksmith coventry ${service.shortName.toLowerCase()}`, `emergency ${service.shortName.toLowerCase()} coventry`, `${service.shortName.toLowerCase()} near me`].join(', '),
    alternates: {
      canonical: `${SITE_CONFIG.domain}/services/${slug}`,
    },
    openGraph: {
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
  relatedSlugs: string[]
  priceDetails: { item: string; price: string }[]
  testimonial: { text: string; name: string; area: string }
  directAnswer: { question: string; answer: string }
  voiceFaqs: { q: string; a: string }[]
}> = {
  'emergency-lockout': {
    h1: 'Emergency Locksmith Coventry — Locked Out?',
    intro: [
      "Being locked out of your home is stressful — especially late at night or in bad weather. I provide fast, professional emergency lockout services across Coventry and Warwickshire, available 24 hours a day, 7 days a week, 365 days a year.",
      "When you call me, I'll ask you for your address and a brief description of your door and lock type. I'll give you an honest price upfront — from £59 — and an honest arrival time. No call-out fee. No VAT.",
      "In most cases I can open your door using non-destructive entry techniques, meaning your lock and door frame stay intact. Where a lock does need replacing, I'll explain why and give you a quote before I do anything.",
    ],
    steps: [
      "Call 07735 336175 — I answer 24/7",
      "Tell me your location and a brief description of your door",
      "I confirm the price upfront — from £59, no VAT",
      "I arrive within 15-30 minutes",
      "I open your door using non-destructive entry where possible",
      "I advise whether your lock needs replacing and give you an honest quote",
    ],
    faqs: [
      { q: 'Can you open any type of lock?', a: 'I can open the vast majority of residential locks including Yale cylinder locks, mortice deadlocks, uPVC multipoint locks, and composite door cylinders. Occasionally a very unusual or high-security lock requires specialist techniques — I will always tell you honestly if I encounter one.' },
      { q: 'Will you damage my door or lock?', a: 'My first approach is always non-destructive entry. In most cases I can open a standard residential lock without any damage to the door or frame. If a lock needs to be drilled as a last resort, I will tell you before I do it and give you the cost to replace it.' },
      { q: 'Do you charge more for late night callouts?', a: 'No — the price is the same at 3am as it is at 3pm. From £59 for a standard lockout, no VAT, no call-out fee, and no premium for unsociable hours.' },
      { q: 'How long does it take to open a locked door?', a: 'In most cases 5-15 minutes once I arrive. Some trickier locks or unusual door types can take longer — I will always give you a realistic estimate before I start.' },
    ],
    howToName: 'How to Get an Emergency Locksmith in Coventry',
    benefits: [
      "Non-destructive entry — your lock and door stay intact where possible",
      "Same price 24/7 — no night premium, no weekend surcharge",
      "I arrive in 15-30 minutes across most of Coventry",
      "Price confirmed on the phone before I set off",
      "Fully insured with public liability cover",
    ],
    whyUs: "When you're locked out at midnight, you need someone you can trust — not a call centre dispatching the nearest available stranger. I'm Ross, your local Coventry locksmith. When you call, you speak to me. I give you a firm price and an honest arrival time. No games, no surprises.",
    scenarios: [
      { title: "Locked Out Late at Night", desc: "It's 2am and your keys are on the kitchen table. I'll be there within 30 minutes and open your door without damage." },
      { title: "Keys Lost or Stolen", desc: "Can't find your keys and worried about security? I'll get you in and replace the lock on the same visit." },
      { title: "Door Slammed Shut", desc: "A gust of wind or force of habit — Yale latches lock automatically. I'll open it quickly and advise on a deadlock to prevent it happening again." },
    ],
    relatedSlugs: ["locked-out-late-night-coventry", "how-emergency-locksmith-callouts-work", "can-fire-brigade-police-help-locked-out"],
    priceDetails: [
      { item: "Standard lockout (Yale/cylinder)", price: "From £59" },
      { item: "Multipoint lock lockout (uPVC)", price: "From £69" },
      { item: "High-security lock lockout", price: "From £79" },
      { item: "Lock replacement after entry (if needed)", price: "From £69" },
    ],
    testimonial: { text: "Locked out at 11pm — Ross arrived within 20 minutes, had me back in within 10. No VAT, exact price quoted on the phone. Brilliant.", name: "Sarah T.", area: "Earlsdon" },
    directAnswer: {
      question: 'How much does an emergency locksmith cost in Coventry?',
      answer: 'An emergency locksmith in Coventry costs from £59 for a standard lockout. This price includes labour, with no VAT and no call-out fee. Response time is typically 15 to 30 minutes. No extra charge applies for evenings, weekends, or bank holidays.',
    },
    voiceFaqs: [
      { q: 'How quickly can a locksmith get to me in Coventry?', a: 'A local locksmith in Coventry can typically reach you within fifteen to thirty minutes. I cover the entire Coventry area and respond the same speed whether it is two in the afternoon or two in the morning.' },
      { q: 'Will a locksmith damage my door when opening it?', a: 'No. A professional locksmith uses non-destructive entry techniques to open most standard residential locks. Your door and lock stay intact. If a lock does need replacing, the locksmith will explain why and quote you before starting.' },
      { q: 'Is it more expensive to call a locksmith at night?', a: 'Not with a local independent locksmith. I charge the same price twenty-four hours a day, seven days a week, including bank holidays. National companies often add a night premium of fifty to one hundred pounds.' },
    ],
  },
  'lock-change': {
    h1: 'Lock Change Coventry — Same Day Service',
    intro: [
      "Whether you've moved into a new property, lost a key, had a break-in, or simply want to upgrade your security, I supply and fit replacement locks across Coventry and Warwickshire the same day you call.",
      "I carry a full range of lock types including British Standard BS3621 five-lever mortice deadlocks, high-security cylinder locks, anti-snap cylinders, and Yale nightlatches. If your insurance requires a specific lock type, I'll make sure you get the right one.",
      "Lock change prices start from £69 including the new lock and all labour. No VAT. No call-out fee.",
    ],
    steps: [
      "Call 07735 336175 and describe your current door and lock",
      "I recommend the right lock for your door type and insurance requirements",
      "I confirm the full price including the lock and fitting",
      "I arrive and remove the old lock",
      "I fit and test the new lock and provide you with the new keys",
      "I advise on any other security improvements if relevant",
    ],
    faqs: [
      { q: 'What is a BS3621 lock and do I need one?', a: 'BS3621 is the British Standard for deadlocks — it is the minimum lock standard required by most UK home insurance policies for front doors. If your policy specifies a BS3621 lock, or a five-lever mortice, and you don\'t have one, your insurance could be invalidated after a break-in. I can check and advise.' },
      { q: 'How long does a lock change take?', a: 'A standard lock change typically takes 30-60 minutes. Fitting a new mortice lock into a door that previously only had a cylinder lock takes longer as it requires drilling a new mortice pocket.' },
      { q: 'What is an anti-snap cylinder?', a: 'Anti-snap cylinders are designed to resist snap attacks — a common burglary technique where the visible part of a euro cylinder is snapped off with brute force to expose the mechanism. I recommend anti-snap cylinders for all uPVC and composite doors.' },
      { q: 'Can I choose the brand of lock?', a: 'Yes — I carry and can order locks from all major UK brands including Yale, Union, Mul-T-Lock, ERA, and Avocet. I\'ll advise you on the best option for your security needs and budget.' },
    ],
    howToName: 'How to Get a Lock Changed in Coventry',
    benefits: [
      "All major lock brands carried in the van — fitted same day",
      "BS3621 insurance-approved locks always available",
      "Old lock safely removed and disposed of",
      "New keys provided and tested before I leave",
      "Written confirmation of lock standard for your insurer",
    ],
    whyUs: "I carry a full range of locks in my van — Yale, Union, ERA, Avocet, Mul-T-Lock, and more. That means same-day fitting, not a return visit. I'll also check your insurance requirements and make sure the new lock meets the standard.",
    scenarios: [
      { title: "Moving Into a New Home", desc: "You don't know who has a copy of the existing keys. I'll change all external locks on the day you move in." },
      { title: "After a Break-In", desc: "Your existing locks are compromised. I'll replace them with insurance-approved BS3621 locks and upgrade your security." },
      { title: "Insurance Compliance", desc: "Your insurer requires BS3621 locks but yours don't meet the standard. I'll upgrade them and provide documentation." },
    ],
    relatedSlugs: ["lock-change-costs-by-type", "yale-vs-mortice-deadlock", "five-lever-mortice-deadlock-guide"],
    priceDetails: [
      { item: "Yale nightlatch change", price: "From £69" },
      { item: "Euro cylinder replacement", price: "From £59" },
      { item: "BS3621 mortice deadlock", price: "From £79" },
      { item: "Anti-snap cylinder upgrade", price: "From £59" },
    ],
    testimonial: { text: "Used twice now for lock changes after moving house. Fast, professional, and so much cheaper than the big national companies.", name: "Mark R.", area: "Leamington Spa" },
    directAnswer: {
      question: 'How much does it cost to change a lock in Coventry?',
      answer: 'A lock change in Coventry costs from £69 for a standard Yale or cylinder lock, including the new lock and fitting. A BS3621 insurance-approved deadlock costs from £79 fitted. No VAT is charged and there is no call-out fee.',
    },
    voiceFaqs: [
      { q: 'What type of lock does my home insurance require?', a: 'Most UK home insurance policies require a five-lever mortice deadlock to British Standard BS3621 on all final exit doors. If your front door only has a Yale nightlatch, it likely does not meet the insurance requirement.' },
      { q: 'Can a locksmith change my locks on the same day?', a: 'Yes. A local locksmith carries common lock types in the van and can change most locks on the same day you call. I carry Yale, Union, ERA, Avocet, and Mul-T-Lock brands.' },
      { q: 'Should I change the locks when I move house?', a: 'Yes. You have no way of knowing how many copies of the existing keys are in circulation. Previous owners, estate agents, cleaners, and builders may all have copies. Changing the locks on moving day is strongly recommended.' },
    ],
  },
  'upvc-lock-repair': {
    h1: 'uPVC Door Lock Repair Coventry — Fast & Affordable',
    intro: [
      "uPVC door and window locks are the most common lock type in UK homes built since the 1990s, and they are also the most common source of repair calls I receive. A stiff, sticky, or misaligned uPVC lock is not just annoying — it is a security risk.",
      "I repair and replace uPVC door multipoint locking mechanisms, euro cylinders, window espagnolette locks, and door handles across Coventry and Warwickshire. In most cases I can repair the existing lock; where replacement is necessary I carry the most common lock types in my van.",
      "uPVC lock repair starts from £59. No VAT. No call-out fee.",
    ],
    steps: [
      "Call 07735 336175 and describe the problem with your uPVC door or window",
      "I diagnose the issue — usually a worn mechanism, misaligned door, or failed cylinder",
      "I confirm the repair or replacement cost upfront",
      "I carry out the repair or fit the replacement part",
      "I test the lock and adjust the door alignment if needed",
      "I advise on maintaining your uPVC locks going forward",
    ],
    faqs: [
      { q: 'My uPVC door is stiff to lock — is that a broken lock?', a: 'Not necessarily. In many cases a stiff uPVC door is due to door misalignment, a worn roller, or a failing gearbox. I diagnose the root cause first — in some cases a simple adjustment is all that is needed.' },
      { q: 'Can you replace just the cylinder on a uPVC door?', a: 'Yes — a euro cylinder replacement is one of the most common uPVC lock jobs. It is a straightforward replacement that also improves your security if you upgrade to an anti-snap cylinder at the same time.' },
      { q: 'My uPVC door will not lock at all — is this an emergency?', a: 'Yes — an insecure door is an emergency. I cover this 24/7. Call me and I will attend as soon as possible.' },
      { q: 'Do you repair window locks on uPVC windows?', a: 'Yes — I repair and replace espagnolette window locks and cockspur handles on uPVC and aluminium windows.' },
    ],
    howToName: 'How to Get a uPVC Lock Repaired in Coventry',
    benefits: [
      "Specialist in all uPVC multipoint mechanisms — Mila, GU, Yale, Fuhr, Lockmaster",
      "Diagnose before quoting — I'll tell you if a repair is possible before recommending replacement",
      "Common cylinders and mechanisms carried in the van",
      "Anti-snap cylinder upgrade available on every repair visit",
      "Door alignment included at no extra cost",
    ],
    whyUs: "uPVC doors are what I work on most. I understand the different mechanism brands, the common failure points, and whether your lock needs a £59 repair or a £150 replacement. I'll never recommend a replacement when a repair will do.",
    scenarios: [
      { title: "Stiff or Sticky Lock", desc: "Your key is getting harder to turn each month. Usually a worn cylinder or misaligned door — often a repair, not a replacement." },
      { title: "Mechanism Failed", desc: "The gearbox has seized and the door won't lock at all. I carry the most common replacement mechanisms in my van." },
      { title: "Euro Cylinder Snapped", desc: "Someone tried to break in, or the cylinder just failed. I'll replace it with an anti-snap cylinder so it can't happen again." },
    ],
    relatedSlugs: ["upvc-door-lock-needs-replacing", "upvc-door-lock-mechanisms-explained", "best-euro-cylinder-upgrades-2026"],
    priceDetails: [
      { item: "Euro cylinder replacement", price: "From £59" },
      { item: "Mechanism/gearbox replacement", price: "From £89" },
      { item: "Handle set replacement", price: "From £39" },
      { item: "Door realignment", price: "From £49" },
    ],
    testimonial: { text: "uPVC door had been stiff for months. Ross diagnosed a worn gearbox, replaced it in under an hour. Door works like new.", name: "Jenny M.", area: "Tile Hill" },
    directAnswer: {
      question: 'How much does a uPVC door lock repair cost?',
      answer: 'A uPVC door lock repair costs from £59 for a cylinder replacement and from £89 for a multipoint mechanism replacement. The price includes parts and labour with no VAT and no call-out fee. Most repairs are completed within one hour.',
    },
    voiceFaqs: [
      { q: 'Why is my uPVC door stiff to lock?', a: 'A stiff uPVC door is usually caused by a worn euro cylinder, a misaligned door dropping on its hinges, or a failing gearbox mechanism. In many cases it is repairable without replacing the full mechanism.' },
      { q: 'What is an anti-snap cylinder and do I need one?', a: 'An anti-snap cylinder is designed to resist snap attacks, where a burglar snaps the exposed part of the euro cylinder to gain entry. If your uPVC door has a standard euro cylinder, upgrading to anti-snap is strongly recommended.' },
      { q: 'How long does a uPVC door lock last?', a: 'A quality uPVC multipoint locking mechanism should last fifteen to twenty years with normal use. Budget mechanisms on cheaper doors can fail in five to eight years. Regular lubrication with graphite extends the lifespan significantly.' },
    ],
  },
  'boarding-up': {
    h1: 'Emergency Boarding Up Coventry — 24/7 Service',
    intro: [
      "After a break-in, storm damage, or accidental breakage, a smashed window or damaged door needs securing immediately. I provide emergency boarding-up services across Coventry and Warwickshire, available 24 hours a day.",
      "I use heavy-duty boarding materials to secure your property against weather and further intrusion until a permanent repair can be arranged. Where possible I will also advise on the most secure temporary solution for your specific situation.",
      "Emergency boarding up starts from £79. No VAT. No call-out fee.",
    ],
    steps: [
      "Call 07735 336175 immediately — do not delay after a break-in",
      "I arrive as quickly as possible, usually within 15-30 minutes of central Coventry",
      "I assess the damage and identify the best boarding solution",
      "I secure the opening with solid boarding material",
      "I advise on next steps for permanent repair and improved security",
    ],
    faqs: [
      { q: 'Should I call the police before calling a locksmith after a break-in?', a: 'Yes — report the break-in to the police first and obtain a crime reference number, which you will need for your insurance claim. Then call me to secure the property.' },
      { q: 'How long will boarding hold before I need a permanent repair?', a: 'Proper boarding is secure and weatherproof — it will hold indefinitely until you arrange a permanent glazing or joinery repair. I use solid material, not just plywood.' },
      { q: 'Can you change the locks after boarding up?', a: 'Yes — if a break-in compromised your lock I can change the locks at the same visit. I always carry a range of replacement locks in the van.' },
      { q: 'Do you board up commercial properties?', a: 'Yes — I cover residential and commercial premises across Coventry and Warwickshire.' },
    ],
    howToName: 'How to Get Emergency Boarding Up in Coventry',
    benefits: [
      "Available 24/7 — I'll secure your property within the hour",
      "Heavy-duty boarding material — not just thin plywood",
      "Can change locks on the same visit if needed",
      "I'll advise on next steps for permanent repair",
      "Crime reference number support for insurance claims",
    ],
    whyUs: "After a break-in, you need your property secured immediately — not tomorrow, not next week. I carry boarding materials in my van and can have your property secured within an hour of your call.",
    scenarios: [
      { title: "Break-In Damage", desc: "Door or window smashed during a burglary. I'll board up, change locks if needed, and advise on your insurance claim." },
      { title: "Storm Damage", desc: "A window has blown in or a door has been damaged by high winds. I'll secure it against weather and intruders." },
      { title: "Accidental Breakage", desc: "Glass door or window broken accidentally. I'll board it safely while you arrange glazing repair." },
    ],
    relatedSlugs: ["what-to-do-after-burglary", "how-burglars-break-into-uk-homes", "home-security-checklist-2026"],
    priceDetails: [
      { item: "Single window board-up", price: "From £79" },
      { item: "Door board-up", price: "From £89" },
      { item: "Multiple openings", price: "From £120" },
      { item: "Board-up + lock change", price: "From £139" },
    ],
    testimonial: { text: "Called at 3am after a break-in. Ross arrived, boarded the window, and changed the front door lock. Felt safe again within the hour.", name: "Paul K.", area: "Stoke" },
    directAnswer: {
      question: 'How much does emergency boarding up cost in Coventry?',
      answer: 'Emergency boarding up in Coventry costs from £79 for a single window or door. The service is available 24 hours a day, 7 days a week. Lock changes can be done on the same visit if needed. No VAT is charged.',
    },
    voiceFaqs: [
      { q: 'Should I call the police before calling a locksmith after a break-in?', a: 'Yes. Call 999 if the break-in is still in progress, or 101 to report it after the fact. Get a crime reference number first as you will need it for your insurance claim. Then call a locksmith to secure the property.' },
      { q: 'How long will boarding hold before I need a permanent repair?', a: 'Proper boarding using heavy-duty materials is secure and weatherproof. It will hold indefinitely until you arrange permanent glazing or joinery repair. I use solid boarding material, not thin plywood.' },
      { q: 'Can you change the locks after boarding up?', a: 'Yes. If a break-in has compromised your locks, I can change them on the same visit. I always carry replacement locks in the van so there is no need for a return visit.' },
    ],
  },
  'lock-upgrade': {
    h1: 'Lock Upgrade Coventry — BS3621 & Anti-Snap Cylinders',
    intro: [
      "Upgrading your locks is one of the most cost-effective security improvements you can make. Whether you want to comply with home insurance requirements, improve resistance to forced entry, or simply feel more secure, I supply and fit a full range of security-approved locks.",
      "I fit British Standard BS3621 mortice deadlocks, Secured by Design cylinders, anti-snap euro cylinders, and high-security mortice locks. I can also carry out a free security assessment of your property and advise on any weak points.",
      "Lock upgrade prices start from £79 including the lock and fitting. No VAT. No call-out fee.",
    ],
    steps: [
      "Call 07735 336175 for a free phone consultation on your security needs",
      "I visit and assess your current locks and door security",
      "I recommend the most appropriate upgrade for your insurance requirements and budget",
      "I confirm the full price before any work starts",
      "I fit and test the new locks",
      "I provide documentation of the lock standard fitted for your insurance records",
    ],
    faqs: [
      { q: 'What lock does my home insurance require?', a: 'Most UK home insurance policies require a five-lever mortice deadlock to BS3621 standard on front and back doors, and key-operated window locks. Check your policy schedule for the exact requirements — or call me and I can advise.' },
      { q: 'What is a Secured by Design cylinder?', a: 'Secured by Design is a police-endorsed security standard. Cylinders meeting this standard are tested to resist all common attack methods including snapping, picking, drilling, and bumping. I recommend these for all external doors.' },
      { q: 'Is a lock upgrade worth it?', a: 'Yes. A quality lock upgrade typically costs £79-£150 and significantly reduces your risk of burglary, keeps your insurance valid, and gives you peace of mind. It is one of the best value security investments you can make.' },
      { q: 'Do you offer a free security survey?', a: 'Yes — I offer a free security survey as part of any lock upgrade job. I will check all external doors and windows and advise on any weak points at no extra cost.' },
    ],
    howToName: 'How to Upgrade Your Home Security Locks in Coventry',
    benefits: [
      "Free security assessment of all external doors",
      "BS3621, TS007, and Secured by Design products available",
      "Written documentation for your insurance company",
      "All work completed in a single visit",
      "Honest advice — I'll tell you what you need and what you don't",
    ],
    whyUs: "A lock upgrade is the single most cost-effective improvement you can make to your home security. I'll assess every external door, recommend the right upgrades for your insurance requirements, and fit everything in one visit.",
    scenarios: [
      { title: "Insurance Non-Compliance", desc: "Your insurer says you need BS3621 locks and your current ones don't qualify. I'll fit compliant locks and give you the documentation." },
      { title: "Post-Burglary Upgrade", desc: "After a break-in, you want to ensure it never happens again. Anti-snap cylinders and reinforced strikes make a real difference." },
      { title: "General Security Improvement", desc: "You want better peace of mind. I'll survey your property and recommend targeted upgrades based on the weak points." },
    ],
    relatedSlugs: ["bs3621-locks-explained", "anti-snap-locks-compared", "insurance-approved-locks-explained"],
    priceDetails: [
      { item: "Anti-snap euro cylinder", price: "From £59" },
      { item: "BS3621 mortice deadlock", price: "From £79" },
      { item: "Full front door upgrade (deadlock + cylinder)", price: "From £129" },
      { item: "Whole house upgrade (all doors)", price: "From £199" },
    ],
    testimonial: { text: "Had all external locks upgraded after a neighbour was burgled. Ross checked everything, recommended only what was needed, and the price was exactly what he quoted.", name: "Lisa W.", area: "Cheylesmore" },
    directAnswer: {
      question: 'How much does a lock upgrade cost in Coventry?',
      answer: 'A lock upgrade in Coventry costs from £79 for a BS3621 insurance-approved mortice deadlock or from £59 for an anti-snap euro cylinder. The price includes the lock and fitting. A free security survey is included with every upgrade.',
    },
    voiceFaqs: [
      { q: 'What is the difference between a Yale lock and a deadlock?', a: 'A Yale nightlatch is a spring-loaded latch that locks automatically when the door closes. A deadlock is a separate lock with a solid bolt that can only be opened with a key. Most secure front doors have both.' },
      { q: 'Is a lock upgrade worth the money?', a: 'Yes. A quality lock upgrade costing seventy-nine to one hundred and fifty pounds significantly reduces burglary risk, keeps your home insurance valid, and gives you peace of mind. It is one of the best value security investments available.' },
      { q: 'Do you offer a free security survey?', a: 'Yes. I offer a free security assessment as part of any lock upgrade. I check all external doors and windows and advise on any weak points, with no obligation to proceed.' },
    ],
  },
}

const mainAreaLinks = [
  { slug: 'coventry-city-centre', name: 'Coventry' },
  { slug: 'nuneaton', name: 'Nuneaton' },
  { slug: 'rugby', name: 'Rugby' },
  { slug: 'leamington-spa', name: 'Leamington Spa' },
  { slug: 'warwick', name: 'Warwick' },
  { slug: 'kenilworth', name: 'Kenilworth' },
]

/* ------------------------------------------------------------------ */
/*  Service icons for the "Other Services" section                     */
/* ------------------------------------------------------------------ */
const SERVICE_ICONS: Record<string, string> = {
  'emergency-lockout': '🔓',
  'lock-change': '🔑',
  'upvc-lock-repair': '🚪',
  'boarding-up': '🪟',
  'lock-upgrade': '🛡️',
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  const content = SERVICE_CONTENT[slug]
  if (!content) notFound()

  /* ---- Schema markup ---- */

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_CONFIG.domain },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_CONFIG.domain}/services` },
      { '@type': 'ListItem', position: 3, name: service.name, item: `${SITE_CONFIG.domain}/services/${slug}` },
    ],
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    serviceType: service.shortName,
    provider: {
      '@type': 'Locksmith',
      name: 'Local Emergency Locksmith',
      telephone: SITE_CONFIG.phoneTel,
      url: SITE_CONFIG.domain,
    },
    areaServed: [
      { '@type': 'City', name: 'Coventry' },
      { '@type': 'City', name: 'Nuneaton' },
      { '@type': 'City', name: 'Bedworth' },
      { '@type': 'City', name: 'Rugby' },
      { '@type': 'City', name: 'Leamington Spa' },
      { '@type': 'City', name: 'Warwick' },
      { '@type': 'City', name: 'Kenilworth' },
      { '@type': 'City', name: 'Stratford-upon-Avon' },
    ],
    offers: {
      '@type': 'Offer',
      price: service.priceFrom.toString(),
      priceCurrency: 'GBP',
      availability: 'https://schema.org/InStock',
      validFrom: '2026-01-01',
    },
  }

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: content.howToName,
    totalTime: 'PT30M',
    step: content.steps.map((text, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: `Step ${i + 1}`,
      text,
    })),
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [...content.voiceFaqs, ...content.faqs].map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.direct-answer', '.hero-subtitle'],
    },
    url: `${SITE_CONFIG.domain}/services/${slug}`,
  }

  /* ---- Data ---- */

  const areasByRegion = getAllAreasByRegion()

  const relatedPosts = content.relatedSlugs
    .map((s) => getBlogPostBySlug(s))
    .filter((p): p is NonNullable<typeof p> => p != null)

  const otherServices = SERVICES.filter((s) => s.slug !== slug)

  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} />
      <SchemaMarkup schema={serviceSchema} />
      <SchemaMarkup schema={howToSchema} />
      <SchemaMarkup schema={faqSchema} />
      <SchemaMarkup schema={speakableSchema} />

      {/* ============================================================ */}
      {/*  1. Breadcrumb                                                */}
      {/* ============================================================ */}
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 py-3 text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-0" itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <Link href="/" itemProp="item" className="hover:text-[#FFB800] transition-colors"><span itemProp="name">Home</span></Link>
            <meta itemProp="position" content="1" />
          </li>
          <span className="mx-2 text-gray-300" aria-hidden="true">›</span>
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <Link href="/services" itemProp="item" className="hover:text-[#FFB800] transition-colors"><span itemProp="name">Services</span></Link>
            <meta itemProp="position" content="2" />
          </li>
          <span className="mx-2 text-gray-300" aria-hidden="true">›</span>
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <span itemProp="item"><span itemProp="name" className="text-[#0F1B2D] font-semibold">{service.shortName}</span></span>
            <meta itemProp="position" content="3" />
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
              Same Price 24/7
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

          <LastUpdated date="2026-03-17" />
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
            These are the most common situations where people call me for {service.shortName.toLowerCase()} help.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.scenarios.map((scenario, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border-l-4 border-[#0F1B2D] shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[#FFB800]/10 text-[#FFB800] font-black text-sm flex items-center justify-center">
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
            All prices include labour. No VAT. No call-out fee.
          </p>

          {/* Price card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            {content.priceDetails.map((item, i) => (
              <div
                key={i}
                className={`flex items-center justify-between px-6 py-4 ${i < content.priceDetails.length - 1 ? 'border-b border-gray-100' : ''}`}
              >
                <span className="text-[#0F1B2D] font-medium">{item.item}</span>
                <span className="text-[#FFB800] font-black text-lg whitespace-nowrap ml-4">{item.price}</span>
              </div>
            ))}

            {/* Footer */}
            <div className="bg-[#F7F7F5] px-6 py-4 border-t border-gray-200">
              <p className="text-gray-500 text-sm text-center">
                The price you are quoted on the phone is the final price. No surprises. No hidden charges.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-8">
            <a
              href={`tel:${SITE_CONFIG.phoneTel}`}
              className="inline-flex items-center gap-3 bg-[#FFB800] hover:bg-[#FFC933] text-[#0F1B2D] px-10 py-5 rounded-2xl font-black text-xl transition-all duration-200 shadow-[0_4px_24px_rgba(255,184,0,0.3)] hover:shadow-[0_4px_32px_rgba(255,184,0,0.5)] hover:scale-[1.02]"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
              Get a Price Now
            </a>
            <p className="text-gray-400 text-sm mt-3">
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

            {/* Testimonial card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 relative">
              {/* Quote mark */}
              <div className="absolute -top-4 left-8 w-10 h-10 bg-[#FFB800] rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-[#0F1B2D]" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11h4v10H0z" /></svg>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4 mt-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-[#FFB800]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <blockquote className="text-gray-700 text-lg leading-relaxed italic mb-6">
                &ldquo;{content.testimonial.text}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0F1B2D] text-white flex items-center justify-center font-bold text-sm">
                  {content.testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-[#0F1B2D] text-sm">{content.testimonial.name}</p>
                  <p className="text-gray-500 text-xs">{content.testimonial.area}, Coventry</p>
                </div>
              </div>

              {/* Why-us paragraph */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-gray-600 leading-relaxed text-sm">
                  {content.whyUs}
                </p>
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
            I cover Coventry, Warwickshire, and surrounding areas. Here are some of the locations I serve.
          </p>

          {/* All areas grouped by region */}
          <div className="space-y-6">
            {Object.entries(areasByRegion).map(([region, areas]) => (
              <div key={region}>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-3">{region}</h3>
                <div className="flex flex-wrap gap-2">
                  {areas.map((area) => (
                    <Link
                      key={area.slug}
                      href={`/areas/${area.slug}`}
                      className="text-sm text-gray-600 hover:text-[#0F1B2D] bg-white hover:bg-white px-3 py-1.5 rounded-lg border border-gray-200 hover:border-[#FFB800] transition-all duration-200"
                    >
                      {area.name}
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
                    <span className="text-xs font-semibold text-[#FFB800] bg-[#FFB800]/10 px-2.5 py-1 rounded-full">
                      {post.pillar}
                    </span>
                    <span className="text-xs text-gray-400">{post.readTime}</span>
                  </div>
                  <h3 className="font-bold text-[#0F1B2D] group-hover:text-[#FFB800] transition-colors leading-snug mb-3 flex-1">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                  <span className="mt-4 text-sm font-bold text-[#0F1B2D] group-hover:text-[#FFB800] transition-colors inline-flex items-center gap-1">
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
        faqs={[...content.voiceFaqs, ...content.faqs]}
        heading={`Frequently Asked Questions — ${service.shortName}`}
      />

      {/* ============================================================ */}
      {/*  12. Other services                                           */}
      {/* ============================================================ */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-[#0F1B2D] mb-3 text-center">
            Other Locksmith Services
          </h2>
          <p className="text-gray-500 text-center mb-8 max-w-lg mx-auto">
            I offer a full range of locksmith services across Coventry and Warwickshire.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group bg-white border border-gray-200 hover:border-[#FFB800] rounded-2xl p-5 transition-all duration-200 hover:shadow-md flex gap-4 items-start"
              >
                {/* Icon */}
                <span className="flex-shrink-0 w-12 h-12 bg-[#0F1B2D] rounded-xl flex items-center justify-center text-xl group-hover:bg-[#162438] transition-colors">
                  {SERVICE_ICONS[s.slug] || '🔧'}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-bold text-[#0F1B2D] group-hover:text-[#FFB800] transition-colors text-base leading-tight">
                      {s.shortName}
                    </h3>
                    <div className="text-right flex-shrink-0">
                      <span className="text-[#FFB800] font-black text-lg">
                        &pound;{s.priceFrom}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mt-1 leading-relaxed line-clamp-2">
                    {s.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-gray-400">No VAT</span>
                    <span className="text-gray-300">&bull;</span>
                    <span className="text-xs text-gray-400">No call-out fee</span>
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
        subtext={`I'm available 24/7, 365 days a year. ${service.shortName} from £${service.priceFrom}. No VAT, no call-out fee. The price I quote is the price you pay.`}
      />
    </>
  )
}
