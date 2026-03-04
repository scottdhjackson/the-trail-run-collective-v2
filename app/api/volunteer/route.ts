import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { writeClient } from '@/sanity/lib/client'

const volunteerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  availability: z.enum(['weekends', 'weekdays', 'both', 'flexible'], {
    errorMap: () => ({ message: 'Please select your availability' }),
  }),
  roles: z.array(z.string()).optional(),
  experience: z.string().optional(),
  whyVolunteer: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
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
