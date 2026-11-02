import json, os, html, datetime as dt

FUNDS = json.load(open("harbor_fund_range.json", encoding="utf-8"))
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
SITE = "site"
os.makedirs(f"{SITE}/funds", exist_ok=True)
os.makedirs(f"{SITE}/assets", exist_ok=True)

CATS = [("Multi-asset", "Multi-asset"), ("Crypto core", "Crypto core"),
        ("Equity", "Equity"), ("Commodities", "Commodities"),
        ("Yield", "Yield"), ("Satellite", "Satellites")]

def adtv(sym):
    if sym == "USDC": return None
    return core.get(sym) or XYZ.get(sym.split(":", 1)[-1], 0) or SPOT.get(sym, 0)

def vol_fmt(v):
    if v is None: return "—"
    if v >= 1e9: return f"${v/1e9:.2f}bn"
    if v >= 1e6: return f"${v/1e6:,.0f}m"
    if v >= 1e3: return f"${v/1e3:,.0f}k"
    return f"${v:,.0f}"

def venue_label(sym):
    if sym == "USDC": return "Cash"
    if sym in core: return "Core perp"
    if sym.startswith("xyz:"): return "HIP-3 · xyz"
    return "Spot"

def pct(v, cls=True):
    if v is None: return '<span class="na">—</span>'
    c = "pos" if v > 0 else ("neg" if v < 0 else "flat")
    return f'<span class="{c if cls else ""}">{v:+.1f}%</span>'

def stars(n):
    if not n: return '<span class="na">not rated</span>'
    return "".join(f'<span class="star{" on" if i < n else ""}">★</span>' for i in range(5))

def risk_dots(n):
    return "".join(f'<span class="dot{" on" if i < n else ""}"></span>' for i in range(7))

def spark_svg(pts, up=True):
    if len(pts) < 2: return ""
    vals = [p[1] for p in pts]
    lo, hi = min(vals), max(vals)
    rng = (hi - lo) or 1
    w, h = 320, 72
    step = w / (len(vals) - 1)
    coords = " ".join(f"{i*step:.1f},{h - (v - lo)/rng*(h-6) - 3:.1f}" for i, v in enumerate(vals))
    col = "#0a7a3d" if up else "#c8102e"
    fill = "rgba(10,122,61,.08)" if up else "rgba(200,16,46,.07)"
    area = f"0,{h} " + coords + f" {w},{h}"
    return (f'<svg class="spark" viewBox="0 0 {w} {h}" preserveAspectRatio="none" aria-hidden="true">'
            f'<polygon points="{area}" fill="{fill}"/><polyline points="{coords}" fill="none" stroke="{col}" stroke-width="1.6"/></svg>')

def head(title, depth=0):
    up = "../" * depth
    return f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{html.escape(title)}</title>
<link rel="stylesheet" href="{up}assets/style.css">
</head><body>
<header class="topbar">
  <div class="wrap">
    <a class="brand" href="{up}index.html"><span class="mark">HLX</span><span class="sub">Fund range</span></a>
    <nav><a href="{up}index.html">All funds</a><a href="{up}index.html#performance">Performance</a><a href="{up}index.html#method">Methodology</a></nav>
  </div>
</header>"""

FOOT = f"""
<footer class="foot"><div class="wrap">
<p><strong>Simulated strategies.</strong> HLX funds are not registered collective investment schemes and are not offered to the public.
Performance is a backtest of the stated target weights on historical Hyperliquid market data — not the return of any actual portfolio.
n/a marks a window that starts before a material constituent was listed. Model ratings are computed by HLX and are not Morningstar, Lipper or S&amp;P ratings.</p>
<p class="dim">Data: Hyperliquid <code>info</code> API (candleSnapshot, metaAndAssetCtxs), {ASOF}. Fonts and layout are original to this document; no UBS content is reproduced.</p>
</div></footer>
</body></html>"""

# ---------------- index ----------------
rows = []
for cat, label in CATS:
    rows.append(f'<tr class="cat" id="{label.lower().replace(" ","-")}"><td colspan="7">{label}</td></tr>')
    for f in FUNDS:
        if f["cat"] != cat: continue
        p = PERF[f["code"]]
        ytd = p["windows"]["YTD"]["value"]
        one_y = p["windows"]["1Y"]["value"]
        ret = one_y if one_y is not None else ytd
        rows.append(f"""<tr>
