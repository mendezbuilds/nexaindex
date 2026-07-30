"use client";

import { motion, useReducedMotion } from "framer-motion";
import { round } from "@/lib/round";

const NODE_COUNT = 6;
const NODES = Array.from({ length: NODE_COUNT }, (_, i) => {
  const angle = (i / NODE_COUNT) * Math.PI * 2;
  const r = 24;
  return {
    x: round(50 + r * Math.cos(angle)),
    y: round(50 + r * Math.sin(angle)),
  };
});

/**
 * Closing bookend to Hero's Orb — same core-and-satellites vocabulary, but
 * "arrived" rather than "arriving": a tight ring turning together as one
 * slow, unified rotation instead of Hero's independent staggered pulses.
 */
export function ResolvedOrb() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 sm:h-[480px] sm:w-[480px]"
    >
      <motion.div
        className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl sm:h-72 sm:w-72"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.4) 0%, rgba(168,85,247,0.32) 55%, transparent 75%)",
        }}
        animate={
          reduceMotion
            ? undefined
            : { scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }
        }
        transition={
          reduceMotion
            ? undefined
            : { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }
      />

      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        <defs>
          <linearGradient id="resolved-line" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0" />
            <stop offset="100%" stopColor="#A855F7" stopOpacity="0.55" />
          </linearGradient>
        </defs>

        <motion.g
          style={{ transformOrigin: "50px 50px" }}
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 48, ease: "linear", repeat: Infinity }
          }
        >
          {NODES.map((n, i) => (
            <line
              key={i}
              x1={n.x}
              y1={n.y}
              x2={50}
              y2={50}
              stroke="url(#resolved-line)"
              strokeWidth={0.3}
            />
          ))}
          {NODES.map((n, i) => (
            <circle key={i} cx={n.x} cy={n.y} r={1.4} fill="#22D3EE" />
          ))}
        </motion.g>
      </svg>

      <motion.div
        className="absolute left-1/2 top-1/2 h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "linear-gradient(135deg, #22D3EE, #A855F7)",
          boxShadow: "0 0 30px rgba(168,85,247,0.4), 0 0 46px rgba(34,211,238,0.25)",
        }}
        animate={
          reduceMotion
            ? undefined
            : { scale: [1, 1.15, 1], opacity: [0.9, 1, 0.9] }
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
