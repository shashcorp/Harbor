import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import { ChevronRight, ChevronUp, Document } from "@/components/icons";
import { btnPrimary } from "@/components/ui";
import { FUNDS, getFund } from "@/lib/funds";

type Params = { code: string };

export function generateStaticParams(): Params[] {
  return FUNDS.map((f) => ({ code: f.code }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const fund = getFund((await params).code);
  if (!fund) return {};
  return {
    title: `${fund.shortName} (${fund.code}) — Harbor Invest`,
    description: `${fund.name}: ${fund.theme}. Every holding trades on Hyperliquid.`,
  };
}

const LIQUIDITY_TEXT = {
  A: "90% or more of the fund sits in markets trading over $1m a day.",
  B: "70–90% of the fund sits in markets trading over $1m a day.",
  C: "Under 70% of the fund sits in markets trading over $1m a day; larger orders may take longer to fill.",
} as const;

function RiskScale({ risk }: { risk: number }) {
  return (
    <div>
      <ol className="grid grid-cols-7 gap-1" aria-label={`Risk indicator: ${risk} of 7`}>
        {Array.from({ length: 7 }, (_, i) => i + 1).map((n) => (
          <li
            key={n}
            aria-current={n === risk ? "true" : undefined}
            className={`py-2.5 text-center text-sm font-semibold ${
              n === risk ? "bg-navy-900 text-white" : "bg-mist text-muted"
            }`}
          >
            {n}
          </li>
        ))}
      </ol>
      <div className="mt-2 flex justify-between text-xs text-muted">
        <span>Lower risk</span>
        <span>Higher risk</span>
      </div>
    </div>
  );
}

function SubHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-40 text-2xl font-light text-navy-900 sm:text-[1.75rem]">
      {children}
      <span aria-hidden className="mt-4 block h-1 w-14 bg-accent" />
    </h2>
  );
}

