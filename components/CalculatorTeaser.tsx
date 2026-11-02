"use client";

import { useId, useMemo, useState } from "react";
import Container from "./Container";
import SectionHeading from "./SectionHeading";

const MONTHLY_FEE = 19;
const FIRST_MONTH_FEE = MONTHLY_FEE / 2;
const MAX_YEARS = 5;
const SCENARIOS = {
  cautious: { label: "Cautious", rate: 0.05 },
  balanced: { label: "Balanced", rate: 0.075 },
  growth: { label: "Growth", rate: 0.1 },
} as const;
type ScenarioKey = keyof typeof SCENARIOS;

const fmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function project(initial: number, years: number, annualRate: number) {
  const r = annualRate / 12;
  let value = initial;
  for (let m = 0; m < years * 12; m++) {
    const fee = m === 0 ? FIRST_MONTH_FEE : MONTHLY_FEE;
    value = Math.max(0, value * (1 + r) - fee);
  }
  return value;
}

function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  step,
  prefix,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="flex justify-between text-sm text-muted">
        <span>{label}</span>
        <span className="font-semibold text-navy-900">
          {prefix}
          {value.toLocaleString("en-US")}
        </span>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-[var(--color-accent)]"
      />
    </div>
  );
}

export default function CalculatorTeaser() {
  const [initial, setInitial] = useState(10000);
  const [years, setYears] = useState(MAX_YEARS);
  const [scenario, setScenario] = useState<ScenarioKey>("balanced");

  const total = useMemo(
    () => project(initial, years, SCENARIOS[scenario].rate),
    [initial, years, scenario],
  );

  return (
    <section aria-labelledby="calc-title" className="pb-20 sm:pb-24">
      <Container>
        <div className="grid gap-12 bg-mist px-6 py-12 sm:px-12 lg:grid-cols-2 lg:gap-16 lg:py-16">
          <div>
            <SectionHeading id="calc-title">What could your investment be worth?</SectionHeading>
            <p className="text-lg leading-relaxed text-ink">
              Try different amounts, time horizons and market scenarios to see how your investment could grow
              over time.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              Results are shown after the $19 monthly Harbor fee, with 50% off your first month. Hyperliquid
              trading and network costs are not included.
            </p>
          </div>

          <div className="bg-white p-6 shadow-[0_1px_0_var(--color-line)] sm:p-8">
            <div className="space-y-6">
              <NumberField label="Investment amount" prefix="$" value={initial} onChange={setInitial} min={1000} max={100000} step={1000} />
              <NumberField label="Investment horizon (years)" value={years} onChange={setYears} min={1} max={MAX_YEARS} step={1} />
              <fieldset>
                <legend className="text-sm text-muted">Market scenario</legend>
                <div className="mt-2 grid grid-cols-3 border border-line">
                  {(Object.keys(SCENARIOS) as ScenarioKey[]).map((key) => (
                    <label
                      key={key}
                      className={`cursor-pointer py-2 text-center text-sm transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent ${
                        scenario === key ? "bg-navy-900 text-white" : "text-navy-900 hover:bg-mist"
                      }`}
                    >
                      <input
                        type="radio"
                        name="scenario"
                        value={key}
                        checked={scenario === key}
                        onChange={() => setScenario(key)}
                        className="sr-only"
                      />
                      {SCENARIOS[key].label}
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>

            <div className="mt-8 border-t border-line pt-6" aria-live="polite">
              <p className="text-sm text-muted">Estimated value after {years} {years === 1 ? "year" : "years"}</p>
              <p className="mt-1 text-[2.25rem] font-light text-navy-900">{fmt.format(total)}</p>
              <p className="text-sm text-muted">
                Invested: <span className="text-ink">{fmt.format(initial)}</span> · Assumed return{" "}
                {SCENARIOS[scenario].rate * 100}% p.a.
              </p>
            </div>
            <p className="mt-6 text-xs leading-relaxed text-muted">
              Illustrative only. Not a forecast or guarantee of future returns. The value of investments can fall
              as well as rise, and you may get back less than you invest.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
