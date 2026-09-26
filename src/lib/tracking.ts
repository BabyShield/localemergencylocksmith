// GA4 event tracking utilities

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

function pushEvent(name: string, params?: Record<string, string | number>) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: name, ...params })
}

export function trackPhoneClick(source: string, page: string) {
  pushEvent('click_to_call', {
    event_category: 'conversion',
    event_label: source,
    page_location: page,
    value: 1,
  })
}

export function trackWhatsAppClick(source: string, page: string) {
  pushEvent('whatsapp_click', {
    event_category: 'conversion',
    event_label: source,
    page_location: page,
    value: 1,
  })
}

export function trackEvent(name: string, params?: Record<string, string | number>) {
  pushEvent(name, params)
}
