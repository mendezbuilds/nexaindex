import { round } from "@/lib/round";

const NODE_COUNT = 14;
const NODES = Array.from({ length: NODE_COUNT }, (_, i) => {
  const angle = (i / NODE_COUNT) * Math.PI * 2;
  // Slight radius jitter (deterministic, seeded by index) keeps the ring from
  // reading as a perfect, obviously-generated circle.
  const jitter = 0.85 + ((i * 37) % 30) / 100;
  const r = 42 * jitter;
  return {
    x: round(50 + r * Math.cos(angle)),
    y: round(50 + r * Math.sin(angle) * 0.62),
    delay: (i * 0.37) % 3,
    size: 2 + ((i * 17) % 5) * 0.4,
  };
});

/**
 * Signature Hero visual: a slowly pulsing core representing $NEXAI, with
 * satellite nodes (the underlying AI-sector assets) drawn toward it along
 * faint converging lines — literal representation of "many assets, one
 * index," not a generic glow/blob.
 */
export function Orb() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[520px] w-[720px] -translate-x-1/2 -translate-y-1/2"
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        <defs>
          <radialGradient id="orb-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#A855F7" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="orb-line" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {NODES.map((n, i) => (
          <line
            key={i}
            x1={n.x}
            y1={n.y}
            x2={50}
            y2={50}
            stroke="url(#orb-line)"
            strokeWidth={0.25}
          />
        ))}

        {NODES.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={n.size / 10}
            fill="#22D3EE"
            className="animate-orb-pulse"
            style={{
              animationDelay: `${n.delay}s`,
              transformOrigin: `${n.x}px ${n.y}px`,
            }}
          />
        ))}
      </svg>

      <div
        className="animate-orb-pulse absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.55) 0%, rgba(168,85,247,0.4) 55%, transparent 75%)",
        }}
      />
    </div>
  );
}
