"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { QUESTIONS, SECTIONS, computeProfile, recommendedFunds, type Answers, type Question } from "@/lib/riskProfile";
import FundKnowledge from "./FundKnowledge";

type Step = { kind: "question"; q: Question } | { kind: "learn" } | { kind: "result" };

const q = (id: string) => QUESTIONS.find((x) => x.id === id)!;
const STEPS: Step[] = [
  { kind: "question", q: q("experience") },
  { kind: "learn" },
  { kind: "question", q: q("horizon") },
  { kind: "question", q: q("tolerance") },
  { kind: "result" },
];
const RESULT = STEPS.length - 1;

function Lightbulb() {
  return (
    <svg viewBox="0 0 160 170" className="mx-auto h-40 w-40" fill="none" aria-hidden>
      <g stroke="var(--color-navy-900)" strokeWidth="2" strokeLinecap="round">
        <path d="M80 8v14M38 26l10 10M122 26l-10 10M22 72h14M124 72h14" />
        <path d="M80 30c-24 0-44 19-44 43 0 15 8 27 19 35 5 4 8 10 8 16v4h34v-4c0-6 3-12 8-16 11-8 19-20 19-35 0-24-20-43-44-43z" />
        <path d="M72 128L66 66c4-6 10-6 12 0 2-6 8-6 12 0l-6 62" strokeLinejoin="round" />
      </g>
      <rect x="62" y="128" width="36" height="22" rx="3" fill="var(--color-accent)" />
      <path d="M62 135h36M62 142h36" stroke="#fff" strokeWidth="1.6" />
      <path d="M68 150h24l-4 8H72z" fill="var(--color-navy-900)" />
    </svg>
  );
}

