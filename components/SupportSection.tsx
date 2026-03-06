export function SupportSection() {
  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold tracking-tight mb-6 text-center">
            Support every step of the way
          </h2>
          <p className="text-lg mb-8 text-center opacity-90">
            From course markings to aid stations and clear communication, we make sure your experience is rewarding - regardless of distance or pace.
          </p>

          <ul className="space-y-4 text-lg">
            <li className="flex items-start">
              <span className="mr-3 opacity-70">•</span>
              <span>Fully signed routes</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 opacity-70">•</span>
              <span>On-course support and hydration points</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 opacity-70">•</span>
              <span>Medics provided</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 opacity-70">•</span>
              <span>Community and camaraderie</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
