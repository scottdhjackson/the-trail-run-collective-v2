import { HeaderWithSettings } from '@/components/HeaderWithSettings'
import { Footer } from '@/components/Footer'
import { UnsubscribeForm } from '@/components/UnsubscribeForm'

export const metadata = {
  title: 'Unsubscribe | The Trail Run Collective',
}

export default function UnsubscribePage() {
  return (
    <>
      <HeaderWithSettings />
      <main className="min-h-screen pt-16" style={{ backgroundColor: '#F2EDE3' }}>
        <section className="container mx-auto px-6 py-24 max-w-6xl">
          <UnsubscribeForm />
        </section>
      </main>
      <Footer />
    </>
  )
}
