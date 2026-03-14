"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Profile settings schema
const profileSettingsSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  username: z.string().min(3).max(30).optional(),
  bio: z.string().max(300).optional(),
  imageUrl: z.string().url().optional(),
});

// Appearance settings schema
const appearanceSettingsSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
  buttonStyle: z.enum(["rounded", "pill", "minimal"]),
});

// Social links schema
const socialLinkSchema = z.object({
  platform: z.string(),
  url: z.string().url(),
});

export const updateProfileSettings = async (data: z.infer<typeof profileSettingsSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { success: false, error: "No authenticated user found" };
  }

  try {
    const validatedData = profileSettingsSchema.parse(data);

    // Check username uniqueness if username is being updated
    if (validatedData.username) {
      const existingUser = await db.user.findFirst({
        where: {
          username: validatedData.username,
          clerkId: { not: user.id }
        }
      });

      if (existingUser) {
        return { success: false, error: "Username is already taken" };
      }
    }

    const updatedUser = await db.user.update({
      where: { clerkId: user.id },
      data: validatedData
    });

    revalidatePath("/admin/settings");
    revalidatePath(`/${updatedUser.username}`);

    return { 
      success: true, 
      message: "Profile settings updated successfully",
      data: updatedUser
    };
  } catch (error) {
    console.error("Error updating profile settings:", error);
    return { success: false, error: "Failed to update profile settings" };
  }
};

export const updateAppearanceSettings = async (data: z.infer<typeof appearanceSettingsSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { success: false, error: "No authenticated user found" };
  }

  try {
    const validatedData = appearanceSettingsSchema.parse(data);

    await db.user.update({
      where: { clerkId: user.id },
      data: validatedData
    });

    revalidatePath("/admin/settings");
    revalidatePath(`/${user.username}`);

    return { 
      success: true, 
      message: "Appearance settings updated successfully"
    };
  } catch (error) {
    console.error("Error updating appearance settings:", error);
    return { success: false, error: "Failed to update appearance settings" };
  }
};

export const addSocialLink = async (data: z.infer<typeof socialLinkSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { success: false, error: "No authenticated user found" };
  }

  try {
    const validatedData = socialLinkSchema.parse(data);

    // Check if social link for this platform already exists
    const existingLink = await db.socialLink.findFirst({
      where: {
        platform: validatedData.platform,
        user: { clerkId: user.id }
      }
    });

    if (existingLink) {
      // Update existing link
      await db.socialLink.update({
        where: { id: existingLink.id },
        data: { url: validatedData.url }
      });
    } else {
      // Create new link
      await db.socialLink.create({
        data: {
          ...validatedData,
          user: { connect: { clerkId: user.id } }
        }
      });
    }

    revalidatePath("/admin/settings");
    revalidatePath(`/${user.username}`);

    return { 
      success: true, 
      message: "Social link added successfully"
    };
  } catch (error) {
    console.error("Error adding social link:", error);
    return { success: false, error: "Failed to add social link" };
  }
};

export const deleteSocialLink = async (socialLinkId: string) => {
  const user = await currentUser();

  if (!user) {
    return { success: false, error: "No authenticated user found" };
  }

  try {
    // Verify the social link belongs to the current user
    const socialLink = await db.socialLink.findFirst({
      where: {
        id: socialLinkId,
        user: { clerkId: user.id }
      }
    });

    if (!socialLink) {
      return { success: false, error: "Social link not found" };
    }

    await db.socialLink.delete({
      where: { id: socialLinkId }
    });

    revalidatePath("/admin/settings");
    revalidatePath(`/${user.username}`);

    return { 
      success: true, 
      message: "Social link deleted successfully"
    };
  } catch (error) {
    console.error("Error deleting social link:", error);
    return { success: false, error: "Failed to delete social link" };
  }
};

export const getSettingsData = async () => {
  const user = await currentUser();

  if (!user) {
    return { success: false, error: "No authenticated user found" };
  }

  try {
    const userData = await db.user.findUnique({
      where: { clerkId: user.id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        bio: true,
        imageUrl: true,
        email: true,
        theme: true,
        buttonStyle: true,
        socialLinks: {
          select: {
            id: true,
            platform: true,
            url: true
          }
        }
      }
    });

    if (!userData) {
      return { success: false, error: "User data not found" };
    }

    return { success: true, data: userData };
  } catch (error) {
    console.error("Error fetching settings data:", error);
    return { success: false, error: "Failed to fetch settings data" };
  }
};

export const deleteAccount = async () => {
  const user = await currentUser();

  if (!user) {
    return { success: false, error: "No authenticated user found" };
  }

  try {
    // This would typically require additional verification
    // For now, we'll just return an error message
    return { 
      success: false, 
      error: "Account deletion requires additional verification. Please contact support." 
    };
  } catch (error) {
    console.error("Error deleting account:", error);
    return { success: false, error: "Failed to delete account" };
  }
};
