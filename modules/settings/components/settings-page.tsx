"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Palette, 
  ExternalLink, 
  Mail, 
  Settings as SettingsIcon,
  Loader2
} from "lucide-react";
import { getSettingsData } from "../actions";
import ProfileSettings from "../components/profile-settings";
import SocialSettings from "../components/social-settings";
import AppearanceSettings from "../components/appearance-settings";
import AccountSettings from "../components/account-settings";

const SettingsPage = () => {
  const [settingsData, setSettingsData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSettingsData = async () => {
      try {
        const result = await getSettingsData();
        if (result.success) {
          setSettingsData(result.data);
        }
      } catch (error) {
        console.error("Error loading settings data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettingsData();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">Manage your TreeBio account and preferences</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <Card className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-muted rounded w-1/4"></div>
              <div className="h-4 bg-muted rounded w-1/3"></div>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted rounded"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your TreeBio account and preferences</p>
        </div>
        <Badge variant="outline" className="text-green-600 border-green-600">
          <SettingsIcon className="w-3 h-3 mr-1" />
          Configuration
        </Badge>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            Social
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Account
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <ProfileSettings initialData={settingsData} />
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          <SocialSettings initialData={settingsData} />
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <AppearanceSettings initialData={settingsData} />
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <AccountSettings initialData={settingsData} />
        </TabsContent>
      </Tabs>

      {/* Quick Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Tips</CardTitle>
          <CardDescription>
            Get the most out of your TreeBio settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                Profile Optimization
              </h4>
              <p className="text-sm text-muted-foreground">
                Keep your bio concise and update your profile picture regularly for better engagement.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                Social Links
              </h4>
              <p className="text-sm text-muted-foreground">
                Add your most active social platforms to help visitors connect with you easily.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                Theme Selection
              </h4>
              <p className="text-sm text-muted-foreground">
                Choose System theme to automatically match your device's appearance preference.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                Security
              </h4>
              <p className="text-sm text-muted-foreground">
                Regularly review your account settings and keep your authentication information secure.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