<td><a class="code" href="funds/{f['code']}.html">{f['code']}</a></td>
<td><a class="fname" href="funds/{f['code']}.html">{html.escape(f['name'])}</a><div class="theme">{html.escape(f['theme'])}</div></td>
<td>{html.escape(f['style'])}</td>
<td class="num">{pct(ret)}</td>
<td class="num small">{pct(p['windows']['1M']['value'])}</td>
<td class="num small">{risk_dots(f['risk'])}</td>
<td>{'<span class="badge a">A</span>' if f['liquidity']=='A' else ('<span class="badge b">B</span>' if f['liquidity']=='B' else '<span class="badge c">C</span>')}</td>
</tr>""")

idx = head("HLX Fund Range — 21 funds built on Hyperliquid") + f"""
<main class="wrap">
  <section class="hero">
    <p class="kicker">Hyperliquid-native funds · {ASOF}</p>
    <h1>Twenty-one funds, every holding listed on Hyperliquid</h1>
    <p class="lede">Each fund is a fixed weight vector over markets you can trade on the venue today — core crypto perps,
    HIP-3 equity, commodity and FX perps, and USDC collateral. Click any fund for its factsheet, prospectus, rating and
    performance.</p>
    <div class="stats">
      <div><span class="n">21</span><span class="l">funds</span></div>
      <div><span class="n">{sum(f['n'] for f in FUNDS)}</span><span class="l">constituent slots</span></div>
      <div><span class="n">{sum(1 for f in FUNDS if f['liquidity']=='A')}</span><span class="l">liquidity grade A</span></div>
      <div><span class="n">4</span><span class="l">asset classes</span></div>
    </div>
  </section>

  <section id="performance">
    <h2>The range</h2>
    <table class="list">
      <thead><tr><th>Code</th><th>Fund</th><th>Style</th><th class="num">1Y / YTD</th><th class="num">1M</th><th>Risk</th><th>Liq</th></tr></thead>
      <tbody>{''.join(rows)}</tbody>
    </table>
    <p class="foot-note">Return column shows 1Y where the constituent history allows it, otherwise YTD. Both are simulated;
    see each fund page for the full 1M / 3M / YTD / 1Y / since-listing set and the reason for any n/a.</p>
  </section>

  <section id="method">
    <h2>Methodology</h2>
    <div class="cols">
      <div>
        <h3>Performance</h3>
        <p>Daily closes from Hyperliquid <code>candleSnapshot</code> for every constituent, weighted by the fund's target
        weights and rebalanced daily. Windows are measured to {ASOF} and are gross of fees. A window is only published when
        at least 90% of NAV has a price at its start date — that is why equity funds, whose HIP-3 markets listed between
        March and September 2026, show n/a for YTD or 1Y.</p>
      </div>
      <div>
        <h3>Rating</h3>
        <p>HLX model rating on a 1–5 scale, built from the simulated Sharpe ratio (risk-free 3%), maximum drawdown and
        annualised volatility over the fund's full simulated history. It is a within-range relative score, not an absolute
        quality judgement, and no external agency rates these strategies.</p>
      </div>
      <div>
        <h3>Liquidity grade</h3>
        <p>A: ≥90% of NAV in markets trading over $1m/day. B: ≥70%. C: below that — these need limit orders, smaller clips
        and patience. Thin positions are marked in each portfolio table.</p>
      </div>
    </div>
  </section>
