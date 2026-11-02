"use client";

import { useEffect, useRef } from "react";
import { Close } from "./icons";

/** Native <dialog> modal with a close button; closes on Escape and backdrop click. */
export default function Modal({
  open,
  onClose,
  title,
  children,
  wide = false,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-label={title}
      className={`m-auto w-[min(94vw,${wide ? "780px" : "640px"})] max-h-[92vh] bg-white p-0 text-ink shadow-2xl backdrop:bg-black/40`}
      style={{ width: `min(94vw, ${wide ? 780 : 640}px)` }}
    >
      <div className="flex items-center justify-between gap-4 px-6 pt-6 sm:px-8">
        {title ? <p className="text-lg text-navy-900">{title}</p> : <span />}
        <button type="button" onClick={onClose} aria-label="Close" className="-mr-2 p-2 text-navy-900 hover:text-accent">
          <Close className="h-6 w-6" />
        </button>
      </div>
      <div className="px-6 pb-8 pt-2 sm:px-8">{children}</div>
    </dialog>
  );
}
