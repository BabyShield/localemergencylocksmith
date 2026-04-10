import fs from 'fs'
import path from 'path'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAreaBySlug, getAreaNeighbours } from '@/data/areas'
import { SITE_CONFIG } from '@/data/config'
import HeroSection from '@/components/HeroSection'
import CTABlock from '@/components/CTABlock'
import FAQSection from '@/components/FAQSection'
import DynamicMapEmbed from '@/components/DynamicMapEmbed'
import SchemaMarkup from '@/components/SchemaMarkup'

// Use ISG/SSR for the long-tail street pages to avoid massive build times
// We do not export generateStaticParams here so they are generated on demand and cached.

interface Props {
  params: Promise<{ slug: string; streetSlug: string }>
}

function getStreetData(areaSlug: string) {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'streets', `${areaSlug}.json`)
    const data = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (e) {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, streetSlug } = await params
  const area = getAreaBySlug(slug)
  const streetData = getStreetData(slug)
  
  if (!area || !streetData) return {}

  const street = streetData.streets.find((s: any) => s.slug === streetSlug)
  if (!street) return {}

  const title = `Locksmith ${street.name}, ${area.name} | Emergency 24/7 Response`
  const description = `Locked out on ${street.name} in ${area.name}? Local emergency locksmith, ${area.responseTime} response. No VAT, no call-out fee. Call ${SITE_CONFIG.phone} now.`

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_CONFIG.domain}/areas/${slug}/streets/${streetSlug}`,
    },
    robots: { index: false, follow: true },
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.domain}/areas/${slug}/streets/${streetSlug}`,
      images: [
        {
          url: `${SITE_CONFIG.domain}/api/og?title=${encodeURIComponent(`Locksmith on ${street.name}`)}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}

export default async function AreaStreetPage({ params }: Props) {
  const { slug, streetSlug } = await params
  const area = getAreaBySlug(slug)
  const streetData = getStreetData(slug)
  
  if (!area || !streetData) notFound()

  const street = streetData.streets.find((s: any) => s.slug === streetSlug)
  if (!street) notFound()

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_CONFIG.domain },
      { '@type': 'ListItem', position: 2, name: 'Areas', item: `${SITE_CONFIG.domain}/areas` },
      { '@type': 'ListItem', position: 3, name: area.name, item: `${SITE_CONFIG.domain}/areas/${slug}` },
      { '@type': 'ListItem', position: 4, name: street.name, item: `${SITE_CONFIG.domain}/areas/${slug}/streets/${streetSlug}` },
    ],
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'Locksmith',
    name: `Locksmith Near ${street.name}, ${area.name}`,
    telephone: SITE_CONFIG.phoneTel,
    areaServed: {
      '@type': 'Place',
      name: `${street.name}, ${area.name}`
    }
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `How fast can a locksmith arrive at ${street.name}?`,
        acceptedAnswer: { '@type': 'Answer', text: `We typically arrive at ${street.name} in ${area.responseTime}.` }
      },
      {
        '@type': 'Question',
        name: `Do you charge a call-out fee for properties on ${street.name}?`,
        acceptedAnswer: { '@type': 'Answer', text: `No. We never charge a call-out fee to visit ${street.name} or anywhere in ${area.name}.` }
      }
    ]
  }

  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} />
      <SchemaMarkup schema={localBusinessSchema} />
      <SchemaMarkup schema={faqSchema} />

      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 py-3 text-sm text-gray-500">
        <Link href="/" className="hover:text-[#FFB800]">Home</Link>
        <span className="mx-2">›</span>
        <Link href="/areas" className="hover:text-[#FFB800]">Areas</Link>
        <span className="mx-2">›</span>
        <Link href={`/areas/${slug}`} className="hover:text-[#FFB800]">{area.name}</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-800 font-medium">{street.name}</span>
      </nav>

      <HeroSection
        heading={`Locksmith ${street.name}, ${area.name}`}
        subheading={`Providing 24/7 locksmith services tailored for ${street.name} and the ${area.name} area. ${area.responseTime} response.`}
        areaName={area.name}
      />

      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-[#0F1B2D] mb-6">
            Locksmith Covering {street.name}, {area.name}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you live on or near <strong>{street.name}</strong> in {area.name} and need urgent locksmith assistance, call me directly.
            I can usually reach this part of {area.name} in {area.responseTime} because I know the local roads inside out.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Unlike national call centres, my emergency lockout service is VAT-free and has zero call-out charges. 
            Whether your property on {street.name} has a traditional mortice lock on an older wood door, or a modern uPVC multipoint locking system, I carry the right tools and parts.
          </p>

          <div className="bg-[#F7F7F5] rounded-2xl p-6 mb-8 border border-gray-100">
             <h3 className="text-xl font-bold mb-3">Why Choose a Local Expert for {street.name}?</h3>
             <ul className="space-y-3 text-gray-700">
               <li>📍 <strong>Fast Navigation:</strong> I bypass main road traffic using local cut-throughs to reach {street.name} quickly.</li>
               <li>💷 <strong>Clear Pricing:</strong> Quoted upfront, zero VAT, zero hidden fees.</li>
               <li>🏠 <strong>Architecture Knowledge:</strong> Understands the common door types around {area.name} ({area.postcode}).</li>
             </ul>
          </div>

          <div className="mb-8">
            <DynamicMapEmbed streetName={street.name} areaName={area.name} />
          </div>

          <div className="text-center">
            <a
              href={`tel:${SITE_CONFIG.phoneTel}`}
              className="inline-flex flex-col items-center bg-[#FFB800] hover:bg-[#FFC933] text-[#0F1B2D] px-8 py-4 rounded-xl font-black text-xl transition-colors shadow"
            >
              <span className="text-sm font-bold uppercase tracking-widest text-[#0F1B2D]/70">Call me now for {street.name}</span>
              <span className="text-2xl">{SITE_CONFIG.phone}</span>
            </a>
          </div>
        </div>
      </section>

      <CTABlock
        heading={`Locked out near ${street.name}?`}
        subtext={`Available 24/7 — ${area.responseTime} response for ${area.name}. No VAT, no call-out fee.`}
      />
    </>
  )
}