</main>
{FOOT}"""
open(f"{SITE}/index.html", "w", encoding="utf-8").write(idx)

# ---------------- fund pages ----------------
for f in FUNDS:
    p = PERF[f["code"]]
    w = p["windows"]
    since = p.get("since")
    nav = 100 * (1 + since["value"] / 100) if since else None
    up = since["value"] >= 0 if since else True

    perf_rows = "".join(
        f'<tr><td>{label}</td><td class="num">{pct(w[k]["value"])}</td>'
        f'<td class="num dim">{w[k]["coverage"]:.0f}%</td>'
        f'<td class="dim small">{"; ".join(f"{m} listed {w[k][chr(102)+chr(105)+chr(114)+chr(115)+chr(116)+chr(115)][m]}" for m in w[k]["missing"][:2]) or "—"}</td></tr>'
        for k, label in [("1M", "1 month"), ("3M", "3 months"), ("YTD", "Year to date"), ("1Y", "1 year")]
    ) + (f'<tr class="total"><td>Since listing</td><td class="num">{pct(since["value"])}</td><td class="num dim">{since["coverage"]:.0f}%</td>'
         f'<td class="dim small">from {since["date"]} ({since["days"]} days)</td></tr>' if since else
         f'<tr class="total"><td>Since listing</td><td class="num"><span class="na">—</span></td><td class="num dim">—</td><td class="dim small">{p.get("note") or ""}</td></tr>')

    holdings = "".join(
        f'<tr><td><code>{html.escape(sym)}</code></td><td>{venue_label(sym)}</td>'
        f'<td class="num">{wt:g}%</td><td class="num dim">{vol_fmt(adtv(sym))}</td>'
        f'<td class="wbar"><span style="width:{min(100, wt*1.6):.0f}%"></span></td></tr>'
        for sym, wt in f["holdings"].items())

    st = p.get("stats") or {}
    facts = [
        ("Fund code", f"<code>{f['code']}</code>"),
        ("ISIN", '<span class="dim">not registered</span>'),
        ("Currency / settlement", "USDC"),
        ("Domicile / venue", "Hyperliquid (on-chain)"),
        ("Legal form", "Open-ended tokenised strategy"),
        ("Inception", since["date"] if since else '<span class="dim">not yet launched</span>'),
        ("NAV per unit", f"{nav:,.2f} USDC" if nav else '<span class="dim">n/a</span>'),
        ("Fund size", '<span class="dim">n/a — not launched</span>'),
        ("Benchmark", html.escape(f["benchmark"])),
        ("Management style", html.escape(f["style"])),
        ("Risk indicator", f'{risk_dots(f["risk"])} <span class="dim">{f["risk"]}/7</span>'),
        ("Ongoing charges", f'{f["fee_bps"]} bp <span class="dim">(illustrative TER)</span>'),
        ("Share class", "A-acc · accumulating"),
        ("Rebalancing", html.escape(f["rebalance"])),
        ("Valuation", "Oracle marks, continuous"),
        ("Holdings", str(f["n"])),
        ("Liquidity grade", f'{f["liquidity"]} <span class="dim">({p["liquid_nav"] if "liquid_nav" in p else f["liquid_nav"]}% of NAV in liquid markets)</span>'),
    ]
    facts_html = "".join(f'<tr><th>{k}</th><td>{v}</td></tr>' for k, v in facts)

    ann = p.get("annual") or {}
    partial = set(p.get("annual_partial") or [])
    if ann:
        heads = "".join('<th class="num">%s</th>' % y for y in ann)
        cells = "".join('<td class="num">%s%s</td>' % (pct(v), '<span class="dim">*</span>' if y in partial else "")
                        for y, v in ann.items())
        annual_html = ('<section id="annual"><h2>Annual performance</h2>'
                       '<p class="sub">Calendar-year returns, simulated, in USDC. '
                       '<span class="dim">*</span> marks a partial year — the series starts inside it.</p>'
                       '<table class="perf"><thead><tr><th>Fund</th>' + heads + '</tr></thead>'
                       '<tbody><tr><td>Return</td>' + cells + '</tr></tbody></table></section>')
    else:
        annual_html = ('<section id="annual"><h2>Annual performance</h2>'
                       '<p class="dim">No calendar-year history applies to this strategy.</p></section>')

    mon = p.get("monthly") or []
    if mon:
        rows = "".join('<tr><td>%s</td><td class="num">%s</td><td class="num">%s</td></tr>'
                       % (d, format(v, ",.2f"), pct(ch) if ch is not None else '<span class="na">—</span>')
                       for d, v, ch in reversed(mon))
        monthly_html = ('<table class="perf"><thead><tr><th>Date</th><th class="num">NAV per unit</th>'
                        '<th class="num">Month to date</th></tr></thead><tbody>' + rows + '</tbody></table>')
    else:
        monthly_html = '<p class="dim">No NAV history for this strategy.</p>'

    page = head(f"{f['name']} — HLX", depth=1) + f"""
