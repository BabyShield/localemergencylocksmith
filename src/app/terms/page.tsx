import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_CONFIG } from '@/data/config'
import SchemaMarkup from '@/components/SchemaMarkup'
import CTABlock from '@/components/CTABlock'

export const metadata: Metadata = {
  title: 'Terms of Service | Local Emergency Locksmith',
  description:
    'Terms of service for Local Emergency Locksmith Coventry. Covers pricing, payment, liability, cancellation, guarantees, and complaints. Call 024 7522 4730.',
  robots: { index: false, follow: true },
  alternates: {
    canonical: `${SITE_CONFIG.domain}/terms`,
  },
  openGraph: {
    type: 'website',
    siteName: 'Local Emergency Locksmith',
    locale: 'en_GB',
    title: 'Terms of Service | Local Emergency Locksmith',
    description:
      'Terms of service for Local Emergency Locksmith Coventry. Covers pricing, payment, liability, cancellation, and guarantees.',
    url: `${SITE_CONFIG.domain}/terms`,
    images: [{ url: `${SITE_CONFIG.domain}/og-image.png`, width: 1200, height: 630 }],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE_CONFIG.domain,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Terms of Service',
      item: `${SITE_CONFIG.domain}/terms`,
    },
  ],
}

export default function TermsPage() {
  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-[#F7F7F5] py-3 px-4 border-b border-gray-200">
        <ol className="max-w-3xl mx-auto text-sm text-gray-500 flex flex-wrap items-center gap-0" itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <Link href="/" prefetch={false} itemProp="item" className="hover:text-[#0F1B2D] transition-colors"><span itemProp="name">Home</span></Link>
            <meta itemProp="position" content="1" />
          </li>
          <span className="mx-2" aria-hidden="true">›</span>
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <span><span itemProp="name" className="text-[#0F1B2D] font-medium">Terms of Service</span></span>
            <meta itemProp="position" content="2" />
          </li>
        </ol>
      </nav>

      {/* Main content */}
      <article className="py-14 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-black text-[#0F1B2D] mb-2">
            Terms of Service
          </h1>
          <p className="text-gray-500 text-sm mb-10">
            Last updated: 17 March 2026
          </p>

          {/* Introduction */}
          <section className="mb-10">
            <p className="text-gray-700 leading-relaxed">
              These terms of service apply to all locksmith services provided by Local Emergency
              Locksmith (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;), a sole trader
              based in Coventry, West Midlands. By using our services, you agree to these terms.
            </p>
          </section>

          {/* Services */}
          <section className="mb-10">
            <h2 className="text-2xl font-black text-[#0F1B2D] mb-4">Services We Provide</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We provide the following locksmith services across Coventry and Warwickshire:
            </p>
            <div className="space-y-3">
              {[
                {
                  service: 'Emergency Lockout',
                  desc: 'Non-destructive entry to your home or business when you are locked out. We use specialist tools to gain entry without damaging your lock wherever possible.',
                },
                {
                  service: 'Lock Change',
                  desc: 'Replacement of existing locks with new, high-quality lock mechanisms. Includes British Standard locks for insurance compliance where required.',
                },
                {
                  service: 'uPVC Lock Repair',
                  desc: 'Repair and replacement of multipoint locking mechanisms, handles, and gearboxes on uPVC doors and windows.',
                },
                {
                  service: 'Boarding Up',
                  desc: 'Emergency boarding up of broken windows, doors, or other access points to secure your property until permanent repairs can be made.',
                },
                {
                  service: 'Lock Upgrade',
                  desc: 'Upgrading existing locks to suitable British Standard or independently certified cylinder options after checking the door and any exact written policy requirement.',
                },
              ].map((item) => (
                <div
                  key={item.service}
                  className="bg-[#F7F7F5] rounded-xl p-5 border border-gray-100"
                >
                  <h3 className="font-bold text-[#0F1B2D] mb-1">{item.service}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Pricing */}
          <section className="mb-10">
            <h2 className="text-2xl font-black text-[#0F1B2D] mb-4">Pricing</h2>
            <div className="bg-[#F7F7F5] border-l-4 border-[#FFB800] rounded-r-xl p-6">
              <p className="text-gray-700 leading-relaxed mb-3">
                All prices shown on our website are <strong>&ldquo;from&rdquo; prices</strong> and
                serve as a guide. The exact cost of your job will be confirmed over the phone
                before we attend, based on the details you provide.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                We are not VAT-registered, so VAT is not added. There is
                no call-out fee, and no additional charge for evenings, weekends, or bank holidays.
              </p>
              <p className="text-gray-700 leading-relaxed">
                If the job requires additional work beyond what was discussed on the phone, we
                will explain the situation and confirm the revised cost before proceeding. You
                are never obligated to agree to additional work.
              </p>
            </div>
          </section>

          {/* Payment */}
          <section className="mb-10">
            <h2 className="text-2xl font-black text-[#0F1B2D] mb-4">Payment</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Payment is due upon completion of the work. We accept the following payment methods:
            </p>
            <div className="flex flex-wrap gap-3">
              {['Cash', 'Debit Card', 'Credit Card'].map((method) => (
                <span
                  key={method}
                  className="bg-[#0F1B2D] text-white px-4 py-2 rounded-lg text-sm font-bold"
                >
                  {method}
                </span>
              ))}
            </div>
          </section>

          {/* Liability */}
          <section className="mb-10">
            <h2 className="text-2xl font-black text-[#0F1B2D] mb-4">Liability &amp; Insurance</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Current cover details relevant to a booking can be requested before work starts.
              We exercise reasonable care and skill in all work carried out.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              If damage is identified during the work, tell us promptly so the cause, existing
              condition, agreed method and appropriate next steps can be assessed. Nothing on this
              page guarantees acceptance or payment of an insurance claim.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our liability is limited to the direct cost of the services provided and any damage
              directly caused by our work. We are not liable for pre-existing damage, wear and
              tear, or issues unrelated to the service performed.
            </p>
          </section>

          {/* Cancellation */}
          <section className="mb-10">
            <h2 className="text-2xl font-black text-[#0F1B2D] mb-4">Cancellation</h2>
            <div className="bg-[#0F1B2D] rounded-xl p-6 border border-white/10">
              <p className="text-white/80 leading-relaxed mb-3">
                You may cancel your booking at any time <strong className="text-white">before
                the locksmith arrives at your location</strong> at no charge.
              </p>
              <p className="text-white/80 leading-relaxed">
                Once work has begun, you will be charged for any work completed up to that point.
                If you wish to stop the work, please let us know immediately and we will provide
                a revised cost for the work already done.
              </p>
            </div>
          </section>

          {/* Guarantee */}
          <section className="mb-10">
            <h2 className="text-2xl font-black text-[#0F1B2D] mb-4">Guarantee</h2>
            <div className="bg-[#F7F7F5] border-l-4 border-[#FFB800] rounded-r-xl p-6">
              <p className="text-gray-700 leading-relaxed mb-3">
                All lock fittings and replacements come with a{' '}
                <strong>12-month guarantee</strong> covering defects in the lock mechanism and
                the installation work.
              </p>
              <p className="text-gray-700 leading-relaxed">
                This guarantee does not cover damage caused by misuse, forced entry by third
                parties, or general wear and tear. If you experience any issues with a lock we
                have fitted, contact us and we will arrange a return visit.
              </p>
            </div>
          </section>

          {/* Proof of Ownership */}
          <section className="mb-10">
            <h2 className="text-2xl font-black text-[#0F1B2D] mb-4">
              Proof of Residence / Ownership
            </h2>
            <p className="text-gray-700 leading-relaxed">
              For lockout services, we may ask for proof that you live at or own the property.
              This is a standard security measure to protect property owners. Acceptable proof
              includes a utility bill, driving licence, tenancy agreement, or any official
              document showing your name and the property address.
            </p>
          </section>

          {/* Complaints */}
          <section className="mb-10">
            <h2 className="text-2xl font-black text-[#0F1B2D] mb-4">Complaints</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              If you are not satisfied with any aspect of our service, please contact us and we
              will do our best to resolve the issue promptly.
            </p>
            <div className="bg-[#F7F7F5] rounded-xl p-5 border border-gray-100">
              <p className="text-gray-700">
                <span className="font-bold text-[#0F1B2D]">Email:</span>{' '}
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-[#0F1B2D] font-bold hover:text-[#FFB800] transition-colors"
                >
                  {SITE_CONFIG.email}
                </a>
              </p>
              <p className="text-gray-700 mt-2">
                <span className="font-bold text-[#0F1B2D]">Phone:</span>{' '}
                <a
                  href={`tel:${SITE_CONFIG.phoneTel}`}
                  className="text-[#0F1B2D] font-bold hover:text-[#FFB800] transition-colors"
                >
                  {SITE_CONFIG.phone}
                </a>
              </p>
            </div>
            <p className="text-gray-500 text-sm mt-3">
              We aim to respond to all complaints within 48 hours and resolve them within 14 days.
            </p>
          </section>

          {/* Changes to Terms */}
          <section className="mb-10">
            <h2 className="text-2xl font-black text-[#0F1B2D] mb-4">Changes to These Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update these terms from time to time. Any changes will be posted on this
              page with a revised &ldquo;last updated&rdquo; date. Continued use of our services
              after changes are posted constitutes acceptance of the updated terms.
            </p>
          </section>
        </div>
      </article>

      <CTABlock />
    </>
  )
}
