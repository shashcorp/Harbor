# HLX — a Hyperliquid-native fund range

Two linked pieces of work, plus the data and pipeline that produce them.

## 1. The fund range (`harbor-fund-range.md`)

21 funds designed backwards from what Hyperliquid actually lists — not UBS products with proxies bolted on.
Every constituent is a live market: core crypto perps, HIP-3 `xyz` equity/index/commodity/FX perps, USDC collateral.
Includes target weights, risk 1–7, illustrative fees, benchmarks, liquidity grades and a per-fund rationale.

## 2. The UBS key4 mapping (`ubs-key4-hyperliquid-fund-list.md`)

The inverse exercise: the 32 products on the UBS key4 smart investing list, each mapped to a Hyperliquid build with a
replication-coverage score. Swiss equity, CHF bonds and corporate credit come out at 0% — they don't exist on the venue.

## 3. The site (`site/`)

A static site: `site/index.html` plus 21 fund pages, each with key facts, 1M / 3M / YTD / 1Y / since-listing performance,
a model rating, the holdings table, and downloadable documents.

Open `site/index.html` in a browser — no server needed.

**Documents**: `site/downloads/` holds 42 PDFs — a one-page factsheet and a simplified prospectus for every fund.

## 4. The data

| File | What it is |
|---|---|
| `perf_candles.json` | daily closes for all 82 constituent markets, fetched from Hyperliquid `candleSnapshot` |
| `perf.json` | computed windows, coverage, volatility, drawdown, Sharpe, model rating, sparkline series |
| `harbor_fund_range.json` | the machine-readable range definition the site and PDFs are generated from |
| `work/hl_raw.json` | `meta` + `metaAndAssetCtxs` snapshot: 235 core perps with 24h volume |
| `work/hl_hip3_ctxs.json` | per-market liquidity for all 11 HIP-3 venues |
| `work/hl_spot_ctxs.json` | spot pairs and volumes |
| `work/ubs_ok.html` | the unlocked UBS key4 page the 32-fund list was extracted from |

## 5. Regenerating

```bash
python perf_build.py     # fetch candles -> perf_candles.json   (network)
python perf4.py          # compute performance -> perf.json
python gen_range_doc.py  # harbour-fund-range.md
python build_docs.py     # 42 .docx into work/docx/
# convert .docx -> PDF with the LibreOffice Kit, then:
python build_site.py     # 22 HTML pages into site/
```

## Method notes

- **Performance is a backtest**, not a track record: target weights applied to historical prices, rebalanced daily, gross of fees.
- A window is published only when ≥90% of NAV has a price at its start. HIP-3 equity markets listed between March and
  September 2026, which is why equity-heavy funds show `n/a` for YTD and 1Y — the page states the listing date next to the dash.
- **Ratings are HLX model ratings** (1–5 from simulated Sharpe, drawdown and volatility). No agency rates these strategies.
- **Not investment products.** No custodian, depositary, auditor or regulator is involved; nothing here is an offer.

Data snapshot: 2 November 2026.
