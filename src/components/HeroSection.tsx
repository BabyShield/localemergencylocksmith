import { SITE_CONFIG } from '@/data/config'
import { UserRound, FileCheck2, Clock } from 'lucide-react'
import PPCHandler from './PPCHandler'

interface HeroSectionProps {
  heading: string
  subheading: string
  areaName?: string
  compact?: boolean
  // Evidence-governed pages confirm the current ETA by phone rather than
  // rendering a fixed journey-time promise.
  showResponseTime?: boolean
}

export default function HeroSection({
  heading,
  subheading,
  areaName,
  compact,
  showResponseTime = true,
}: HeroSectionProps) {
  return (
    <section className={`relative overflow-hidden ${compact ? 'py-10 md:py-14' : 'py-14 md:py-24'} px-4 text-white`}>
      <PPCHandler />
      {/* Background with gradient and subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#0F1B2D] to-[#162438]" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
      {/* Glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#FFB800]/5 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Availability badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-6">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
          </span>
          <span className="text-sm font-medium text-gray-200">Available Now — 24/7</span>
        </div>

        <h1 className={`font-black leading-[1.1] mb-5 ${compact ? 'text-3xl md:text-4xl' : 'text-4xl md:text-6xl'}`}>
          <span className="text-white">{heading.split('—')[0]}</span>
          {heading.includes('—') && (
            <span className="block text-[#FFB800] mt-1">{heading.split('—')[1]}</span>
          )}
          {!heading.includes('—') && heading.includes('?') && null}
        </h1>

        <p className={`text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed ${compact ? 'text-base md:text-lg' : 'text-lg md:text-xl'}`}>
          {subheading}
        </p>

        {/* CTA cluster */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
          <a
            href={`tel:${SITE_CONFIG.phoneTel}`}
            className="group relative inline-flex flex-col items-center bg-[#FFB800] hover:bg-[#FFC933] text-[#0F1B2D] px-10 py-5 rounded-2xl font-black transition-all duration-200 min-h-[72px] justify-center shadow-[0_4px_24px_rgba(255,184,0,0.3)] hover:shadow-[0_4px_32px_rgba(255,184,0,0.5)] hover:scale-[1.02]"
          >
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#0F1B2D]">Call Now — Free Quote</span>
            <span className="text-2xl md:text-3xl">{SITE_CONFIG.phone}</span>
          </a>
        </div>

        {/* Verifiable booking information, not unproved credential claims. */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-400">
          <span className="flex items-center gap-1.5">
            <UserRound className="w-4 h-4 text-green-500" aria-hidden="true" />
            Direct Booking
          </span>
          <span className="flex items-center gap-1.5">
            <FileCheck2 className="w-4 h-4 text-green-500" aria-hidden="true" />
            Scope Agreed Before Work
          </span>
          {showResponseTime && (
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-green-500" aria-hidden="true" />
              Current ETA Confirmed by Phone{areaName ? ` for ${areaName}` : ''}
            </span>
          )}
        </div>
      </div>
    </section>
  )
}
