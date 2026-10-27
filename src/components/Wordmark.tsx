// PROPOSED CONCEPT wordmark – no official logo could be sourced (see BUSINESS_RESEARCH.md).
// Replace with the studio's real logo once supplied; keep the monogram as favicon only if approved.

export function Monogram({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="22.5" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.7" />
      <circle cx="24" cy="24" r="19" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <text
        x="24"
        y="30.5"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond Variable', Georgia, serif"
        fontStyle="italic"
        fontSize="20"
        fontWeight="500"
        fill="currentColor"
      >
        MB
      </text>
    </svg>
  );
}

export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <Monogram className={`h-10 w-10 shrink-0 ${light ? 'text-gold-light' : 'text-gold'}`} />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1.55rem] italic font-medium ${light ? 'text-white' : 'text-ink'}`}>
          Mohit Bhola
        </span>
        <span className={`mt-1 text-[0.56rem] font-semibold uppercase tracking-[0.32em] ${light ? 'text-gold-light' : 'text-wine'}`}>
          Makeup Studio &amp; Academy
        </span>
      </span>
    </span>
  );
}
