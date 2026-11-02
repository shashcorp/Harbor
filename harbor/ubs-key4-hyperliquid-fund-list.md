# UBS key4 funds, rebuilt with the assets that exist on Hyperliquid

Source list: [ubs.com/ch/en/services/investments/fund-account/key4/funds.html](https://www.ubs.com/ch/en/services/investments/fund-account/key4/funds.html) — **32 funds**, captured 2 Nov 2026.
Hyperliquid universe: live API snapshot (`meta`, `metaAndAssetCtxs`, `spotMetaAndAssetCtxs`, `perpDexs`) taken the same day — 235 crypto perps on the core venue, 511 spot tokens, and 11 builder-deployed (HIP-3) perp venues. Every equity, index, commodity and FX leg below sits on the HIP-3 venue `xyz`; `hl:` prefixes a core-venue crypto perp.

## How to read the build column

* `xyz:SP500` — S&P 500 index perp, 50x max leverage, ~$359m open interest. The workhorse of every equity sleeve.
* `USDC` — stablecoin collateral; it stands in for the CHF bond / cash sleeve, which has no Hyperliquid market.
* **Coverage** — share of the fund's NAV that has a genuine Hyperliquid equivalent. `0%` means only a beta proxy is available.
* **Liq** — A: ≥90% of NAV in markets trading over $1m/day; B: ≥70%; C: below that (limit orders, small clips).

## What Hyperliquid actually offers (24h notional, 2 Nov 2026)

| Market | Venue | 24h volume |
|---|---|---|
| `hl:BTC` | core venue | $1,185.8m |
| `hl:ETH` | core venue | $421.1m |
| `hl:HYPE` | core venue | $409.1m |
| `hl:SOL` | core venue | $240.1m |
| `hl:ZEC` | core venue | $296.2m |
| `hl:XRP` | core venue | $25.2m |
| `xyz:XYZ100` | HIP-3 · xyz | $171.4m |
| `xyz:SP500` | HIP-3 · xyz | $118.2m |
| `xyz:CL` | HIP-3 · xyz | $166.2m |
| `xyz:BRENTOIL` | HIP-3 · xyz | $92.2m |
| `xyz:SILVER` | HIP-3 · xyz | $104.2m |
| `xyz:GOLD` | HIP-3 · xyz | $42.2m |
| `xyz:MU` | HIP-3 · xyz | $69.0m |
| `xyz:EWY` | HIP-3 · xyz | $45.3m |
| `xyz:GOOGL` | HIP-3 · xyz | $40.2m |
| `xyz:NVDA` | HIP-3 · xyz | $26.0m |
| `xyz:AAPL` | HIP-3 · xyz | $11.2m |
| `xyz:TSLA` | HIP-3 · xyz | $9.3m |
| `xyz:META` | HIP-3 · xyz | $6.8m |
| `xyz:AMZN` | HIP-3 · xyz | $5.9m |
| `xyz:MSFT` | HIP-3 · xyz | $3.5m |
| `xyz:BABA` | HIP-3 · xyz | $2.6m |
| `xyz:LLY` | HIP-3 · xyz | $1.1m |
| `xyz:ASML` | HIP-3 · xyz | $0.4m |
| `xyz:TLT` | HIP-3 · xyz | $0.3m |

Beyond these: 235 crypto perps (BTC, ETH, SOL, HYPE, ZEC, XRP, BNB, DOGE …) and 142 `xyz` equity/index/commodity/FX markets including Japan (`EWJ`, `JP225`), Korea (`EWY`), Brazil (`EWZ`), China (`BABA`), bonds (`TLT`), FX (`EUR`, `JPY`, `GBP`) and commodities (`CL`, `BRENTOIL`, `GOLD`, `SILVER`, `COPPER`, `NATGAS`, `URANIUM`). Tokenised equities also exist on spot (`AAPL`, `MSFT`, `GLD`, `QQQ`) but are effectively dormant — the perps are the instrument to use.

## The 32 funds

| # | Fund | ISIN | Group | Hyperliquid build (target weights) | Coverage | Liq |
|---|---|---|---|---|---|---|
| 1 | UBS (Lux) Strategy Fund - Fixed Income (CHF) Q-acc (UBF) | `LU1240799699` | Multi-asset | USDC 85%, xyz:TLT 15% | 0% | B |
| 2 | UBS (Lux) Strategy SICAV - Income (CHF) Q-acc (UBF) | `LU1240800968` | Multi-asset | USDC 51%, xyz:SP500 31.2%, xyz:TLT 9%, xyz:EWJ 2.8%, xyz:ASML 2.4%, xyz:EWY 2%, xyz:BABA 1.6% | 40% | B |
| 3 | UBS (CH) Equity Fund - Mid Caps Switzerland (CHF) QL | `CH0560899525` | Swiss equity | xyz:SP500 100% | 0% | A |
| 4 | UBS (Lux) Strategy Fund - Yield (CHF) Q-acc | `LU0941351768` | Multi-asset | USDC 63.8%, xyz:SP500 19.5%, xyz:TLT 11.2%, xyz:EWJ 1.8%, xyz:ASML 1.5%, xyz:EWY 1.2%, xyz:BABA 1% | 25% | B |
| 5 | UBS (Lux) Strategy Fund - Balanced (CHF) Q-acc | `LU0941351099` | Multi-asset | USDC 42.5%, xyz:SP500 39%, xyz:TLT 7.5%, xyz:EWJ 3.5%, xyz:ASML 3%, xyz:EWY 2.5%, xyz:BABA 2% | 50% | B |
| 6 | UBS (Lux) Strategy Fund - Growth (CHF) Q-acc | `LU0941351412` | Multi-asset | xyz:SP500 58.5%, USDC 21.2%, xyz:EWJ 5.2%, xyz:ASML 4.5%, xyz:EWY 3.8%, xyz:TLT 3.8%, xyz:BABA 3% | 75% | B |
| 7 | UBS (Lux) Strategy Fund - Equity (CHF) Q-acc | `LU1240799343` | Multi-asset | xyz:SP500 76.4%, xyz:EWJ 6.9%, xyz:ASML 5.9%, xyz:EWY 4.9%, xyz:BABA 3.9%, USDC 1.7%, xyz:TLT 0.3% | 98% | B |
| 8 | UBS (CH) Vitainvest - Passive 25 Sustainable Q | `CH1110134124` | Multi-asset | USDC 63.8%, xyz:SP500 19.5%, xyz:TLT 11.2%, xyz:EWJ 1.8%, xyz:ASML 1.5%, xyz:EWY 1.2%, xyz:BABA 1% | 25% | B |
| 9 | UBS (CH) Vitainvest - Passive 50 Sustainable Q | `CH1110134132` | Multi-asset | USDC 42.5%, xyz:SP500 39%, xyz:TLT 7.5%, xyz:EWJ 3.5%, xyz:ASML 3%, xyz:EWY 2.5%, xyz:BABA 2% | 50% | B |
| 10 | UBS (CH) Vitainvest - Passive 75 Sustainable Q | `CH1110134140` | Multi-asset | xyz:SP500 58.5%, USDC 21.2%, xyz:EWJ 5.2%, xyz:ASML 4.5%, xyz:EWY 3.8%, xyz:TLT 3.8%, xyz:BABA 3% | 75% | B |
| 11 | UBS (CH) Vitainvest - Passive 100 Sustainable Q | `CH1110134157` | Multi-asset | xyz:SP500 76.4%, xyz:EWJ 6.9%, xyz:ASML 5.9%, xyz:EWY 4.9%, xyz:BABA 3.9%, USDC 1.7%, xyz:TLT 0.3% | 98% | B |
| 12 | UBS (CH) Suisse - 25 (CHF) Q-dist | `CH0210193519` | Multi-asset | USDC 63.8%, xyz:SP500 22.8%, xyz:TLT 11.2%, xyz:EWJ 0.7%, xyz:ASML 0.6%, xyz:EWY 0.5%, xyz:BABA 0.4% | 10% | B |
| 13 | UBS (CH) Suisse - 45 (CHF) Q-dist | `CH0210193535` | Multi-asset | USDC 46.8%, xyz:SP500 41%, xyz:TLT 8.2%, xyz:EWJ 1.3%, xyz:ASML 1.1%, xyz:EWY 0.9%, xyz:BABA 0.7% | 18% | B |
| 14 | UBS (CH) Suisse - 65 (CHF) Q-dist | `CH0210193584` | Multi-asset | xyz:SP500 59.4%, USDC 29.7%, xyz:TLT 5.2%, xyz:EWJ 1.8%, xyz:ASML 1.6%, xyz:EWY 1.3%, xyz:BABA 1% | 26% | A |
| 15 | UBS (Lux) Equity SICAV - Long Term Themes (USD) (CHF hedged) Q | `LU1323611423` | Thematic | xyz:SP500 40%, xyz:NVDA 10%, xyz:MU 10%, xyz:GOOGL 8%, xyz:LLY 8%, xyz:META 6%, xyz:AMZN 6%, xyz:MRNA 6%, xyz:BE 6% | 70% | A |
| 16 | UBS (Lux) Key Selection SICAV - Digital Transformation Themes | `LU2054466995` | Thematic | xyz:NVDA 14%, xyz:MU 12%, xyz:GOOGL 12%, xyz:MSFT 10%, xyz:META 10%, xyz:ORCL 9%, xyz:AMD 9%, xyz:AMZN 8%, xyz:PLTR 8%, xyz:NET 4%, xyz:CRWD 4% | 75% | A |
| 17 | UBS (Lux) Equity SICAV - Active Climate Aware (USD) (CHF hedged) Q | `LU2408499411` | Thematic | xyz:SP500 48%, xyz:NVDA 8%, xyz:ASML 8%, xyz:BE 8%, xyz:SMH 6%, xyz:GEV 6%, xyz:USAR 6%, xyz:XLE 5%, xyz:URNM 5% | 65% | C |
| 18 | UBS 100 Index-Fund Switzerland (CHF) Q | `CH0203277022` | Swiss equity | xyz:SP500 100% | 0% | A |
| 19 | UBS (CH) Equity Fund - Swiss High Dividend (CHF) Q-acc | `CH1391066490` | Swiss equity | xyz:SP500 100% | 0% | A |
| 20 | UBS (Lux) Equity Fund - Sustainable Health Transformation (USD) (CHF hedged) Q | `LU2402148659` | Thematic | xyz:SP500 40%, xyz:LLY 30%, xyz:MRNA 20%, xyz:HIMS 10% | 60% | A |
| 21 | UBS (Lux) Equity SICAV - Global High Dividend (USD) (CHF hedged) Q | `LU2049075521` | Thematic | xyz:SP500 45%, xyz:XLE 10%, xyz:MSFT 8%, xyz:AAPL 8%, xyz:GOOGL 6%, xyz:CVX 6%, xyz:IBM 6%, xyz:COST 6%, xyz:ASML 5% | 55% | C |
| 22 | UBS (Lux) Equity SICAV - European Income Opportunity (EUR) (CHF hedged) Q | `LU2464499966` | Thematic | xyz:SP500 55%, xyz:ASML 35%, xyz:NOK 10% | 30% | C |
| 23 | UBS (Lux) Equity SICAV - US Income (USD) (CHF hedged) QL-acc | `LU2049085249` | Thematic | xyz:SP500 55%, xyz:MSFT 8%, xyz:AAPL 8%, xyz:XLE 8%, xyz:GOOGL 6%, xyz:IBM 6%, xyz:COST 5%, xyz:CVX 4% | 85% | B |
| 24 | UBS ETF (CH) - SMI® | `CH1447931341` | Swiss equity | xyz:SP500 100% | 0% | A |
| 25 | UBS Core - SPI® ETF | `CH1416135338` | Swiss equity | xyz:SP500 100% | 0% | A |
| 26 | UBS Core S&P 500 UCITS ETF | `IE00BD34DB16` | Index | xyz:SP500 100% | 100% | A |
| 27 | UBS (Lux) Fund Solutions - MSCI Europe UCITS ETF (hedged to CHF) | `LU1589327680` | Index | xyz:SP500 60%, xyz:ASML 30%, xyz:NOK 10% | 30% | C |
| 28 | UBS ETF (CH) – MSCI Switzerland IMI Dividend Screened | `CH1416135353` | Swiss equity | xyz:SP500 100% | 0% | A |
| 29 | UBS MSCI World Socially Responsible UCITS ETF | `IE00BK72HT65` | Index | xyz:SP500 78%, xyz:EWJ 7%, xyz:ASML 6%, xyz:EWY 5%, xyz:BABA 4% | 90% | B |
| 30 | UBS ETF (CH) - SPI® ESG | `CH1416135346` | Swiss equity | xyz:SP500 100% | 0% | A |
| 31 | UBS ETF (IE) S&P 500 Scored & Screened UCITS ETF | `IE00BHXMHN35` | Index | xyz:SP500 100% | 100% | A |
| 32 | UBS Core MSCI World UCITS ETF | `IE000N6LBS91` | Index | xyz:SP500 78%, xyz:EWJ 7%, xyz:ASML 6%, xyz:EWY 5%, xyz:BABA 4% | 90% | B |

## Fund-by-fund rationale

**1. UBS (Lux) Strategy Fund - Fixed Income (CHF) Q-acc (UBF)** · `LU1240799699`  
No CHF, EUR or corporate bond market exists on Hyperliquid. USDC stands in for the capital-preservation sleeve, xyz:TLT contributes US duration only. Credit spread and CHF hedging are absent.

**2. UBS (Lux) Strategy SICAV - Income (CHF) Q-acc (UBF)** · `LU1240800968`  
The 40% equity sleeve maps well; the 60% income sleeve (CHF-hedged bonds) collapses into USDC plus a TLT duration overlay.

**3. UBS (CH) Equity Fund - Mid Caps Switzerland (CHF) QL** · `CH0560899525`  
No Swiss equity is tradable on Hyperliquid (no NESN, ROG, NOVN, UBSG, ZURN). The build holds xyz:SP500 only as an equity-beta proxy, so none of the NAV is genuinely replicated. Swiss mid caps are the least replicable segment of the whole range.

**4. UBS (Lux) Strategy Fund - Yield (CHF) Q-acc** · `LU0941351768`  
The 25/75 structure is reproduced; the bond side loses CHF-hedged duration and credit.

**5. UBS (Lux) Strategy Fund - Balanced (CHF) Q-acc** · `LU0941351099`  
50/50 reproduced with a US-tilted global equity sleeve; the CHF hedge is unavailable.

**6. UBS (Lux) Strategy Fund - Growth (CHF) Q-acc** · `LU0941351412`  
75/25 reproduced; the equity sleeve is liquid, the bond sleeve is a USDC/TLT proxy.

**7. UBS (Lux) Strategy Fund - Equity (CHF) Q-acc** · `LU1240799343`  
Effectively a global equity fund and the highest-fidelity multi-asset in the range; only CHF share-class hedging is lost.

**8. UBS (CH) Vitainvest - Passive 25 Sustainable Q** · `CH1110134124`  
Identical 25/75 skeleton to the active Yield fund; the ESG exclusion screen cannot be applied on Hyperliquid.

**9. UBS (CH) Vitainvest - Passive 50 Sustainable Q** · `CH1110134132`  
50/50 reproduced; ESG screen not implementable.

**10. UBS (CH) Vitainvest - Passive 75 Sustainable Q** · `CH1110134140`  
75/25 reproduced; ESG screen not implementable.

**11. UBS (CH) Vitainvest - Passive 100 Sustainable Q** · `CH1110134157`  
Global equity beta is fully available; only the sustainability screen is lost.

**12. UBS (CH) Suisse - 25 (CHF) Q-dist** · `CH0210193519`  
The Swiss home bias (~60% of the equity part) has no Hyperliquid market; only the global sleeve is replicated.

**13. UBS (CH) Suisse - 45 (CHF) Q-dist** · `CH0210193535`  
Swiss equity plus CHF bonds dominate this fund, so only the global equity sleeve is replicable.

**14. UBS (CH) Suisse - 65 (CHF) Q-dist** · `CH0210193584`  
The Swiss equity core is unavailable; the global 40% of the equity sleeve is replicated.

**15. UBS (Lux) Equity SICAV - Long Term Themes (USD) (CHF hedged) Q** · `LU1323611423`  
Megatrends spliced onto HL's liquid growth, memory/semis, biotech and clean-power names; the fund's private and VC sleeves are not tradable.

**16. UBS (Lux) Key Selection SICAV - Digital Transformation Themes** · `LU2054466995`  
Best-covered thematic fund: platforms, software and semis all exist as liquid single-name perps.

**17. UBS (Lux) Equity SICAV - Active Climate Aware (USD) (CHF hedged) Q** · `LU2408499411`  
Climate tilt via semis, electrification (BE, GEV), rare earths (USAR) and uranium (URNM); wind and solar pure-plays are missing. Several legs are thin.

**18. UBS 100 Index-Fund Switzerland (CHF) Q** · `CH0203277022`  
No Swiss equity is tradable on Hyperliquid (no NESN, ROG, NOVN, UBSG, ZURN). The build holds xyz:SP500 only as an equity-beta proxy, so none of the NAV is genuinely replicated.

**19. UBS (CH) Equity Fund - Swiss High Dividend (CHF) Q-acc** · `CH1391066490`  
No Swiss equity is tradable on Hyperliquid (no NESN, ROG, NOVN, UBSG, ZURN). The build holds xyz:SP500 only as an equity-beta proxy, so none of the NAV is genuinely replicated. The dividend factor is a second, separate gap.

**20. UBS (Lux) Equity Fund - Sustainable Health Transformation (USD) (CHF hedged) Q** · `LU2402148659`  
Obesity, biotech and digital health are covered by LLY, MRNA and HIMS; med-tech and tools names are not listed.

**21. UBS (Lux) Equity SICAV - Global High Dividend (USD) (CHF hedged) Q** · `LU2049075521`  
Dividend factor approximated with energy majors, staples and mature tech. HL lists the single names but not the yields; several legs are thin.

**22. UBS (Lux) Equity SICAV - European Income Opportunity (EUR) (CHF hedged) Q** · `LU2464499966`  
Europe is HL's thinnest region: only ASML and Nokia are listed, everything else falls back to US beta. Both European legs are thinly traded.

**23. UBS (Lux) Equity SICAV - US Income (USD) (CHF hedged) QL-acc** · `LU2049085249`  
Well covered: index core plus the dividend-heavy US names HL lists; only the realised-income property is missing.

**24. UBS ETF (CH) - SMI®** · `CH1447931341`  
No Swiss equity is tradable on Hyperliquid (no NESN, ROG, NOVN, UBSG, ZURN). The build holds xyz:SP500 only as an equity-beta proxy, so none of the NAV is genuinely replicated.

**25. UBS Core - SPI® ETF** · `CH1416135338`  
No Swiss equity is tradable on Hyperliquid (no NESN, ROG, NOVN, UBSG, ZURN). The build holds xyz:SP500 only as an equity-beta proxy, so none of the NAV is genuinely replicated. The small/mid-cap half of the SPI is a second gap.

**26. UBS Core S&P 500 UCITS ETF** · `IE00BD34DB16`  
Exact match: xyz:SP500 is a 50x S&P 500 index perp with roughly $360m open interest.

**27. UBS (Lux) Fund Solutions - MSCI Europe UCITS ETF (hedged to CHF)** · `LU1589327680`  
MSCI Europe is not listed; ASML and Nokia are the only liquid European names and the CHF hedge is unavailable.

**28. UBS ETF (CH) – MSCI Switzerland IMI Dividend Screened** · `CH1416135353`  
No Swiss equity is tradable on Hyperliquid (no NESN, ROG, NOVN, UBSG, ZURN). The build holds xyz:SP500 only as an equity-beta proxy, so none of the NAV is genuinely replicated.

**29. UBS MSCI World Socially Responsible UCITS ETF** · `IE00BK72HT65`  
Global equity is well covered; only the SRI exclusion screen is lost.

**30. UBS ETF (CH) - SPI® ESG** · `CH1416135346`  
No Swiss equity is tradable on Hyperliquid (no NESN, ROG, NOVN, UBSG, ZURN). The build holds xyz:SP500 only as an equity-beta proxy, so none of the NAV is genuinely replicated.

**31. UBS ETF (IE) S&P 500 Scored & Screened UCITS ETF** · `IE00BHXMHN35`  
Same index exposure as the plain S&P 500 ETF; the ESG weighting scheme is not reproducible.

**32. UBS Core MSCI World UCITS ETF** · `IE000N6LBS91`  
78% US plus Japan, Korea and Europe satellites; small caps and Switzerland are missing.

## What Hyperliquid cannot express

| Missing exposure | Funds affected | Closest available substitute |
|---|---|---|
| Swiss equities (Nestlé, Roche, Novartis, UBS, Zurich) | 3, 18, 19, 24, 25, 28, 30 | none — `xyz:SP500` beta only |
| CHF cash and CHF bonds | 1–14 | `USDC` + `xyz:TLT` |
| Corporate credit, EUR duration | 1, 2, 4–14 | `xyz:TLT` (US duration only) |
| European single names | 22, 27 | `xyz:ASML`, `xyz:NOK` |
| ESG / SRI screens and reweightings | 8–11, 29, 30, 31 | nothing — only the underlying beta |
| Dividend and coupon income | 19, 21, 23 | price exposure only |
| Swiss small and mid caps | 3, 25 | none |
| Private / VC sleeves | 15 | `xyz:SPCX`, `vntl:OPENAI` (both thin) |

## Structural notes

1. **No CHF.** Hyperliquid lists EUR, JPY, GBP and KRW perps but no CHF market, so every CHF-hedged share class would carry unhedged USD/CHF risk. This is the single largest unfixable difference.
2. **Perps, not funds.** Positions pay or receive funding, have no dividends or coupons, and need roll/path maintenance. Even where the price exposure matches, total return differs.
3. **Liquidity is concentrated.** Roughly 90% of volume sits in ~20 markets: BTC, ETH, HYPE, ZEC, SP500, XYZ100, GOLD, SILVER, CL, BRENTOIL and a handful of megacap equities. Thematic and European legs are thin.
4. **Coverage summary.** 7 funds are ≥85% replicable (26, 31 at 100%; 7, 11 at 98%; 29, 32 at 90%; 23 at 85%), 10 sit between 40% and 75%, and 15 are below 40% — 8 of those are Swiss equity funds Hyperliquid simply cannot express.

*Data: Hyperliquid `info` API, 2 Nov 2026. Fund list: UBS key4 smart investing (32 entries). Weights are target-exposure proxies built from each mandate's asset mix, not replicas of UBS holdings.*
