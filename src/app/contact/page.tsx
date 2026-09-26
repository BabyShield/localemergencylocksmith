import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_CONFIG } from '@/data/config'
import { whatsappHref } from '@/lib/enquiry'
import Breadcrumbs from '@/components/Breadcrumbs'
import SchemaMarkup from '@/components/SchemaMarkup'
import CallbackForm from '@/components/CallbackForm'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Coventry Locksmith | 024 7522 4730',
  description:
    'Contact Local Emergency Locksmith in Coventry. Available 24/7 — call 024 7522 4730 for the current ETA and price, or use the non-urgent enquiry form.',
  keywords: 'contact locksmith coventry, locksmith phone number coventry, locksmith coventry 24/7, emergency locksmith contact warwickshire, call locksmith coventry',
  alternates: {
    canonical: `${SITE_CONFIG.domain}/contact`,
  },
  openGraph: {
    type: 'website',
    siteName: 'Local Emergency Locksmith',
    locale: 'en_GB',
    title: 'Contact Coventry Locksmith | 024 7522 4730',
    description:
      'Contact Local Emergency Locksmith in Coventry. Available 24/7 — call for the current ETA and price, or use the non-urgent enquiry form.',
    url: `${SITE_CONFIG.domain}/contact`,
    images: [{ url: `${SITE_CONFIG.domain}/api/og?title=${encodeURIComponent('Contact Local Emergency Locksmith')}`, width: 1200, height: 630 }],
  },
}


const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Local Emergency Locksmith',
  url: `${SITE_CONFIG.domain}/contact`,
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ submitted?: string | string[] }>
}) {
  const params = await searchParams
  const submitted = Array.isArray(params.submitted) ? params.submitted[0] : params.submitted

  return (
    <>
      <SchemaMarkup schema={contactSchema} />

      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Contact', href: '/contact' },
        ]}
      />

      <section className="py-12 px-4 text-white" style={{ background: '#0F1B2D' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-black mb-4">Contact Me</h1>
          <p className="text-gray-300 text-lg mb-6">
            For emergencies, call to confirm current availability, the ETA, and the price basis.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href={`tel:${SITE_CONFIG.phoneTel}`}
              data-track="contact-hero"
              className="inline-flex flex-col items-center bg-[#FFB800] hover:bg-[#FFC933] text-[#0F1B2D] px-8 py-4 rounded-xl font-black text-xl transition-colors shadow"
            >
              <span className="text-sm font-bold uppercase tracking-widest text-[#0F1B2D]/70">Call Now — 24/7</span>
              <span className="text-2xl">{SITE_CONFIG.phone}</span>
            </a>
            <a
              href={whatsappHref()}
              data-track="contact-hero"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#25D366] hover:bg-[#20BD5A] text-[#0F1B2D] px-8 py-4 rounded-xl font-black min-h-[72px]"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Contact details */}
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-6">Get In Touch</h2>
            <div className="space-y-5">
              <div className="flex gap-4">
                <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-[#0F1B2D]/5"><Phone className="w-5 h-5 text-[#0F1B2D]" aria-hidden="true" /></span>
                <div>
                  <p className="font-bold text-gray-900">Phone (emergencies)</p>
                  <a href={`tel:${SITE_CONFIG.phoneTel}`} className="text-[#0F1B2D] font-black text-xl hover:underline">
                    {SITE_CONFIG.phone}
                  </a>
                  <p className="text-sm text-gray-500 mt-1">Available {SITE_CONFIG.hours}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-[#0F1B2D]/5"><Mail className="w-5 h-5 text-[#0F1B2D]" aria-hidden="true" /></span>
                <div>
                  <p className="font-bold text-gray-900">Email</p>
                  <a href={`mailto:${SITE_CONFIG.email}`} className="text-[#0F1B2D] hover:underline">
                    {SITE_CONFIG.email}
                  </a>
                  <p className="text-sm text-gray-500 mt-1">For non-urgent enquiries</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-[#0F1B2D]/5"><MapPin className="w-5 h-5 text-[#0F1B2D]" aria-hidden="true" /></span>
                <div>
                  <p className="font-bold text-gray-900">Service Area</p>
                  <p className="text-gray-700">78 listed locations across Coventry and nearby parts of Warwickshire, Solihull, and the West Midlands</p>
                  <Link href="/areas" className="text-[#0F1B2D] text-sm hover:underline mt-1 inline-block">
                    View all areas →
                  </Link>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-[#0F1B2D]/5"><Clock className="w-5 h-5 text-[#0F1B2D]" aria-hidden="true" /></span>
                <div>
                  <p className="font-bold text-gray-900">Opening Hours</p>
                  <p className="text-gray-700 font-semibold">{SITE_CONFIG.hours}</p>
                  <p className="text-sm text-gray-500">Including bank holidays and Christmas</p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-[#F7F7F5] rounded-xl p-5 border border-gray-200">
              <p className="text-[#0F1B2D] font-semibold text-sm">
                <strong>For emergencies — please call, don&apos;t email.</strong> I check email
                during normal hours but I may not see it immediately if you are locked out at 2am.
                Call {SITE_CONFIG.phone} to confirm whether I can attend and the current ETA.
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div id="callback" className="scroll-mt-24">
            <h2 className="text-2xl font-black text-gray-900 mb-3">Request a callback</h2>
            <p className="text-gray-600 text-sm mb-4">
              A phone number is enough. For a lockout, call or WhatsApp so the current ETA can be confirmed straight away.
            </p>
            {submitted === '1' && (
              <p className="mb-4 rounded-lg bg-[#F7F7F5] border border-gray-200 p-4 text-sm font-semibold text-[#0F1B2D]" role="status">
                Callback request sent. If you are locked out, call {SITE_CONFIG.phone} as well.
              </p>
            )}
            {submitted === 'undelivered' && (
              <p className="mb-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-[#0F1B2D]" role="alert">
                The website could not deliver that message. Call {SITE_CONFIG.phone} or email {SITE_CONFIG.email}.
              </p>
            )}
            {submitted === 'invalid' && (
              <p className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">
                Enter a phone number I can call, then send the form again. Or call {SITE_CONFIG.phone}.
              </p>
            )}
            <CallbackForm source="contact" />
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
