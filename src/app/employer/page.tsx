import { db } from "@/drizzle/db"
import { JobListingTable } from "@/drizzle/schema"
import { getJobListingOrganizationTag } from "@/features/jobListings/db/cache/jobListings"
import { getCurrentOrganization } from "@/services/clerk/lib/getCurrentAuth"
import { desc, eq } from "drizzle-orm"
import { cacheTag } from "next/dist/server/use-cache/cache-tag"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import { generatePageMetadata } from "@/lib/metadata"

export const metadata = generatePageMetadata({
  title: "Employer Dashboard - Post Jobs and Manage Applications",
  description: "Post job listings, manage applications, and find the best talent for your organization. Advanced AI-powered candidate matching, streamlined hiring process, and comprehensive analytics.",
  keywords: [
    "employer dashboard",
    "post jobs",
    "job posting",
    "hiring platform",
    "recruitment",
    "talent acquisition",
    "job management",
    "candidate management",
    "hiring tools",
    "employer portal"
  ],
  path: "/employer",
})

export default function EmployerHomePage() {
  return (
    <Suspense>
      <SuspendedPage />
    </Suspense>
  )
}

async function SuspendedPage() {
  const { orgId } = await getCurrentOrganization()
  if (orgId == null) return null

  const jobListing = await getMostRecentJobListing(orgId)
  if (jobListing == null) {
    redirect("/employer/job-listings/new")
  } else {
    redirect(`/employer/job-listings/${jobListing.id}`)
  }
}

async function getMostRecentJobListing(orgId: string) {
  "use cache"
  cacheTag(getJobListingOrganizationTag(orgId))

  return db.query.JobListingTable.findFirst({
    where: eq(JobListingTable.organizationId, orgId),
    orderBy: desc(JobListingTable.createdAt),
    columns: { id: true },
  })
}