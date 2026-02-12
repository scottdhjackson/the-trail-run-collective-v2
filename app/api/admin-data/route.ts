import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function GET() {
  try {
    const [enquiries, subscribers, entries] = await Promise.all([
      client.fetch(`*[_type == "enquiry"] | order(submittedAt desc) {
        _id, name, email, message, submittedAt
      }`),
      client.fetch(`*[_type == "subscriber"] | order(subscribedAt desc) {
        _id, email, subscribedAt
      }`),
      client.fetch(`*[_type == "entry"] | order(createdAt desc) {
        _id,
        email,
        firstName,
        lastName,
        phone,
        address,
        age,
        gender,
        emergencyContact,
        distanceLabel,
        paymentStatus,
        createdAt,
        "eventTitle": event->title
      }`),
    ])

    return NextResponse.json({ enquiries, subscribers, entries })
  } catch (error) {
    console.error('Admin data error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    )
  }
}
