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
  const profile = (user?.unsafeMetadata as { riskProfile?: { label?: string } } | undefined)?.riskProfile;
  const current = profile ? 1 : 0;

  return (
    <AccountShell next={{ href: profile ? "/funds" : "/account/risk-profile" }} back={{ href: "/" }}>
      <div className="max-w-[1090px]">
        <h1 className="text-[2.1rem] font-light leading-tight tracking-[-0.01em] text-navy-900 sm:text-[2.75rem]">
          Open Harbor Invest in just 4 steps
        </h1>
        <div className="mt-9">
          <Stepper current={current} />
        </div>
        {profile ? (
          <InfoNote>
            Your risk profile is <strong className="font-semibold">{profile.label}</strong>.{" "}
            <Link href="/account/risk-profile" className="font-semibold text-accent hover:text-accent-600">
              View your profile
            </Link>{" "}
            or{" "}
            <Link href="/account/risk-profile?retake=1" className="font-semibold text-accent hover:text-accent-600">
              retake the questionnaire
            </Link>
            .
          </InfoNote>
        ) : (
          <InfoNote>Quick and easy! Open Harbor Invest in about 15 minutes, directly online.</InfoNote>
        )}
      </div>
    </AccountShell>
  );
}
