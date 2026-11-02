"use client";

import { useState } from "react";
import { ChevronDown } from "./icons";
import { RISK_FACTORS } from "@/lib/fundDocs";

type Block = { heading?: string; text: string };
type Card = { title: string; intro?: string; blocks: Block[]; Art: () => React.ReactElement };

function ArtFunds() {
  return (
    <svg viewBox="0 0 220 170" className="h-full w-full" fill="none" aria-hidden>
      <g stroke="var(--color-navy-900)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="30" y="60" width="110" height="80" rx="4" />
        <path d="M30 82h110M52 60V46a8 8 0 018-8h50a8 8 0 018 8v14" />
        <circle cx="62" cy="110" r="14" />
        <path d="M62 96v14h14" />
        <path d="M96 124v-10M108 124v-20M120 124v-14" />
        <path d="M20 150h180" />
      </g>
      <circle cx="170" cy="48" r="18" fill="var(--color-accent)" />
      <path d="M170 30v18h18" stroke="#fff" strokeWidth="2" />
      <rect x="158" y="96" width="10" height="28" fill="var(--color-accent)" />
      <rect x="174" y="84" width="10" height="40" stroke="var(--color-navy-900)" strokeWidth="2" />
    </svg>
  );
}

function ArtRisks() {
  return (
    <svg viewBox="0 0 220 170" className="h-full w-full" fill="none" aria-hidden>
      <g stroke="var(--color-navy-900)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 150V16l-6 8M24 16l6 8M24 150h180l-8-6M204 150l-8 6" />
      </g>
      <path
        d="M28 144l26-40 18 12 24-44 22 26 26-34 20 14 26-38"
        stroke="var(--color-accent)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArtAssets() {
  return (
    <svg viewBox="0 0 220 170" className="h-full w-full" fill="none" aria-hidden>
      <g stroke="var(--color-navy-900)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="62" cy="62" r="30" />
        <path d="M54 48h12a7 7 0 010 14H54V48zM54 62h14a7 7 0 010 14H54V62zM58 42v6M58 76v6" />
        <rect x="112" y="40" width="70" height="44" rx="3" />
        <path d="M122 74V60M134 74V52M146 74V64M158 74V48M170 74V58" />
        <path d="M20 150h180" />
      </g>
      <path d="M40 140l14-30h52l14 30z" fill="var(--color-accent)" />
      <path d="M128 140l12-24h40l12 24z" stroke="var(--color-navy-900)" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

const CARDS: Card[] = [
  {
    title: "What are funds?",
    Art: ArtFunds,
    blocks: [
      {
        text: "A fund lets many investors put money into the same portfolio. With Harbor, each fund is a rules-based portfolio: a fixed set of target weights across markets listed on Hyperliquid, such as bitcoin, equity indices, gold or USDC. When you invest, you own a proportional share of every position in the fund, so you are diversified across all its holdings from your first deposit.",
      },
      {
        text: "Harbor sets each fund's weights and rebalances it on a fixed schedule, for example quarterly, back to its targets. Your positions are held in an on-chain account linked to your own wallet, not on Harbor's balance sheet. The value of the fund is calculated continuously from Hyperliquid oracle prices, so what you see is what you can trade at.",
      },
      {
        text: "Every fund has a factsheet, a simplified prospectus and a key information document describing its objective, holdings, risks and costs. Read them before you invest.",
      },
    ],
  },
  {
    title: "What are the risks?",
    intro: "All the risks should be carefully considered before you invest in a fund.",
    Art: ArtRisks,
    blocks: RISK_FACTORS.map(([heading, text]) => ({ heading, text })),
  },
  {
    title: "What types of asset classes are available?",
    Art: ArtAssets,
    blocks: [
      {
        heading: "Multi-asset",
        text: "Multi-asset funds combine USDC, equity indices and large crypto assets in fixed proportions, from defensive (mostly USDC) to aggressive (mostly growth assets). They are the simplest way to match a fund to your risk profile.",
      },
      {
        heading: "Crypto",
        text: "Crypto funds hold digital assets such as bitcoin, ether and other large tokens, or focused themes like decentralised finance and AI. They can rise and fall much more sharply than traditional assets.",
      },
      {
        heading: "Equities",
        text: "Equity funds give exposure to shares and share indices, such as the S&P 500 or leading technology companies, through equity markets listed on Hyperliquid. Their value follows the underlying shares, and you do not receive voting rights or dividends directly.",
      },
      {
        heading: "Commodities",
        text: "Commodity funds track gold, silver, other precious metals or energy prices. Commodities can help diversify a portfolio but can be volatile and are affected by supply, demand and the US dollar.",
      },
      {
        heading: "Yield",
        text: "The funding yield fund aims to earn the funding rate paid on perpetual futures while keeping market exposure close to neutral. Its return depends on funding rates, which change and can turn negative.",
      },
    ],
  },
];

function KnowledgeCard({ card }: { card: Card }) {
  const [open, setOpen] = useState(false);
  const { Art } = card;
  return (
    <article className="grid gap-6 bg-white px-6 py-8 sm:px-8 md:grid-cols-[240px_minmax(0,1fr)] md:gap-12">
      <div className="mx-auto h-40 w-56 md:mx-0 md:h-44 md:w-full">
        <Art />
      </div>
      <div>
        <h2 className="text-[1.6rem] font-light text-navy-900">{card.title}</h2>
        {card.intro && <p className="mt-3 text-sm text-ink">{card.intro}</p>}
        <div className={`relative mt-3 overflow-hidden ${open ? "" : "max-h-[7.5rem]"}`}>
          <div className="space-y-4 text-sm leading-relaxed text-muted">
            {card.blocks.map((b, i) => (
              <div key={i}>
                {b.heading && <h3 className="mb-1.5 text-base font-normal text-navy-900">{b.heading}</h3>}
                <p>{b.text}</p>
              </div>
            ))}
          </div>
          {!open && <span aria-hidden className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white" />}
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-navy-900 hover:text-accent"
        >
          {open ? "Show less" : "Show more"}
          <ChevronDown className={`h-4 w-4 text-accent transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      </div>
    </article>
  );
}

export default function FundKnowledge() {
  return (
    <div className="space-y-4">
      {CARDS.map((c) => (
        <KnowledgeCard key={c.title} card={c} />
      ))}
    </div>
  );
}
