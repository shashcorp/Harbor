import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import AuthShell from "@/components/AuthShell";
import AccountWelcome from "@/components/AccountWelcome";
import { clerkEnabled } from "@/lib/clerk";

export const metadata: Metadata = { title: "My account — Harbor" };

export default async function AccountPage() {
  if (!clerkEnabled) {
    return (
      <AuthShell>
        <div className="w-full max-w-[520px] bg-white p-10 text-center">
          <h1 className="text-[1.75rem] font-light text-navy-900">Accounts aren&apos;t live yet</h1>
          <p className="mt-3 text-muted">Sign-in is being set up. Please check back soon.</p>
          <Link href="/funds" className="mt-6 inline-block font-semibold text-accent hover:text-accent-600">
            Browse the funds
          </Link>
        </div>
      </AuthShell>
    );
  }

  const { auth } = await import("@clerk/nextjs/server");
  const { userId } = await auth();
  if (!userId) redirect("/login");

  return (
    <AuthShell>
      <AccountWelcome />
    </AuthShell>
  );
}
