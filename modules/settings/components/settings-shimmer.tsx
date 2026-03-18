import { ShimmerAvatar } from "@/components/ui/shimmer-avatar"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { ShimmerCard } from "@/components/ui/shimmer-card"
import { ShimmerText } from "@/components/ui/shimmer-text"
import { ShimmerHeading } from "@/components/ui/shimmer-text"

export function SettingsShimmer() {
  return (
    <div className="space-y-6">
      {/* Header shimmer */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <ShimmerHeading size="h1" className="w-24" />
          <ShimmerText lines={1} width="w-96" />
        </div>
        <div className="h-8 bg-gray-200 dark:bg-white/10 rounded-full w-32 animate-pulse"></div>
      </div>

      {/* Tabs shimmer */}
      <div className="w-full bg-gray-200 dark:bg-white/10 rounded-lg p-1">
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-10 bg-gray-100 dark:bg-white/5 rounded-md animate-pulse"></div>
          ))}
        </div>
      </div>

      {/* Profile section shimmer */}
      <div className="space-y-6">
        <ShimmerCard className="p-6">
          <div className="space-y-6">
            {/* Profile image and basic info */}
            <div className="flex items-start gap-6">
              <ShimmerAvatar size="xl" />
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-20 animate-pulse"></div>
                    <div className="h-10 bg-gray-100 dark:bg-white/5 rounded animate-pulse"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-24 animate-pulse"></div>
                    <div className="h-10 bg-gray-100 dark:bg-white/5 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form fields shimmer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-16 animate-pulse"></div>
                  <div className="h-10 bg-gray-100 dark:bg-white/5 rounded animate-pulse"></div>
                </div>
              ))}
            </div>

            {/* Bio field shimmer */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-12 animate-pulse"></div>
              <div className="h-24 bg-gray-100 dark:bg-white/5 rounded animate-pulse"></div>
            </div>

            {/* Buttons shimmer */}
            <div className="flex gap-4">
              <ShimmerButton className="w-24" />
              <ShimmerButton className="w-20" variant="outline" />
            </div>
          </div>
        </ShimmerCard>

        {/* Social links shimmer */}
        <ShimmerCard className="p-6">
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 dark:bg-white/10 rounded w-32 animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-20 animate-pulse"></div>
                  <div className="h-10 bg-gray-100 dark:bg-white/5 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </ShimmerCard>

        {/* Appearance settings shimmer */}
        <ShimmerCard className="p-6">
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 dark:bg-white/10 rounded w-28 animate-pulse"></div>
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-100 dark:bg-white/5 rounded-lg">
                  <div className="space-y-1">
                    <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-24 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 dark:bg-white/10 rounded w-32 animate-pulse"></div>
                  </div>
                  <div className="w-12 h-6 bg-gray-200 dark:bg-white/10 rounded-full animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </ShimmerCard>

        {/* Account settings shimmer */}
        <ShimmerCard className="p-6">
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 dark:bg-white/10 rounded w-24 animate-pulse"></div>
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-gray-200 dark:border-white/10 rounded-lg">
                  <div className="space-y-1">
                    <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-20 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 dark:bg-white/10 rounded w-28 animate-pulse"></div>
                  </div>
                  <ShimmerButton className="w-16" size="sm" />
                </div>
              ))}
            </div>
          </div>
        </ShimmerCard>

        {/* Quick tips shimmer */}
        <ShimmerCard className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="h-6 bg-gray-200 dark:bg-white/10 rounded w-24 animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-48 animate-pulse"></div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-200 dark:bg-white/10 rounded-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-32 animate-pulse"></div>
                  </div>
                  <div className="h-3 bg-gray-200 dark:bg-white/10 rounded w-full animate-pulse"></div>
                  <div className="h-3 bg-gray-200 dark:bg-white/10 rounded w-5/6 animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </ShimmerCard>
      </div>
    </div>
  )
}