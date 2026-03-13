'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'

export function SignupSection() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe')
      }

      setMessage({ type: 'success', text: 'Thanks for joining! Check your inbox.' })
      setEmail('')
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
    <section id="join" className="py-24" style={{ backgroundColor: 'var(--brand-cream, #E8E3D7)' }}>
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-3" style={{ color: '#2D5C26' }}>
            Stay in the loop
          </p>
          <h2 className="font-heading font-black uppercase text-4xl md:text-5xl tracking-tight mb-4" style={{ color: '#0C0F1E' }}>
            Join the Collective
          </h2>
          <p className="text-base mb-10" style={{ color: '#6B6558' }}>
            Subscribe for early event announcements, exclusive discounts, and training tips direct to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className="flex-1 bg-white border-0 rounded-full px-5 h-12 text-sm"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="shrink-0 px-7 h-12 rounded-full text-sm font-semibold tracking-wide text-white transition-all hover:opacity-90 disabled:opacity-60"
              style={{ backgroundColor: '#2D5C26' }}
            >
              {isLoading ? 'Joining...' : 'Join Now'}
            </button>
          </form>

          {message && (
            <p className={`mt-4 text-sm ${message.type === 'error' ? 'text-red-600' : ''}`} style={message.type === 'success' ? { color: '#2D5C26' } : {}}>
              {message.text}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
