import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shimmer } from "@/components/ui/shimmer"

export function QRShimmer() {
  return (
    <div className="space-y-6">
      {/* Header shimmer */}
      <div className="flex items-center justify-between">
        <div>
          <Shimmer className="h-9 w-48 mb-2" />
          <Shimmer className="h-5 w-64" />
        </div>
        <Shimmer variant="button" className="w-20 h-6" />
      </div>

      {/* Main content shimmer */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* QR Code card shimmer */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shimmer variant="circle" className="w-5 h-5" />
              <Shimmer className="h-6 w-32" />
            </div>
            <Shimmer className="h-4 w-48" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-white rounded-lg border">
                <Shimmer className="w-64 h-64" />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Shimmer variant="button" className="flex-1" />
              <Shimmer variant="button" className="flex-1" />
            </div>
          </CardContent>
        </Card>

        {/* Profile preview card shimmer */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shimmer variant="circle" className="w-5 h-5" />
              <Shimmer className="h-6 w-32" />
            </div>
            <Shimmer className="h-4 w-48" />
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Profile info shimmer */}
            <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
              <Shimmer variant="avatar" className="h-16 w-16" />
              <div className="flex-1 space-y-2">
                <Shimmer className="h-5 w-40" />
                <Shimmer className="h-4 w-24" />
                <Shimmer className="h-3 w-48" />
              </div>
            </div>

            {/* Input and buttons shimmer */}
            <div className="space-y-3">
              <div>
                <Shimmer className="h-4 w-20 mb-2" />
                <div className="flex gap-2">
                  <Shimmer className="flex-1 h-10" />
                  <Shimmer variant="button" className="w-10 h-10" />
                </div>
              </div>

              <div className="flex gap-2">
                <Shimmer variant="button" className="flex-1" />
                <Shimmer variant="button" className="flex-1" />
              </div>
            </div>

            {/* Status indicator shimmer */}
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2">
                <Shimmer variant="circle" className="w-4 h-4" />
                <Shimmer className="h-4 w-32" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Usage tips shimmer */}
      <Card>
        <CardHeader>
          <Shimmer className="h-6 w-32 mb-2" />
          <Shimmer className="h-4 w-48" />
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center gap-2">
                  <Shimmer variant="circle" className="w-2 h-2" />
                  <Shimmer className="h-4 w-24" />
                </div>
                <Shimmer className="h-3 w-full" />
                <Shimmer className="h-3 w-3/4" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}