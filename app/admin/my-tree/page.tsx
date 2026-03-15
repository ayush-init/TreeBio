"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import LinkForm from "@/modules/links/components/link-form";
import PreviewFrame from "@/modules/links/components/preview-frame";
import ShareMenu from "@/modules/links/components/share-menu";
import { Brush } from "lucide-react";
import { MyTreeShimmer } from "@/modules/links/components/my-tree-shimmer";

const Page = () => {
  const [profile, setProfile] = React.useState<any>(null);
  const [links, setLinks] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch profile and links via client-side API calls
        const [profileResponse, linksResponse] = await Promise.all([
          fetch('/api/profile'),
          fetch('/api/links')
        ]);

        const profileData = await profileResponse.json();
        const linksData = await linksResponse.json();

        setProfile(profileData);
        setLinks(linksData.data || []);

        // Set current user data from profile
        setCurrentUser({
          firstName: profileData?.firstName,
          lastName: profileData?.lastName,
          imageUrl: profileData?.imageUrl
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleProfileChange = (updatedProfile: any) => {
    setProfile((prev: any) => ({ ...prev, ...updatedProfile }));
  };

  const handleLinksChange = (updatedLinks: any[]) => {
    setLinks(updatedLinks);
  };

  if (loading) {
    return <MyTreeShimmer />;
  }

  return (
    <section className="flex flex-col gap-6 px-4 py-6 h-screen overflow-hidden">
      {/* Page header */}
      <div className="flex flex-row items-center justify-between w-full flex-shrink-0">
        <div className="flex flex-row justify-center items-center gap-3">
          <Button
            variant="outline"
            size="default"
            className="gap-2 bg-transparent"
          >
            <Brush size={16} />
            Design
          </Button>
          {profile?.username && <ShareMenu username={profile.username} />}
        </div>
      </div>

      {/* Main Content - Form and Preview */}
      <div className="flex flex-col lg:flex-row gap-8 flex-1 min-h-0">
        {/* Left Editor - Scrollable Area */}
        <div className="h-full preview-scrollbar p-10  ">
          <div className="border-r pr-0 lg:pr-8 pb-8">
            <LinkForm
              username={profile?.username || ""}
              bio={profile?.bio || ""}
              imageUrl={profile?.imageUrl || ""}
              link={links}
              socialLinks={profile?.socialLinks || []}
              onProfileChange={handleProfileChange}
              onLinksChange={handleLinksChange}
            />
          </div>
        </div>

        {/* Right Preview - Fixed Panel */}
        <div className="order-1  lg:order-2 w-full lg:w-96 flex-shrink-0 overflow-hidden">
          <div className="flex-1 p-5  justify-center items-center order-2 lg:order-1 min-w-0 editor-scrollbar">
            <PreviewFrame
              currentUser={currentUser}
              links={links.map((link: { id: string; title: string; description: string | null; url: string; clickCount: number; createdAt: Date; image?: string | null }) => ({
                ...link,
                description:
                  link.description === null ? undefined : link.description,
                image: link.image === null ? undefined : link.image,
                user: {
                  firstName: profile?.firstName || "",
                  lastName: profile?.lastName || "",
                  username: profile?.username || "",
                  bio: profile?.bio || "",
                  imageUrl: profile?.imageUrl || ""
                }
              }))}
              socialLinks={profile?.socialLinks || []}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
