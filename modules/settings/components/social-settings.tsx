"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Youtube, 
  Plus,
  ExternalLink,
  Trash2,
  Edit,
  Check,
  Loader2
} from "lucide-react";
import { addSocialLink, deleteSocialLink } from "../actions";
import { toast } from "sonner";

interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

interface SocialSettingsProps {
  initialData?: {
    socialLinks?: SocialLink[];
  };
}

const SOCIAL_PLATFORMS = [
  { name: "GitHub", icon: Github, color: "hover:bg-gray-100 dark:hover:bg-gray-800" },
  { name: "LinkedIn", icon: Linkedin, color: "hover:bg-blue-50 dark:hover:bg-blue-900/20" },
  { name: "Twitter", icon: Twitter, color: "hover:bg-sky-50 dark:hover:bg-sky-900/20" },
  { name: "Instagram", icon: Instagram, color: "hover:bg-pink-50 dark:hover:bg-pink-900/20" },
  { name: "YouTube", icon: Youtube, color: "hover:bg-red-50 dark:hover:bg-red-900/20" },
];

const SocialSettings: React.FC<SocialSettingsProps> = ({ initialData }) => {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(initialData?.socialLinks || []);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newLink, setNewLink] = useState({ platform: "", url: "" });
  const [isLoading, setIsLoading] = useState(false);

  const getPlatformIcon = (platform: string) => {
    const platformData = SOCIAL_PLATFORMS.find(p => p.name.toLowerCase() === platform.toLowerCase());
    return platformData?.icon || ExternalLink;
  };

  const handleAddLink = async () => {
    if (!newLink.platform || !newLink.url) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const result = await addSocialLink(newLink);
      if (result.success) {
        const updatedLinks = socialLinks.filter(link => 
          link.platform.toLowerCase() !== newLink.platform.toLowerCase()
        );
        updatedLinks.push({
          id: Date.now().toString(), // Temporary ID
          platform: newLink.platform,
          url: newLink.url
        });
        setSocialLinks(updatedLinks);
        setNewLink({ platform: "", url: "" });
        setIsAdding(false);
        toast.success("Social link added successfully");
      } else {
        toast.error(result.error || "Failed to add social link");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteLink = async (linkId: string) => {
    setIsLoading(true);
    try {
      const result = await deleteSocialLink(linkId);
      if (result.success) {
        setSocialLinks(prev => prev.filter(link => link.id !== linkId));
        toast.success("Social link deleted successfully");
      } else {
        toast.error(result.error || "Failed to delete social link");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const availablePlatforms = SOCIAL_PLATFORMS.filter(platform => 
    !socialLinks.some(link => link.platform.toLowerCase() === platform.name.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ExternalLink className="w-5 h-5 text-green-600" />
          Social Links
        </CardTitle>
        <CardDescription>
          Connect your social media profiles to your TreeBio
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Existing Links */}
        {socialLinks.length > 0 && (
          <div className="space-y-3">
            <Label className="text-base font-medium">Connected Accounts</Label>
            {socialLinks.map((link) => {
              const Icon = getPlatformIcon(link.platform);
              const platformData = SOCIAL_PLATFORMS.find(p => 
                p.name.toLowerCase() === link.platform.toLowerCase()
              );
              
              return (
                <div
                  key={link.id}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                    platformData?.color || ""
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5" />
                    <div>
                      <p className="font-medium">{link.platform}</p>
                      <p className="text-sm text-muted-foreground truncate max-w-xs">
                        {link.url}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(link.url, "_blank")}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteLink(link.id)}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <Separator />

        {/* Add New Link */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Add Social Link</Label>
            {availablePlatforms.length > 0 && (
              <Badge variant="outline" className="text-green-600 border-green-600">
                {availablePlatforms.length} available
              </Badge>
            )}
          </div>

          {availablePlatforms.length > 0 ? (
            isAdding ? (
              <div className="space-y-3 p-4 bg-muted rounded-lg">
                <div className="space-y-2">
                  <Label>Platform</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {availablePlatforms.map((platform) => {
                      const Icon = platform.icon;
                      return (
                        <Button
                          key={platform.name}
                          type="button"
                          variant={newLink.platform === platform.name ? "default" : "outline"}
                          className="justify-start"
                          onClick={() => setNewLink(prev => ({ ...prev, platform: platform.name }))}
                        >
                          <Icon className="w-4 h-4 mr-2" />
                          {platform.name}
                        </Button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Profile URL</Label>
                  <input
                    type="url"
                    value={newLink.url}
                    onChange={(e) => setNewLink(prev => ({ ...prev, url: e.target.value }))}
                    placeholder="https://..."
                    className="w-full px-3 py-2 border rounded-md bg-background"
                  />
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={handleAddLink}
                    disabled={isLoading || !newLink.platform || !newLink.url}
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Check className="w-4 h-4 mr-2" />
                    )}
                    Add Link
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsAdding(false);
                      setNewLink({ platform: "", url: "" });
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                onClick={() => setIsAdding(true)}
                className="w-full"
                variant="outline"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Social Link
              </Button>
            )
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              <ExternalLink className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>All social platforms have been connected</p>
            </div>
          )}
        </div>

        {/* Tips */}
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2">
            💡 Pro Tip
          </h4>
          <p className="text-sm text-blue-600 dark:text-blue-400">
            Add your most important social profiles to help visitors connect with you across all platforms.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialSettings;
