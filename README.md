# UBS key4 funds → Hyperliquid-tradable builds

The 32 products on [UBS key4 smart investing](https://www.ubs.com/ch/en/services/investments/fund-account/key4/funds.html) (24 funds + 8 ETFs, captured 2 Nov 2026), each mapped to a portfolio that can actually be expressed with assets listed on Hyperliquid.

## Files

| File | What it is |
|---|---|
| `ubs-key4-hyperliquid-fund-list.md` | The deliverable: master table, per-fund rationale, gap matrix, structural notes |
| `funds_hl_map.csv` | Same list flat, for spreadsheets |
| `funds_hl_map.json` | Machine-readable version — feed this into per-fund pages |
| `work/` | Raw data snapshot + the scripts that produced everything (reproducible) |

## Method

1. **Fund list** — the UBS page is residence-gated; a browser-cookie (`DC_*`) unlock returns the server-rendered table with product names, ISINs, themes, management style and currency.
2. **Hyperliquid universe** — live `info` API: `meta` (235 crypto perps), `spotMeta` (511 spot tokens), `perpDexs` (11 venues), `metaAndAssetCtxs` per venue for marks, open interest and 24h volume.
3. **Mapping** — each mandate's asset mix (equity/bond split, theme, region) is rebuilt from the venue's liquid surface. Every equity leg is a `xyz:` HIP-3 perp; `USDC` stands in for CHF cash/bonds.
4. **Scoring** — `Coverage` = share of NAV with a genuine Hyperliquid equivalent (0% = beta proxy only). `Liquidity` = A/B/C by share of NAV sitting in markets trading over $1m/day.

## Headline numbers

* Average coverage across the 32 products: **45%**
* 7 products ≥85% (the two S&P 500 ETFs are exact matches at 100%)
* 7 products are Swiss equity only → **0%** coverage: Hyperliquid lists no Nestlé, Roche, Novartis, UBS or Zurich
* No CHF market exists, so no CHF-hedged share class can be replicated

Data as of 2 Nov 2026. Weights are target-exposure proxies, not replicas of UBS holdings.
