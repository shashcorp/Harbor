import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import DocShell from "@/components/DocShell";
import { FUNDS } from "@/lib/funds";
import { DOC_DATE, LEGAL_NOTE, RISK_FACTORS } from "@/lib/fundDocs";

export const metadata: Metadata = {
  title: "Harbor Invest factsheet — Harbor",
  description: "Harbor Invest at a glance: how it works, the flat $19 monthly fee, the fund range and the key risks.",
};

function H2({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="mt-10 scroll-mt-24 border-b border-line pb-2 text-base font-semibold text-navy-900">
      {children}
    </h2>
  );
}

const STEPS = [
  ["Define your risk profile", "Answer a few questions about your experience, holding period and risk tolerance."],
  ["Find the right Harbor funds", "Get suggestions that match your profile, or choose by region and topic. There is no limit on how many funds you hold."],
  ["Open Harbor Invest", "Review your selection and costs, read the documents and sign electronically."],
  ["Start investing", "Fund your account with USDC from your own wallet."],
];

export default function InvestFactsheetPage() {
  const byCategory = FUNDS.reduce<Record<string, typeof FUNDS>>((acc, f) => {
    (acc[f.category] ??= []).push(f);
    return acc;
  }, {});

  return (
    <DocShell backHref="/" backLabel="Back to Harbor" docType="Product factsheet">
      <header className="mt-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">Managed investing on Hyperliquid</p>
        <h1 className="mt-2 text-[1.9rem] font-light leading-tight text-navy-900">Harbor Invest</h1>
        <p className="mt-2 text-muted">Product factsheet as of {DOC_DATE}</p>
      </header>

      <div className="mt-8 grid gap-4 sm:grid-cols-3 print:grid-cols-3">
        {[
          ["$19", "per month, flat"],
          [String(FUNDS.length), "funds to choose from"],
          ["No limit", "on the number of funds"],
        ].map(([n, l]) => (
          <div key={l} className="bg-mist px-5 py-4">
            <p className="text-[1.6rem] font-light text-navy-900">{n}</p>
            <p className="text-sm text-muted">{l}</p>
          </div>
        ))}
      </div>

      <H2>What is Harbor Invest?</H2>
      <p className="mt-3">
        Harbor Invest lets individual investors build a portfolio from a tailored list of actively and passively managed
        investment funds. Every fund holds only markets listed on Hyperliquid, such as bitcoin, equity indices, gold and
        USDC, and is settled in USDC. Positions are held in an on-chain account linked to your own wallet and valued
        continuously using Hyperliquid oracle prices.
      </p>

      <H2>How it works</H2>
      <ol className="mt-3 space-y-3">
        {STEPS.map(([t, d], i) => (
          <li key={t} className="flex gap-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy-900 text-sm font-semibold text-white">
              {i + 1}
            </span>
            <span>
              <strong className="font-semibold text-navy-900">{t}.</strong> {d}
            </span>
          </li>
        ))}
      </ol>

      <H2 id="fees">Fees</H2>
      <dl className="mt-2 text-sm">
        {(
          [
            ["Opening fee", "Free"],
            ["Monthly fee", "$19 per month per account, whatever your balance and however many funds you hold"],
            ["First month", "50% off"],
            ["Fund management, entry, exit and performance fees", "None"],
            ["Not included", "Hyperliquid trading fees, funding payments on perpetual positions and network costs, passed through at cost"],
          ] as const
        ).map(([k, v]) => (
          <div key={k} className="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-3 border-b border-line py-2">
            <dt className="text-muted">{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>

      <H2>The fund range</H2>
      <table className="mt-2 w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-navy-900">
            <th className="py-2 pr-4 font-semibold">Fund</th>
            <th className="py-2 pr-4 font-semibold">Code</th>
            <th className="py-2 pr-4 font-semibold">Style</th>
            <th className="py-2 text-right font-semibold">Risk</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(byCategory).map(([cat, funds]) => (
            <Fragment key={cat}>
              <tr className="border-b border-line bg-mist">
                <td colSpan={4} className="py-1.5 pl-2 text-xs font-semibold uppercase tracking-wide text-muted">
                  {cat}
                </td>
              </tr>
              {funds.map((f) => (
                <tr key={f.code} className="border-b border-line">
                  <td className="py-2 pr-4">
                    <Link href={`/funds/${f.code}`} className="text-navy-900 hover:text-accent">
                      {f.shortName}
                    </Link>
                  </td>
                  <td className="py-2 pr-4 text-muted">{f.code}</td>
                  <td className="py-2 pr-4">{f.style}</td>
                  <td className="py-2 text-right tabular-nums">{f.risk}/7</td>
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
      <p className="mt-2 text-xs text-muted">
        Each fund has its own factsheet, simplified prospectus and key information document on its fund page.
      </p>

      <H2 id="risks">Key risks</H2>
      <div className="mt-3 space-y-3">
        {RISK_FACTORS.map(([title, body]) => (
          <p key={title}>
            <strong className="font-semibold text-navy-900">{title}.</strong> {body}
          </p>
        ))}
      </div>

      <p className="mt-10 border-t border-line pt-4 text-xs text-muted">{LEGAL_NOTE}</p>
    </DocShell>
  );
}
