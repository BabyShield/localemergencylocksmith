import type { Metadata } from 'next'
import Link from 'next/link'
import { ExternalLink, SearchCheck } from 'lucide-react'
import { GOOGLE_REVIEWS, SITE_CONFIG } from '@/data/config'
import SchemaMarkup from '@/components/SchemaMarkup'
import CTABlock from '@/components/CTABlock'

export const metadata: Metadata = {
  title: 'Customer Review Information | Coventry Locksmith',
  description:
    'How Local Emergency Locksmith handles public-feedback evidence without republishing unverified ratings or review extracts.',
  alternates: {
    canonical: `${SITE_CONFIG.domain}/testimonials`,
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    type: 'website',
    siteName: SITE_CONFIG.businessName,
    locale: 'en_GB',
    title: 'Customer Review Information | Coventry Locksmith',
    description: 'Review-information policy for source records, ratings and public profile verification.',
    url: `${SITE_CONFIG.domain}/testimonials`,
    images: [{ url: `${SITE_CONFIG.domain}/api/og?title=${encodeURIComponent('Customer Review Information')}`, width: 1200, height: 630 }],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_CONFIG.domain },
    { '@type': 'ListItem', position: 2, name: 'Review information', item: `${SITE_CONFIG.domain}/testimonials` },
  ],
}

export default function TestimonialsPage() {
  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} />

      <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto px-4 py-3 text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-0" itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <Link href="/" prefetch={false} itemProp="item" className="hover:text-[#FFB800]">
              <span itemProp="name">Home</span>
            </Link>
            <meta itemProp="position" content="1" />
          </li>
          <li className="mx-2" aria-hidden="true" role="presentation">›</li>
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <span itemProp="name" className="font-medium text-gray-800">Review information</span>
            <meta itemProp="position" content="2" />
          </li>
        </ol>
      </nav>

      <section className="bg-[#0F1B2D] px-4 py-16 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <SearchCheck className="mx-auto mb-5 h-12 w-12 text-[#FFB800]" aria-hidden="true" />
          <h1 className="mb-5 text-3xl font-black md:text-4xl">Check Current Public Feedback</h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-300">
            Ratings and customer quotations can change and need a traceable source. This page does
            not reproduce review text or scores that cannot be matched to a current source record.
          </p>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-[#F7F7F5] p-8 text-center">
          <h2 className="mb-3 text-2xl font-black text-[#0F1B2D]">
            {GOOGLE_REVIEWS.profileUrl ? 'View the linked public profile' : 'Public profile verification in progress'}
          </h2>
          <p className="mx-auto mb-7 max-w-xl leading-relaxed text-gray-600">
            {GOOGLE_REVIEWS.profileUrl
              ? 'Open the profile directly to see the name, feedback and other business details that Google currently displays. Check that those details match the business you intend to contact.'
              : 'No profile link is published while its public trading name and relationship to this website are being verified.'}
          </p>
          {GOOGLE_REVIEWS.profileUrl && (
            <a
              href={GOOGLE_REVIEWS.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#0F1B2D] px-7 py-3 font-bold text-white transition-colors hover:bg-[#162438]"
            >
              Open public profile
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
          <p className="mt-5 text-sm text-gray-500">
            No rating or review count is asserted on this site while those values remain unverified in the release data.
          </p>
        </div>
      </section>

      <CTABlock
        heading="Need help with a lock?"
        subtext="Call with the full address and door symptoms for current availability, the ETA and price basis."
      />
    </>
  )
}
