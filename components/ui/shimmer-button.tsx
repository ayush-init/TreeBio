import { cn } from "@/lib/utils"
import { Skeleton } from "./skeleton"

interface ShimmerButtonProps extends React.ComponentProps<"div"> {
  size?: "sm" | "md" | "lg"
  variant?: "default" | "outline" | "ghost"
}

export function ShimmerButton({ className, size = "md", variant = "default", ...props }: ShimmerButtonProps) {
  const sizeClasses = {
    sm: "h-8 px-3",
    md: "h-10 px-4",
    lg: "h-12 px-6"
  }
  
  const variantClasses = {
    default: "bg-primary text-primary-foreground",
    outline: "border border-input bg-background",
    ghost: "bg-transparent"
  }
  
  return (
    <Skeleton
      className={cn(
        "rounded-md",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
}

export function ShimmerIcon({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <Skeleton
      className={cn("h-4 w-4 rounded", className)}
      {...props}
    />
  )
}

export function ShimmerCardButton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <Skeleton
      className={cn("h-14 w-full rounded-lg", className)}
      {...props}
    />
  )
}
