import { cn } from "@/lib/utils"
import { Skeleton } from "./skeleton"

interface ShimmerAvatarProps extends React.ComponentProps<"div"> {
  size?: "sm" | "md" | "lg" | "xl"
}

export function ShimmerAvatar({ className, size = "md", ...props }: ShimmerAvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
    xl: "h-20 w-20"
  }
  
  return (
    <Skeleton
      className={cn(
        "rounded-full",
        sizeClasses[size],
        className
      )}
      {...props}
    />
  )
}

export function ShimmerProfile({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex items-center gap-4", className)} {...props}>
      <ShimmerAvatar size="lg" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-48" />
      </div>
    </div>
  )
}
