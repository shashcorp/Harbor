export type Holding = { asset: string; venue: string; weight: number };

export type Fund = {
  code: string;
  name: string;
  shortName: string;
  category: string;
  theme: string;
  style: string;
  currency: string;
  risk: number;
  benchmark: string;
  rebalance: string;
  liquidity: "A" | "B" | "C";
  liquidNav: number;
  description: string;
  holdings: Holding[];
};

/** Harbor fund range: every holding is a market listed on Hyperliquid (snapshot 2 Nov 2026). */
export const FUNDS: Fund[] = [
  {
    "code": "HLX-S20",
    "name": "Harbor Strategy Fund - Defensive 20 (USDC) A-acc",
    "shortName": "Focus - Defensive 20",
    "category": "Multi-asset",
    "theme": "Crypto + US equity, capital preservation",
    "style": "Rules-based",
    "currency": "USDC",
    "risk": 2,
    "benchmark": "Harbor Defensive composite (20% growth)",
    "rebalance": "Quarterly",
    "liquidity": "A",
    "liquidNav": 92.0,
    "description": "Two-thirds of the risk budget sits in USDC; the growth sleeve is 8% crypto core / 12% S&P 500.",
    "holdings": [
      {
        "asset": "USDC",
        "venue": "Cash / collateral",
        "weight": 72.0
      },
      {
        "asset": "SP500",
        "venue": "HIP-3 market (xyz)",
        "weight": 12.0
      },
      {
        "asset": "TLT",
        "venue": "HIP-3 market (xyz)",
        "weight": 8.0
      },
      {
        "asset": "BTC",
        "venue": "Hyperliquid core perp",
        "weight": 4.0
      },
      {
        "asset": "ETH",
        "venue": "Hyperliquid core perp",
        "weight": 2.4
      },
      {
        "asset": "SOL",
        "venue": "Hyperliquid core perp",
        "weight": 0.8
      },
      {
        "asset": "HYPE",
        "venue": "Hyperliquid core perp",
        "weight": 0.4
      },
      {
        "asset": "XRP",
        "venue": "Hyperliquid core perp",
        "weight": 0.4
      }
    ]
  },
  {
    "code": "HLX-S40",
    "name": "Harbor Strategy Fund - Balanced 40 (USDC) A-acc",
    "shortName": "Focus - Balanced 40",
    "category": "Multi-asset",
    "theme": "Crypto + US equity, balanced",
    "style": "Rules-based",
    "currency": "USDC",
    "risk": 3,
    "benchmark": "Harbor Balanced composite (40% growth)",
    "rebalance": "Quarterly",
    "liquidity": "A",
    "liquidNav": 94.0,
    "description": "The centre of the range: 16% crypto core, 24% S&P 500, 60% cash plus a short-duration overlay.",
    "holdings": [
      {
        "asset": "USDC",
        "venue": "Cash / collateral",
        "weight": 54.0
      },
      {
        "asset": "SP500",
        "venue": "HIP-3 market (xyz)",
        "weight": 24.0
      },
      {
        "asset": "BTC",
        "venue": "Hyperliquid core perp",
        "weight": 8.0
      },
      {
        "asset": "TLT",
        "venue": "HIP-3 market (xyz)",
        "weight": 6.0
      },
      {
        "asset": "ETH",
        "venue": "Hyperliquid core perp",
        "weight": 4.8
      },
      {
        "asset": "SOL",
        "venue": "Hyperliquid core perp",
        "weight": 1.6
      },
      {
        "asset": "HYPE",
        "venue": "Hyperliquid core perp",
        "weight": 0.8
      },
      {
        "asset": "XRP",
        "venue": "Hyperliquid core perp",
        "weight": 0.8
      }
    ]
  },
  {
    "code": "HLX-S60",
    "name": "Harbor Strategy Fund - Growth 60 (USDC) A-acc",
    "shortName": "Focus - Growth 60",
    "category": "Multi-asset",
    "theme": "Crypto + US equity, growth",
    "style": "Rules-based",
    "currency": "USDC",
    "risk": 4,
    "benchmark": "Harbor Growth composite (60% growth)",
    "rebalance": "Quarterly",
    "liquidity": "A",
    "liquidNav": 96.0,
    "description": "60% growth split 40/60 crypto-to-equity, so crypto contributes ~24% of NAV.",
    "holdings": [
      {
        "asset": "SP500",
        "venue": "HIP-3 market (xyz)",
        "weight": 36.0
      },
      {
        "asset": "USDC",
        "venue": "Cash / collateral",
        "weight": 36.0
      },
      {
        "asset": "BTC",
        "venue": "Hyperliquid core perp",
        "weight": 12.0
      },
      {
        "asset": "ETH",
        "venue": "Hyperliquid core perp",
        "weight": 7.2
      },
      {
        "asset": "TLT",
        "venue": "HIP-3 market (xyz)",
        "weight": 4.0
      },
      {
        "asset": "SOL",
        "venue": "Hyperliquid core perp",
        "weight": 2.4
      },
      {
        "asset": "HYPE",
        "venue": "Hyperliquid core perp",
        "weight": 1.2
      },
      {
        "asset": "XRP",
        "venue": "Hyperliquid core perp",
        "weight": 1.2
      }
    ]
  },
  {
    "code": "HLX-S80",
    "name": "Harbor Strategy Fund - Aggressive 80 (USDC) A-acc",
    "shortName": "Focus - Aggressive 80",
    "category": "Multi-asset",
    "theme": "Crypto + US equity, maximum growth",
    "style": "Rules-based",
    "currency": "USDC",
    "risk": 5,
    "benchmark": "Harbor Aggressive composite (80% growth)",
    "rebalance": "Quarterly",
    "liquidity": "A",
    "liquidNav": 98.0,
    "description": "32% crypto core and 48% S&P 500 - the top of the ladder before single-theme funds.",
    "holdings": [
      {
        "asset": "SP500",
        "venue": "HIP-3 market (xyz)",
        "weight": 48.0
      },
      {
        "asset": "USDC",
        "venue": "Cash / collateral",
        "weight": 18.0
      },
      {
        "asset": "BTC",
        "venue": "Hyperliquid core perp",
        "weight": 16.0
      },
      {
        "asset": "ETH",
        "venue": "Hyperliquid core perp",
        "weight": 9.6
      },
      {
        "asset": "SOL",
        "venue": "Hyperliquid core perp",
        "weight": 3.2
      },
      {
        "asset": "TLT",
        "venue": "HIP-3 market (xyz)",
        "weight": 2.0
      },
      {
        "asset": "HYPE",
        "venue": "Hyperliquid core perp",
        "weight": 1.6
      },
      {
        "asset": "XRP",
        "venue": "Hyperliquid core perp",
        "weight": 1.6
      }
    ]
  },
  {
    "code": "HLX-BTC",
    "name": "Harbor Bitcoin Reserve Fund (USDC) A-acc",
    "shortName": "Bitcoin Reserve",
    "category": "Crypto core",
    "theme": "Single-asset bitcoin",
    "style": "Passive",
    "currency": "USDC",
    "risk": 6,
    "benchmark": "BTC-USD spot",
    "rebalance": "None (buy and hold)",
    "liquidity": "A",
    "liquidNav": 100,
    "description": "The only single-asset fund in the range; 40x max leverage exists on the venue but the fund is ungeared.",
    "holdings": [
      {
        "asset": "BTC",
        "venue": "Hyperliquid core perp",
        "weight": 100.0
      }
    ]
  },
  {
    "code": "HLX-DC10",
    "name": "Harbor Digital Core 10 Fund (USDC) A-acc",
    "shortName": "Digital Core 10",
    "category": "Crypto core",
    "theme": "Large-cap crypto core",
    "style": "Rules-based",
    "currency": "USDC",
    "risk": 6,
    "benchmark": "Harbor Digital Core 10 composite",
    "rebalance": "Quarterly",
    "liquidity": "A",
    "liquidNav": 100,
    "description": "The crypto equivalent of a large-cap index fund - ten names, all top-15 by Hyperliquid volume.",
    "holdings": [
      {
        "asset": "BTC",
        "venue": "Hyperliquid core perp",
        "weight": 30.0
      },
      {
        "asset": "ETH",
        "venue": "Hyperliquid core perp",
        "weight": 25.0
      },
      {
        "asset": "SOL",
        "venue": "Hyperliquid core perp",
        "weight": 12.0
      },
      {
        "asset": "HYPE",
        "venue": "Hyperliquid core perp",
        "weight": 8.0
      },
      {
        "asset": "XRP",
        "venue": "Hyperliquid core perp",
        "weight": 7.0
      },
      {
        "asset": "BNB",
        "venue": "Hyperliquid core perp",
        "weight": 5.0
      },
      {
        "asset": "DOGE",
        "venue": "Hyperliquid core perp",
        "weight": 4.0
      },
      {
        "asset": "ZEC",
        "venue": "Hyperliquid core perp",
        "weight": 4.0
      },
      {
        "asset": "LINK",
        "venue": "Hyperliquid core perp",
        "weight": 3.0
      },
      {
        "asset": "AVAX",
        "venue": "Hyperliquid core perp",
        "weight": 2.0
      }
    ]
  },
  {
    "code": "HLX-SCP",
    "name": "Harbor Smart Contract Platform Fund (USDC) A-acc",
    "shortName": "Smart Contract Platforms",
    "category": "Crypto core",
    "theme": "Layer-1 platforms",
    "style": "Rules-based",
    "currency": "USDC",
    "risk": 6,
    "benchmark": "Harbor SCP composite",
    "rebalance": "Quarterly",
    "liquidity": "B",
    "liquidNav": 89.0,
    "description": "Nine L1s, ETH and SOL carry 55%. Every name has a Hyperliquid perp with at least 10x max leverage.",
    "holdings": [
      {
        "asset": "ETH",
        "venue": "Hyperliquid core perp",
        "weight": 30.0
      },
      {
        "asset": "SOL",
        "venue": "Hyperliquid core perp",
        "weight": 25.0
      },
      {
        "asset": "SUI",
        "venue": "Hyperliquid core perp",
        "weight": 10.0
      },
      {
        "asset": "APT",
        "venue": "Hyperliquid core perp",
        "weight": 8.0
      },
      {
        "asset": "SEI",
        "venue": "Hyperliquid core perp",
        "weight": 7.0
      },
      {
        "asset": "NEAR",
        "venue": "Hyperliquid core perp",
        "weight": 7.0
      },
      {
        "asset": "AVAX",
        "venue": "Hyperliquid core perp",
        "weight": 6.0
      },
      {
        "asset": "TIA",
        "venue": "Hyperliquid core perp",
        "weight": 4.0
      },
      {
        "asset": "INJ",
        "venue": "Hyperliquid core perp",
        "weight": 3.0
      }
    ]
  },
  {
    "code": "HLX-DEFI",
    "name": "Harbor DeFi Blue Chip Fund (USDC) A-acc",
    "shortName": "DeFi Blue Chips",
    "category": "Crypto core",
    "theme": "Decentralised finance protocols",
    "style": "Rules-based",
    "currency": "USDC",
    "risk": 7,
    "benchmark": "Harbor DeFi composite",
    "rebalance": "Quarterly",
    "liquidity": "C",
    "liquidNav": 66.0,
    "description": "Eleven protocol tokens across DEXs, lending, liquid staking and perps. Highest idiosyncratic risk in the range.",
    "holdings": [
      {
        "asset": "UNI",
        "venue": "Hyperliquid core perp",
        "weight": 14.0
      },
      {
        "asset": "AAVE",
        "venue": "Hyperliquid core perp",
        "weight": 14.0
      },
      {
        "asset": "CRV",
        "venue": "Hyperliquid core perp",
        "weight": 10.0
      },
      {
        "asset": "LDO",
        "venue": "Hyperliquid core perp",
        "weight": 10.0
      },
      {
        "asset": "PENDLE",
        "venue": "Hyperliquid core perp",
        "weight": 10.0
      },
      {
        "asset": "MORPHO",
        "venue": "Hyperliquid core perp",
        "weight": 10.0
      },
      {
        "asset": "ENA",
        "venue": "Hyperliquid core perp",
        "weight": 8.0
      },
      {
        "asset": "JUP",
        "venue": "Hyperliquid core perp",
        "weight": 8.0
      },
      {
        "asset": "DYDX",
        "venue": "Hyperliquid core perp",
        "weight": 6.0
      },
      {
        "asset": "GMX",
        "venue": "Hyperliquid core perp",
        "weight": 5.0
      },
      {
        "asset": "COMP",
        "venue": "Hyperliquid core perp",
        "weight": 5.0
      }
    ]
  },
  {
    "code": "HLX-AI",
    "name": "Harbor AI & Compute Fund (USDC) A-acc",
    "shortName": "AI & Compute",
    "category": "Crypto core",
    "theme": "Decentralised AI infrastructure",
    "style": "Rules-based",
    "currency": "USDC",
    "risk": 7,
    "benchmark": "Harbor AI composite",
    "rebalance": "Quarterly",
    "liquidity": "C",
    "liquidNav": 45.0,
    "description": "Compute, data and agent tokens. Overlaps NEAR with the smart-contract fund, which is intentional.",
    "holdings": [
      {
        "asset": "TAO",
        "venue": "Hyperliquid core perp",
        "weight": 20.0
      },
      {
        "asset": "RENDER",
        "venue": "Hyperliquid core perp",
        "weight": 15.0
      },
      {
        "asset": "FET",
        "venue": "Hyperliquid core perp",
        "weight": 12.0
      },
      {
        "asset": "NEAR",
        "venue": "Hyperliquid core perp",
        "weight": 10.0
      },
      {
        "asset": "ICP",
        "venue": "Hyperliquid core perp",
        "weight": 10.0
      },
      {
        "asset": "AR",
        "venue": "Hyperliquid core perp",
        "weight": 8.0
      },
      {
        "asset": "GRASS",
        "venue": "Hyperliquid core perp",
        "weight": 8.0
      },
      {
        "asset": "WLD",
        "venue": "Hyperliquid core perp",
        "weight": 7.0
      },
      {
        "asset": "VIRTUAL",
        "venue": "Hyperliquid core perp",
        "weight": 5.0
      },
      {
        "asset": "AIXBT",
        "venue": "Hyperliquid core perp",
        "weight": 5.0
      }
    ]
  },
  {
    "code": "HLX-PRIV",
    "name": "Harbor Privacy Fund (USDC) A-acc",
    "shortName": "Privacy & Censorship Resistance",
    "category": "Crypto core",
    "theme": "Privacy coins",
    "style": "Rules-based",
    "currency": "USDC",
    "risk": 7,
    "benchmark": "Harbor Privacy composite",
    "rebalance": "Semi-annual",
    "liquidity": "B",
    "liquidNav": 70.0,
    "description": "A concentrated four-name basket; ZEC and XMR alone are ~70% and both are deep enough for institutional clips.",
    "holdings": [
      {
        "asset": "ZEC",
        "venue": "Hyperliquid core perp",
        "weight": 40.0
      },
      {
        "asset": "XMR",
        "venue": "Hyperliquid core perp",
        "weight": 30.0
      },
      {
        "asset": "DASH",
        "venue": "Hyperliquid core perp",
        "weight": 15.0
      },
      {
        "asset": "ZEN",
        "venue": "Hyperliquid core perp",
        "weight": 15.0
      }
    ]
  },
  {
    "code": "HLX-EQ500",
    "name": "Harbor US 500 Index Fund (USDC) A-acc",
    "shortName": "US 500 Index",
    "category": "Equity",
    "theme": "US large-cap index",
    "style": "Passive index",
    "currency": "USDC",
    "risk": 5,
    "benchmark": "S&P 500",
    "rebalance": "Quarterly",
    "liquidity": "A",
    "liquidNav": 100,
    "description": "One line, one index perp. The cleanest vehicle on the venue: 50x leverage available, ~$359m open interest.",
    "holdings": [
      {
        "asset": "SP500",
        "venue": "HIP-3 market (xyz)",
        "weight": 100.0
      }
    ]
  },
  {
    "code": "HLX-MEGA",
    "name": "Harbor US Mega Cap Tech Fund (USDC) A-acc",
    "shortName": "US Mega Cap Tech",
    "category": "Equity",
    "theme": "US technology leaders",
    "style": "Rules-based",
    "currency": "USDC",
    "risk": 5,
    "benchmark": "Harbor Mega Cap composite",
    "rebalance": "Quarterly",
    "liquidity": "A",
    "liquidNav": 100,
    "description": "Ten names, each a liquid single-name perp. Weights are a liquidity-aware take on megacap concentration.",
    "holdings": [
      {
        "asset": "NVDA",
        "venue": "HIP-3 market (xyz)",
        "weight": 16.0
      },
      {
        "asset": "MSFT",
        "venue": "HIP-3 market (xyz)",
        "weight": 12.0
      },
      {
        "asset": "AAPL",
        "venue": "HIP-3 market (xyz)",
        "weight": 12.0
      },
      {
        "asset": "GOOGL",
        "venue": "HIP-3 market (xyz)",
        "weight": 11.0
      },
      {
        "asset": "META",
        "venue": "HIP-3 market (xyz)",
        "weight": 10.0
      },
      {
        "asset": "AMZN",
        "venue": "HIP-3 market (xyz)",
        "weight": 10.0
      },
      {
        "asset": "AVGO",
        "venue": "HIP-3 market (xyz)",
        "weight": 8.0
      },
      {
        "asset": "MU",
        "venue": "HIP-3 market (xyz)",
        "weight": 8.0
      },
      {
        "asset": "ORCL",
        "venue": "HIP-3 market (xyz)",
        "weight": 7.0
      },
      {
        "asset": "PLTR",
        "venue": "HIP-3 market (xyz)",
        "weight": 6.0
      }
    ]
  },
  {
    "code": "HLX-SEMI",
    "name": "Harbor Semiconductors & Memory Fund (USDC) A-acc",
    "shortName": "Semis & Memory",
    "category": "Equity",
    "theme": "Semiconductor supply chain",
    "style": "Rules-based",
    "currency": "USDC",
    "risk": 6,
    "benchmark": "Harbor Semiconductor composite",
    "rebalance": "Quarterly",
    "liquidity": "B",
    "liquidNav": 84.0,
    "description": "Heavy memory exposure (MU, SK Hynix, SanDisk) because that is where Hyperliquid's equity depth sits.",
    "holdings": [
      {
        "asset": "MU",
        "venue": "HIP-3 market (xyz)",
        "weight": 18.0
      },
      {
        "asset": "NVDA",
        "venue": "HIP-3 market (xyz)",
        "weight": 16.0
      },
      {
        "asset": "SKHX",
        "venue": "HIP-3 market (xyz)",
        "weight": 12.0
      },
      {
        "asset": "AMD",
        "venue": "HIP-3 market (xyz)",
        "weight": 10.0
      },
      {
        "asset": "AVGO",
        "venue": "HIP-3 market (xyz)",
        "weight": 10.0
      },
      {
        "asset": "ASML",
        "venue": "HIP-3 market (xyz)",
        "weight": 8.0
      },
      {
        "asset": "TSM",
        "venue": "HIP-3 market (xyz)",
        "weight": 8.0
      },
      {
        "asset": "SNDK",
        "venue": "HIP-3 market (xyz)",
        "weight": 6.0
      },
      {
        "asset": "MRVL",
        "venue": "HIP-3 market (xyz)",
        "weight": 6.0
      },
      {
        "asset": "ARM",
        "venue": "HIP-3 market (xyz)",
        "weight": 6.0
      }
    ]
  },
  {
    "code": "HLX-GLBEQ",
    "name": "Harbor Global Equity Fund (USDC) A-acc",
    "shortName": "Global Equity",
    "category": "Equity",
    "theme": "Developed and emerging equity",
    "style": "Passive index",
    "currency": "USDC",
    "risk": 5,
    "benchmark": "MSCI World (approx.)",
    "rebalance": "Quarterly",
    "liquidity": "B",
    "liquidNav": 85.0,
    "description": "78% US with Japan, Korea, Europe and EM satellites - the closest Hyperliquid analogue to MSCI World.",
    "holdings": [
      {
        "asset": "SP500",
        "venue": "HIP-3 market (xyz)",
        "weight": 70.0
      },
      {
        "asset": "EWJ",
        "venue": "HIP-3 market (xyz)",
        "weight": 8.0
      },
      {
        "asset": "ASML",
        "venue": "HIP-3 market (xyz)",
        "weight": 7.0
      },
      {
        "asset": "EWY",
        "venue": "HIP-3 market (xyz)",
        "weight": 6.0
      },
      {
        "asset": "BABA",
        "venue": "HIP-3 market (xyz)",
        "weight": 5.0
      },
      {
        "asset": "EWZ",
        "venue": "HIP-3 market (xyz)",
        "weight": 4.0
      }
    ]
  },
  {
    "code": "HLX-JPN",
    "name": "Harbor Japan Equity Fund (USDC) A-acc",
    "shortName": "Japan Equity",
    "category": "Equity",
    "theme": "Japanese equity",
    "style": "Rules-based",
    "currency": "USDC",
    "risk": 5,
    "benchmark": "Harbor Japan composite",
    "rebalance": "Quarterly",
    "liquidity": "C",
    "liquidNav": 40.0,
    "description": "Japan is the deepest non-US equity pocket on the venue: an ETF, an index and three single names.",
    "holdings": [
      {
        "asset": "EWJ",
        "venue": "HIP-3 market (xyz)",
        "weight": 40.0
      },
      {
        "asset": "JP225",
        "venue": "HIP-3 market (xyz)",
        "weight": 30.0
      },
      {
        "asset": "SOFTBANK",
        "venue": "HIP-3 market (xyz)",
        "weight": 12.0
      },
      {
        "asset": "KIOXIA",
        "venue": "HIP-3 market (xyz)",
        "weight": 10.0
      },
      {
        "asset": "IBIDEN",
        "venue": "HIP-3 market (xyz)",
        "weight": 8.0
      }
    ]
  },
  {
    "code": "HLX-GOLD",
    "name": "Harbor Gold Fund (USDC) A-acc",
    "shortName": "Gold",
    "category": "Commodities",
    "theme": "Physical gold",
    "style": "Passive",
    "currency": "USDC",
    "risk": 4,
    "benchmark": "LBMA gold (via oracle)",
    "rebalance": "None (buy and hold)",
    "liquidity": "A",
    "liquidNav": 100,
    "description": "One perp, 25x leverage available, ~$315m open interest - the second-deepest market on the venue.",
    "holdings": [
      {
        "asset": "GOLD",
        "venue": "HIP-3 market (xyz)",
        "weight": 100.0
      }
    ]
  },
  {
    "code": "HLX-PMET",
    "name": "Harbor Precious Metals Fund (USDC) A-acc",
    "shortName": "Precious Metals",
    "category": "Commodities",
    "theme": "Gold, silver, PGMs",
    "style": "Rules-based",
    "currency": "USDC",
    "risk": 4,
    "benchmark": "Harbor Precious Metals composite",
    "rebalance": "Quarterly",
    "liquidity": "B",
    "liquidNav": 85.0,
    "description": "Adds silver and the PGMs to the gold fund; silver is the liquid leg, platinum and palladium are thin.",
    "holdings": [
      {
        "asset": "GOLD",
        "venue": "HIP-3 market (xyz)",
        "weight": 55.0
      },
      {
        "asset": "SILVER",
        "venue": "HIP-3 market (xyz)",
        "weight": 30.0
      },
      {
        "asset": "PLATINUM",
        "venue": "HIP-3 market (xyz)",
        "weight": 8.0
      },
      {
        "asset": "PALLADIUM",
        "venue": "HIP-3 market (xyz)",
        "weight": 7.0
      }
    ]
  },
  {
    "code": "HLX-ENRG",
    "name": "Harbor Energy Fund (USDC) A-acc",
    "shortName": "Energy",
    "category": "Commodities",
    "theme": "Crude, gas and energy equity",
    "style": "Rules-based",
    "currency": "USDC",
    "risk": 5,
    "benchmark": "Harbor Energy composite",
    "rebalance": "Quarterly",
    "liquidity": "A",
    "liquidNav": 90.0,
    "description": "Brent and WTI carry the fund; natural gas and the energy-equity sleeve are small on purpose.",
    "holdings": [
      {
        "asset": "BRENTOIL",
        "venue": "HIP-3 market (xyz)",
        "weight": 40.0
      },
      {
        "asset": "CL",
        "venue": "HIP-3 market (xyz)",
        "weight": 30.0
      },
      {
        "asset": "NATGAS",
        "venue": "HIP-3 market (xyz)",
        "weight": 20.0
      },
      {
        "asset": "XLE",
        "venue": "HIP-3 market (xyz)",
        "weight": 10.0
      }
    ]
  },
  {
    "code": "HLX-FUND",
    "name": "Harbor Funding Yield Fund (USDC) A-acc",
    "shortName": "Funding Yield",
    "category": "Yield",
    "theme": "Delta-neutral perp funding capture",
    "style": "Actively managed",
    "currency": "USDC",
    "risk": 3,
    "benchmark": "USDC + realised funding",
    "rebalance": "Continuous",
    "liquidity": "A",
    "liquidNav": 100,
    "description": "Not a directional basket: 100% USDC collateral, long spot BTC/ETH against equal short perp notional. Return is the funding rate, not price.",
    "holdings": [
      {
        "asset": "USDC",
        "venue": "Cash / collateral",
        "weight": 100.0
      }
    ]
  },
  {
    "code": "HLX-HYPE",
    "name": "Harbor HYPE Ecosystem Fund (USDC) A-acc",
    "shortName": "HYPE Ecosystem",
    "category": "Satellite",
    "theme": "Hyperliquid-native assets",
    "style": "Rules-based",
    "currency": "USDC",
    "risk": 7,
    "benchmark": "Harbor HYPE composite",
    "rebalance": "Quarterly",
    "liquidity": "B",
    "liquidNav": 80.0,
    "description": "The only fund that could not exist on another venue: the exchange token plus its most liquid ecosystem token. HFUN is listed but excluded at ~$10k/day.",
    "holdings": [
      {
        "asset": "HYPE",
        "venue": "Hyperliquid core perp",
        "weight": 80.0
      },
      {
        "asset": "PURR",
        "venue": "Hyperliquid core perp",
        "weight": 20.0
      }
    ]
  },
  {
    "code": "HLX-MEME",
    "name": "Harbor Meme & Micro Cap Fund (USDC) A-acc",
    "shortName": "Meme & Micro Cap",
    "category": "Satellite",
    "theme": "High-beta retail tokens",
    "style": "Rules-based",
    "currency": "USDC",
    "risk": 7,
    "benchmark": "Harbor Meme composite",
    "rebalance": "Monthly",
    "liquidity": "C",
    "liquidNav": 52.0,
    "description": "Size-capped at 5% of any portfolio. Liquid at the top (DOGE, kPEPE) and thin at the tail, which is why this fund grades C.",
    "holdings": [
      {
        "asset": "DOGE",
        "venue": "Hyperliquid core perp",
        "weight": 25.0
      },
      {
        "asset": "kPEPE",
        "venue": "Hyperliquid core perp",
        "weight": 15.0
      },
      {
        "asset": "WIF",
        "venue": "Hyperliquid core perp",
        "weight": 12.0
      },
      {
        "asset": "FARTCOIN",
        "venue": "Hyperliquid core perp",
        "weight": 12.0
      },
      {
        "asset": "POPCAT",
        "venue": "Hyperliquid core perp",
        "weight": 10.0
      },
      {
        "asset": "kBONK",
        "venue": "Hyperliquid core perp",
        "weight": 10.0
      },
      {
        "asset": "kSHIB",
        "venue": "Hyperliquid core perp",
        "weight": 8.0
      },
      {
        "asset": "PENGU",
        "venue": "Hyperliquid core perp",
        "weight": 8.0
      }
    ]
  }
];

export function getFund(code: string): Fund | undefined {
  return FUNDS.find((f) => f.code === code);
}
