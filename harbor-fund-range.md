# The HLX fund range — 21 funds, every constituent listed on Hyperliquid

Same table format as the [UBS key4 fund list](https://www.ubs.com/ch/en/services/investments/fund-account/key4/funds.html), but inverted: instead of taking UBS products and finding Hyperliquid proxies, this is a fund range **designed backwards from the venue** — every holding below is a market you can actually trade on Hyperliquid today (2 Nov 2026 snapshot: 235 core perps, 142 `xyz` HIP-3 markets, 511 spot tokens).

Nothing here needs a custodian, a transfer agent or a Swiss ISIN. Each fund is a weight vector over live perps, settled in USDC, valued off Hyperliquid oracles.

## The list

| Code | Fund | Short name | Theme | Management style | Ccy | Risk | # | Liq |
|---|---|---|---|---|---|---|---|---|
| `HLX-S20` | HLX Strategy Fund - Defensive 20 (USDC) A-acc | Focus - Defensive 20 | Crypto + US equity, capital preservation | Rules-based | USDC | 2 | 8 | A |
| `HLX-S40` | HLX Strategy Fund - Balanced 40 (USDC) A-acc | Focus - Balanced 40 | Crypto + US equity, balanced | Rules-based | USDC | 3 | 8 | A |
| `HLX-S60` | HLX Strategy Fund - Growth 60 (USDC) A-acc | Focus - Growth 60 | Crypto + US equity, growth | Rules-based | USDC | 4 | 8 | A |
| `HLX-S80` | HLX Strategy Fund - Aggressive 80 (USDC) A-acc | Focus - Aggressive 80 | Crypto + US equity, maximum growth | Rules-based | USDC | 5 | 8 | A |
| `HLX-BTC` | HLX Bitcoin Reserve Fund (USDC) A-acc | Bitcoin Reserve | Single-asset bitcoin | Passive | USDC | 6 | 1 | A |
| `HLX-DC10` | HLX Digital Core 10 Fund (USDC) A-acc | Digital Core 10 | Large-cap crypto core | Rules-based | USDC | 6 | 10 | A |
| `HLX-SCP` | HLX Smart Contract Platform Fund (USDC) A-acc | Smart Contract Platforms | Layer-1 platforms | Rules-based | USDC | 6 | 9 | B |
| `HLX-DEFI` | HLX DeFi Blue Chip Fund (USDC) A-acc | DeFi Blue Chips | Decentralised finance protocols | Rules-based | USDC | 7 | 11 | C |
| `HLX-AI` | HLX AI & Compute Fund (USDC) A-acc | AI & Compute | Decentralised AI infrastructure | Rules-based | USDC | 7 | 10 | C |
| `HLX-PRIV` | HLX Privacy Fund (USDC) A-acc | Privacy & Censorship Resistance | Privacy coins | Rules-based | USDC | 7 | 4 | B |
| `HLX-EQ500` | HLX US 500 Index Fund (USDC) A-acc | US 500 Index | US large-cap index | Passive index | USDC | 5 | 1 | A |
| `HLX-MEGA` | HLX US Mega Cap Tech Fund (USDC) A-acc | US Mega Cap Tech | US technology leaders | Rules-based | USDC | 5 | 10 | A |
| `HLX-SEMI` | HLX Semiconductors & Memory Fund (USDC) A-acc | Semis & Memory | Semiconductor supply chain | Rules-based | USDC | 6 | 10 | B |
| `HLX-GLBEQ` | HLX Global Equity Fund (USDC) A-acc | Global Equity | Developed and emerging equity | Passive index | USDC | 5 | 6 | B |
| `HLX-JPN` | HLX Japan Equity Fund (USDC) A-acc | Japan Equity | Japanese equity | Rules-based | USDC | 5 | 5 | C |
| `HLX-GOLD` | HLX Gold Fund (USDC) A-acc | Gold | Physical gold | Passive | USDC | 4 | 1 | A |
| `HLX-PMET` | HLX Precious Metals Fund (USDC) A-acc | Precious Metals | Gold, silver, PGMs | Rules-based | USDC | 4 | 4 | B |
| `HLX-ENRG` | HLX Energy Fund (USDC) A-acc | Energy | Crude, gas and energy equity | Rules-based | USDC | 5 | 4 | A |
| `HLX-FUND` | HLX Funding Yield Fund (USDC) A-acc | Funding Yield | Delta-neutral perp funding capture | Actively managed | USDC | 3 | 1 | A |
| `HLX-HYPE` | HLX HYPE Ecosystem Fund (USDC) A-acc | HYPE Ecosystem | Hyperliquid-native assets | Rules-based | USDC | 7 | 2 | B |
| `HLX-MEME` | HLX Meme & Micro Cap Fund (USDC) A-acc | Meme & Micro Cap | High-beta retail tokens | Rules-based | USDC | 7 | 8 | C |

**Columns.** *Risk* maps to a 1–7 SRRI-equivalent scale (1 = cash-like, 7 = concentrated single-theme). *Liq* is the share of NAV sitting in markets that trade over $1m/day: A ≥90%, B ≥70%, C below that — C funds need limit orders and smaller clips. Codes are the fund identifiers; `HLX` is a placeholder for your own brand.

## The funds in detail

### Multi-asset - the risk ladder

**`HLX-S20` · HLX Strategy Fund - Defensive 20 (USDC) A-acc**

*Crypto + US equity, capital preservation · rules-based · benchmark: HLX Defensive composite (20% growth) · rebalancing: quarterly · risk 2/7 · fee 45 bp*

| Constituent | Instrument | Venue | Weight | 24h volume |
|---|---|---|---|---|
| `USDC` | cash / collateral | USDC | 72% | — |
| `xyz:SP500` | xyz perp | HIP-3 · xyz | 12% | $118m |
| `xyz:TLT` | xyz perp | HIP-3 · xyz | 8% | $318k |
| `BTC` | core perp | Hyperliquid | 4% | $1.19bn |
| `ETH` | core perp | Hyperliquid | 2.4% | $421m |
| `SOL` | core perp | Hyperliquid | 0.8% | $240m |
| `HYPE` | core perp | Hyperliquid | 0.4% | $409m |
| `XRP` | core perp | Hyperliquid | 0.4% | $25m |

> Two-thirds of the risk budget sits in USDC; the growth sleeve is 8% crypto core / 12% S&P 500.

**`HLX-S40` · HLX Strategy Fund - Balanced 40 (USDC) A-acc**

*Crypto + US equity, balanced · rules-based · benchmark: HLX Balanced composite (40% growth) · rebalancing: quarterly · risk 3/7 · fee 55 bp*

| Constituent | Instrument | Venue | Weight | 24h volume |
|---|---|---|---|---|
| `USDC` | cash / collateral | USDC | 54% | — |
| `xyz:SP500` | xyz perp | HIP-3 · xyz | 24% | $118m |
| `BTC` | core perp | Hyperliquid | 8% | $1.19bn |
| `xyz:TLT` | xyz perp | HIP-3 · xyz | 6% | $318k |
| `ETH` | core perp | Hyperliquid | 4.8% | $421m |
| `SOL` | core perp | Hyperliquid | 1.6% | $240m |
| `HYPE` | core perp | Hyperliquid | 0.8% | $409m |
| `XRP` | core perp | Hyperliquid | 0.8% | $25m |

> The centre of the range: 16% crypto core, 24% S&P 500, 60% cash plus a short-duration overlay.

**`HLX-S60` · HLX Strategy Fund - Growth 60 (USDC) A-acc**

*Crypto + US equity, growth · rules-based · benchmark: HLX Growth composite (60% growth) · rebalancing: quarterly · risk 4/7 · fee 65 bp*

| Constituent | Instrument | Venue | Weight | 24h volume |
|---|---|---|---|---|
| `xyz:SP500` | xyz perp | HIP-3 · xyz | 36% | $118m |
| `USDC` | cash / collateral | USDC | 36% | — |
| `BTC` | core perp | Hyperliquid | 12% | $1.19bn |
| `ETH` | core perp | Hyperliquid | 7.2% | $421m |
| `xyz:TLT` | xyz perp | HIP-3 · xyz | 4% | $318k |
| `SOL` | core perp | Hyperliquid | 2.4% | $240m |
| `HYPE` | core perp | Hyperliquid | 1.2% | $409m |
| `XRP` | core perp | Hyperliquid | 1.2% | $25m |

> 60% growth split 40/60 crypto-to-equity, so crypto contributes ~24% of NAV.

**`HLX-S80` · HLX Strategy Fund - Aggressive 80 (USDC) A-acc**

*Crypto + US equity, maximum growth · rules-based · benchmark: HLX Aggressive composite (80% growth) · rebalancing: quarterly · risk 5/7 · fee 75 bp*

| Constituent | Instrument | Venue | Weight | 24h volume |
|---|---|---|---|---|
| `xyz:SP500` | xyz perp | HIP-3 · xyz | 48% | $118m |
| `USDC` | cash / collateral | USDC | 18% | — |
| `BTC` | core perp | Hyperliquid | 16% | $1.19bn |
| `ETH` | core perp | Hyperliquid | 9.6% | $421m |
| `SOL` | core perp | Hyperliquid | 3.2% | $240m |
| `xyz:TLT` | xyz perp | HIP-3 · xyz | 2% | $318k |
| `HYPE` | core perp | Hyperliquid | 1.6% | $409m |
| `XRP` | core perp | Hyperliquid | 1.6% | $25m |

> 32% crypto core and 48% S&P 500 - the top of the ladder before single-theme funds.

### Crypto core and thematic

**`HLX-BTC` · HLX Bitcoin Reserve Fund (USDC) A-acc**

*Single-asset bitcoin · passive · benchmark: BTC-USD spot · rebalancing: none (buy and hold) · risk 6/7 · fee 40 bp*

| Constituent | Instrument | Venue | Weight | 24h volume |
|---|---|---|---|---|
| `BTC` | core perp | Hyperliquid | 100% | $1.19bn |

> The only single-asset fund in the range; 40x max leverage exists on the venue but the fund is ungeared.

**`HLX-DC10` · HLX Digital Core 10 Fund (USDC) A-acc**

*Large-cap crypto core · rules-based · benchmark: HLX Digital Core 10 composite · rebalancing: quarterly · risk 6/7 · fee 60 bp*

| Constituent | Instrument | Venue | Weight | 24h volume |
|---|---|---|---|---|
| `BTC` | core perp | Hyperliquid | 30% | $1.19bn |
| `ETH` | core perp | Hyperliquid | 25% | $421m |
| `SOL` | core perp | Hyperliquid | 12% | $240m |
| `HYPE` | core perp | Hyperliquid | 8% | $409m |
| `XRP` | core perp | Hyperliquid | 7% | $25m |
| `BNB` | core perp | Hyperliquid | 5% | $19m |
| `DOGE` | core perp | Hyperliquid | 4% | $7m |
| `ZEC` | core perp | Hyperliquid | 4% | $296m |
| `LINK` | core perp | Hyperliquid | 3% | $6m |
| `AVAX` | core perp | Hyperliquid | 2% | $6m |

> The crypto equivalent of a large-cap index fund - ten names, all top-15 by Hyperliquid volume.

**`HLX-SCP` · HLX Smart Contract Platform Fund (USDC) A-acc**

*Layer-1 platforms · rules-based · benchmark: HLX SCP composite · rebalancing: quarterly · risk 6/7 · fee 65 bp*

| Constituent | Instrument | Venue | Weight | 24h volume |
|---|---|---|---|---|
| `ETH` | core perp | Hyperliquid | 30% | $421m |
| `SOL` | core perp | Hyperliquid | 25% | $240m |
| `SUI` | core perp | Hyperliquid | 10% | $6m |
| `APT` | core perp | Hyperliquid | 8% | $1m |
| `SEI` | core perp | Hyperliquid | 7% | $973k |
| `NEAR` | core perp | Hyperliquid | 7% | $94m |
| `AVAX` | core perp | Hyperliquid | 6% | $6m |
| `TIA` | core perp | Hyperliquid | 4% | $997k |
| `INJ` | core perp | Hyperliquid | 3% | $2m |

> Nine L1s, ETH and SOL carry 55%. Every name has a Hyperliquid perp with at least 10x max leverage.

**`HLX-DEFI` · HLX DeFi Blue Chip Fund (USDC) A-acc**

*Decentralised finance protocols · rules-based · benchmark: HLX DeFi composite · rebalancing: quarterly · risk 7/7 · fee 75 bp*

| Constituent | Instrument | Venue | Weight | 24h volume |
|---|---|---|---|---|
| `UNI` | core perp | Hyperliquid | 14% | $12m |
| `AAVE` | core perp | Hyperliquid | 14% | $16m |
| `CRV` | core perp | Hyperliquid | 10% | $4m |
| `LDO` | core perp | Hyperliquid | 10% | $1m |
| `PENDLE` | core perp | Hyperliquid | 10% | $777k |
| `MORPHO` | core perp | Hyperliquid | 10% | $1m |
| `ENA` | core perp | Hyperliquid | 8% | $20m |
| `JUP` | core perp | Hyperliquid | 8% | $769k |
| `DYDX` | core perp | Hyperliquid | 6% | $100k |
| `GMX` | core perp | Hyperliquid | 5% | $234k |
| `COMP` | core perp | Hyperliquid | 5% | $146k |

> Eleven protocol tokens across DEXs, lending, liquid staking and perps. Highest idiosyncratic risk in the range.

**`HLX-AI` · HLX AI & Compute Fund (USDC) A-acc**

*Decentralised AI infrastructure · rules-based · benchmark: HLX AI composite · rebalancing: quarterly · risk 7/7 · fee 80 bp*

| Constituent | Instrument | Venue | Weight | 24h volume |
|---|---|---|---|---|
| `TAO` | core perp | Hyperliquid | 20% | $3m |
| `RENDER` | core perp | Hyperliquid | 15% | $267k |
| `FET` | core perp | Hyperliquid | 12% | $406k |
| `NEAR` | core perp | Hyperliquid | 10% | $94m |
| `ICP` | core perp | Hyperliquid | 10% | $517k |
| `AR` | core perp | Hyperliquid | 8% | $368k |
| `GRASS` | core perp | Hyperliquid | 8% | $2m |
| `WLD` | core perp | Hyperliquid | 7% | $6m |
| `VIRTUAL` | core perp | Hyperliquid | 5% | $505k |
| `AIXBT` | core perp | Hyperliquid | 5% | $60k |

> Compute, data and agent tokens. Overlaps NEAR with the smart-contract fund, which is intentional.

**`HLX-PRIV` · HLX Privacy Fund (USDC) A-acc**

*Privacy coins · rules-based · benchmark: HLX Privacy composite · rebalancing: semi-annual · risk 7/7 · fee 80 bp*

| Constituent | Instrument | Venue | Weight | 24h volume |
|---|---|---|---|---|
| `ZEC` | core perp | Hyperliquid | 40% | $296m |
| `XMR` | core perp | Hyperliquid | 30% | $36m |
| `DASH` | core perp | Hyperliquid | 15% | $291k |
| `ZEN` | core perp | Hyperliquid | 15% | $80k |

> A concentrated four-name basket; ZEC and XMR alone are ~70% and both are deep enough for institutional clips.

### Equity - index, US, Japan

**`HLX-EQ500` · HLX US 500 Index Fund (USDC) A-acc**

*US large-cap index · passive index · benchmark: S&P 500 · rebalancing: quarterly · risk 5/7 · fee 25 bp*

| Constituent | Instrument | Venue | Weight | 24h volume |
|---|---|---|---|---|
| `xyz:SP500` | xyz perp | HIP-3 · xyz | 100% | $118m |

> One line, one index perp. The cleanest vehicle on the venue: 50x leverage available, ~$359m open interest.

**`HLX-MEGA` · HLX US Mega Cap Tech Fund (USDC) A-acc**

*US technology leaders · rules-based · benchmark: HLX Mega Cap composite · rebalancing: quarterly · risk 5/7 · fee 55 bp*

| Constituent | Instrument | Venue | Weight | 24h volume |
|---|---|---|---|---|
| `xyz:NVDA` | xyz perp | HIP-3 · xyz | 16% | $26m |
| `xyz:MSFT` | xyz perp | HIP-3 · xyz | 12% | $3m |
| `xyz:AAPL` | xyz perp | HIP-3 · xyz | 12% | $11m |
| `xyz:GOOGL` | xyz perp | HIP-3 · xyz | 11% | $40m |
| `xyz:META` | xyz perp | HIP-3 · xyz | 10% | $7m |
| `xyz:AMZN` | xyz perp | HIP-3 · xyz | 10% | $6m |
| `xyz:AVGO` | xyz perp | HIP-3 · xyz | 8% | $1m |
| `xyz:MU` | xyz perp | HIP-3 · xyz | 8% | $69m |
| `xyz:ORCL` | xyz perp | HIP-3 · xyz | 7% | $3m |
| `xyz:PLTR` | xyz perp | HIP-3 · xyz | 6% | $4m |

> Ten names, each a liquid single-name perp. Weights are a liquidity-aware take on megacap concentration.

**`HLX-SEMI` · HLX Semiconductors & Memory Fund (USDC) A-acc**

*Semiconductor supply chain · rules-based · benchmark: HLX Semiconductor composite · rebalancing: quarterly · risk 6/7 · fee 60 bp*

| Constituent | Instrument | Venue | Weight | 24h volume |
|---|---|---|---|---|
| `xyz:MU` | xyz perp | HIP-3 · xyz | 18% | $69m |
| `xyz:NVDA` | xyz perp | HIP-3 · xyz | 16% | $26m |
| `xyz:SKHX` | xyz perp | HIP-3 · xyz | 12% | $283m |
| `xyz:AMD` | xyz perp | HIP-3 · xyz | 10% | $8m |
| `xyz:AVGO` | xyz perp | HIP-3 · xyz | 10% | $1m |
| `xyz:ASML` | xyz perp | HIP-3 · xyz | 8% | $400k |
| `xyz:TSM` | xyz perp | HIP-3 · xyz | 8% | $807k |
| `xyz:SNDK` | xyz perp | HIP-3 · xyz | 6% | $80m |
| `xyz:MRVL` | xyz perp | HIP-3 · xyz | 6% | $8m |
| `xyz:ARM` | xyz perp | HIP-3 · xyz | 6% | $1m |

> Heavy memory exposure (MU, SK Hynix, SanDisk) because that is where Hyperliquid's equity depth sits.

**`HLX-GLBEQ` · HLX Global Equity Fund (USDC) A-acc**

*Developed and emerging equity · passive index · benchmark: MSCI World (approx.) · rebalancing: quarterly · risk 5/7 · fee 35 bp*

| Constituent | Instrument | Venue | Weight | 24h volume |
|---|---|---|---|---|
| `xyz:SP500` | xyz perp | HIP-3 · xyz | 70% | $118m |
| `xyz:EWJ` | xyz perp | HIP-3 · xyz | 8% | $677k |
| `xyz:ASML` | xyz perp | HIP-3 · xyz | 7% | $400k |
| `xyz:EWY` | xyz perp | HIP-3 · xyz | 6% | $45m |
| `xyz:BABA` | xyz perp | HIP-3 · xyz | 5% | $3m |
| `xyz:EWZ` | xyz perp | HIP-3 · xyz | 4% | $1m |

> 78% US with Japan, Korea, Europe and EM satellites - the closest Hyperliquid analogue to MSCI World.

**`HLX-JPN` · HLX Japan Equity Fund (USDC) A-acc**

*Japanese equity · rules-based · benchmark: HLX Japan composite · rebalancing: quarterly · risk 5/7 · fee 60 bp*

| Constituent | Instrument | Venue | Weight | 24h volume |
|---|---|---|---|---|
| `xyz:EWJ` | xyz perp | HIP-3 · xyz | 40% | $677k |
| `xyz:JP225` | xyz perp | HIP-3 · xyz | 30% | $2m |
| `xyz:SOFTBANK` | xyz perp | HIP-3 · xyz | 12% | $452k |
| `xyz:KIOXIA` | xyz perp | HIP-3 · xyz | 10% | $13m |
| `xyz:IBIDEN` | xyz perp | HIP-3 · xyz | 8% | $0 |

> Japan is the deepest non-US equity pocket on the venue: an ETF, an index and three single names.

### Commodities

**`HLX-GOLD` · HLX Gold Fund (USDC) A-acc**

*Physical gold · passive · benchmark: LBMA gold (via oracle) · rebalancing: none (buy and hold) · risk 4/7 · fee 30 bp*

| Constituent | Instrument | Venue | Weight | 24h volume |
|---|---|---|---|---|
| `xyz:GOLD` | xyz perp | HIP-3 · xyz | 100% | $42m |

> One perp, 25x leverage available, ~$315m open interest - the second-deepest market on the venue.

**`HLX-PMET` · HLX Precious Metals Fund (USDC) A-acc**

*Gold, silver, PGMs · rules-based · benchmark: HLX Precious Metals composite · rebalancing: quarterly · risk 4/7 · fee 45 bp*

| Constituent | Instrument | Venue | Weight | 24h volume |
|---|---|---|---|---|
| `xyz:GOLD` | xyz perp | HIP-3 · xyz | 55% | $42m |
| `xyz:SILVER` | xyz perp | HIP-3 · xyz | 30% | $104m |
| `xyz:PLATINUM` | xyz perp | HIP-3 · xyz | 8% | $959k |
| `xyz:PALLADIUM` | xyz perp | HIP-3 · xyz | 7% | $447k |

> Adds silver and the PGMs to the gold fund; silver is the liquid leg, platinum and palladium are thin.

**`HLX-ENRG` · HLX Energy Fund (USDC) A-acc**

*Crude, gas and energy equity · rules-based · benchmark: HLX Energy composite · rebalancing: quarterly · risk 5/7 · fee 50 bp*

| Constituent | Instrument | Venue | Weight | 24h volume |
|---|---|---|---|---|
| `xyz:BRENTOIL` | xyz perp | HIP-3 · xyz | 40% | $92m |
| `xyz:CL` | xyz perp | HIP-3 · xyz | 30% | $166m |
| `xyz:NATGAS` | xyz perp | HIP-3 · xyz | 20% | $5m |
| `xyz:XLE` | xyz perp | HIP-3 · xyz | 10% | $129k |

> Brent and WTI carry the fund; natural gas and the energy-equity sleeve are small on purpose.

### Yield - funding capture

**`HLX-FUND` · HLX Funding Yield Fund (USDC) A-acc**

*Delta-neutral perp funding capture · actively managed · benchmark: USDC + realised funding · rebalancing: continuous · risk 3/7 · fee 50 bp*

| Constituent | Instrument | Venue | Weight | 24h volume |
|---|---|---|---|---|
| `USDC` | cash / collateral | USDC | 100% | — |

> Not a directional basket: 100% USDC collateral, long spot BTC/ETH against equal short perp notional. Return is the funding rate, not price. The only fund here that resembles UBS's bond funds.

### Crypto satellites

**`HLX-HYPE` · HLX HYPE Ecosystem Fund (USDC) A-acc**

*Hyperliquid-native assets · rules-based · benchmark: HLX HYPE composite · rebalancing: quarterly · risk 7/7 · fee 70 bp*

| Constituent | Instrument | Venue | Weight | 24h volume |
|---|---|---|---|---|
| `HYPE` | core perp | Hyperliquid | 80% | $409m |
| `PURR` | core perp | Hyperliquid | 20% | $544k |

> The only fund that could not exist on another venue: the exchange token plus its most liquid ecosystem token. HFUN is listed but excluded at ~$10k/day.

**`HLX-MEME` · HLX Meme & Micro Cap Fund (USDC) A-acc**

*High-beta retail tokens · rules-based · benchmark: HLX Meme composite · rebalancing: monthly · risk 7/7 · fee 90 bp*

| Constituent | Instrument | Venue | Weight | 24h volume |
|---|---|---|---|---|
| `DOGE` | core perp | Hyperliquid | 25% | $7m |
| `kPEPE` | core perp | Hyperliquid | 15% | $21m |
| `WIF` | core perp | Hyperliquid | 12% | $391k |
| `FARTCOIN` | core perp | Hyperliquid | 12% | $2m |
| `POPCAT` | core perp | Hyperliquid | 10% | $114k |
| `kBONK` | core perp | Hyperliquid | 10% | $337k |
| `kSHIB` | core perp | Hyperliquid | 8% | $266k |
| `PENGU` | core perp | Hyperliquid | 8% | $464k |

> Size-capped at 5% of any portfolio. Liquid at the top (DOGE, kPEPE) and thin at the tail, which is why this fund grades C.


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
