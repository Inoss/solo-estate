import { NextRequest, NextResponse } from 'next/server'
import { sendRequestOfferEmail, sendAutoReplyEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      name,
      email,
      phone,
      country,
      budget,
      preferredCity,
      propertyType,
      message,
      projectId,
      projectTitle,
      locale,
    } = body

    // Validate required fields
    if (!name || !email || !phone) {
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

    // Prepare data for integrations
    const leadData = {
      name,
      email,
      phone,
      country,
      budget,
      preferredCity,
      propertyType,
      message,
      projectId,
      projectTitle,
      locale,
      source: 'Website Form',
      submittedAt: new Date().toISOString(),
    }

    console.log('New lead received:', leadData)

    // Send email notifications
    try {
      // Send notification to company
      if (process.env.RESEND_API_KEY) {
        await sendRequestOfferEmail(leadData)
        // Send auto-reply to customer
        await sendAutoReplyEmail(email, name, locale)
      }
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      // Don't fail the request if email fails
    }

    // TODO: Implement CRM integration
    // if (process.env.HUBSPOT_API_KEY) {
    //   await sendToCRM(leadData)
    // }

    return NextResponse.json(
      {
        success: true,
        message: 'Request submitted successfully',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing request:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
