import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shimmer } from "@/components/ui/shimmer"

export function SettingsShimmer() {
  return (
    <div className="space-y-6">
      {/* Header shimmer */}
      <div className="flex items-center justify-between">
        <div>
          <Shimmer className="h-9 w-32 mb-2" />
          <Shimmer className="h-5 w-80" />
        </div>
        <Shimmer variant="button" className="w-32 h-6" />
      </div>

      {/* Tabs shimmer */}
      <div className="grid w-full grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Shimmer key={i} variant="button" className="h-10" />
        ))}
      </div>

      {/* Tab content shimmer */}
      <div className="space-y-6">
        {/* Profile settings shimmer */}
        <Card>
          <CardHeader>
            <Shimmer className="h-6 w-32 mb-2" />
            <Shimmer className="h-4 w-48" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Shimmer variant="avatar" className="h-20 w-20" />
                <div className="flex-1 space-y-2">
                  <Shimmer className="h-4 w-32" />
                  <Shimmer className="h-3 w-48" />
                </div>
                <Shimmer variant="button" className="w-20 h-8" />
              </div>
              
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Shimmer className="h-4 w-16" />
                  <Shimmer className="h-10 w-full" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Shimmer className="h-4 w-20" />
                    <Shimmer className="h-10 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Shimmer className="h-4 w-24" />
                    <Shimmer className="h-10 w-full" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Shimmer className="h-4 w-12" />
                  <Shimmer className="h-20 w-full" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social settings shimmer */}
        <Card>
          <CardHeader>
            <Shimmer className="h-6 w-32 mb-2" />
            <Shimmer className="h-4 w-48" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Shimmer variant="circle" className="w-8 h-8" />
                    <div className="space-y-1">
                      <Shimmer className="h-4 w-24" />
                      <Shimmer className="h-3 w-32" />
                    </div>
                  </div>
                  <Shimmer variant="button" className="w-20 h-8" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Appearance settings shimmer */}
        <Card>
          <CardHeader>
            <Shimmer className="h-6 w-32 mb-2" />
            <Shimmer className="h-4 w-48" />
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Shimmer className="h-4 w-20" />
                <div className="grid grid-cols-3 gap-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Shimmer className="h-16 w-full rounded-lg" />
                      <Shimmer className="h-4 w-20 mx-auto" />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Shimmer className="h-4 w-24" />
                <div className="flex items-center space-x-2">
                  <Shimmer variant="button" className="w-12 h-12" />
                  <div className="space-y-1">
                    <Shimmer className="h-4 w-32" />
                    <Shimmer className="h-3 w-48" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account settings shimmer */}
        <Card>
          <CardHeader>
            <Shimmer className="h-6 w-32 mb-2" />
            <Shimmer className="h-4 w-48" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Shimmer className="h-4 w-16" />
                <Shimmer className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Shimmer className="h-4 w-24" />
                <Shimmer className="h-10 w-full" />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <Shimmer className="h-4 w-32" />
                  <Shimmer className="h-3 w-48" />
                </div>
                <Shimmer variant="button" className="w-20 h-8" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick tips shimmer */}
      <Card>
        <CardHeader>
          <Shimmer className="h-6 w-24 mb-2" />
          <Shimmer className="h-4 w-48" />
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center gap-2">
                  <Shimmer variant="circle" className="w-2 h-2" />
                  <Shimmer className="h-4 w-32" />
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