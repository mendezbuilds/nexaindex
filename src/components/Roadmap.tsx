"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";

type ChecklistStatus = "done" | "partial" | "not-started";

type Milestone = {
  kind: "milestone";
  id: string;
  label: string;
  title: string;
  date: string;
  status: "complete" | "in-progress" | "upcoming";
  description: string;
  checklist?: { text: string; status: ChecklistStatus }[];
  lineAfter: "gradient" | "muted";
};

type TodayMarker = {
  kind: "today";
  date: string;
  lineAfter: "gradient" | "muted";
};

const ITEMS: (Milestone | TodayMarker)[] = [
  {
    kind: "milestone",
    id: "M1",
    label: "M1",
    title: "Architecture",
    date: "Jun–Jul 2026",
    status: "complete",
    description:
      "Framework selection, technical plan, dev environment setup.",
    lineAfter: "gradient",
  },
  {
    kind: "today",
    date: "Jul 2026",
    lineAfter: "muted",
  },
  {
    kind: "milestone",
    id: "M2",
    label: "M2",
    title: "Testnet",
    date: "Aug–Oct 2026",
    status: "in-progress",
    description: "Smart contract deployed and functional on Base testnet.",
    checklist: [
      {
        text: "Core protocol (mint/redeem, zapper) — built and tested on testnet",
        status: "done",
      },
      {
        text: "Multisig/timelock admin structure — built and tested, not yet deployed for real",
        status: "partial",
      },
      {
        text: "Governance token — built and tested, not yet deployed for real",
        status: "partial",
      },
      {
        text: "20-token basket scaling — design only, not yet built",
        status: "not-started",
      },
    ],
    lineAfter: "muted",
  },
  {
    kind: "milestone",
    id: "M3",
    label: "M3",
    title: "Audit Ready",
    date: "Nov–Dec 2026",
    status: "upcoming",
    description: "Code submitted to Certik or Hacken for security audit.",
    lineAfter: "muted",
  },
  {
    kind: "milestone",
    id: "M4",
    label: "M4",
    title: "Mainnet",
    date: "Jan–Feb 2027",
    status: "upcoming",
    description: "Deployment on Base mainnet after audit clearance.",
    lineAfter: "muted",
  },
  {
    kind: "milestone",
    id: "M5",
    label: "M5",
    title: "IDO",
    date: "TBD, post-mainnet",
    status: "upcoming",
    description: "IDO launch for governance token.",
    lineAfter: "muted",
  },
];

const BEYOND = [
  {
    phase: "Phase 2",
    date: "2027–2028",
    text: "Tokenized AI stocks added to the basket (e.g. Nvidia, Microsoft, Google exposure).",
  },
  {
    phase: "Phase 3",
    date: "2029+",
    text: "50+ assets, multi-chain, institutional.",
  },
];

const STATUS_STYLES: Record<Milestone["status"], string> = {
  complete: "bg-cyan/15 text-cyan",
  "in-progress": "bg-gradient-to-r from-cyan/20 to-purple/20 text-ink",
  upcoming: "bg-white/5 text-ink-dim",
};

const STATUS_TEXT: Record<Milestone["status"], string> = {
  complete: "Complete",
  "in-progress": "In Progress",
  upcoming: "Upcoming",
};

function ChecklistIcon({ status }: { status: ChecklistStatus }) {
  if (status === "done") {
    return (
      <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan to-purple text-[9px] leading-none text-bg">
        ✓
      </span>
    );
  }
  if (status === "partial") {
    return (
      <span
        className="inline-block h-3.5 w-3.5 shrink-0 rounded-full border border-white/25"
        style={{
          background: "linear-gradient(90deg, #A855F7 50%, transparent 50%)",
        }}
      />
    );
  }
  return (
    <span className="inline-block h-3.5 w-3.5 shrink-0 rounded-full border border-white/20" />
  );
}

