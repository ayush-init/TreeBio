import { cn } from "@/lib/utils"
import { Skeleton } from "./skeleton"

interface ShimmerTextProps extends React.ComponentProps<"div"> {
  lines?: number
  width?: string | string[]
}

export function ShimmerText({ className, lines = 1, width = "100%", ...props }: ShimmerTextProps) {
  const widths = Array.isArray(width) ? width : [width]
  
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-4",
            widths[i] || widths[0] || "w-full"
          )}
        />
      ))}
    </div>
  )
}

export function ShimmerHeading({ className, size = "h1", ...props }: React.ComponentProps<"div"> & { size?: "h1" | "h2" | "h3" | "h4" }) {
  const sizeClasses = {
    h1: "h-12 w-3/4",
    h2: "h-10 w-2/3",
    h3: "h-8 w-1/2",
    h4: "h-6 w-1/3"
  }
  
  return (
    <Skeleton
      className={cn(sizeClasses[size], className)}
      {...props}
    />
  )
}

export function ShimmerParagraph({ className, lines = 3, ...props }: React.ComponentProps<"div"> & { lines?: number }) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-4",
            i === lines - 1 ? "w-3/4" : "w-full"
          )}
        />
      ))}
    </div>
  )
}
