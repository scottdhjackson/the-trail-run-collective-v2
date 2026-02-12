import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { writeClient } from '@/sanity/lib/client'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    try {
      // Check if entry already exists (idempotency)
      const existingEntry = await writeClient.fetch(
        `*[_type == "entry" && stripeSessionId == $sessionId][0]`,
        { sessionId: session.id }
      )

      if (existingEntry) {
        console.log('Entry already exists for session:', session.id)
        return NextResponse.json({ received: true })
      }

      // Get metadata from session
      const metadata = session.metadata || {}
      const {
        eventSlug,
        distanceLabel,
        eventId,
        firstName,
        lastName,
        email,
        phone,
        address,
        age,
        gender,
        emergencyContact
      } = metadata

      if (!eventSlug || !distanceLabel || !eventId) {
        console.error('Missing required metadata in session:', session.id)
        return NextResponse.json(
          { error: 'Missing metadata' },
          { status: 400 }
        )
      }

      // Parse JSON strings back to objects
      const parsedAddress = address ? JSON.parse(address) : null
      const parsedEmergencyContact = emergencyContact ? JSON.parse(emergencyContact) : null

      // Create entry in Sanity
      await writeClient.create({
        _type: 'entry',
        event: {
          _type: 'reference',
          _ref: eventId,
        },
        distanceLabel,
        email: email || session.customer_email || session.customer_details?.email,
        firstName: firstName || null,
        lastName: lastName || null,
        phone: phone || null,
        address: parsedAddress,
        age: age ? parseInt(age) : null,
        gender: gender || null,
        emergencyContact: parsedEmergencyContact,
        stripeSessionId: session.id,
        paymentStatus: 'paid',
        metadata: {
          customerName: session.customer_details?.name || `${firstName} ${lastName}` || null,
          amount: session.amount_total,
        },
        createdAt: new Date().toISOString(),
      })

      console.log('Entry created for session:', session.id)
    } catch (err) {
      console.error('Error creating entry:', err)
      return NextResponse.json(
        { error: 'Failed to create entry' },
        { status: 500 }
      )
    }
  }

  return NextResponse.json({ received: true })
}
