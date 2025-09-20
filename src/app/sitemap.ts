import { MetadataRoute } from 'next'
import { db } from '@/drizzle/db'
import { JobListingTable } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.SERVER_URL || 'https://ai-jobs.com'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/ai-search`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/employer`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/employer/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ]

  // Dynamic job listing pages
  const publishedJobListings = await db.query.JobListingTable.findMany({
    where: eq(JobListingTable.status, 'published'),
    columns: {
      id: true,
      updatedAt: true,
    },
  })

  const jobListingPages = publishedJobListings.map((jobListing) => ({
    url: `${baseUrl}/job-listings/${jobListing.id}`,
    lastModified: jobListing.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  return [...staticPages, ...jobListingPages]
}
