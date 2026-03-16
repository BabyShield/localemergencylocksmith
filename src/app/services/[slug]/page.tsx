import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SERVICES, getServiceBySlug } from '@/data/services'
import { AREAS } from '@/data/areas'
import { SITE_CONFIG } from '@/data/config'
import HeroSection from '@/components/HeroSection'
import CTABlock from '@/components/CTABlock'
import FAQSection from '@/components/FAQSection'
import SchemaMarkup from '@/components/SchemaMarkup'

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
    alternates: {
      canonical: `${SITE_CONFIG.domain}/services/${slug}`,
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `${SITE_CONFIG.domain}/services/${slug}`,
    },
  }
}

const SERVICE_CONTENT: Record<string, {
  intro: string[]
  steps: string[]
  faqs: { q: string; a: string }[]
  howToName: string
  h1: string
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

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  const content = SERVICE_CONTENT[slug]

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
    areaServed: { '@type': 'City', name: 'Coventry' },
    offers: {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: service.priceFrom.toString(),
        priceCurrency: 'GBP',
        minPrice: service.priceFrom.toString(),
      },
    },
  }

  const howToSchema = content ? {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: content.howToName,
    totalTime: 'PT30M',
    step: content.steps.map((text, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      text,
    })),
  } : null

  const faqSchema = content ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  } : null

  // Sample areas for the areas-covered grid
  const covAreas = AREAS.filter((a) => a.region === 'Coventry').slice(0, 8)

  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} />
      <SchemaMarkup schema={serviceSchema} />
      {howToSchema && <SchemaMarkup schema={howToSchema} />}
      {faqSchema && <SchemaMarkup schema={faqSchema} />}

      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 py-3 text-sm text-gray-500">
        <Link href="/" className="hover:text-green-700">Home</Link>
        <span className="mx-2">›</span>
        <Link href="/services" className="hover:text-green-700">Services</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-800 font-medium">{service.shortName}</span>
      </nav>

      <HeroSection
        heading={content?.h1 ?? `${service.name} — Coventry & Warwickshire`}
        subheading={`${service.description} Call now for a price — no VAT, no call-out fee.`}
      />

      {/* Main content */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-gray-900 mb-6">
            {service.shortName} in Coventry — From £{service.priceFrom}
          </h2>
          {content?.intro.map((para, i) => (
            <p key={i} className="text-gray-700 leading-relaxed mb-4">
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* How it works */}
      {content && (
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-black text-gray-900 mb-8 text-center">
              What Happens When You Call
            </h2>
            <ol className="space-y-4">
              {content.steps.map((step, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-12 h-12 rounded-full bg-green-800 text-white font-black text-lg flex items-center justify-center shadow-sm">
                    {i + 1}
                  </span>
                  <span className="text-gray-800 pt-3 text-base">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Pricing */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-black text-gray-900 mb-4">
            {service.shortName} Prices
          </h2>
          <div className="inline-block bg-green-800 text-white rounded-xl px-10 py-6">
            <p className="text-green-200 text-sm uppercase tracking-widest mb-1">Starting from</p>
            <p className="text-5xl font-black">£{service.priceFrom}</p>
            <p className="text-green-200 text-sm mt-2">No VAT &bull; No call-out fee &bull; Includes labour</p>
          </div>
          <p className="text-gray-600 mt-6 text-sm">
            The price you are quoted when you call is the final price. No surprises.
          </p>
        </div>
      </section>

      {/* Areas */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-gray-900 mb-6 text-center">
            {service.shortName} Areas Covered
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {mainAreaLinks.map((area) => (
              <Link
                key={area.slug}
                href={`/areas/${area.slug}`}
                className="bg-white border border-gray-200 hover:border-green-700 text-gray-700 hover:text-green-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors text-center"
              >
                {area.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {covAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/areas/${area.slug}`}
                className="text-sm text-gray-600 hover:text-green-700 hover:underline px-2 py-1"
              >
                {area.name}
              </Link>
            ))}
            <Link href="/areas" className="text-sm text-green-700 font-semibold hover:underline px-2 py-1">
              View all areas →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {content && (
        <FAQSection
          faqs={content.faqs}
          heading={`Frequently Asked Questions — ${service.shortName}`}
        />
      )}

      {/* Other services */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Other Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SERVICES.filter((s) => s.slug !== slug).map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="flex items-center gap-4 bg-gray-50 hover:bg-green-50 border border-gray-200 hover:border-green-700 rounded-xl p-4 transition-colors group"
              >
                <div className="flex-1">
                  <div className="font-black text-gray-900 group-hover:text-green-800 text-base leading-tight">
                    {s.shortName}
                  </div>
                  <div className="text-sm text-gray-500 mt-0.5">{s.description}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-green-800 font-black text-lg">from £{s.priceFrom}</div>
                  <div className="text-xs text-gray-400">No VAT</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABlock />
    </>
  )
}
