import Container from "./Container";
import SectionHeading from "./SectionHeading";
import { IconBaskets, IconFlexible, IconRecurring } from "./icons";

const BENEFITS = [
  {
    Icon: IconFlexible,
    title: "Stay flexible",
    body: "Add funds whenever you like, pause your plan or withdraw to your wallet at any time — no lock-ups.",
  },
  {
    Icon: IconBaskets,
    title: "Choose funds and ETFs",
    body: "Combine as many funds and ETFs as you like – diversified core holdings or focused themes, with no limit.",
  },
  {
    Icon: IconRecurring,
    title: "Set it up once, invest regularly",
    body: "Schedule a recurring plan and Harbor rebalances for you, so your portfolio stays on target.",
  },
];

export default function Benefits() {
  return (
    <section aria-labelledby="benefits-title" className="pb-20 sm:pb-24">
      <Container>
        <SectionHeading id="benefits-title">Your benefits</SectionHeading>
        <div className="grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-line">
          {BENEFITS.map(({ Icon, title, body }, i) => (
            <div key={title} className={i === 0 ? "md:pr-10" : i === 1 ? "md:px-10" : "md:pl-10"}>
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
