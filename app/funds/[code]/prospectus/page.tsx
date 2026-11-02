import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DocShell from "@/components/DocShell";
import { FUNDS, getFund } from "@/lib/funds";
import { DOC_DATE, FEE_TEXT, LEGAL_NOTE, RISK_FACTORS, sortedHoldings, venueInstrument } from "@/lib/fundDocs";

type Params = { code: string };

export function generateStaticParams(): Params[] {
  return FUNDS.map((f) => ({ code: f.code }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const fund = getFund((await params).code);
  return fund ? { title: `Simplified prospectus – ${fund.shortName} (${fund.code}) — Harbor` } : {};
}

function H2({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <h2 className="mt-10 border-b border-line pb-2 text-base font-semibold text-navy-900">
      {n}. {children}
    </h2>
  );
}

export default async function ProspectusPage({ params }: { params: Promise<Params> }) {
  const fund = getFund((await params).code);
  if (!fund) notFound();
  const holdings = sortedHoldings(fund);
  const singleAsset = fund.holdings.length === 1;
  const rebalance = fund.rebalance.toLowerCase().startsWith("none") ? "only when needed" : fund.rebalance.toLowerCase();

  return (
    <DocShell backHref={`/funds/${fund.code}`} backLabel="Back to fund" docType="Simplified prospectus">
      <header className="mt-8">
        <h1 className="text-[1.9rem] font-light leading-tight text-navy-900">{fund.name}</h1>
        <p className="mt-2 text-muted">
          {fund.code} · Simplified prospectus · {DOC_DATE}
        </p>
      </header>

      <H2 n={1}>Important information</H2>
      <p className="mt-3">{LEGAL_NOTE}</p>

      <H2 n={2}>The fund</H2>
      <dl className="mt-2 text-sm">
        {(
          [
            ["Name", fund.name],
            ["Code", fund.code],
            ["Currency", fund.currency],
            ["Benchmark", fund.benchmark],
            ["Management style", fund.style],
            ["Risk indicator", `${fund.risk} of 7`],
            ["Rebalancing", fund.rebalance],
            ["Number of holdings", String(fund.holdings.length)],
          ] as const
        ).map(([k, v]) => (
          <div key={k} className="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-3 border-b border-line py-2">
            <dt className="text-muted">{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>

      <H2 n={3}>Investment objective</H2>
      <p className="mt-3">
        The fund seeks to track the return of the {fund.benchmark} by holding the target weights set out below,
        using only markets listed on Hyperliquid. Theme: {fund.theme.toLowerCase()}. {fund.description}
      </p>

      <H2 n={4}>Investment policy</H2>
      <p className="mt-3">
        The fund holds long positions only, sized to its target weights, with no leverage at fund level. It is{" "}
        {fund.style.toLowerCase()} and is rebalanced {rebalance}; weights drift with performance in between.{" "}
        {singleAsset
          ? "As a single-holding fund, up to 100% of its value is held in one market by design."
          : "No more than 60% of the fund's value may be held in any single market."}{" "}
        If a constituent is delisted or can no longer be traded, its weight is redistributed pro rata to the
        remaining holdings at the next rebalancing.
      </p>
      <table className="mt-4 w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-navy-900">
            <th className="py-2 pr-4 font-semibold">Constituent</th>
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

      <H2 n={5}>Risk factors</H2>
      <div className="mt-3 space-y-3">
        {RISK_FACTORS.map(([title, body]) => (
          <p key={title}>
            <strong className="font-semibold text-navy-900">{title}.</strong> {body}
          </p>
        ))}
        <p>
          <strong className="font-semibold text-navy-900">Liquidity grade {fund.liquidity}.</strong>{" "}
          {fund.liquidNav}% of the fund&apos;s value sits in markets trading more than $1m a day.
        </p>
      </div>

      <H2 n={6}>Fees and expenses</H2>
      <p className="mt-3">{FEE_TEXT}</p>

      <H2 n={7}>Subscriptions and withdrawals</H2>
      <p className="mt-3">
        Investments and withdrawals are executed at the prevailing value of the fund by trading its target weights on
        Hyperliquid. There is no notice period and no exit fee. Withdrawals are paid to the wallet linked to your
        Harbor account.
      </p>

      <H2 n={8}>Valuation</H2>
      <p className="mt-3">
        The fund&apos;s value is the sum of each holding&apos;s mark price multiplied by its quantity, plus any USDC
        balance. Marks come from Hyperliquid oracle prices and are updated continuously, so the value you see is the
        value you transact at.
      </p>

      <H2 n={9}>Conflicts of interest and tax</H2>
      <p className="mt-3">
        Harbor defines the fund&apos;s weights and rebalancing rules and may hold the same positions. Tax treatment
        depends on your personal circumstances and may change; seek independent advice if you are unsure.
      </p>
    </DocShell>
  );
}
