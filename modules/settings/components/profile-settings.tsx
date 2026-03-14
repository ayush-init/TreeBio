"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Upload, 
  Save, 
  Loader2, 
  Check,
  AlertCircle,
  Camera
} from "lucide-react";
import { updateProfileSettings } from "../actions";
import { toast } from "sonner";

interface ProfileSettingsProps {
  initialData?: any;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ initialData }) => {
  const [formData, setFormData] = useState({
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    username: initialData?.username || "",
    bio: initialData?.bio || "",
    imageUrl: initialData?.imageUrl || ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file
    const { validateImageFile } = await import("@/lib/cloudinary");
    if (!validateImageFile(file)) {
      toast.error("Please upload a valid image file (JPEG, PNG, WebP, GIF) under 5MB");
      return;
    }

    setIsUploading(true);
    try {
      // Upload to Cloudinary
      const { uploadToCloudinary } = await import("@/lib/cloudinary");
      const imageUrl = await uploadToCloudinary(file);
      
      setFormData(prev => ({ ...prev, imageUrl }));
      setIsUploading(false);
      toast.success("Image uploaded successfully");
    } catch (error) {
      setIsUploading(false);
      toast.error("Failed to upload image");
      console.error("Upload error:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await updateProfileSettings(formData);
      if (result.success) {
        toast.success("Profile settings updated successfully!");
      } else {
        toast.error(result.error || "Failed to update profile");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = (firstName?: string, lastName?: string) => {
    const first = firstName?.[0] || "";
    const last = lastName?.[0] || "";
    return (first + last).toUpperCase() || "U";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5 text-green-600" />
          Profile Settings
        </CardTitle>
        <CardDescription>
          Update your personal information and how others see your profile
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Profile Picture</Label>
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={formData.imageUrl} />
                <AvatarFallback className="text-lg">
                  {getInitials(formData.firstName, formData.lastName)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <div className="relative inline-block">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="relative"
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Camera className="w-4 h-4 mr-2" />
                    )}
                    Change Photo
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={isUploading}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  JPG, PNG or GIF. Max 5MB.
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Name Fields */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                placeholder="John"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                placeholder="Doe"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="flex items-center space-x-2">
              <div className="flex items-center px-3 py-2 bg-muted rounded-l-md border border-r-0">
                <span className="text-sm text-muted-foreground">treebio.com/</span>
              </div>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ""))}
                placeholder="username"
                className="rounded-l-none"
                disabled={isLoading}
                maxLength={30}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              3-30 characters, lowercase letters and numbers only
            </p>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              placeholder="Tell people about yourself..."
              className="resize-none"
              rows={4}
              disabled={isLoading}
              maxLength={300}
            />
            <div className="flex justify-between">
              <p className="text-xs text-muted-foreground">
                Brief description for your profile
              </p>
              <p className="text-xs text-muted-foreground">
                {formData.bio.length}/300
              </p>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={isLoading}
              className="min-w-32"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Save Changes
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileSettings;
