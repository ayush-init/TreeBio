import { ShimmerAvatar } from "@/components/ui/shimmer-avatar"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { ShimmerCard } from "@/components/ui/shimmer-card"
import { ShimmerText } from "@/components/ui/shimmer-text"
import { ShimmerHeading } from "@/components/ui/shimmer-text"

export function MyTreeShimmer() {
  return (
    <section className="flex flex-col gap-6 px-6 py-6 h-[calc(100vh-4rem)] overflow-hidden">
      {/* Header shimmer */}
      <div className="flex flex-row items-center justify-between w-full flex-shrink-0">
        <div className="flex flex-row justify-center items-center gap-3">
          <ShimmerButton className="w-24" />
          <ShimmerButton className="w-20" variant="outline" />
        </div>
      </div>

      {/* Main content shimmer */}
      <div className="flex flex-col lg:flex-row gap-8 flex-1 min-h-0">
        {/* Form section shimmer */}
        <div className="flex-1 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          <div className="pr-0 lg:pr-8 pb-8 space-y-8">
            {/* Profile card shimmer */}
            <ShimmerCard className="border-2 border-dashed border-gray-200 dark:border-white/20">
              <div className="p-8">
                <div className="flex items-start gap-6">
                  <ShimmerAvatar size="xl" />
                  <div className="flex-1 space-y-4">
                    <div className="h-6 bg-gray-200 dark:bg-white/10 rounded w-32 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-48 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-24 animate-pulse"></div>
                  </div>
                </div>
                
                {/* Social links shimmer */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-white/10 flex gap-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="w-10 h-10 bg-gray-200 dark:bg-white/10 rounded-full animate-pulse"></div>
                  ))}
                  <div className="w-10 h-10 border-2 border-dashed border-gray-300 dark:border-white/30 bg-gray-100 dark:bg-white/5 rounded-full animate-pulse"></div>
                </div>
              </div>
            </ShimmerCard>

            {/* Links shimmer */}
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <ShimmerCard key={i}>
                  <div className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 dark:bg-white/10 rounded-full animate-pulse"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-3/4 animate-pulse"></div>
                        <div className="h-3 bg-gray-200 dark:bg-white/10 rounded w-1/2 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </ShimmerCard>
              ))}
              <div className="w-full h-14 border-2 border-dashed border-gray-300 dark:border-white/30 bg-gray-100 dark:bg-white/5 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Preview frame shimmer */}
        <div className="order-1 lg:order-2 w-full lg:w-96 flex-shrink-0 overflow-hidden">
          <div className="flex-1 flex justify-center items-center min-w-0">
            <div className="w-[280px] h-[580px] bg-gray-800 dark:bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl border border-gray-700 dark:border-white/10">
              <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded-[2rem] overflow-hidden relative border border-gray-300 dark:border-white/20">
                <div className="absolute top-0 left-0 right-0 h-6 bg-transparent flex items-center justify-center">
                  <div className="w-20 h-1 bg-gray-600 dark:bg-gray-400 rounded-full animate-pulse"></div>
                </div>
                <div className="pt-8 pb-4 px-4 h-full flex flex-col">
                  {/* Profile preview shimmer */}
                  <div className="flex flex-col items-center text-center space-y-3 mb-6">
                    <ShimmerAvatar size="xl" />
                    <div className="space-y-2">
                      <div className="h-6 bg-gray-200 dark:bg-white/10 rounded w-32 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-48 animate-pulse"></div>
                    </div>
                  </div>
                  
                  {/* Links preview shimmer */}
                  <div className="flex-1 space-y-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-white/10 p-3 shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-gray-200 dark:bg-white/10 rounded animate-pulse"></div>
                          <div className="flex-1 space-y-1">
                            <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-3/4 animate-pulse"></div>
                            <div className="h-3 bg-gray-200 dark:bg-white/10 rounded w-1/2 animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}