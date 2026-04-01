import { HeaderWithSettings } from '@/components/HeaderWithSettings'
import { Footer } from '@/components/Footer'
import { JoinRunClubSection } from '@/components/JoinRunClubSection'

export const metadata = {
  title: 'Join the Run Club - The Trail Run Collective x The Dough Shack',
  description: 'Sign up to join The Trail Run Collective x The Dough Shack Run Club. Show up, run together, earn your pizza.',
}

export default function RunClubPage() {
  return (
    <>
      <HeaderWithSettings />
      <main className="min-h-screen flex flex-col justify-center" style={{ backgroundColor: '#0C0F1E' }}>
        <JoinRunClubSection />
      </main>
      <Footer />
    </>
  )
}
