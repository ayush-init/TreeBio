"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Shimmer } from "@/components/ui/shimmer"

interface ProfileVisitsChartProps {
  data: Array<{ date: string; visits: number }> | null
}

export function ProfileVisitsChart({ data }: ProfileVisitsChartProps) {
  if (!data || data.length === 0) {
    return (
      <Card className="bg-card dark:bg-card border-zinc-200 dark:border-zinc-800">
        <CardHeader>
          <CardTitle className="text-zinc-900 dark:text-zinc-100">Profile Visits</CardTitle>
          <CardDescription className="text-zinc-600 dark:text-zinc-400">
            Daily profile visits over the last 30 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] relative">
            {/* Enhanced chart shimmer */}
            <div className="absolute inset-0 flex items-end justify-between px-4 pb-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center flex-1">
                  <Shimmer className="w-full h-24 mb-2" />
                  <Shimmer className="h-3 w-8" />
                </div>
              ))}
            </div>
            {/* Y-axis shimmer */}
            <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between py-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Shimmer key={i} className="h-3 w-6" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-card dark:bg-card border-zinc-200 dark:border-zinc-800">
      <CardHeader>
        <CardTitle className="text-zinc-900 dark:text-zinc-100">Profile Visits</CardTitle>
        <CardDescription className="text-zinc-600 dark:text-zinc-400">
          Daily profile visits over the last 30 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            visits: {
              label: "Visits",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="fillVisits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-chart-1)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-chart-1)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }}
                className="text-zinc-600 dark:text-zinc-400"
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} className="text-zinc-600 dark:text-zinc-400" />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Area
                dataKey="visits"
                type="monotone"
                fill="url(#fillVisits)"
                fillOpacity={0.4}
                stroke="var(--color-chart-1)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}