import { env } from '@/data/env/client'
import type { Metadata } from 'next'

// Default values for metadata
const DEFAULT_SITE_NAME = 'AI Jobs'
const DEFAULT_SITE_DESCRIPTION = 'Discover the best job opportunities with our AI-powered job search platform. Find remote, hybrid, and in-office positions across various industries. Advanced search, smart matching, and seamless application process.'
const DEFAULT_SITE_KEYWORDS = [
  'jobs',
  'careers',
  'employment',
  'AI jobs',
  'remote jobs',
  'hybrid jobs',
  'job search',
  'career opportunities',
  'job listings',
  'employment platform'
]
const DEFAULT_SITE_AUTHOR = 'AI Jobs Platform'
const DEFAULT_SITE_PUBLISHER = 'AI Jobs Platform'

// Get metadata values from environment or use defaults
export function getSiteMetadata() {
  return {
    name: env.NEXT_PUBLIC_SITE_NAME || DEFAULT_SITE_NAME,
    description: env.NEXT_PUBLIC_SITE_DESCRIPTION || DEFAULT_SITE_DESCRIPTION,
    keywords: env.NEXT_PUBLIC_SITE_KEYWORDS 
      ? env.NEXT_PUBLIC_SITE_KEYWORDS.split(',').map(k => k.trim())
      : DEFAULT_SITE_KEYWORDS,
    author: env.NEXT_PUBLIC_SITE_AUTHOR || DEFAULT_SITE_AUTHOR,
    publisher: env.NEXT_PUBLIC_SITE_PUBLISHER || DEFAULT_SITE_PUBLISHER,
  }
}

// Generate base metadata for the site
export function generateBaseMetadata(): Metadata {
  const site = getSiteMetadata()
  const baseUrl = process.env.SERVER_URL || 'https://ai-jobs.com'
  
  return {
    title: {
      default: `${site.name} - Find Your Dream Job with AI-Powered Search`,
      template: `%s | ${site.name}`
    },
    description: site.description,
    keywords: site.keywords,
    authors: [{ name: site.author }],
    creator: site.author,
    publisher: site.publisher,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: '/',
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: '/',
      title: `${site.name} - Find Your Dream Job with AI-Powered Search`,
      description: site.description,
      siteName: site.name,
      images: [
        {
          url: `/og?title=${encodeURIComponent(site.name)}&description=${encodeURIComponent(site.description)}&type=default`,
          width: 1200,
          height: 630,
          alt: `${site.name} - Find Your Dream Job`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${site.name} - Find Your Dream Job with AI-Powered Search`,
      description: site.description,
      images: [`/og?title=${encodeURIComponent(site.name)}&description=${encodeURIComponent(site.description)}&type=default`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

// Generate page-specific metadata
export function generatePageMetadata({
  title,
  description,
  keywords = [],
  path = '/',
  ogType = 'website',
  ogImageTitle,
  ogImageDescription,
}: {
  title: string
  description: string
  keywords?: string[]
  path?: string
  ogType?: 'website' | 'article'
  ogImageTitle?: string
  ogImageDescription?: string
}): Metadata {
  const site = getSiteMetadata()
  const baseUrl = process.env.SERVER_URL || 'https://ai-jobs.com'
  const fullTitle = title.includes(site.name) ? title : `${title} | ${site.name}`
  const fullDescription = description || site.description
  const allKeywords = [...site.keywords, ...keywords]
  
  // Generate OG image URL
  const ogImageUrl = `/og?${new URLSearchParams({
    title: ogImageTitle || title,
    description: ogImageDescription || description,
    type: ogType === 'article' ? 'job' : 'default'
  }).toString()}`
  
  return {
    title: fullTitle,
    description: fullDescription,
    keywords: allKeywords,
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      type: ogType,
      url: `${baseUrl}${path}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: `${baseUrl}${path}`,
    },
  }
}

// Generate job listing specific metadata
export function generateJobListingMetadata(jobListing: {
  id: string
  title: string
  description: string
  organization: {
    name: string
  }
  city?: string | null
  stateAbbreviation?: string | null
  type: string
  experienceLevel: string
  locationRequirement: string
}): Metadata {
  const site = getSiteMetadata()
  const baseUrl = process.env.SERVER_URL || 'https://ai-jobs.com'
  const location = jobListing.city && jobListing.stateAbbreviation 
    ? `${jobListing.city}, ${jobListing.stateAbbreviation}` 
    : jobListing.locationRequirement === 'remote' 
      ? 'Remote' 
      : 'Various Locations'
  
  const title = `${jobListing.title} at ${jobListing.organization.name} - ${location}`
  const description = `${jobListing.description.substring(0, 150)}... | ${jobListing.type} position | ${jobListing.experienceLevel} level | Apply now!`
  
  // Generate dynamic OG image URL
  const ogImageUrl = `${baseUrl}/og?${new URLSearchParams({
    title: jobListing.title,
    description: `${jobListing.type} position at ${jobListing.organization.name}`,
    company: jobListing.organization.name,
    location: location,
    type: 'job'
  }).toString()}`

  return {
    title,
    description,
    keywords: [
      jobListing.title,
      jobListing.organization.name,
      jobListing.type,
      jobListing.experienceLevel,
      jobListing.locationRequirement,
      location,
      ...site.keywords,
    ],
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${baseUrl}/job-listings/${jobListing.id}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${jobListing.title} at ${jobListing.organization.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: `${baseUrl}/job-listings/${jobListing.id}`,
    },
  }
}
