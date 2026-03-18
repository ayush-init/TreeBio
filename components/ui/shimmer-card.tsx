import { cn } from "@/lib/utils"
import { Skeleton } from "./skeleton"

interface ShimmerCardProps extends React.ComponentProps<"div"> {
  children?: React.ReactNode
}

export function ShimmerCard({ className, children, ...props }: ShimmerCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function ShimmerCardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("p-6", className)} {...props} />
  )
}

export function ShimmerCardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  )
}

export function ShimmerCardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3 className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
  )
}

export function ShimmerCardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
}
