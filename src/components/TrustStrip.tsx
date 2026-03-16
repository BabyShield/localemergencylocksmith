const TRUST_ITEMS = [
  { icon: '💷', text: 'No VAT' },
  { icon: '🚫', text: 'No Call-Out Fee' },
  { icon: '📍', text: 'Local Independent Locksmith' },
  { icon: '🕐', text: '24/7 Emergency' },
  { icon: '⚡', text: '15-30 Min Response' },
  { icon: '✅', text: 'No Hidden Charges' },
  { icon: '🗺️', text: 'All Coventry Postcodes' },
]

export default function TrustStrip() {
  return (
    <div className="bg-[#FFB800] text-[#0F1B2D] py-3 overflow-x-auto">
      <div className="max-w-6xl mx-auto px-4 flex gap-5 md:gap-8 flex-wrap md:justify-center text-sm md:text-base font-bold whitespace-nowrap">
        {TRUST_ITEMS.map((item) => (
          <span key={item.text} className="flex items-center gap-2">
            <span>{item.icon}</span>
            <span>{item.text}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
