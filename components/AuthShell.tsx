import Link from "next/link";
import Logo from "./Logo";

/** Page frame for the sign-up / log-in / account pages: slim header and a centred column. */
export default function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-mist">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex h-[72px] w-full max-w-[1290px] items-center justify-between px-5 sm:px-8">
          <Link href="/" aria-label="Harbor home">
            <Logo />
          </Link>
          <Link href="/" className="text-sm font-semibold text-navy-900 transition-colors hover:text-accent">
            Back to Harbor
          </Link>
        </div>
      </header>
      <main className="flex flex-1 items-start justify-center px-5 py-12 sm:py-20">{children}</main>
    </div>
  );
}
