import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="max-w-md w-full bg-background rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6 flex justify-center">
          <CheckCircle2 className="h-16 w-16 text-green-600" />
        </div>

        <h1 className="text-3xl font-bold mb-4">Registration Complete!</h1>

        <p className="text-muted-foreground mb-8">
          Thank you for registering. You'll receive a confirmation email shortly with all the details.
        </p>

        <div className="space-y-3">
          <Button asChild className="w-full" size="lg">
            <Link href="/">Back to Homepage</Link>
          </Button>
          <Button asChild variant="outline" className="w-full" size="lg">
            <Link href="/#events">View More Events</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
