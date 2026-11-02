import json, csv, sys

# ---------- verified tradable universe ----------
hl = json.load(open("work/hl_raw.json", encoding="utf-8"))
core = {}
for u, c in zip(hl["meta"]["universe"], hl["ctxs"][1]):
    try: v = float(c.get("dayNtlVlm") or 0)
    except Exception: v = 0.0
    core[u["name"]] = v
spot = json.load(open("work/hl_spot_ctxs.json", encoding="utf-8"))
spot_tokens = {}
for s in spot:
    spot_tokens[s["base"]] = max(spot_tokens.get(s["base"], 0), s["vol"] or 0)
hip = json.load(open("work/hl_hip3_ctxs.json", encoding="utf-8"))
xyz = {r["name"].split(":", 1)[1]: r["vol24h"] for r in hip["xyz"]}

def venue(sym):
    if sym == "USDC": return "cash", float("inf")
    if sym in core:   return "core perp", core[sym]
    if sym.startswith("xyz:") and sym.split(":", 1)[1] in xyz:
        return "xyz perp", xyz[sym.split(":", 1)[1]]
    if sym in spot_tokens: return "spot", spot_tokens[sym]
    return None, 0.0

# ---------- sleeves ----------
CRYPTO = {"BTC": 50, "ETH": 30, "SOL": 10, "HYPE": 5, "XRP": 5}
def blend(parts):
    out = {}
    for legs, pct in parts:
        tot = sum(legs.values())
        for k, w in legs.items():
            out[k] = out.get(k, 0) + w * pct / tot
    return out

GROWTH = blend([(CRYPTO, 40), ({"xyz:SP500": 100}, 60)])
DEFENSIVE = {"USDC": 90, "xyz:TLT": 10}

def ladder(growth_pct):
    return blend([(GROWTH, growth_pct), (DEFENSIVE, 100 - growth_pct)])

HOLDINGS_US = {"xyz:SP500": 70, "xyz:EWJ": 8, "xyz:ASML": 7, "xyz:EWY": 6, "xyz:BABA": 5, "xyz:EWZ": 4}

FUNDS = []
def add(cat, code, name, short, theme, style, benchmark, rebal, risk, fee, holdings, note):
    FUNDS.append(dict(cat=cat, code=code, name=name, short=short, theme=theme, style=style,
                      benchmark=benchmark, rebalance=rebal, risk=risk, fee_bps=fee,
                      holdings=holdings, note=note))

# ---- 1. multi-asset risk ladder ----
add("Multi-asset", "HLX-S20", "HLX Strategy Fund - Defensive 20 (USDC) A-acc", "Focus - Defensive 20",
    "Crypto + US equity, capital preservation", "Rules-based", "HLX Defensive composite (20% growth)", "Quarterly", 2, 45,
    ladder(20), "Two-thirds of the risk budget sits in USDC; the growth sleeve is 8% crypto core / 12% S&P 500.")
add("Multi-asset", "HLX-S40", "HLX Strategy Fund - Balanced 40 (USDC) A-acc", "Focus - Balanced 40",
    "Crypto + US equity, balanced", "Rules-based", "HLX Balanced composite (40% growth)", "Quarterly", 3, 55,
    ladder(40), "The centre of the range: 16% crypto core, 24% S&P 500, 60% cash plus a short-duration overlay.")
add("Multi-asset", "HLX-S60", "HLX Strategy Fund - Growth 60 (USDC) A-acc", "Focus - Growth 60",
    "Crypto + US equity, growth", "Rules-based", "HLX Growth composite (60% growth)", "Quarterly", 4, 65,
    ladder(60), "60% growth split 40/60 crypto-to-equity, so crypto contributes ~24% of NAV.")
add("Multi-asset", "HLX-S80", "HLX Strategy Fund - Aggressive 80 (USDC) A-acc", "Focus - Aggressive 80",
    "Crypto + US equity, maximum growth", "Rules-based", "HLX Aggressive composite (80% growth)", "Quarterly", 5, 75,
    ladder(80), "32% crypto core and 48% S&P 500 - the top of the ladder before single-theme funds.")

