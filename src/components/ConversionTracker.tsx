'use client'

import { useEffect } from 'react'
import { trackPhoneClick, trackWhatsAppClick } from '@/lib/tracking'

export default function ConversionTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      const link = target.closest('a')
      if (!link) return
      const href = link.getAttribute('href') || ''
      const source = link.dataset.track || 'unspecified'
      if (href.startsWith('tel:')) {
        trackPhoneClick(source, window.location.pathname)
      } else if (href.includes('wa.me/') || href.includes('api.whatsapp.com')) {
        trackWhatsAppClick(source, window.location.pathname)
      }
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return null
}
