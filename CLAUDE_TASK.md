Build a Harbor marketing landing page that recreates the LAYOUT and UX of the UBS key4 smart investing page, but brand it as Harbor — not UBS.

Reference screenshots + outline are in refs/ubs-key4/ (read PAGE-OUTLINE.md and look at 01-hero.png through 06-bottom-footer.png). Source URL for structure only: https://www.ubs.com/ch/en/services/investments/fund-account/key4.html

Hard rules:
- Do NOT use UBS, key4, or UBS logos/wordmarks/trademarks in the UI.
- Brand name: Harbor. Product: managed investing on Hyperliquid (wallet connect, fund/theme baskets).
- This repo is empty — scaffold from scratch with Next.js (App Router) + TypeScript + Tailwind CSS.
- Recreate these sections in order: sticky header + nav; hero with CTA; how it works (bullets + fee callout); benefits (3 cards); returns/calculator teaser; discover more (2 cards); FAQ accordion; need more answers; footer; optional sticky bottom CTA.
- Clean Swiss-bank aesthetic: lots of white space, restrained navy/charcoal + one accent, light theme, polished typography.
- Map copy to Harbor: e.g. start from a low amount, flexible deposits, transparent fee, themes/funds, connect wallet CTA instead of "Open now online".
- Fee numbers can be placeholders (e.g. transparent management fee) clearly Harbor-owned.
- Make it responsive and runnable with npm install && npm run dev.
- Add a short README with how to run.
- Commit everything to main with a clear message (repo remote is already origin). Do not force-push. Push to origin main if credentials work; if push fails, leave the local commit and say so.
- Do not invent API backends; static/marketing UI is enough. Calculator can be a simple client-side illustrative widget.

Success criteria: npm run build succeeds; landing page at / matches the section structure above; Harbor branding throughout; refs stay in the repo under refs/ubs-key4/.
