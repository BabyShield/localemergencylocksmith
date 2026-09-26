// Route-owned review dates for pages that do not have an authored record of
// their own. Keep these explicit: an unrelated area or article edit must not
// make every core or service URL look newly modified in the sitemap.
export const CORE_ROUTE_LAST_MODIFIED = {
  '/': '2026-08-31',
  '/areas': '2026-08-30',
  '/services': '2026-08-29',
  '/prices': '2026-08-29',
  '/contact': '2026-08-29',
  '/blog': '2026-09-08',
  '/about': '2026-08-31',
  '/faq': '2026-08-29',
} as const

// All five canonical service pages share one editorial template and were
// reviewed together. This date also owns their visible and schema review date.
export const SERVICE_GUIDES_REVIEWED_ON = '2026-09-18'

// The eight blog topic hubs were written and reviewed together, so one date
// owns their sitemap lastModified and their visible "reviewed" line.
export const BLOG_TOPICS_REVIEWED_ON = '2026-09-08'
