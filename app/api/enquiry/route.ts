import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { writeClient, client } from '@/sanity/lib/client'
import { Resend } from 'resend'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'

const enquirySchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  email: z.string().email('Please enter a valid email').max(254),
  message: z.string().min(5, 'Message too short').max(2000, 'Message too long'),
})

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = enquirySchema.parse(body)

    await writeClient.create({
      _type: 'enquiry',
      name,
      email,
      message,
      submittedAt: new Date().toISOString(),
    })

    // Send email if Resend is configured
    const fromEmail = process.env.RESEND_FROM_EMAIL
    if (process.env.RESEND_API_KEY && fromEmail) {
      // Recipient: CONTACT_EMAIL env var, or fall back to contactEmail from Sanity
      let toEmail = process.env.CONTACT_EMAIL
      if (!toEmail) {
        const settings = await client.fetch(SITE_SETTINGS_QUERY)
        toEmail = settings?.contactEmail
      }

      if (toEmail) {
        const resend = new Resend(process.env.RESEND_API_KEY)
        try {
          await resend.emails.send({
            from: `The Trail Run Collective <${fromEmail}>`,
            to: toEmail,
            replyTo: email,
            subject: `New enquiry from ${escapeHtml(name)}`,
            html: `
              <h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${escapeHtml(name)}</p>
              <p><strong>Email:</strong> ${escapeHtml(email)}</p>
              <p><strong>Message:</strong></p>
              <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
              <hr>
              <p style="color:#666;font-size:12px;">Reply to this email to respond directly to ${escapeHtml(name)}.</p>
            `,
          })
        } catch (emailError) {
          console.error('Failed to send email:', emailError)
          // Don't fail the request if email fails
        }
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Enquiry error:', error)

    if (error instanceof z.ZodError) {
      const firstError = error.issues?.[0]
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
