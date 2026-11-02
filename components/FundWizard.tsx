"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import type { Fund } from "@/lib/funds";
import {
  LABEL_TEXT,
  STRUCTURE_COLORS,
  TOPICS,
  fundsForTopic,
  labelFor,
  managementOf,
  simpleSuggestions,
  sortByRelevance,
  structureOf,
  type Label,
  type Management,
} from "@/lib/fundSelection";
import { ChevronRight, Close } from "./icons";

const SECTIONS = ["Fund management", "Selection mode", "Topic selection", "Fund selection"];

/* ---------- small building blocks ---------- */

function Radio({ checked }: { checked: boolean }) {
  return (
    <span
      aria-hidden
      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${checked ? "border-accent" : "border-[#9aa0a6]"}`}
    >
      {checked && <span className="h-3.5 w-3.5 rounded-full bg-accent" />}
    </span>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2.5 text-[0.95rem] text-ink">
      {items.map((b) => (
        <li key={b} className="flex gap-3">
          <span aria-hidden className="mt-[0.55em] h-1.5 w-1.5 shrink-0 bg-accent" />
          {b}
        </li>
      ))}
    </ul>
  );
}

function ChoiceCard({
  title,
  subtitle,
  intro,
  bullets,
  checked,
  onSelect,
  name,
}: {
  title: string;
  subtitle?: string;
  intro?: string;
  bullets: string[];
  checked: boolean;
  onSelect: () => void;
  name: string;
}) {
  return (
    <label
      className={`block cursor-pointer bg-white px-6 py-6 transition-shadow has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent ${
        checked ? "shadow-[inset_0_0_0_2px_var(--color-accent)]" : ""
      }`}
    >
      <input type="radio" name={name} checked={checked} onChange={onSelect} className="sr-only" />
      <span className="flex items-start justify-between gap-4">
        <span className="text-[1.2rem] text-navy-900">{title}</span>
        <Radio checked={checked} />
      </span>
      {subtitle && <span className="mt-1 block text-sm text-ink">{subtitle}</span>}
      {intro && <span className="mt-3 block text-[0.95rem] leading-relaxed text-ink">{intro}</span>}
      <Bullets items={bullets} />
    </label>
  );
}

function InfoBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 flex items-center gap-3 bg-white px-4 py-3 text-sm text-ink">
      <span aria-hidden className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold italic text-white">
        i
      </span>
      {children}
    </div>
  );
}

function RiskDashes({ risk, ok }: { risk: number; ok: boolean }) {
  return (
    <span className="flex items-center gap-2" aria-label={`Risk class ${risk} of 7${ok ? ", matches your profile" : ", above your profile"}`}>
      {ok ? (
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-accent" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
          <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <Close className="h-3.5 w-3.5 text-muted" />
      )}
      <span className="flex gap-1">
        {Array.from({ length: 7 }, (_, i) => (
          <span key={i} className={`h-[3px] w-2.5 ${i < risk ? (ok ? "bg-accent" : "bg-navy-900") : "bg-[#c9c9c9]"}`} />
        ))}
      </span>
    </span>
  );
}

const LABEL_STYLE: Record<Label, string> = {
  "Perfect fit": "bg-accent-50 text-accent-600",
  Recommended: "bg-accent-50 text-accent-600",
  "Not actively managed": "bg-mist text-ink",
  "Not passively managed": "bg-mist text-ink",
  "Not recommended": "bg-[#fbe7e7] text-[#9b1c1c]",
};

function Tag({ label }: { label: Label }) {
  return <span className={`inline-block px-2 py-1 text-xs font-semibold ${LABEL_STYLE[label]}`}>{label}</span>;
}

const BANNER: Record<string, string> = {
  "Multi-asset": "linear-gradient(120deg,#0b1f3a,#1e3a5f 55%,#3d6a83)",
  "Crypto core": "linear-gradient(120deg,#0e7f86,#12294a)",
  Equity: "linear-gradient(120deg,#1e3a5f,#5b7a99)",
  Commodities: "linear-gradient(120deg,#8a6d1f,#c9a227 60%,#1e3a5f)",
  Yield: "linear-gradient(120deg,#3fb3ba,#0b6b71)",
  Satellite: "linear-gradient(120deg,#12294a,#7a3fb3)",
};

function MiniBoat() {
  return (
    <svg viewBox="0 0 60 54" className="h-12 w-14 shrink-0" fill="none" aria-hidden>
      <g stroke="var(--color-navy-900)" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
        <path d="M30 4v38M30 8L8 40h22z" />
        <path d="M6 42h46l-6 7H12z" />
        <path d="M4 52c5-3 9 3 14 0s9 3 14 0 9 3 14 0" />
      </g>
      <path d="M30 14l16 24H30z" fill="var(--color-accent)" />
    </svg>
  );
}

/* ---------- fund card + details drawer ---------- */

function FundCard({
  fund,
  label,
  profileRisk,
  selected,
  onToggle,
  onDetails,
}: {
  fund: Fund;
  label: Label;
  profileRisk: number;
  selected: boolean;
  onToggle: () => void;
  onDetails: () => void;
}) {
  return (
    <article className={`flex flex-col bg-white ${selected ? "shadow-[inset_0_0_0_2px_var(--color-accent)]" : ""}`}>
      <div className="h-24" style={{ background: BANNER[fund.category] ?? BANNER["Multi-asset"] }} aria-hidden />
      <div className="flex flex-1 flex-col px-5 py-5">
        <div>
          <Tag label={label} />
        </div>
        <h3 className="mt-3 text-[1.2rem] text-navy-900">{fund.shortName}</h3>
        <p className="text-xs text-muted">{fund.name}</p>
        <dl className="mt-4 text-[0.8rem]">
          {(
            [
              ["Risk class", <RiskDashes key="r" risk={fund.risk} ok={fund.risk <= profileRisk} />],
              ["Management style", managementOf(fund) === "active" ? "Active" : "Passive"],
              ["Asset class", fund.category],
              ["Holdings", String(fund.holdings.length)],
            ] as const
          ).map(([k, v]) => (
            <div key={k} className="flex items-center justify-between gap-3 border-b border-line py-1.5 last:border-b-0">
              <dt className="text-ink">{k}</dt>
              <dd className="text-ink">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-xs text-muted">Included in your $19 monthly Harbor fee</p>
        <div className="mt-auto pt-5">
          <button
            type="button"
            onClick={onToggle}
            aria-pressed={selected}
            className={`w-full py-2.5 text-sm font-semibold transition-colors ${
              selected ? "bg-accent text-white hover:bg-accent-600" : "bg-navy-900 text-white hover:bg-navy-800"
            }`}
          >
            {selected ? "Selected ✓" : "Select fund"}
          </button>
          <button type="button" onClick={onDetails} className="mt-3 w-full py-1.5 text-sm font-semibold text-navy-900 hover:text-accent">
            Fund details
          </button>
        </div>
      </div>
    </article>
  );
}

function Donut({ parts }: { parts: { label: string; weight: number }[] }) {
  const r = 40;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg viewBox="0 0 100 100" className="h-32 w-32 shrink-0 -rotate-90" aria-hidden>
      {parts.map((p) => {
        const len = (p.weight / 100) * c;
        const el = (
          <circle
            key={p.label}
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke={STRUCTURE_COLORS[p.label]}
            strokeWidth="11"
            strokeDasharray={`${Math.max(len - 0.8, 0)} ${c}`}
            strokeDashoffset={-offset}
          />
        );
        offset += len;
        return el;
      })}
    </svg>
  );
}

function FundDrawer({
  fund,
  onClose,
  selected,
  onToggle,
}: {
  fund: Fund | null;
  onClose: () => void;
  selected: boolean;
  onToggle: () => void;
}) {
  if (!fund) return null;
  const parts = structureOf(fund);
  const holdings = [...fund.holdings].sort((a, b) => b.weight - a.weight).slice(0, 6);
  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={`Fund details: ${fund.shortName}`}>
      <button type="button" aria-label="Close fund details" onClick={onClose} className="absolute inset-0 bg-black/30" />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-[420px] flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-line px-7 py-5">
          <p className="text-lg text-navy-900">Fund details</p>
          <button type="button" onClick={onClose} aria-label="Close" className="-mr-2 p-2 text-navy-900 hover:text-accent">
            <Close className="h-6 w-6" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-7 py-6">
          <h2 className="text-[1.6rem] font-light text-navy-900">{fund.shortName}</h2>
          <p className="mt-2 text-sm text-ink">{fund.name}</p>
          <p className="mt-1 text-xs text-muted">Code: {fund.code}</p>

          <h3 className="mt-7 text-lg text-navy-900">Performance</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            This fund has no performance history yet, so no past returns are shown. Past performance would in any case
            not be a reliable indicator of future results.
          </p>

          <h3 className="mt-7 text-lg text-navy-900">Fund structure</h3>
          <div className="mt-4 flex items-center gap-6">
            <Donut parts={parts} />
            <ul className="flex-1 text-sm">
              {parts.map((p) => (
                <li key={p.label} className="flex items-center justify-between gap-3 border-b border-line py-2 last:border-b-0">
                  <span className="flex items-center gap-2">
                    <span className="h-3 w-3" style={{ background: STRUCTURE_COLORS[p.label] }} /> {p.label}
                  </span>
                  <span className="font-semibold tabular-nums">{p.weight}%</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-4 text-xs text-muted">Target weights. Actual weights drift between rebalancing dates.</p>

          <h3 className="mt-7 text-lg text-navy-900">Largest holdings</h3>
          <ul className="mt-2 text-sm">
            {holdings.map((h) => (
              <li key={h.asset} className="flex justify-between border-b border-line py-2 last:border-b-0">
                <span>{h.asset}</span>
                <span className="tabular-nums">{h.weight}%</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex items-baseline justify-between border-t border-line pt-5">
            <h3 className="text-lg text-navy-900">Costs</h3>
            <p className="font-semibold text-navy-900">$19 per month</p>
          </div>
          <p className="mt-1 text-xs text-muted">
            One flat Harbor fee per account, whatever your balance and however many funds you hold. Hyperliquid trading
            and network costs are passed through at cost.
          </p>
          <Link href={`/funds/${fund.code}`} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent-600">
            Factsheet, prospectus and key information <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="border-t border-line px-7 py-5">
          <button
            type="button"
            onClick={onToggle}
            className={`px-6 py-3 font-semibold text-white ${selected ? "bg-accent hover:bg-accent-600" : "bg-navy-900 hover:bg-navy-800"}`}
          >
            {selected ? "Selected ✓" : "Select fund"}
          </button>
        </div>
      </aside>
    </div>
  );
}

function LabelsExplained({ labels }: { labels: Label[] }) {
  return (
    <div className="mt-8 grid gap-8 bg-white px-6 py-7 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
      <div>
        <h2 className="text-lg text-navy-900">Explanation of the recommendation labels</h2>
        <dl className="mt-4 space-y-3 text-sm">
          {labels.map((l) => (
            <div key={l} className="grid grid-cols-[170px_1fr] items-start gap-4">
              <dt>
                <Tag label={l} />
              </dt>
              <dd className="text-ink">{LABEL_TEXT[l]}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="space-y-6 text-sm">
        <div>
          <h2 className="text-lg text-navy-900">More about performance</h2>
          <p className="mt-2 text-muted">
            Harbor funds are new and have no performance history. Any figures elsewhere on this site are illustrative
            and are not a forecast.
          </p>
        </div>
        <div>
          <h2 className="text-lg text-navy-900">More about fund selection</h2>
          <p className="mt-2 text-muted">
            Suggestions are based on your risk profile and preferences only. They do not take into account your other
            investments and are not personal investment advice.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- wizard ---------- */

export default function FundWizard({ profileLabel, profileRisk }: { profileLabel: string; profileRisk: number }) {
  const router = useRouter();
  const { user } = useUser();
  const [step, setStep] = useState(0); // 0 management, 1 mode, 2 topics, 3 selection
  const [pref, setPref] = useState<Management | null>(null);
  const [mode, setMode] = useState<"simple" | "theme" | null>(null);
  const [topics, setTopics] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [details, setDetails] = useState<Fund | null>(null);
  const [saving, setSaving] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const canNext =
    step === 0 ? pref !== null : step === 1 ? mode !== null : step === 2 ? topics.length > 0 : selected.length > 0;

  function go(n: number) {
    setStep(n);
    window.scrollTo({ top: 0 });
  }

  function toggle(code: string) {
    setSelected((s) => (s.includes(code) ? s.filter((c) => c !== code) : [...s, code]));
  }

  async function next() {
    if (!canNext) return;
    if (step === 1) return go(mode === "simple" ? 3 : 2);
    if (step < 3) return go(step + 1);
    setSaving(true);
    await user
      ?.update({
        unsafeMetadata: { ...user.unsafeMetadata, fundSelection: { management: pref, mode, topics, funds: selected } },
      })
      .catch(() => {});
    setSaving(false);
    router.push("/account");
    router.refresh();
  }

  function back() {
    if (step === 0) return router.push("/account");
    if (step === 3) return go(mode === "simple" ? 1 : 2);
    go(step - 1);
  }

  const p = pref ?? "active";
  const simple = mode === "simple" ? simpleSuggestions(profileRisk, p) : [];
  const shownLabels = new Set<Label>();
  const cardsFor = (funds: Fund[]) =>
    sortByRelevance(funds, profileRisk, p).map((f) => {
      const label = labelFor(f, profileRisk, p);
      shownLabels.add(label);
      return (
        <FundCard
          key={f.code}
          fund={f}
          label={label}
          profileRisk={profileRisk}
          selected={selected.includes(f.code)}
          onToggle={() => toggle(f.code)}
          onDetails={() => setDetails(f)}
        />
      );
    });

  return (
    <div className="flex min-h-[calc(100vh-72px)] flex-col">
      <nav aria-label="Fund selection progress" className="border-b border-line bg-white">
        <ol className="mx-auto grid w-full max-w-[1290px] grid-cols-4 gap-1.5 px-5 sm:px-8">
          {SECTIONS.map((s, i) => (
            <li key={s} aria-current={i === step ? "step" : undefined} className="pt-4">
              <span className={`block truncate pb-3 text-xs sm:text-sm ${i === step ? "text-navy-900" : "text-muted"}`}>{s}</span>
              <span className={`block h-1 ${i === step ? "bg-accent" : i < step ? "bg-[#a9adb2]" : "bg-line"}`} />
            </li>
          ))}
        </ol>
      </nav>

      <div className="flex-1 bg-[#f4f4f4] pb-36">
        <div className="mx-auto w-full max-w-[1290px] px-5 pt-10 sm:px-8 sm:pt-12">
          {step === 0 && (
            <>
              <h1 className="text-[1.9rem] font-light leading-tight text-navy-900 sm:text-[2.6rem]">Which kind of fund do you prefer?</h1>
              <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
                <div>
                  <fieldset className="grid gap-3 sm:grid-cols-2">
                    <legend className="sr-only">Management style</legend>
                    <ChoiceCard
                      name="management"
                      title="Actively managed funds"
                      intro="Harbor selects and weights the holdings, using rules and research, to pursue the fund's objective."
                      bullets={["Potential for additional returns", "Included in your $19 monthly fee"]}
                      checked={pref === "active"}
                      onSelect={() => setPref("active")}
                    />
                    <ChoiceCard
                      name="management"
                      title="Passively managed funds"
                      intro="These funds simply track a single index or asset, such as the S&P 500, bitcoin or gold, without active decisions."
                      bullets={["No additional potential returns", "Included in your $19 monthly fee"]}
                      checked={pref === "passive"}
                      onSelect={() => setPref("passive")}
                    />
                  </fieldset>
                  <InfoBar>We&apos;ll prioritise our recommendations based on your preference.</InfoBar>
                </div>
                <aside className="h-fit bg-white px-7 py-9">
                  <h2 className="text-[1.5rem] font-light leading-snug text-navy-900">Which kind of fund do you prefer?</h2>
                  <button
                    type="button"
                    onClick={() => setShowMore((v) => !v)}
                    aria-expanded={showMore}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-navy-900 hover:text-accent"
                  >
                    More about management styles
                    <ChevronRight className={`h-4 w-4 text-accent transition-transform ${showMore ? "rotate-90" : ""}`} />
                  </button>
                  {showMore && (
                    <p className="mt-4 text-sm leading-relaxed text-muted">
                      Actively managed Harbor funds hold several markets in weights Harbor sets and rebalances, aiming
                      to do better than a simple index. Passively managed funds hold one index or asset and follow it.
                      Every Harbor fund is covered by the same flat $19 monthly fee, so management style does not
                      change what you pay.
                    </p>
                  )}
                </aside>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h1 className="text-[1.9rem] font-light leading-tight text-navy-900 sm:text-[2.6rem]">How do you want to select the funds?</h1>
              <fieldset className="mt-10 grid max-w-[760px] gap-3 sm:grid-cols-2">
                <legend className="sr-only">Selection mode</legend>
                <ChoiceCard
                  name="mode"
                  title="As simple as possible"
                  subtitle="Pick from a short list of suggestions."
                  bullets={["We suggest up to 3 Harbor funds.", "See only funds that match your risk profile.", "Choose as many of them as you like."]}
                  checked={mode === "simple"}
                  onSelect={() => setMode("simple")}
                />
                <ChoiceCard
                  name="mode"
                  title="Theme-based"
                  subtitle="Choose as many funds as you like."
                  bullets={[
                    "We suggest funds based on regions or topics you select, e.g. US equity or crypto.",
                    "See relevant funds with different risk classes.",
                  ]}
                  checked={mode === "theme"}
                  onSelect={() => setMode("theme")}
                />
              </fieldset>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="text-[1.9rem] font-light leading-tight text-navy-900 sm:text-[2.6rem]">Which areas are you interested in?</h1>
              <p className="mt-2 text-muted">Please select at least one topic that you are interested in.</p>
              {(["Regions", "Topics"] as const).map((g) => (
                <section key={g} className="mt-8">
                  <h2 className="text-[1.4rem] font-light text-navy-900">{g}</h2>
                  <div className="mt-4 grid max-w-[900px] gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {TOPICS.filter((t) => t.group === g).map((t) => {
                      const on = topics.includes(t.id);
                      return (
                        <label
                          key={t.id}
                          className={`flex cursor-pointer gap-3 bg-white px-5 py-5 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent ${
                            on ? "shadow-[inset_0_0_0_2px_var(--color-accent)]" : ""
                          }`}
                        >
                          <span className="flex-1">
                            <span className="block text-[1.05rem] text-navy-900">{t.label}</span>
                            <span className="mt-1 block text-xs text-muted">{t.description}</span>
                          </span>
                          <input
                            type="checkbox"
                            checked={on}
                            onChange={() => setTopics((s) => (on ? s.filter((x) => x !== t.id) : [...s, t.id]))}
                            className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--color-accent)]"
                          />
                        </label>
                      );
                    })}
                  </div>
                </section>
              ))}
            </>
          )}

          {step === 3 && (
            <>
              <h1 className="text-[1.9rem] font-light leading-tight text-navy-900 sm:text-[2.6rem]">
                {mode === "simple" ? `These ${simple.length} Harbor funds match your risk profile` : "Funds for your selected topics"}
              </h1>
              <div className="mt-8 flex items-center gap-5 bg-white px-6 py-5">
                <MiniBoat />
                <p className="text-lg text-navy-900">Your risk profile: {profileLabel}</p>
              </div>
              <p className="mt-6 text-sm text-ink">
                Select one or more funds to continue. There is no limit on how many funds you hold.
                {selected.length > 0 && <strong className="ml-2 font-semibold text-accent">{selected.length} selected</strong>}
              </p>
              {mode === "simple" ? (
                <div className="mt-3 grid gap-3 md:grid-cols-3">{cardsFor(simple)}</div>
              ) : (
                TOPICS.filter((t) => topics.includes(t.id)).map((t) => (
                  <section key={t.id} className="mt-8">
                    <h2 className="text-[1.4rem] font-light text-navy-900">{t.label}</h2>
                    <div className="mt-3 grid gap-3 md:grid-cols-3">{cardsFor(fundsForTopic(t.id))}</div>
                  </section>
                ))
              )}
              <p className="mt-4 text-xs text-muted">The funds are sorted by relevance.</p>
              <LabelsExplained labels={(Object.keys(LABEL_TEXT) as Label[]).filter((l) => shownLabels.has(l))} />
            </>
          )}
        </div>
      </div>

      <FundDrawer
        fund={details}
        onClose={() => setDetails(null)}
        selected={details ? selected.includes(details.code) : false}
        onToggle={() => details && toggle(details.code)}
      />

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white shadow-[0_-6px_20px_rgba(0,0,0,0.06)]">
        <div className="mx-auto flex w-full max-w-[1290px] gap-6 px-5 py-6 sm:px-8">
          <button
            type="button"
            onClick={next}
            disabled={!canNext || saving}
            className="inline-flex min-w-[120px] items-center justify-center bg-navy-900 px-8 py-3.5 font-semibold text-white transition-colors hover:bg-navy-800 disabled:cursor-not-allowed disabled:bg-[#e6e6e6] disabled:text-[#a3a3a3]"
          >
            {saving ? "Saving…" : "Next"}
          </button>
          <button
            type="button"
            onClick={back}
            className="inline-flex min-w-[120px] items-center justify-center bg-[#ececec] px-8 py-3.5 font-semibold text-navy-900 transition-colors hover:bg-line"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}


