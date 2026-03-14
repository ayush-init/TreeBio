"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Copy, Download, QrCode, Share2, User, Globe } from "lucide-react";
import { generateQRCode, getUserProfileData } from "../actions";
import { toast } from "sonner";

interface QRCodeGeneratorProps {}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = () => {
  const [qrData, setQrData] = useState<any>(null);
  const [profileData, setProfileData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [qrResult, profileResult] = await Promise.all([
          generateQRCode(""),
          getUserProfileData()
        ]);

        if (qrResult.success) {
          setQrData(qrResult.data);
        }

        if (profileResult.success) {
          setProfileData(profileResult.data);
        }
      } catch (error) {
        console.error("Error loading data:", error);
        toast.error("Failed to load data");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Link copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  const downloadQRCode = (format: 'png' | 'svg') => {
    if (!qrData?.qrCode) return;

    try {
      if (format === 'png') {
        // For PNG, create a download link from the data URL
        const link = document.createElement('a');
        link.download = `treebio-${qrData.username}-qr.png`;
        link.href = qrData.qrCode;
        link.click();
      } else {
        // For SVG, we'd need to generate SVG separately
        toast.info("SVG download coming soon!");
      }
      toast.success(`QR code downloaded as ${format.toUpperCase()}`);
    } catch (error) {
      toast.error("Failed to download QR code");
    }
  };

  const shareProfile = async () => {
    if (!qrData?.url) return;

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${profileData?.firstName || 'My'} TreeBio`,
          text: `Check out my TreeBio profile!`,
          url: qrData.url
        });
      } else {
        copyToClipboard(qrData.url);
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">QR Code Generator</h1>
            <p className="text-muted-foreground">Generate a QR code for your TreeBio profile</p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted rounded"></div>
            </CardContent>
          </Card>
          <Card className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-20 bg-muted rounded"></div>
                <div className="h-10 bg-muted rounded"></div>
              </div>
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
          <h1 className="text-3xl font-bold tracking-tight">QR Code Generator</h1>
          <p className="text-muted-foreground">Generate a QR code for your TreeBio profile</p>
        </div>
        <Badge variant="outline" className="text-green-600 border-green-600">
          <QrCode className="w-3 h-3 mr-1" />
          Active
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* QR Code Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="w-5 h-5 text-green-600" />
              Your QR Code
            </CardTitle>
            <CardDescription>
              Scan this code to visit your TreeBio profile
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {qrData?.qrCode ? (
              <div className="flex justify-center">
                <div className="p-4 bg-white rounded-lg border">
                  <img 
                    src={qrData.qrCode} 
                    alt="TreeBio QR Code" 
                    className="w-64 h-64"
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 bg-muted rounded-lg">
                <p className="text-muted-foreground">No QR code available</p>
              </div>
            )}
            
            <div className="flex gap-2">
              <Button 
                onClick={() => downloadQRCode('png')}
                className="flex-1"
                variant="outline"
              >
                <Download className="w-4 h-4 mr-2" />
                PNG
              </Button>
              <Button 
                onClick={() => downloadQRCode('svg')}
                className="flex-1"
                variant="outline"
              >
                <Download className="w-4 h-4 mr-2" />
                SVG
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Profile Preview Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-green-600" />
              Profile Preview
            </CardTitle>
            <CardDescription>
              How your profile appears to visitors
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {profileData && (
              <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={profileData.imageUrl} />
                  <AvatarFallback>
                    {profileData.firstName?.[0] || profileData.username?.[0] || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">
                    {profileData.firstName && profileData.lastName
                      ? `${profileData.firstName} ${profileData.lastName}`
                      : profileData.username || 'User'
                    }
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    @{profileData.username}
                  </p>
                  {profileData.bio && (
                    <p className="text-sm mt-1 line-clamp-2">{profileData.bio}</p>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Public Link</label>
                <div className="flex gap-2 mt-1">
                  <Input 
                    value={qrData?.url || ''} 
                    readOnly 
                    className="flex-1"
                  />
                  <Button 
                    size="icon"
                    variant="outline"
                    onClick={() => copyToClipboard(qrData?.url)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={() => copyToClipboard(qrData?.url)}
                  className="flex-1"
                  variant="outline"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Link
                </Button>
                <Button 
                  onClick={shareProfile}
                  className="flex-1"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {qrData?.url && (
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-300">
                  <Globe className="w-4 h-4" />
                  <span>Profile is live and accessible</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Usage Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Tips</CardTitle>
          <CardDescription>
            How to make the most of your QR code
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                Business Cards
              </h4>
              <p className="text-sm text-muted-foreground">
                Add QR code to business cards for easy profile access
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                Social Media
              </h4>
              <p className="text-sm text-muted-foreground">
                Use QR code in social media posts and stories
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                Events
              </h4>
              <p className="text-sm text-muted-foreground">
                Display QR code at events and presentations
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QRCodeGenerator;
