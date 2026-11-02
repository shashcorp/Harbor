type IconProps = { className?: string };

export function ChevronRight({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronDown({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <path d="M4 7.5l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronUp({ className = "h-3 w-3" }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <path d="M3 10l5-5 5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Close({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
      <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
    </svg>
  );
}

export function Search({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5L21 21" strokeLinecap="round" />
    </svg>
  );
}

export function Menu({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

export function Shield({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" className={className} aria-hidden>
      <path d="M10 2.5l6 2.2v4.6c0 3.8-2.6 6.9-6 8.2-3.4-1.3-6-4.4-6-8.2V4.7l6-2.2z" strokeLinejoin="round" />
      <path d="M7.3 10l2 2 3.6-3.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Help({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" className={className} aria-hidden>
      <circle cx="10" cy="10" r="7.5" />
      <path d="M7.8 7.8a2.3 2.3 0 114 1.5c-.8.7-1.8 1.1-1.8 2.3" strokeLinecap="round" />
      <circle cx="10" cy="14.2" r=".6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Wallet({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
      <path d="M3 6.5A2.5 2.5 0 015.5 4H15v2.5" strokeLinejoin="round" />
      <rect x="3" y="6.5" width="14" height="10" rx="1.5" />
      <circle cx="13.5" cy="11.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Document({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" className={className} aria-hidden>
      <path d="M5 2.5h6.5L15 6v11.5H5z" strokeLinejoin="round" />
      <path d="M11.5 2.5V6H15M7.5 10h5M7.5 13h5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Line illustrations for the benefits row: navy strokes with a single accent detail. */

export function IconFlexible({ className = "h-16 w-16" }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <g stroke="var(--color-navy-900)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="38" cy="12" rx="10" ry="3.5" />
        <path d="M28 12v5c0 1.9 4.5 3.5 10 3.5s10-1.6 10-3.5v-5M28 17v5c0 1.9 4.5 3.5 10 3.5s10-1.6 10-3.5v-5M28 22v5c0 1.9 4.5 3.5 10 3.5s10-1.6 10-3.5v-5" />
        <path d="M44 52H10M16 46l-6 6 6 6" />
      </g>
      <path
        d="M20 41h34M48 35l6 6-6 6"
        stroke="var(--color-accent)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconBaskets({ className = "h-16 w-16" }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <g stroke="var(--color-navy-900)" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
        <rect x="8" y="12" width="22" height="22" rx="2" />
        <rect x="34" y="12" width="22" height="22" rx="2" />
        <rect x="8" y="38" width="22" height="16" rx="2" />
        <path d="M13 28l4-5 4 3 5-7" />
        <circle cx="45" cy="23" r="6" />
        <path d="M45 17v6h6" />
      </g>
      <rect x="34" y="38" width="22" height="16" rx="2" stroke="var(--color-accent)" strokeWidth="2.2" />
      <path d="M40 46h10" stroke="var(--color-accent)" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export function IconRecurring({ className = "h-16 w-16" }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <g stroke="var(--color-navy-900)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M52 32a20 20 0 01-34.6 13.7M12 32a20 20 0 0134.6-13.7" />
        <path d="M46.6 10.5v7.8h-7.8M17.4 53.5v-7.8h7.8" />
      </g>
      <path
        d="M32 20v12l-6 7"
        stroke="var(--color-accent)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