export default async function FundPage({ params }: { params: Promise<Params> }) {
  const fund = getFund((await params).code);
  if (!fund) notFound();

  const holdings = [...fund.holdings].sort((a, b) => b.weight - a.weight);
  const maxWeight = holdings[0]?.weight ?? 100;

  const facts: [string, React.ReactNode][] = [
    ["Fund code", fund.code],
    ["Short name", fund.shortName],
    ["Asset class", fund.category],
    ["Theme", fund.theme],
    ["Management style", fund.style],
    ["Currency / settlement", fund.currency],
    ["Venue", "Hyperliquid (on-chain)"],
    ["Benchmark", fund.benchmark],
    ["Rebalancing", fund.rebalance],
    ["Valuation", "Hyperliquid oracle prices, continuous"],
    ["Number of holdings", fund.holdings.length],
    ["Risk indicator", `${fund.risk} of 7`],
    ["Liquidity grade", `${fund.liquidity} (${fund.liquidNav}% of the fund in liquid markets)`],
    ["Fees", "Flat $19 per month per Harbor account"],
  ];

  return (
    <>
      <Header />
      <main id="top">
        {/* Breadcrumb */}
        <Container className="pt-8">
          <nav aria-label="Breadcrumb" className="text-sm text-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-navy-900">Invest</Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/funds" className="hover:text-navy-900">Funds</Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-navy-900">{fund.code}</li>
            </ol>
          </nav>
        </Container>

        {/* Fund header */}
        <section className="pb-10 pt-8">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
              <div className="border-l-4 border-accent pl-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-accent">
                  {fund.category} · {fund.theme}
                </p>
                <h1 className="mt-3 text-[2rem] font-light leading-tight tracking-[-0.01em] text-navy-900 sm:text-[2.5rem]">
                  {fund.name}
                </h1>
                <p className="mt-3 text-muted">
                  {fund.code} · {fund.currency} · Risk {fund.risk}/7 · {fund.style}
                </p>
              </div>
              <div className="bg-mist p-6">
                <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted">Holdings</dt>
                    <dd className="mt-1 text-2xl font-light text-navy-900">{fund.holdings.length}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted">Liquidity</dt>
                    <dd className="mt-1 text-2xl font-light text-navy-900">{fund.liquidity}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted">Risk</dt>
                    <dd className="mt-1 text-2xl font-light text-navy-900">{fund.risk}/7</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted">Rebalancing</dt>
                    <dd className="mt-1 text-base text-navy-900">{fund.rebalance}</dd>
                  </div>
                </dl>
                <Link href="/signup" className={`${btnPrimary} mt-6 w-full`}>
                  Invest in this fund <ChevronRight />
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Section tabs */}
        <nav aria-label="Fund sections" className="sticky top-[73px] z-30 border-y border-line bg-white/95 backdrop-blur">
          <Container>
            <ul className="flex gap-8 overflow-x-auto text-[0.95rem]">
              {[
                ["#overview", "Overview"],
                ["#portfolio", "Portfolio"],
                ["#risk", "Risk"],
                ["#documents", "Documents"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="block whitespace-nowrap py-4 text-ink transition-colors hover:text-accent">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </Container>
        </nav>

        <Container className="space-y-20 py-16 sm:py-20">
          {/* Overview */}
          <section aria-labelledby="overview">
            <SubHeading id="overview">Overview</SubHeading>
            <div className="mt-10 grid gap-12 lg:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold text-navy-900">Key facts</h3>
                <dl className="mt-4 border-t border-line">
                  {facts.map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-4 border-b border-line py-3">
                      <dt className="text-muted">{k}</dt>
                      <dd className="text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-navy-900">Description</h3>
                <p className="mt-4 text-lg leading-relaxed text-ink">{fund.description}</p>
                <p className="mt-4 leading-relaxed text-muted">
                  The fund follows a {fund.style.toLowerCase()} approach and is rebalanced{" "}
                  {fund.rebalance.toLowerCase().startsWith("none") ? "only when needed" : fund.rebalance.toLowerCase()}{" "}
                  back to its target weights. Every holding is a market listed on Hyperliquid, and the fund is
                  settled in {fund.currency}.
                </p>
              </div>
            </div>
          </section>

          {/* Portfolio */}
          <section aria-labelledby="portfolio">
            <SubHeading id="portfolio">Portfolio</SubHeading>
            <p className="mt-6 text-muted">Target weights. Actual weights drift between rebalancing dates.</p>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-left">
                <thead>
                  <tr className="border-b-2 border-navy-900 text-sm">
                    <th scope="col" className="py-3 pr-6 font-semibold text-navy-900">Holding</th>
                    <th scope="col" className="py-3 pr-6 font-semibold text-navy-900">Market</th>
                    <th scope="col" className="w-[40%] py-3 text-right font-semibold text-navy-900">Target weight</th>
                  </tr>
                </thead>
                <tbody>
                  {holdings.map((h) => (
                    <tr key={h.asset} className="border-b border-line">
                      <th scope="row" className="py-3.5 pr-6 font-semibold text-navy-900">{h.asset}</th>
                      <td className="py-3.5 pr-6 text-ink">{h.venue}</td>
                      <td className="py-3.5">
                        <div className="flex items-center justify-end gap-4">
                          <span aria-hidden className="hidden h-2 flex-1 bg-mist sm:block">
                            <span
                              className="block h-2 bg-accent"
                              style={{ width: `${(h.weight / maxWeight) * 100}%` }}
                            />
                          </span>
                          <span className="w-14 text-right tabular-nums text-ink">{h.weight}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Risk */}
          <section aria-labelledby="risk">
            <SubHeading id="risk">Risk</SubHeading>
            <div className="mt-10 grid gap-12 lg:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold text-navy-900">Risk indicator</h3>
                <div className="mt-4">
                  <RiskScale risk={fund.risk} />
                </div>
                <p className="mt-4 leading-relaxed text-muted">
                  The scale runs from 1 (cash-like) to 7 (concentrated single-theme). It reflects how much the
                  fund&apos;s value can swing, not a guarantee of returns.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-navy-900">Liquidity grade {fund.liquidity}</h3>
                <p className="mt-4 leading-relaxed text-ink">{LIQUIDITY_TEXT[fund.liquidity]}</p>
                <p className="mt-4 leading-relaxed text-muted">
                  Funds hold perpetual futures and spot markets on Hyperliquid. Prices can move quickly, and the
                  value of your investment can fall as well as rise.
                </p>
              </div>
            </div>
          </section>

          {/* Documents */}
          <section aria-labelledby="documents">
            <SubHeading id="documents">Documents</SubHeading>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {(
                [
                  ["Factsheet", "factsheet"],
                  ["Simplified prospectus", "prospectus"],
                ] as const
              ).map(([doc, slug]) => (
                <li key={doc}>
                  <Link
                    href={`/funds/${fund.code}/${slug}`}
                    className="group flex items-center justify-between gap-4 py-4 text-navy-900 transition-colors hover:text-accent"
                  >
                    <span className="flex items-center gap-3 font-semibold">
                      <Document className="h-5 w-5 text-accent" /> {doc} – {fund.code}
                    </span>
                    <span className="inline-flex items-center gap-2 text-sm text-muted group-hover:text-accent">
                      View <ChevronRight />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Footer row */}
          <div className="flex flex-col gap-4 border-t border-line pt-5 text-sm sm:flex-row sm:items-center sm:justify-between">
            <Link href="/funds" className="inline-flex items-center gap-2 font-semibold text-navy-900 hover:text-accent">
              Back to all funds
            </Link>
            <a href="#top" className="inline-flex items-center gap-2 text-navy-900 hover:text-accent">
              Back to top <ChevronUp />
            </a>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
