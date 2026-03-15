import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Shimmer } from "@/components/ui/shimmer"

export function OverviewShimmer() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header shimmer */}
        <div className="mb-8">
          <Shimmer className="h-9 w-64 mb-2" />
          <Shimmer className="h-5 w-96" />
        </div>

        {/* Analytics cards shimmer */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="bg-zinc-50 dark:bg-zinc-900">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Shimmer className="h-4 w-24" />
                <Shimmer variant="circle" className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <Shimmer className="h-8 w-16 mb-2" />
                <Shimmer className="h-3 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main content shimmer */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Analytics chart shimmer */}
          <div className="lg:col-span-2">
            <Card className="bg-zinc-50 dark:bg-zinc-900">
              <CardHeader>
                <Shimmer className="h-6 w-48 mb-2" />
                <Shimmer className="h-4 w-64" />
              </CardHeader>
              <CardContent>
                <Shimmer className="h-64 w-full" />
              </CardContent>
            </Card>
          </div>

          {/* Top links table shimmer */}
          <Card className="bg-zinc-50 dark:bg-zinc-900">
            <CardHeader>
              <Shimmer className="h-6 w-48 mb-2" />
              <Shimmer className="h-4 w-40" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800">
                    <div className="flex items-center space-x-3 flex-1">
                      <Shimmer variant="circle" className="w-8 h-8" />
                      <div className="flex-1 space-y-2">
                        <Shimmer className="h-4 w-3/4" />
                        <Shimmer className="h-3 w-1/2" />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shimmer className="h-4 w-8" />
                      <Shimmer variant="circle" className="h-3 w-3" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent activity shimmer */}
          <Card className="bg-zinc-50 dark:bg-zinc-900">
            <CardHeader>
              <Shimmer className="h-6 w-40 mb-2" />
              <Shimmer className="h-4 w-48" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-3 p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800">
                    <Shimmer variant="circle" className="w-10 h-10" />
                    <div className="flex-1 space-y-2">
                      <Shimmer className="h-4 w-3/4" />
                      <Shimmer className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}