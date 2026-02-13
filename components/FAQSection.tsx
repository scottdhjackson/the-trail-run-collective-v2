'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

type FAQ = {
  _id: string
  question: string
  answer: string
  category: string
}

type FAQSectionProps = {
  faqs: FAQ[]
  title?: string
  description?: string
  showCategories?: boolean
}

export function FAQSection({ faqs, title = "Frequently Asked Questions", description, showCategories = false }: FAQSectionProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  // Group FAQs by category if showCategories is true
  const groupedFaqs = showCategories
    ? faqs.reduce((acc, faq) => {
        if (!acc[faq.category]) {
          acc[faq.category] = []
        }
        acc[faq.category].push(faq)
        return acc
      }, {} as Record<string, FAQ[]>)
    : { all: faqs }

  const categoryNames: Record<string, string> = {
    general: 'General',
    events: 'Events',
    registration: 'Registration',
    'race-day': 'Race Day',
    training: 'Training',
  }

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tight mb-4">{title}</h2>
            {description && (
              <p className="text-lg text-muted-foreground">{description}</p>
            )}
          </div>

          {Object.entries(groupedFaqs).map(([category, categoryFaqs]) => (
            <div key={category} className="mb-8">
              {showCategories && category !== 'all' && (
                <h3 className="text-2xl font-semibold mb-4 capitalize">
                  {categoryNames[category] || category}
                </h3>
              )}

              <div className="space-y-4">
                {categoryFaqs.map((faq) => (
                  <div
                    key={faq._id}
                    className="border border-border rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenId(openId === faq._id ? null : faq._id)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                    >
                      <span className="font-semibold text-foreground pr-8">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 text-muted-foreground transition-transform flex-shrink-0 ${
                          openId === faq._id ? 'transform rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openId === faq._id && (
                      <div className="px-6 py-4 bg-muted/30 border-t border-border">
                        <p className="text-muted-foreground whitespace-pre-line">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
