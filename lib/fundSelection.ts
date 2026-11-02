import { FUNDS, type Fund } from "./funds";

export type Management = "active" | "passive";

export function managementOf(f: Fund): Management {
  return f.style.toLowerCase().startsWith("passive") ? "passive" : "active";
}

export type Topic = { id: string; group: "Regions" | "Topics"; label: string; description: string; codes: string[] };

/** Topics and regions, each mapped to the Harbor funds that cover it. */
export const TOPICS: Topic[] = [
  { id: "us", group: "Regions", label: "US", description: "Invest in US shares and indices", codes: ["HLX-EQ500", "HLX-MEGA", "HLX-SEMI"] },
  { id: "japan", group: "Regions", label: "Japan", description: "Invest in Japanese shares and indices", codes: ["HLX-JPN"] },
  { id: "global", group: "Regions", label: "Global", description: "Invest in markets worldwide", codes: ["HLX-GLBEQ", "HLX-S40", "HLX-S60"] },
  { id: "multi", group: "Topics", label: "Multi-asset strategies", description: "Ready-made mixes of USDC, equities and crypto, from defensive to aggressive", codes: ["HLX-S20", "HLX-S40", "HLX-S60", "HLX-S80"] },
  { id: "crypto", group: "Topics", label: "Bitcoin & crypto core", description: "Invest in bitcoin and the largest digital assets", codes: ["HLX-BTC", "HLX-DC10", "HLX-SCP"] },
  { id: "defi", group: "Topics", label: "Decentralised finance", description: "Invest in lending, exchange and staking protocols", codes: ["HLX-DEFI"] },
  { id: "ai", group: "Topics", label: "AI & computing", description: "Invest in AI infrastructure, compute and chips", codes: ["HLX-AI", "HLX-SEMI"] },
  { id: "privacy", group: "Topics", label: "Privacy", description: "Invest in privacy-focused digital assets", codes: ["HLX-PRIV"] },
  { id: "commodities", group: "Topics", label: "Commodities", description: "Invest in gold, precious metals and energy", codes: ["HLX-GOLD", "HLX-PMET", "HLX-ENRG"] },
  { id: "yield", group: "Topics", label: "Yield", description: "Aim to earn funding rates with little market exposure", codes: ["HLX-FUND"] },
  { id: "hyperliquid", group: "Topics", label: "Hyperliquid ecosystem", description: "Invest in Hyperliquid-native assets", codes: ["HLX-HYPE"] },
  { id: "highbeta", group: "Topics", label: "High-beta tokens", description: "Invest in meme and micro-cap tokens; very high risk", codes: ["HLX-MEME"] },
];

export type Label = "Perfect fit" | "Recommended" | "Not actively managed" | "Not passively managed" | "Not recommended";

export const LABEL_TEXT: Record<Label, string> = {
  "Perfect fit": "These funds are best suited to your chosen investment horizon and risk tolerance.",
  Recommended: "These funds match your chosen risk tolerance.",
  "Not actively managed": "These funds match your risk tolerance, but they are not actively managed.",
  "Not passively managed": "These funds match your risk tolerance, but they are not passively managed.",
  "Not recommended": "These funds do not match your chosen risk tolerance.",
};

/** profileRisk is the highest fund risk indicator (1–7) that fits the user's risk profile. */
export function labelFor(f: Fund, profileRisk: number, pref: Management): Label {
  if (f.risk > profileRisk) return "Not recommended";
  if (managementOf(f) !== pref) return pref === "active" ? "Not actively managed" : "Not passively managed";
  return f.risk >= profileRisk - 1 ? "Perfect fit" : "Recommended";
}

const LABEL_ORDER: Label[] = ["Perfect fit", "Recommended", "Not actively managed", "Not passively managed", "Not recommended"];

export function sortByRelevance(funds: Fund[], profileRisk: number, pref: Management) {
  return [...funds].sort(
    (a, b) =>
      LABEL_ORDER.indexOf(labelFor(a, profileRisk, pref)) - LABEL_ORDER.indexOf(labelFor(b, profileRisk, pref)) ||
      Math.abs(profileRisk - a.risk) - Math.abs(profileRisk - b.risk) ||
      (a.category === "Multi-asset" ? -1 : 0) - (b.category === "Multi-asset" ? -1 : 0),
  );
}

/** "As simple as possible": up to 3 funds that match the profile, the preferred management style first. */
export function simpleSuggestions(profileRisk: number, pref: Management): Fund[] {
  const eligible = FUNDS.filter((f) => f.risk <= profileRisk);
  const preferred = sortByRelevance(eligible.filter((f) => managementOf(f) === pref), profileRisk, pref);
  const others = sortByRelevance(eligible.filter((f) => managementOf(f) !== pref), profileRisk, pref);
  return [...preferred.slice(0, 2), ...others, ...preferred.slice(2)].slice(0, 3);
}

export function fundsForTopic(topicId: string): Fund[] {
  const t = TOPICS.find((x) => x.id === topicId);
  return t ? FUNDS.filter((f) => t.codes.includes(f.code)) : [];
}

const COMMODITIES = new Set(["GOLD", "SILVER", "PLATINUM", "PALLADIUM", "BRENTOIL", "CL", "NATGAS"]);
const BONDS = new Set(["TLT"]);

export const STRUCTURE_COLORS: Record<string, string> = {
  "Cash (USDC)": "#7d8792",
  Crypto: "#0e7f86",
  Equities: "#1e3a5f",
  Bonds: "#3fb3ba",
  Commodities: "#c9a227",
};

/** Asset-class breakdown of a fund's target weights. */
export function structureOf(f: Fund): { label: string; weight: number }[] {
  const out: Record<string, number> = {};
  for (const h of f.holdings) {
    const cls = h.asset === "USDC"
      ? "Cash (USDC)"
      : h.venue.startsWith("HIP-3")
        ? COMMODITIES.has(h.asset)
          ? "Commodities"
          : BONDS.has(h.asset)
            ? "Bonds"
            : "Equities"
        : "Crypto";
    out[cls] = (out[cls] ?? 0) + h.weight;
  }
  return Object.entries(out)
    .map(([label, weight]) => ({ label, weight: Math.round(weight * 100) / 100 }))
    .sort((a, b) => b.weight - a.weight);
}
