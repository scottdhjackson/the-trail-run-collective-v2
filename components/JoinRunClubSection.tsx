'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'

export function JoinRunClubSection() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage(null)

    try {
      const response = await fetch('/api/run-club-subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to sign up')
      }

      setSubmitted(true)
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="run-club" className="py-24" style={{ backgroundColor: '#0C0F1E' }}>
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-3" style={{ color: '#2D5C26' }}>
            Every week
          </p>
          <h2 className="font-heading font-black uppercase text-4xl md:text-5xl tracking-tight mb-4" style={{ color: '#E8E3D7' }}>
            Join the Run Club
          </h2>
          <p className="text-base mb-10" style={{ color: '#9E9789' }}>
            Sign up to join The Trail Run Collective x The Dough Shack Run Club. Show up, run together, earn your pizza.
          </p>

          {submitted ? (
            <div className="max-w-md mx-auto py-6 px-8 rounded-2xl" style={{ backgroundColor: '#1a1f33' }}>
              <p className="text-2xl mb-2">👟</p>
              <p className="font-heading font-bold text-lg uppercase tracking-tight mb-1" style={{ color: '#E8E3D7' }}>
                You're signed up!
              </p>
              <p className="text-sm" style={{ color: '#9E9789' }}>
                We'll be in touch with all the run club details. See you out there.
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
                  className="flex-1 border-0 rounded-full px-5 h-12 text-sm"
                  style={{ backgroundColor: '#1a1f33', color: '#E8E3D7' }}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="shrink-0 px-7 h-12 rounded-full text-sm font-semibold tracking-wide transition-all hover:opacity-90 disabled:opacity-60"
                  style={{ backgroundColor: '#2D5C26', color: '#ffffff' }}
                >
                  {isLoading ? 'Signing up...' : 'Sign Up'}
                </button>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: '#9E9789' }}>
                By signing up you accept the{' '}
                <a
                  href="/waiver"
                  className="underline hover:opacity-80"
                  style={{ color: '#E8E3D7' }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  participation waiver & terms and conditions
                </a>.
              </p>
              {errorMessage && (
                <p className="text-sm text-red-400">{errorMessage}</p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
