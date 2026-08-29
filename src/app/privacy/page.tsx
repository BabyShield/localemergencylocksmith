import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_CONFIG } from '@/data/config'
import SchemaMarkup from '@/components/SchemaMarkup'
import CTABlock from '@/components/CTABlock'

export const metadata: Metadata = {
  title: 'Privacy Policy | Local Emergency Locksmith',
  description:
    'How Local Emergency Locksmith collects, uses and protects personal data, including contact forms, analytics, retention and your UK GDPR rights.',
  robots: { index: false, follow: true },
  alternates: {
    canonical: `${SITE_CONFIG.domain}/privacy`,
  },
  openGraph: {
    type: 'website',
    siteName: 'Local Emergency Locksmith',
    locale: 'en_GB',
    title: 'Privacy Policy | Local Emergency Locksmith',
    description:
      'Privacy policy for Local Emergency Locksmith. Learn how we collect, use, and protect your personal data.',
    url: `${SITE_CONFIG.domain}/privacy`,
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
      name: 'Privacy Policy',
      item: `${SITE_CONFIG.domain}/privacy`,
    },
  ],
}

export default function PrivacyPage() {
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
            <span><span itemProp="name" className="text-[#0F1B2D] font-medium">Privacy Policy</span></span>
            <meta itemProp="position" content="2" />
          </li>
        </ol>
      </nav>

      {/* Main content */}
      <article className="py-14 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-black text-[#0F1B2D] mb-2">
            Privacy Policy
          </h1>
          <p className="text-gray-500 text-sm mb-10">
            Last updated: 17 March 2026
          </p>

          {/* Introduction */}
          <section className="mb-10">
            <p className="text-gray-700 leading-relaxed">
              Local Emergency Locksmith (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;)
              is committed to protecting your privacy. This policy explains what personal data we
              collect, how we use it, and your rights under the UK General Data Protection
              Regulation (UK GDPR) and the Data Protection Act 2018.
            </p>
          </section>

          {/* Data Controller */}
          <section className="mb-10">
            <h2 className="text-2xl font-black text-[#0F1B2D] mb-4">Data Controller</h2>
            <p className="text-gray-700 leading-relaxed">
              The data controller is Local Emergency Locksmith, a sole trader based in Coventry,
              West Midlands. For any data-related enquiries, contact us at{' '}
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="font-bold text-[#0F1B2D] hover:text-[#FFB800] transition-colors"
              >
                {SITE_CONFIG.email}
              </a>
              .
            </p>
          </section>

          {/* What Data We Collect */}
          <section className="mb-10">
            <h2 className="text-2xl font-black text-[#0F1B2D] mb-4">What Data We Collect</h2>

            <h3 className="text-lg font-bold text-[#0F1B2D] mb-3">Contact Form Data</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              When you submit our contact form, we collect:
            </p>
            <ul className="space-y-2 mb-6">
              {['Your name', 'Phone number', 'Postcode', 'Message / description of your enquiry'].map((item) => (
                <li key={item} className="flex items-start gap-3">
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
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-lg font-bold text-[#0F1B2D] mb-3">Analytics Data (Cookies)</h3>
            <p className="text-gray-700 leading-relaxed">
              We use Google Analytics 4 (GA4) to understand how visitors use our website. GA4
              collects anonymised data including pages visited, time spent on site, device type,
              and approximate location. This data is processed by Google and cannot be used to
              personally identify you. We also use essential session cookies required for the
              website to function correctly.
            </p>
          </section>

          {/* How We Use Your Data */}
          <section className="mb-10">
            <h2 className="text-2xl font-black text-[#0F1B2D] mb-4">How We Use Your Data</h2>
            <div className="space-y-3">
              {[
                {
                  purpose: 'Respond to your enquiry',
                  detail:
                    'We use your name, phone number, postcode, and message to respond to your locksmith enquiry and arrange a visit if needed.',
                },
                {
                  purpose: 'Improve our website',
                  detail:
                    'We use anonymised analytics data to understand which pages are most useful and improve the overall experience.',
                },
              ].map((item) => (
                <div
                  key={item.purpose}
                  className="bg-[#F7F7F5] rounded-xl p-5 border border-gray-100"
                >
                  <h3 className="font-bold text-[#0F1B2D] mb-1">{item.purpose}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Legal Basis */}
          <section className="mb-10">
            <h2 className="text-2xl font-black text-[#0F1B2D] mb-4">Legal Basis for Processing</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We process your personal data on the following legal bases under UK GDPR:
            </p>
            <ul className="space-y-2">
              {[
                'Legitimate interest — to respond to your enquiry and provide our locksmith services.',
                'Consent — for analytics cookies (Google Analytics 4). You can withdraw consent at any time by clearing your browser cookies.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
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
                  <span className="text-gray-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Who We Share Data With */}
          <section className="mb-10">
            <h2 className="text-2xl font-black text-[#0F1B2D] mb-4">Who We Share Your Data With</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We do not sell your data to any third party. Your data is only shared with:
            </p>
            <ul className="space-y-2">
              {[
                'Google Analytics — anonymised website usage data for analytics purposes.',
                'Resend — our email service provider, used to deliver contact form submissions to us securely.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
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
                  <span className="text-gray-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Cookies */}
          <section className="mb-10">
            <h2 className="text-2xl font-black text-[#0F1B2D] mb-4">Cookies</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-[#0F1B2D] text-white">
                    <th className="text-left px-4 py-3 font-bold">Cookie</th>
                    <th className="text-left px-4 py-3 font-bold">Provider</th>
                    <th className="text-left px-4 py-3 font-bold">Purpose</th>
                    <th className="text-left px-4 py-3 font-bold">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      cookie: '_ga, _ga_*',
                      provider: 'Google Analytics 4',
                      purpose: 'Distinguish unique visitors, track sessions',
                      duration: 'Up to 2 years',
                    },
                    {
                      cookie: 'Session cookie',
                      provider: 'Essential',
                      purpose: 'Required for website functionality',
                      duration: 'Session',
                    },
                  ].map((row) => (
                    <tr key={row.cookie} className="border-t border-gray-200">
                      <td className="px-4 py-3 font-medium text-[#0F1B2D]">{row.cookie}</td>
                      <td className="px-4 py-3 text-gray-600">{row.provider}</td>
                      <td className="px-4 py-3 text-gray-600">{row.purpose}</td>
                      <td className="px-4 py-3 text-gray-600">{row.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Data Retention */}
          <section className="mb-10">
            <h2 className="text-2xl font-black text-[#0F1B2D] mb-4">Data Retention</h2>
            <p className="text-gray-700 leading-relaxed">
              We retain personal data collected through our contact form for a maximum of{' '}
              <strong>12 months</strong> from the date of your enquiry. After this period, your
              data is permanently deleted. Analytics data is retained in accordance with Google
              Analytics&apos; default retention settings.
            </p>
          </section>

          {/* Your Rights */}
          <section className="mb-10">
            <h2 className="text-2xl font-black text-[#0F1B2D] mb-4">
              Your Rights Under UK GDPR
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You have the following rights regarding your personal data:
            </p>
            <div className="space-y-3">
              {[
                {
                  right: 'Right of access',
                  desc: 'Request a copy of the personal data we hold about you.',
                },
                {
                  right: 'Right to rectification',
                  desc: 'Request correction of any inaccurate or incomplete data.',
                },
                {
                  right: 'Right to erasure',
                  desc: 'Request deletion of your personal data where there is no compelling reason for its continued processing.',
                },
                {
                  right: 'Right to restrict processing',
                  desc: 'Request that we limit how we use your data.',
                },
                {
                  right: 'Right to data portability',
                  desc: 'Request your data in a structured, commonly used, machine-readable format.',
                },
                {
                  right: 'Right to object',
                  desc: 'Object to processing based on legitimate interest.',
                },
              ].map((item) => (
                <div
                  key={item.right}
                  className="flex items-start gap-3 bg-[#F7F7F5] rounded-xl px-5 py-4 border border-gray-100"
                >
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
                  <div>
                    <span className="font-bold text-[#0F1B2D]">{item.right}</span>
                    <span className="text-gray-600"> — {item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact for Data Requests */}
          <section className="mb-10">
            <h2 className="text-2xl font-black text-[#0F1B2D] mb-4">
              Contact for Data Requests
            </h2>
            <div className="bg-[#0F1B2D] rounded-xl p-6 border border-white/10">
              <p className="text-white/80 leading-relaxed mb-4">
                To exercise any of your rights, or if you have questions about how we handle your
                data, please contact us:
              </p>
              <div className="space-y-2">
                <p className="text-white">
                  <span className="text-[#FFB800] font-bold">Email:</span>{' '}
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="text-white hover:text-[#FFB800] transition-colors"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </p>
                <p className="text-white">
                  <span className="text-[#FFB800] font-bold">Phone:</span>{' '}
                  <a
                    href={`tel:${SITE_CONFIG.phoneTel}`}
                    className="text-white hover:text-[#FFB800] transition-colors"
                  >
                    {SITE_CONFIG.phone}
                  </a>
                </p>
              </div>
              <p className="text-white/60 text-sm mt-4">
                We will respond to all data requests within 30 days. If you are not satisfied
                with our response, you have the right to lodge a complaint with the Information
                Commissioner&apos;s Office (ICO) at{' '}
                <a
                  href="https://ico.org.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FFB800] hover:underline"
                >
                  ico.org.uk
                </a>
                .
              </p>
            </div>
          </section>
        </div>
      </article>

      <CTABlock />
    </>
  )
}
