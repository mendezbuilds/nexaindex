export function GrantsFundBlock() {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/8 bg-bg-raised/60 px-5 py-4">
      <svg
        aria-hidden
        viewBox="0 0 40 40"
        className="h-10 w-10 shrink-0 overflow-visible"
      >
        <circle
          cx="20"
          cy="20"
          r="17"
          fill="none"
          stroke="url(#grants-ring)"
          strokeWidth="2"
          strokeDasharray="4 3"
          className="animate-fee-flow"
        />
        <defs>
          <linearGradient id="grants-ring" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
        </defs>
      </svg>
      <p className="text-sm text-ink-dim">
        <span className="bg-gradient-to-r from-cyan to-purple bg-clip-text font-display text-base font-medium text-transparent">
          10% of every management fee
        </span>{" "}
        routes directly to the AI Grants Fund, funding new AI-sector projects
        building on NEXAI.
      </p>
    </div>
  );
}
