import json, os, datetime as dt
from docx import Document
from docx.shared import Pt, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT

FUNDS = {f["code"]: f for f in json.load(open("harbor_fund_range.json", encoding="utf-8"))}
PERF = {r["code"]: r for r in json.load(open("perf.json", encoding="utf-8"))}
HL = json.load(open("work/hl_raw.json", encoding="utf-8"))
core = {}
for u, c in zip(HL["meta"]["universe"], HL["ctxs"][1]):
    try: core[u["name"]] = float(c.get("dayNtlVlm") or 0)
    except Exception: core[u["name"]] = 0.0
SPOT = {}
for s in json.load(open("work/hl_spot_ctxs.json", encoding="utf-8")):
    SPOT[s["base"]] = max(SPOT.get(s["base"], 0), s["vol"] or 0)
XYZ = {r["name"].split(":", 1)[1]: r["vol24h"] for r in json.load(open("work/hl_hip3_ctxs.json", encoding="utf-8"))["xyz"]}

ASOF = "2 November 2026"
OUT = "work/docx"
os.makedirs(OUT, exist_ok=True)

def inst(sym):
    if sym == "USDC": return "cash collateral", "Hyperliquid"
    if sym in core: return "perpetual", "Hyperliquid core"
    if sym.startswith("xyz:"): return "perpetual", "Hyperliquid HIP-3 (xyz)"
    return "spot", "Hyperliquid"

def adtv(sym):
    if sym == "USDC": return "—"
    v = core.get(sym) or XYZ.get(sym.split(":",1)[-1], 0) or SPOT.get(sym, 0)
    if v >= 1e9: return f"${v/1e9:.2f}bn"
    if v >= 1e6: return f"${v/1e6:,.0f}m"
    if v >= 1e3: return f"${v/1e3:,.0f}k"
    return f"${v:,.0f}"

def fmt(v, suffix="%"):
    return "n/a" if v is None else f"{v:+.1f}{suffix}"

def base_doc(name, subtitle):
    d = Document()
    st = d.styles["Normal"]
    st.font.name = "Calibri"; st.font.size = Pt(9)
    st.paragraph_format.space_after = Pt(2.5); st.paragraph_format.space_before = Pt(0)
    st.paragraph_format.line_spacing = 1.0
    for s in d.sections:
        s.top_margin = Cm(1.4); s.bottom_margin = Cm(1.2)
        s.left_margin = Cm(1.7); s.right_margin = Cm(1.7)
    p = d.add_paragraph()
    r = p.add_run("HLX FUND RANGE")
    r.font.size = Pt(8); r.font.bold = True; r.font.color.rgb = RGBColor(0x88, 0x88, 0x88)
    h = d.add_paragraph()
    r = h.add_run(name); r.font.size = Pt(16); r.font.bold = True
    s = d.add_paragraph()
    r = s.add_run(subtitle); r.font.size = Pt(9); r.font.color.rgb = RGBColor(0x66, 0x66, 0x66)
    d.add_paragraph()
    return d

def kv_table(d, rows, widths=(5.0, 11.0)):
    t = d.add_table(rows=0, cols=2)
    t.style = "Table Grid"
    for k, v in rows:
        cells = t.add_row().cells
        cells[0].text = k; cells[1].text = str(v)
        cells[0].paragraphs[0].runs[0].font.bold = True
    for row in t.rows:
        row.cells[0].width = Cm(widths[0]); row.cells[1].width = Cm(widths[1])
    d.add_paragraph()
    return t

def table(d, headers, rows, widths=None):
    t = d.add_table(rows=1, cols=len(headers))
    t.style = "Table Grid"
    t.alignment = WD_TABLE_ALIGNMENT.LEFT
    for i, h in enumerate(headers):
        c = t.rows[0].cells[i]; c.text = h
        c.paragraphs[0].runs[0].font.bold = True
    for r in rows:
        cells = t.add_row().cells
        for i, v in enumerate(r):
            cells[i].text = str(v)
    d.add_paragraph()
    return t

