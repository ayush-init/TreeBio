"use client";
 
import React from "react";
import { cn } from "@/lib/utils";
 
interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}
 
const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-gradient-to-br from-amber-950/20 via-amber-900/15 to-amber-950/20 border border-amber-800/40 rounded-2xl transition-all duration-300 hover:border-amber-600/60 hover:shadow-[0_20px_40px_rgba(245,158,11,0.15)] backdrop-blur-md",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
 
GlassCard.displayName = "GlassCard";
 
export { GlassCard };