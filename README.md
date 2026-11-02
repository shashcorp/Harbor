# Harbor — landing page

Marketing landing page for Harbor, managed investing on Hyperliquid. Built with Next.js (App Router), TypeScript and Tailwind CSS v4. Static UI only — no backend; the sign-up/log-in page and the returns calculator are client-side previews.

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
- `components/` — one file per section (Header, Hero, HowItWorks, Benefits, CalculatorTeaser, DiscoverMore, Faq, NeedMoreAnswers, Footer, StickyCta) plus shared UI (AuthCard, icons, Logo)
- `app/signup`, `app/login`, `app/account` — sign-up, log-in and account pages
- `app/funds` — fund list, fund pages, factsheets, prospectuses and key information documents

## Sign-in (Clerk)

Sign-in uses [Clerk](https://clerk.com) and switches on automatically when these environment variables are set (locally in `.env.local`, in production in Vercel):

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
```

Without them the site builds and runs with a preview sign-up page. Google, Apple and email sign-in are turned on in the Clerk dashboard (User & authentication → SSO connections).
- `refs/ubs-key4/` — layout reference screenshots and outline (structure only; no third-party branding is used in the UI)

Pricing shown on the page: flat $19/month, 50% off the first month. Harbor Invest is the live product; Harbor Vaults and Harbor Private are shown as coming soon.