function Option({
  label,
  checked,
  onSelect,
  name,
}: {
  label: string;
  checked: boolean;
  onSelect: () => void;
  name: string;
}) {
  return (
    <label
      className={`flex cursor-pointer items-center justify-between gap-6 bg-white px-7 py-7 transition-shadow has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent ${
        checked ? "shadow-[inset_0_0_0_2px_var(--color-accent)]" : "hover:shadow-[inset_0_0_0_1px_var(--color-line)]"
      }`}
    >
      <span className="text-[1.15rem] text-ink">{label}</span>
      <input type="radio" name={name} checked={checked} onChange={onSelect} className="sr-only" />
      <span
        aria-hidden
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
          checked ? "border-accent" : "border-[#9aa0a6]"
        }`}
      >
        {checked && <span className="h-3.5 w-3.5 rounded-full bg-accent" />}
      </span>
    </label>
  );
}

export default function RiskWizard({ initialAnswers }: { initialAnswers?: Answers }) {
  const router = useRouter();
  const { user } = useUser();
  const [answers, setAnswers] = useState<Answers>(initialAnswers ?? {});
  const [step, setStep] = useState(initialAnswers ? RESULT : 0);
  const [readConfirmed, setReadConfirmed] = useState(false);
  const [saving, setSaving] = useState(false);

  const current = STEPS[step];
  const isResult = current.kind === "result";
  const isLearn = current.kind === "learn";
  const question = current.kind === "question" ? current.q : null;
  const familiar = answers.experience === 1;
  const section = isResult ? SECTIONS.length - 1 : isLearn ? 1 : question!.section;
  const profile = isResult ? computeProfile(answers) : null;

  const canNext = isResult || (isLearn ? familiar || readConfirmed : answers[question!.id] !== undefined);

  function go(n: number) {
    setStep(n);
    window.scrollTo({ top: 0 });
  }

  async function next() {
    if (!canNext) return;
    if (step < RESULT - 1) return go(step + 1);
    if (step === RESULT - 1) {
      setSaving(true);
      const p = computeProfile(answers);
      await user
        ?.update({ unsafeMetadata: { ...user.unsafeMetadata, riskProfile: { answers, risk: p.risk, label: p.label } } })
        .catch(() => {});
      setSaving(false);
      return go(RESULT);
    }
    router.push("/account");
    router.refresh();
  }

  function back() {
    if (step === 0) return router.push("/account");
    go(step - 1);
  }

  return (
    <div className="flex min-h-[calc(100vh-72px)] flex-col">
      {/* Section progress */}
      <nav aria-label="Questionnaire progress" className="border-b border-line bg-white">
        <ol className="mx-auto grid w-full max-w-[1290px] grid-cols-4 gap-1.5 px-5 sm:px-8">
          {SECTIONS.map((s, i) => (
            <li key={s} aria-current={i === section ? "step" : undefined} className="pt-4">
              <span
                className={`block truncate pb-3 text-xs sm:text-sm ${i === section ? "text-navy-900" : "text-muted"}`}
              >
                {s}
              </span>
              <span className={`block h-1 ${i <= section ? "bg-accent" : "bg-line"}`} />
            </li>
          ))}
        </ol>
      </nav>

      <div className="flex-1 bg-[#f4f4f4] pb-36">
        <div className="mx-auto w-full max-w-[1290px] px-5 pt-10 sm:px-8 sm:pt-12">
          {isLearn ? (
            <>
              <h1 className="text-[1.9rem] font-light leading-tight tracking-[-0.01em] text-navy-900 sm:text-[2.6rem]">
                {familiar ? "If needed, you can refresh your fund knowledge here" : "Let's have a look at funds"}
              </h1>
              <div className="mt-10 max-w-[1090px]">
                <FundKnowledge />
                {!familiar && (
                  <label className="mt-4 flex cursor-pointer items-start gap-4 bg-white px-6 py-6 sm:px-8">
                    <input
                      type="checkbox"
                      checked={readConfirmed}
                      onChange={(e) => setReadConfirmed(e.target.checked)}
                      className="mt-1 h-5 w-5 shrink-0 accent-[var(--color-accent)]"
                    />
                    <span className="text-ink">
                      I have read this information and understand the characteristics and risks of Harbor funds.
                    </span>
                  </label>
                )}
              </div>
            </>
          ) : question ? (
            <>
              <h1 className="max-w-[980px] text-[1.9rem] font-light leading-tight tracking-[-0.01em] text-navy-900 sm:text-[2.6rem]">
                {question.question}
              </h1>
              <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,460px)_1fr_405px]">
                <fieldset className="space-y-5">
                  <legend className="sr-only">{question.question}</legend>
                  {question.options.map((o, i) => (
                    <Option
                      key={o.label}
                      name={question.id}
                      label={o.label}
                      checked={answers[question.id] === i}
                      onSelect={() => setAnswers({ ...answers, [question.id]: i })}
                    />
                  ))}
                </fieldset>
                <div className="hidden lg:block" />
                <aside className="bg-white px-8 py-10">
                  <Lightbulb />
                  <h2 className="mt-4 text-[1.75rem] font-light text-navy-900">Why do we ask?</h2>
                  <p className="mt-5 text-sm leading-relaxed text-muted">{question.why}</p>
                </aside>
              </div>
            </>
          ) : (
            profile && (
              <>
                <h1 className="text-[1.9rem] font-light leading-tight tracking-[-0.01em] text-navy-900 sm:text-[2.6rem]">
                  Your risk profile: {profile.label}
                </h1>
                <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_405px]">
                  <div className="space-y-6">
                    <div className="bg-white px-7 py-8">
                      <p className="text-lg text-ink">{profile.description}</p>
                      <ol
                        className="mt-6 grid max-w-[460px] grid-cols-7 gap-1 text-center text-sm font-semibold"
                        aria-label={`Risk level ${profile.risk} of 7`}
                      >
                        {Array.from({ length: 7 }, (_, i) => i + 1).map((n) => (
                          <li
                            key={n}
                            className={n === profile.risk ? "bg-navy-900 py-2 text-white" : "bg-mist py-2 text-muted"}
                          >
                            {n}
                          </li>
                        ))}
                      </ol>
                      <div className="mt-1 flex max-w-[460px] justify-between text-xs text-muted">
                        <span>Lower risk</span>
                        <span>Higher risk</span>
                      </div>
                    </div>
                    <div className="bg-white px-7 py-8">
                      <h2 className="text-xl font-normal text-navy-900">Funds that match your profile</h2>
                      <ul className="mt-4 divide-y divide-line border-y border-line">
                        {recommendedFunds(profile.risk).map((f) => (
                          <li key={f.code}>
                            <Link
                              href={`/funds/${f.code}`}
                              className="flex items-center justify-between gap-4 py-4 transition-colors hover:text-accent"
                            >
                              <span>
                                <span className="block font-semibold text-navy-900">{f.shortName}</span>
                                <span className="text-sm text-muted">
                                  {f.code} · {f.theme}
                                </span>
                              </span>
                              <span className="shrink-0 text-sm text-muted">Risk {f.risk}/7</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Link href="/funds" className="mt-4 inline-block text-sm font-semibold text-accent hover:text-accent-600">
                        See all funds
                      </Link>
                    </div>
                  </div>
                  <aside className="h-fit bg-white px-8 py-10">
                    <Lightbulb />
                    <h2 className="mt-4 text-[1.75rem] font-light text-navy-900">What happens next?</h2>
                    <p className="mt-5 text-sm leading-relaxed text-muted">
                      Your risk profile is saved to your account. Next, pick the funds you want to invest in. You can
                      retake the questionnaire at any time. This profile is an indication based on your answers, not
                      personal investment advice.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setAnswers({});
                        setReadConfirmed(false);
                        go(0);
                      }}
                      className="mt-5 text-sm font-semibold text-accent hover:text-accent-600"
                    >
                      Retake the questionnaire
                    </button>
                  </aside>
                </div>
              </>
            )
          )}
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white shadow-[0_-6px_20px_rgba(0,0,0,0.06)]">
        <div className="mx-auto flex w-full max-w-[1290px] gap-6 px-5 py-6 sm:px-8">
          <button
            type="button"
            onClick={next}
            disabled={!canNext || saving}
            className="inline-flex min-w-[120px] items-center justify-center bg-navy-900 px-8 py-3.5 font-semibold text-white transition-colors hover:bg-navy-800 disabled:cursor-not-allowed disabled:bg-[#e6e6e6] disabled:text-[#a3a3a3]"
          >
            {saving ? "Saving…" : isResult ? "Continue" : "Next"}
          </button>
          <button
            type="button"
            onClick={back}
            className="inline-flex min-w-[120px] items-center justify-center bg-[#ececec] px-8 py-3.5 font-semibold text-navy-900 transition-colors hover:bg-line"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
