import Container from "./Container";
import SectionHeading from "./SectionHeading";
import { Document } from "./icons";
import { textLink } from "./ui";

const POINTS = [
  { lead: "Invest in up to five baskets", rest: "of funds and themes" },
  { lead: "Make flexible deposits or set up a recurring plan", rest: "– you decide how often you invest" },
  {
    lead: "Transparent management fee",
    rest: "– 0.75% per year plus Hyperliquid trading and network costs",
  },
];

export default function HowItWorks() {
  return (
    <section aria-labelledby="how-title" className="py-20 sm:py-24">
      <Container>
        <div className="max-w-[880px]">
          <SectionHeading id="how-title">How Harbor managed investing works</SectionHeading>
          <p className="text-xl font-light leading-relaxed text-ink sm:text-[1.6rem]">
            Get a portfolio built on our research, featuring carefully selected and broadly diversified baskets
            that trade transparently on Hyperliquid.
          </p>
          <ul className="mt-10 space-y-4 text-[1.0625rem]">
            {POINTS.map((p) => (
              <li key={p.lead} className="flex gap-4">
                <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-navy-900" />
                <span>
                  <strong className="font-semibold text-navy-900">{p.lead}</strong> {p.rest}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-10 leading-relaxed text-muted">
            Early-access members pay a reduced fee of 0.40% per year during their first twelve months. Fee figures
            on this page are placeholders and will be confirmed in the Harbor fee schedule.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-10">
            <a href="#" className={textLink}>
              Harbor factsheet <Document className="h-5 w-5 text-accent" />
            </a>
            <a href="#" className={textLink}>
              Basket overview <Document className="h-5 w-5 text-accent" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
