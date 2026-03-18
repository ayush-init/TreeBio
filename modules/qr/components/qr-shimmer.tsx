import { ShimmerAvatar } from "@/components/ui/shimmer-avatar"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { ShimmerCard } from "@/components/ui/shimmer-card"
import { ShimmerText } from "@/components/ui/shimmer-text"
import { ShimmerHeading } from "@/components/ui/shimmer-text"

export function QRShimmer() {
  return (
    <div className="space-y-6">
      {/* Header shimmer */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <ShimmerHeading size="h1" className="w-48" />
          <ShimmerText lines={1} width="w-80" />
        </div>
        <div className="h-8 bg-gray-200 dark:bg-white/10 rounded-full w-20 animate-pulse"></div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* QR Code Card shimmer */}
        <ShimmerCard>
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-200 dark:bg-white/10 rounded animate-pulse"></div>
              <div className="h-6 bg-gray-200 dark:bg-white/10 rounded w-24 animate-pulse"></div>
            </div>
            <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-40 animate-pulse"></div>
            
            {/* QR Code placeholder shimmer */}
            <div className="flex justify-center">
              <div className="w-64 h-64 bg-gray-200 dark:bg-white/10 rounded-lg animate-pulse"></div>
            </div>
            
            {/* Download buttons shimmer */}
            <div className="flex gap-2">
              <ShimmerButton className="flex-1" variant="outline" />
              <ShimmerButton className="flex-1" variant="outline" />
            </div>
          </div>
        </ShimmerCard>

        {/* Profile Preview Card shimmer */}
        <ShimmerCard>
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-200 dark:bg-white/10 rounded animate-pulse"></div>
              <div className="h-6 bg-gray-200 dark:bg-white/10 rounded w-32 animate-pulse"></div>
            </div>
            <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-44 animate-pulse"></div>
            
            {/* Profile preview shimmer */}
            <div className="flex items-center space-x-4 p-4 bg-gray-100 dark:bg-white/5 rounded-lg">
              <ShimmerAvatar size="lg" />
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-gray-200 dark:bg-white/10 rounded w-32 animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-24 animate-pulse"></div>
                <div className="h-3 bg-gray-200 dark:bg-white/10 rounded w-full animate-pulse"></div>
              </div>
            </div>

            <div className="space-y-3">
              {/* Input field shimmer */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-20 animate-pulse"></div>
                <div className="flex gap-2 mt-1">
                  <div className="flex-1 h-10 bg-gray-100 dark:bg-white/5 rounded animate-pulse"></div>
                  <div className="w-10 h-10 bg-gray-200 dark:bg-white/10 rounded animate-pulse"></div>
                </div>
              </div>

              {/* Action buttons shimmer */}
              <div className="flex gap-2">
                <ShimmerButton className="flex-1" variant="outline" />
                <ShimmerButton className="flex-1" />
              </div>
            </div>

            {/* Status indicator shimmer */}
            <div className="p-3 bg-gray-100 dark:bg-white/5 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 dark:bg-white/10 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-32 animate-pulse"></div>
              </div>
            </div>
          </div>
        </ShimmerCard>
      </div>

      {/* Usage Tips shimmer */}
      <ShimmerCard>
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <div className="h-6 bg-gray-200 dark:bg-white/10 rounded w-28 animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-48 animate-pulse"></div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-200 dark:bg-white/10 rounded-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-24 animate-pulse"></div>
                </div>
                <div className="h-3 bg-gray-200 dark:bg-white/10 rounded w-full animate-pulse"></div>
                <div className="h-3 bg-gray-200 dark:bg-white/10 rounded w-5/6 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </ShimmerCard>
    </div>
  )
}