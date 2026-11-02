"""GitHub OAuth device-flow login - no PAT copying, no client secret.

Flow: request a device code, show the user_code + URL, poll until the user
authorises in the browser, write the token to gh_token.txt.

Uses the public GitHub CLI OAuth client id (a well-known public identifier, no
secret involved). The authorisation will appear in your GitHub settings under
"GitHub CLI" and can be revoked at https://github.com/settings/applications.
"""

import json
import os
import sys
import time
import urllib.parse
import urllib.request

CLIENT_ID = "178c6fc778ccc68e1d6a"
SCOPE = "repo"
HERE = os.path.dirname(os.path.abspath(__file__))
TOKEN_PATH = os.path.join(HERE, "gh_token.txt")


def post(url: str, data: dict) -> dict:
    body = urllib.parse.urlencode(data).encode()
    req = urllib.request.Request(url, data=body, method="POST")
    req.add_header("Accept", "application/json")
    req.add_header("Content-Type", "application/x-www-form-urlencoded")
    req.add_header("User-Agent", "dsh-device-login")
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode())


def main() -> None:
    start = post("https://github.com/login/device/code", {"client_id": CLIENT_ID, "scope": SCOPE})
    if "device_code" not in start:
        sys.exit(f"device flow refused: {start}")

    print("=" * 58)
    print(f"  Open:  {start['verification_uri']}")
    print(f"  Code:  {start['user_code']}")
    print(f"  Expires in {start['expires_in'] // 60} minutes")
    print("=" * 58)
    sys.stdout.flush()

    interval = int(start.get("interval", 5))
    deadline = time.time() + int(start.get("expires_in", 900))
    while time.time() < deadline:
        time.sleep(interval)
        res = post("https://github.com/login/oauth/access_token", {
            "client_id": CLIENT_ID,
            "device_code": start["device_code"],
            "grant_type": "urn:ietf:params:oauth:grant-type:device_code",
        })
        err = res.get("error")
        if err == "authorization_pending":
            continue
        if err == "slow_down":
            interval += 5
            continue
        if err in ("expired_token", "access_denied", "device_flow_disabled"):
            sys.exit(f"login failed: {err}")
        tok = res.get("access_token")
        if tok:
            with open(TOKEN_PATH, "w", encoding="utf-8") as fh:
                fh.write(tok + "\n")
            print(f"AUTHORISED - token written to {TOKEN_PATH} ({len(tok)} chars)")
            return

    sys.exit("timed out waiting for authorisation")


if __name__ == "__main__":
    main()
