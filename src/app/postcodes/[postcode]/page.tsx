import { AREAS } from '@/data/areas'
import { SITE_CONFIG } from '@/data/config'
import { Metadata } from 'next'
import Link from 'next/link'
import SchemaMarkup from '@/components/SchemaMarkup'
import CTABlock from '@/components/CTABlock'
import { MapPin, ArrowRight, ShieldCheck, Clock, CheckCircle } from 'lucide-react'
import { notFound } from 'next/navigation'

export const dynamic = 'force-static'
export const revalidate = false

export async function generateStaticParams() {
  const postcodes = new Set(AREAS.map(a => a.postcode.toLowerCase()))
  return Array.from(postcodes).map(postcode => ({ postcode }))
}

interface Props {
  params: Promise<{ postcode: string }>
}

// Honest response window derived from the postcode's actual areas — outlying
// districts must never inherit the Coventry "15-30 minutes" claim.
function responseRange(areas: { responseTime: string }[]): string {
  const nums = areas.flatMap((a) => (a.responseTime.match(/\d+/g) ?? []).map(Number))
  if (nums.length === 0) return SITE_CONFIG.responseTime
  return `${Math.min(...nums)}-${Math.max(...nums)} minutes`
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { postcode } = await params
  if (!postcode) return {}
  const upper = postcode.toUpperCase()
  const response = responseRange(AREAS.filter((a) => a.postcode.toLowerCase() === postcode))

  return {
    title: `Locksmith ${upper} | 24/7 | From £59`,
    description: `Emergency locksmith covering all of ${upper}. Locked out? I can be with you in ${response}. No VAT, no call-out fee. Call ${SITE_CONFIG.phone} now — available 24/7.`,
    keywords: `locksmith ${upper}, emergency locksmith ${upper}, locksmith near me ${upper}, 24/7 locksmith ${upper}, locked out ${upper}`,
    alternates: {
      canonical: `${SITE_CONFIG.domain}/postcodes/${postcode}`,
    },
    openGraph: {
      type: 'website',
      title: `Locksmith ${upper} | Emergency 24/7 | No VAT`,
      description: `Emergency locksmith covering all of ${upper}. ${response} response. No VAT, no call-out fee.`,
      url: `${SITE_CONFIG.domain}/postcodes/${postcode}`,
      images: [{ url: `${SITE_CONFIG.domain}/api/og?title=${encodeURIComponent(`Locksmith ${upper}`)}`, width: 1200, height: 630 }],
    },
  }
}

