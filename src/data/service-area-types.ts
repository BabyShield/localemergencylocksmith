export const SERVICE_AREA_SLUGS = [
  'emergency-lockout',
  'lock-change',
  'upvc-lock-repair',
  'boarding-up',
  'lock-upgrade',
] as const

export type ServiceAreaSlug = (typeof SERVICE_AREA_SLUGS)[number]
