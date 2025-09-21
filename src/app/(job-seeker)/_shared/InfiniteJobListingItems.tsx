"use client"

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { convertSearchParamsToString } from "@/lib/convertSearchParamsToString"
import { cn } from "@/lib/utils"
import { AvatarFallback } from "@radix-ui/react-avatar"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { JobListingBadges } from "@/features/jobListings/components/JobListingBadges"
import { getPaginatedJobListings } from "@/features/jobListings/actions/actions"
import { OrganizationTable } from "@/drizzle/schema"
import { differenceInDays } from "date-fns"
import { useEffect, useRef, useState, useCallback } from "react"
import { LoadingSpinner } from "@/components/LoadingSpinner"

type Props = {
  initialSearchParams: Record<string, string | string[]>
  initialJobListings: Array<{
    id: string
    title: string
    stateAbbreviation: string | null
    city: string | null
    wage: number | null
    wageInterval: string | null
    wageCurrencyInterval: string | null
    experienceLevel: string | null
    type: string | null
    postedAt: Date | null
    locationRequirement: string | null
    isFeatured: boolean | null
    organization: {
      id: string
      name: string
      imageUrl: string | null
    }
  }>
  initialPagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

export function InfiniteJobListingItems({
  initialSearchParams,
  initialJobListings,
  initialPagination,
}: Props) {
  const [jobListings, setJobListings] = useState(initialJobListings)
  const [pagination, setPagination] = useState(initialPagination)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  // Reset state when search params change
  useEffect(() => {
    setJobListings(initialJobListings)
    setPagination(initialPagination)
    setError(null)
  }, [initialSearchParams, initialJobListings, initialPagination])

  const loadMore = useCallback(async () => {
    if (isLoading || !pagination.hasNextPage) return

    setIsLoading(true)
    setError(null)

    try {
      const result = await getPaginatedJobListings(
        initialSearchParams,
        pagination.page + 1,
        pagination.limit
      )

      setJobListings(prev => [...prev, ...result.data])
      setPagination(result.pagination)
    } catch (err) {
      setError("Failed to load more job listings")
      console.error("Error loading more job listings:", err)
    } finally {
      setIsLoading(false)
    }
  }, [isLoading, pagination.hasNextPage, pagination.page, pagination.limit, initialSearchParams])

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && pagination.hasNextPage && !isLoading) {
          loadMore()
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      }
    )

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [loadMore, pagination.hasNextPage, isLoading])

  if (jobListings.length === 0) {
    return (
      <div className="text-muted-foreground p-4 text-center text-2xl my-10">
        No job listings found
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {jobListings.map(jobListing => (
        <Link
          className="block"
          key={jobListing.id}
          href={`/job-listings/${jobListing.id}?${convertSearchParamsToString(
            initialSearchParams
          )}`}
        >
          <JobListingListItem
            jobListing={jobListing}
            organization={jobListing.organization}
          />
        </Link>
      ))}

      {/* Load more trigger */}
      <div ref={loadMoreRef} className="h-4" />

      {/* Loading state */}
      {isLoading && (
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="text-center py-8">
          <p className="text-destructive mb-4">{error}</p>
          <button
            onClick={loadMore}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Try Again
          </button>
        </div>
      )}

      {/* End of results */}
      {!pagination.hasNextPage && jobListings.length > 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>You&apos;ve reached the end of the job listings</p>
          <p className="text-sm mt-1">
            Showing {jobListings.length} of {pagination.total} jobs
          </p>
        </div>
      )}
    </div>
  )
}

function JobListingListItem({
  jobListing,
  organization,
}: {
  jobListing: {
    title: string
    stateAbbreviation: string | null
    city: string | null
    wage: number | null
    wageInterval: string | null
    wageCurrencyInterval: string | null
    experienceLevel: string | null
    type: string | null
    postedAt: Date | null
    locationRequirement: string | null
    isFeatured: boolean | null
  }
  organization: Pick<typeof OrganizationTable.$inferSelect, "name" | "imageUrl">
}) {
  const nameInitials = organization?.name
    .split(" ")
    .splice(0, 4)
    .map(word => word[0])
    .join("")

  return (
    <Card
      className={cn(
        "@container",
        jobListing.isFeatured && "border-featured bg-featured/20"
      )}
    >
      <CardHeader>
        <div className="flex gap-4">
          <Avatar className="size-14 @max-sm:hidden">
            <AvatarImage
              src={organization.imageUrl ?? undefined}
              alt={organization.name}
            />
            <AvatarFallback className="uppercase bg-primary text-primary-foreground">
              {nameInitials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <CardTitle className="text-xl">
              {jobListing.title}
            </CardTitle>
            <CardDescription className="text-base">
              {organization.name}
            </CardDescription>
            {jobListing.postedAt != null && (
              <div className="text-sm font-medium text-primary @min-md:hidden">
                <DaysSincePosting postedAt={jobListing.postedAt} />
              </div>
            )}
          </div>
          {jobListing.postedAt != null && (
            <div className="text-sm font-medium text-primary ml-auto @max-md:hidden">
              <DaysSincePosting postedAt={jobListing.postedAt} />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        <JobListingBadges
          jobListing={{
            ...jobListing,
            experienceLevel: (jobListing.experienceLevel as "junior" | "mid-level" | "senior" | "c-level") || "junior",
            type: (jobListing.type as "internship" | "part-time" | "full-time" | "contract") || "full-time",
            locationRequirement: (jobListing.locationRequirement as "in-office" | "hybrid" | "remote") || "in-office",
            wageInterval: (jobListing.wageInterval as "hourly" | "monthly" | "yearly" | null) || null,
            wageCurrencyInterval: (jobListing.wageCurrencyInterval as "USD" | "EUR" | null) || null,
            isFeatured: jobListing.isFeatured || false,
          }}
          className={jobListing.isFeatured ? "border-primary/35" : undefined}
        />
      </CardContent>
    </Card>
  )
}

function DaysSincePosting({ postedAt }: { postedAt: Date }) {
  const daysSincePosted = differenceInDays(postedAt, Date.now())

  if (daysSincePosted === 0) {
    return (
      <Badge variant="outline">
        <span className="text-purple-600 dark:text-yellow-400">New</span>
      </Badge>
    )
  }

  return new Intl.RelativeTimeFormat(undefined, {
    style: "narrow",
    numeric: "always",
  }).format(daysSincePosted, "days")
}
