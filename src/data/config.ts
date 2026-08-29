export const SITE_CONFIG = {
  businessName: 'Local Emergency Locksmith',
  phone: '024 7522 4730',
  phoneTel: '+442475224730',
  email: 'info@localemergencylocksmith.co.uk',
  domain: 'https://www.localemergencylocksmith.co.uk',
  tagline: 'Coventry & Surrounding Areas',
  hours: '24/7 — 365 days a year',
  primaryCity: 'Coventry',
  colors: {
    primary: '#0F1B2D',
    accent: '#FFB800',
  },
} as const

// Compact provider node for Service schemas. The full identity graph is on the
// homepage; this keeps provider references self-contained without inventing an
// address or a LocalBusiness location.
export const SERVICE_PROVIDER_SCHEMA = {
  '@type': 'Organization',
  '@id': `${SITE_CONFIG.domain}/#business`,
  name: SITE_CONFIG.businessName,
  url: SITE_CONFIG.domain,
  telephone: SITE_CONFIG.phoneTel,
} as const

// One stable author identity for the visible Ross byline. Article markup links
// to the real About page rather than leaving the author as an unconnected name.
export const LOCKSMITH_AUTHOR_SCHEMA = {
  '@type': 'Person',
  '@id': `${SITE_CONFIG.domain}/about#ross`,
  name: 'Ross',
  jobTitle: 'Locksmith',
  url: `${SITE_CONFIG.domain}/about`,
  worksFor: { '@id': `${SITE_CONFIG.domain}/#business` },
} as const

// Bump only when page content genuinely changes — drives visible "last updated"
// dates and sitemap lastModified, so it must never be a build timestamp.
export const CONTENT_UPDATED = '2026-08-30'

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
  // Keep this blank until the public profile's trading name and relationship to
  // this website are verified from real-world business evidence. The supplied
  // profile currently displays a different name, so publishing its link would
  // create an unsupported identity association.
  profileUrl: '',
  placeId: '',
}
