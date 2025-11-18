import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

// GET all contact requests
export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // 'contact', 'offer', or null for all
    const status = searchParams.get('status') // 'new', 'contacted', 'qualified', 'closed'

    const where: any = {}
    if (type) where.type = type
    if (status) where.status = status

    const requests = await prisma.contactRequest.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(requests)
  } catch (error) {
    console.error('Error fetching contact requests:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contact requests' },
      { status: 500 }
    )
  }
}

// PATCH update contact request status
export async function PATCH(request: NextRequest) {
  try {
    const session = await auth()

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const updated = await prisma.contactRequest.update({
      where: { id },
      data: { status }
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Error updating contact request:', error)
    return NextResponse.json(
      { error: 'Failed to update contact request' },
      { status: 500 }
    )
  }
}

// DELETE a contact request
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth()

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Missing request ID' },
        { status: 400 }
      )
    }

    await prisma.contactRequest.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting contact request:', error)
    return NextResponse.json(
      { error: 'Failed to delete contact request' },
      { status: 500 }
    )
  }
}
