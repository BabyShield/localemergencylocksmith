const BRANDS = [
  'Yale',
  'ERA',
  'Avocet ABS',
  'Ultion',
  'Union',
  'Garrison',
  'Mul-T-Lock',
  'Brisant',
]

export default function LockBrands() {
  return (
    <section className="py-8 px-4 bg-white border-t border-b border-gray-100">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
          Locks I Carry &amp; Fit
        </p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {BRANDS.map((brand) => (
            <span
              key={brand}
              className="text-sm font-bold text-gray-500 hover:text-[#0F1B2D] transition-colors"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
