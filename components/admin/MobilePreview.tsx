"use client";

import React from "react";
import { GlassCard } from "@/components/admin/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Instagram, Twitter, Globe, Camera } from "lucide-react";

interface MobilePreviewProps {
  username: string;
  bio: string;
  avatar: string;
  links: Array<{ title: string; url: string }>;
}

const MobilePreview: React.FC<MobilePreviewProps> = ({ username, bio, avatar, links }) => {
  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="relative">
        {/* Phone Frame */}
        <div className="rounded-[40px] bg-gradient-to-br from-amber-950/40 via-amber-900/30 to-amber-950/40 p-3 border border-amber-800/50 shadow-[0_20px_40px_rgba(139,69,19,0.3)] backdrop-blur-sm">
          <div className="rounded-[32px] bg-gradient-to-br from-amber-950 via-amber-900 to-amber-950 p-6 min-h-[600px] border border-amber-900/30">
            {/* Status Bar */}
            <div className="flex justify-between items-center mb-6 text-xs text-amber-400/60">
              <span>9:41</span>
              <div className="flex gap-1">
                <div className="w-4 h-3 bg-white rounded-sm"></div>
                <div className="w-4 h-3 bg-white rounded-sm"></div>
                <div className="w-4 h-3 bg-white rounded-sm"></div>
              </div>
            </div>

            {/* Profile Section */}
            <div className="text-center mb-6">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 p-1 shadow-lg shadow-amber-500/25">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-950 to-amber-900 flex items-center justify-center border border-amber-800/30">
                  {avatar ? (
                    <img src={avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <Camera className="w-8 h-8 text-amber-400" />
                  )}
                </div>
              </div>
              <h3 className="text-white font-bold text-lg mb-1">@{username || 'username'}</h3>
              <p className="text-amber-300/60 text-sm px-4">{bio || 'Your bio will appear here'}</p>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl flex items-center justify-center hover:from-amber-500/30 hover:to-orange-500/30 transition-all duration-300 border border-amber-600/30">
                <Instagram className="w-6 h-6 text-amber-400" />
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl flex items-center justify-center hover:from-amber-500/30 hover:to-orange-500/30 transition-all duration-300 border border-amber-600/30">
                <Twitter className="w-6 h-6 text-amber-400" />
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl flex items-center justify-center hover:from-amber-500/30 hover:to-orange-500/30 transition-all duration-300 border border-amber-600/30">
                <Globe className="w-6 h-6 text-amber-400" />
              </div>
            </div>

            {/* Links */}
            <div className="space-y-3">
              {links.slice(0, 2).map((link, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-amber-950/40 via-amber-900/30 to-amber-950/40 border border-amber-800/40 rounded-xl p-4 text-center hover:border-amber-600/60 hover:bg-amber-900/20 transition-all duration-300 backdrop-blur-sm"
                >
                  <p className="text-white font-medium">{link.title}</p>
                </div>
              ))}
              
              {links.length === 0 && (
                <div className="bg-gradient-to-br from-amber-950/40 via-amber-900/30 to-amber-950/40 border border-amber-800/40 rounded-xl p-4 text-center backdrop-blur-sm">
                  <p className="text-amber-300/60 text-sm">Your links will appear here</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-amber-400/50 text-xs flex items-center justify-center gap-2">
                Create your TreeBio
                <div className="w-2 h-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full shadow-lg shadow-amber-500/25"></div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { MobilePreview };