DISCLAIMER = ("This document is a simulated fund factsheet produced for research and demonstration purposes. The HLX funds are "
              "not registered collective investment schemes, are not offered or sold to the public, and have no custodian, "
              "transfer agent or prospectus filed with any regulator. Performance shown is a backtest of the stated target "
              "weights applied to historical Hyperliquid market prices and does not represent the return of any actual "
              f"portfolio; past performance does not predict future results. Data as of {ASOF}.")

# ---------------- factsheets ----------------
for code, f in FUNDS.items():
    p = PERF[code]
    d = base_doc(f["name"], f"{code}  ·  Currency: USDC  ·  Factsheet as of {ASOF}")

    d.add_paragraph("Fund at a glance")
    nav = 100 * (1 + (p["since"]["value"] / 100)) if p.get("since") else 100.0
    kv_table(d, [
        ("Fund code", code),
        ("ISIN", "not registered"),
        ("Currency / settlement", "USDC"),
        ("Domicile / venue", "Hyperliquid (on-chain), HIP-3 markets where applicable"),
        ("Legal form", "Open-ended tokenised strategy (no fund vehicle)"),
        ("Inception (history start)", p.get("history_start") or "n/a"),
        ("NAV per unit", f"{nav:,.2f} USDC" if p.get("since") else "n/a"),
        ("Fund size", "n/a — not launched"),
        ("Benchmark", f["benchmark"]),
        ("Management style", f["style"]),
        ("Risk indicator", f"{f['risk']} / 7"),
        ("Ongoing charges (illustrative)", f"{f['fee_bps']} bp"),
        ("Rebalancing", f["rebalance"]),
        ("Valuation", "Hyperliquid oracle marks, continuous"),
        ("Number of holdings", f["n"]),
    ])

    d.add_paragraph("Performance — gross simulated returns, USDC terms")
    w = p["windows"]
    table(d, ["", "1M", "3M", "YTD", "1Y", "Since listing"],
          [["Fund"] + [fmt(w[k]["value"]) for k in ("1M", "3M", "YTD", "1Y")] + [fmt(p["since"]["value"] if p.get("since") else None)]],
          )
    note = []
    by_case = {}
    for k in ("1M", "3M", "YTD", "1Y"):
        if w[k]["value"] is None and w[k].get("missing"):
            names = ", ".join(f"{m} (listed {w[k]['firsts'][m]})" for m in w[k]["missing"][:3])
            by_case.setdefault(names, []).append(k)
    for names, labels in by_case.items():
        note.append(f"{' and '.join(labels)}: not available — {names}.")
    if note:
        for line in note:
            q = d.add_paragraph(line); q.runs[0].font.size = Pt(8); q.runs[0].font.italic = True
    if p.get("note"):
        q = d.add_paragraph(p["note"]); q.runs[0].font.size = Pt(8); q.runs[0].font.italic = True
    d.add_paragraph()

    st = p.get("stats")
    if st:
        d.add_paragraph("Risk and return (since inception of the simulated series)")
        table(d, ["Annualised volatility", "Max drawdown", "Annualised return", "Sharpe (rf 3%)", "Model rating"],
              [[f"{st['vol']:.1f}%", f"{st['mdd']:.1f}%", fmt(st["cagr"]), f"{st['sharpe']:.2f}" if st["sharpe"] is not None else "n/a",
                f"{p['rating']} / 5" if p.get("rating") else "n/a"]])
        q = d.add_paragraph("The model rating is computed by HLX from the simulated Sharpe ratio, maximum drawdown and volatility. "
                            "It is not a Morningstar, Lipper or S&P rating; no third-party rating agency covers these strategies.")
        q.runs[0].font.size = Pt(8); q.runs[0].font.italic = True
        d.add_paragraph()

    d.add_paragraph("Portfolio")
    rows = [(sym, inst(sym)[0], inst(sym)[1], f"{wt:g}%", adtv(sym)) for sym, wt in f["holdings"].items()]
    table(d, ["Constituent", "Instrument", "Venue", "Weight", "24h volume"], rows)

    d.add_paragraph("Fund description")
    d.add_paragraph(f["note"])
    d.add_paragraph()
    q = d.add_paragraph(DISCLAIMER); q.runs[0].font.size = Pt(7.5)
    q.runs[0].font.color.rgb = RGBColor(0x55, 0x55, 0x55)
    d.save(os.path.join(OUT, f"factsheet-{code}.docx"))

