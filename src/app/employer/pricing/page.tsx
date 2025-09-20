import { PricingTable } from "@/services/clerk/components/PricingTable"
import { generatePageMetadata } from "@/lib/metadata"

export const metadata = generatePageMetadata({
  title: "Pricing Plans - Choose the Right Plan for Your Hiring Needs",
  description: "Flexible pricing plans for employers to post jobs and find talent. Free tier available, premium features for advanced recruitment. No hidden fees, cancel anytime.",
  keywords: [
    "pricing plans",
    "job posting pricing",
    "recruitment pricing",
    "hiring platform cost",
    "employer plans",
    "job board pricing",
    "talent acquisition cost",
    "recruitment software pricing"
  ],
  path: "/employer/pricing",
})

export default function PricingPage() {
  return (
    <div className="flex items-center justify-center min-h-full p-4">
      <PricingTable />
    </div>
  )
}