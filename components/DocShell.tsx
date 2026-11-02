"use client";

import Link from "next/link";
import Logo from "./Logo";

/** Printable A4-style document page (factsheet / prospectus) with a Save-as-PDF action. */
export default function DocShell({
  backHref,
  backLabel,
  docType,
  children,
}: {
  backHref: string;
  backLabel: string;
  docType: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-mist print:bg-white">
      <div className="border-b border-line bg-white print:hidden">
        <div className="mx-auto flex h-16 w-full max-w-[900px] items-center justify-between gap-4 px-5">
          <Link href={backHref} className="text-sm font-semibold text-navy-900 hover:text-accent">
            ← {backLabel}
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-600"
          >
            Save as PDF
          </button>
        </div>
      </div>
      <article className="mx-auto my-8 w-full max-w-[900px] bg-white px-6 py-10 text-[0.95rem] leading-relaxed text-ink shadow-[0_1px_0_var(--color-line)] sm:px-14 sm:py-14 print:my-0 print:max-w-none print:px-0 print:py-0 print:shadow-none">
        <div className="flex items-center justify-between border-b-2 border-navy-900 pb-5">
          <Logo />
          <span className="text-xs font-semibold uppercase tracking-wide text-muted">{docType}</span>
        </div>
        {children}
      </article>
    </div>
  );
}
