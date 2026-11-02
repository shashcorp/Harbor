import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DocShell from "@/components/DocShell";
import { FUNDS, getFund } from "@/lib/funds";
import { DOC_DATE } from "@/lib/fundDocs";

type Params = { code: string };

export function generateStaticParams(): Params[] {
  return FUNDS.map((f) => ({ code: f.code }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const fund = getFund((await params).code);
  return fund ? { title: `Key information document – ${fund.shortName} (${fund.code}) — Harbor` } : {};
}

/** Example amount and the Harbor account fee over a one-year holding period. */
const EXAMPLE = 10_000;
const ACCOUNT_FEE_YEAR = 19 / 2 + 19 * 11; // first month 50% off, then $19/month
const TX_COST_RATE = 0.001; // estimated venue fees and slippage on rebalancing

const usd = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const pct = (n: number) => `${(n * 100).toFixed(2)}%`;

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-9 border-b border-line pb-2 text-base font-semibold text-navy-900">{children}</h2>;
}

export default async function KeyInformationPage({ params }: { params: Promise<Params> }) {
  const fund = getFund((await params).code);
  if (!fund) notFound();

  const rebalance = fund.rebalance.toLowerCase().startsWith("none") ? "only when needed" : fund.rebalance.toLowerCase();
  const txCost = EXAMPLE * TX_COST_RATE;
  const total = ACCOUNT_FEE_YEAR + txCost;
  const hasHedge = fund.code === "HLX-FUND";

  const costs: [string, string, string, string][] = [
    ["Entry costs", "0.00", "0.00%", "No entry charge"],
    ["Exit costs", "0.00", "0.00%", "No exit charge"],
    ["Harbor account fee", usd(ACCOUNT_FEE_YEAR), pct(ACCOUNT_FEE_YEAR / EXAMPLE), "$19 per month per account, first month 50% off"],
    ["Management fees", "0.00", "0.00%", "No separate fund management fee"],
    ["Transaction costs (estimated)", usd(txCost), pct(TX_COST_RATE), "Hyperliquid trading fees and slippage on rebalancing"],
    ["Performance fees", "0.00", "0.00%", "None"],
    [
      "Funding payments",
      "variable",
      "variable",
      hasHedge ? "Received or paid on the short perpetual leg" : "Paid or received on perpetual positions",
    ],
  ];

  return (
    <DocShell backHref={`/funds/${fund.code}`} backLabel="Back to fund" docType="Key information document">
      <header className="mt-8">
        <h1 className="text-[1.9rem] font-light leading-tight text-navy-900">{fund.name}</h1>
        <p className="mt-2 text-muted">
          {fund.code} · Key information document · {DOC_DATE}
        </p>
      </header>

      <H2>Purpose</H2>
      <p className="mt-3">
        This document gives you key information about this fund to help you understand its nature, risks and costs,
        and to compare it with other products. It follows the structure of a key information document but is a
        Harbor summary: it is not a key information document under the EU PRIIPs Regulation or the Swiss Financial
        Services Act, and it has not been reviewed by any regulator.
      </p>

      <H2>Product</H2>
      <dl className="mt-2 text-sm">
        {(
          [
            ["Product name", fund.name],
            ["Product code", fund.code],
            ["Provider", "Harbor"],
            ["Regulatory status", "Not a registered collective investment scheme; not authorised or supervised"],
            ["Currency", fund.currency],
            ["Date of this document", DOC_DATE],
          ] as const
        ).map(([k, v]) => (
          <div key={k} className="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-3 border-b border-line py-2">
            <dt className="text-muted">{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>

      <H2>What is this product?</H2>
      <div className="mt-3 grid gap-5 text-sm sm:grid-cols-3">
        <div>
          <p className="font-semibold text-navy-900">Type</p>
          <p className="mt-1">
            {hasHedge
              ? "Delta-neutral portfolio of spot and perpetual positions with USDC collateral, traded on Hyperliquid."
              : "Long-only portfolio of markets listed on Hyperliquid, including perpetual futures and USDC collateral."}
          </p>
        </div>
        <div>
          <p className="font-semibold text-navy-900">Term</p>
          <p className="mt-1">Open-ended, with no maturity date.</p>
        </div>
        <div>
          <p className="font-semibold text-navy-900">Objective</p>
          <p className="mt-1">
            Track the {fund.benchmark} by holding the fund&apos;s target weights; {fund.style.toLowerCase()},
            rebalanced {rebalance}.
          </p>
        </div>
      </div>
      <p className="mt-4">
        <strong className="font-semibold text-navy-900">Intended investor.</strong> Investors who understand perpetual
        futures, funding payments and on-chain settlement, who can bear losses up to the full amount invested, and who
        are comfortable with a risk level of {fund.risk} out of 7. The fund is not suitable for investors who need
        capital protection or a regular income.
      </p>

      <H2>What are the risks and what could I get in return?</H2>
      <ol className="mt-4 grid max-w-[420px] grid-cols-7 gap-1 text-center text-sm font-semibold">
        {Array.from({ length: 7 }, (_, i) => i + 1).map((n) => (
          <li key={n} className={n === fund.risk ? "bg-navy-900 py-1.5 text-white" : "bg-mist py-1.5 text-muted"}>
            {n}
          </li>
        ))}
      </ol>
      <div className="mt-1 flex max-w-[420px] justify-between text-xs text-muted">
        <span>Lower risk</span>
        <span>Higher risk</span>
      </div>
      <p className="mt-4">
        The risk indicator assumes you keep the fund for at least one year. It shows how likely the fund is to lose
        money because of market movements. The fund has no capital protection: you could lose some or all of your
        investment. Liquidity grade {fund.liquidity}: {fund.liquidNav}% of the fund&apos;s value is in markets trading
        more than $1m a day.
      </p>
      <p className="mt-3">
        What you get back depends on how the markets the fund holds perform, which cannot be predicted. This document
        does not show performance scenarios because the fund has no track record.
      </p>

      <H2>What happens if Harbor is unable to pay out?</H2>
      <p className="mt-3">
        The fund&apos;s positions are held in an on-chain account linked to your wallet, not on Harbor&apos;s balance
        sheet. There is no compensation or deposit guarantee scheme. If Hyperliquid, its oracles or a bridge fail, you
        could lose some or all of your investment.
      </p>

      <H2>What are the costs?</H2>
      <p className="mt-3 text-sm text-muted">
        Example: {EXAMPLE.toLocaleString("en-US")} USDC invested for one year. The Harbor account fee is a flat amount
        per account, so as a percentage it is lower on larger balances and covers all funds you hold.
      </p>
      <table className="mt-3 w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-navy-900">
            <th className="py-2 pr-4 font-semibold">Cost type</th>
            <th className="py-2 pr-4 text-right font-semibold">Amount (USD)</th>
            <th className="py-2 pr-4 text-right font-semibold">Per year</th>
            <th className="py-2 font-semibold">What it covers</th>
          </tr>
        </thead>
        <tbody>
          {costs.map(([type, amount, rate, what]) => (
            <tr key={type} className="border-b border-line align-top">
              <td className="py-2 pr-4">{type}</td>
              <td className="py-2 pr-4 text-right tabular-nums">{amount}</td>
              <td className="py-2 pr-4 text-right tabular-nums">{rate}</td>
              <td className="py-2">{what}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 text-sm">
        <strong className="font-semibold text-navy-900">Total estimated cost in the first year:</strong> {usd(total)}{" "}
        USD ({pct(total / EXAMPLE)} of the example amount), excluding funding payments.
      </p>

      <H2>How long should I hold it and can I take money out early?</H2>
      <p className="mt-3">
        Recommended holding period: one year or longer. There is no minimum holding period, no lock-up and no exit
        fee. You can withdraw at any time; positions are sold on Hyperliquid at the prevailing price. In thinner
        markets, selling may take longer and at a wider spread.
      </p>

      <H2>How can I complain?</H2>
      <p className="mt-3">
        Contact Harbor through Help and contact on the Harbor website.
      </p>

      <H2>Other relevant information</H2>
      <p className="mt-3">
        The fund&apos;s holdings, risks and valuation are described in its factsheet and simplified prospectus,
        available on the fund page. Nothing in this document is an offer, solicitation or recommendation to buy or sell
        any instrument, or investment, tax or legal advice.
      </p>
    </DocShell>
  );
}
