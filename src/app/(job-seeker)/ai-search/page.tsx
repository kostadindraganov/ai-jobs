import { AsyncIf } from "@/components/AsyncIf"
import { LoadingSwap } from "@/components/LoadingSwap"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { JobListingAiSearchForm } from "@/features/jobListings/components/JobListingAiSearchForm"
import { SignUpButton } from "@/services/clerk/components/AuthButtons"
import { getCurrentUser } from "@/services/clerk/lib/getCurrentAuth"
import { generatePageMetadata } from "@/lib/metadata"

export const metadata = generatePageMetadata({
  title: "AI-Powered Job Search - Find Jobs with Artificial Intelligence",
  description: "Use our advanced AI search to find the perfect job match. Our intelligent algorithm analyzes your preferences and matches you with the best job opportunities. Smart filtering, personalized results, and instant recommendations.",
  keywords: [
    "AI job search",
    "artificial intelligence jobs",
    "smart job search",
    "AI-powered job matching",
    "intelligent job search",
    "personalized job recommendations",
    "AI job finder",
    "machine learning jobs",
    "tech jobs",
    "job search AI"
  ],
  path: "/ai-search",
})

export default function AiSearchPage() {
  return (
    <div className="p-4 flex items-center justify-center min-h-full">
      <Card className="max-w-4xl">
        <AsyncIf
          condition={async () => {
            const { userId } = await getCurrentUser()
            return userId != null
          }}
          loadingFallback={
            <LoadingSwap isLoading>
              <AiCard />
            </LoadingSwap>
          }
          otherwise={<NoPermission />}
        >
          <AiCard />
        </AsyncIf>
      </Card>
    </div>
  )
}

function AiCard() {
  return (
    <>
      <CardHeader>
        <CardTitle>AI Search</CardTitle>
        <CardDescription>
          This can take a few minutes to process, so please be patient.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <JobListingAiSearchForm />
      </CardContent>
    </>
  )
}

function NoPermission() {
  return (
    <CardContent className="text-center">
      <h2 className="text-xl font-bold mb-1">Permission Denied</h2>
      <p className="mb-4 text-muted-foreground">
        You need to create an account before using AI search
      </p>
      <SignUpButton />
    </CardContent>
  )
}