import { HeaderWithSettings } from '@/components/HeaderWithSettings'
import { client } from '@/sanity/lib/client'
import { PAGE_BY_SLUG_QUERY, PAGES_SLUGS_QUERY } from '@/sanity/lib/queries'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const revalidate = 60

export async function generateStaticParams() {
  const slugs: { slug: string }[] = await client.fetch(PAGES_SLUGS_QUERY)
  return slugs.filter((s) => s.slug).map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const page = await client.fetch(PAGE_BY_SLUG_QUERY, { slug })
  if (!page) return {}
  return {
    title: page.seoTitle || page.title,
    description: page.seoDescription,
  }
}

export default async function GenericPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const page = await client.fetch(PAGE_BY_SLUG_QUERY, { slug })

  if (!page) notFound()

  const paragraphs: string[] = (page.body || '').split(/\n\n+/).filter(Boolean)

  return (
    <>
      <HeaderWithSettings />
      <main className="min-h-screen">
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">{page.title}</h1>
            <div className="space-y-6 mb-12">
              {paragraphs.map((para, i) => (
                <p key={i} className="text-lg text-muted-foreground leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
            {page.ctaLabel && page.ctaUrl && (
              <Link
                href={page.ctaUrl}
                className="inline-block bg-primary text-primary-foreground font-semibold uppercase tracking-widest text-sm px-8 py-3 hover:opacity-90 transition-opacity"
              >
                {page.ctaLabel}
              </Link>
            )}
          </div>
        </section>
      </main>
    </>
  )
}
