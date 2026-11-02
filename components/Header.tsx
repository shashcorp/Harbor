"use client";

import { useEffect, useState } from "react";
import Container from "./Container";
import Logo from "./Logo";
import { ConnectWalletButton } from "./WalletModal";
import { Close, Help, Menu, Search, Shield, Wallet } from "./icons";

const AUDIENCES = ["Individuals", "Institutions", "Partners"];
const NAV = ["Baskets", "Vaults", "Invest", "Research", "Fees", "Security", "Learn"];

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
        {/* Utility row */}
        <div className="flex h-[68px] items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            <a href="#top" aria-label="Harbor home">
              <Logo />
            </a>
            <nav aria-label="Audience" className="hidden items-center gap-5 text-sm text-muted lg:flex">
              {AUDIENCES.map((a, i) => (
                <a
                  key={a}
                  href="#"
                  aria-current={i === 0 ? "page" : undefined}
                  className={
                    i === 0
                      ? "border-b border-navy-900 pb-0.5 text-navy-900"
                      : "pb-0.5 transition-colors hover:text-navy-900"
                  }
                >
                  {a}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted md:inline">EN</span>
            <a
              href="#"
              className="hidden items-center gap-2 border border-line px-3 py-1.5 text-sm text-navy-900 transition-colors hover:border-navy-900 md:inline-flex"
            >
              <Shield /> Security
            </a>
            <a
              href="#faq"
              className="hidden items-center gap-2 border border-line px-3 py-1.5 text-sm text-navy-900 transition-colors hover:border-navy-900 md:inline-flex"
            >
              <Help /> Help and contact
            </a>
            <ConnectWalletButton className="inline-flex items-center gap-2 bg-accent px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-600">
              <Wallet /> <span className="hidden sm:inline">Connect wallet</span>
              <span className="sm:hidden">Connect</span>
            </ConnectWalletButton>
            <button
              type="button"
              className="-mr-2 p-2 text-navy-900 lg:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <Close className="h-6 w-6" /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Main nav row */}
        <div className="hidden h-12 items-end justify-between lg:flex">
          <nav aria-label="Main" className="flex gap-9 text-[0.95rem] text-ink">
            {NAV.map((item) => {
              const active = item === "Invest";
              return (
                <a
                  key={item}
                  href="#"
                  aria-current={active ? "page" : undefined}
                  className={`border-b-2 pb-3 transition-colors ${
                    active ? "border-accent text-navy-900" : "border-transparent hover:text-accent"
                  }`}
                >
                  {item}
                </a>
              );
            })}
          </nav>
          <button type="button" aria-label="Search" className="pb-3 text-navy-900 hover:text-accent">
            <Search className="h-6 w-6" />
          </button>
        </div>
      </Container>

      {mobileOpen && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-line bg-white lg:hidden">
          <Container className="py-4">
            <ul className="divide-y divide-line">
              {NAV.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    onClick={() => setMobileOpen(false)}
                    className={`block py-3 ${item === "Invest" ? "font-semibold text-accent" : "text-navy-900"}`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex gap-3 text-sm">
              <a href="#" className="inline-flex items-center gap-2 border border-line px-3 py-1.5 text-navy-900">
                <Shield /> Security
              </a>
              <a
                href="#faq"
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
