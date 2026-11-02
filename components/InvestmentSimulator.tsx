"use client";

import { useId, useMemo, useState } from "react";
import { simulate } from "@/lib/simulate";
import { TOLERANCE_LEVELS, TOLERANCE_DEFAULT } from "@/lib/riskProfile";

const MAX_YEARS = 5;

export const SCENARIOS = [
  { key: "cautious", label: "Cautious", rate: 0.05 },
  { key: "balanced", label: "Balanced", rate: 0.075 },
  { key: "growth", label: "Growth", rate: 0.1 },
] as const;

const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
const pctText = (r: number) => `${(r * 100).toFixed(1)}%`;

function Slider({
  label,
  display,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  display: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
}) {
  const id = useId();
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <label htmlFor={id} className="flex justify-between text-[0.95rem] text-ink">
        <span>{label}</span>
        <span>{display}</span>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="harbor-range mt-3 w-full"
        style={{ background: `linear-gradient(to right, var(--color-navy-900) ${pct}%, #d4d4d4 ${pct}%)` }}
      />
    </div>
  );
}

function niceMax(v: number) {
  const steps = [5_000, 10_000, 15_000, 20_000, 30_000, 50_000, 75_000, 100_000, 150_000, 200_000, 300_000, 500_000];
  return steps.find((s) => s >= v) ?? Math.ceil(v / 100_000) * 100_000;
}
const kfmt = (n: number) => (n >= 1000 ? `${n / 1000}k` : String(n));

/** Stacked area chart: first payment, further payments, fund performance. */
function Chart({ points }: { points: ReturnType<typeof simulate> }) {
  const W = 360;
  const H = 170;
  const L = 44;
  const B = 24;
  const years = points[points.length - 1].year;
  const top = niceMax(Math.max(...points.map((p) => Math.max(p.value, p.first + p.payments))) * 1.05);
  const x = (y: number) => L + (y / years) * (W - L - 6);
  const y = (v: number) => H - B - (v / top) * (H - B - 8);

  const line = (f: (p: (typeof points)[number]) => number) => points.map((p) => `${x(p.year)},${y(f(p))}`).join(" ");
  const area = (upper: (p: (typeof points)[number]) => number, lower: (p: (typeof points)[number]) => number) =>
    `${line(upper)} ${[...points].reverse().map((p) => `${x(p.year)},${y(lower(p))}`).join(" ")}`;

  const deposits = (p: (typeof points)[number]) => p.first + p.payments;
  const total = (p: (typeof points)[number]) => Math.max(p.value, deposits(p));
  const yTicks = [0, top / 3, (2 * top) / 3, top].map((v) => Math.round(v));
  const xTicks = Array.from({ length: years + 1 }, (_, i) => i).filter((i) => years <= 3 || i % 2 === 0 || i === years);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Chart of how the investment could develop">
      {yTicks.map((t) => (
        <g key={t}>
          <line x1={L} x2={W - 6} y1={y(t)} y2={y(t)} stroke="var(--color-line)" strokeWidth="0.6" />
          <text x={L - 8} y={y(t) + 4} textAnchor="end" fontSize="10" fill="var(--color-muted)">
            {kfmt(t)}
          </text>
        </g>
      ))}
      <polygon points={area(total, deposits)} fill="var(--color-accent)" />
      <polygon points={area(deposits, (p) => p.first)} fill="#c9d0d6" />
      <polygon points={area((p) => p.first, () => 0)} fill="#7d8792" />
      <polyline points={line(total)} fill="none" stroke="var(--color-navy-900)" strokeWidth="1.2" />
      {xTicks.map((t) => (
        <text key={t} x={x(t)} y={H - 6} textAnchor="middle" fontSize="10" fill="var(--color-muted)">
          {t}y
        </text>
      ))}
    </svg>
  );
}

