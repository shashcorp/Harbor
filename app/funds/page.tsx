import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { ChevronRight, ChevronUp } from "@/components/icons";
import { btnOutline, btnPrimary } from "@/components/ui";
import { FUNDS } from "@/lib/funds";

export const metadata: Metadata = {
  title: "Investment funds — Harbor Invest",
  description:
    "The full list of Harbor Invest funds: actively and passively managed funds whose every holding trades on Hyperliquid.",
};

const STEPS = [
  {
    n: "01",
    title: "Open your account",
    body: "Sign up with Google, Apple or email in a few minutes.",
  },
  {
    n: "02",
    title: "Choose your funds",
    body: "Pick from the list below, from defensive multi-asset funds to focused themes. The choice is yours.",
  },
  {
    n: "03",
    title: "Get started",
    body: "Make your first deposit and Harbor takes care of the rest – $19 per month, with 50% off your first month.",
  },
];

export default function FundsPage() {
  return (
    <>
      <Header />
      <main id="top">
        {/* Intro */}
        <section className="pt-14 sm:pt-20">
          <Container>
            <div className="max-w-[880px]">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-accent">Harbor funds</p>
              <SectionHeading>Invest with Harbor Invest</SectionHeading>
              <h2 className="text-xl font-normal text-navy-900 sm:text-2xl">Actively managed? Crypto or equities?</h2>
              <p className="mt-4 text-lg leading-relaxed text-ink">
                With Harbor Invest, you can invest in all kinds of funds – from defensive multi-asset strategies to
                bitcoin, equity indices, commodities and focused crypto themes. Every fund holds only markets that
                trade on Hyperliquid, settled in USDC.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-ink">
                Here is a list of all the funds we offer within Harbor Invest.
              </p>
            </div>
          </Container>
        </section>

        {/* Highlight box */}
        <section className="py-14 sm:py-16">
          <Container>
            <div className="bg-mist px-6 py-10 sm:px-12 sm:py-12">
              <p className="text-sm font-semibold uppercase tracking-wide text-accent">Transparent by design</p>
              <h2 className="mt-3 text-2xl font-light text-navy-900 sm:text-[1.75rem]">
                Every holding, visible on-chain
              </h2>
              <p className="mt-4 max-w-[760px] leading-relaxed text-ink">
                Each Harbor fund is a set of target weights over live Hyperliquid markets – core crypto perps, HIP-3
                equity, index and commodity markets, and USDC. There is no custodian or transfer agent in between,
                and positions are valued off Hyperliquid oracles, so you can check what you own at any time.
              </p>
              <p className="mt-4 max-w-[760px] leading-relaxed text-ink">
                Funds are rated on a 1–7 risk scale, from cash-like to concentrated single-theme. The higher the
                number, the larger the potential swings in value.
              </p>
            </div>
          </Container>
        </section>

        {/* Fund table */}
        <section aria-labelledby="fund-list-title" className="pb-20 sm:pb-24">
          <Container>
            <h2 id="fund-list-title" className="sr-only">
              Fund list
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px] border-collapse text-left">
                <thead>
                  <tr className="border-b-2 border-navy-900 text-sm">
                    <th scope="col" className="w-[34%] py-4 pr-6 font-semibold text-navy-900">Product</th>
                    <th scope="col" className="py-4 pr-6 font-semibold text-navy-900">Short name</th>
                    <th scope="col" className="py-4 pr-6 font-semibold text-navy-900">Theme</th>
                    <th scope="col" className="py-4 pr-6 font-semibold text-navy-900">Management style</th>
                    <th scope="col" className="py-4 font-semibold text-navy-900">Currency</th>
                  </tr>
                </thead>
                <tbody>
                  {FUNDS.map((f) => (
                    <tr key={f.code} className="border-b border-line align-top transition-colors hover:bg-mist/60">
                      <th scope="row" className="py-5 pr-6 text-left font-normal">
                        <Link
                          href={`/funds/${f.code}`}
                          className="block font-semibold text-navy-900 underline-offset-4 hover:text-accent hover:underline"
                        >
                          {f.name}
                        </Link>
                        <span className="mt-1 block text-sm text-muted">Code: {f.code}</span>
                      </th>
                      <td className="py-5 pr-6 text-ink">{f.shortName}</td>
                      <td className="py-5 pr-6 text-ink">
                        <span className="block">{f.theme}</span>
                        <span className="mt-2 inline-block bg-accent-50 px-2 py-0.5 text-xs font-semibold text-accent-600">
                          {f.category}
                        </span>
                        <span className="mt-2 block text-xs text-muted" aria-label={`Risk ${f.risk} of 7`}>
                          Risk {f.risk}/7
                        </span>
                      </td>
                      <td className="py-5 pr-6 text-ink">{f.style}</td>
                      <td className="py-5 text-ink">{f.currency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Container>
        </section>

        {/* Set up */}
        <section aria-labelledby="setup-title" className="pb-20 sm:pb-24">
          <Container>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-accent">More about Harbor Invest</p>
            <SectionHeading id="setup-title">Set up now and start investing</SectionHeading>
            <ol className="grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-line">
              {STEPS.map((s, i) => (
                <li key={s.n} className={i === 0 ? "md:pr-10" : i === 1 ? "md:px-10" : "md:pl-10"}>
                  <span className="text-[2.5rem] font-light leading-none text-accent">{s.n}</span>
                  <h3 className="mt-4 text-xl font-normal text-navy-900">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{s.body}</p>
                </li>
              ))}
            </ol>

            <div className="mt-14 grid gap-5 md:grid-cols-2">
              <div className="bg-mist p-8">
                <h3 className="text-xl font-normal text-navy-900">Already have a Harbor account?</h3>
                <Link href="/login" className={`${btnOutline} mt-6`}>
                  Log in <ChevronRight />
                </Link>
              </div>
              <div className="bg-mist p-8">
                <h3 className="text-xl font-normal text-navy-900">New to Harbor?</h3>
                <Link href="/signup" className={`${btnPrimary} mt-6`}>
                  Open account <ChevronRight />
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Disclaimer + breadcrumb */}
        <section className="pb-16">
          <Container>
            <div className="space-y-3 border-t border-line pt-8 text-xs leading-relaxed text-muted">
              <p>For marketing and information purposes by Harbor.</p>
              <p>
                Before investing, read the factsheet and fund documentation carefully. Each fund holds positions in
                markets listed on Hyperliquid, including perpetual futures, and is valued in USDC using Hyperliquid
                oracle prices. The value of investments can fall as well as rise and you may get back less than you
                invest. Past performance is not a reliable indicator of future results. Fund availability, holdings
                and weights may change, and funds may not be available in all jurisdictions.
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-4 border-t border-line pt-5 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
              <nav aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-2">
                  <li>
                    <Link href="/" className="hover:text-navy-900">Harbor</Link>
                  </li>
                  <li aria-hidden>/</li>
                  <li>
                    <Link href="/" className="hover:text-navy-900">Invest</Link>
                  </li>
                  <li aria-hidden>/</li>
                  <li aria-current="page" className="text-navy-900">Funds</li>
                </ol>
              </nav>
              <a href="#top" className="inline-flex items-center gap-2 text-navy-900 hover:text-accent">
                Back to top <ChevronUp />
              </a>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
