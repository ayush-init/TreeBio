"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Plus,
  Instagram,
  Youtube,
  Mail,
  Archive,
  FolderPlus,
  Camera,
  Edit3,
  X,
  Linkedin,
  Github,
  Twitter,
  Globe,
  Loader2,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { createUserProfile } from "@/modules/profile/actions";
import { createLinkByUser, deleteLink, editLink, addSocialLink, deleteSocialLink, editSocialLink } from "../actions";
import { LinkCard, LinkFormWithPreview } from "./link-card";
import { SocialLinkModal, SocialLinkFormData } from "./social-link-modal"; // Import the modal

// Zod schemas
const profileSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .max(50, "Last name must be less than 50 characters")
    .optional(),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be less than 30 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
  imageUrl: z.string().url("Please enter a valid image URL").optional(),
});

const linkSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  url: z.string().url("Please enter a valid URL").min(1, "URL is required"),
  description: z
    .string()
    .max(200, "Description must be less than 200 characters")
    .optional(),
  image: z.string().url("Please enter a valid image URL").optional(),
});

const socialLinkSchema = z.object({
  platform: z.enum(["instagram", "youtube", "email"]),
  url: z.string().url("Please enter a valid URL"),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
export type LinkFormData = z.infer<typeof linkSchema>;

interface Link {
  id: string;
  title: string;
  url: string;
  description?: string;
  image?: string;
  clickCount: number;
}

interface Profile {
  firstName: string;
  lastName: string;
  username: string;
  bio?: string;
  imageUrl?: string;
}

interface SocialLink {
  id: string;
  platform:
  | "instagram"
  | "youtube"
  | "email"
  | "linkedin"
  | "github"
  | "leetcode"
  | "gfg"
  | "twitter"
  | "website";
  url: string;
}

interface Props {
  username: string;
  bio: string;
  imageUrl?: string; // Add imageUrl prop
  link: {
    id: string;
    title: string;
    description: string;
    url: string;
    clickCount: number;
    createdAt: Date;
  }[];
  socialLinks?: SocialLink[]; // Add social links prop
  onProfileChange?: (profile: Profile) => void; // Callback for profile changes
  onLinksChange?: (links: Link[]) => void; // Callback for links changes
  onSocialLinksChange?: (socialLinks: SocialLink[]) => void; // Callback for social links changes
}

const LinkForm = ({ username, bio, link, socialLinks: initialSocialLinks = [], imageUrl, onProfileChange, onLinksChange, onSocialLinksChange }: Props) => {
  const currentUser = useUser();

  const [isAddingLink, setIsAddingLink] = React.useState(false);
  const [editingProfile, setEditingProfile] = React.useState(false);
  const [links, setLinks] = React.useState<Link[]>(link || []);
  const [userSocialLinks, setUserSocialLinks] = React.useState<SocialLink[]>(initialSocialLinks);
  const [isSocialModalOpen, setIsSocialModalOpen] = React.useState(false);
  const [editingSocialLink, setEditingSocialLink] = React.useState<SocialLink | null>(null);

  // Add this after the existing state declarations (around line 133)
  const [isUploadingImage, setIsUploadingImage] = React.useState(false);

  // Add this handler after the existing handlers (around line 339)
const handleProfileImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;

  // Validate file
  const { validateImageFile } = await import("@/lib/cloudinary");
  if (!validateImageFile(file)) {
    toast.error("Please upload a valid image file (JPEG, PNG, WebP, GIF) under 5MB");
    return;
  }

  setIsUploadingImage(true);
  try {
    // Upload to Cloudinary
    const { uploadToCloudinary } = await import("@/lib/cloudinary");
    const imageUrl = await uploadToCloudinary(file);

    // Update local state
    const updatedProfile = { ...profile, imageUrl };
    setProfile(updatedProfile);
    
    // Notify parent for real-time preview update
    if (onProfileChange) {
      onProfileChange(updatedProfile);
    }
    
    // Save to database
    const profileData = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      username: profile.username,
      bio: profile.bio,
      imageUrl: imageUrl // Use new uploaded image URL
    };

    const result = await createUserProfile(profileData);
    
    if (result.success) {
      toast.success("Profile image updated successfully!");
    } else {
      toast.error("Failed to save image to database");
      // Revert local state if database save failed
      setProfile(prev => ({ ...prev, imageUrl: profile.imageUrl }));
    }
    
    setIsUploadingImage(false);
  } catch (error) {
    setIsUploadingImage(false);
    toast.error("Failed to upload image");
    console.error("Upload error:", error);
  }
};

  const [profile, setProfile] = React.useState<Profile>({
    firstName: currentUser.user?.firstName || "",
    lastName: currentUser.user?.lastName || "",
    username: username || "",
    bio: bio || "",
    imageUrl: imageUrl || currentUser.user?.imageUrl || "/placeholder.svg", // Use database imageUrl first
  });
  const [editingLinkId, setEditingLinkId] = React.useState<string | null>(null);

  // Profile form
  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: profile.firstName || "",
      lastName: profile.lastName || "",
      username: profile.username,
      bio: profile.bio || "",
    },
  });

  // Link form
  const linkForm = useForm<LinkFormData>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      title: "",
      url: "",
      description: "",
    },
  });

  // Profile submit handler
  const onProfileSubmit = async (data: ProfileFormData) => {
    try {
      const updatedProfile = { ...profile, ...data };
      setProfile(updatedProfile);

      // Notify parent for real-time preview update
      if (onProfileChange) {
        onProfileChange(updatedProfile);
      }

      const result = await createUserProfile(data);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    } finally {
      profileForm.reset();
      setEditingProfile(false);
    }
  };

  // Link submit handler
  const onLinkSubmit = async (data: LinkFormData) => {
    try {
      const link = await createLinkByUser(data);

      if (link?.data?.id) {
        const updatedLinks = [
          ...links,
          { id: link.data.id, ...data, clickCount: 0 },
        ];
        setLinks(updatedLinks);
        
        // Notify parent for real-time preview update
        if (onLinksChange) {
          onLinksChange(updatedLinks);
        }
      }
      toast.success("Link created successfully!");
    } catch (error) {
      toast.error("Failed to create link.");
    } finally {
      linkForm.reset();
      setIsAddingLink(false);
    }
  };

  // Social link submit handler
  const onSocialLinkSubmit = async (data: SocialLinkFormData) => {
    try {
      if (editingSocialLink) {

        const result = await editSocialLink(data, editingSocialLink.id);
        if (result?.success) {
          setUserSocialLinks((prev) =>
            prev.map((link) =>
              link.id === editingSocialLink.id
                ? { ...link, platform: data.platform, url: data.url }
                : link
            )
          );
          toast.success(`${data.platform} link updated successfully!`);
        } else {
          toast.error(result?.error || "Failed to update social link.");
        }
      } else {
        // Add new social link
        const result = await addSocialLink(data);
        if (result?.success && result?.data) {
          const newSocialLink: SocialLink = {
            id: String((result as any).data?.id || ''),
            platform: data.platform,
            url: data.url,
          };
          setUserSocialLinks((prev) => [...prev, newSocialLink]);
          toast.success(`${data.platform} link added successfully!`);
        } else {
          toast.error(result?.error || "Failed to add social link.");
        }
      }
    } catch (error) {
      console.error("Error saving social link:", error);
      toast.error("Failed to save social link.");
    } finally {
      setEditingSocialLink(null);
    }
  };

  // Delete link handler
  const handleDeleteLink = async (linkId: string) => {
    try {
      // Delete the link
      await deleteLink(linkId);
      const updatedLinks = links.filter((link) => link.id !== linkId);
      setLinks(updatedLinks);
      
      // Notify parent for real-time preview update
      if (onLinksChange) {
        onLinksChange(updatedLinks);
      }
      
      toast.success("Link deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete link.");
    }
  };

  // Edit link handler
  const handleEditLink = (linkId: string) => {
    setEditingLinkId(linkId);
    setIsAddingLink(true);
  };

  const onEditLinkSubmit = async (data: LinkFormData) => {
    if (!editingLinkId) return;
    try {
      const res = await editLink(data, editingLinkId);
      if (res?.sucess) {
        const updatedLinks = links.map((l) => (l.id === editingLinkId ? { ...l, ...data } : l));
        setLinks(updatedLinks);
        
        // Notify parent for real-time preview update
        if (onLinksChange) {
          onLinksChange(updatedLinks);
        }
        
        toast.success("Link edited successfully!");
      } else {
        toast.error(res?.error || "Failed to edit link.");
      }
    } catch (error) {
      console.error("Error editing link:", error);
      toast.error("Failed to edit link.");
    } finally {
      setIsAddingLink(false);
      setEditingLinkId(null);
    }
  };

  // Social link handlers
  const handleAddSocialLink = () => {
    setEditingSocialLink(null);
    setIsSocialModalOpen(true);
  };

  const handleEditSocialLink = (socialLink: SocialLink) => {
    setEditingSocialLink(socialLink);
    setIsSocialModalOpen(true);
  };

  const handleDeleteSocialLink = async (socialLinkId: string) => {
    try {
      const result = await deleteSocialLink(socialLinkId);
      if (result?.sucess) {
        setUserSocialLinks((prev) => prev.filter((link) => link.id !== socialLinkId));
        toast.success("Social link removed successfully!");
      } else {
        toast.error(result?.error || "Failed to delete social link.");
      }
    } catch (error) {
      console.error("Error deleting social link:", error);
      toast.error("Failed to delete social link.");
    }
  };

  // Link image upload handler
  const handleLinkImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file
    const { validateImageFile } = await import("@/lib/cloudinary");
    if (!validateImageFile(file)) {
      toast.error("Please upload a valid image file (JPEG, PNG, WebP, GIF) under 5MB");
      return;
    }

    try {
      // Upload to Cloudinary
      const { uploadToCloudinary } = await import("@/lib/cloudinary");
      const imageUrl = await uploadToCloudinary(file);

      // Set the image URL in the form
      linkForm.setValue("image", imageUrl);
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload image");
      console.error("Upload error:", error);
    }
  };

  const getSocialIcon = (platform: string) => {
    const icons: Record<string, any> = {
      instagram: Instagram,
      youtube: Youtube,
      email: Mail,
      linkedin: Linkedin,
      github: Github,
      twitter: Twitter,
      website: Globe,
      leetcode: Globe,
      gfg: Globe,
    };

    return icons[platform] || Globe;
  };
  const socialLinks = [
    { platform: "instagram" as const, icon: Instagram },
    { platform: "youtube" as const, icon: Youtube },
    { platform: "email" as const, icon: Mail },
    { platform: "linkedin" as const, icon: Linkedin },
    { platform: "github" as const, icon: Github },
    { platform: "twitter" as const, icon: Twitter },
    { platform: "website" as const, icon: Globe },
    { platform: "leetcode" as const, icon: Globe },
    { platform: "gfg" as const, icon: Globe },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      {/* Profile Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Profile Info</h2>
        <Card className="border-2 border-dashed border-gray-200 hover:border-green-400 transition-colors">
          <CardContent className="p-8">
            <div className="flex items-start gap-6">
              <div className="relative group flex-shrink-0">
                <Avatar className="h-24 w-24 border-4 border-white shadow-lg cursor-pointer">
                  <AvatarImage
                    src={profile.imageUrl || "/placeholder.svg"}
                    alt={profile.username}
                  />
                  <AvatarFallback className="text-xl font-semibold bg-gray-100 text-[#FFA116]">
                    {profile.username.slice(0, 2).toUpperCase() || "UN"}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageUpload}
                    className="hidden"
                    id="profile-image-upload"
                    disabled={isUploadingImage}
                  />
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 w-8 rounded-full p-0"
                    asChild
                    disabled={isUploadingImage}
                  >
                    <label htmlFor="profile-image-upload" className="cursor-pointer">
                      {isUploadingImage ? (
                        <div className="animate-spin">
                          <Loader2 size={14} />
                        </div>
                      ) : (
                        <Camera size={14} />
                      )}
                    </label>
                  </Button>
                </div>
              </div>

              <div className="flex-1 space-y-4">
                {editingProfile ? (
                  <form
                    onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                    className="space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <Input
                          {...profileForm.register("firstName")}
                          placeholder="First Name"
                          className="flex-1"
                        />
                        <Input
                          {...profileForm.register("lastName")}
                          placeholder="Last Name"
                          className="flex-1"
                        />
                      </div>
                      <div>
                        <Input
                          {...profileForm.register("username")}
                          placeholder="Username"
                          className="font-semibold cursor-not-allowed"
                          readOnly
                          disabled
                        />
                        {profileForm.formState.errors.username && (
                          <p className="text-sm text-red-500 mt-2">
                            {profileForm.formState.errors.username.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Textarea
                          {...profileForm.register("bio")}
                          placeholder="Add bio..."
                          className="resize-none"
                          rows={3}
                        />
                        {profileForm.formState.errors.bio && (
                          <p className="text-sm text-red-500 mt-2">
                            {profileForm.formState.errors.bio.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        size="sm"
                        type="submit"
                        disabled={profileForm.formState.isSubmitting}
                        className="px-6 py-2"
                      >
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        type="button"
                        onClick={() => setEditingProfile(false)}
                        className="px-6 py-2"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-xl text-gray-900 dark:text-white">
                          {profile.username || "Add username..."}
                        </h3>
                        <p className="text-sm text-muted-foreground dark:text-gray-300 mt-1">
                          {profile.bio || "Add bio..."}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:bg-gray-100"
                        onClick={() => setEditingProfile(true)}
                      >
                        <Edit3 size={14} />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">Social Links</h4>
              </div>
              <div className="flex gap-3 flex-wrap">
                {/* Display existing social links */}
                {userSocialLinks.map((socialLink) => {
                  const Icon = getSocialIcon(socialLink.platform);
                  return (
                    <div key={socialLink.id} className="relative group">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-10 w-10 p-0 bg-transparent hover:bg-gray-50 border-gray-200"
                        onClick={() => window.open(socialLink.url, '_blank')}
                      >
                        <Icon size={18} />
                      </Button>
                      {/* Delete button on hover */}
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                        onClick={() => handleDeleteSocialLink(socialLink.id)}
                      >
                        <X size={12} />
                      </Button>
                      {/* Edit on click (optional - you can add this functionality) */}
                    </div>
                  );
                })}

                {/* Add new social link button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="h-10 w-10 p-0 border-dashed bg-transparent hover:bg-gray-50 border-gray-300"
                  onClick={handleAddSocialLink}
                >
                  <Plus size={18} />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Links Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Link Content</h2>
        </div>
        <div className="space-y-4">
          {links.map((link, index) => (
            <LinkCard
              key={link.id}
              link={link}
              onDelete={handleDeleteLink}
              onEdit={handleEditLink}
            />
          ))}
        </div>

        {/* Add New Link */}
        {isAddingLink ? (
          <LinkFormWithPreview
            onCancel={() => {
              setIsAddingLink(false);
              setEditingLinkId(null);
            }}
            onSubmit={editingLinkId ? onEditLinkSubmit : onLinkSubmit}
            defaultValues={
              editingLinkId
                ? links.find((l) => l.id === editingLinkId) || {
                    title: "",
                    url: "",
                    description: "",
                  }
                : { title: "", url: "", description: "" }
            }
          />
        ) : (
          <Button
            onClick={() => setIsAddingLink(true)}
            className="w-full h-14 border-2 border-dashed border-gray-300 dark:text-gray-200 text-gray-700 font-medium rounded-lg transition-colors flex items-center justify-center gap-3"
            variant="outline"
          >
            <Plus size={24} />
            <span className="text-base">Add Link</span>
          </Button>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-between pt-6 pb-2 border-t border-gray-200">
        <Button
          variant="outline"
          onClick={() => toast.success("Feature coming soon!")}
          className="flex items-center gap-3 bg-transparent cursor-pointer px-4 py-3 h-auto"
        >
          <FolderPlus size={18} />
          <span>Add Collection</span>
        </Button>

        <Button
          variant="outline"
          className="flex items-center gap-3 bg-transparent cursor-pointer px-4 py-3 h-auto"
          onClick={() => toast.success("Feature coming soon!")}
        >
          <Archive size={18} />
          <span>View Archive</span>
        </Button>
      </div>

      {/* Social Link Modal */}
      <SocialLinkModal
        isOpen={isSocialModalOpen}
        onClose={() => setIsSocialModalOpen(false)}
        onSubmit={onSocialLinkSubmit}
        defaultValues={editingSocialLink ? {
          platform: editingSocialLink.platform,
          url: editingSocialLink.url
        } : undefined}
      />
    </div>
  );
};

export default LinkForm;