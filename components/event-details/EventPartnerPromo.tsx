import Image from 'next/image'
import { ExternalLink } from 'lucide-react'

type EventPartnerPromoProps = {
  partnerName?: string
  partnerLogoUrl?: string
  partnerDescription?: string
  partnerLink?: string
}

export function EventPartnerPromo({
  partnerName,
  partnerLogoUrl,
  partnerDescription,
  partnerLink,
}: EventPartnerPromoProps) {
  if (!partnerName) return null

  return (
    <section className="py-16 bg-accent/10 border-y-2 border-accent/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6">In Partnership With</h2>

          {partnerLogoUrl && (
            <div className="relative h-24 w-full max-w-md mx-auto mb-6">
              <Image
                src={partnerLogoUrl}
                alt={partnerName}
                fill
                className="object-contain"
              />
            </div>
          )}

          {partnerDescription && (
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              {partnerDescription}
            </p>
          )}

          {partnerLink && (
            <a
              href={partnerLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline font-semibold"
            >
              Learn more <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
