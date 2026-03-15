"use server";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const onBoardUser = async () => {
    try {
        const user = await currentUser();

        if (!user) {
            return { success: false, error: "No authenticated user found" };
        }

        const { id, firstName, lastName, imageUrl, emailAddresses } = user;

        // Check if user already exists in database
        const existingUser = await db.user.findUnique({
            where: { clerkId: id },
            select: { imageUrl: true }
        });

        console.log("🔍 DEBUG - Existing DB imageUrl:", existingUser?.imageUrl);
        console.log("🔍 DEBUG - Clerk imageUrl:", imageUrl);

        // Determine which imageUrl to use
        const finalImageUrl = existingUser?.imageUrl ? existingUser.imageUrl : (imageUrl || null);
        
        console.log("🔍 DEBUG - Final imageUrl being saved:", finalImageUrl);

        // Use upsert to create or update user
        const newUser = await db.user.upsert({
            where: {
                clerkId: id
            },
            update: {
                firstName: firstName || null,
                lastName: lastName || null,
                // Only update imageUrl if it's currently null in database
                imageUrl: finalImageUrl,
                email: emailAddresses[0]?.emailAddress || "",
            },
            create: {
                clerkId: id,
                firstName: firstName || null,
                lastName: lastName || null,
                imageUrl: imageUrl || null, // Use Clerk image for new users
                email: emailAddresses[0]?.emailAddress || "",
            }
        });

        console.log("✅ User onboarded successfully:", newUser.id);
        console.log("🔍 DEBUG - Saved imageUrl:", newUser.imageUrl);
        
        return { 
            success: true, 
            user: newUser,
            message: "User onboarded successfully" 
        };

    } catch (error) {
        console.error("❌ Error onboarding user:", error);
        return { 
            success: false, 
            error: "Failed to onboard user" 
        };
    }
};
