# Harbor — landing page

Marketing landing page for Harbor, managed investing on Hyperliquid. Built with Next.js (App Router), TypeScript and Tailwind CSS v4. Static UI only — no backend; wallet connect and the returns calculator are client-side previews.

## Run locally

Requires Node.js 20.9+.

```bash
npm install
npm run dev      # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

## Structure

- `app/` — layout, global theme tokens (`globals.css`) and the page
- `components/` — one file per section (Header, Hero, HowItWorks, Benefits, CalculatorTeaser, DiscoverMore, Faq, NeedMoreAnswers, Footer, StickyCta) plus shared UI (WalletModal, icons, Logo)
- `refs/ubs-key4/` — layout reference screenshots and outline (structure only; no third-party branding is used in the UI)

Fee figures on the page are placeholders.
