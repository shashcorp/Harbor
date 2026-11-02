import json

F = json.load(open("harbor_fund_range.json", encoding="utf-8"))
hl = json.load(open("work/hl_raw.json", encoding="utf-8"))
core = {}
for u, c in zip(hl["meta"]["universe"], hl["ctxs"][1]):
    try: core[u["name"]] = float(c.get("dayNtlVlm") or 0)
    except Exception: core[u["name"]] = 0.0
spot = json.load(open("work/hl_spot_ctxs.json", encoding="utf-8"))
spotv = {}
for s in spot:
    spotv[s["base"]] = max(spotv.get(s["base"], 0), s["vol"] or 0)
hip = json.load(open("work/hl_hip3_ctxs.json", encoding="utf-8"))
xyz = {r["name"].split(":", 1)[1]: r["vol24h"] for r in hip["xyz"]}

def meta(sym):
    if sym == "USDC": return "cash / collateral", "USDC", float("inf")
    if sym in core: return "core perp", "Hyperliquid", core[sym]
    if sym.startswith("xyz:") and sym.split(":", 1)[1] in xyz:
        return "xyz perp", "HIP-3 · xyz", xyz[sym.split(":", 1)[1]]
    return "spot", "Hyperliquid", spotv.get(sym, 0.0)

CATS = [("Multi-asset", "Multi-asset - the risk ladder"),
        ("Crypto core", "Crypto core and thematic"),
        ("Equity", "Equity - index, US, Japan"),
        ("Commodities", "Commodities"),
        ("Yield", "Yield - funding capture"),
        ("Satellite", "Crypto satellites")]

def fmt_vol(v):
    if v == float("inf"): return "—"
    if v >= 1e9: return f"${v/1e9:.2f}bn"
    if v >= 1e6: return f"${v/1e6:,.0f}m"
    if v >= 1e3: return f"${v/1e3:,.0f}k"
    return f"${v:,.0f}"

master = ["| Code | Fund | Short name | Theme | Management style | Ccy | Risk | # | Liq |",
          "|---|---|---|---|---|---|---|---|---|"]
for f in F:
    master.append(f'| `{f["code"]}` | {f["name"]} | {f["short"]} | {f["theme"]} | {f["style"]} | {f["currency"] if "currency" in f else "USDC"} | {f["risk"]} | {f["n"]} | {f["liquidity"]} |')
master = "\n".join(master)

sections = []
for key, title in CATS:
    rows = [f for f in F if f["cat"] == key]
    block = [f"### {title}", ""]
    for f in rows:
        block.append(f'**`{f["code"]}` · {f["name"]}**')
        block.append("")
        block.append(f'*{f["theme"]} · {f["style"].lower()} · benchmark: {f["benchmark"]} · rebalancing: {f["rebalance"].lower()} · risk {f["risk"]}/7 · fee {f["fee_bps"]} bp*')
        block.append("")
        block.append("| Constituent | Instrument | Venue | Weight | 24h volume |")
        block.append("|---|---|---|---|---|")
        for sym, w in f["holdings"].items():
            itype, vname, vol = meta(sym)
            block.append(f"| `{sym}` | {itype} | {vname} | {w:g}% | {fmt_vol(vol)} |")
        block.append("")
        block.append(f'> {f["note"]}')
        block.append("")
    sections.append("\n".join(block))
body = "\n".join(sections)

