import { Header } from '@/components/Header'
import { FAQSection } from '@/components/FAQSection'
import { client } from '@/sanity/lib/client'
import { FAQS_QUERY } from '@/sanity/lib/queries'
import Link from 'next/link'

export const metadata = {
  title: 'FAQs - The Trail Run Collective',
  description: 'Frequently asked questions about The Trail Run Collective events',
}

export const revalidate = 60

export default async function FAQPage() {
  const faqs = await client.fetch(FAQS_QUERY)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <FAQSection
          faqs={faqs}
          title="Frequently Asked Questions"
          description="Find answers to common questions about our trail and ultra running events"
          showCategories={true}
        />

        <footer className="py-12 bg-muted/30 text-center">
          <div className="container mx-auto px-4">
            <p className="text-sm text-muted-foreground mb-2">
              © {new Date().getFullYear()} The Trail Run Collective. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
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
