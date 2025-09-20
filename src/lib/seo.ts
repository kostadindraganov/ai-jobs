import type { Metadata } from "next"

export interface JobListingStructuredData {
  "@context": "https://schema.org"
  "@type": "JobPosting"
  title: string
  description: string
  datePosted: string
  validThrough?: string
  employmentType: string
  hiringOrganization: {
    "@type": "Organization"
    name: string
    imageUrl?: string
  }
  jobLocation?: {
    "@type": "Place"
    address: {
      "@type": "PostalAddress"
      addressLocality?: string
      addressRegion?: string
      addressCountry: string
    }
  }
  baseSalary?: {
    "@type": "MonetaryAmount"
    currency: string
    value: {
      "@type": "QuantitativeValue"
      minValue?: number
      maxValue?: number
      unitText: string
    }
  }
  workHours?: string
  skills?: string[]
  qualifications?: string[]
  responsibilities?: string[]
}

export interface OrganizationStructuredData {
  "@context": "https://schema.org"
  "@type": "Organization"
  name: string
  url?: string
  logo?: string
  description?: string
  sameAs?: string[]
  contactPoint?: {
    "@type": "ContactPoint"
    contactType: string
    email?: string
    telephone?: string
  }
}

export interface WebsiteStructuredData {
  "@context": "https://schema.org"
  "@type": "WebSite"
  name: string
  url: string
  description: string
  potentialAction: {
    "@type": "SearchAction"
    target: {
      "@type": "EntryPoint"
      urlTemplate: string
    }
    "query-input": "required name=search_term_string"
  }
}

export function generateJobListingStructuredData(jobListing: {
  id: string
  title: string
  description: string
  postedAt: Date | null
  type: string
  wage?: number | null
  wageInterval?: string | null
  wageCurrencyInterval?: string | null
  city?: string | null
  stateAbbreviation?: string | null
  organization: {
    name: string
    imageUrl?: string | null
  }
}): JobListingStructuredData {
  
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: jobListing.title,
    description: jobListing.description,
    datePosted: jobListing.postedAt?.toISOString() || new Date().toISOString(),
    employmentType: jobListing.type,
    hiringOrganization: {
      "@type": "Organization",
      name: jobListing.organization.name,
      imageUrl: jobListing.organization.imageUrl || undefined,
    },
    ...(jobListing.city && jobListing.stateAbbreviation && {
      jobLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: jobListing.city,
          addressRegion: jobListing.stateAbbreviation,
          addressCountry: "US",
        },
      },
    }),
    ...(jobListing.wage && jobListing.wageInterval && jobListing.wageCurrencyInterval && {
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: jobListing.wageCurrencyInterval,
        value: {
          "@type": "QuantitativeValue",
          minValue: jobListing.wage,
          unitText: jobListing.wageInterval,
        },
      },
    }),
  }
}

export function generateOrganizationStructuredData(organization: {
  name: string
  imageUrl?: string | null
}): OrganizationStructuredData {
  const baseUrl = process.env.SERVER_URL || 'https://ai-jobs.com'
  
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: organization.name,
    url: baseUrl,
    logo: organization.imageUrl || undefined,
  }
}

export function generateWebsiteStructuredData(): WebsiteStructuredData {
  const baseUrl = process.env.SERVER_URL || 'https://ai-jobs.com'
  
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AI Jobs",
    url: baseUrl,
    description: "Discover the best job opportunities with our AI-powered job search platform. Find remote, hybrid, and in-office positions across various industries.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }
}

export function generateBreadcrumbStructuredData(items: Array<{
  name: string
  url: string
}>): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

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
      'jobs',
      'careers',
      'employment',
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
