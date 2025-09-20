import dynamic from 'next/dynamic'
import { LoadingSpinner } from '@/components/LoadingSpinner'

interface LazyComponentProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function LazyComponent({ children }: LazyComponentProps) {
  return (
    <div>
      {children}
    </div>
  )
}

// Pre-configured lazy components for common use cases
export const LazyJobListingItems = dynamic(
  () => import('@/app/(job-seeker)/_shared/JobListingItems').then(mod => ({ default: mod.JobListingItems })),
  {
    loading: () => <LoadingSpinner />,
    ssr: true,
  }
)
