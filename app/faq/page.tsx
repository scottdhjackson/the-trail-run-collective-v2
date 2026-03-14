import { HeaderWithSettings } from '@/components/HeaderWithSettings'
import { Footer } from '@/components/Footer'
import { FAQSection } from '@/components/FAQSection'
import { client } from '@/sanity/lib/client'
import { FAQS_QUERY } from '@/sanity/lib/queries'

export const metadata = {
  title: 'FAQs - The Trail Run Collective',
  description: 'Frequently asked questions about The Trail Run Collective events',
}

export const revalidate = 60

export default async function FAQPage() {
  const faqs = await client.fetch(FAQS_QUERY)

  return (
    <>
      <HeaderWithSettings />
      <main className="min-h-screen bg-background">
        <FAQSection
          faqs={faqs}
          title="Frequently Asked Questions"
          description="Find answers to common questions about our trail and ultra running events"
          showCategories={true}
        />

      </main>
      <Footer />
    </>
  )
}