# ---------------- prospectuses ----------------
RISKS = [
    ("Market risk", "Every constituent is a leveraged derivative on an underlying market. Prices can gap, and the fund has no "
                    "ability to hold cash beyond its stated USDC sleeve."),
    ("Funding risk", "Perpetual futures settle funding every hour. A persistently positive funding rate is a cost for long "
                     "positions and can erode returns independent of price direction."),
    ("Liquidity risk", "Depth on Hyperliquid is concentrated in roughly twenty markets. Positions in thinner legs may only be "
                       "executed with limit orders and at a wider spread than the marks shown."),
    ("Oracle and venue risk", "NAV is derived from Hyperliquid oracle prices. An oracle incident, venue outage, listing "
                              "suspension or delisting would impair valuation and redemption."),
    ("Smart-contract and custody risk", "Assets are held in on-chain accounts controlled by the investor. Loss of keys, a "
                                        "bridge failure or a protocol exploit is not covered by any depositor protection scheme."),
    ("Concentration risk", "Several funds hold more than half of NAV in a single market. Diversification is limited by the "
                           "range of listed instruments, not by policy."),
    ("Model and rebalancing risk", "Weights are rules-based and rebalanced on the stated schedule. Rebalancing trades incur "
                                   "fees and may be executed at unfavourable prices."),
    ("Currency risk", "The funds settle in USDC. Exposure to USD, and therefore to any non-USD investor's home currency, is unhedged."),
]

for code, f in FUNDS.items():
    p = PERF[code]
    d = base_doc(f["name"], f"{code}  ·  Simplified prospectus  ·  {ASOF}")

    d.add_paragraph("1. Important information")
    d.add_paragraph("This document describes a simulated strategy in the HLX fund range. It is not a prospectus within the meaning of "
                    "the Swiss Federal Act on Collective Investment Schemes (CISA), the EU UCITS Directive or any other regime, and no "
                    "regulator has approved it. The strategy is not a collective investment scheme, has no legal personality, no board, "
                    "no auditor and no depositary. Nothing here is an offer, solicitation or recommendation to buy or sell any instrument.")

    d.add_paragraph("2. The fund")
    kv_table(d, [
        ("Name", f["name"]),
        ("Code", code),
        ("Currency", "USDC"),
        ("Inception", p.get("history_start") or "not yet launched"),
        ("Benchmark", f["benchmark"]),
        ("Management style", f["style"]),
        ("Risk indicator", f"{f['risk']} / 7"),
        ("Rebalancing", f["rebalance"]),
        ("Number of holdings", f["n"]),
        ("Ongoing charges (illustrative)", f"{f['fee_bps']} bp"),
    ])

    d.add_paragraph("3. Investment objective")
    d.add_paragraph(f"The fund seeks to track the return of {f['benchmark']} by holding the fixed weight vector set out in the "
                    f"portfolio table, expressed entirely in instruments listed on Hyperliquid. The theme is {f['theme'].lower()}. "
                    f"The fund is {f['style'].lower()} and rebalances {f['rebalance'].lower()}.")

    d.add_paragraph("4. Investment policy")
    d.add_paragraph("The fund holds long positions only, sized to the target weights below, with no leverage at fund level. Weights are "
                    "reconstituted on the rebalancing schedule and drift with performance in between. A maximum of 60% of NAV may be "
                    "held in any single market, except for single-asset funds where 100% is permitted by design. Where a constituent "
                    "is delisted or its market becomes untradable, the weight is redistributed pro rata to the remaining constituents "
                    "at the next rebalancing.")
    table(d, ["Constituent", "Instrument", "Venue", "Weight"],
          [(s, inst(s)[0], inst(s)[1], f"{wt:g}%") for s, wt in f["holdings"].items()])

    d.add_paragraph("5. Risk factors")
    for name, text in RISKS:
        para = d.add_paragraph()
        r = para.add_run(f"{name}. "); r.font.bold = True
        para.add_run(text)

    d.add_paragraph("6. Fees and expenses")
    d.add_paragraph(f"An illustrative management fee of {f['fee_bps']} basis points per annum is deducted from the simulated NAV for "
                    "the purpose of this document. Actual trading costs are Hyperliquid taker and maker fees, funding payments on every "
                    "perpetual leg, and slippage. No entry, exit, performance or distribution fee is modelled. For the avoidance of "
                    "doubt, no fee is actually charged because no fund exists.")

    d.add_paragraph("7. Subscription and redemption")
    d.add_paragraph("Units are created or redeemed at the prevailing NAV by executing the weight vector on-venue. There is no notice "
                    "period, no gate and no dilution levy. Redemption in kind is the only redemption method: the investor receives the "
                    "underlying positions, not USDC, unless they choose to liquidate them on the venue. Settlement is atomic and "
                    "continuous, including at weekends when HIP-3 equity markets remain open while cash equity markets are closed.")

    d.add_paragraph("8. Valuation")
    d.add_paragraph("NAV is calculated as the sum of each constituent's mark price multiplied by its quantity, plus the USDC balance, "
                    "divided by units outstanding. Marks are taken from Hyperliquid oracle prices, which aggregate external venues; "
                    "the venue's published mark price is used where an oracle is unavailable. Valuation is continuous rather than "
                    "once daily, so the NAV a subscriber sees is the NAV they transact at.")

    d.add_paragraph("9. Conflicts of interest and tax")
    d.add_paragraph("The range is published by the same party that defines the weights and the rebalancing rules, and that party may "
                    "hold the same positions. There is no independent oversight, no index administrator and no audit. Tax treatment "
                    "depends on the investor's jurisdiction and on how the venue reports perpetual futures income; no tax advice is given.")

    q = d.add_paragraph(DISCLAIMER); q.runs[0].font.size = Pt(7.5)
    q.runs[0].font.color.rgb = RGBColor(0x55, 0x55, 0x55)
    d.save(os.path.join(OUT, f"prospectus-{code}.docx"))

