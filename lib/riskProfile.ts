import { FUNDS, type Fund } from "./funds";

export type Option = { label: string; score: number };
export type Question = { id: string; section: number; question: string; options: Option[]; why: string };

export const SECTIONS = ["Fund experience", "Fund knowledge", "Investment horizon and risk tolerance", "Your risk profile"];

export const QUESTIONS: Question[] = [
  {
    id: "experience",
    section: 0,
    question: "Are you familiar with the characteristics and risks of funds?",
    options: [
      { label: "No, I want more information", score: 0 },
      { label: "Yes, I'm familiar with them", score: 1 },
    ],
    why: "The more we know about your knowledge and experience with investment funds, the better we can suggest funds that suit you. Investing in funds always involves risk, and we want to make sure you understand both the risks and the characteristics of each fund. For every fund we provide a factsheet, a simplified prospectus and a key information document to support your decision.",
  },
  {
    id: "horizon",
    section: 2,
    question: "When might you need the money you invest?",
    options: [
      { label: "Within 1 year", score: 0 },
      { label: "In 1 to 3 years", score: 1 },
      { label: "In 3 to 5 years", score: 2 },
    ],
    why: "The longer you can stay invested, the more time your investment has to recover from falls in value. A short horizon points to more defensive funds.",
  },
  {
    id: "tolerance",
    section: 2,
    question: "If your investment fell by 20% in one month, what would you do?",
    options: [
      { label: "Sell everything", score: 0 },
      { label: "Sell some of it", score: 1 },
      { label: "Do nothing and wait", score: 2 },
      { label: "Invest more", score: 3 },
    ],
    why: "Every Harbor fund can lose value, and some can fall sharply. How you would react to a loss is one of the best indicators of the level of risk you are comfortable with.",
  },
];

export type Answers = Record<string, number>;

export type RiskProfile = { risk: number; label: string; description: string };

const PROFILES: Record<number, Omit<RiskProfile, "risk">> = {
  2: { label: "Defensive", description: "You put preserving your capital first and accept only small swings in value." },
  3: { label: "Balanced", description: "You want some growth but prefer a portfolio anchored in cash and broad indices." },
  4: { label: "Growth", description: "You accept noticeable swings in value in return for higher potential growth." },
  5: { label: "Aggressive", description: "You are comfortable with large swings and aim for maximum long-term growth." },
  6: { label: "High risk", description: "You accept sharp falls in value and can invest in concentrated crypto funds." },
  7: { label: "Very high risk", description: "You accept very large losses and can invest in single-theme and satellite funds." },
};

export function computeProfile(answers: Answers): RiskProfile {
  const total = QUESTIONS.reduce((sum, q) => sum + (q.options[answers[q.id]]?.score ?? 0), 0); // 0..6
  let risk = [2, 2, 3, 4, 4, 5, 6][total] ?? 2;
  // Investors who are not yet familiar with funds are capped at a growth profile.
  if (answers.experience === 0) risk = Math.min(risk, 4);
  return { risk, ...PROFILES[risk] };
}

/** The matching multi-asset fund first, then the funds closest to the profile's risk level. */
export function recommendedFunds(risk: number, limit = 5): Fund[] {
  const eligible = FUNDS.filter((f) => f.risk <= risk);
  const core = eligible.filter((f) => f.category === "Multi-asset").sort((a, b) => b.risk - a.risk)[0];
  const rest = eligible.filter((f) => f !== core).sort((a, b) => b.risk - a.risk);
  return (core ? [core, ...rest] : rest).slice(0, limit);
}