export default function InvestmentSimulator({
  initialYears = MAX_YEARS,
  fixedRate,
  showScenarios = false,
  riskSlider = false,
  initialRisk = TOLERANCE_DEFAULT,
  deductFee = false,
}: {
  initialYears?: number;
  /** Assumed annual performance when neither scenarios nor the risk slider are shown. */
  fixedRate?: number;
  showScenarios?: boolean;
  /** Show a risk tolerance slider; performance follows the selected level. */
  riskSlider?: boolean;
  initialRisk?: number;
  deductFee?: boolean;
}) {
  const [risk, setRisk] = useState(initialRisk);
  const [years, setYears] = useState(Math.min(Math.max(initialYears, 1), MAX_YEARS));
  const [first, setFirst] = useState(5_000);
  const [yearly, setYearly] = useState(1_000);
  const [scenario, setScenario] = useState<(typeof SCENARIOS)[number]["key"]>("balanced");
  const rate = riskSlider
    ? TOLERANCE_LEVELS[risk].rate
    : showScenarios
      ? SCENARIOS.find((s) => s.key === scenario)!.rate
      : (fixedRate ?? 0.075);

  const points = useMemo(
    () => simulate({ years, first, yearly, annualRate: rate, deductFee }),
    [years, first, yearly, rate, deductFee],
  );
  const end = points[points.length - 1];
  const deposited = end.first + end.payments;

  return (
    <div>
      <p className="text-sm text-ink">Adjust the sliders to try out different scenarios</p>
      <div className="mt-6 grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
        <div>
          <p className="text-xs text-muted">Potential outcome{deductFee ? " after Harbor fees" : ""}</p>
          <p className="text-[1.6rem] font-normal text-navy-900" aria-live="polite">
            {usd(end.value)}
          </p>
          <div className="mt-3">
            <Chart points={points} />
          </div>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-xs text-ink">
            <li className="flex items-center gap-2">
              <span className="h-2.5 w-5 bg-accent" /> Fund performance
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2.5 w-5 bg-[#c9d0d6]" /> Yearly payments
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2.5 w-5 bg-[#7d8792]" /> First payment
            </li>
          </ul>
        </div>
        <div className="space-y-7">
          {riskSlider && (
            <div>
              <Slider
                label="Risk tolerance"
                display={TOLERANCE_LEVELS[risk].label}
                value={risk}
                min={0}
                max={TOLERANCE_LEVELS.length - 1}
                step={1}
                onChange={setRisk}
              />
              <div className="mt-1.5 flex justify-between text-xs text-muted">
                <span>Very low</span>
                <span>High</span>
              </div>
            </div>
          )}
          <Slider
            label="Holding period"
            display={`${years} ${years === 1 ? "year" : "years"}`}
            value={years}
            min={1}
            max={MAX_YEARS}
            step={1}
            onChange={setYears}
          />
          <Slider label="First payment" display={usd(first)} value={first} min={0} max={50_000} step={500} onChange={setFirst} />
          <Slider
            label="Yearly payment"
            display={usd(yearly)}
            value={yearly}
            min={0}
            max={20_000}
            step={500}
            onChange={setYearly}
          />
          {showScenarios && (
            <fieldset>
              <legend className="text-[0.95rem] text-ink">Market scenario</legend>
              <div className="mt-3 grid grid-cols-3 border border-line">
                {SCENARIOS.map((s) => (
                  <label
                    key={s.key}
                    className={`cursor-pointer py-2 text-center text-sm transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent ${
                      scenario === s.key ? "bg-navy-900 text-white" : "bg-white text-navy-900 hover:bg-mist"
                    }`}
                  >
                    <input
                      type="radio"
                      name="sim-scenario"
                      value={s.key}
                      checked={scenario === s.key}
                      onChange={() => setScenario(s.key)}
                      className="sr-only"
                    />
                    {s.label}
                  </label>
                ))}
              </div>
            </fieldset>
          )}
        </div>
      </div>
      <p className="mt-6 text-xs text-ink">
        For the simulation, we assume an annual performance of {pctText(rate)}. Total paid in: {usd(deposited)}.
        {deductFee && " Results are after the $19 monthly Harbor fee, with 50% off the first month."}
      </p>
      <p className="mt-2 text-xs leading-relaxed text-muted">
        Note: this calculator only helps you understand how holding period, payments and performance relate to each
        other. It is an illustration and cannot be used to forecast markets, returns or risk. Hyperliquid trading and
        network costs and inflation are not included.
      </p>
    </div>
  );
}
