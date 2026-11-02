import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";
import AuthCard from "@/components/AuthCard";
import AuthShell from "@/components/AuthShell";
import { clerkEnabled } from "@/lib/clerk";

export const metadata: Metadata = { title: "Log in — Harbor" };

export default function LoginPage() {
  if (!clerkEnabled) return <AuthCard mode="login" />;
  return (
    <AuthShell>
      <SignIn routing="hash" signUpUrl="/signup" fallbackRedirectUrl="/account" />
    </AuthShell>
  );
}
