import Container from "./Container";
import SectionHeading from "./SectionHeading";
import InvestmentSimulator from "./InvestmentSimulator";

export default function CalculatorTeaser() {
  return (
    <section aria-labelledby="calc-title" className="pb-20 sm:pb-24">
      <Container>
        <div className="bg-mist px-6 py-12 sm:px-12 lg:py-16">
          <div className="max-w-[760px]">
            <SectionHeading id="calc-title">What could your investment be worth?</SectionHeading>
            <p className="text-lg leading-relaxed text-ink">
              Try different risk levels, holding periods and payments to see how your investment could develop over
              time.
            </p>
          </div>
          <div className="mt-10 bg-white px-6 py-8 shadow-[0_1px_0_var(--color-line)] sm:px-10 sm:py-10">
            <h3 className="text-[1.6rem] font-light text-navy-900 sm:text-[1.9rem]">How your investment could develop</h3>
            <div className="mt-3">
              <InvestmentSimulator riskSlider deductFee />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
