import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DocShell from "@/components/DocShell";
import { FUNDS, getFund } from "@/lib/funds";
import { DOC_DATE, FEE_TEXT, LEGAL_NOTE, sortedHoldings, venueInstrument } from "@/lib/fundDocs";

type Params = { code: string };

export function generateStaticParams(): Params[] {
  return FUNDS.map((f) => ({ code: f.code }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const fund = getFund((await params).code);
  return fund ? { title: `Factsheet – ${fund.shortName} (${fund.code}) — Harbor` } : {};
}

export default async function FactsheetPage({ params }: { params: Promise<Params> }) {
  const fund = getFund((await params).code);
  if (!fund) notFound();
  const holdings = sortedHoldings(fund);

  const facts: [string, string][] = [
    ["Fund code", fund.code],
    ["Asset class", fund.category],
    ["Theme", fund.theme],
    ["Management style", fund.style],
    ["Currency / settlement", fund.currency],
    ["Venue", "Hyperliquid (on-chain)"],
    ["Benchmark", fund.benchmark],
    ["Rebalancing", fund.rebalance],
    ["Valuation", "Hyperliquid oracle prices, continuous"],
    ["Number of holdings", String(fund.holdings.length)],
    ["Risk indicator", `${fund.risk} of 7`],
    ["Liquidity grade", `${fund.liquidity} (${fund.liquidNav}% in liquid markets)`],
    ["Fees", "Flat $19 per month per Harbor account"],
  ];

  return (
    <DocShell backHref={`/funds/${fund.code}`} backLabel="Back to fund" docType="Factsheet">
      <header className="mt-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          {fund.category} · {fund.theme}
        </p>
        <h1 className="mt-2 text-[1.9rem] font-light leading-tight text-navy-900">{fund.name}</h1>
        <p className="mt-2 text-muted">
          {fund.code} · {fund.currency} · Factsheet as of {DOC_DATE}
        </p>
      </header>

      <div className="mt-10 grid gap-10 md:grid-cols-2 print:grid-cols-2">
        <section>
          <h2 className="border-b border-line pb-2 text-base font-semibold text-navy-900">Fund at a glance</h2>
          <dl className="text-sm">
            {facts.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-3 border-b border-line py-2">
                <dt className="text-muted">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h2 className="border-b border-line pb-2 text-base font-semibold text-navy-900">Investment approach</h2>
          <p className="mt-3">{fund.description}</p>
          <p className="mt-3 text-muted">
            The fund holds a fixed set of target weights in markets listed on Hyperliquid and is rebalanced{" "}
            {fund.rebalance.toLowerCase().startsWith("none") ? "only when needed" : fund.rebalance.toLowerCase()}.
          </p>

          <h2 className="mt-8 border-b border-line pb-2 text-base font-semibold text-navy-900">Risk indicator</h2>
          <ol className="mt-3 grid grid-cols-7 gap-1 text-center text-sm font-semibold">
            {Array.from({ length: 7 }, (_, i) => i + 1).map((n) => (
              <li key={n} className={n === fund.risk ? "bg-navy-900 py-1.5 text-white" : "bg-mist py-1.5 text-muted"}>
                {n}
              </li>
            ))}
          </ol>
          <div className="mt-1 flex justify-between text-xs text-muted">
            <span>Lower risk</span>
            <span>Higher risk</span>
          </div>
        </section>
      </div>

      <section className="mt-10">
        <h2 className="border-b border-line pb-2 text-base font-semibold text-navy-900">Portfolio – target weights</h2>
        <table className="mt-2 w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-navy-900">
              <th className="py-2 pr-4 font-semibold">Holding</th>
              <th className="py-2 pr-4 font-semibold">Instrument</th>
              <th className="py-2 pr-4 font-semibold">Market</th>
              <th className="py-2 text-right font-semibold">Weight</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((h) => {
              const v = venueInstrument(h.venue);
              return (
                <tr key={h.asset} className="border-b border-line">
                  <td className="py-2 pr-4 font-semibold text-navy-900">{h.asset}</td>
                  <td className="py-2 pr-4">{v.instrument}</td>
                  <td className="py-2 pr-4">{v.market}</td>
                  <td className="py-2 text-right tabular-nums">{h.weight}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <section className="mt-10">
        <h2 className="border-b border-line pb-2 text-base font-semibold text-navy-900">Fees</h2>
        <p className="mt-3 text-sm">{FEE_TEXT}</p>
      </section>

      <p className="mt-10 border-t border-line pt-4 text-xs text-muted">{LEGAL_NOTE}</p>
    </DocShell>
  );
}
