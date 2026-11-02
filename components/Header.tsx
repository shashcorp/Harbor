"use client";

import { useEffect, useState } from "react";
import Container from "./Container";
import Logo from "./Logo";
import Link from "next/link";
import { Close, Help, Menu, Shield } from "./icons";

const NAV = [
  { label: "Invest", href: "/", active: true },
  { label: "Vaults", href: "/#vaults", soon: true },
  { label: "Private", href: "/#private", soon: true },
];

function SoonBadge() {
  return (
    <span className="ml-2 bg-accent-50 px-1.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-accent-600">
      Soon
    </span>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <Container>
        <div className="flex h-[72px] items-center justify-between gap-6">
          <div className="flex h-full items-center gap-12">
            <a href="/" aria-label="Harbor home">
              <Logo />
            </a>
            <nav aria-label="Main" className="hidden h-full items-stretch gap-9 text-[0.95rem] text-ink md:flex">
              {NAV.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-current={item.active ? "page" : undefined}
                  className={`flex items-center border-b-2 pt-0.5 transition-colors ${
                    item.active ? "border-accent text-navy-900" : "border-transparent hover:text-accent"
                  }`}
                >
                  {item.label}
                  {item.soon && <SoonBadge />}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#"
              className="hidden items-center gap-2 border border-line px-3 py-1.5 text-sm text-navy-900 transition-colors hover:border-navy-900 lg:inline-flex"
            >
              <Shield /> Security
            </a>
            <a
              href="/#faq"
              className="hidden items-center gap-2 border border-line px-3 py-1.5 text-sm text-navy-900 transition-colors hover:border-navy-900 lg:inline-flex"
            >
              <Help /> Help and contact
            </a>
            <Link
              href="/login"
              className="hidden px-2 text-sm font-semibold text-navy-900 transition-colors hover:text-accent sm:inline"
            >
              Log in
            </Link>
            <Link href="/signup" className="inline-flex items-center bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-600">
              Open account
            </Link>
            <button
              type="button"
              className="-mr-2 p-2 text-navy-900 md:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <Close className="h-6 w-6" /> : <Menu />}
            </button>
          </div>
        </div>
      </Container>

      {mobileOpen && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-line bg-white md:hidden">
          <Container className="py-4">
            <ul className="divide-y divide-line">
              {NAV.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    aria-current={item.active ? "page" : undefined}
                    className={`flex items-center py-3 ${item.active ? "font-semibold text-accent" : "text-navy-900"}`}
                  >
                    {item.label}
                    {item.soon && <SoonBadge />}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex gap-3 text-sm">
              <a href="#" className="inline-flex items-center gap-2 border border-line px-3 py-1.5 text-navy-900">
                <Shield /> Security
              </a>
              <a
                href="/#faq"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center gap-2 border border-line px-3 py-1.5 text-navy-900"
              >
                <Help /> Help
              </a>
            </div>
          </Container>
        </nav>
      )}
    </header>
  );
}