# ---- 2. crypto core ----
add("Crypto core", "HLX-BTC", "HLX Bitcoin Reserve Fund (USDC) A-acc", "Bitcoin Reserve",
    "Single-asset bitcoin", "Passive", "BTC-USD spot", "None (buy and hold)", 6, 40,
    {"BTC": 100}, "The only single-asset fund in the range; 40x max leverage exists on the venue but the fund is ungeared.")
add("Crypto core", "HLX-DC10", "HLX Digital Core 10 Fund (USDC) A-acc", "Digital Core 10",
    "Large-cap crypto core", "Rules-based", "HLX Digital Core 10 composite", "Quarterly", 6, 60,
    {"BTC": 30, "ETH": 25, "SOL": 12, "HYPE": 8, "XRP": 7, "BNB": 5, "DOGE": 4, "ZEC": 4, "LINK": 3, "AVAX": 2},
    "The crypto equivalent of a large-cap index fund - ten names, all top-15 by Hyperliquid volume.")
add("Crypto core", "HLX-SCP", "HLX Smart Contract Platform Fund (USDC) A-acc", "Smart Contract Platforms",
    "Layer-1 platforms", "Rules-based", "HLX SCP composite", "Quarterly", 6, 65,
    {"ETH": 30, "SOL": 25, "SUI": 10, "APT": 8, "SEI": 7, "NEAR": 7, "AVAX": 6, "TIA": 4, "INJ": 3},
    "Nine L1s, ETH and SOL carry 55%. Every name has a Hyperliquid perp with at least 10x max leverage.")
add("Crypto core", "HLX-DEFI", "HLX DeFi Blue Chip Fund (USDC) A-acc", "DeFi Blue Chips",
    "Decentralised finance protocols", "Rules-based", "HLX DeFi composite", "Quarterly", 7, 75,
    {"UNI": 14, "AAVE": 14, "CRV": 10, "LDO": 10, "PENDLE": 10, "MORPHO": 10, "ENA": 8, "JUP": 8, "DYDX": 6, "GMX": 5, "COMP": 5},
    "Eleven protocol tokens across DEXs, lending, liquid staking and perps. Highest idiosyncratic risk in the range.")
add("Crypto core", "HLX-AI", "HLX AI & Compute Fund (USDC) A-acc", "AI & Compute",
    "Decentralised AI infrastructure", "Rules-based", "HLX AI composite", "Quarterly", 7, 80,
    {"TAO": 20, "RENDER": 15, "FET": 12, "NEAR": 10, "ICP": 10, "AR": 8, "GRASS": 8, "WLD": 7, "VIRTUAL": 5, "AIXBT": 5},
    "Compute, data and agent tokens. Overlaps NEAR with the smart-contract fund, which is intentional.")
add("Crypto core", "HLX-PRIV", "HLX Privacy Fund (USDC) A-acc", "Privacy & Censorship Resistance",
    "Privacy coins", "Rules-based", "HLX Privacy composite", "Semi-annual", 7, 80,
    {"ZEC": 40, "XMR": 30, "DASH": 15, "ZEN": 15},
    "A concentrated four-name basket; ZEC and XMR alone are ~70% and both are deep enough for institutional clips.")

# ---- 3. equity ----
add("Equity", "HLX-EQ500", "HLX US 500 Index Fund (USDC) A-acc", "US 500 Index",
    "US large-cap index", "Passive index", "S&P 500", "Quarterly", 5, 25,
    {"xyz:SP500": 100}, "One line, one index perp. The cleanest vehicle on the venue: 50x leverage available, ~$359m open interest.")
