import Container from "./Container";
import Logo from "./Logo";

const COLUMNS = [
  { title: "Invest", links: ["Managed baskets", "Harbor Vaults", "Harbor Private", "Fees"] },
  { title: "Learn", links: ["Getting started", "Wallet setup", "Research", "Glossary"] },
  { title: "Company", links: ["About Harbor", "Careers", "Press", "Contact"] },
  { title: "Legal", links: ["Terms of use", "Privacy", "Risk disclosure", "Cookie settings"] },
];

export default function Footer() {
  return (
    <footer className="bg-mist pb-28 pt-14 sm:pb-14">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_repeat(4,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-[240px] text-sm leading-relaxed text-muted">
              Managed investing on Hyperliquid. Your keys, your assets.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-sm font-semibold text-navy-900">{col.title}</h2>
              <ul className="mt-4 space-y-2.5 text-sm text-muted">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="transition-colors hover:text-navy-900">{l}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-12 border-t border-line pt-6 text-xs leading-relaxed text-muted">
          <p>
            Risk warning: Investing in digital assets involves significant risk, including the possible loss of
            all capital invested. Past performance is not a reliable indicator of future results. Harbor does not
            provide investment, tax or legal advice. Fee figures shown are placeholders. Availability depends on
            your jurisdiction.
          </p>
          <p className="mt-4">© {new Date().getFullYear()} Harbor. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
