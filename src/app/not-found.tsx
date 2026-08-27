import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_CONFIG } from '@/data/config'
import { DoorOpen, KeyRound, MapPin, PoundSterling } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-black text-[#0F1B2D] mb-3">
          Page Not Found &mdash; But I&apos;m Still Here
        </h1>
        <p className="text-gray-500 text-lg mb-8">
          Looking for an emergency locksmith in Coventry? You&apos;re in the right place.
        </p>

        {/* Emergency CTA — conversion-focused */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0A1628] via-[#0F1B2D] to-[#162438] text-white rounded-2xl p-8 mb-8">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-[#FFB800]/5 rounded-full blur-3xl" />
          <div className="relative">
            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 mb-4">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="text-sm font-medium text-gray-200">Available Now &mdash; 24/7</span>
            </div>

            <p className="text-gray-300 mb-6">
              Locked out right now? Don&apos;t worry about the broken link. Just call me.
            </p>

            <a
              href={`tel:${SITE_CONFIG.phoneTel}`}
              aria-label={`Call Local Emergency Locksmith on ${SITE_CONFIG.phone}`}
              className="inline-flex flex-col items-center bg-[#FFB800] hover:bg-[#FFC933] text-[#0F1B2D] font-black text-xl px-10 py-5 rounded-2xl transition-all shadow-[0_4px_24px_rgba(255,184,0,0.3)] hover:shadow-[0_4px_40px_rgba(255,184,0,0.5)] hover:scale-[1.02]"
            >
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#0F1B2D]/60">Call Now</span>
              <span className="text-2xl">{SITE_CONFIG.phone}</span>
            </a>

            <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 mt-5 text-sm text-gray-400">
              <span>No VAT</span>
              <span>&bull;</span>
              <span>No call-out fee</span>
              <span>&bull;</span>
              <span>From &pound;59</span>
            </div>
          </div>
        </div>

        {/* Quick service links */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <Link
            href="/services/emergency-lockout"
            className="bg-white border border-gray-200 hover:border-[#FFB800] rounded-xl p-4 text-left transition-all hover:shadow-sm"
          >
            <DoorOpen className="w-6 h-6 text-[#0F1B2D]" aria-hidden="true" />
            <p className="font-bold text-[#0F1B2D] text-sm mt-2">Emergency Lockout</p>
            <p className="text-[#FFB800] font-black text-sm">From &pound;59</p>
          </Link>
          <Link
            href="/services/lock-change"
            className="bg-white border border-gray-200 hover:border-[#FFB800] rounded-xl p-4 text-left transition-all hover:shadow-sm"
          >
            <KeyRound className="w-6 h-6 text-[#0F1B2D]" aria-hidden="true" />
            <p className="font-bold text-[#0F1B2D] text-sm mt-2">Lock Change</p>
            <p className="text-[#FFB800] font-black text-sm">From &pound;69</p>
          </Link>
          <Link
            href="/areas"
            className="bg-white border border-gray-200 hover:border-[#FFB800] rounded-xl p-4 text-left transition-all hover:shadow-sm"
          >
            <MapPin className="w-6 h-6 text-[#0F1B2D]" aria-hidden="true" />
            <p className="font-bold text-[#0F1B2D] text-sm mt-2">Areas I Cover</p>
            <p className="text-gray-500 text-xs">78 areas across Coventry</p>
          </Link>
          <Link
            href="/prices"
            className="bg-white border border-gray-200 hover:border-[#FFB800] rounded-xl p-4 text-left transition-all hover:shadow-sm"
          >
            <PoundSterling className="w-6 h-6 text-[#0F1B2D]" aria-hidden="true" />
            <p className="font-bold text-[#0F1B2D] text-sm mt-2">Pricing</p>
            <p className="text-gray-500 text-xs">No VAT, no hidden charges</p>
          </Link>
        </div>

        <Link
          href="/"
          className="text-[#0F1B2D] font-bold text-sm hover:text-[#FFB800] transition-colors"
        >
          &larr; Back to homepage
        </Link>
      </div>
    </section>
  )
}
