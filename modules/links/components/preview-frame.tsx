import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLink, Star, Globe, Instagram, Youtube, Mail, Linkedin, Github, Code, Twitter } from "lucide-react";
import { LinkImage } from "./link-image";
import React from "react";

// Types & Map remain exactly as you provided
const socialIconMap = {
  instagram: Instagram,
  youtube: Youtube,
  email: Mail,
  linkedin: Linkedin,
  github: Github,
  leetcode: Code,
  gfg: Code,
  twitter: Twitter,
  website: Globe,
}

interface Link {
  id: string;
  title: string;
  description?: string;
  url: string;
  image?: string | null;
  clickCount: number;
  createdAt: Date;
  platform?: string;
  user: {
    firstName?: string;
    lastName?: string;
    username?: string;
    bio?: string;
    imageUrl?: string;
  };
}

interface PreviewFrameProps {
  links: Link[];
  socialLinks?: any[];
  currentUser?: {
    firstName?: string;
    lastName?: string;
    imageUrl?: string;
  };
}

const LinkPreviewItem = ({ link }: { link: Link }) => {
  return (
    <div className="link-preview-item bg-white rounded-xl border border-gray-200 p-4 shadow-sm cursor-pointer relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/8 via-teal-500/8 to-emerald-500/8 dark:from-emerald-400/15 dark:via-teal-400/15 dark:to-emerald-400/15 opacity-0  transition-all duration-500 ease-out" />
      <div className="relative flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center flex-shrink-0  transition-transform duration-200 shadow-sm">
          <LinkImage src={link.image} alt={link.title} iconName={link.platform} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-gray-900 truncate  transition-colors duration-200">
            {link.title}
          </p>
          {link.description && (
            <p className="text-xs text-gray-500 truncate mt-0.5">{link.description}</p>
          )}
        </div>
        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-1 group-hover:translate-x-0">
          <ExternalLink size={14} className="text-emerald-500" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left" />
    </div>
  );
};

const PreviewFrame = ({ links, socialLinks = [], currentUser }: PreviewFrameProps) => {
  const userProfile = links[0]?.user || {};
  const displayName =
    userProfile.username ||
    `${userProfile.firstName || ""}${userProfile.lastName ? " " + userProfile.lastName : ""}`.trim() ||
    currentUser?.firstName ||
    "User";

  const userBio = userProfile.bio || "";
  const userAvatar = userProfile.imageUrl || currentUser?.imageUrl || "";

  return (
    <div className="flex flex-col items-center py-8">
      {/* --- ENHANCED OUTER FRAME START --- */}
      <div className="relative group">
        {/* Physical Buttons (Side) */}
        <div className="absolute -left-[2px] top-24 w-[3px] h-10 bg-zinc-800 rounded-l-md border-l border-zinc-700" />
        <div className="absolute -left-[2px] top-40 w-[3px] h-16 bg-zinc-800 rounded-l-md border-l border-zinc-700" />
        <div className="absolute -left-[2px] top-60 w-[3px] h-16 bg-zinc-800 rounded-l-md border-l border-zinc-700" />
        <div className="absolute -right-[2px] top-44 w-[3px] h-24 bg-zinc-800 rounded-r-md border-r border-zinc-700" />

        {/* Main Chassis */}
        <div className="w-[300px] h-[600px] bg-[#0c0c0c] rounded-[3.5rem] p-3 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5),0_30px_60px_-30px_rgba(0,0,0,0.6)] ring-1 ring-white/10 relative transition-transform duration-500 ">
          
          {/* Inner Glossy Bezel */}
          <div className="w-full h-full bg-zinc-900 rounded-[2.8rem] p-1.5 shadow-inner">
            
            {/* Screen Glass */}
            <div className="w-full h-full bg-gradient-to-br from-white to-gray-50 rounded-[2.4rem] overflow-hidden relative shadow-2xl">

              {/* Dynamic Island */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-b-2xl z-50 flex items-center justify-center">
                <div className="w-10 h-1 bg-zinc-800/50 rounded-full" />
                <div className="absolute right-4 w-1.5 h-1.5 bg-blue-500/20 rounded-full blur-[1px]" />
              </div>

              {/* Content Container (Your original logic) */}
              <div className="pt-10 pb-6 px-5 h-full flex flex-col relative z-10">
                
                {/* Profile Section */}
                <div className="flex flex-col items-center text-center space-y-4 mb-6">
                  <div className="relative group/avatar">
                    <Avatar className="h-24 w-24 border-4 border-white shadow-xl transition-transform duration-300">
                      <AvatarImage src={userAvatar} alt={displayName} />
                      <AvatarFallback className="text-xl font-bold bg-gradient-to-br from-emerald-400 to-teal-500 text-white">
                        {displayName.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 rounded-full border-2 border-emerald-400/20 scale-110" />
                  </div>

                  <div className="space-y-2">
                    <h2 className="font-bold text-xl text-gray-900 tracking-tight">
                      {displayName}
                    </h2>
                    {userBio && (
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{userBio}</p>
                    )}
                  </div>
                </div>

                {/* Links Container */}
                <div className="flex-1 links-container overflow-hidden">
                <div className="h-full space-y-3 overflow-y-auto pr-1 preview-links-scrollbar">
                    {links.map((link) => (
                      <LinkPreviewItem key={link.id} link={link} />
                    ))}

                    {links.length === 0 && socialLinks.length === 0 && (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                          <ExternalLink className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 text-sm font-medium">No links added yet</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="bg-emerald-50 rounded-xl border border-emerald-100 p-3 mb-3">
                    <div className="flex items-center justify-center gap-2 text-xs text-emerald-700 font-bold uppercase tracking-wider">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>TreeBio</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <span>Report</span>
                    <span className="opacity-30">•</span>
                    <span>Privacy</span>
                  </div>
                </div>
              </div>
              
              {/* Home Indicator */}
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-gray-300/50 rounded-full" />
            </div>
          </div>
        </div>
      </div>
      {/* --- ENHANCED OUTER FRAME END --- */}
    </div>
  );
};

export default PreviewFrame;