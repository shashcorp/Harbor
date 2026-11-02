export const ONBOARDING_STEPS = [
  { title: "Define your risk profile", body: "Let's find out what type of investor you are." },
  { title: "Find the right Harbor funds", body: "Get recommendations based on your risk profile." },
  { title: "Open Harbor Invest", body: "Check the documents and accept the terms." },
  { title: "Start investing", body: "Fund your account with USDC and choose how often you invest." },
];

/** Vertical stepper: the current step has an outlined marker, the others are greyed out. */
export function Stepper({ current }: { current: number }) {
  return (
    <ol className="bg-white px-6 py-8 sm:px-9 sm:py-9">
      {ONBOARDING_STEPS.map((s, i) => {
        const active = i === current;
        const done = i < current;
        const last = i === ONBOARDING_STEPS.length - 1;
        return (
          <li key={s.title} className="relative flex gap-4 pb-8 last:pb-0" aria-current={active ? "step" : undefined}>
            {!last && <span aria-hidden className="absolute left-[17px] top-9 h-[calc(100%-2.25rem)] w-0.5 bg-line" />}
            <span
              aria-hidden
              className={`relative z-10 mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                active
                  ? "border-[3px] border-navy-900 bg-white"
                  : done
                    ? "bg-navy-900 text-white"
                    : "bg-[#d4d4d4]"
              }`}
            >
              {done && (
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M3.5 8.5l3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
            <div>
              <p className={`text-[1.3rem] leading-snug ${active || done ? "text-navy-900" : "text-muted"}`}>
                <span className="sr-only">Step {i + 1}: </span>
                {s.title}
              </p>
              <p className={`mt-1 ${active || done ? "text-ink" : "text-muted"}`}>{s.body}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export function InfoNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 flex items-center gap-4 bg-white px-6 py-6 sm:px-6">
      <span
        aria-hidden
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent font-serif text-lg font-bold italic text-white"
      >
        i
      </span>
      <p className="text-[1.05rem] text-ink">{children}</p>
    </div>
  );
}
