"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Palette, 
  Monitor, 
  Moon, 
  Sun, 
  Save,
  Loader2,
  Square,
  Circle,
  Minus
} from "lucide-react";
import { updateAppearanceSettings } from "../actions";
import { toast } from "sonner";

interface AppearanceSettingsProps {
  initialData?: {
    theme?: string;
    buttonStyle?: string;
  };
}

const AppearanceSettings: React.FC<AppearanceSettingsProps> = ({ initialData }) => {
  const [formData, setFormData] = useState<{
    theme: "light" | "dark" | "system";
    buttonStyle: "rounded" | "pill" | "minimal";
  }>({
    theme: (initialData?.theme as "light" | "dark" | "system") || "system",
    buttonStyle: (initialData?.buttonStyle as "rounded" | "pill" | "minimal") || "rounded"
  });
  const [isLoading, setIsLoading] = useState(false);

  const themeOptions = [
    {
      value: "light",
      label: "Light",
      icon: Sun,
      description: "Clean, bright interface"
    },
    {
      value: "dark",
      label: "Dark",
      icon: Moon,
      description: "Easy on the eyes"
    },
    {
      value: "system",
      label: "System",
      icon: Monitor,
      description: "Follows your device setting"
    }
  ];

  const buttonStyleOptions = [
    {
      value: "rounded",
      label: "Rounded",
      icon: Circle,
      preview: "rounded-full"
    },
    {
      value: "pill",
      label: "Pill",
      icon: Minus,
      preview: "rounded-full px-6"
    },
    {
      value: "minimal",
      label: "Minimal",
      icon: Square,
      preview: "rounded-none"
    }
  ];

  const handleThemeChange = (theme: "light" | "dark" | "system") => {
    setFormData(prev => ({ ...prev, theme }));
  };

  const handleButtonStyleChange = (buttonStyle: "rounded" | "pill" | "minimal") => {
    setFormData(prev => ({ ...prev, buttonStyle }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await updateAppearanceSettings(formData);
      if (result.success) {
        toast.success("Appearance settings updated successfully!");
      } else {
        toast.error(result.error || "Failed to update appearance settings");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-green-600" />
          Appearance Settings
        </CardTitle>
        <CardDescription>
          Customize how your TreeBio looks and feels
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Theme Selection */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Theme</Label>
            <div className="grid gap-3">
              {themeOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <div
                    key={option.value}
                    className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                      formData.theme === option.value
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                        : "border-border hover:bg-muted"
                    }`}
                    onClick={() => handleThemeChange(option.value as "light" | "dark" | "system")}
                  >
                    <Icon className="w-5 h-5" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{option.label}</p>
                        {formData.theme === option.value && (
                          <Badge variant="secondary" className="text-xs">
                            Active
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {option.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Separator />

          {/* Button Style Selection */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Button Style</Label>
            <p className="text-sm text-muted-foreground">
              Choose how buttons appear on your public profile
            </p>
            <div className="grid gap-3 md:grid-cols-3">
              {buttonStyleOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <div
                    key={option.value}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      formData.buttonStyle === option.value
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                        : "border-border hover:bg-muted"
                    }`}
                    onClick={() => handleButtonStyleChange(option.value as "rounded" | "pill" | "minimal")}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Icon className="w-5 h-5" />
                        {formData.buttonStyle === option.value && (
                          <Badge variant="secondary" className="text-xs">
                            Active
                          </Badge>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{option.label}</p>
                      </div>
                      <div className="flex justify-center">
                        <div
                          className={`bg-green-600 text-white text-xs px-4 py-2 ${option.preview}`}
                        >
                          Preview
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Preview Section */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Preview</Label>
            <div className="p-6 bg-muted rounded-lg">
              <div className="space-y-3 max-w-sm mx-auto">
                <div className="text-center">
                  <h4 className="font-semibold">Your Profile</h4>
                  <p className="text-sm text-muted-foreground">@username</p>
                </div>
                <div className="space-y-2">
                  <button
                    className={`w-full bg-green-600 text-white py-3 px-4 text-left ${
                      formData.buttonStyle === "rounded"
                        ? "rounded-full"
                        : formData.buttonStyle === "pill"
                        ? "rounded-full px-6"
                        : "rounded-none"
                    }`}
                  >
                    Visit My Website
                  </button>
                  <button
                    className={`w-full bg-green-600 text-white py-3 px-4 text-left ${
                      formData.buttonStyle === "rounded"
                        ? "rounded-full"
                        : formData.buttonStyle === "pill"
                        ? "rounded-full px-6"
                        : "rounded-none"
                    }`}
                  >
                    Follow on Instagram
                  </button>
                </div>
              </div>
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

export default AppearanceSettings;