export default async function PostcodePage({ params }: Props) {
  const { postcode } = await params
  if (!postcode) notFound()
  const upper = postcode.toUpperCase()

  const relevantAreas = AREAS.filter(a => a.postcode.toLowerCase() === postcode)
  if (relevantAreas.length === 0) notFound()
  const response = responseRange(relevantAreas)

  // Two items in both JSON-LD and microdata — there is no /postcodes hub page.
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_CONFIG.domain },
      { '@type': 'ListItem', position: 2, name: `Locksmith ${upper}`, item: `${SITE_CONFIG.domain}/postcodes/${postcode}` },
    ],
  }

  // Service offered in this postcode, provided by the canonical business
  // entity from layout.tsx — no rating markup, no entity redefinition.
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Emergency locksmith',
    name: `Emergency Locksmith in ${upper}`,
    url: `${SITE_CONFIG.domain}/postcodes/${postcode}`,
    description: `Emergency locksmith serving all of ${upper}. ${response} response, 24/7, 365 days. No VAT, no call-out fee.`,
    provider: { '@id': `${SITE_CONFIG.domain}/#business` },
    areaServed: relevantAreas.map(area => ({
      '@type': 'Place',
      name: area.name,
      address: {
        '@type': 'PostalAddress',
        postalCode: area.postcode,
        addressCountry: 'GB',
      },
    })),
  }

  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} />
      <SchemaMarkup schema={serviceSchema} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 py-3 text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-0" itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <Link href="/" itemProp="item" className="hover:text-[#FFB800]"><span itemProp="name">Home</span></Link>
            <meta itemProp="position" content="1" />
          </li>
          <span className="mx-2" aria-hidden="true">›</span>
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <span><span itemProp="name" className="text-gray-800 font-medium">Locksmith {upper}</span></span>
            <meta itemProp="position" content="2" />
          </li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="relative pt-8 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0F1B2D]">
        <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFB800]/10 text-[#FFB800] border border-[#FFB800]/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFB800] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFB800]" />
              </span>
              <span className="text-sm font-semibold">Available Now in {upper}</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
              Locksmith <span className="text-[#FFB800]">{upper}</span>
            </h1>

            <p className="text-lg text-gray-300 max-w-xl leading-relaxed">
              I provide rapid emergency locksmith services across all {upper} locations. Locked out? I can be with you in {response} — no VAT, no call-out fee, same price 24/7.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${SITE_CONFIG.phoneTel}`}
                className="inline-flex justify-center items-center gap-2 bg-[#FFB800] hover:bg-amber-400 text-[#0F1B2D] px-8 py-4 rounded-xl font-black text-lg transition-all shadow-lg"
              >
                Call {SITE_CONFIG.phone}
              </a>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#FFB800]" />
                <span>BS3621 Approved</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#FFB800]" />
                <span>24/7 — 365 Days</span>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full max-w-sm">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-black text-white mb-2">Locked Out in {upper}?</h3>
              <p className="text-gray-400 text-sm mb-5">I answer personally — day or night. Free quote on the phone.</p>
              <a
                href={`tel:${SITE_CONFIG.phoneTel}`}
                className="block w-full bg-[#FFB800] hover:bg-amber-400 text-[#0F1B2D] text-center py-4 rounded-xl font-black text-xl transition-colors"
              >
                {SITE_CONFIG.phone}
              </a>
              <p className="text-xs text-center text-gray-500 mt-3 uppercase tracking-wider">
                No VAT · No Call-Out Fee · {response.replace(' minutes', ' min')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Areas covered */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-[#0F1B2D] mb-2 text-center">
            Areas I Cover in {upper}
          </h2>
          <p className="text-gray-600 text-center mb-10 max-w-xl mx-auto">
            I serve every neighbourhood, estate, and street within the {upper} postcode area.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {relevantAreas.map(area => (
              <Link
                key={area.slug}
                href={`/areas/${area.slug}`}
                className="group p-5 rounded-2xl bg-gray-50 border border-gray-200 hover:border-[#FFB800] hover:bg-white transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0F1B2D]/5 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FFB800]/10 transition-colors">
                    <MapPin className="w-5 h-5 text-[#0F1B2D] group-hover:text-[#FFB800]" />
                  </div>
                  <div>
                    <h3 className="font-black text-[#0F1B2D] mb-1">Locksmith {area.name}</h3>
                    <p className="text-gray-500 text-xs mb-2">{area.responseTime} response · {area.postcode}</p>
                    <div className="flex items-center text-[#FFB800] text-xs font-semibold group-hover:translate-x-1 transition-transform">
                      View coverage <ArrowRight className="w-3 h-3 ml-1" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-[#0F1B2D] mb-6">
            Why Choose a Local Locksmith in {upper}?
          </h2>
          <p className="text-gray-700 mb-6">
            I&apos;m a local independent locksmith — not a national call centre that sub-contracts to whoever is nearest. When you call me for the {upper} area, I answer personally, give you a fixed price on the phone, and I&apos;m at your door in {response}.
          </p>
          <ul className="space-y-4">
            {[
              'No call-out fee — ever. You only pay if I complete the job.',
              'No VAT — save 20% compared to VAT-registered national firms.',
              'Insurance-approved BS3621 locks available on request.',
              'Non-destructive entry — I always try to save your lock first.',
              '24/7 availability — same price at 3am as at 3pm.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#FFB800] flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTABlock
        heading={`Locked out in ${upper}? Call me now.`}
        subtext={`Available 24/7 — ${response} response across ${upper}. No VAT, no call-out fee.`}
      />
    </>
  )
}
