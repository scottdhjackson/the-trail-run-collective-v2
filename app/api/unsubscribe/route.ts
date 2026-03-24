import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { writeClient, client } from '@/sanity/lib/client'

const schema = z.object({
  email: z.string().email('Please enter a valid email'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = schema.parse(body)

    const subscriber = await client.fetch(
      `*[_type == "subscriber" && email == $email][0]{ _id }`,
      { email }
    )

    if (!subscriber) {
      return NextResponse.json(
        { error: 'Email address not found' },
        { status: 404 }
      )
    }

    await writeClient.delete(subscriber._id)

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues?.[0]?.message || 'Invalid email' },
        { status: 400 }
      )
    }
    console.error('Unsubscribe error:', error)
    return NextResponse.json({ error: 'Failed to unsubscribe' }, { status: 500 })
  }
}
