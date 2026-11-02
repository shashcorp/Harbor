export default function Logo({ inverted = false }: { inverted?: boolean }) {
  const ink = inverted ? "#ffffff" : "var(--color-navy-900)";
  const mark = inverted ? "var(--color-navy-900)" : "#ffffff";
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden>
        <rect width="32" height="32" rx="7" fill={ink} />
        <path d="M10 7.5v12M22 7.5v12M10 13.5h12" stroke={mark} strokeWidth="2.4" strokeLinecap="round" />
        <path
          d="M6.5 24c1.6 0 1.6 1.4 3.2 1.4S11.3 24 12.9 24s1.6 1.4 3.1 1.4 1.6-1.4 3.2-1.4 1.6 1.4 3.2 1.4 1.6-1.4 3.1-1.4"
          stroke="var(--color-accent)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-[1.35rem] font-semibold tracking-[-0.02em]" style={{ color: ink }}>
        Harbor
      </span>
    </span>
  );
}
