export const SITE_CONFIG = {
  businessName: 'Local Emergency Locksmith',
  phone: '024 7522 4730',
  phoneTel: '+442475224730',
  email: 'info@localemergencylocksmith.co.uk',
  domain: 'https://www.localemergencylocksmith.co.uk',
  tagline: 'Coventry & Surrounding Areas',
  hours: '24/7 — 365 days a year',
  responseTime: '15-30 minutes',
  primaryCity: 'Coventry',
  colors: {
    primary: '#0F1B2D',
    accent: '#FFB800',
  },
} as const

// Bump only when page content genuinely changes — drives visible "last updated"
// dates and sitemap lastModified, so it must never be a build timestamp.
export const CONTENT_UPDATED = '2026-08-29'

// Real Google Business Profile figures, maintained by hand to exactly match the
// live profile. All-null until real values are supplied — UI must render nothing
// (no rating, no count) rather than a placeholder when these are null/empty.
export const GOOGLE_REVIEWS: {
  rating: number | null
  count: number | null
  profileUrl: string
  placeId: string
} = {
  rating: null,
  count: null,
  // GBP: "Coventry 24/7 Locksmith" (kgmid /g/11z204xvk1) — owner's share link.
  // Fill rating/count/placeId with the live profile's real values only.
  profileUrl: 'https://share.google/bdboAzi1gJOpOjPck',
  placeId: '',
}
