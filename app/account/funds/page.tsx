import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import Logo from "@/components/Logo";
import FundWizard from "@/components/FundWizard";
import { clerkEnabled } from "@/lib/clerk";

export const metadata: Metadata = { title: "Find the right Harbor funds — Harbor" };

export default async function FundSelectionPage() {
  if (!clerkEnabled) redirect("/account");
  const { auth, currentUser } = await import("@clerk/nextjs/server");
  const { userId } = await auth();
  if (!userId) redirect("/login");
  const user = await currentUser();
  const profile = (user?.unsafeMetadata as { riskProfile?: { label?: string; risk?: number } } | undefined)?.riskProfile;
  if (!profile?.label) redirect("/account/risk-profile");

  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex h-[72px] w-full max-w-[1290px] items-center justify-between px-5 sm:px-8">
          <Link href="/" aria-label="Harbor home">
            <Logo />
          </Link>
          <UserButton />
        </div>
      </header>
      <FundWizard profileLabel={profile.label} profileRisk={profile.risk ?? 4} />
    </div>
  );
}
