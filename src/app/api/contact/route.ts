import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, phone, postcode, message } = body

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

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong. Please call 07735 336175 instead.' },
      { status: 500 }
    )
  }
}
