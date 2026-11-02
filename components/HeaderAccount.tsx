"use client";

import Link from "next/link";
import { UserButton, useAuth } from "@clerk/nextjs";
import { clerkEnabled } from "@/lib/clerk";

function SignedOutLinks() {
  return (
    <>
      <Link
        href="/login"
        className="hidden px-2 text-sm font-semibold text-navy-900 transition-colors hover:text-accent sm:inline"
      >
        Log in
      </Link>
      <Link
        href="/signup"
        className="inline-flex items-center bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-600"
      >
        Open account
      </Link>
    </>
  );
}

function ClerkAccount() {
  const { isLoaded, isSignedIn } = useAuth();
  if (isLoaded && isSignedIn) {
    return (
      <>
        <Link
          href="/account"
          className="hidden px-2 text-sm font-semibold text-navy-900 transition-colors hover:text-accent sm:inline"
        >
          My account
        </Link>
        <UserButton />
      </>
    );
  }
  return <SignedOutLinks />;
}

/** Header account area: Log in / Open account, or the signed-in user's menu when Clerk is configured. */
export default function HeaderAccount() {
  return clerkEnabled ? <ClerkAccount /> : <SignedOutLinks />;
}
