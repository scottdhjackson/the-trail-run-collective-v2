'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
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
    <section id="join" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Join our mailing list</h2>
          <p className="text-xl mb-2 font-semibold text-muted-foreground">
            Stay in the loop and get early bird access
          </p>
          <p className="text-lg mb-8 text-muted-foreground">
            Subscribe to receive early event announcements, exclusive discounts, and training tips from The Trail Run Collective.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className="bg-background flex-1"
            />
            <Button
              type="submit"
              variant="default"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? 'Joining...' : 'Join'}
            </Button>
          </form>

          {message && (
            <p className={`mt-4 text-sm ${message.type === 'error' ? 'text-destructive' : 'text-muted-foreground'}`}>
              {message.text}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
