import { Star } from 'lucide-react'

type Review = {
  name: string
  quote: string
  rating?: number
}

type EventReviewsProps = {
  reviews: Review[]
}

export function EventReviews({ reviews }: EventReviewsProps) {
  if (!reviews || reviews.length === 0) return null

  return (
    <div id="reviews" className="mt-16">
      <h3 className="text-2xl font-semibold mb-8">What Runners Say</h3>

      <div className="grid md:grid-cols-2 gap-6">
        {reviews.map((review, index) => (
          <div key={index} className="border border-border rounded-lg p-6">
            {review.rating && (
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < review.rating! ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            )}

            <p className="text-muted-foreground mb-4 italic">"{review.quote}"</p>
            <p className="font-semibold">— {review.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
