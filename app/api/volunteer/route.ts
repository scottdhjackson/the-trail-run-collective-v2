import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { writeClient } from '@/sanity/lib/client'

const volunteerSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100),
  lastName: z.string().min(1, 'Last name is required').max(100),
  email: z.string().email('Please enter a valid email').max(254),
  phone: z.string().max(30).optional(),
  availability: z.enum(['weekends', 'weekdays', 'both', 'flexible']),
  roles: z.array(z.string().max(100)).max(20).optional(),
  experience: z.string().max(2000).optional(),
  whyVolunteer: z.string().max(2000).optional(),
  emergencyContactName: z.string().max(100).optional(),
  emergencyContactPhone: z.string().max(30).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = volunteerSchema.parse(body)

    await writeClient.create({
      _type: 'volunteer',
      ...data,
      status: 'pending',
      submittedAt: new Date().toISOString(),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Volunteer submission error:', error)

    if (error instanceof z.ZodError) {
      const firstError = error.issues?.[0]
      return NextResponse.json(
        { error: firstError?.message || 'Invalid input' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    )
  }
}
