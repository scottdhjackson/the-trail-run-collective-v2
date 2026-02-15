import Image from 'next/image'
import { ExternalLink } from 'lucide-react'

type EventPhotoGalleryProps = {
  images: string[]
  galleryLink?: string
}

export function EventPhotoGallery({ images, galleryLink }: EventPhotoGalleryProps) {
  if (!images || images.length === 0) return null

  const displayImages = images.slice(0, 6)

  return (
    <div id="photos" className="mt-16">
      <h3 className="text-2xl font-semibold mb-8">Photos</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {displayImages.map((imageUrl, index) => (
          <div key={index} className="relative h-48 rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt={`Event photo ${index + 1}`}
              fill
              className="object-cover hover:scale-105 transition-transform"
            />
          </div>
        ))}
      </div>

      {galleryLink && (
        <a
          href={galleryLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:underline font-semibold"
        >
          View more photos <ExternalLink className="h-4 w-4" />
        </a>
      )}
    </div>
  )
}
