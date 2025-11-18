import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      propertyType,
      budget,
      location,
      purpose,
      timeline,
      size,
      infrastructure,
      contactName,
      contactEmail,
      contactPhone,
      locale,
    } = body

    // Validate required fields
    if (!propertyType || !budget || !location || !purpose || !timeline || !size || !contactName || !contactEmail || !contactPhone) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const quizSubmission = await prisma.quizSubmission.create({
      data: {
        propertyType,
        budget,
        location,
        purpose,
        timeline,
        size,
        infrastructure: JSON.stringify(infrastructure || []),
        contactName,
        contactEmail,
        contactPhone,
        locale: locale || 'en',
      },
    })

    return NextResponse.json({
      success: true,
      submission: quizSubmission,
    })
  } catch (error) {
    console.error('Error creating quiz submission:', error)
    return NextResponse.json(
      { error: 'Failed to save quiz submission' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const submissions = await prisma.quizSubmission.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(submissions)
  } catch (error) {
    console.error('Error fetching quiz submissions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch quiz submissions' },
      { status: 500 }
    )
  }
}
