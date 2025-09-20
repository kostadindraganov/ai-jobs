import Head from 'next/head'
import { getSiteMetadata } from '@/lib/metadata'

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string[]
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  structuredData?: Record<string, unknown>
  noindex?: boolean
}

export function SEOHead({
  title,
  description,
  keywords = [],
  canonical,
  ogType = 'website',
  structuredData,
  noindex = false,
}: SEOHeadProps) {
  const site = getSiteMetadata()
  const baseUrl = process.env.SERVER_URL || 'https://ai-jobs.com'
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} - Find Your Dream Job with AI-Powered Search`
  const fullDescription = description || site.description
  const fullCanonical = canonical ? `${baseUrl}${canonical}` : baseUrl
  
  // Generate dynamic OG image URL
  const ogImageUrl = `${baseUrl}/og?${new URLSearchParams({
    title: fullTitle,
    description: fullDescription,
    type: 'default'
  }).toString()}`

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      <link rel="canonical" href={fullCanonical} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={ogImageUrl} />
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}
    </Head>
  )
}
