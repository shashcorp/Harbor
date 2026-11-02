import Container from "./Container";
import SectionHeading from "./SectionHeading";
import { Document } from "./icons";
import { textLink } from "./ui";

export default function HowItWorks() {
  return (
    <section aria-labelledby="how-title" className="py-20 sm:py-24">
      <Container>
        <div className="max-w-[880px]">
          <SectionHeading id="how-title">How Harbor Invest works</SectionHeading>
          <p className="text-xl font-light leading-relaxed text-ink sm:text-[1.6rem]">
            Get a portfolio built on our research, featuring a tailored list of actively and passively managed
            investment funds that trade transparently on Hyperliquid.
          </p>
          <p className="mt-10 text-[1.0625rem]">
            <strong className="font-semibold text-navy-900">Simple flat fee</strong> – $19 per month, whatever your
            balance, plus Hyperliquid trading and network costs.
          </p>
          <p className="mt-2 leading-relaxed text-muted">
            Get 50% off your first month – just $9.50 – when you open your account.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-10">
            <a href="#" className={textLink}>
              Harbor Invest factsheet <Document className="h-5 w-5 text-accent" />
            </a>
            <a href="#" className={textLink}>
              Fund overview <Document className="h-5 w-5 text-accent" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
