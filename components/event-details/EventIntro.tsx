type EventIntroProps = {
  title: string
  date: string
  location: string
  description?: string
}

export function EventIntro({ title, date, location, description }: EventIntroProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-bold mb-4">{title}</h2>
        <p className="text-xl text-muted-foreground mb-6">
          {formattedDate} • {location}
        </p>
        {description && (
          <p className="text-lg text-foreground leading-relaxed whitespace-pre-line">
            {description}
          </p>
        )}
      </div>
    </section>
  )
}
