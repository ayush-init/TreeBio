"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import QRCode from "qrcode";

export const generateQRCode = async (username: string) => {
  const user = await currentUser();

  if (!user) {
    return { success: false, error: "No authenticated user found" };
  }

  const profile = await db.user.findUnique({
    where: { clerkId: user.id },
    select: { username: true }
  });

  if (!profile?.username) {
    return { success: false, error: "No username found" };
  }

  // Generate the full URL for the profile
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://treebio.com";
  const profileUrl = `${baseUrl}/${profile.username}`;

  try {
    // Generate QR code as data URL
    const qrCodeDataUrl = await QRCode.toDataURL(profileUrl, {
      width: 300,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#FFFFFF"
      }
    });

    return {
      success: true,
      data: {
        qrCode: qrCodeDataUrl,
        url: profileUrl,
        username: profile.username
      }
    };
  } catch (error) {
    console.error("Error generating QR code:", error);
    return { success: false, error: "Failed to generate QR code" };
  }
};

export const getUserProfileData = async () => {
  const user = await currentUser();

  if (!user) {
    return { success: false, error: "No authenticated user found" };
  }

  const profile = await db.user.findUnique({
    where: { clerkId: user.id },
    select: {
      username: true,
      firstName: true,
      lastName: true,
      imageUrl: true,
      bio: true
    }
  });

  if (!profile) {
    return { success: false, error: "Profile not found" };
  }

  return { success: true, data: profile };
};
