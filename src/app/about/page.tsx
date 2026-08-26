import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_CONFIG } from '@/data/config'
import SchemaMarkup from '@/components/SchemaMarkup'
import CTABlock from '@/components/CTABlock'

export const metadata: Metadata = {
  title: 'About Local Emergency Locksmith | Ross — Your Coventry Locksmith',
  description:
    "I'm Ross, your local independent locksmith covering Coventry and all of Warwickshire. No VAT, no call-out fee, 15-30 minute response. Call 024 7522 4730.",
  keywords: 'about locksmith coventry, local locksmith coventry, independent locksmith warwickshire, ross locksmith coventry, coventry locksmith no vat, trusted locksmith coventry',
  alternates: {
    canonical: `${SITE_CONFIG.domain}/about`,
  },
  openGraph: {
    type: 'website',
    siteName: 'Local Emergency Locksmith',
    locale: 'en_GB',
    title: 'About Local Emergency Locksmith | Ross — Your Coventry Locksmith',
    description:
      "Independent emergency locksmith serving Coventry and Warwickshire. No VAT, no call-out fee, 15-30 minute response. Available 24/7.",
    url: `${SITE_CONFIG.domain}/about`,
    images: [{ url: `${SITE_CONFIG.domain}/api/og?title=${encodeURIComponent('About Local Emergency Locksmith')}`, width: 1200, height: 630 }],
  },
}

// The business entity is defined once in layout.tsx — this page just declares
// itself as the about page for that entity.
const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  url: `${SITE_CONFIG.domain}/about`,
  mainEntity: { '@id': `${SITE_CONFIG.domain}/#business` },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_CONFIG.domain },
    { '@type': 'ListItem', position: 2, name: 'About', item: `${SITE_CONFIG.domain}/about` },
  ],
}

