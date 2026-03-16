const TRUST_ITEMS = [
  'No VAT',
  'No Call-Out Fee',
  'Local Independent Locksmith',
  '24/7 Emergency',
  '15-30 Min Response',
  'No Hidden Charges',
  'All Coventry Postcodes',
]

export default function TrustStrip() {
  return (
    <div className="bg-green-800 text-white py-2 overflow-x-auto">
      <div className="max-w-6xl mx-auto px-4 flex gap-4 md:gap-6 flex-wrap md:justify-center text-sm font-medium whitespace-nowrap">
        {TRUST_ITEMS.map((item) => (
          <span key={item} className="flex items-center gap-1">
            <span className="text-green-300 font-bold">✓</span> {item}
          </span>
        ))}
      </div>
    </div>
  )
}
