"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import type { Fund } from "@/lib/funds";
import Modal from "./Modal";
import { ChevronDown, ChevronRight, Document } from "./icons";

const SECTIONS = ["Review", "Documents", "Payment method"];

function CostArt() {
  return (
    <svg viewBox="0 0 160 130" className="mx-auto h-32 w-40" fill="none" aria-hidden>
      <g stroke="var(--color-navy-900)" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
        <path d="M30 20l60-12 14 66-60 12z" />
        <path d="M42 34l40-8M44 46l40-8M46 58l28-6" />
        <rect x="88" y="40" width="50" height="70" rx="4" />
        <rect x="96" y="48" width="34" height="14" rx="2" />
        <path d="M100 74h6M112 74h6M124 74h6M100 86h6M112 86h6" />
        <circle cx="54" cy="96" r="18" />
        <path d="M54 82v6M46 92c2-6 14-6 16 0" />
      </g>
      <rect x="118" y="94" width="14" height="8" fill="var(--color-accent)" />
      <path d="M46 116h16l-2 8H48z" fill="var(--color-navy-900)" />
    </svg>
  );
}

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-4 text-left text-navy-900"
      >
        <span className="flex items-center gap-4">
          <span aria-hidden className="flex h-5 w-5 items-center justify-center rounded-full border border-navy-900 text-[0.65rem] font-bold">
            i
          </span>
          {title}
        </span>
        <ChevronDown className={`h-5 w-5 text-muted transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="pb-5 pl-9 text-sm leading-relaxed text-muted">{children}</div>}
    </div>
  );
}

function CostModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} title="Cost calculation">
      <div className="border-t border-line pt-5">
        <h2 className="text-[1.6rem] font-light text-navy-900">What are the costs for Harbor Invest?</h2>
        <p className="mt-2 text-sm text-ink">The price for investing with Harbor Invest is made of a single component:</p>

        <h3 className="mt-6 text-navy-900">Monthly fee</h3>
        <p className="mt-2 text-sm text-ink">
          A flat fee of $19 per month per account, whatever your balance and however many funds you hold, with 50% off
          your first month. It covers:
        </p>
        <ul className="mt-3 space-y-2 text-sm text-ink">
          {[
            "Your on-chain account, linked to your own wallet",
            "Buying, selling and rebalancing fund positions",
            "Fund research, risk monitoring and reporting",
          ].map((b) => (
            <li key={b} className="flex gap-3">
              <span aria-hidden className="mt-[0.55em] h-1.5 w-1.5 shrink-0 bg-accent" />
              {b}
            </li>
          ))}
        </ul>

        <h3 className="mt-6 text-navy-900">No costs per fund</h3>
        <p className="mt-2 text-sm text-ink">
          There is no separate management fee, entry, exit or performance fee on any Harbor fund.
        </p>

        <h2 className="mt-7 text-[1.35rem] font-light text-navy-900">Example for Harbor Invest with two funds</h2>
        <p className="mt-2 text-sm text-ink">
          Monthly fee $19
          <br />+ Fund costs for Fund 1: $0
          <br />+ Fund costs for Fund 2: $0
          <br />
          <strong className="font-semibold">= $19 per month</strong>
        </p>

        <div className="mt-6 flex gap-4 bg-mist px-5 py-4 text-sm text-ink">
          <span aria-hidden className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold italic text-white">
            i
          </span>
          <p>
            <strong className="font-semibold">Not included in the monthly fee:</strong> Hyperliquid-specific costs such as
            trading (maker and taker) fees, funding payments on perpetual positions, and network or bridge fees. These are
            passed through at cost and reduce the value of your funds. Taxes depend on your personal situation.
          </p>
        </div>

        <button type="button" onClick={onClose} className="mt-6 bg-navy-900 px-6 py-3 font-semibold text-white hover:bg-navy-800">
          Done
        </button>
      </div>
    </Modal>
  );
}

export default function ReviewWizard({ funds }: { funds: Fund[] }) {
  const router = useRouter();
  const { user } = useUser();
  const [step, setStep] = useState(0);
  const [costOpen, setCostOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [saving, setSaving] = useState(false);

  function go(n: number) {
    setStep(n);
    window.scrollTo({ top: 0 });
  }

  async function sign() {
    if (!agreed) return;
    setSaving(true);
    await user
      ?.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          contract: { signedAt: new Date().toISOString(), funds: funds.map((f) => f.code) },
        },
      })
      .catch(() => {});
    setSaving(false);
    router.push("/account");
    router.refresh();
  }

  const harborDocs = [
    "Harbor Invest agreement",
    "Harbor terms of use",
    "Harbor Invest prices",
    "Privacy policy",
    "Risk disclosure for digital assets and perpetual futures",
  ];

  return (
    <div className="flex min-h-[calc(100vh-72px)] flex-col">
      <nav aria-label="Account opening progress" className="border-b border-line bg-white">
        <ol className="mx-auto grid w-full max-w-[1290px] grid-cols-3 gap-1.5 px-5 sm:px-8">
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
              <h1 className="text-[1.9rem] font-light leading-tight text-navy-900 sm:text-[2.6rem]">Review your selection before confirming</h1>
              <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,640px)_340px]">
                <div>
                  <p className="text-sm text-ink">Your product</p>
                  <div className="mt-2 grid gap-4 bg-white px-6 py-5 sm:grid-cols-[1fr_1.3fr]">
                    <p className="text-navy-900">Harbor Invest</p>
                    <dl className="text-sm">
                      <div className="flex gap-6 border-b border-line pb-3">
                        <dt className="w-28 text-muted">Opening fees</dt>
                        <dd className="font-semibold text-navy-900">Free</dd>
                      </div>
                      <div className="flex gap-6 pt-3">
                        <dt className="w-28 text-muted">Monthly fee*</dt>
                        <dd>
                          <span className="font-semibold text-navy-900">$19 per month</span>
                          <span className="block text-xs text-muted">50% off your first month</span>
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <p className="mt-2 text-xs text-muted">
                    * One flat fee per account, whatever your balance and however many funds you hold.
                  </p>

                  <p className="mt-7 text-sm text-ink">Your selected funds</p>
                  <div className="mt-2 divide-y divide-line bg-white px-6">
                    {funds.map((f) => (
                      <div key={f.code} className="grid gap-3 py-5 sm:grid-cols-[1fr_1.3fr]">
                        <div>
                          <p className="text-navy-900">{f.shortName}</p>
                          <Link
                            href={`/funds/${f.code}`}
                            target="_blank"
                            className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-navy-900 hover:text-accent"
                          >
                            Fund details <ChevronRight className="h-3.5 w-3.5 text-accent" />
                          </Link>
                        </div>
                        <dl className="flex gap-6 text-sm">
                          <dt className="w-28 text-muted">Fund costs</dt>
                          <dd>
                            <span className="font-semibold text-navy-900">Included</span>
                            <span className="block text-xs text-muted">No separate fund fee</span>
                          </dd>
                        </dl>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 border-t border-line pt-8">
                    <div className="grid gap-3 bg-white px-6 py-5 sm:grid-cols-[1fr_1.3fr]">
                      <p className="text-navy-900">Total estimated costs</p>
                      <div>
                        <p className="text-[1.4rem] text-navy-900">$19 per month</p>
                        <p className="text-xs text-muted">For your whole account*</p>
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-muted">
                      * Hyperliquid trading fees, funding payments and network costs are not included and are passed
                      through at cost. The first-month discount is not included in the estimate.
                    </p>
                  </div>

                  <p className="mt-8 text-sm text-ink">Details on risks and fees</p>
                  <div className="mt-2 bg-white px-6">
                    <Accordion title="Fund costs">
                      Harbor funds have no separate management, entry, exit or performance fees. Everything Harbor charges
                      is covered by the $19 monthly fee.
                    </Accordion>
                    <Accordion title="Risk">
                      The value of your investment can fall as well as rise, and you could lose some or all of it. Funds
                      hold perpetual futures and other markets on Hyperliquid; see each fund&apos;s key information
                      document for its risk indicator and risk factors.
                    </Accordion>
                    <Accordion title="Hyperliquid costs">
                      When funds buy, sell or rebalance positions, Hyperliquid charges trading fees. Perpetual positions pay
                      or receive funding regularly, and moving funds on-chain can incur network fees. These costs are
                      passed through at cost and are not part of the Harbor fee.
                    </Accordion>
                  </div>
                </div>

                <aside className="h-fit bg-white px-7 py-9">
                  <CostArt />
                  <h2 className="mt-6 text-[1.5rem] font-light leading-snug text-navy-900">Find out more about the cost components</h2>
                  <button
                    type="button"
                    onClick={() => setCostOpen(true)}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-navy-900 hover:text-accent"
                  >
                    Details on cost calculation <ChevronRight className="h-4 w-4 text-accent" />
                  </button>
                </aside>
              </div>
              <CostModal open={costOpen} onClose={() => setCostOpen(false)} />
            </>
          )}

          {step === 1 && (
            <>
              <h1 className="text-[1.9rem] font-light leading-tight text-navy-900 sm:text-[2.6rem]">
                You&apos;re just a click away from Harbor Invest
              </h1>
              <div className="mt-8 max-w-[760px] space-y-3">
                <div className="bg-white px-6 py-6">
                  <ul className="space-y-3 text-ink">
                    {[
                      "Please read the agreement and the other documents below carefully.",
                      "Open Harbor Invest by confirming.",
                      "We will email you the agreement and all the documents for your records.",
                    ].map((b) => (
                      <li key={b} className="flex gap-3">
                        <svg viewBox="0 0 16 16" className="mt-1 h-4 w-4 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                          <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Link href="/#faq" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-navy-900 hover:text-accent">
                    Any questions? Contact support <ChevronRight className="h-3.5 w-3.5 text-accent" />
                  </Link>

                  <p className="mt-7 text-xs text-muted">Documents:</p>
                  <ul className="mt-2 divide-y divide-line text-sm">
                    {harborDocs.map((d) => (
                      <li key={d} className="flex items-center justify-between gap-4 py-3.5">
                        <span className="flex items-center gap-3 text-ink">
                          <Document className="h-5 w-5 shrink-0 text-accent" /> {d}
                        </span>
                        <span className="shrink-0 text-xs text-muted">Coming soon</span>
                      </li>
                    ))}
                    {funds.flatMap((f) => [
                      { label: `Key information document: ${f.shortName} (${f.code})`, href: `/funds/${f.code}/key-information` },
                      { label: `Factsheet: ${f.shortName} (${f.code})`, href: `/funds/${f.code}/factsheet` },
                    ]).map((d) => (
                      <li key={d.href} className="flex items-center justify-between gap-4 py-3.5">
                        <span className="flex items-center gap-3 text-ink">
                          <Document className="h-5 w-5 shrink-0 text-accent" /> {d.label}
                        </span>
                        <Link href={d.href} target="_blank" className="shrink-0 font-semibold text-accent underline underline-offset-4 hover:text-accent-600">
                          Preview
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-4 bg-white px-6 py-4 text-sm text-ink">
                  <span aria-hidden className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold italic text-white">
                    i
                  </span>
                  You sign the agreement electronically. You won&apos;t need to send us any signed documents.
                </div>

                <label className="flex cursor-pointer items-start gap-4 bg-white px-6 py-5 text-sm text-ink">
                  <input type="checkbox" role="switch" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="peer sr-only" />
                  <span
                    aria-hidden
                    className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full border transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-accent ${
                      agreed ? "border-accent bg-accent" : "border-[#8a8f96] bg-white"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 h-[18px] w-[18px] rounded-full transition-all ${
                        agreed ? "left-[22px] bg-white" : "left-0.5 bg-[#8a8f96]"
                      }`}
                    />
                  </span>
                  I agree to be legally bound by the documents listed above (&quot;Harbor Invest agreement&quot; and other
                  documents).
                </label>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white shadow-[0_-6px_20px_rgba(0,0,0,0.06)]">
        <div className="mx-auto flex w-full max-w-[1290px] gap-6 px-5 py-6 sm:px-8">
          {step === 0 ? (
            <button
              type="button"
              onClick={() => go(1)}
              className="inline-flex min-w-[120px] items-center justify-center bg-navy-900 px-8 py-3.5 font-semibold text-white hover:bg-navy-800"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={sign}
              disabled={!agreed || saving}
              className="inline-flex min-w-[150px] items-center justify-center bg-navy-900 px-8 py-3.5 font-semibold text-white hover:bg-navy-800 disabled:cursor-not-allowed disabled:bg-[#e6e6e6] disabled:text-[#a3a3a3]"
            >
              {saving ? "Signing…" : "Sign contract"}
            </button>
          )}
          <button
            type="button"
            onClick={() => (step === 0 ? router.push("/account") : go(0))}
            className="inline-flex min-w-[120px] items-center justify-center bg-[#ececec] px-8 py-3.5 font-semibold text-navy-900 hover:bg-line"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
