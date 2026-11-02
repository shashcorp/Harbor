import type { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";
import AuthCard from "@/components/AuthCard";
import AuthShell from "@/components/AuthShell";
import { clerkEnabled } from "@/lib/clerk";

export const metadata: Metadata = { title: "Open an account — Harbor" };

export default function SignupPage() {
  if (!clerkEnabled) return <AuthCard mode="signup" />;
  return (
    <AuthShell>
      <SignUp routing="hash" signInUrl="/login" fallbackRedirectUrl="/account" />
    </AuthShell>
  );
}
