export const MONTHLY_FEE = 19;
export const FIRST_MONTH_FEE = MONTHLY_FEE / 2;

export type SimPoint = { year: number; first: number; payments: number; value: number };

/**
 * Value of an investment over time: a first payment now, a yearly payment at the start of each
 * following year, monthly compounding at `annualRate`, optionally net of the Harbor monthly fee.
 * Returns one point per year (0..years).
 */
export function simulate({
  years,
  first,
  yearly,
  annualRate,
  deductFee = false,
}: {
  years: number;
  first: number;
  yearly: number;
  annualRate: number;
  deductFee?: boolean;
}): SimPoint[] {
  const r = annualRate / 12;
  let value = first;
  let payments = 0;
  const points: SimPoint[] = [{ year: 0, first, payments: 0, value: first }];
  for (let m = 0; m < years * 12; m++) {
    if (m > 0 && m % 12 === 0) {
      value += yearly;
      payments += yearly;
    }
    const fee = deductFee ? (m === 0 ? FIRST_MONTH_FEE : MONTHLY_FEE) : 0;
    value = Math.max(0, value * (1 + r) - fee);
    if ((m + 1) % 12 === 0) points.push({ year: (m + 1) / 12, first, payments, value });
  }
  return points;
}
