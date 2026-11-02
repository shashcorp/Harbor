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
];

export type Answers = Record<string, number>;

/** Investment horizon is chosen on a slider, from 1 to 5 years. */
export const HORIZON_MIN = 1;
export const HORIZON_MAX = 5;
export const HORIZON_DEFAULT = 2;

/**
 * Risk tolerance levels chosen on a slider. Returns are the illustrative assumptions used across the site
 * (Low 5%, Medium 7.5%, High 10%); volatility and severe-market falls are estimates, not history.
 */
export const TOLERANCE_LEVELS = [
  { label: "Very low", hint: "Very low risk suits money you may need soon or cannot afford to see fall.", rate: 0.03, vol: 0.04, fall: 0.08, holding: 1, profile: 2 },
  { label: "Low", hint: "Low risk is the way to go if you might want to withdraw your money sooner.", rate: 0.05, vol: 0.08, fall: 0.15, holding: 2, profile: 3 },
  { label: "Moderate", hint: "A moderate level balances stability and growth over a few years.", rate: 0.0625, vol: 0.11, fall: 0.22, holding: 3, profile: 3 },
  { label: "Medium", hint: "Medium risk accepts noticeable swings in return for more growth potential.", rate: 0.075, vol: 0.15, fall: 0.3, holding: 4, profile: 4 },
  { label: "Above average", hint: "Above-average risk means large swings; you should be able to stay invested through them.", rate: 0.0875, vol: 0.22, fall: 0.4, holding: 5, profile: 5 },
  { label: "High", hint: "High risk can mean very sharp falls; only choose it for money you can leave invested.", rate: 0.1, vol: 0.3, fall: 0.55, holding: 5, profile: 6 },
] as const;
export const TOLERANCE_DEFAULT = 3;

/** True when the chosen holding period is shorter than the risk level recommends. */
export function horizonMismatch(answers: Answers) {
  const level = TOLERANCE_LEVELS[answers.tolerance ?? TOLERANCE_DEFAULT];
  return (answers.horizonYears ?? HORIZON_DEFAULT) < level.holding;
}

export type RiskProfile = {
  /** Index into TOLERANCE_LEVELS (0 = Very low … 5 = High). */
  level: number;
  label: string;
  description: string;
  /** Highest fund risk indicator (1–7) that fits this profile. */
  risk: number;
};

const DESCRIPTIONS = [
  "You want to preserve your assets and accept only very small fluctuations in value.",
  "You put stability first and accept small fluctuations in value for modest growth.",
  "You aim for steady growth over a few years while accepting moderate fluctuations in value.",
  "You strive for appreciation of your assets in the long term while accepting medium volatility of asset value.",
  "You aim for strong growth and accept large fluctuations in value along the way.",
  "You aim for maximum growth and accept very large fluctuations, including sharp temporary losses.",
];

/** Highest level for investors who are not yet familiar with funds. */
const UNFAMILIAR_CAP = 3;

export function computeProfile(answers: Answers): RiskProfile {
  let level = answers.tolerance ?? TOLERANCE_DEFAULT;
  if (answers.experience === 0) level = Math.min(level, UNFAMILIAR_CAP);
  const t = TOLERANCE_LEVELS[level];
  return { level, label: t.label, description: DESCRIPTIONS[level], risk: t.profile };
}

/** The matching multi-asset fund first, then the funds closest to the profile's risk level. */
export function recommendedFunds(risk: number, limit = 5): Fund[] {
  const eligible = FUNDS.filter((f) => f.risk <= risk);
  const core = eligible.filter((f) => f.category === "Multi-asset").sort((a, b) => b.risk - a.risk)[0];
  const rest = eligible.filter((f) => f !== core).sort((a, b) => b.risk - a.risk);
  return (core ? [core, ...rest] : rest).slice(0, limit);
}
