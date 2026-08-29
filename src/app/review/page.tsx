import type { Metadata } from 'next'
import { SITE_CONFIG, GOOGLE_REVIEWS } from '@/data/config'

export const metadata: Metadata = {
  title: 'Share Service Feedback | Local Emergency Locksmith',
  description: 'Send honest feedback about your genuine experience with Local Emergency Locksmith.',
  robots: { index: false, follow: true },
}

export default function ReviewPage() {
  // Publish a review destination only after its business identity is verified.
  const googleReviewUrl = GOOGLE_REVIEWS.placeId
    ? `https://search.google.com/local/writereview?placeid=${GOOGLE_REVIEWS.placeId}`
    : GOOGLE_REVIEWS.profileUrl

  return (
    <section className="py-16 px-4">
      <div className="max-w-xl mx-auto text-center">
        <div className="text-5xl mb-6" aria-hidden="true">&#11088;</div>
        <h1 className="text-3xl font-black text-[#0F1B2D] mb-4">
          Thank You for Choosing Me
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          {googleReviewUrl
            ? 'If you used my service, you can share an honest Google review about your genuine experience. Positive, negative, or mixed feedback is welcome.'
            : 'The Google review destination is not published while its public business details are being verified. You can still send honest feedback directly by email.'}
        </p>

        {googleReviewUrl ? (
          <>
            <a
              href={googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#FFB800] text-[#0F1B2D] font-black text-lg px-10 py-4 rounded-lg hover:bg-[#FFC933] transition-colors mb-6"
            >
              Leave a Google Review
            </a>

            <p className="text-gray-500 text-sm mb-12">
              Please use your own words and leave only feedback based on work you personally experienced.
            </p>

            {/* Neutral guidance: do not steer the rating or request specified review content. */}
            <div className="bg-[#F7F7F5] rounded-xl p-6 text-left border border-gray-200">
              <p className="font-bold text-[#0F1B2D] mb-3">Before you post</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Please do not include private security information such as your full address,
                alarm or access codes, key details, or proof-of-occupancy documents. Reviews must
                be voluntary and must not be exchanged for a discount, payment, or other incentive.
              </p>
            </div>
          </>
        ) : (
          <a
            href={`mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent('Service feedback')}`}
            className="inline-block bg-[#FFB800] text-[#0F1B2D] font-black text-lg px-10 py-4 rounded-lg hover:bg-[#FFC933] transition-colors mb-6"
          >
            Send Feedback by Email
          </a>
        )}

        {/* Contact info */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm mb-2">Need me again? Save this number:</p>
          <a
            href={`tel:${SITE_CONFIG.phoneTel}`}
            className="text-2xl font-black text-[#0F1B2D] hover:text-[#FFB800] transition-colors"
          >
            {SITE_CONFIG.phone}
          </a>
          <p className="text-gray-400 text-xs mt-1">24/7 — No VAT — No call-out fee</p>
        </div>
      </div>
    </section>
  )
}
