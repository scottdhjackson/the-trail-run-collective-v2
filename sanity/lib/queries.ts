import { groq } from 'next-sanity'

export const SITE_SETTINGS_QUERY = groq`*[_type == "siteSettings"][0]{
  brandName,
  tagline,
  contactEmail,
  socialLinks,
  seoTitle,
  seoDescription,
  aboutHeading,
  aboutBody,
  aboutCtaLabel,
  "logoUrl": logo.asset->url,
  logoWidth,
  "heroBannerImageUrl": heroBannerImage.asset->url,
  "aboutImageUrls": aboutBackgroundImage[].asset->url,
  colours {
    navBackground,
    navText,
    bannerOverlay,
    footerBackground,
    footerText,
  }
}`

export const EVENTS_QUERY = groq`*[_type == "event" && isPublished == true] | order(date asc) {
  _id,
  title,
  slug,
  shortDescription,
  longDescription,
  location,
  date,
  cardImage,
  comingSoon,
  bookingLink,
  "heroImageUrl": heroImage.asset->url,
  distances[] {
    label,
    stripePriceId,
    isOpen,
    sortOrder,
    price
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
  venueName,
  town,
  county,
  postcode,
  googleMapsLink,
  what3words,
  "locationImageUrl": locationImage.asset->url,
  "heroImageUrl": heroImage.asset->url,
  cardImage,
  bookingLink,
  registrationOpens,
  registrationCloses,
  startTime,
  difficultyDescription,
  showPartnerPromo,
  partnerName,
  "partnerLogoUrl": partnerLogo.asset->url,
  partnerDescription,
  partnerLink,
  whatYouGet,
  showPhotoGallery,
  "galleryImages": galleryImages[].asset->url,
  galleryLink,
  showReviews,
  reviews[] {
    name,
    quote,
    rating
  },
  showGettingThere,
  gettingThereByCar,
  gettingThereByTrainStation,
  gettingThereByTrainRoute,
  gettingThereByTrainTime,
  gettingThereByTaxiCompany,
  gettingThereByTaxiPhone,
  kitList->{
    _id,
    title,
    slug,
    requiredEquipment[] {
      _key,
      item
    }
  },
  showKitListInline,
  distances[] {
    _key,
    label,
    stripePriceId,
    isOpen,
    sortOrder,
    distanceValue,
    distanceUnit,
    elevationGain,
    price,
    description,
    "gpxFileUrl": gpxFile.asset->url,
    "routeMapImageUrl": routeMapImage.asset->url
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

export const KIT_LIST_BY_SLUG_QUERY = groq`*[_type == "kitList" && slug.current == $slug && isPublished == true][0]{
  _id,
  title,
  slug,
  requiredEquipment[] {
    _key,
    item
  },
  importantNotes[] {
    _key,
    note
  },
  footerText
}`
