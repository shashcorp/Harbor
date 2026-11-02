import Container from "./Container";
import { ConnectWalletButton } from "./WalletModal";
import { ChevronRight } from "./icons";
import { btnPrimary } from "./ui";

function HarborArt() {
  return (
    <svg
      viewBox="0 0 1290 460"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b1f3a" />
          <stop offset="0.55" stopColor="#1e3a5f" />
          <stop offset="1" stopColor="#3d6a83" />
        </linearGradient>
        <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1b4a5c" />
          <stop offset="1" stopColor="#071428" />
        </linearGradient>
        <radialGradient id="glow" cx="0.78" cy="0.62" r="0.35">
          <stop offset="0" stopColor="#f3d9a4" stopOpacity="0.85" />
          <stop offset="1" stopColor="#f3d9a4" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1290" height="460" fill="url(#sky)" />
      <rect width="1290" height="460" fill="url(#glow)" />
      {/* distant skyline */}
      <g fill="#0b1f3a" opacity="0.7">
        <rect x="760" y="230" width="34" height="70" />
        <rect x="800" y="205" width="26" height="95" />
        <rect x="832" y="244" width="40" height="56" />
        <rect x="880" y="190" width="22" height="110" />
        <rect x="908" y="226" width="46" height="74" />
        <rect x="1080" y="236" width="30" height="64" />
        <rect x="1116" y="214" width="20" height="86" />
        <rect x="1142" y="250" width="48" height="50" />
      </g>
      {/* cranes */}
      <g stroke="#0b1f3a" strokeWidth="5" fill="none" opacity="0.85">
        <path d="M990 300V150l90 0M990 170l70-20M1060 150v40" />
        <path d="M1210 300V170h-70M1210 186l-56-16" />
      </g>
      {/* lighthouse — sits right of the text panel on desktop */}
      <g transform="translate(130 0)">
        <path d="M600 300l10-110h20l10 110z" fill="#e9edf1" />
        <rect x="606" y="230" width="28" height="12" fill="#0e7f86" />
        <rect x="606" y="262" width="30" height="12" fill="#0e7f86" />
        <rect x="608" y="176" width="24" height="16" fill="#f3d9a4" />
        <path d="M604 176h32l-16-14z" fill="#e9edf1" />
      </g>
      <rect y="300" width="1290" height="160" fill="url(#sea)" />
      {/* water lines */}
      <g stroke="#9fc6cf" strokeOpacity="0.25" strokeWidth="2" strokeLinecap="round">
        <path d="M640 330h180M900 352h240M700 384h120M980 404h200M560 420h90" />
      </g>
      {/* sailboat */}
      <g transform="translate(870 268)">
        <path d="M0 40h90l-12 16H12z" fill="#e9edf1" />
        <path d="M44 -40v78H6z" fill="#e9edf1" opacity="0.92" />
        <path d="M50 -24v62h32z" fill="#0e7f86" />
      </g>
      {/* rising chart line */}
      <path
        d="M560 360 C 700 340, 760 300, 860 290 S 1080 210, 1290 150"
        stroke="#3fb3ba"
        strokeWidth="3"
        fill="none"
        strokeDasharray="2 10"
        strokeLinecap="round"
        opacity="0.8"
      />
    </svg>
  );
}

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="lg:pt-0">
      <Container>
        <div className="relative overflow-hidden">
          <div className="relative h-56 sm:h-auto sm:min-h-[460px]">
            <HarborArt />
          </div>
          <div className="relative bg-mist px-5 py-10 sm:absolute sm:left-10 sm:top-1/2 sm:w-[min(620px,calc(100%-5rem))] sm:-translate-y-1/2 sm:bg-white/85 sm:px-10 sm:py-12 sm:backdrop-blur-sm">
            <div className="border-l-4 border-accent pl-6">
              <h1
                id="hero-title"
                className="text-[1.9rem] font-light leading-[1.15] tracking-[-0.015em] text-navy-900 sm:text-[2.75rem]"
              >
                Managed investing on Hyperliquid, made easy
              </h1>
              <p className="mt-5 text-lg text-ink sm:text-[1.375rem]">
                Connect your wallet and invest in curated baskets starting at just $50.
              </p>
            </div>
            <ConnectWalletButton className={`${btnPrimary} mt-9`}>
              Connect wallet <ChevronRight />
            </ConnectWalletButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
