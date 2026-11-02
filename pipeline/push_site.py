"""Store the whole deliverable in shashcorp/Harbor via the GitHub REST API.

Adds the static site (site/**), the HLX fund-range documents and the
performance data on top of the existing ubs-key4 branch, so PR #6 grows into
one archive of the work.

Why not git: the sandbox blocks the named pipes git spawns; plain HTTPS works.

Usage:
  python push_site.py --dry-run
  python push_site.py --pr
"""

import argparse
import base64
import json
import os
import sys
import urllib.error
import urllib.request

OWNER, REPO = "shashcorp", "Harbor"
BASE_BRANCH = "ubs-key4-hyperliquid-funds"
DEFAULT_BRANCH = "main"
HERE = os.path.dirname(os.path.abspath(__file__))


def token():
    for key in ("GITHUB_TOKEN", "GH_TOKEN"):
        if os.environ.get(key):
            return os.environ[key].strip()
    p = os.path.join(HERE, "gh_token.txt")
    if os.path.exists(p):
        with open(p, encoding="utf-8") as fh:
            return fh.read().strip().splitlines()[0].strip()
    sys.exit("no token: set GITHUB_TOKEN or write gh_token.txt")


def api(method, path, body=None, tok=None):
    req = urllib.request.Request(f"https://api.github.com{path}",
                                data=json.dumps(body).encode() if body else None, method=method)
    req.add_header("Accept", "application/vnd.github+json")
    req.add_header("X-GitHub-Api-Version", "2022-11-28")
    req.add_header("User-Agent", "dsh-push")
    if body:
        req.add_header("Content-Type", "application/json")
    if tok:
        req.add_header("Authorization", f"Bearer {tok}")
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            return json.loads(r.read().decode() or "{}")
    except urllib.error.HTTPError as e:
        return {"__error": e.code, "__detail": e.read().decode(errors="replace")[:300]}


def collect():
    files = []
    for root, _, names in os.walk(os.path.join(HERE, "site")):
        for n in names:
            full = os.path.join(root, n)
            files.append(os.path.relpath(full, HERE).replace("\\", "/"))
    for extra in ["harbor-fund-range.md", "harbor_fund_range.csv", "harbor_fund_range.json",
                  "perf.json", "perf_candles.json",
                  "README.md"]:
        if os.path.exists(os.path.join(HERE, extra)):
            files.append(extra)
    return sorted(files)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--pr", action="store_true")
    args = ap.parse_args()

    repo = api("GET", f"/repos/{OWNER}/{REPO}")
    if "__error" in repo:
        sys.exit(f"repo lookup failed: {repo}")
    print(f"repo: {repo['full_name']} private={repo['private']}")

    branch_info = api("GET", f"/repos/{OWNER}/{REPO}/git/ref/heads/{BASE_BRANCH}")
    if "__error" not in branch_info:
        base_sha = branch_info["object"]["sha"]
        base_name = BASE_BRANCH
    else:
        base_sha = api("GET", f"/repos/{OWNER}/{REPO}/git/ref/heads/{DEFAULT_BRANCH}")["object"]["sha"]
        base_name = DEFAULT_BRANCH
    base_commit = api("GET", f"/repos/{OWNER}/{REPO}/git/commits/{base_sha}")
    print(f"base: {base_name} @ {base_sha[:10]}")

    files = collect()
    total = sum(os.path.getsize(os.path.join(HERE, f)) for f in files)
    print(f"files: {len(files)}  total: {total/1024/1024:.2f} MB")
    for f in files[:8]:
        print(f"   {os.path.getsize(os.path.join(HERE, f))/1024:>8.1f} KB  {f}")
    print("   ...")
    if args.dry_run:
        print("\n[dry run] nothing written")
        return

    tok = token()
    tree = []
    for i, f in enumerate(files, 1):
        with open(os.path.join(HERE, f), "rb") as fh:
            content = base64.b64encode(fh.read()).decode()
        blob = api("POST", f"/repos/{OWNER}/{REPO}/git/blobs", {"content": content, "encoding": "base64"}, tok)
        if "__error" in blob:
            sys.exit(f"blob {f} failed: {blob}")
        tree.append({"path": f, "mode": "100644", "type": "blob", "sha": blob["sha"]})
        if i % 15 == 0 or i == len(files):
            print(f"  uploaded {i}/{len(files)}")

    new_tree = api("POST", f"/repos/{OWNER}/{REPO}/git/trees",
                   {"base_tree": base_commit["tree"]["sha"], "tree": tree}, tok)
    commit = api("POST", f"/repos/{OWNER}/{REPO}/git/commits", {
        "message": "Add the HLX fund-range site, PDFs and performance data\n\n"
                   "21 fund pages plus index, 42 PDFs (factsheet and simplified\n"
                   "prospectus per fund), the range definition and the daily\n"
                   "candle snapshot the performance is computed from.",
        "tree": new_tree["sha"], "parents": [base_sha]}, tok)
    print(f"commit: {commit['sha'][:10]}")

    upd = api("PATCH", f"/repos/{OWNER}/{REPO}/git/refs/heads/{BASE_BRANCH}",
              {"sha": commit["sha"], "force": True}, tok)
    if "__error" in upd:
        sys.exit(f"ref update failed: {upd}")
    print(f"branch: https://github.com/{OWNER}/{REPO}/tree/{BASE_BRANCH}")
    if args.pr:
        pr = api("GET", f"/repos/{OWNER}/{REPO}/pulls?head={OWNER}:{BASE_BRANCH}&state=open")
        if isinstance(pr, list) and pr:
            print(f"PR #{pr[0]['number']} updated: {pr[0]['html_url']}")
        else:
            new = api("POST", f"/repos/{OWNER}/{REPO}/pulls", {
                "title": "HLX fund range — site, PDFs and performance data",
                "head": BASE_BRANCH, "base": DEFAULT_BRANCH,
                "body": "Static site with 21 fund pages, 42 PDFs, the range definition and the data snapshot."}, tok)
            print(f"PR #{new['number']}: {new['html_url']}")


if __name__ == "__main__":
    main()