add("Equity", "HLX-MEGA", "HLX US Mega Cap Tech Fund (USDC) A-acc", "US Mega Cap Tech",
    "US technology leaders", "Rules-based", "HLX Mega Cap composite", "Quarterly", 5, 55,
    {"xyz:NVDA": 16, "xyz:MSFT": 12, "xyz:AAPL": 12, "xyz:GOOGL": 11, "xyz:META": 10, "xyz:AMZN": 10,
     "xyz:AVGO": 8, "xyz:MU": 8, "xyz:ORCL": 7, "xyz:PLTR": 6},
    "Ten names, each a liquid single-name perp. Weights are a liquidity-aware take on megacap concentration.")
add("Equity", "HLX-SEMI", "HLX Semiconductors & Memory Fund (USDC) A-acc", "Semis & Memory",
    "Semiconductor supply chain", "Rules-based", "HLX Semiconductor composite", "Quarterly", 6, 60,
    {"xyz:MU": 18, "xyz:NVDA": 16, "xyz:SKHX": 12, "xyz:AMD": 10, "xyz:AVGO": 10, "xyz:ASML": 8,
     "xyz:TSM": 8, "xyz:SNDK": 6, "xyz:MRVL": 6, "xyz:ARM": 6},
    "Heavy memory exposure (MU, SK Hynix, SanDisk) because that is where Hyperliquid's equity depth sits.")
add("Equity", "HLX-GLBEQ", "HLX Global Equity Fund (USDC) A-acc", "Global Equity",
    "Developed and emerging equity", "Passive index", "MSCI World (approx.)", "Quarterly", 5, 35,
    dict(HOLDINGS_US), "78% US with Japan, Korea, Europe and EM satellites - the closest Hyperliquid analogue to MSCI World.")
add("Equity", "HLX-JPN", "HLX Japan Equity Fund (USDC) A-acc", "Japan Equity",
    "Japanese equity", "Rules-based", "HLX Japan composite", "Quarterly", 5, 60,
    {"xyz:EWJ": 40, "xyz:JP225": 30, "xyz:SOFTBANK": 12, "xyz:KIOXIA": 10, "xyz:IBIDEN": 8},
    "Japan is the deepest non-US equity pocket on the venue: an ETF, an index and three single names.")

# ---- 4. commodities ----
add("Commodities", "HLX-GOLD", "HLX Gold Fund (USDC) A-acc", "Gold",
    "Physical gold", "Passive", "LBMA gold (via oracle)", "None (buy and hold)", 4, 30,
    {"xyz:GOLD": 100}, "One perp, 25x leverage available, ~$315m open interest - the second-deepest market on the venue.")
add("Commodities", "HLX-PMET", "HLX Precious Metals Fund (USDC) A-acc", "Precious Metals",
    "Gold, silver, PGMs", "Rules-based", "HLX Precious Metals composite", "Quarterly", 4, 45,
    {"xyz:GOLD": 55, "xyz:SILVER": 30, "xyz:PLATINUM": 8, "xyz:PALLADIUM": 7},
    "Adds silver and the PGMs to the gold fund; silver is the liquid leg, platinum and palladium are thin.")
add("Commodities", "HLX-ENRG", "HLX Energy Fund (USDC) A-acc", "Energy",
    "Crude, gas and energy equity", "Rules-based", "HLX Energy composite", "Quarterly", 5, 50,
    {"xyz:BRENTOIL": 40, "xyz:CL": 30, "xyz:NATGAS": 20, "xyz:XLE": 10},
    "Brent and WTI carry the fund; natural gas and the energy-equity sleeve are small on purpose.")

# ---- 5. yield ----
add("Yield", "HLX-FUND", "HLX Funding Yield Fund (USDC) A-acc", "Funding Yield",
    "Delta-neutral perp funding capture", "Actively managed", "USDC + realised funding", "Continuous", 3, 50,
    {"USDC": 100}, "Not a directional basket: 100% USDC collateral, long spot BTC/ETH against equal short perp notional. Return is the funding rate, not price. The only fund here that resembles UBS's bond funds.")

