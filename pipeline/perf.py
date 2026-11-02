import json, datetime as dt

FUNDS = json.load(open("harbor_fund_range.json", encoding="utf-8"))
C = json.load(open("perf_candles.json"))
CAL = 365.25
TODAY = dt.date.today()
def shift(days): return (TODAY - dt.timedelta(days=days)).isoformat()

WINDOWS = [("1M", shift(30)), ("3M", shift(91)), ("YTD", "2025-12-31"), ("1Y", shift(365))]
THRESHOLD, TOL = 90.0, 4

out = []
for f in FUNDS:
    hold = f["holdings"]
    cash = hold.get("USDC", 0.0)
    legs = {k: w for k, w in hold.items() if k != "USDC" and C.get(k)}
    rec = {"code": f["code"], "windows": {}, "since": None, "stats": None, "spark": [],
           "history_start": None, "note": None, "rating": None}

    if not legs:
        rec["note"] = ("Funding strategy — NAV is stable by design; the return accrues from perpetual funding, "
                       "not from price. No price history applies.")
        rec["windows"] = {k: {"value": None, "coverage": 0.0, "missing": [], "firsts": {}} for k, _ in WINDOWS}
        out.append(rec); continue

    last_date = max(max(C[k]) for k in legs)
    all_dates = sorted(set().union(*[set(C[k]) for k in legs]))

    def cov_at(d):
        return cash + sum(w for k, w in legs.items() if d in C[k])

    # ---- window returns: endpoint method, coverage gated ----
    def price_on(sym, target, end=False):
        ks = sorted(C[sym])
        if end:
            return C[sym][ks[-1]]
        cand = [k for k in ks if k <= target]
        if not cand:
            return None
        d = cand[-1]
        if (dt.date.fromisoformat(target) - dt.date.fromisoformat(d)).days > TOL:
            return None
        return C[sym][d]

    for label, target in WINDOWS:
        covered, missing, firsts = cash, [], {}
        for k, w in legs.items():
            if price_on(k, target) is None:
                missing.append(k); firsts[k] = min(C[k]); continue
            covered += w
        if covered < THRESHOLD:
            rec["windows"][label] = {"value": None, "coverage": round(covered, 1),
                                     "missing": sorted(missing, key=lambda x: -legs[x]), "firsts": firsts}
            continue
        usable = {k: w for k, w in legs.items() if k not in missing}
        wsum = sum(usable.values())
        growth = sum(w * price_on(k, target, True) / price_on(k, target) for k, w in usable.items()) / wsum
        rec["windows"][label] = {"value": round(((cash + (100 - cash) * growth) / 100 - 1) * 100, 1),
                                 "coverage": round(covered, 1),
                                 "missing": sorted(missing, key=lambda x: -legs[x]), "firsts": firsts}

    # ---- nav series from first date with >= 90% coverage, weights renormalised per date ----
    start = next((d for d in all_dates if cov_at(d) >= THRESHOLD), None)
    if not start:
        rec["note"] = "Constituent histories do not overlap enough to compute a fund return."
        out.append(rec); continue

    entry = {}
    for k in legs:
        ks = [d for d in sorted(C[k]) if d >= start]
        if ks:
            entry[k] = ks[0]

    nav = []
    for d in all_dates:
        if d < start:
            continue
        avail = [k for k in legs if d in C[k]]
        if not avail:
            continue
        wsum = sum(legs[k] for k in avail)
        g = sum(legs[k] * C[k][d] / C[k][entry[k]] for k in avail if entry.get(k) and C[k].get(entry[k]))
        nav.append((d, (cash + (100 - cash) * g / wsum) / 100))

    rec["history_start"] = start
    rec["history_days"] = len(nav)
    rec["since"] = {"value": round((nav[-1][1] / nav[0][1] - 1) * 100, 1), "date": start,
                    "days": len(nav), "coverage": round(cov_at(start), 1)}

    vals = [p[1] for p in nav]
    rets = [(vals[i] / vals[i - 1] - 1) for i in range(1, len(vals))]
    if len(rets) > 20:
        mean = sum(rets) / len(rets)
        var = sum((r - mean) ** 2 for r in rets) / (len(rets) - 1)
        vol = (var ** 0.5) * CAL ** 0.5 * 100
        total = vals[-1] / vals[0] - 1
        yrs = len(rets) / CAL
        cagr = ((1 + total) ** (1 / yrs) - 1) * 100 if yrs >= 0.2 and total > -1 else None
        peak, mdd = vals[0], 0.0
        for v in vals:
            peak = max(peak, v); mdd = min(mdd, v / peak - 1)
        rec["stats"] = {"vol": round(vol, 1), "cagr": None if cagr is None else round(cagr, 1),
                        "mdd": round(mdd * 100, 1),
                        "sharpe": None if not cagr or vol == 0 else round((cagr - 3.0) / vol, 2),
                        "days": len(vals)}

    step = max(1, len(nav) // 100)
    rec["spark"] = [[d, round(v, 4)] for d, v in nav[::step]]
    if rec["spark"][-1][0] != nav[-1][0]:
        rec["spark"].append([nav[-1][0], round(nav[-1][1], 4)])

    st = rec["stats"]
    if st and st["sharpe"] is not None:
        s, dd = st["sharpe"], st["mdd"]
        score = 3 if s >= 1.5 else 2 if s >= 0.8 else 1 if s >= 0.3 else 0
        score += 1.5 if dd > -15 else 1 if dd > -30 else 0.5 if dd > -50 else 0
        score += 0.5 if st["vol"] < 25 else 0
        rec["rating"] = max(1, min(5, round(score + 0.5)))
    out.append(rec)

json.dump(out, open("perf.json", "w", encoding="utf-8"), indent=1)

print(f'{"code":<10}{"1M":>8}{"3M":>8}{"YTD":>8}{"1Y":>8}{"Since":>9}{"vol":>7}{"mdd":>8}{"SH":>6}{"Rt":>4}  start')
for r in out:
    def g(k):
        v = (r["windows"].get(k) or {}).get("value")
        return "   n/a" if v is None else f"{v:>6.1f}%"
    st = r["stats"] or {}
    sv = r["since"]["value"] if r["since"] else None
    print(f'{r["code"]:<10}{g("1M"):>8}{g("3M"):>8}{g("YTD"):>8}{g("1Y"):>8}'
          f'{(("%6.1f%%" % sv) if sv is not None else "   n/a"):>9}'
          f'{st.get("vol", 0):>7}{st.get("mdd", 0):>8}{(st.get("sharpe") or 0):>6}'
          f'{(r["rating"] or 0):>4}  {r["history_start"]}')
