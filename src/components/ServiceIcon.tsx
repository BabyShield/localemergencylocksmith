import { DoorOpen, KeyRound, Wrench, Hammer, ShieldCheck, Lock, type LucideIcon } from 'lucide-react'

// One consistent SVG icon per service — replaces the emoji that rendered
// differently on every device.
const ICONS: Record<string, LucideIcon> = {
  'emergency-lockout': DoorOpen,
  'lock-change': KeyRound,
  'upvc-lock-repair': Wrench,
  'boarding-up': Hammer,
  'lock-upgrade': ShieldCheck,
}

export default function ServiceIcon({
  slug,
  className = 'w-9 h-9',
}: {
  slug: string
  className?: string
}) {
  const Icon = ICONS[slug] ?? Lock
  return <Icon className={className} aria-hidden="true" />
}
