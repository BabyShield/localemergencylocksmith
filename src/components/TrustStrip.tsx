const TRUST_ITEMS = [
  { icon: '💷', text: 'No VAT — Save 20%' },
  { icon: '🚫', text: 'No Call-Out Fee' },
  { icon: '📍', text: 'Local Independent' },
  { icon: '🕐', text: '24/7 Emergency' },
  { icon: '⚡', text: '15-30 Min Response' },
  { icon: '✅', text: 'No Hidden Charges' },
]

export default function TrustStrip() {
  return (
    <div className="bg-[#FFB800] text-[#0F1B2D] py-2.5 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex gap-6 md:gap-0 md:justify-between overflow-x-auto md:overflow-visible scrollbar-hide">
          {TRUST_ITEMS.map((item) => (
            <span key={item.text} className="flex items-center gap-2 whitespace-nowrap text-sm md:text-[13px] font-bold">
              <span className="text-base">{item.icon}</span>
              <span>{item.text}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
