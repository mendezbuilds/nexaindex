"use client";

import { motion, useReducedMotion } from "framer-motion";
import { round } from "@/lib/round";

const SHARD_COUNT = 6;

// Same broken-glass facet vocabulary as About's FragmentedShards — this is
// the deliberate visual payoff: the same shards, now converging.
const CLIP_PATHS = [
  "polygon(15% 0%, 100% 12%, 82% 100%, 0% 88%)",
  "polygon(0% 22%, 78% 0%, 100% 78%, 22% 100%)",
  "polygon(10% 0%, 100% 28%, 88% 100%, 0% 66%)",
];

const SHARDS = Array.from({ length: SHARD_COUNT }, (_, i) => {
  const angle = (i / SHARD_COUNT) * Math.PI * 2;
  const jitter = 0.88 + ((i * 41) % 24) / 100;
  const radius = 38 * jitter;
  const x = round(50 + radius * Math.cos(angle));
  const y = round(50 + radius * Math.sin(angle) * 0.68);
  const size = 30 + ((i * 19) % 3) * 8;
  const rotate = ((i * 47) % 40) - 20;
  const isPurple = i % 2 === 0;
  const clipPath = CLIP_PATHS[i % CLIP_PATHS.length];
  const duration = 9 + ((i * 7) % 5);
  const delay = (i * 0.6) % 4;
  return { x, y, size, rotate, isPurple, clipPath, duration, delay };
});

/**
 * The resolution of About's FragmentedShards: the same broken pieces, now
 * drawn toward a single unified core along converging lines — the "many
 * assets, one token" mechanism, visually.
 */
export function ConvergingCore() {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden className="relative h-72 w-full sm:h-96">
      <div
        className="absolute inset-0 rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(34,211,238,0.14), rgba(168,85,247,0.12) 55%, transparent 78%)",
        }}
      />

      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        <defs>
          <linearGradient id="converge-line" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0" />
            <stop offset="100%" stopColor="#A855F7" stopOpacity="0.55" />
          </linearGradient>
        </defs>
        {SHARDS.map((s, i) => (
          <motion.line
            key={i}
            x1={s.x}
            y1={s.y}
            x2={50}
            y2={50}
            stroke="url(#converge-line)"
            strokeWidth={0.5}
            strokeDasharray="3 2.5"
            vectorEffect="non-scaling-stroke"
            animate={reduceMotion ? undefined : { strokeDashoffset: [0, -11] }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 2.8, ease: "linear", repeat: Infinity }
            }
          />
        ))}
      </svg>

      {SHARDS.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-[2px] border backdrop-blur-[2px]"
          style={{
            top: `${s.y}%`,
            left: `${s.x}%`,
            width: s.size,
            height: s.size,
            marginLeft: -s.size / 2,
            marginTop: -s.size / 2,
            clipPath: s.clipPath,
            borderColor: s.isPurple
              ? "rgba(168,85,247,0.35)"
              : "rgba(34,211,238,0.35)",
            background: s.isPurple
              ? "linear-gradient(135deg, rgba(168,85,247,0.2), rgba(168,85,247,0.04))"
              : "linear-gradient(135deg, rgba(34,211,238,0.2), rgba(34,211,238,0.04))",
            boxShadow: s.isPurple
              ? "0 0 20px rgba(168,85,247,0.12)"
              : "0 0 20px rgba(34,211,238,0.12)",
          }}
          initial={{ rotate: s.rotate }}
          animate={
            reduceMotion
              ? undefined
              : {
                  rotate: [s.rotate, s.rotate + 22, s.rotate - 22, s.rotate],
                  y: [0, -16, 16, 0],
                  x: [0, 10, -10, 0],
                }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: s.duration,
                  delay: s.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        />
      ))}

      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 64,
          height: 64,
          clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
          background: "linear-gradient(135deg, #22D3EE, #A855F7)",
          boxShadow:
            "0 0 40px rgba(168,85,247,0.35), 0 0 60px rgba(34,211,238,0.25)",
        }}
        initial={{ scale: 1, rotate: 0, opacity: 0.92 }}
        animate={
          reduceMotion
            ? undefined
            : { scale: [1, 1.2, 1], rotate: [0, 8, 0, -8, 0], opacity: [0.9, 1, 0.9] }
        }
        transition={
          reduceMotion
            ? undefined
            : { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }
      />
    </div>
  );
}
