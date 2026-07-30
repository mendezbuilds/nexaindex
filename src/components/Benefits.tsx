import { Reveal } from "./Reveal";

const BENEFITS = [
  {
    oldWay: "Centralized funds hold the assets. You hold paperwork.",
    title: "Non-custodial",
    body: "You hold $NEXAI directly. Nobody custodies it for you, ever.",
  },
  {
    oldWay: "Some “exposure” is synthetic — leverage, liquidation risk included.",
    title: "No leverage, no derivatives",
    body: "Every $NEXAI is backed by real assets sitting in the basket. Nothing synthetic.",
  },
  {
    oldWay: "Professional AI funds want accreditation and a six-figure income.",
    title: "Open to anyone",
    body: "Anyone with a wallet can hold the sector. No gatekeeping.",
  },
  {
    oldWay: "Most index products just collect fees and track a number.",
    title: "Funds the sector, not just tracks it",
    body: "A share of protocol fees flows to an AI Grants Fund — $NEXAI holders vote on which projects get funded next.",
  },
];

export function Benefits() {
  return (
    <section
      id="benefits"
      className="relative border-t border-white/5 px-6 py-24 sm:py-32"
    >
      <Reveal className="mx-auto max-w-5xl">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan/90">
          Why NEXAI
        </span>

        <h2 className="mt-5 max-w-2xl text-balance font-display text-3xl font-medium leading-[1.15] text-ink sm:text-4xl">
          Same AI-sector exposure.{" "}
          <span className="bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent">
            None of the usual tradeoffs.
          </span>
        </h2>

        <div className="mt-12 divide-y divide-white/5 border-y border-white/5">
          {BENEFITS.map((b, i) => (
            <Reveal
              key={b.title}
              delay={i * 0.1}
              className="grid gap-3 py-8 sm:grid-cols-[1fr_1.5fr] sm:items-baseline sm:gap-10"
            >
              <p className="font-mono text-sm text-ink-dim/60">
                {b.oldWay}
              </p>
              <div className="relative pl-5">
                <span className="absolute left-0 top-1 h-[calc(100%-0.5rem)] w-[3px] rounded-full bg-gradient-to-b from-cyan to-purple" />
                <p className="font-display text-lg font-medium text-ink sm:text-xl">
                  {b.title}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink-dim sm:text-base">
                  {b.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
