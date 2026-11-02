import json, urllib.request, time, datetime as dt

FUNDS = json.load(open("harbor_fund_range.json", encoding="utf-8"))

def post(body):
    req = urllib.request.Request("https://api.hyperliquid.xyz/info",
        data=json.dumps(body).encode(), headers={"Content-Type": "application/json"})
    return json.load(urllib.request.urlopen(req, timeout=60))

syms = sorted({s for f in FUNDS for s in f["holdings"] if s != "USDC"})
print("symbols:", len(syms))

now = int(time.time() * 1000)
start = now - int(900 * 86400 * 1000)

candles = {}
for i, s in enumerate(syms, 1):
    req = {"coin": s, "interval": "1d", "startTime": start, "endTime": now}
    try:
        d = post({"type": "candleSnapshot", "req": req})
    except Exception as e:
        print(f"  {s}: ERR {e}")
        d = []
    series = {}
    for c in d:
        day = time.strftime("%Y-%m-%d", time.gmtime(c["t"] / 1000))
        series[day] = float(c["c"])
    candles[s] = series
    print(f"  [{i:>2}/{len(syms)}] {s:<14} {len(series):>4} days  from {min(series) if series else '-'}")

json.dump(candles, open("perf_candles.json", "w"), indent=0)

# ---------- fund performance ----------
CAL = 365.25
TODAY = dt.date.today()
def shift(days): return (TODAY - dt.timedelta(days=days)).isoformat()

def nearest_on_or_before(series, target):
    ks = [k for k in series if k <= target]
    return max(ks) if ks else None

windows = {"1M": shift(30), "3M": shift(91), "YTD": "2025-12-31", "1Y": shift(365)}

def fund_series(f):
    legs = {k: w for k, w in f["holdings"].items() if k != "USDC" and candles.get(k)}
    cash = f["holdings"].get("USDC", 0.0)
    if not legs:
        return {}, cash, []
    dates = sorted(set.intersection(*[set(candles[k]) for k in legs]))
    return legs, cash, dates

out = []
for f in FUNDS:
    legs, cash, dates = fund_series(f)
    rec = {"code": f["code"], "windows": {}, "coverage": {}, "legs_used": list(legs), "cash": cash}
    if not dates:
        out.append(rec); continue

    wsum = sum(legs.values())
    nav = {}
    for d in dates:
        r = sum(w * candles[k][d] / candles[k][dates[0]] for k, w in legs.items())
        nav[d] = (r / wsum) * (100 - cash) / 100 + cash / 100
    first = dates[0]
    last = dates[-1]
    rec["history_start"] = first
    rec["history_days"] = len(dates)

    for label, ws in windows.items():
        d0 = nearest_on_or_before({d: 1 for d in dates}, ws)
        if d0 is None:
            rec["windows"][label] = None
            rec["coverage"][label] = 0.0
            continue
        covered = sum(w for k, w in f["holdings"].items() if k == "USDC" or (k in candles and candles[k].get(d0)))
        rec["coverage"][label] = round(covered, 1)
        if covered < 80:
            rec["windows"][label] = None
            continue
        tot = 0.0
        for k, w in f["holdings"].items():
            if k == "USDC":
                tot += w / 100.0
            elif k in candles and candles[k].get(d0):
                tot += w / 100.0 * candles[k][last] / candles[k][d0]
        rec["windows"][label] = round((tot - 1) * 100, 1)

    d0 = first
    covered = sum(w for k, w in f["holdings"].items() if k == "USDC" or (k in candles and candles[k].get(d0)))
    tot = 0.0
    for k, w in f["holdings"].items():
        if k == "USDC":
            tot += w / 100.0
        elif k in candles and candles[k].get(d0):
            tot += w / 100.0 * candles[k][last] / candles[k][d0]
    rec["windows"]["Since listing"] = round((tot - 1) * 100, 1)
    rec["coverage"]["Since listing"] = round(covered, 1)

    # daily returns -> vol, drawdown, sharpe
    navl = [(d, nav[d]) for d in dates]
    rets = [(navl[i][1] / navl[i - 1][1] - 1) for i in range(1, len(navl))]
    if len(rets) > 20:
        mean = sum(rets) / len(rets)
        var = sum((r - mean) ** 2 for r in rets) / (len(rets) - 1)
        vol = (var ** 0.5) * (CAL ** 0.5) * 100
        total = navl[-1][1] / navl[0][1] - 1
        yrs = len(rets) / CAL
        cagr = ((1 + total) ** (1 / yrs) - 1) * 100 if yrs > 0.2 else None
        peak = navl[0][1]; mdd = 0.0
        for _, v in navl:
            peak = max(peak, v)
            mdd = min(mdd, v / peak - 1)
        rec["stats"] = {"vol": round(vol, 1), "cagr": None if cagr is None else round(cagr, 1),
                        "mdd": round(mdd * 100, 1),
                        "sharpe": None if vol == 0 or cagr is None else round((cagr - 3.0) / vol, 2),
                        "days": len(navl)}
    # sparkline series (downsample to ~90 points)
    step = max(1, len(navl) // 90)
    rec["spark"] = [[d, round(v, 4)] for d, v in navl[::step]]
    out.append(rec)

json.dump(out, open("perf.json", "w", encoding="utf-8"), indent=1)

print(f"\n{'code':<10}{'1M':>8}{'3M':>8}{'YTD':>8}{'1Y':>8}{'Since':>9}{'vol':>7}{'mdd':>8}  start")
for r in out:
    w = r["windows"]
    def g(k):
        v = w.get(k)
        return "  n/a" if v is None else f"{v:>6.1f}%"
    st = r.get("stats", {})
    print(f'{r["code"]:<10}{g("1M"):>8}{g("3M"):>8}{g("YTD"):>8}{g("1Y"):>8}{g("Since listing"):>9}'
          f'{st.get("vol", 0):>7}{st.get("mdd", 0):>8}  {r.get("history_start", "-")}')
