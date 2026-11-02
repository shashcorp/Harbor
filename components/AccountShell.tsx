"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import Logo from "./Logo";

/** Signed-in app frame: slim header with the user menu, grey canvas and a fixed Next / Back bar. */
export default function AccountShell({
  children,
  next,
  back,
}: {
  children: React.ReactNode;
  next?: { href: string; label?: string };
  back?: { href: string; label?: string };
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[#f4f4f4]">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex h-[72px] w-full max-w-[1290px] items-center justify-between px-5 sm:px-8">
          <Link href="/" aria-label="Harbor home">
            <Logo />
          </Link>
          <UserButton />
        </div>
      </header>

      <main className="flex-1 pb-32">
        <div className="mx-auto w-full max-w-[1290px] px-5 pt-10 sm:px-8 sm:pt-12">{children}</div>
      </main>

      {(next || back) && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white shadow-[0_-6px_20px_rgba(0,0,0,0.06)]">
          <div className="mx-auto flex w-full max-w-[1290px] gap-6 px-5 py-6 sm:px-8">
            {next && (
              <Link
                href={next.href}
                className="inline-flex min-w-[120px] items-center justify-center bg-navy-900 px-8 py-3.5 font-semibold text-white transition-colors hover:bg-navy-800"
              >
                {next.label ?? "Next"}
              </Link>
            )}
            {back && (
              <Link
                href={back.href}
                className="inline-flex min-w-[120px] items-center justify-center bg-[#ececec] px-8 py-3.5 font-semibold text-navy-900 transition-colors hover:bg-line"
              >
                {back.label ?? "Back"}
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
