import { NextResponse } from 'next/server'
import { SITE_CONFIG } from '@/data/config'
import { isEnquiryJob, isEnquiryUrgency, jobLabel, urgencyLabel } from '@/lib/enquiry'

export const dynamic = 'force-dynamic'

interface Enquiry {
  name: string
  phone: string
  postcode: string
  job: string
  urgency: string
  message: string
  source: string
  page: string
  timestamp: string
}

function clean(value: unknown, max: number) {
  return String(value ?? '')
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max)
}

function phoneDigits(value: string) {
  return value.replace(/\D/g, '')
}

function cleanPage(value: string) {
  if (!/^\/[A-Za-z0-9\-._~/%]*$/.test(value)) return 'Not provided'
  return value
}

async function readFields(request: Request) {
  const contentType = request.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    const body = await request.json()
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return { fields: {}, asJson: true }
    }
    return { fields: body as Record<string, unknown>, asJson: true }
  }
  const formData = await request.formData()
  return {
    fields: Object.fromEntries(formData.entries()) as Record<string, unknown>,
    asJson: false,
  }
}

function parseEnquiry(fields: Record<string, unknown>) {
  const company = clean(fields.company, 120)
  const phone = clean(fields.phone, 30)
  const digits = phoneDigits(phone)
  const job = clean(fields.job, 40)
  const urgency = clean(fields.urgency, 20)
  const page = cleanPage(clean(fields.page, 120))

  if (company) return { honeypot: true as const }

  if (digits.length < 10 || digits.length > 15) {
    return { error: 'Enter a phone number I can call, including the area code.' }
  }
  if (job && !isEnquiryJob(job)) {
    return { error: 'Choose one of the listed jobs.' }
  }
  if (urgency && !isEnquiryUrgency(urgency)) {
    return { error: 'Choose how soon you need help.' }
  }

  const enquiry: Enquiry = {
    name: clean(fields.name, 80) || 'Not provided',
    phone,
    postcode: clean(fields.postcode, 12) || 'Not provided',
    job: job ? jobLabel(job) : 'Not specified',
    urgency: urgency ? urgencyLabel(urgency) : 'Not specified',
    message: clean(fields.message, 1000) || 'Not provided',
    source: clean(fields.source, 60) || 'Not provided',
    page,
    timestamp: new Date().toISOString(),
  }

  return { enquiry, urgent: urgency === 'now' }
}

async function deliver(enquiry: Enquiry, urgent: boolean) {
  const text = [
    `Name: ${enquiry.name}`,
    `Phone: ${enquiry.phone}`,
    `Postcode: ${enquiry.postcode}`,
    `Job: ${enquiry.job}`,
    `How soon: ${enquiry.urgency}`,
    `Message: ${enquiry.message}`,
    `Page: ${enquiry.page}`,
    `Source: ${enquiry.source}`,
    `Submitted: ${enquiry.timestamp}`,
  ].join('\n')
  const subject = `${urgent ? '[Locked out now] ' : ''}Callback from ${enquiry.name === 'Not provided' ? enquiry.phone : enquiry.name}${
    enquiry.postcode === 'Not provided' ? '' : ` — ${enquiry.postcode}`
  }`

  let delivered = false

  if (process.env.RESEND_API_KEY) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'Contact Form <noreply@localemergencylocksmith.co.uk>',
          to: SITE_CONFIG.email,
          subject,
          text,
        }),
      })
      if (response.ok) delivered = true
      else console.error('Contact email was not accepted', response.status)
    } catch (error) {
      console.error('Contact email request failed', error instanceof Error ? error.message : 'unknown')
    }
  }

  if (process.env.CONTACT_WEBHOOK_URL) {
    try {
      const response = await fetch(process.env.CONTACT_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...enquiry, subject, text }),
      })
      if (response.ok) delivered = true
      else console.error('Contact webhook was not accepted', response.status)
    } catch (error) {
      console.error('Contact webhook request failed', error instanceof Error ? error.message : 'unknown')
    }
  }

  if (!delivered) console.log('Contact form submission:', JSON.stringify(enquiry))
  return delivered
}

function redirectTo(request: Request, submitted: string) {
  return NextResponse.redirect(new URL(`/contact?submitted=${submitted}#callback`, request.url), 303)
}

export async function POST(request: Request) {
  try {
    const { fields, asJson } = await readFields(request)
    const parsed = parseEnquiry(fields)

    if ('error' in parsed) {
      if (!asJson) return redirectTo(request, 'invalid')
      return NextResponse.json({ error: parsed.error }, { status: 400 })
    }

    if ('honeypot' in parsed) {
      if (!asJson) return redirectTo(request, '1')
      return NextResponse.json({ success: true, delivered: true })
    }

    const delivered = await deliver(parsed.enquiry, parsed.urgent)
    if (!asJson) return redirectTo(request, delivered ? '1' : 'undelivered')
    return NextResponse.json({ success: true, delivered })
  } catch {
    return NextResponse.json(
      { error: `Something went wrong. Please call ${SITE_CONFIG.phone} instead.` },
      { status: 500 }
    )
  }
}
