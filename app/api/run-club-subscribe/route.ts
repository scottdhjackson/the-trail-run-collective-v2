import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { writeClient, client } from '@/sanity/lib/client'

const subscribeSchema = z.object({
  firstName: z.string().min(1, 'Please enter your first name'),
  lastName: z.string().min(1, 'Please enter your last name'),
  email: z.string().email('Please enter a valid email'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email } = subscribeSchema.parse(body)

    // Check if email already exists
    const existing = await client.fetch(
      `*[_type == "runClubSubscriber" && email == $email][0]`,
      { email }
    )

    if (existing) {
      return NextResponse.json(
        { error: 'This email is already signed up' },
        { status: 400 }
      )
    }

    await writeClient.create({
      _type: 'runClubSubscriber',
      firstName,
      lastName,
      email,
      subscribedAt: new Date().toISOString(),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Run club subscribe error:', error)

    if (error instanceof z.ZodError) {
      const firstError = error.issues?.[0]
      return NextResponse.json(
        { error: firstError?.message || 'Invalid email' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to sign up' },
      { status: 500 }
    )
  }
}
