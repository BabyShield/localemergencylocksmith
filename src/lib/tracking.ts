// GA4 event tracking utilities

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

export function trackPhoneClick(source: string, page: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'click_to_call', {
      event_category: 'conversion',
      event_label: source,
      page_location: page,
      value: 1,
    })
  }
}

export function trackWhatsAppClick(page: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'whatsapp_click', {
      event_category: 'conversion',
      page_location: page,
      value: 1,
    })
  }
}

export function trackEvent(name: string, params?: Record<string, string | number>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, params)
  }
}
