import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { writeClient } from '@/sanity/lib/client'
import { Resend } from 'resend'

const enquirySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  message: z.string().min(5, 'Message too short'),
})

export async function POST(request: NextRequest) {
  try {
    console.log('📧 Enquiry API called')
    const body = await request.json()
    console.log('Body received:', { name: body.name, email: body.email })

    const { name, email, message } = enquirySchema.parse(body)
    console.log('Validation passed')

    // Create enquiry in Sanity
    console.log('Creating enquiry in Sanity...')
    const result = await writeClient.create({
      _type: 'enquiry',
      name,
      email,
      message,
      submittedAt: new Date().toISOString(),
    })
    console.log('✅ Enquiry created:', result._id)

    // Send email if Resend is configured
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)

      try {
        await resend.emails.send({
          from: 'The Trail Run Collective <noreply@yourdomain.com>',
          to: process.env.CONTACT_EMAIL || 'contact@example.com',
          subject: `New enquiry from ${name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `,
        })
      } catch (emailError) {
        console.error('Failed to send email:', emailError)
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Enquiry error:', error)

    if (error instanceof z.ZodError) {
      const firstError = error.issues?.[0] || error.errors?.[0]
      return NextResponse.json(
        { error: firstError?.message || 'Invalid input' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to submit enquiry' },
      { status: 500 }
    )
  }
}
