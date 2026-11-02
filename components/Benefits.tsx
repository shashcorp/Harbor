import Container from "./Container";
import SectionHeading from "./SectionHeading";
import { IconBaskets, IconFlexible } from "./icons";

const BENEFITS = [
  {
    Icon: IconFlexible,
    title: "Stay flexible",
    body: "Add money or withdraw to your wallet whenever you like – no lock-ups.",
  },
  {
    Icon: IconBaskets,
    title: "A tailored fund selection",
    body: "Invest in a curated list of actively and passively managed investment funds, chosen and monitored by Harbor.",
  },
];

export default function Benefits() {
  return (
    <section aria-labelledby="benefits-title" className="pb-20 sm:pb-24">
      <Container>
        <SectionHeading id="benefits-title">Your benefits</SectionHeading>
        <div className="grid gap-10 md:grid-cols-2 md:gap-0 md:divide-x md:divide-line">
          {BENEFITS.map(({ Icon, title, body }, i) => (
            <div key={title} className={i === 0 ? "md:pr-10" : "md:pl-10"}>
              <Icon />
              <h3 className="mt-6 text-xl font-normal text-navy-900">{title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
