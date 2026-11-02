"use client";

import Link from "next/link";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { ChevronRight } from "./icons";
import { btnOutline, btnPrimary } from "./ui";

export default function AccountWelcome() {
  const { user } = useUser();
  const name = user?.firstName || user?.primaryEmailAddress?.emailAddress;

  return (
    <div className="w-full max-w-[640px] bg-white shadow-[0_1px_0_var(--color-line)]">
      <div className="border-l-4 border-accent px-8 py-10 sm:px-12">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">My account</p>
        <h1 className="mt-3 text-[2rem] font-light leading-tight text-navy-900">
          Welcome to Harbor{name ? `, ${name}` : ""}
        </h1>
        <p className="mt-4 leading-relaxed text-ink">
          Your Harbor account is set up. Next, choose the funds you want to invest in. Funding your account and
          connecting a wallet will be available here soon.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/funds" className={btnPrimary}>
            Browse funds <ChevronRight />
          </Link>
          <SignOutButton redirectUrl="/">
            <button type="button" className={btnOutline}>
              Sign out
            </button>
          </SignOutButton>
        </div>
      </div>
    </div>
  );
}
