import { ShieldCheck, Umbrella, BadgeCheck, CreditCard } from 'lucide-react'

// Visual proof strip for the claims already made on the about page —
// credentials land far better as badges than buried in prose.
const CREDENTIALS = [
  { Icon: ShieldCheck, title: 'DBS-Checked', sub: 'Background checked' },
  { Icon: Umbrella, title: 'Fully Insured', sub: 'Public liability cover' },
  { Icon: BadgeCheck, title: 'ID On Arrival', sub: 'You know who I am' },
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
