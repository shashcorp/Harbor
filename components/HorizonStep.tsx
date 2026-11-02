"use client";

import { useId, useState } from "react";
import { HORIZON_MAX, HORIZON_MIN } from "@/lib/riskProfile";
import { SimulationButton, SimulationModal } from "./ToleranceStep";

function Binoculars() {
  return (
    <svg viewBox="0 0 160 150" className="mx-auto h-40 w-44" fill="none" aria-hidden>
      <g stroke="var(--color-navy-900)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 132h120" />
        <path d="M44 132l14-42M116 132l-14-42" />
        <rect x="40" y="36" width="34" height="54" rx="6" />
        <rect x="86" y="36" width="34" height="54" rx="6" />
        <path d="M74 52h12M74 70h12" />
        <path d="M48 36V24h18v12M94 36V24h18v12" />
      </g>
      <circle cx="57" cy="76" r="9" fill="var(--color-accent)" />
      <circle cx="103" cy="76" r="9" fill="var(--color-accent)" />
      <path d="M128 18l8-8M134 28h10M122 10V0" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function HorizonStep({ years, onChange }: { years: number; onChange: (y: number) => void }) {
  const [showSim, setShowSim] = useState(false);
  const id = useId();
  const ticks = Array.from({ length: HORIZON_MAX - HORIZON_MIN + 1 }, (_, i) => HORIZON_MIN + i);
  const pct = ((years - HORIZON_MIN) / (HORIZON_MAX - HORIZON_MIN)) * 100;

  return (
    <>
      <h1 className="text-[1.9rem] font-light leading-tight tracking-[-0.01em] text-navy-900 sm:text-[2.6rem]">
        How long should the money be invested for?
      </h1>
      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,720px)_1fr_340px]">
        <div className="h-fit bg-white px-6 py-8 sm:px-7">
          <h2 className="text-[1.15rem] text-navy-900">Choose the investment horizon that&apos;s best for you</h2>

          <label htmlFor={id} className="mt-6 block text-muted">
            Holding period:{" "}
            <span className="text-navy-900">
              {years} {years === 1 ? "year" : "years"}
            </span>
          </label>
          <div className="relative mt-3">
            <input
              id={id}
              type="range"
              min={HORIZON_MIN}
              max={HORIZON_MAX}
              step={1}
              value={years}
              onChange={(e) => onChange(Number(e.target.value))}
              className="harbor-range w-full"
              style={{ background: `linear-gradient(to right, var(--color-navy-900) ${pct}%, #d4d4d4 ${pct}%)` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-xs text-muted">
            {ticks.map((t) => (
              <span key={t}>
                {t} {t === 1 ? "year" : "years"}
              </span>
            ))}
          </div>

          <h3 className="mt-8 text-[1.05rem] text-navy-900">What are the effects of a longer or shorter investment horizon?</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Short-term investments typically offer lower returns, but their value fluctuates less. Long-term
            investments allow for higher potential returns, but their value fluctuates more along the way.
          </p>

          <p className="mt-6 text-sm text-muted">Influence of holding period on return</p>
          <SimulationButton onClick={() => setShowSim(true)} />
        </div>

        <div className="hidden lg:block" />

        <aside className="h-fit bg-white px-7 py-10">
          <Binoculars />
          <h2 className="mt-6 text-[1.6rem] font-light leading-snug text-navy-900">
            To define the holding period, consider when you will need the invested money again.
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-muted">
            Markets are unpredictable in the short term. Over longer periods they have historically tended to rise,
            although this is not guaranteed.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            If you plan to invest the money for a short period, consider lower-risk funds, as their value fluctuates
            less.
          </p>
        </aside>
      </div>
      <SimulationModal open={showSim} onClose={() => setShowSim(false)} years={years} />
    </>
  );
}
