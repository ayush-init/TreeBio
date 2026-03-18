"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  trendColor?: string;
  icon: LucideIcon;
  description?: string;
}

const StatCard = ({ 
  title, 
  value, 
  trend, 
  trendColor = "text-green-400", 
  icon: Icon, 
  description 
}: StatCardProps) => {
  return (
    <div className="bg-gradient-to-br from-amber-950/30 via-amber-900/20 to-amber-950/30 border border-amber-800/40 rounded-2xl p-6 transition-all duration-300 hover:border-amber-600/60 hover:shadow-[0_20px_40px_rgba(245,158,11,0.15)] backdrop-blur-sm">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-600/30">
          <Icon className="w-6 h-6 text-amber-400" />
        </div>
        <span className={cn("text-sm font-medium", trendColor)}>
          {trend}
        </span>
      </div>
      
      <div className="space-y-1">
        <h3 className="text-4xl font-black text-white">{value}</h3>
        <p className="text-amber-300/60 text-sm font-medium">{title}</p>
        {description && (
          <p className="text-amber-400/50 text-xs mt-2">{description}</p>
        )}
      </div>
    </div>
  );
};

export { StatCard };