<main class="wrap">
  <nav class="crumbs"><a href="../index.html">HLX Fund range</a><span>/</span><a href="../index.html#{f['cat'].lower().replace(' ','-')}">{f['cat']}</a><span>/</span><span>{f['code']}</span></nav>

  <section class="fundhead">
    <div>
      <p class="kicker">{f['cat']} · {html.escape(f['theme'])}</p>
      <h1>{html.escape(f['name'])}</h1>
      <p class="ident"><code>{f['code']}</code> · USDC · risk {f['risk']}/7 · {html.escape(f['style'].lower())}</p>
    </div>
    <div class="headcard">
      <div class="navrow"><span class="lbl">NAV per unit</span><span class="val">{f'{nav:,.2f}' if nav else '—'}</span></div>
      <div class="navrow"><span class="lbl">Since listing</span><span class="val">{pct(since['value']) if since else '<span class="na">—</span>'}</span></div>
      {spark_svg(p.get('spark', []), up)}
      <div class="rating"><span class="rlbl">Model rating</span>{stars(p.get('rating'))}</div>
    </div>
  </section>

  <nav class="tabs"><a href="#overview">Overview</a><a href="#performance">Performance</a><a href="#annual">Annual</a><a href="#prices">Prices</a><a href="#portfolio">Portfolio</a><a href="#documents">Documents</a></nav>

  <section id="overview" class="grid2">
    <div>
      <h2>Key facts</h2>
      <table class="facts">{facts_html}</table>
    </div>
    <div>
      <h2>Rating</h2>
      <div class="ratingbox">
        <div class="big">{stars(p.get('rating'))}</div>
        <p>{("HLX model rating " + str(p['rating']) + " of 5") if p.get('rating') else "Not rated — no price history applies to this strategy."}</p>
        <table class="mini">
          <tr><th>Annualised volatility</th><td>{f"{st['vol']:.1f}%" if st else "—"}</td></tr>
          <tr><th>Max drawdown</th><td>{f"{st['mdd']:.1f}%" if st else "—"}</td></tr>
          <tr><th>Annualised return</th><td>{pct(st.get('cagr')) if st else "—"}</td></tr>
          <tr><th>Sharpe (rf 3%)</th><td>{f"{st['sharpe']:.2f}" if st and st.get('sharpe') is not None else "—"}</td></tr>
          <tr><th>History used</th><td>{f"{st['days']} days" if st else "—"}</td></tr>
        </table>
        <p class="tiny">Computed by HLX from the simulated series. Not a Morningstar, Lipper or S&amp;P rating; no agency covers these strategies.</p>
      </div>
      <h2>Description</h2>
      <p class="body">{html.escape(f['note'])}</p>
    </div>
  </section>

  <section id="performance">
    <h2>Performance</h2>
    <p class="sub">Simulated, gross of fees, in USDC. Coverage is the share of NAV with a price at the start of the window.</p>
    <table class="perf">
      <thead><tr><th>Period</th><th class="num">Return</th><th class="num">Coverage</th><th>Comment</th></tr></thead>
      <tbody>{perf_rows}</tbody>
    </table>
    {f'<p class="foot-note">{html.escape(p["note"])}</p>' if p.get('note') else ''}
  </section>

  {annual_html}

  <section id="prices">
    <h2>NAV history</h2>
    <p class="sub">Month-end NAV per unit and month-on-month change, simulated from the target weights.</p>
    {monthly_html}
  </section>

  <section id="portfolio">
    <h2>Portfolio</h2>
    <p class="sub">{f['n']} holdings · rebalanced {html.escape(f['rebalance'].lower())} · long only, no leverage at fund level.</p>
    <table class="holdings">
      <thead><tr><th>Constituent</th><th>Venue</th><th class="num">Weight</th><th class="num">24h volume</th><th></th></tr></thead>
      <tbody>{holdings}</tbody>
    </table>
  </section>

  <section id="documents">
    <h2>Documents</h2>
    <div class="docs">
      <a class="doc" href="../downloads/factsheet-{f['code']}.pdf"><span class="dtype">PDF</span><span class="dname">Factsheet</span><span class="dmeta">Fund at a glance, performance, portfolio · {ASOF}</span></a>
      <a class="doc" href="../downloads/prospectus-{f['code']}.pdf"><span class="dtype">PDF</span><span class="dname">Simplified prospectus</span><span class="dmeta">Objective, policy, risks, fees, valuation, redemption</span></a>
      <a class="doc" href="../downloads/kid-{f['code']}.pdf"><span class="dtype">PDF</span><span class="dname">Key Information Document</span><span class="dmeta">Purpose, risks, performance scenarios, costs · PRIIPs layout</span></a>
      <div class="doc disabled"><span class="dtype">—</span><span class="dname">Annual report</span><span class="dmeta">Not yet published — fund not launched</span></div>
    </div>
  </section>
</main>
{FOOT}"""
    open(f"{SITE}/funds/{f['code']}.html", "w", encoding="utf-8").write(page)

print("pages:", 1 + len(FUNDS))
