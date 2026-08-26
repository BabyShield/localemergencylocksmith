import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_CONFIG } from '@/data/config'
import SchemaMarkup from '@/components/SchemaMarkup'

export const metadata: Metadata = {
  title: 'Contact — Local Emergency Locksmith Coventry | 024 7522 4730',
  description:
    'Contact Local Emergency Locksmith in Coventry. Available 24/7 — call 024 7522 4730 for immediate help or use the contact form.',
  keywords: 'contact locksmith coventry, locksmith phone number coventry, locksmith coventry 24/7, emergency locksmith contact warwickshire, call locksmith coventry',
  alternates: {
    canonical: `${SITE_CONFIG.domain}/contact`,
  },
  openGraph: {
    type: 'website',
    siteName: 'Local Emergency Locksmith',
    locale: 'en_GB',
    title: 'Contact — Local Emergency Locksmith Coventry | 024 7522 4730',
    description:
      'Contact Local Emergency Locksmith in Coventry. Available 24/7 — call 024 7522 4730 for immediate help or use the contact form.',
    url: `${SITE_CONFIG.domain}/contact`,
    images: [{ url: `${SITE_CONFIG.domain}/api/og?title=${encodeURIComponent('Contact Local Emergency Locksmith')}`, width: 1200, height: 630 }],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_CONFIG.domain },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: `${SITE_CONFIG.domain}/contact` },
  ],
}

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Local Emergency Locksmith',
  url: `${SITE_CONFIG.domain}/contact`,
}

export default function ContactPage() {
  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} />
      <SchemaMarkup schema={contactSchema} />

      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 py-3 text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-0" itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <Link href="/" itemProp="item" className="hover:text-[#FFB800]"><span itemProp="name">Home</span></Link>
            <meta itemProp="position" content="1" />
          </li>
          <span className="mx-2" aria-hidden="true">›</span>
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <span><span itemProp="name" className="text-gray-800 font-medium">Contact</span></span>
            <meta itemProp="position" content="2" />
          </li>
        </ol>
      </nav>

      <section className="py-12 px-4 text-white" style={{ background: '#0F1B2D' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-black mb-4">Contact Me</h1>
          <p className="text-gray-300 text-lg mb-6">
            For emergencies, call now — the fastest response is always by phone.
          </p>
          <a
            href={`tel:${SITE_CONFIG.phoneTel}`}
            className="inline-flex flex-col items-center bg-[#FFB800] hover:bg-[#FFC933] text-[#0F1B2D] px-8 py-4 rounded-xl font-black text-xl transition-colors shadow"
          >
            <span className="text-sm font-bold uppercase tracking-widest text-[#0F1B2D]/70">Call Now — 24/7</span>
            <span className="text-2xl">{SITE_CONFIG.phone}</span>
          </a>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Contact details */}
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-6">Get In Touch</h2>
            <div className="space-y-5">
              <div className="flex gap-4">
                <span className="text-2xl">📞</span>
                <div>
                  <p className="font-bold text-gray-900">Phone (emergencies)</p>
                  <a href={`tel:${SITE_CONFIG.phoneTel}`} className="text-[#0F1B2D] font-black text-xl hover:underline">
                    {SITE_CONFIG.phone}
                  </a>
                  <p className="text-sm text-gray-500 mt-1">Available {SITE_CONFIG.hours}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-2xl">✉️</span>
                <div>
                  <p className="font-bold text-gray-900">Email</p>
                  <a href={`mailto:${SITE_CONFIG.email}`} className="text-[#0F1B2D] hover:underline">
                    {SITE_CONFIG.email}
                  </a>
                  <p className="text-sm text-gray-500 mt-1">For non-urgent enquiries</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="font-bold text-gray-900">Service Area</p>
                  <p className="text-gray-700">Coventry, Nuneaton, Rugby, Leamington Spa, Warwick, Stratford-upon-Avon and all surrounding areas</p>
                  <Link href="/areas" className="text-[#0F1B2D] text-sm hover:underline mt-1 inline-block">
                    View all areas →
                  </Link>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-2xl">🕐</span>
                <div>
                  <p className="font-bold text-gray-900">Opening Hours</p>
                  <p className="text-gray-700 font-semibold">{SITE_CONFIG.hours}</p>
                  <p className="text-sm text-gray-500">Including bank holidays and Christmas</p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-[#F7F7F5] rounded-xl p-5 border border-gray-200">
              <p className="text-[#0F1B2D] font-semibold text-sm">
                ⚠️ <strong>For emergencies — please call, don&apos;t email.</strong> I check email
                during normal hours but I may not see it immediately if you are locked out at 2am.
                Call {SITE_CONFIG.phone} for an instant response.
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-6">Send a Message</h2>
            <p className="text-gray-600 text-sm mb-6">
              For non-urgent enquiries, quotes, or planned work — fill in the form and I&apos;ll get back
              to you within a few hours.
            </p>
            <form
              action="/api/contact"
              method="POST"
              className="space-y-4"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0F1B2D] focus:border-transparent"
                  placeholder="John Smith"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0F1B2D] focus:border-transparent"
                  placeholder="07700 000000"
                />
              </div>
              <div>
                <label htmlFor="postcode" className="block text-sm font-semibold text-gray-700 mb-1">
                  Your Postcode
                </label>
                <input
                  type="text"
                  id="postcode"
                  name="postcode"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0F1B2D] focus:border-transparent"
                  placeholder="CV1 1AA"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0F1B2D] focus:border-transparent"
                  placeholder="Describe what you need..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#0F1B2D] hover:bg-[#162438] text-white py-3 px-6 rounded-lg font-bold transition-colors min-h-[48px]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-8 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Service Area — Coventry & Warwickshire</h2>
          <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d78082.24540697!2d-1.5621!3d52.4081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4870b88b5d4fd3e5%3A0x3c69e4c8e0b6e85c!2sCoventry!5e0!3m2!1sen!2suk!4v1"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Local Emergency Locksmith service area — Coventry and Warwickshire"
            />
          </div>
        </div>
      </section>
    </>
  )
}
