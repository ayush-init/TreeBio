"use client";

import React from "react";
import { Globe, Instagram, Youtube, Mail, Linkedin, Github, Code, Twitter } from "lucide-react";

interface LinkImageProps {
  src?: string | null;
  alt: string;
  iconName?: string;
}

const iconMap = {
  instagram: Instagram,
  youtube: Youtube,
  email: Mail,
  linkedin: Linkedin,
  github: Github,
  leetcode: Code,
  gfg: Code,
  twitter: Twitter,
  website: Globe,
};

export const LinkImage = ({ src, alt, iconName }: LinkImageProps) => {
  const [imageError, setImageError] = React.useState(false);
  
  const FallbackIcon = iconName ? iconMap[iconName as keyof typeof iconMap] || Globe : Globe;

  if (!src || imageError) {
    return <FallbackIcon size={12} className="text-gray-400" />;
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      className="w-full h-full object-cover rounded"
      onError={() => setImageError(true)}
    />
  );
};
