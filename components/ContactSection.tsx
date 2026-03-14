'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface ContactSectionProps {
  contactEmail?: string
}

export function ContactSection({ contactEmail }: ContactSectionProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  // Build the mailto href client-side only so it never appears in server-rendered HTML
  const [emailHref, setEmailHref] = useState<string | null>(null)
  useEffect(() => {
    if (contactEmail) setEmailHref(`mailto:${contactEmail}`)
  }, [contactEmail])
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      let data
      try {
        data = await response.json()
      } catch {
        throw new Error('Server error - please try again')
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      setMessage({ type: 'success', text: "Message sent! We'll be in touch soon." })
      setFormData({ name: '', email: '', message: '' })
    } catch (err) {
      setMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Something went wrong',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="contact" className="py-24" style={{ backgroundColor: 'var(--brand-cream, #E8E3D7)' }}>
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-3" style={{ color: '#2D5C26' }}>
              Get in touch
            </p>
            <h2 className="font-heading font-black uppercase text-4xl md:text-5xl tracking-tight mb-4" style={{ color: '#0C0F1E' }}>
              Questions?
            </h2>
            <p className="text-base" style={{ color: '#6B6558' }}>
              Whether you're new to ultras or planning your next big trail run, our team is here to support you.
              {contactEmail && (
                <>
                  {' '}
                  {emailHref ? (
                    <a href={emailHref} className="font-medium underline" style={{ color: '#2D5C26' }}>
                      {contactEmail}
                    </a>
                  ) : (
                    <span className="font-medium" style={{ color: '#2D5C26' }}>{contactEmail}</span>
                  )}
                </>
              )}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" suppressHydrationWarning>
            <div>
              <Label htmlFor="name" className="text-xs font-semibold tracking-wider uppercase mb-2 block" style={{ color: '#0C0F1E' }}>Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                disabled={isLoading}
                className="bg-white border-0 rounded-xl h-12"
                suppressHydrationWarning
              />
            </div>

            <div suppressHydrationWarning>
              <Label htmlFor="email" className="text-xs font-semibold tracking-wider uppercase mb-2 block" style={{ color: '#0C0F1E' }}>Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={isLoading}
                className="bg-white border-0 rounded-xl h-12"
                suppressHydrationWarning
              />
            </div>

            <div>
              <Label htmlFor="message" className="text-xs font-semibold tracking-wider uppercase mb-2 block" style={{ color: '#0C0F1E' }}>Message</Label>
              <Textarea
                id="message"
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                disabled={isLoading}
                className="bg-white border-0 rounded-xl"
                suppressHydrationWarning
              />
            </div>

            {message && (
              <p className="text-sm" style={{ color: message.type === 'error' ? '#dc2626' : '#2D5C26' }}>
                {message.text}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-full text-sm font-bold tracking-widest uppercase text-white transition-all hover:opacity-90 disabled:opacity-60"
              style={{ backgroundColor: '#2D5C26' }}
            >
              {isLoading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
