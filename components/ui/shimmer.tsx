import { cn } from "@/lib/utils"

interface ShimmerProps extends React.ComponentProps<"div"> {
  variant?: "default" | "circle" | "text" | "card" | "avatar" | "button"
}

export function Shimmer({ className, variant = "default", ...props }: ShimmerProps) {
  const variantClasses = {
    default: "relative overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-md",
    circle: "relative overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-full",
    text: "relative overflow-hidden bg-gray-100 dark:bg-gray-800 rounded h-4 w-full",
    card: "relative overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-lg",
    avatar: "relative overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-full",
    button: "relative overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-md h-10"
  }

  return (
    <div
      className={cn(variantClasses[variant], className)}
      {...props}
    >
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]" />
    </div>
  )
}