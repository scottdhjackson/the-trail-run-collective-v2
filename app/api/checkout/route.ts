import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { stripe } from '@/lib/stripe'
import { client } from '@/sanity/lib/client'
import { EVENT_BY_SLUG_QUERY } from '@/sanity/lib/queries'

const checkoutSchema = z.object({
  eventSlug: z.string().max(200),
  distanceLabel: z.string().max(100),
  registrationData: z.object({
    firstName: z.string().min(1).max(100),
    lastName: z.string().min(1).max(100),
    email: z.string().email().max(254),
    phone: z.string().max(30),
    address: z.object({
      line1: z.string().max(200),
      line2: z.string().max(200).optional(),
      city: z.string().max(100),
      postcode: z.string().max(20),
      country: z.string().max(100),
    }),
    age: z.number().int().min(18).max(120),
    gender: z.string().max(50),
    emergencyContact: z.object({
      name: z.string().max(100),
      phone: z.string().max(30),
      relationship: z.string().max(100),
    }),
  }),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { eventSlug, distanceLabel, registrationData } = checkoutSchema.parse(body)

    // Fetch event from Sanity
    const event = await client.fetch(EVENT_BY_SLUG_QUERY, { slug: eventSlug })

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    // Find the selected distance
    const distance = event.distances?.find(
      (d: { label: string }) => d.label === distanceLabel
    )

    if (!distance) {
      return NextResponse.json(
        { error: 'Distance not found' },
        { status: 404 }
      )
    }

    if (!distance.isOpen) {
      return NextResponse.json(
        { error: 'Registration is closed for this distance' },
        { status: 400 }
      )
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price: distance.stripePriceId,
          quantity: 1,
        },
      ],
      customer_email: registrationData.email,
      metadata: {
        eventSlug,
        distanceLabel,
        eventId: event._id,
        firstName: registrationData.firstName,
        lastName: registrationData.lastName,
        email: registrationData.email,
        phone: registrationData.phone,
        address: JSON.stringify(registrationData.address),
        age: registrationData.age.toString(),
        gender: registrationData.gender,
        emergencyContact: JSON.stringify(registrationData.emergencyContact),
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
