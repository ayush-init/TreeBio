import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-lg border bg-amber-950/30 px-3 py-1 text-base shadow-xs transition-[color,box-shadow,transform] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-amber-500/60 focus-visible:ring-amber-500/30 focus-visible:ring-[3px] focus-visible:bg-amber-950/40 focus-visible:transform focus-visible:scale-[1.01]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        "hover:bg-amber-950/40 hover:border-amber-700/50",
        className
      )}
      {...props}
    />
  )
}

export { Input }
