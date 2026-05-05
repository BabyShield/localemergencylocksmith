import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    let name: string | null = null
    let phone: string | null = null
    let postcode: string | null = null
    let message: string | null = null

    const contentType = request.headers.get('content-type') || ''

    if (contentType.includes('application/json')) {
      const body = await request.json()
      name = body.name
      phone = body.phone
      postcode = body.postcode
      message = body.message
    } else {
      // Handle form-encoded submissions (default HTML form behavior)
      const formData = await request.formData()
      name = formData.get('name') as string
      phone = formData.get('phone') as string
      postcode = formData.get('postcode') as string
      message = formData.get('message') as string
    }

    // Validate required fields
    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: 'Name, phone, and message are required.' },
        { status: 400 }
      )
    }

    // Basic sanitization
    const sanitize = (str: string) => str.replace(/<[^>]*>/g, '').trim().slice(0, 500)

    const sanitizedData = {
      name: sanitize(name),
      phone: sanitize(phone),
      postcode: postcode ? sanitize(postcode) : 'Not provided',
      message: sanitize(message),
      timestamp: new Date().toISOString(),
    }

    // Log the submission (visible in Vercel function logs)
    console.log('Contact form submission:', JSON.stringify(sanitizedData))

    // If Resend API key is configured, send email
    if (process.env.RESEND_API_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'Contact Form <noreply@localemergencylocksmith.co.uk>',
          to: 'info@localemergencylocksmith.co.uk',
          subject: `New enquiry from ${sanitizedData.name} — ${sanitizedData.phone}`,
          text: `Name: ${sanitizedData.name}\nPhone: ${sanitizedData.phone}\nPostcode: ${sanitizedData.postcode}\nMessage: ${sanitizedData.message}\n\nSubmitted: ${sanitizedData.timestamp}`,
        }),
      })
    }

    // Redirect to thank-you experience (for form submissions)
    if (!contentType.includes('application/json')) {
      return new Response(null, {
        status: 302,
        headers: { Location: '/contact?submitted=true' },
      })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong. Please call 024 7522 4730 instead.' },
      { status: 500 }
    )
  }
}
