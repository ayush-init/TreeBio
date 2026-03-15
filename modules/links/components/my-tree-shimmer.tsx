import { Card, CardContent } from "@/components/ui/card"
import { Shimmer } from "@/components/ui/shimmer"

export function MyTreeShimmer() {
  return (
    <section className="flex flex-col gap-6 px-4 py-6">
      {/* Header shimmer */}
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-row justify-center items-center gap-3">
          <Shimmer variant="button" className="w-24 h-10" />
          <Shimmer variant="button" className="w-20 h-10" />
        </div>
      </div>

      {/* Main content shimmer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start py-14">
        {/* Form section shimmer */}
        <div className="order-2 lg:order-1 space-y-6">
          {/* Profile card shimmer */}
          <Card className="border-2 border-dashed">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Shimmer variant="avatar" className="h-20 w-20" />
                <div className="flex-1 space-y-2">
                  <Shimmer className="h-6 w-32" />
                  <Shimmer className="h-4 w-48" />
                  <Shimmer className="h-4 w-24" />
                </div>
              </div>
              
              {/* Social links shimmer */}
              <div className="mt-4 flex gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Shimmer key={i} variant="circle" className="h-9 w-9" />
                ))}
                <Shimmer variant="circle" className="h-9 w-9 border-2 border-dashed" />
              </div>
            </CardContent>
          </Card>

          {/* Links shimmer */}
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Shimmer variant="circle" className="h-10 w-10" />
                    <div className="flex-1 space-y-2">
                      <Shimmer className="h-4 w-3/4" />
                      <Shimmer className="h-3 w-1/2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Shimmer variant="button" className="w-full h-12 border-2 border-dashed" />
          </div>
        </div>

        {/* Preview frame shimmer */}
        <div className="order-1 lg:order-2 lg:sticky lg:top-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-[280px] h-[580px] bg-zinc-700 rounded-[2.5rem] p-2 shadow-2xl">
                <div className="w-full h-full bg-gray-50 rounded-[2rem] overflow-hidden relative">
                  <div className="absolute top-0 left-0 right-0 h-6 bg-transparent flex items-center justify-center">
                    <Shimmer className="w-20 h-1 bg-zinc-700 rounded-full" />
                  </div>
                  <div className="pt-8 pb-4 px-4 h-full flex flex-col">
                    {/* Profile preview shimmer */}
                    <div className="flex flex-col items-center text-center space-y-3 mb-6">
                      <Shimmer variant="avatar" className="h-20 w-20 border-4 border-white shadow-lg" />
                      <div className="space-y-2">
                        <Shimmer className="h-6 w-32" />
                        <Shimmer className="h-4 w-48" />
                      </div>
                    </div>
                    
                    {/* Links preview shimmer */}
                    <div className="flex-1 space-y-3">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm">
                          <div className="flex items-center gap-3">
                            <Shimmer variant="circle" className="w-6 h-6" />
                            <div className="flex-1 space-y-1">
                              <Shimmer className="h-4 w-3/4" />
                              <Shimmer className="h-3 w-1/2" />
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
      </div>
    </section>
  )
}