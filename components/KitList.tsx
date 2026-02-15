type KitListProps = {
  title: string
  requiredEquipment: Array<{ _key: string; item: string }>
  importantNotes?: Array<{ _key: string; note: string }>
  footerText?: string
}

export function KitList({ title, requiredEquipment, importantNotes, footerText }: KitListProps) {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">{title}</h1>
          </div>

          {/* Required Equipment List */}
          <div className="mb-12">
            <ul className="space-y-3">
              {requiredEquipment.map((item) => (
                <li key={item._key} className="flex items-start">
                  <span className="text-primary mr-3 mt-1">•</span>
                  <span className="text-foreground">{item.item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Notes */}
          {importantNotes && importantNotes.length > 0 && (
            <div className="mb-12">
              <div className="border-t border-border pt-8 mb-6"></div>
              <h2 className="text-2xl font-semibold mb-6">Important Notes</h2>
              <ul className="space-y-3">
                {importantNotes.map((note) => (
                  <li key={note._key} className="flex items-start">
                    <span className="text-primary mr-3 mt-1">•</span>
                    <span className="text-foreground">{note.note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Footer Text */}
          {footerText && (
            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground whitespace-pre-line">
                {footerText}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
