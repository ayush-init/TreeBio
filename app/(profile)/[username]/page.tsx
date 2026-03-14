import { logProfileVist } from '@/modules/analytics/actions';
import { getUserByUsername } from '@/modules/profile/actions';
import TreeBioProfile from '@/modules/profile/components/treebio-profile';

import { redirect } from 'next/navigation';
import React from 'react'

const Page = async ({ params }: { params: Promise<{ username: string }> }) => {
  const { username } = await params;
  const result = await getUserByUsername(username);

  // Check if user was found
  if (!result.success || !result.data) {
    return redirect("/")
  }

  const profileData = result.data;

  // Verify username exists and matches
  if (!profileData.username || profileData.username !== username) {
    return redirect("/")
  }

  // Create properly typed profile data with default values for nullable fields
  const typedProfileData = {
    id: profileData.id,
    clerkId: profileData.clerkId,
    email: profileData.email,
    username: profileData.username,
    firstName: profileData.firstName || "",
    lastName: profileData.lastName || "",
    imageUrl: profileData.imageUrl || "",
    bio: profileData.bio || "",
    createdAt: profileData.createdAt.toISOString(),
    updatedAt: profileData.updatedAt.toISOString(),
    links: (profileData.links || []).map(link => ({
      ...link,
      description: link.description || undefined, // Convert null to undefined
      createdAt: link.createdAt.toISOString(),
      updatedAt: link.updatedAt.toISOString(),
    })),
    socialLinks: (profileData.socialLinks || []).map(socialLink => ({
      ...socialLink,
      createdAt: socialLink.createdAt.toISOString(),
      updatedAt: socialLink.updatedAt.toISOString(),
    })),
  };

  // Log profile visit
  logProfileVist(profileData.id).catch((err) => {
    console.error("Error logging profile visit:", err);
  });

  return <TreeBioProfile profileData={typedProfileData} />
}

export default Page