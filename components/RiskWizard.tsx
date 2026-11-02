"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
  HORIZON_DEFAULT,
  QUESTIONS,
  SECTIONS,
  TOLERANCE_DEFAULT,
  TOLERANCE_LEVELS,
  computeProfile,
  horizonMismatch,
  type Answers,
  type Question,
} from "@/lib/riskProfile";
import FundKnowledge from "./FundKnowledge";
import HorizonStep from "./HorizonStep";
import Modal from "./Modal";
import ToleranceStep from "./ToleranceStep";

type Step =
  | { kind: "question"; q: Question }
  | { kind: "learn" }
  | { kind: "horizon" }
  | { kind: "tolerance" }
  | { kind: "result" };

const q = (id: string) => QUESTIONS.find((x) => x.id === id)!;
const STEPS: Step[] = [
  { kind: "question", q: q("experience") },
  { kind: "learn" },
  { kind: "horizon" },
  { kind: "tolerance" },
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

function Sailboat() {
  return (
    <svg viewBox="0 0 240 200" className="mx-auto h-48 w-60" fill="none" aria-hidden>
      <g stroke="var(--color-navy-900)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M30 60c0-10 14-14 20-8 4-10 20-10 22 2 10-2 14 8 6 12H34c-6 0-8-4-4-6z" />
        <path d="M180 92c0-7 10-10 14-5 3-7 14-6 15 2 7 0 8 8 2 9h-27c-5 0-6-4-4-6z" />
        <path d="M122 20v140M122 20l20 8-20 6" />
        <path d="M118 36L64 148h54z" />
        <path d="M126 44l46 104h-46z" />
        <path d="M40 162h170l-14 18H58z" />
        <path d="M30 188c10-6 20 6 30 0s20 6 30 0 20 6 30 0 20 6 30 0 20 6 30 0" />
      </g>
      <path d="M126 100l26 8-4 10-22-6z" fill="var(--color-navy-900)" />
      <circle cx="98" cy="134" r="7" fill="var(--color-navy-900)" />
      <path d="M90 162l4-22h10l6 22z" fill="var(--color-accent)" />
    </svg>
  );
}

export default function RiskWizard({ initialAnswers }: { initialAnswers?: Answers }) {
  const router = useRouter();
  const { user } = useUser();
  const [answers, setAnswers] = useState<Answers>(
    initialAnswers ?? { horizonYears: HORIZON_DEFAULT, tolerance: TOLERANCE_DEFAULT },
  );
  const [step, setStep] = useState(initialAnswers ? RESULT : 0);
  const [readConfirmed, setReadConfirmed] = useState(false);
  const [mismatchOpen, setMismatchOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const current = STEPS[step];
  const question = current.kind === "question" ? current.q : null;
  const familiar = answers.experience === 1;
  const section =
    current.kind === "result" ? 3 : current.kind === "learn" ? 1 : current.kind === "question" ? current.q.section : 2;
  const profile = current.kind === "result" ? computeProfile(answers) : null;

  const canNext =
    current.kind === "learn"
      ? familiar || readConfirmed
      : current.kind === "question"
        ? answers[current.q.id] !== undefined
        : true;

  function set(key: string, value: number) {
    setAnswers((a) => ({ ...a, [key]: value }));
  }

  function go(n: number) {
    setStep(n);
    window.scrollTo({ top: 0 });
  }

  async function saveAndShowResult() {
    setSaving(true);
    const p = computeProfile(answers);
    await user
      ?.update({
        unsafeMetadata: { ...user.unsafeMetadata, riskProfile: { answers, level: p.level, label: p.label, risk: p.risk } },
      })
      .catch(() => {});
    setSaving(false);
    go(RESULT);
  }

  async function next() {
    if (!canNext) return;
    if (current.kind === "tolerance") {
      if (horizonMismatch(answers) && !mismatchOpen) return setMismatchOpen(true);
      return saveAndShowResult();
    }
    if (current.kind === "result") {
      // Go straight on to step 2: find the right Harbor funds for this profile.
      router.push("/account/funds");
      router.refresh();
      return;
    }
    go(step + 1);
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
              <span className={`block h-1 ${i === section ? "bg-accent" : i < section ? "bg-[#a9adb2]" : "bg-line"}`} />
            </li>
          ))}
        </ol>
      </nav>

      <div className="flex-1 bg-[#f4f4f4] pb-36">
        <div className="mx-auto w-full max-w-[1290px] px-5 pt-10 sm:px-8 sm:pt-12">
          {current.kind === "learn" && (
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
          )}

          {question && (
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
                      onSelect={() => set(question.id, i)}
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
          )}

          {current.kind === "horizon" && (
            <HorizonStep years={answers.horizonYears ?? HORIZON_DEFAULT} onChange={(y) => set("horizonYears", y)} />
          )}

          {current.kind === "tolerance" && (
            <ToleranceStep
              level={answers.tolerance ?? TOLERANCE_DEFAULT}
              years={answers.horizonYears ?? HORIZON_DEFAULT}
              onChange={(l) => set("tolerance", l)}
            />
          )}

          {profile && (
            <div className="grid max-w-[820px] gap-6 bg-white px-6 py-10 sm:grid-cols-[minmax(0,1fr)_240px] sm:px-7">
              <div>
                <p className="text-muted">Based on your entries, your risk profile is:</p>
                <h1 className="mt-5 text-[2rem] font-light text-navy-900">{profile.label}</h1>
                <div className="mt-3 flex items-center gap-3 text-sm text-muted">
                  <span>Very low</span>
                  <span className="flex gap-1.5" aria-label={`Level ${profile.level + 1} of ${TOLERANCE_LEVELS.length}`}>
                    {TOLERANCE_LEVELS.map((l, i) => (
                      <span key={l.label} className={`h-[3px] w-3.5 ${i <= profile.level ? "bg-navy-900" : "bg-[#c4c4c4]"}`} />
                    ))}
                  </span>
                  <span>High</span>
                </div>
                <p className="mt-6 max-w-[380px] text-ink">{profile.description}</p>
                <p className="mt-5 text-xs text-muted">
                  An indication based on your answers, not personal investment advice.{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setAnswers({ horizonYears: HORIZON_DEFAULT, tolerance: TOLERANCE_DEFAULT });
                      setReadConfirmed(false);
                      go(0);
                    }}
                    className="font-semibold text-accent hover:text-accent-600"
                  >
                    Retake the questionnaire
                  </button>
                </p>
              </div>
              <Sailboat />
            </div>
          )}
        </div>
      </div>

      <Modal open={mismatchOpen} onClose={() => setMismatchOpen(false)}>
        <div className="flex gap-5">
          <svg viewBox="0 0 48 44" className="h-11 w-12 shrink-0" aria-hidden>
            <path d="M24 2L46 42H2z" fill="#e3b42b" />
            <path d="M24 14v14" stroke="#1c232d" strokeWidth="4" strokeLinecap="round" />
            <circle cx="24" cy="35" r="2.6" fill="#1c232d" />
          </svg>
          <div>
            <h2 className="text-xl text-navy-900">Something doesn&apos;t match</h2>
            <p className="mt-4 leading-relaxed text-ink">
              For the selected risk tolerance, we recommend a longer holding period than the period you have selected. A
              shorter holding period increases the probability that your investment does not have enough time to recover
              from potential losses caused by market fluctuations. You can either select a lower risk tolerance or accept
              the higher risk.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => {
                  setMismatchOpen(false);
                  saveAndShowResult();
                }}
                className="inline-flex min-w-[100px] items-center justify-center bg-navy-900 px-6 py-3 font-semibold text-white hover:bg-navy-800"
              >
                Accept
              </button>
              <button
                type="button"
                onClick={() => setMismatchOpen(false)}
                className="inline-flex items-center justify-center bg-[#ececec] px-6 py-3 font-semibold text-navy-900 hover:bg-line"
              >
                Change risk tolerance
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white shadow-[0_-6px_20px_rgba(0,0,0,0.06)]">
        <div className="mx-auto flex w-full max-w-[1290px] gap-6 px-5 py-6 sm:px-8">
          <button
            type="button"
            onClick={next}
            disabled={!canNext || saving}
            className="inline-flex min-w-[120px] items-center justify-center bg-navy-900 px-8 py-3.5 font-semibold text-white transition-colors hover:bg-navy-800 disabled:cursor-not-allowed disabled:bg-[#e6e6e6] disabled:text-[#a3a3a3]"
          >
            {saving ? "Saving…" : "Next"}
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
