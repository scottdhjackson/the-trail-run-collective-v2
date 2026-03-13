import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { notFound, redirect } from 'next/navigation'
import { BookingRedirect } from './BookingRedirect'

const BOOK_QUERY = groq`*[_type == "event" && slug.current == $slug][0]{
  title,
  bookingLink,
  slug
}`

export const revalidate = 60

export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = await client.fetch(BOOK_QUERY, { slug })

  if (!event) notFound()

  if (!event.bookingLink) {
    redirect(`/register/${slug}`)
  }

  return <BookingRedirect bookingLink={event.bookingLink} eventTitle={event.title} />
}
