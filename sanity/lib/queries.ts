import { groq } from 'next-sanity'

export const SITE_SETTINGS_QUERY = groq`*[_type == "siteSettings"][0]{
  brandName,
  tagline,
  contactEmail,
  socialLinks,
  seoTitle,
  seoDescription
}`

export const EVENTS_QUERY = groq`*[_type == "event" && isPublished == true] | order(_createdAt asc) {
  _id,
  title,
  slug,
  shortDescription,
  longDescription,
  location,
  date,
  cardImage,
  "heroImageUrl": heroImage.asset->url,
  distances[] {
    label,
    stripePriceId,
    isOpen,
    sortOrder
  }
}`

export const EVENT_BY_SLUG_QUERY = groq`*[_type == "event" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  shortDescription,
  longDescription,
  location,
  date,
  distances[] {
    label,
    stripePriceId,
    isOpen,
    sortOrder
  }
}`

export const FAQS_QUERY = groq`*[_type == "faq" && isPublished == true] | order(sortOrder asc, _createdAt asc) {
  _id,
  question,
  answer,
  category,
  sortOrder
}`

export const FAQS_BY_CATEGORY_QUERY = groq`*[_type == "faq" && isPublished == true && category == $category] | order(sortOrder asc, _createdAt asc) {
  _id,
  question,
  answer,
  category,
  sortOrder
}`
