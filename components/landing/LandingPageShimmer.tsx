import { ShimmerHeading } from "@/components/ui/shimmer-text"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { ShimmerAvatar } from "@/components/ui/shimmer-avatar"
import { ShimmerCard } from "@/components/ui/shimmer-card"

export default function LandingPageShimmer() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section Shimmer */}
      <header className="relative pt-32 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-8">
            {/* Badge shimmer */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <div className="w-24 h-4 bg-primary/30 rounded animate-pulse"></div>
            </div>
            
            {/* Hero title shimmer */}
            <div className="space-y-2">
              <ShimmerHeading size="h1" className="w-full" />
              <ShimmerHeading size="h1" className="w-3/4" />
            </div>
            
            {/* Paragraph shimmer */}
            <div className="space-y-2">
              <div className="h-5 bg-gray-200 dark:bg-white/10 rounded w-full animate-pulse"></div>
              <div className="h-5 bg-gray-200 dark:bg-white/10 rounded w-5/6 animate-pulse"></div>
            </div>
            
            {/* User avatars shimmer */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                <ShimmerAvatar size="sm" />
                <ShimmerAvatar size="sm" />
                <ShimmerAvatar size="sm" />
              </div>
              <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-32 animate-pulse"></div>
            </div>
          </div>
          
          {/* Phone mockup shimmer */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-[300px] h-[600px] bg-gray-200 dark:bg-white/10 rounded-[3rem] border-[8px] border-gray-300 dark:border-white/20 shadow-2xl overflow-hidden">
              <div className="relative p-6 flex flex-col items-center gap-6">
                <ShimmerAvatar size="xl" />
                <div className="text-center space-y-2">
                  <div className="h-5 bg-gray-200 dark:bg-white/10 rounded w-32 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 dark:bg-white/10 rounded w-24 animate-pulse"></div>
                </div>
                <div className="w-full flex flex-col gap-3">
                  <ShimmerButton className="w-full" />
                  <ShimmerButton className="w-full" />
                  <ShimmerButton className="w-full" />
                  <ShimmerButton className="w-full" />
                </div>
                <div className="flex gap-4 mt-4">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-white/10 rounded-full animate-pulse"></div>
                  <div className="w-8 h-8 bg-gray-200 dark:bg-white/10 rounded-full animate-pulse"></div>
                  <div className="w-8 h-8 bg-gray-200 dark:bg-white/10 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section Shimmer */}
      <section className="py-24 bg-card/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <div className="h-12 bg-gray-200 dark:bg-white/10 rounded w-1/2 mx-auto animate-pulse"></div>
            <div className="h-5 bg-gray-200 dark:bg-white/10 rounded w-2/3 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <ShimmerCard key={i} className="p-8">
                <div className="w-12 h-12 bg-gray-200 dark:bg-white/10 rounded-xl animate-pulse mb-4"></div>
                <div className="h-6 bg-gray-200 dark:bg-white/10 rounded w-3/4 animate-pulse mb-2"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-5/6 animate-pulse"></div>
                </div>
              </ShimmerCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