doc = f"""# The HLX fund range — 21 funds, every constituent listed on Hyperliquid

Same table format as the [UBS key4 fund list](https://www.ubs.com/ch/en/services/investments/fund-account/key4/funds.html), but inverted: instead of taking UBS products and finding Hyperliquid proxies, this is a fund range **designed backwards from the venue** — every holding below is a market you can actually trade on Hyperliquid today (2 Nov 2026 snapshot: 235 core perps, 142 `xyz` HIP-3 markets, 511 spot tokens).

Nothing here needs a custodian, a transfer agent or a Swiss ISIN. Each fund is a weight vector over live perps, settled in USDC, valued off Hyperliquid oracles.

## The list

{master}

**Columns.** *Risk* maps to a 1–7 SRRI-equivalent scale (1 = cash-like, 7 = concentrated single-theme). *Liq* is the share of NAV sitting in markets that trade over $1m/day: A ≥90%, B ≥70%, C below that — C funds need limit orders and smaller clips. Codes are the fund identifiers; `HLX` is a placeholder for your own brand.

## The funds in detail

{body}

## How the range is built

1. **Two axes.** The ladder (S20–S80) plus the two single-asset funds give you a complete risk menu; everything else is a satellite for a specific view. This mirrors how the UBS range is organised — a Focus ladder, thematics, then index ETFs.
2. **Weights follow liquidity, not market cap.** A fund like Semis & Memory holds 18% Micron rather than the 5% a cap-weighted index would give it, because `xyz:MU` trades $69m/day while `xyz:AVGO` trades $1m. The weight you can actually build beats the weight that looks right on paper.
3. **Nothing invented.** No Swiss equities, no CHF bonds, no corporate credit, no ESG screens — those are exactly the gaps the earlier document identified, so the range simply does not pretend to offer them. The nearest substitutes (USDC + `xyz:TLT` for bonds) are labelled as such inside the ladder.
4. **One deliberate exotic.** `HLX-FUND` is the only fund that could not exist on a traditional venue: it holds USDC and harvests perp funding by running long spot against short perp. It is the range's answer to a bond fund — a carry strategy with no price exposure.
5. **The HYPE fund is venue-native.** `HLX-HYPE` holds the exchange token plus `PURR` and `HFUN`, assets that are almost impossible to access anywhere else.

## Structural properties

| | |
|---|---|
| Base currency | USDC (the only settlement asset on the venue) |
| Valuation | Hyperliquid oracle marks, continuous |
| Rebalancing | Quarterly by default, monthly for the meme fund, continuous for the funding fund |
| Leverage | None at fund level; every market offers 10–50x, so a levered share class is possible per fund |
| Income | No dividends or coupons — `HLX-FUND` is the only income vehicle, and its income is funding, not yield on capital |
| Costs | Fee column is illustrative (25–90 bp); venue costs are taker fees plus funding on any short leg |
| Redemption | Atomic — unwind the weights, no NAV gate, no notice period |

## How it lines up with the UBS range

If you want the one-to-one view against the list you started from:

| UBS key4 product | HLX equivalent | Fidelity |
|---|---|---|
| Vitainvest Passive 25 / 50 / 75 / 100 | `HLX-S20` / `S40` / `S60` / `S80` | ladder structure kept, bond sleeve becomes USDC |
| UBS Core S&P 500 UCITS ETF | `HLX-EQ500` | exact — one index perp |
| UBS Core MSCI World UCITS ETF | `HLX-GLBEQ` | high on the equity, no small caps |
| UBS (Lux) Strategy Fund - Fixed Income | `HLX-FUND` | different instrument, same job (carry instead of coupons) |
| Digital Transformation Themes | `HLX-MEGA` | high — ten megacaps, no software mid-caps |
| UBS (CH) Equity Fund - Swiss High Dividend | — | no substitute exists; closest is `HLX-MEGA` |
| UBS ETF (CH) - SMI | — | no Swiss equity on the venue |
| — | `HLX-BTC`, `HLX-DC10`, `HLX-HYPE` | venue-native; nothing in the UBS range covers crypto |

## Where this range would underperform its UBS equivalent

* **No bond funds.** The UBS range's defensive half has no Hyperliquid counterpart; `HLX-S20`/`S40` hold USDC, which is capital-stable but earns nothing.
* **No Swiss or European equity.** `HLX-JPN` is the only non-US equity fund with real depth.
* **Concentration is structural.** Four funds hold more than half of NAV in one market (`HLX-BTC`, `HLX-GOLD`, `HLX-EQ500` at 100%, `HLX-HYPE` at 70%), and the three defensive ladder funds hold 54–72% USDC.
* **Perp mechanics.** Every non-cash leg is a perpetual: funding accrues daily and rolls never end. A "buy and hold" investor pays funding instead of an expense ratio.

*Data: Hyperliquid `info` API, 2 Nov 2026. Fund construction, weights, codes, risk ratings and fees are this document's own design, not a UBS product.*
"""

open("harbor-fund-range.md", "w", encoding="utf-8").write(doc)
print("chars:", len(doc))
print(master[:400])
