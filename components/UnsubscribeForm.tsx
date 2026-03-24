'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'

function UnsubscribeFormInner() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const emailParam = searchParams.get('email')
    if (emailParam) setEmail(decodeURIComponent(emailParam))
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage('')

    try {
      const response = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to unsubscribe')
      }

      setSubmitted(true)
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto text-center">
      <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-3" style={{ color: '#2D5C26' }}>
        Email Preferences
      </p>
      <h1 className="font-heading font-black uppercase text-4xl tracking-tight mb-4" style={{ color: '#0C0F1E' }}>
        Unsubscribe
      </h1>

      {submitted ? (
        <div className="py-6 px-8 rounded-2xl mt-8" style={{ backgroundColor: '#ffffff' }}>
          <p className="font-heading font-bold text-lg uppercase tracking-tight mb-2" style={{ color: '#0C0F1E' }}>
            You've been unsubscribed
          </p>
          <p className="text-sm" style={{ color: '#6B6558' }}>
            {email} has been removed from our mailing list. You won't receive any further marketing emails from us.
          </p>
        </div>
      ) : (
        <>
          <p className="text-base mb-10" style={{ color: '#6B6558' }}>
            Enter your email address below and we'll remove you from our mailing list immediately.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                style={{ backgroundColor: '#0C0F1E' }}
              >
                {isLoading ? 'Removing...' : 'Unsubscribe'}
              </button>
            </div>
            {errorMessage && (
              <p className="text-sm text-red-600">{errorMessage}</p>
            )}
          </form>
        </>
      )}
    </div>
  )
}

export function UnsubscribeForm() {
  return (
    <Suspense>
      <UnsubscribeFormInner />
    </Suspense>
  )
}
