import { JobListingItems } from "./_shared/JobListingItems"
import { generatePageMetadata } from "@/lib/metadata"

export const metadata = generatePageMetadata({
  title: "Find Your Dream Job - AI-Powered Job Search",
  description: "Discover thousands of job opportunities with our AI-powered search platform. Find remote, hybrid, and in-office positions across various industries. Advanced filtering, smart matching, and seamless application process.",
  keywords: [
    "job search",
    "careers",
    "employment",
    "remote jobs",
    "hybrid jobs",
    "in-office jobs",
    "AI job search",
    "job listings",
    "career opportunities",
    "find jobs",
    "job board",
    "employment platform"
  ],
  path: "/",
})

export default function HomePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[]>>
}) {
  return (
    <div className="m-4">
      <JobListingItems searchParams={searchParams} />
    </div>
  )
}