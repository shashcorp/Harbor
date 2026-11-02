import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import Logo from "@/components/Logo";
import RiskWizard from "@/components/RiskWizard";
import { clerkEnabled } from "@/lib/clerk";
import type { Answers } from "@/lib/riskProfile";

export const metadata: Metadata = { title: "Define your risk profile — Harbor" };

export default async function RiskProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ retake?: string }>;
}) {
  if (!clerkEnabled) redirect("/account");
  const { auth, currentUser } = await import("@clerk/nextjs/server");
  const { userId } = await auth();
  if (!userId) redirect("/login");

  const { retake } = await searchParams;
  const user = await currentUser();
  const saved = (user?.unsafeMetadata as { riskProfile?: { answers?: Answers } } | undefined)?.riskProfile?.answers;

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
      <RiskWizard initialAnswers={retake ? undefined : saved} />
    </div>
  );
}
