import Link from 'next/link'
import { SITE_CONFIG } from '@/data/config'

export default function NotFound() {
  return (
    <section className="py-20 px-4 text-center">
      <div className="max-w-xl mx-auto">
        <h1 className="text-6xl font-black text-[#0F1B2D] mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for does not exist or has been moved.
        </p>

        {/* Emergency CTA — a locked-out customer hitting 404 should still be able to call */}
        <div className="bg-[#0F1B2D] text-white rounded-xl p-6 mb-8">
          <p className="text-lg font-bold mb-2">Locked out right now?</p>
          <p className="text-gray-300 text-sm mb-4">
            Don&apos;t worry about this page — just call me directly.
          </p>
          <a
            href={`tel:${SITE_CONFIG.phoneTel}`}
            className="inline-block bg-[#FFB800] text-[#0F1B2D] font-black text-xl px-8 py-4 rounded-lg hover:bg-[#FFC933] transition-colors"
          >
            Call {SITE_CONFIG.phone}
          </a>
          <p className="text-gray-400 text-xs mt-3">Available 24/7 — no call-out fee</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-[#0F1B2D] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#162438] transition-colors"
          >
            Go to Homepage
          </Link>
          <Link
            href="/areas"
            className="border-2 border-[#0F1B2D] text-[#0F1B2D] font-bold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Browse Areas
          </Link>
          <Link
            href="/services"
            className="border-2 border-[#0F1B2D] text-[#0F1B2D] font-bold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Our Services
          </Link>
        </div>
      </div>
    </section>
  )
}
