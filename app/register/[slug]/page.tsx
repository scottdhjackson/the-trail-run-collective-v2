import { Header } from '@/components/Header'
import { SinglePageRegistrationForm } from '@/components/SinglePageRegistrationForm'
import { client } from '@/sanity/lib/client'
import { EVENT_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export const revalidate = 60

type Props = {
  params: Promise<{ slug: string }>
}

export default async function RegisterPage({ params }: Props) {
  const { slug } = await params
  const event = await client.fetch(EVENT_BY_SLUG_QUERY, { slug })

  if (!event) {
    notFound()
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="mb-8">
            <Link href="/#events" className="text-sm text-primary hover:underline mb-2 inline-block">
              ← Back to Events
            </Link>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Register for {event.title}</h1>
            <p className="text-muted-foreground">{event.location} • {new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>

          <SinglePageRegistrationForm event={event} />
        </div>

        <footer className="py-12 bg-muted/30 text-center mt-12">
          <div className="container mx-auto px-4">
            <p className="text-sm text-muted-foreground mb-2">
              © {new Date().getFullYear()} The Trail Run Collective. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground space-x-4">
              <Link href="/faq" className="hover:text-primary underline">
                FAQs
              </Link>
              <span>•</span>
              <Link href="/privacy-policy" className="hover:text-primary underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </footer>
      </main>
    </>
  )
}
