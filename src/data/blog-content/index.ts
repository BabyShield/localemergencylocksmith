// Aggregates all pillar content into a single lookup
// Each pillar file exports a Record<slug, { body: string; faqs: { q: string; a: string }[] }>

import { PILLAR_1_CONTENT } from './pillar-1-lock-types'
import { PILLAR_2_CONTENT } from './pillar-2-home-security'
import { PILLAR_3_CONTENT } from './pillar-3-costs'
import { PILLAR_4_CONTENT } from './pillar-4-upvc'
import { PILLAR_5_CONTENT } from './pillar-5-emergency'
import { PILLAR_6_CONTENT } from './pillar-6-legal'
import { PILLAR_7_CONTENT } from './pillar-7-seasonal'
import { PILLAR_8_CONTENT } from './pillar-8-coventry'

export interface BlogPostContent {
  body: string
  faqs: { q: string; a: string }[]
}

// Existing 5 posts from original build (Plan 1) — kept inline for backwards compatibility
import { LEGACY_BLOG_CONTENT } from './legacy-posts'

export const ALL_BLOG_CONTENT: Record<string, BlogPostContent> = {
  ...LEGACY_BLOG_CONTENT,
  ...PILLAR_1_CONTENT,
  ...PILLAR_2_CONTENT,
  ...PILLAR_3_CONTENT,
  ...PILLAR_4_CONTENT,
  ...PILLAR_5_CONTENT,
  ...PILLAR_6_CONTENT,
  ...PILLAR_7_CONTENT,
  ...PILLAR_8_CONTENT,
}
