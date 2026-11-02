"use client";

import Link from "next/link";
import { useId, useState } from "react";
import Logo from "./Logo";

type Mode = "signup" | "login";

function GoogleMark() {
  return (
    <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

function AppleMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M16.37 12.6c-.02-2.2 1.8-3.26 1.88-3.31-1.02-1.5-2.62-1.7-3.19-1.72-1.36-.14-2.65.8-3.34.8-.69 0-1.75-.78-2.88-.76-1.48.02-2.85.86-3.61 2.19-1.54 2.67-.39 6.62 1.11 8.79.73 1.06 1.6 2.25 2.75 2.21 1.1-.04 1.52-.71 2.85-.71 1.33 0 1.71.71 2.88.69 1.19-.02 1.94-1.08 2.66-2.15.84-1.23 1.19-2.42 1.21-2.48-.03-.01-2.32-.89-2.32-3.55zM14.17 6.13c.61-.74 1.02-1.76.91-2.78-.88.04-1.94.59-2.57 1.32-.56.65-1.06 1.69-.93 2.69.98.08 1.98-.5 2.59-1.23z" />
    </svg>
  );
}

const inputClass =
  "mt-1.5 block w-full border border-line bg-white px-3.5 py-3 text-ink placeholder:text-muted/70 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

export default function AuthCard({ mode }: { mode: Mode }) {
  const [notice, setNotice] = useState<string | null>(null);
  const emailId = useId();
  const passwordId = useId();
  const isSignup = mode === "signup";

  const preview = (what: string) =>
    setNotice(`${what} isn't live yet – this is a preview of the ${isSignup ? "sign-up" : "log-in"} page.`);

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

      <main className="flex flex-1 items-start justify-center px-5 py-12 sm:py-20">
        <div className="w-full max-w-[440px] bg-white shadow-[0_1px_0_var(--color-line)]">
          <nav aria-label="Account" className="grid grid-cols-2 border-b border-line text-center">
            {(
              [
                ["signup", "Create account", "/signup"],
                ["login", "Log in", "/login"],
              ] as const
            ).map(([m, label, href]) => (
              <Link
                key={m}
                href={href}
                aria-current={mode === m ? "page" : undefined}
                className={`border-b-2 py-4 text-sm font-semibold transition-colors ${
                  mode === m ? "border-accent text-navy-900" : "border-transparent text-muted hover:text-navy-900"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="px-6 py-8 sm:px-10 sm:py-10">
            <h1 className="text-[1.75rem] font-light leading-tight text-navy-900">
              {isSignup ? "Open your Harbor account" : "Welcome back"}
            </h1>
            <p className="mt-2 text-muted">
              {isSignup
                ? "$19 per month, with 50% off your first month. Cancel any time."
                : "Log in to manage your Harbor Invest portfolio."}
            </p>

            <div className="mt-8 space-y-3">
              <button
                type="button"
                onClick={() => preview("Signing in with Google")}
                className="flex w-full items-center justify-center gap-3 border border-line bg-white px-4 py-3 font-semibold text-ink transition-colors hover:border-navy-900"
              >
                <GoogleMark /> Continue with Google
              </button>
              <button
                type="button"
                onClick={() => preview("Signing in with Apple")}
                className="flex w-full items-center justify-center gap-3 bg-black px-4 py-3 font-semibold text-white transition-colors hover:bg-black/85"
              >
                <AppleMark /> Continue with Apple
              </button>
            </div>

            <div className="my-7 flex items-center gap-4 text-xs uppercase tracking-wide text-muted">
              <span className="h-px flex-1 bg-line" />
              or
              <span className="h-px flex-1 bg-line" />
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                preview(isSignup ? "Creating an account with email" : "Logging in with email");
              }}
              className="space-y-5"
            >
              <div>
                <label htmlFor={emailId} className="text-sm font-medium text-navy-900">
                  Email address
                </label>
                <input id={emailId} type="email" required autoComplete="email" placeholder="you@example.com" className={inputClass} />
              </div>
              <div>
                <div className="flex items-baseline justify-between">
                  <label htmlFor={passwordId} className="text-sm font-medium text-navy-900">
                    Password
                  </label>
                  {!isSignup && (
                    <a href="#" className="text-sm text-accent hover:text-accent-600">
                      Forgot password?
                    </a>
                  )}
                </div>
                <input
                  id={passwordId}
                  type="password"
                  required
                  minLength={isSignup ? 8 : undefined}
                  autoComplete={isSignup ? "new-password" : "current-password"}
                  placeholder={isSignup ? "At least 8 characters" : undefined}
                  className={inputClass}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-accent px-4 py-3.5 font-semibold text-white transition-colors hover:bg-accent-600"
              >
                {isSignup ? "Create account" : "Log in"}
              </button>
            </form>

            {notice && (
              <p role="status" className="mt-5 border-l-4 border-accent bg-accent-50 px-4 py-3 text-sm text-navy-900">
                {notice}
              </p>
            )}

            <p className="mt-7 text-center text-sm text-muted">
              {isSignup ? (
                <>
                  Already have an account?{" "}
                  <Link href="/login" className="font-semibold text-navy-900 hover:text-accent">
                    Log in
                  </Link>
                </>
              ) : (
                <>
                  New to Harbor?{" "}
                  <Link href="/signup" className="font-semibold text-navy-900 hover:text-accent">
                    Create an account
                  </Link>
                </>
              )}
            </p>
          </div>

          {isSignup && (
            <p className="border-t border-line px-6 py-4 text-xs leading-relaxed text-muted sm:px-10">
              By creating an account you agree to the Harbor Terms of use and Privacy policy, and acknowledge the
              risks of investing in digital assets.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
