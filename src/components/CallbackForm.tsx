'use client'

import { useId, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { SITE_CONFIG } from '@/data/config'
import {
  ENQUIRY_JOBS,
  ENQUIRY_URGENCY,
  isEnquiryJob,
  whatsappHref,
} from '@/lib/enquiry'
import { trackEvent } from '@/lib/tracking'

interface CallbackFormProps {
  source: string
  defaultJob?: string
}

type Status = 'idle' | 'sending' | 'sent' | 'undelivered' | 'error'

const inputClass =
  'w-full border border-gray-300 rounded-lg px-3 py-3 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0F1B2D]'

export default function CallbackForm({ source, defaultJob = '' }: CallbackFormProps) {
  const formId = useId()
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [mailto, setMailto] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const jobDefault = isEnquiryJob(defaultJob) ? defaultJob : ''

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending') return

    const form = event.currentTarget
    const data = new FormData(form)
    const payload = {
      name: String(data.get('name') || ''),
      phone: String(data.get('phone') || ''),
      postcode: String(data.get('postcode') || ''),
      job: String(data.get('job') || ''),
      urgency: String(data.get('urgency') || ''),
      message: String(data.get('message') || ''),
      company: String(data.get('company') || ''),
      source,
      page: window.location.pathname,
    }

    setStatus('sending')
    setError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      const body = (await response.json().catch(() => null)) as { error?: string; delivered?: boolean } | null

      if (!response.ok) {
        setStatus('error')
        setError(body?.error || 'Something went wrong. Please call instead.')
        return
      }

      const delivered = body?.delivered !== false
      const jobField = form.elements.namedItem('job')
      const jobText = jobField instanceof HTMLSelectElement && jobField.value
        ? jobField.selectedOptions[0]?.text || 'Not specified'
        : 'Not specified'
      const urgencyField = form.querySelector('input[name="urgency"]:checked')
      const urgencyText = urgencyField instanceof HTMLInputElement
        ? urgencyField.closest('label')?.textContent?.trim() || 'Not specified'
        : 'Not specified'
      const subject = `Locksmith callback — ${payload.phone || 'enquiry'}`
      const text = [
        `Name: ${payload.name || 'Not provided'}`,
        `Phone: ${payload.phone}`,
        `Postcode: ${payload.postcode || 'Not provided'}`,
        `Job: ${jobText}`,
        `How soon: ${urgencyText}`,
        `Message: ${payload.message || 'Not provided'}`,
        `Page: ${payload.page}`,
      ].join('\n')
      setMailto(`mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`)
      setWhatsapp(whatsappHref(`Hi, please call me back.\n${text}`))

      if (delivered) {
        trackEvent('form_submission', {
          event_category: 'conversion',
          event_label: source,
          page_location: payload.page,
          value: 1,
        })
        setStatus('sent')
        form.reset()
      } else {
        setStatus('undelivered')
      }
    } catch {
      setStatus('error')
      setError('Something went wrong. Please call instead.')
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-xl bg-[#F7F7F5] border border-gray-200 p-4" role="status">
        <p className="font-black text-[#0F1B2D]">Callback request sent.</p>
        <p className="text-sm text-gray-700 mt-2">
          I will use the number you entered. If you are locked out, call as well so the current ETA can be confirmed now.
        </p>
        <a
          href={`tel:${SITE_CONFIG.phoneTel}`}
          data-track="form-success"
          className="mt-4 inline-flex items-center justify-center bg-[#FFB800] text-[#0F1B2D] font-black rounded-xl px-4 py-3"
        >
          Call {SITE_CONFIG.phone}
        </a>
      </div>
    )
  }

  return (
    <form action="/api/contact" method="POST" onSubmit={onSubmit} className="space-y-3">
      <input type="hidden" name="source" value={source} />
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor={`${formId}-company`}>Company</label>
        <input id={`${formId}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor={`${formId}-phone`} className="block text-sm font-semibold text-gray-700 mb-1">
          Phone number *
        </label>
        <input
          id={`${formId}-phone`}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          className={inputClass}
          placeholder="07… or your landline"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor={`${formId}-name`} className="block text-sm font-semibold text-gray-700 mb-1">
            Name
          </label>
          <input id={`${formId}-name`} name="name" type="text" autoComplete="name" className={inputClass} placeholder="Optional" />
        </div>
        <div>
          <label htmlFor={`${formId}-postcode`} className="block text-sm font-semibold text-gray-700 mb-1">
            Postcode
          </label>
          <input
            id={`${formId}-postcode`}
            name="postcode"
            type="text"
            autoComplete="postal-code"
            className={inputClass}
            placeholder="CV1 1AA"
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${formId}-job`} className="block text-sm font-semibold text-gray-700 mb-1">
          What do you need?
        </label>
        <select id={`${formId}-job`} name="job" defaultValue={jobDefault} className={inputClass}>
          <option value="">Select a job</option>
          {ENQUIRY_JOBS.map((job) => (
            <option key={job.value} value={job.value}>
              {job.label}
            </option>
          ))}
        </select>
      </div>

      <fieldset>
        <legend className="block text-sm font-semibold text-gray-700 mb-1">How soon?</legend>
        <div className="grid grid-cols-2 gap-2">
          {ENQUIRY_URGENCY.map((item) => (
            <label
              key={item.value}
              className="cursor-pointer rounded-lg border border-gray-300 px-2 py-2 text-center text-sm font-semibold text-gray-700 has-[:checked]:bg-[#0F1B2D] has-[:checked]:text-white has-[:checked]:border-[#0F1B2D]"
            >
              <input type="radio" name="urgency" value={item.value} className="sr-only" />
              {item.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor={`${formId}-message`} className="block text-sm font-semibold text-gray-700 mb-1">
          What happened?
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={3}
          className={inputClass}
          placeholder="Optional — door type, which lock, or the address area"
        />
      </div>

      {status === 'error' && (
        <p className="text-sm font-semibold text-red-700" role="alert">
          {error}{' '}
          <a href={`tel:${SITE_CONFIG.phoneTel}`} data-track="form-error" className="underline">
            Call {SITE_CONFIG.phone}
          </a>
        </p>
      )}

      {status === 'undelivered' && (
        <div className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-[#0F1B2D]" role="alert">
          <p className="font-semibold">The website could not deliver this message.</p>
          <p className="mt-1">Send the same details on WhatsApp, call, or email so the enquiry is not missed.</p>
          <div className="mt-3 flex flex-col gap-2">
            {whatsapp && (
              <a
                href={whatsapp}
                data-track="form-undelivered"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-[#25D366] px-4 py-3 font-black text-[#0F1B2D]"
              >
                Send these details on WhatsApp
              </a>
            )}
            <a href={`tel:${SITE_CONFIG.phoneTel}`} data-track="form-undelivered" className="font-black underline">
              Call {SITE_CONFIG.phone}
            </a>
            {mailto && (
              <a href={mailto} className="font-bold underline">
                Email {SITE_CONFIG.email}
              </a>
            )}
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-[#FFB800] hover:bg-[#FFC933] disabled:opacity-60 text-[#0F1B2D] py-3 px-4 rounded-xl font-black min-h-[48px]"
      >
        {status === 'sending' ? 'Sending…' : 'Request a callback'}
      </button>
      <p className="text-xs text-gray-500">
        Sending this lets Local Emergency Locksmith call you about this enquiry.{' '}
        <Link href="/privacy" className="underline">
          Privacy
        </Link>
      </p>
    </form>
  )
}
