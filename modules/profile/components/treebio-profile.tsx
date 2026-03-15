"use client";

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Instagram,
  Youtube,
  Twitter,
  Github,
  Linkedin,
  Globe,
  ExternalLink,
  Star,
  Sun,
  Moon,
  ArrowLeft,
  Copy,
  CopyCheck,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { logLinkClick } from "@/modules/analytics/actions";

interface LinkItem {
  id: string;
  title: string;
  url: string;
  description?: string;
  image?: string | null;
  clickCount: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface SocialLinkItem {
  id: string;
  platform: string;
  url: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface ProfileData {
  id: string;
  clerkId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
  links: LinkItem[];
  socialLinks: SocialLinkItem[];
}

interface TreeBioProfileProps {
  profileData?: ProfileData;
}

const getSocialIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "instagram":
      return <Instagram className="h-5 w-5" />;
    case "youtube":
      return <Youtube className="h-5 w-5" />;
    case "twitter":
      return <Twitter className="h-5 w-5" />;
    case "github":
      return <Github className="h-5 w-5" />;
    case "linkedin":
      return <Linkedin className="h-5 w-5" />;
    default:
      return <Globe className="h-5 w-5" />;
  }
};

export default function TreeBioProfile({ profileData }: TreeBioProfileProps) {
  const router = useRouter();
  const [isCopied, setIsCopied] = React.useState(false);
  const [linkClicks, setLinkClicks] = React.useState<{ [key: string]: number }>({});
  const { theme, setTheme } = useTheme();

  const origin = typeof window !== "undefined" ? window.location.origin : "";

  const onCopy = () => {
    if (profileData) {
      navigator.clipboard.writeText(`${origin}/${profileData.username}`);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  React.useEffect(() => {
    if (profileData?.links) {
      const initialClicks = profileData.links.reduce((acc, link) => {
        acc[link.id] = link.clickCount;
        return acc;
      }, {} as { [key: string]: number });
      setLinkClicks(initialClicks);
    }
  }, [profileData?.links]);

  const handleLinkClick = async (linkId: string) => {
    try {
      await logLinkClick(linkId);

      setLinkClicks((prev) => ({
        ...prev,
        [linkId]: (prev[linkId] || 0) + 1,
      }));
    } catch (error) {
      console.error("Failed to log link click:", error);
    }
  };

  if (!profileData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-900">
        Profile not found
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center min-h-screen p-4 ${theme === "dark" ? "bg-zinc-900" : "bg-gray-50"
        }`}
    >
      <Button
        variant="outline"
        className="absolute top-4 left-4 h-10 w-10"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>

      <div className="w-full max-w-md">
        <Card
          className={`rounded-2xl shadow-2xl p-8 flex flex-col  ${theme === "dark"
              ? "bg-zinc-800 border-zinc-700"
              : "bg-white border-gray-200"
            }`}
        >
          {/* Header */}
          <div className="flex justify-between mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            <Button variant="ghost" size="icon" onClick={onCopy}>
              {isCopied ? (
                <CopyCheck className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Profile */}
          <div className="flex flex-col items-center mb-6 text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={profileData.imageUrl} />
              <AvatarFallback>
                {profileData.firstName[0]}
                {profileData.lastName[0]}
              </AvatarFallback>
            </Avatar>

            <h1 className="text-2xl font-bold">
              {profileData.firstName} {profileData.lastName}
            </h1>

            <p className="text-gray-500">@{profileData.username}</p>

            <p className="text-sm mt-2 max-w-xs">{profileData.bio}</p>
          </div>

          {/* LINKS SCROLL AREA */}
<div className="max-h-[30vh] overflow-y-auto space-y-3 pr-2 profile-scrollbar mb-6">
            {profileData.links.map((link) => (
              <Button
                key={link.id}
                asChild
                onClick={() => handleLinkClick(link.id)}
                variant="outline"
                className="w-full h-14 flex items-center justify-between"
              >
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full"
                >
                  <div className="flex items-center gap-3">
                    {link.image ? (
                      <img
                        src={link.image}
                        className="w-8 h-8 rounded-md object-cover"
                      />
                    ) : (
                      <Globe className="h-5 w-5" />
                    )}

                    <span className="truncate">{link.title}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs">{linkClicks[link.id]}</span>
                    <ExternalLink className="h-4 w-4" />
                  </div>
                </a>
              </Button>
            ))}
          </div>

          {/* Social */}
          {profileData.socialLinks?.length > 0 && (
            <div className="flex justify-center gap-3 mb-6">
              {profileData.socialLinks.map((s) => (
                <Button key={s.id} asChild size="icon" variant="ghost">
                  <a href={s.url} target="_blank">
                    {getSocialIcon(s.platform)}
                  </a>
                </Button>
              ))}
            </div>
          )}

          {/* Footer */}
          <Button variant="outline" className="w-full mb-4">
            <img src="/logo.svg" className="h-6 w-6 mr-2" />
            Join {profileData.username} on TreeBio
            <Star className="ml-2 h-4 w-4" />
          </Button>

          <div className="flex justify-center gap-6 text-xs text-gray-500">
            <a href="#">Report</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </Card>
      </div>
    </div>
  );
}