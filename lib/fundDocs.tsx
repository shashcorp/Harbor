import type { Fund } from "./funds";

export const DOC_DATE = "2 November 2026";

export function venueInstrument(venue: string) {
  if (venue.startsWith("Cash")) return { instrument: "USDC collateral", market: "Hyperliquid" };
  if (venue.startsWith("HIP-3")) return { instrument: "Perpetual future", market: "Hyperliquid HIP-3 (xyz)" };
  return { instrument: "Perpetual future", market: "Hyperliquid core" };
}

export function sortedHoldings(fund: Fund) {
  return [...fund.holdings].sort((a, b) => b.weight - a.weight);
}

export const FEE_TEXT =
  "Harbor Invest charges a flat fee of $19 per month per account, whatever your balance and however many funds you hold, with 50% off your first month. There is no separate management fee, entry or exit fee, or performance fee on this fund. Hyperliquid trading fees, funding payments on perpetual positions and network costs are passed through at cost and reduce the fund's value.";

export const RISK_FACTORS: [string, string][] = [
  [
    "Market risk",
    "Constituents are derivatives on underlying markets. Prices can move sharply and gap, and the value of the fund can fall as well as rise.",
  ],
  [
    "Funding risk",
    "Perpetual futures settle funding regularly. A persistently positive funding rate is a cost for long positions and can reduce returns regardless of price direction.",
  ],
  [
    "Liquidity risk",
    "Trading depth on Hyperliquid is concentrated in a limited number of markets. Positions in thinner markets may take longer to trade and at wider spreads than the prices shown.",
  ],
  [
    "Oracle and venue risk",
    "The fund is valued using Hyperliquid oracle prices. An oracle incident, venue outage, suspension or delisting could affect valuation, trading and withdrawals.",
  ],
  [
    "Smart-contract and custody risk",
    "Assets are held in on-chain accounts linked to your wallet. Loss of keys, a protocol exploit or a bridge failure is not covered by any deposit protection scheme.",
  ],
  [
    "Concentration risk",
    "Some funds hold a large share of their value in a single market. Diversification is limited by the range of markets listed on Hyperliquid.",
  ],
  [
    "Rebalancing risk",
    "Rebalancing trades incur costs and may be executed at unfavourable prices.",
  ],
  [
    "Currency risk",
    "The fund is denominated and settled in USDC. Exposure to the US dollar, and therefore to your home currency, is unhedged.",
  ],
];

export const LEGAL_NOTE =
  "This document is for information purposes only. Harbor funds are rules-based portfolios of markets listed on Hyperliquid; they are not registered collective investment schemes and have not been approved by any regulator. Nothing in this document is an offer, solicitation or recommendation to buy or sell any instrument, or investment, tax or legal advice. Past performance is not a reliable indicator of future results.";
