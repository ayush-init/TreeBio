"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Trash2, ExternalLink } from "lucide-react";

interface LinkCardProps {
  id: string;
  title: string;
  url: string;
  clicks: number;
  thumbnail?: string;
  isActive: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit?: (id: string) => void;
}

const LinkCard = ({ 
  id, 
  title, 
  url, 
  clicks, 
  thumbnail, 
  isActive, 
  onToggle, 
  onDelete, 
  onEdit 
}: LinkCardProps) => {
  return (
    <div className="bg-gradient-to-br from-amber-950/30 via-amber-900/20 to-amber-950/30 border border-amber-800/40 rounded-2xl p-5 group transition-all duration-300 hover:border-amber-600/60 hover:shadow-[0_20px_40px_rgba(245,158,11,0.15)] hover:transform hover:scale-[1.02] backdrop-blur-sm">
      <div className="flex items-center gap-4">
        {/* Thumbnail */}
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-900/40 to-amber-800/40 border border-amber-700/30 flex items-center justify-center overflow-hidden flex-shrink-0">
          {thumbnail ? (
            <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
          ) : (
            <ExternalLink className="w-6 h-6 text-amber-400/60" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-semibold text-lg truncate group-hover:text-amber-100 transition-colors duration-200">{title}</h4>
          <p className="text-amber-300/60 text-sm truncate mb-1">{url}</p>
          <p className="text-amber-400/50 text-xs">{clicks.toLocaleString()} clicks</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Switch
            checked={isActive}
            onCheckedChange={() => onToggle(id)}
            className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-amber-500 data-[state=checked]:to-orange-600 data-[state=unchecked]:bg-amber-900/40"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(id)}
            className="text-amber-400/60 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {onEdit && (
        <div className="mt-4 pt-4 border-t border-amber-800/40">
          <button
            onClick={() => onEdit(id)}
            className="text-xs text-amber-400 hover:text-amber-300 transition-colors duration-200"
          >
            Replace Image
          </button>
        </div>
      )}
    </div>
  );
};

export { LinkCard };
