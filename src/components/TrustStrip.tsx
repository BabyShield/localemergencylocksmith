import { PoundSterling, Ban, MapPin, Clock } from 'lucide-react'

// Calm, static trust row — no marquee, no emoji. Four claims, stated once.
const TRUST_ITEMS = [
  { Icon: PoundSterling, text: 'No VAT — save 20%' },
  { Icon: Ban, text: 'No call-out fee' },
  { Icon: MapPin, text: 'Local & independent' },
  { Icon: Clock, text: '24/7 — 365 days' },
]

export default function TrustStrip() {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-2.5">
        <div className="grid grid-cols-2 md:flex md:justify-between gap-y-1.5 gap-x-4">
          {TRUST_ITEMS.map(({ Icon, text }) => (
            <span key={text} className="flex items-center gap-2 text-[13px] font-semibold text-[#0F1B2D]">
              <Icon className="w-4 h-4 text-[#FFB800] flex-shrink-0" aria-hidden="true" />
              <span>{text}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