function NodeMarker({ item }: { item: Milestone | TodayMarker }) {
  const reduceMotion = useReducedMotion();

  if (item.kind === "today") {
    return (
      <span className="relative flex h-3 w-3 items-center justify-center">
        {!reduceMotion && (
          <motion.span
            className="absolute h-3 w-3 rounded-full bg-cyan"
            animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        <span className="relative h-2.5 w-2.5 rounded-full bg-cyan" />
      </span>
    );
  }

  if (item.status === "complete") {
    return (
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-cyan to-purple text-[10px] leading-none text-bg">
        ✓
      </span>
    );
  }

  if (item.status === "in-progress") {
    return (
      <motion.span
        className="flex h-5 w-5 items-center justify-center rounded-full p-[2px]"
        style={{
          background: "linear-gradient(135deg, #22D3EE, #A855F7)",
        }}
        animate={
          reduceMotion
            ? undefined
            : { boxShadow: [
                "0 0 0px rgba(34,211,238,0.3)",
                "0 0 10px rgba(168,85,247,0.5)",
                "0 0 0px rgba(34,211,238,0.3)",
              ] }
        }
        transition={
          reduceMotion
            ? undefined
            : { duration: 5, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <span className="h-full w-full rounded-full bg-bg" />
      </motion.span>
    );
  }

  return <span className="h-5 w-5 rounded-full border border-white/20" />;
}

export function Roadmap() {
  return (
    <section
      id="roadmap"
      className="relative border-t border-white/5 px-6 py-24 sm:py-32"
    >
      <Reveal className="mx-auto max-w-3xl">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan/90">
          Roadmap
        </span>

        <h2 className="mt-5 text-balance font-display text-3xl font-medium leading-[1.15] text-ink sm:text-4xl">
          From architecture to mainnet.{" "}
          <span className="bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent">
            Here&apos;s exactly where we stand today.
          </span>
        </h2>

        <ol className="mt-12 flex list-none flex-col">
          {ITEMS.map((item, i) => {
            const isLast = i === ITEMS.length - 1;
            const lineColor =
              item.lineAfter === "gradient"
                ? "bg-gradient-to-b from-cyan to-purple"
                : "bg-white/10";

            if (item.kind === "today") {
              return (
                <li key="today" className="relative flex gap-6">
                  <div className="flex flex-col items-center">
                    <NodeMarker item={item} />
                    {!isLast && (
                      <div className={`my-1 w-px flex-1 ${lineColor}`} />
                    )}
                  </div>
                  <div className="flex items-baseline gap-2 pb-8">
                    <span className="font-mono text-sm font-medium text-cyan">
                      We are here
                    </span>
                    <span className="font-mono text-xs text-ink-dim/70">
                      {item.date}
                    </span>
                  </div>
                </li>
              );
            }

            return (
              <li key={item.id} className="relative flex gap-6">
                <div className="flex flex-col items-center">
                  <NodeMarker item={item} />
                  {!isLast && (
                    <div className={`my-1 w-px flex-1 ${lineColor}`} />
                  )}
                </div>
                <div className="pb-10">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-mono text-xs uppercase tracking-[0.15em] text-ink-dim/70">
                      {item.label}
                    </span>
                    <p className="font-display text-lg font-medium text-ink sm:text-xl">
                      {item.title}
                    </p>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${STATUS_STYLES[item.status]}`}
                    >
                      {STATUS_TEXT[item.status]}
                    </span>
                  </div>
                  <p className="mt-1 font-mono text-xs text-ink-dim/70">
                    {item.date}
                  </p>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-dim sm:text-base">
                    {item.description}
                  </p>

                  {item.checklist && (
                    <ul className="mt-4 flex flex-col gap-2 rounded-xl border border-white/8 bg-bg-raised/60 p-4">
                      {item.checklist.map((c) => (
                        <li key={c.text} className="flex items-start gap-2.5">
                          <span className="mt-0.5">
                            <ChecklistIcon status={c.status} />
                          </span>
                          <span className="text-sm leading-snug text-ink-dim">
                            {c.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-2 border-t border-white/5 pt-8">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-ink-dim/50">
            Beyond Mainnet
          </p>
          <div className="mt-4 flex flex-col gap-3">
            {BEYOND.map((b) => (
              <p key={b.phase} className="text-sm text-ink-dim/70">
                <span className="text-ink-dim">
                  {b.phase} · {b.date}
                </span>{" "}
                — {b.text}
              </p>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
