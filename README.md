# Harbor

Website and signed-in onboarding for Harbor, managed investing on Hyperliquid. Built with Next.js 16 (App Router), TypeScript and Tailwind CSS v4, with sign-in by [Clerk](https://clerk.com). There is no database of its own: onboarding answers are stored in each user's Clerk metadata, and fund data lives in `lib/funds.ts`.

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

- `app/page.tsx` — landing page (sections in `components/`: Header, Hero, HowItWorks, Benefits, CalculatorTeaser, DiscoverMore, Faq, NeedMoreAnswers, Footer, StickyCta)
- `app/funds` — fund list, fund pages, and per-fund factsheet, simplified prospectus and key information document
- `app/invest/factsheet` — Harbor Invest product factsheet
- `app/signup`, `app/login` — Clerk sign-up and log-in (Google, Apple, email)
- `app/account` — signed-in onboarding:
  1. `/account/risk-profile` — fund experience, fund knowledge, holding period, risk tolerance, risk profile
  2. `/account/funds` — fund management, selection mode, topics, fund selection
  3. `/account/review` — review and costs, documents, sign
- `lib/` — fund data (`funds.ts`), risk profile and fund selection logic, simulator (`simulate.ts`)
- `refs/ubs-key4/` — layout reference screenshots and outline (structure only; no third-party branding is used in the UI)

## Sign-in (Clerk)

Sign-in uses [Clerk](https://clerk.com) and switches on automatically when these environment variables are set (locally in `.env.local`, in production in Vercel):

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
```

Without them the site builds and runs with a preview sign-up page and the account pages are disabled. Google, Apple and email sign-in are turned on in the Clerk dashboard (User & authentication → SSO connections).

Pricing: flat $19/month per account, 50% off the first month; Hyperliquid trading, funding and network costs are passed through and not included. Holding periods in the calculator and questionnaire are capped at 5 years. Harbor Invest is the live product; Harbor Vaults and Harbor Private are shown as coming soon.
