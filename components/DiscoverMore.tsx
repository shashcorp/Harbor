import Container from "./Container";
import SectionHeading from "./SectionHeading";
import { ChevronRight } from "./icons";
import { btnOutline } from "./ui";

function VaultArt() {
  return (
    <svg viewBox="0 0 400 220" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="400" height="220" fill="#12294a" />
      <g stroke="#3fb3ba" strokeWidth="1" opacity="0.25">
        {Array.from({ length: 9 }, (_, i) => (
          <path key={i} d={`M0 ${30 + i * 22}H400`} />
        ))}
      </g>
      {[40, 70, 100, 130, 160, 190, 220, 250, 280, 310, 340].map((x, i) => {
        const h = 40 + ((i * 37) % 90);
        const up = i % 3 !== 1;
        return (
          <g key={x}>
            <path d={`M${x + 8} ${190 - h - 14}V${190 + 4}`} stroke={up ? "#3fb3ba" : "#e9edf1"} strokeWidth="1.5" />
            <rect x={x} y={190 - h} width="16" height={h * 0.6} fill={up ? "#0e7f86" : "#e9edf1"} />
          </g>
        );
      })}
    </svg>
  );
}

function AdvisorArt() {
  return (
    <svg viewBox="0 0 400 220" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="400" height="220" fill="#e8f4f4" />
      <circle cx="320" cy="50" r="70" fill="#f3d9a4" opacity="0.6" />
      <g fill="#0b1f3a">
        <circle cx="150" cy="92" r="24" />
        <path d="M104 190c0-34 20-60 46-60s46 26 46 60z" />
      </g>
      <g fill="#0e7f86">
        <circle cx="262" cy="100" r="22" />
        <path d="M220 190c0-30 18-54 42-54s42 24 42 54z" />
      </g>
      <rect x="80" y="186" width="250" height="8" fill="#1e3a5f" />
      <g fill="#fff" stroke="#1e3a5f" strokeWidth="1.5">
        <rect x="186" y="40" width="64" height="40" rx="4" />
      </g>
      <path d="M196 66l10-8 10 6 14-12" stroke="#0e7f86" strokeWidth="2" fill="none" />
    </svg>
  );
}

export default function DiscoverMore() {
  return (
    <section aria-labelledby="discover-title" className="pb-20 sm:pb-24">
      <Container>
        <SectionHeading id="discover-title">Discover more</SectionHeading>
        <div className="space-y-5">
          <article className="grid gap-8 bg-mist p-6 sm:p-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-10">
            <div className="aspect-[16/9] overflow-hidden md:aspect-auto md:min-h-[240px]">
              <VaultArt />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-normal text-navy-900">Prefer to pick positions yourself?</h3>
              <p className="mt-3 leading-relaxed text-ink">
                With Harbor Vaults you trade self-directed on Hyperliquid while keeping Harbor&apos;s research,
                risk limits and reporting at your side.
              </p>
              <div className="mt-8">
                <a href="#" className={btnOutline}>
                  Explore Harbor Vaults <ChevronRight />
                </a>
              </div>
            </div>
          </article>

          <article className="grid gap-8 bg-mist p-6 sm:p-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-10">
            <div className="aspect-[16/9] overflow-hidden md:aspect-auto md:min-h-[240px]">
              <AdvisorArt />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-normal text-navy-900">Would you prefer personal guidance?</h3>
              <p className="mt-3 leading-relaxed text-ink">
                Harbor Private may be a better fit. Work with a dedicated specialist to define your goals and a
                portfolio tailored to you.
              </p>
              <ul className="mt-4 space-y-2.5">
                {[
                  "Individual guidance, including a risk profile",
                  "Calls by video at a time that suits you",
                  "Ideal for larger portfolios or more complex needs",
                ].map((b) => (
                  <li key={b} className="flex gap-4">
                    <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-navy-900" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <a href="#" className={btnOutline}>
                  Book a call <ChevronRight />
                </a>
              </div>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