# ---------------- key information documents ----------------
def risk_bar(level):
    """PRIIPs-style 1-7 strip rendered as text."""
    cells = []
    for i in range(1, 8):
        cells.append(f"[{i}]" if i == level else f" {i} ")
    return " ".join(cells)

for code, f in FUNDS.items():
    p = PERF[code]
    st = p.get("stats") or {}
    d = base_doc(f["name"], f"{code}  ·  Key Information Document  ·  {ASOF}")

    d.add_paragraph("Purpose")
    d.add_paragraph("This document provides you with key information about this investment product. It is not marketing material. "
                    "The information is required by the PRIIPs framework to help you understand the nature, risks, costs, potential "
                    "gains and losses of this product and to help you compare it with other products. It is a simulated document: "
                    "no PRIIPs manufacturer exists for this strategy and no regulator has reviewed it.")

    d.add_paragraph("Product")
    kv_table(d, [
        ("Product name", f["name"]),
        ("Product code", code),
        ("PRIIPs manufacturer", "HLX (publisher of the simulated range)"),
        ("Competent authority", "none — the product is not authorised or supervised"),
        ("Date of this document", ASOF),
        ("Currency", "USDC"),
    ])

    d.add_paragraph("What is this product?")
    table(d, ["Type", "Term", "Objectives"], [[
        "Long-only basket of perpetual futures and cash collateral, traded on Hyperliquid",
        "Open-ended, no maturity",
        f"Track {f['benchmark']} by holding the fixed weights in the portfolio table, {f['style'].lower()} and rebalanced {f['rebalance'].lower()}",
    ]])
    d.add_paragraph(f"Intended retail investor. Investors who understand perpetual futures, funding payments and on-chain settlement, "
                    f"who can bear losses up to the full amount invested, and who are targeting a risk level of {f['risk']} out of 7. "
                    "The product is not suitable for investors who need capital protection or a regular income.")

    d.add_paragraph("What are the risks and what could I get in return?")
    d.add_paragraph(f"Risk indicator: {f['risk']} out of 7  ·  {risk_bar(f['risk'])}")
    d.add_paragraph("1 = lower risk, 7 = higher risk. The indicator assumes you keep the product for at least one year. "
                    "The product has no capital protection; you could lose the entire amount invested.")
    d.add_paragraph("Volatility noted in the simulation: " +
                    (f"{st['vol']:.1f}% annualised, with a maximum drawdown of {st['mdd']:.1f}% since {p.get('history_start')}."
                     if st else "not applicable — this strategy has no price history."))

    base_r = None
    if st and st.get("cagr") is not None:
        base_r = st["cagr"] / 100.0
    elif p.get("since"):
        base_r = p["since"]["value"] / 100.0
    if base_r is not None and st:
        sd = st["vol"] / 100.0
        scen = [("Stress", base_r - 2 * sd), ("Unfavourable", base_r - sd),
                ("Moderate", base_r), ("Favourable", base_r + sd)]
        rows = [[n, f"{(1 + r) * 10000:,.0f} USDC", f"{r * 100:+.1f}%" if r > -1 else "-"] for n, r in scen]
        d.add_paragraph("Performance scenarios (per 10,000 USDC invested, one-year holding period). The scenarios are derived from "
                        "the simulated return and volatility, not from a PRIIPs mandated methodology, and are not a forecast.")
        table(d, ["Scenario", "What you might get back after 1 year", "Average return each year"], rows)
    else:
        d.add_paragraph("Performance scenarios are not shown: this strategy has no price history to derive them from.")

    d.add_page_break()
    d.add_paragraph("What happens if HLX is unable to pay out?")
    d.add_paragraph("There is no pay-out obligation and no compensation scheme. The product is not a deposit and is not covered by any "
                    "depositor guarantee or investor protection fund. You hold the underlying positions in your own on-chain account; "
                    "if a venue, oracle or bridge fails, you bear the loss directly.")

    d.add_paragraph("What are the costs?")
    d.add_paragraph("Illustrative costs for a one-year holding period, per 10,000 USDC invested.")
    ongoing = f["fee_bps"] / 100
    table(d, ["Cost type", "Amount", "Per year", "What it covers"], [
        ["Entry costs", "0.00 USDC", "0.00%", "No entry charge"],
        ["Exit costs", "0.00 USDC", "0.00%", "No exit charge"],
        ["Management fees", f"{ongoing * 100:,.2f} USDC", f"{ongoing:.2f}%", "Illustrative management fee"],
        ["Transaction costs", "10.00 USDC", "0.10%", "Venue taker fees and slippage on rebalancing"],
        ["Performance fees", "0.00 USDC", "0.00%", "None"],
        ["Funding on short legs", "variable", "variable", "Only where a hedge leg exists (HLX-FUND)"],
    ])
    d.add_paragraph(f"Total illustrative ongoing cost per year: {ongoing + 0.10:.2f}% of the amount invested.")

    d.add_paragraph("How long should I hold it and can I take money out early?")
    d.add_paragraph("Recommended holding period: one year or longer. There is no minimum holding period and no lock-up. You can exit at "
                    "any time by unwinding the weight vector on the venue; settlement is atomic and continuous, including at weekends. "
                    "Exiting in a thin market may require limit orders and widen the effective spread.")

    d.add_paragraph("How can I complain?")
    d.add_paragraph("There is no manufacturer, distributor or ombudsman to complain to. This document describes a simulated strategy; "
                    "no contractual relationship exists.")

    d.add_paragraph("Other relevant information")
    d.add_paragraph(f"The full description of the strategy, its risks and its valuation is in the simplified prospectus for {code}, "
                    "and the current target weights and simulated performance are in the factsheet. All figures are simulated, gross of "
                    "the costs shown above, and are not the return of any actual portfolio.")

    q = d.add_paragraph(DISCLAIMER); q.runs[0].font.size = Pt(7.5)
    q.runs[0].font.color.rgb = RGBColor(0x55, 0x55, 0x55)
    d.save(os.path.join(OUT, f"kid-{code}.docx"))

print("docx written:", len(FUNDS) * 3)
print(sorted(os.listdir(OUT))[:6])

