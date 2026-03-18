import { ShimmerCard } from "@/components/ui/shimmer-card"
import { ShimmerText } from "@/components/ui/shimmer-text"
import { ShimmerHeading } from "@/components/ui/shimmer-text"
import { Skeleton } from "@/components/ui/skeleton"

export function OverviewShimmer() {
  return (
    <div className="space-y-6">
      {/* Page header shimmer */}
      <div className="mb-8 space-y-2">
        <ShimmerHeading size="h1" className="w-1/3" />
        <ShimmerText lines={2} width={["w-full", "w-2/3"]} />
      </div>

      {/* Stats cards shimmer */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <ShimmerCard key={i} className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gray-200 dark:bg-white/10 rounded-lg animate-pulse"></div>
              <div className="flex-1">
                <div className="h-8 bg-gray-200 dark:bg-white/10 rounded w-20 animate-pulse"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 dark:bg-white/10 rounded w-16 animate-pulse"></div>
              <div className="h-2 bg-gray-200 dark:bg-white/10 rounded w-full animate-pulse"></div>
            </div>
          </ShimmerCard>
        ))}
      </div>

      {/* Chart and tables shimmer */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Chart shimmer */}
        <div className="lg:col-span-2">
          <ShimmerCard className="p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="h-6 bg-gray-200 dark:bg-white/10 rounded w-32 animate-pulse"></div>
              <div className="flex gap-2">
                <div className="h-8 bg-gray-200 dark:bg-white/10 rounded w-16 animate-pulse"></div>
                <div className="h-8 bg-gray-200 dark:bg-white/10 rounded w-16 animate-pulse"></div>
              </div>
            </div>
            {/* Chart area shimmer */}
            <div className="h-48 bg-gray-200 dark:bg-white/10 rounded animate-pulse"></div>
          </ShimmerCard>
        </div>

        {/* Top links table shimmer */}
        <ShimmerCard className="p-6">
          <div className="h-6 bg-gray-200 dark:bg-white/10 rounded w-24 animate-pulse mb-4"></div>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-white/5 rounded">
                <div className="w-8 h-8 bg-gray-200 dark:bg-white/10 rounded animate-pulse"></div>
                <div className="flex-1 space-y-1">
                  <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-3/4 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 dark:bg-white/10 rounded w-1/2 animate-pulse"></div>
                </div>
                <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-12 animate-pulse"></div>
              </div>
            ))}
          </div>
        </ShimmerCard>

        {/* Recent activity shimmer */}
        <ShimmerCard className="p-6">
          <div className="h-6 bg-gray-200 dark:bg-white/10 rounded w-32 animate-pulse mb-4"></div>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3">
                <div className="w-2 h-2 bg-gray-200 dark:bg-white/10 rounded-full animate-pulse"></div>
                <div className="flex-1 space-y-1">
                  <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-full animate-pulse"></div>
                  <div className="h-3 bg-gray-200 dark:bg-white/10 rounded w-20 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </ShimmerCard>
      </div>
    </div>
  )
}