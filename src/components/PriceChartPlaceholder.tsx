const PATH =
  "M0,72 C 20,68 34,52 52,54 C 70,56 82,30 100,34 C 118,38 130,20 148,16 C 166,12 180,26 198,22 C 216,18 230,4 248,2";

export function PriceChartPlaceholder() {
  return (
    <div className="w-full max-w-md rounded-2xl border border-white/8 bg-bg-raised/60 p-4">
      <svg
        viewBox="0 0 248 90"
        className="h-24 w-full overflow-visible"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="chart-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
          <linearGradient id="chart-fill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A855F7" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d={`${PATH} L248,90 L0,90 Z`}
          fill="url(#chart-fill)"
          stroke="none"
        />
        <path
          d={PATH}
          fill="none"
          stroke="url(#chart-line)"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      </svg>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-wide text-ink-dim">
        Testnet preview — live basket NAV chart ships in a later phase
      </p>
    </div>
  );
}
