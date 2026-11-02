import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const title = "Harbor — Managed investing on Hyperliquid";
const description =
  "Open an account and invest in a tailored selection of actively and passively managed investment funds on Hyperliquid, for a flat $19 per month.";

export const metadata: Metadata = {
  metadataBase: new URL("https://harbor-three-silk.vercel.app"),
  title,
  description,
  openGraph: { title, description, siteName: "Harbor", type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image", title, description },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
