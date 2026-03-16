import { SignedIn, SignedOut } from "@clerk/nextjs";
import LandingPage from "@/components/landing/LandingPage";
import DashboardHome from "@/components/dashboard/Dashboard";

export default function Home() {
  return (
    <>
      <SignedOut>
        <LandingPage />
      </SignedOut>
      <SignedIn>
        <DashboardHome />
      </SignedIn>
    </>
  );
}