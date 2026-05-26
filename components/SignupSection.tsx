'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'

export function SignupSection() {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!consent) {
      setErrorMessage('Please confirm you agree to receive marketing emails.')
      return
    }
    setIsLoading(true)
    setErrorMessage(null)

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

      setSubmitted(true)
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong')
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

          {submitted ? (
            <div className="max-w-md mx-auto py-6 px-8 rounded-2xl" style={{ backgroundColor: '#ffffff' }}>
              <p className="text-2xl mb-2">🎉</p>
              <p className="font-heading font-bold text-lg uppercase tracking-tight mb-1" style={{ color: '#0C0F1E' }}>
                You're in!
              </p>
              <p className="text-sm" style={{ color: '#6B6558' }}>
                Welcome to the collective. Keep an eye on your inbox for early event announcements and exclusive discounts.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
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
                  {isLoading ? 'Joining...' : 'Stay in the loop'}
                </button>
              </div>
              <label className="flex items-start gap-3 text-left cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border accent-[#2D5C26] cursor-pointer"
                />
                <span className="text-xs leading-relaxed" style={{ color: '#6B6558' }}>
                  I agree to receive marketing emails from The Trail Run Collective. You can unsubscribe at any time. View our{' '}
                  <a href="/privacy-policy" className="underline hover:opacity-80" style={{ color: '#2D5C26' }}>
                    Privacy Policy
                  </a>.
                </span>
              </label>
              {errorMessage && (
                <p className="text-sm text-red-600">{errorMessage}</p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