export default function AboutPage() {
  return (
    <>
      <SchemaMarkup schema={aboutSchema} />
      <SchemaMarkup schema={breadcrumbSchema} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-[#F7F7F5] py-3 px-4 border-b border-gray-200">
        <ol className="max-w-3xl mx-auto text-sm text-gray-500 flex flex-wrap items-center gap-0" itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <Link href="/" itemProp="item" className="hover:text-[#0F1B2D] transition-colors"><span itemProp="name">Home</span></Link>
            <meta itemProp="position" content="1" />
          </li>
          <span className="mx-2" aria-hidden="true">›</span>
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <span><span itemProp="name" className="text-[#0F1B2D] font-medium">About</span></span>
            <meta itemProp="position" content="2" />
          </li>
        </ol>
      </nav>

      {/* Main content */}
      <article className="py-14 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          {/* H1 */}
          <h1 className="text-3xl md:text-4xl font-black text-[#0F1B2D] mb-6">
            About Local Emergency Locksmith
          </h1>

          {/* Hero paragraph */}
          <p className="text-lg text-gray-700 leading-relaxed mb-10">
            I&apos;m Ross, your local independent locksmith covering Coventry and all of
            Warwickshire. When you call{' '}
            <a
              href={`tel:${SITE_CONFIG.phoneTel}`}
              className="font-black text-[#0F1B2D] hover:text-[#FFB800] transition-colors"
            >
              {SITE_CONFIG.phone}
            </a>
            , you speak to me directly — not a call centre, not a dispatcher, not an answering
            machine.
          </p>

          {/* What I Do */}
          <section className="mb-12">
            <h2 className="text-2xl font-black text-[#0F1B2D] mb-4">What I Do</h2>
            <p className="text-gray-600 mb-5 leading-relaxed">
              I provide a full range of emergency and non-emergency locksmith services across
              Coventry and Warwickshire. Every job is handled personally by me — no subcontractors,
              no middlemen.
            </p>
            <div className="space-y-3">
              {[
                { service: 'Emergency Lockout', price: 'from £59' },
                { service: 'Lock Change', price: 'from £69' },
                { service: 'uPVC Lock Repair', price: 'from £59' },
                { service: 'Boarding Up', price: 'from £79' },
                { service: 'Lock Upgrade', price: 'from £79' },
              ].map((item) => (
                <div
                  key={item.service}
                  className="flex items-center justify-between bg-[#F7F7F5] rounded-xl px-5 py-3.5 border border-gray-100"
                >
                  <span className="font-bold text-[#0F1B2D]">{item.service}</span>
                  <span className="font-black text-[#FFB800] text-lg">{item.price}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-3">
              All prices include labour. No VAT. No call-out fee. No extra charge for evenings,
              weekends, or bank holidays.
            </p>
          </section>

          {/* Where I Cover */}
          <section className="mb-12">
            <h2 className="text-2xl font-black text-[#0F1B2D] mb-4">Where I Cover</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              I cover Coventry, Nuneaton, Bedworth, Rugby, Leamington Spa, Warwick, Kenilworth,
              Stratford-upon-Avon, and over 70 surrounding towns and villages across Warwickshire
              and the West Midlands.
            </p>
            <p className="text-gray-600 leading-relaxed">
              For most of Coventry, I can be with you in 15-30 minutes. For towns further out,
              allow 30-45 minutes. I always give you an honest arrival time when you call.
            </p>
            <div className="mt-4">
              <Link
                href="/areas"
                className="inline-flex items-center gap-1.5 text-[#0F1B2D] font-bold hover:text-[#FFB800] transition-colors text-sm"
              >
                See all areas I cover
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </section>

          {/* Why Choose a Local Independent Locksmith */}
          <section className="mb-12">
            <h2 className="text-2xl font-black text-[#0F1B2D] mb-4">
              Why Choose a Local Independent Locksmith
            </h2>
            <ul className="space-y-3">
              {[
                'You speak directly to the person who will do the work — no call centre, no middleman.',
                'No VAT — you save 20% compared to larger companies.',
                'No call-out fee, ever. You only pay if I complete the job.',
                'Same price 24/7 — no premium for evenings, weekends, or bank holidays.',
                'I know Coventry streets, housing stock, and common lock types. I arrive prepared.',
                'Honest pricing confirmed on the phone before I set off. No surprises at the door.',
              ].map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-[#FFB800] mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700 leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* My Approach */}
          <section className="mb-12">
            <h2 className="text-2xl font-black text-[#0F1B2D] mb-4">My Approach</h2>
            <div className="bg-[#F7F7F5] border-l-4 border-[#FFB800] rounded-r-xl p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                I started this business because I was fed up with how the locksmith industry
                treats people. National call centres quote one price on the phone and charge
                double at the door. They add VAT, call-out fees, and &ldquo;emergency
                surcharges&rdquo; that don&apos;t exist.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                I do things differently. When you call me, I tell you exactly what it will cost.
                That&apos;s what you pay — nothing more. I don&apos;t charge VAT because I&apos;m
                a sole trader, and I never charge a call-out fee because it&apos;s not fair to
                charge someone just for turning up.
              </p>
              <p className="text-gray-700 leading-relaxed">
                My goal is simple: get to you fast, fix the problem, charge a fair price, and
                leave you feeling like you called the right person.
              </p>
            </div>
          </section>

          {/* Qualifications & Trust */}
          <section className="mb-12">
            <h2 className="text-2xl font-black text-[#0F1B2D] mb-4">
              Qualifications &amp; Trust
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: 'DBS Checked',
                  desc: 'Enhanced Disclosure and Barring Service checked for your peace of mind.',
                },
                {
                  title: 'Fully Insured',
                  desc: 'Full public liability insurance covering all work carried out.',
                },
                {
                  title: 'Real Local Business',
                  desc: 'Based in Coventry, not a national franchise or call centre operation.',
                },
                {
                  title: 'Transparent Pricing',
                  desc: 'Every price confirmed on the phone before I set off. No hidden charges.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-[#0F1B2D] rounded-xl p-5 border border-white/10"
                >
                  <h3 className="font-bold text-[#FFB800] mb-1.5">{item.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section className="mb-12">
            <h2 className="text-2xl font-black text-[#0F1B2D] mb-4">Contact</h2>
            <div className="bg-[#F7F7F5] rounded-2xl p-6 border border-gray-100">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-[#FFB800] flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500">Phone (24/7)</p>
                    <a
                      href={`tel:${SITE_CONFIG.phoneTel}`}
                      className="font-black text-[#0F1B2D] text-lg hover:text-[#FFB800] transition-colors"
                    >
                      {SITE_CONFIG.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-[#FFB800] flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a
                      href={`mailto:${SITE_CONFIG.email}`}
                      className="font-bold text-[#0F1B2D] hover:text-[#FFB800] transition-colors"
                    >
                      {SITE_CONFIG.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-[#FFB800] flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500">Hours</p>
                    <p className="font-bold text-[#0F1B2D]">{SITE_CONFIG.hours}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </article>

      {/* CTA */}
      <CTABlock />
    </>
  )
}
