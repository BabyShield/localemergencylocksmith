const PRICES = [
  { service: 'Emergency lockout', price: '£59' },
  { service: 'Lock change (standard)', price: '£69' },
  { service: 'Lock change (BS3621 insurance-approved)', price: '£79' },
  { service: 'uPVC lock repair', price: '£59' },
  { service: 'uPVC lock replacement', price: '£89' },
  { service: 'Boarding up (emergency)', price: '£79' },
  { service: 'Window lock repair', price: '£49' },
  { service: 'Security survey', price: 'FREE' },
]

export default function PriceTable() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 text-center">
          Transparent Pricing — No VAT, No Surprises
        </h2>
        <p className="text-gray-600 text-center mb-8">
          The price I quote is the price you pay. No VAT. No call-out fee. No extra charge for evenings or weekends.
        </p>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="bg-green-800 text-white">
                <th className="text-left px-6 py-3 font-bold">Service</th>
                <th className="text-right px-6 py-3 font-bold">Price From</th>
              </tr>
            </thead>
            <tbody>
              {PRICES.map((row, i) => (
                <tr
                  key={row.service}
                  className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                >
                  <td className="px-6 py-3 text-gray-800">{row.service}</td>
                  <td className={`px-6 py-3 text-right font-black ${row.price === 'FREE' ? 'text-green-700' : 'text-green-800'} text-lg`}>
                    {row.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-gray-500 text-sm mt-4 text-center">
          * No VAT &bull; No call-out fee &bull; Price includes labour &bull; Evening/weekend: no extra charge
        </p>
      </div>
    </section>
  )
}