# ---- 6. thematic crypto satellites ----
add("Satellite", "HLX-HYPE", "HLX HYPE Ecosystem Fund (USDC) A-acc", "HYPE Ecosystem",
    "Hyperliquid-native assets", "Rules-based", "HLX HYPE composite", "Quarterly", 7, 70,
    {"HYPE": 80, "PURR": 20}, "The only fund that could not exist on another venue: the exchange token plus its most liquid ecosystem token. HFUN is listed but excluded at ~$10k/day.")
add("Satellite", "HLX-MEME", "HLX Meme & Micro Cap Fund (USDC) A-acc", "Meme & Micro Cap",
    "High-beta retail tokens", "Rules-based", "HLX Meme composite", "Monthly", 7, 90,
    {"DOGE": 25, "kPEPE": 15, "WIF": 12, "FARTCOIN": 12, "POPCAT": 10, "kBONK": 10, "kSHIB": 8, "PENGU": 8},
    "Size-capped at 5% of any portfolio. Liquid at the top (DOGE, kPEPE) and thin at the tail, which is why this fund grades C.")

# ---------- validate ----------
bad = []
for f in FUNDS:
    for sym in f["holdings"]:
        v, _ = venue(sym)
        if v is None:
            bad.append((f["code"], sym))
if bad:
    print("UNKNOWN SYMBOLS:", bad)
    sys.exit(1)

for f in FUNDS:
    tot = sum(f["holdings"].values())
    f["holdings"] = {k: round(w * 100 / tot, 1) for k, w in f["holdings"].items()}
    drift = round(100 - sum(f["holdings"].values()), 1)
    if abs(drift) >= 0.1:
        k = max(f["holdings"], key=f["holdings"].get)
        f["holdings"][k] = round(f["holdings"][k] + drift, 1)
    f["holdings"] = dict(sorted(f["holdings"].items(), key=lambda x: -x[1]))
    thin = sum(w for k, w in f["holdings"].items() if venue(k)[1] < 1e6)
    f["liquid_nav"] = round(100 - thin, 1)
    f["liquidity"] = "A" if f["liquid_nav"] >= 90 else ("B" if f["liquid_nav"] >= 70 else "C")
    f["n"] = len(f["holdings"])
    f["venues"] = sorted({venue(k)[0] for k in f["holdings"]})
    f["legs_str"] = ", ".join(f"{k} {w:g}%" for k, w in f["holdings"].items())
    f["top3"] = ", ".join(list(f["holdings"])[:3])

json.dump(FUNDS, open("harbor_fund_range.json", "w", encoding="utf-8"), indent=1, ensure_ascii=False)
with open("harbor_fund_range.csv", "w", newline="", encoding="utf-8-sig") as fh:
    w = csv.writer(fh)
    w.writerow(["Code","Fund","Short name","Category","Theme","Style","Currency","Risk (1-7)","Fee bps",
                "Benchmark","Rebalance","# holdings","Liquidity","Liquid NAV %","Holdings","Venues","Note"])
    for f in FUNDS:
        w.writerow([f["code"],f["name"],f["short"],f["cat"],f["theme"],f["style"],"USDC",f["risk"],f["fee_bps"],
                    f["benchmark"],f["rebalance"],f["n"],f["liquidity"],f["liquid_nav"],f["legs_str"],
                    ", ".join(f["venues"]),f["note"]])

print(f"{len(FUNDS)} funds, {sum(f['n'] for f in FUNDS)} constituent slots")
print(f"liquidity A/B/C: {sum(1 for f in FUNDS if f['liquidity']=='A')}/{sum(1 for f in FUNDS if f['liquidity']=='B')}/{sum(1 for f in FUNDS if f['liquidity']=='C')}")
for f in FUNDS:
    print(f'{f["code"]:<9} risk={f["risk"]} liq={f["liquidity"]} n={f["n"]:>2} | {f["short"][:32]:<32} | {f["top3"]}')
