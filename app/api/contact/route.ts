import { NextRequest, NextResponse } from 'next/server'
import { sendContactEmail, sendAutoReplyEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      name,
      email,
      phone,
      subject,
      message,
      locale,
    } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Prepare contact data
    const contactData = {
      name,
      email,
      phone,
      subject,
      message,
      locale,
      source: 'Contact Form',
      submittedAt: new Date().toISOString(),
    }

    console.log('New contact form submission:', contactData)

    // Send email notifications
    try {
      if (process.env.RESEND_API_KEY) {
        await sendContactEmail(contactData)
        await sendAutoReplyEmail(email, name, locale)
      }
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      // Don't fail the request if email fails
    }

    // TODO: Implement CRM integration
    // if (process.env.HUBSPOT_API_KEY) {
    //   await sendToCRM(contactData)
    // }

    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
