"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Close } from "./icons";

type WalletModalContextValue = { open: () => void };

const WalletModalContext = createContext<WalletModalContextValue | null>(null);

export function useWalletModal() {
  const ctx = useContext(WalletModalContext);
  if (!ctx) throw new Error("useWalletModal must be used inside WalletModalProvider");
  return ctx;
}

const WALLETS = [
  { name: "MetaMask", hint: "Browser extension", color: "#E2761B" },
  { name: "Rabby", hint: "Browser extension", color: "#7084FF" },
  { name: "Coinbase Wallet", hint: "Mobile & extension", color: "#0052FF" },
  { name: "WalletConnect", hint: "Scan with any mobile wallet", color: "#3B99FC" },
];

export function WalletModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  return (
    <WalletModalContext.Provider value={{ open }}>
      {children}
      <dialog
        ref={dialogRef}
        onClose={close}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        aria-labelledby="wallet-modal-title"
        className="m-auto w-[min(92vw,440px)] bg-white p-0 text-ink shadow-2xl backdrop:bg-navy-950/50 backdrop:backdrop-blur-[2px]"
      >
        <div className="flex items-start justify-between border-b border-line px-7 py-6">
          <div>
            <h2 id="wallet-modal-title" className="text-xl font-normal text-navy-900">
              Open your Harbor account
            </h2>
            <p className="mt-1 text-sm text-muted">
              Start by connecting a self-custody wallet. Harbor never takes custody of your keys.
            </p>
          </div>
          <button onClick={close} className="-mr-2 p-2 text-muted hover:text-navy-900" aria-label="Close">
            <Close />
          </button>
        </div>
        <ul className="px-4 py-3">
          {WALLETS.map((w) => (
            <li key={w.name}>
              <button
                type="button"
                className="flex w-full items-center gap-4 px-3 py-3.5 text-left transition-colors hover:bg-mist"
              >
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center text-sm font-bold text-white"
                  style={{ backgroundColor: w.color }}
                  aria-hidden
                >
                  {w.name[0]}
                </span>
                <span className="flex-1">
                  <span className="block font-medium text-navy-900">{w.name}</span>
                  <span className="block text-sm text-muted">{w.hint}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
        <p className="border-t border-line bg-mist px-7 py-4 text-xs leading-relaxed text-muted">
          Preview only — account opening is not live on this page. By continuing you agree to the Harbor Terms
          and acknowledge the risks of investing on Hyperliquid.
        </p>
      </dialog>
    </WalletModalContext.Provider>
  );
}

export function OpenAccountButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { open } = useWalletModal();
  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}
