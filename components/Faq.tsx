"use client";

import { useId, useState } from "react";
import Container from "./Container";
import SectionHeading from "./SectionHeading";
import { ChevronDown } from "./icons";

const COMPARISON = [
  ["Who decides", "Harbor manages your baskets", "You place every trade"],
  ["Minimum to start", "$50", "$500"],
  ["Fee", "0.75% p.a. management fee", "Per-trade fee, no management fee"],
  ["Rebalancing", "Automatic", "Manual"],
  ["Best for", "Long-term, hands-off investing", "Active, experienced traders"],
];

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: "Who is Harbor suitable for?",
    a: (
      <>
        <p>Harbor is ideal if you want to invest on-chain without managing every trade yourself.</p>
        <p>
          You need to be at least 18, live in a supported jurisdiction and hold a self-custody wallet compatible
          with Hyperliquid. New to wallets? Our Learn section walks you through setup step by step.
        </p>
      </>
    ),
  },
  {
    q: "Is there a minimum investment?",
    a: <p>You can start from $50. Recurring plans can be set from $25 per deposit.</p>,
  },
  {
    q: "What does Harbor cost?",
    a: (
      <p>
        Harbor charges a transparent management fee of 0.75% per year, calculated daily on your invested balance.
        Hyperliquid trading fees and network costs are passed through at cost and shown before you confirm.
        Figures shown are placeholders until the final fee schedule is published.
      </p>
    ),
  },
  {
    q: "Who holds my assets?",
    a: (
      <p>
        You do. Harbor never takes custody of your keys. Positions are held in a vault account linked to your
        wallet, and you can withdraw at any time.
      </p>
    ),
  },
  {
    q: "What is the difference between Harbor and Harbor Vaults?",
    a: (
      <>
        <p>Both run on Hyperliquid. The main difference is who makes the investment decisions.</p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b-2 border-navy-900">
                <th scope="col" className="py-3 pr-4 font-semibold text-navy-900">
                  <span className="sr-only">Feature</span>
                </th>
                <th scope="col" className="py-3 pr-4 font-semibold text-navy-900">Harbor</th>
                <th scope="col" className="py-3 font-semibold text-navy-900">Harbor Vaults</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map(([label, a, b]) => (
                <tr key={label} className="border-b border-line">
                  <th scope="row" className="py-3 pr-4 font-medium text-navy-900">{label}</th>
                  <td className="py-3 pr-4">{a}</td>
                  <td className="py-3">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    q: "Can I change or stop my plan?",
    a: (
      <p>
        Yes. You can change your deposit amount, switch baskets, pause or cancel your recurring plan at any time
        from your dashboard, with no exit fees.
      </p>
    ),
  },
];

function FaqItem({ q, a, defaultOpen }: { q: string; a: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  const id = useId();
  return (
    <div className="border-b border-line">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-button`}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg text-navy-900 transition-colors hover:text-accent sm:text-xl"
        >
          {q}
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-accent transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-button`}
        hidden={!open}
        className="space-y-3 pb-7 leading-relaxed text-ink"
      >
        {a}
      </div>
    </div>
  );
}

export default function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="pb-20 sm:pb-24">
      <Container>
        <div className="max-w-[880px]">
          <SectionHeading id="faq-title">Frequent questions about Harbor</SectionHeading>
          <div className="border-t border-line">
            {FAQS.map((f, i) => (
              <FaqItem key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
