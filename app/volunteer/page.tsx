import { HeaderWithSettings } from '@/components/HeaderWithSettings'
import { VolunteerForm } from '@/components/VolunteerForm'

export const metadata = {
  title: 'Volunteer With Us | The Trail Run Collective',
  description:
    'Join our volunteer team and help bring trail running events to life across the UK.',
}

export default function VolunteerPage() {
  return (
    <>
      <HeaderWithSettings />
      <main className="min-h-screen bg-background">
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="mb-10">
              <h1 className="text-4xl font-bold tracking-tight mb-4">Volunteer With Us</h1>
              <p className="text-lg text-muted-foreground">
                Our events wouldn't be possible without the brilliant people who give their time to
                make them happen. Whether you want to marshal a course, support an aid station, or
                just be part of something special — we'd love to have you on the team.
              </p>
            </div>
            <VolunteerForm />
          </div>
        </section>
      </main>
    </>
  )
}
