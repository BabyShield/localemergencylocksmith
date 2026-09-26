import { SITE_CONFIG } from '@/data/config'

export const ENQUIRY_JOBS = [
  { value: 'emergency-lockout', label: 'Locked out' },
  { value: 'lock-change', label: 'Lock repair or replacement' },
  { value: 'upvc-lock-repair', label: 'uPVC door or window lock' },
  { value: 'boarding-up', label: 'Boarding up' },
  { value: 'lock-upgrade', label: 'Lock upgrade' },
  { value: 'other', label: 'Something else' },
] as const

export const ENQUIRY_URGENCY = [
  { value: 'now', label: 'Locked out now' },
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This week' },
  { value: 'quote', label: 'Just a quote' },
] as const

const JOB_VALUES = new Set<string>(ENQUIRY_JOBS.map((job) => job.value))
const URGENCY_VALUES = new Set<string>(ENQUIRY_URGENCY.map((item) => item.value))

export function whatsappHref(message = 'Hi, I need a locksmith. My postcode is ') {
  const digits = SITE_CONFIG.phoneTel.replace(/\D/g, '')
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}

export function jobLabel(value: string) {
  return ENQUIRY_JOBS.find((job) => job.value === value)?.label ?? 'Not specified'
}

export function urgencyLabel(value: string) {
  return ENQUIRY_URGENCY.find((item) => item.value === value)?.label ?? 'Not specified'
}

export function isEnquiryJob(value: string) {
  return JOB_VALUES.has(value)
}

export function isEnquiryUrgency(value: string) {
  return URGENCY_VALUES.has(value)
}
