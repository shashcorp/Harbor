import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import AuthShell from "@/components/AuthShell";
import AccountShell from "@/components/AccountShell";
import { InfoNote, Stepper } from "@/components/OnboardingSteps";
import { clerkEnabled } from "@/lib/clerk";

export const metadata: Metadata = { title: "Open Harbor Invest — Harbor" };

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

  const { auth, currentUser } = await import("@clerk/nextjs/server");
  const { userId } = await auth();
  if (!userId) redirect("/login");
  const user = await currentUser();
  const meta = user?.unsafeMetadata as
    | { riskProfile?: { label?: string }; fundSelection?: { funds?: string[] }; contract?: { signedAt?: string } }
    | undefined;
  const profile = meta?.riskProfile;
  const picked = (meta?.fundSelection?.funds?.length ?? 0) > 0;
  const signed = Boolean(meta?.contract?.signedAt);
  const current = signed ? 3 : picked ? 2 : profile ? 1 : 0;
  const nextHref = picked ? "/account/review" : profile ? "/account/funds" : "/account/risk-profile";

  return (
    <AccountShell next={signed ? undefined : { href: nextHref }} back={{ href: "/" }}>
      <div className="max-w-[1090px]">
        <h1 className="text-[2.1rem] font-light leading-tight tracking-[-0.01em] text-navy-900 sm:text-[2.75rem]">
          {signed ? "One step left" : picked ? "Halfway there" : profile ? "Three steps left" : "Open Harbor Invest in just 4 steps"}
        </h1>
        <div className="mt-9">
          <Stepper current={current} />
        </div>
        {!profile && <InfoNote>Quick and easy! Open Harbor Invest in about 15 minutes, directly online.</InfoNote>}
        {signed && (
          <InfoNote>
            Your Harbor Invest agreement is signed. Funding your account with USDC is coming soon; we&apos;ll let you know
            as soon as you can start investing.
          </InfoNote>
        )}
      </div>
    </AccountShell>
  );
}
