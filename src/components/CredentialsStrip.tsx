import { Phone, FileCheck2, Clock3, CreditCard } from 'lucide-react'

const CREDENTIALS = [
  { Icon: Phone, title: 'Direct Booking', sub: 'Speak to Albert' },
  { Icon: FileCheck2, title: 'Agreed Scope', sub: 'Before work starts' },
  { Icon: Clock3, title: 'Current ETA', sub: 'Confirmed by phone' },
  { Icon: CreditCard, title: 'Card Payments', sub: 'Cash or card — your choice' },
]

export default function CredentialsStrip() {
  return (
    <section className="py-8 px-4 bg-white border-y border-gray-100">
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {CREDENTIALS.map(({ Icon, title, sub }) => (
          <div key={title} className="flex flex-col items-center text-center gap-2">
            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-[#0F1B2D]/5">
              <Icon className="w-6 h-6 text-[#0F1B2D]" aria-hidden="true" />
            </span>
            <div>
              <p className="font-black text-[#0F1B2D] text-sm leading-tight">{title}</p>
              <p className="text-gray-500 text-xs mt-0.5">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
