"use client";

import { useId, useState } from "react";
import { TOLERANCE_LEVELS } from "@/lib/riskProfile";
import InvestmentSimulator from "./InvestmentSimulator";
import Modal from "./Modal";
import { ChevronRight } from "./icons";

function MapArt() {
  return (
    <svg viewBox="0 0 200 120" className="mx-auto h-32 w-52" fill="none" aria-hidden>
      <g stroke="var(--color-navy-900)" strokeWidth="1.8" strokeLinejoin="round">
        <path d="M20 22l40 14 40-20 40 18 40-14-14 70-40 14-40-18-40 20-40-14z" />
        <path d="M60 36l-10 68M100 16l-6 70M140 34l-8 70" />
      </g>
      <path
        d="M24 46c22 4 26 30 48 26s14-30 34-28 10 26 30 22 18-28 36-32"
        stroke="var(--color-accent)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path d="M164 24l14 8-14 10z" fill="var(--color-accent)" />
      <path d="M154 100l26 6-8-16z" fill="var(--color-navy-900)" />
    </svg>
  );
}

export function SimulationButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-2 inline-flex items-center gap-3 bg-[#ececec] px-4 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:bg-line"
    >
      <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <path d="M3 5h14M3 10h14M3 15h14" strokeLinecap="round" />
        <circle cx="7" cy="5" r="1.6" fill="#fff" />
        <circle cx="13" cy="10" r="1.6" fill="#fff" />
        <circle cx="9" cy="15" r="1.6" fill="#fff" />
      </svg>
      Simulation
    </button>
  );
}

export function SimulationModal({
  open,
  onClose,
  years,
  risk,
  riskSlider,
}: {
  open: boolean;
  onClose: () => void;
  years: number;
  risk?: number;
  riskSlider?: boolean;
}) {
  return (
    <Modal open={open} onClose={onClose} title="Simulation" wide>
      <h2 className="border-t border-line pt-6 text-[1.9rem] font-light text-navy-900">How your investment could develop</h2>
      <div className="mt-3">
        {/* key forces fresh slider state each time the modal opens */}
        {open && <InvestmentSimulator initialYears={years} riskSlider={riskSlider} initialRisk={risk} fixedRate={0.075} />}
      </div>
      <button
        type="button"
        onClick={onClose}
        className="mt-6 inline-flex min-w-[100px] items-center justify-center bg-navy-900 px-6 py-3 font-semibold text-white hover:bg-navy-800"
      >
        Done
      </button>
    </Modal>
  );
}

const pct = (n: number, d = 2) => `${(n * 100).toFixed(d)}%`;

export default function ToleranceStep({
  level,
  years,
  onChange,
}: {
  level: number;
  years: number;
  onChange: (l: number) => void;
}) {
  const [sim, setSim] = useState(false);
  const [drawdownOpen, setDrawdownOpen] = useState(false);
  const id = useId();
  const t = TOLERANCE_LEVELS[level];
  const fill = (level / (TOLERANCE_LEVELS.length - 1)) * 100;

  const facts: [string, string][] = [
    ["Expected annual return", `+${pct(t.rate)}`],
    ["Recommended holding period", `${t.holding} ${t.holding === 1 ? "year" : "years"}`],
    ["Expected annual volatility", pct(t.vol, 1)],
    ["Possible fall in a severe market (estimate)", pct(t.fall)],
  ];

  return (
    <>
      <h1 className="text-[1.9rem] font-light leading-tight tracking-[-0.01em] text-navy-900 sm:text-[2.6rem]">
        How much risk are you willing to take?
      </h1>
      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,720px)_1fr_340px]">
        <div className="h-fit bg-white px-6 py-8 sm:px-7">
          <h2 className="text-[1.15rem] text-navy-900">Choose the risk tolerance that fits you best</h2>
          <label htmlFor={id} className="mt-6 block text-muted">
            Risk tolerance: <strong className="font-semibold text-navy-900">{t.label}</strong>
          </label>
          <p className="mt-3 text-sm text-ink">{t.hint}</p>
          <input
            id={id}
            type="range"
            min={0}
            max={TOLERANCE_LEVELS.length - 1}
            step={1}
            value={level}
            onChange={(e) => onChange(Number(e.target.value))}
            className="harbor-range mt-5 w-full"
            style={{ background: `linear-gradient(to right, var(--color-navy-900) ${fill}%, #d4d4d4 ${fill}%)` }}
          />
          <div className="mt-2 flex justify-between gap-2 text-xs text-muted">
            {TOLERANCE_LEVELS.map((l) => (
              <span key={l.label} className="text-center">
                {l.label}
              </span>
            ))}
          </div>

          <h3 className="mt-8 text-[1.05rem] text-navy-900">What impact does risk tolerance have?</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            The risk tolerance you choose affects your chances of a higher return. A lower level means smaller
            fluctuations in value but lower return prospects. A higher level means larger fluctuations in value but
            higher return prospects.
          </p>

          <h3 className="mt-8 text-[1.05rem] text-navy-900">Key facts of a {t.label.toLowerCase()} risk tolerance</h3>
          <dl className="mt-3 max-w-[500px] text-sm">
            {facts.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-6 border-b border-line py-3.5 last:border-b-0">
                <dt className="text-muted">{k}</dt>
                <dd className="tabular-nums text-navy-900">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-2 text-xs text-muted">Illustrative assumptions, not a forecast. Holding periods are capped at 5 years.</p>

          <p className="mt-6 text-sm text-muted">Influence of holding period on return</p>
          <SimulationButton onClick={() => setSim(true)} />
        </div>

        <div className="hidden lg:block" />

        <aside className="h-fit bg-white px-7 py-10">
          <MapArt />
          <h2 className="mt-8 text-[1.6rem] font-light leading-snug text-navy-900">What is a drawdown?</h2>
          <button
            type="button"
            onClick={() => setDrawdownOpen((v) => !v)}
            aria-expanded={drawdownOpen}
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-navy-900 hover:text-accent"
          >
            Explained in a nutshell
            <ChevronRight className={`h-4 w-4 text-accent transition-transform ${drawdownOpen ? "rotate-90" : ""}`} />
          </button>
          {drawdownOpen && (
            <p className="mt-4 text-sm leading-relaxed text-muted">
              A drawdown is the fall in value from a peak to the lowest point that follows, before the value recovers.
              For example, if your investment grows to $10,000 and then drops to $7,000, the drawdown is 30%. Harbor
              funds are new, so these figures are estimates of how far a portfolio at this risk level could fall in a
              severe market, not historical results.
            </p>
          )}
        </aside>
      </div>

      <SimulationModal open={sim} onClose={() => setSim(false)} years={years} risk={level} riskSlider />
    </>
  );
}
