import type { Metadata } from 'next'
import { SITE_CONFIG, GOOGLE_REVIEWS } from '@/data/config'

export const metadata: Metadata = {
  title: 'Leave a Review | Local Emergency Locksmith',
  description: 'Happy with my service? Leave a Google review — it helps other Coventry residents find a trusted local locksmith.',
  robots: { index: false, follow: false },
}

export default function ReviewPage() {
  // Prefers the write-review deep link (needs the real Place ID in config);
  // falls back to the profile URL, then a branded search.
  const googleReviewUrl = GOOGLE_REVIEWS.placeId
    ? `https://search.google.com/local/writereview?placeid=${GOOGLE_REVIEWS.placeId}`
    : GOOGLE_REVIEWS.profileUrl ||
      'https://www.google.com/search?q=Local+Emergency+Locksmith+Coventry'

  return (
    <section className="py-16 px-4">
      <div className="max-w-xl mx-auto text-center">
        <div className="text-5xl mb-6">&#11088;</div>
        <h1 className="text-3xl font-black text-[#0F1B2D] mb-4">
          Thank You for Choosing Me
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          If you were happy with the service, a quick Google review would really help
          other people in Coventry find a trusted local locksmith.
        </p>

        <a
          href={googleReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#FFB800] text-[#0F1B2D] font-black text-lg px-10 py-4 rounded-lg hover:bg-[#FFC933] transition-colors mb-6"
        >
          Leave a Google Review
        </a>

        <p className="text-gray-500 text-sm mb-12">
          Takes about 30 seconds — just tap the stars and write a sentence or two about your experience.
        </p>

        {/* Tips for a helpful review */}
        <div className="bg-[#F7F7F5] rounded-xl p-6 text-left border border-gray-200">
          <p className="font-bold text-[#0F1B2D] mb-3">What makes a helpful review:</p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex gap-2">
              <span className="text-[#FFB800] font-bold">&#10003;</span>
              What brought you to call me (lockout, lock change, repair?)
            </li>
            <li className="flex gap-2">
              <span className="text-[#FFB800] font-bold">&#10003;</span>
              How quickly I arrived
            </li>
            <li className="flex gap-2">
              <span className="text-[#FFB800] font-bold">&#10003;</span>
              How the job went
            </li>
            <li className="flex gap-2">
              <span className="text-[#FFB800] font-bold">&#10003;</span>
              Your area (e.g. &quot;called from Earlsdon&quot; or &quot;locked out in Tile Hill&quot;)
            </li>
          </ul>
        </div>

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
