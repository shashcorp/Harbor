"use client";

import { useEffect, useState } from "react";
import { OpenAccountButton } from "./WalletModal";
import { ChevronRight, Close } from "./icons";
import { btnPrimary } from "./ui";

export default function StickyCta() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero-title")?.closest("section");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  if (dismissed) return null;

  return (
    <div
      aria-hidden={!visible}
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-30 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div
        className={`mx-auto max-w-[1100px] bg-mist px-5 py-3 sm:px-10 sm:py-6 ${
          visible ? "shadow-[0_-8px_30px_rgba(11,31,58,0.12)]" : ""
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <OpenAccountButton className={btnPrimary}>
              Open account <ChevronRight />
            </OpenAccountButton>
            <span className="hidden text-sm text-muted md:inline">$19/month · First month 50% off · Cancel any time</span>
          </div>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss"
            className="p-2 text-muted hover:text-navy-900"
          >
            <Close />
          </button>
        </div>
      </div>
    </div>
  );
}
