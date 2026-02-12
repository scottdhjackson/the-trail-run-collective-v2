import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { XCircle } from 'lucide-react'

export default function CancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="max-w-md w-full bg-background rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6 flex justify-center">
          <XCircle className="h-16 w-16 text-muted-foreground" />
        </div>

        <h1 className="text-3xl font-bold mb-4">Payment Cancelled</h1>

        <p className="text-muted-foreground mb-8">
          Your payment was cancelled. No charges were made. Feel free to try again when you're ready.
        </p>

        <div className="space-y-3">
          <Button asChild className="w-full" size="lg">
            <Link href="/#events">Try Again</Link>
          </Button>
          <Button asChild variant="outline" className="w-full" size="lg">
            <Link href="/">Back to Homepage</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
