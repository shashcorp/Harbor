import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import Logo from "@/components/Logo";
import ReviewWizard from "@/components/ReviewWizard";
import { clerkEnabled } from "@/lib/clerk";
import { FUNDS } from "@/lib/funds";

export const metadata: Metadata = { title: "Open Harbor Invest — Harbor" };

export default async function ReviewPage() {
  if (!clerkEnabled) redirect("/account");
  const { auth, currentUser } = await import("@clerk/nextjs/server");
  const { userId } = await auth();
  if (!userId) redirect("/login");
  const user = await currentUser();
  const codes = (user?.unsafeMetadata as { fundSelection?: { funds?: string[] } } | undefined)?.fundSelection?.funds ?? [];
  const funds = FUNDS.filter((f) => codes.includes(f.code));
  if (funds.length === 0) redirect("/account/funds");

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
      <ReviewWizard funds={funds} />
    </div>
  );
}
