"use client";

import { motion, useReducedMotion } from "framer-motion";

const SHARD_COUNT = 8;

// Irregular quadrilaterals, not rectangles — the goal is broken glass /
// crystal facets, not tidy cards.
const CLIP_PATHS = [
  "polygon(15% 0%, 100% 12%, 82% 100%, 0% 88%)",
  "polygon(0% 22%, 78% 0%, 100% 78%, 22% 100%)",
  "polygon(10% 0%, 100% 28%, 88% 100%, 0% 66%)",
  "polygon(0% 10%, 90% 0%, 100% 90%, 12% 100%)",
];

const SHARDS = Array.from({ length: SHARD_COUNT }, (_, i) => {
  // Deterministic pseudo-scatter (seeded by index) — loose placement in 3D
  // space, each shard at its own depth, size, and tilt.
  const top = 6 + ((i * 41) % 78);
  const left = 4 + ((i * 59) % 80);
  const size = 56 + ((i * 23) % 5) * 14;
  const rotateZ = ((i * 37) % 60) - 30;
  const rotateX = ((i * 19) % 40) - 20;
  const rotateY = ((i * 29) % 50) - 25;
  const depth = -((i * 31) % 160);
  const isPurple = i % 2 === 0;
  const clipPath = CLIP_PATHS[i % CLIP_PATHS.length];
  const duration = 10 + ((i * 11) % 6);
  const delay = (i * 0.7) % 5;
  const driftRotate = 18 + ((i * 7) % 12);
  return {
    top,
    left,
    size,
    rotateZ,
    rotateX,
    rotateY,
    depth,
    isPurple,
    clipPath,
    duration,
    delay,
    driftRotate,
  };
});

/**
 * A shattered field of glass shards suspended in 3D space — the visual
 * counterpart to the About copy's "scattered, unmanaged exposure" idea.
 * "What We Do" is the natural place to resolve this into one unified form.
 */
export function FragmentedShards() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden
      className="relative h-72 w-full sm:h-96"
      style={{ perspective: "1100px" }}
    >
      <div
        className="absolute inset-0 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(34,211,238,0.10), rgba(168,85,247,0.08) 60%, transparent 80%)",
        }}
      />

      <motion.div
        className="absolute inset-0"
        style={{ transformStyle: "preserve-3d" }}
        initial={{ rotateY: -6 }}
        animate={reduceMotion ? undefined : { rotateY: [-6, 6, -6] }}
        transition={
          reduceMotion
            ? undefined
            : { duration: 26, ease: "easeInOut", repeat: Infinity }
        }
      >
        {SHARDS.map((s, i) => (
          <motion.div
            key={i}
            className="absolute rounded-[2px] border backdrop-blur-[2px]"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: s.size,
              height: s.size,
              clipPath: s.clipPath,
              transformStyle: "preserve-3d",
              borderColor: s.isPurple
                ? "rgba(168,85,247,0.35)"
                : "rgba(34,211,238,0.35)",
              background: s.isPurple
                ? "linear-gradient(135deg, rgba(168,85,247,0.20), rgba(168,85,247,0.03))"
                : "linear-gradient(135deg, rgba(34,211,238,0.20), rgba(34,211,238,0.03))",
              boxShadow: s.isPurple
                ? "0 0 24px rgba(168,85,247,0.14)"
                : "0 0 24px rgba(34,211,238,0.14)",
            }}
            initial={{
              rotateX: s.rotateX,
              rotateY: s.rotateY,
              rotateZ: s.rotateZ,
              translateZ: s.depth,
            }}
            animate={
              reduceMotion
                ? undefined
                : {
                    rotateZ: [
                      s.rotateZ,
                      s.rotateZ + s.driftRotate,
                      s.rotateZ - s.driftRotate * 0.6,
                      s.rotateZ,
                    ],
                    translateY: [0, -6, 6, 0],
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
      </motion.div>
    </div>
  );
}
