import { ConvergingCore } from "./ConvergingCore";
import { Reveal } from "./Reveal";

const STEPS = [
  {
    n: "01",
    title: "Deposit",
    body: "Deposit approved tokens — USDC, WETH, and other approved assets — into the basket.",
  },
  {
    n: "02",
    title: "Mint",
    body: "Mint $NEXAI: one token for your proportional, in-kind share of everything inside.",
  },
  {
    n: "03",
    title: "Hold",
    body: "Your share is fully backed and verifiable onchain, any time you check.",
  },
  {
    n: "04",
    title: "Redeem",
    body: "Redeem for your share of the underlying basket, whenever you want. No lock-in.",
  },
];

export function WhatWeDo() {
  return (
    <section
      id="what-we-do"
      className="relative border-t border-white/5 px-6 py-24 sm:py-32"
    >
      <Reveal className="mx-auto grid max-w-5xl gap-14 md:grid-cols-[1.15fr_0.85fr] md:items-center md:gap-10">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan/90">
            How It Works
          </span>

          <h2 className="mt-5 text-balance font-display text-3xl font-medium leading-[1.15] text-ink sm:text-4xl">
            You deposit the tokens.{" "}
            <span className="bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent">
              NEXAI becomes the one thing you hold.
            </span>
          </h2>

          <ol className="mt-8 flex list-none flex-col gap-6">
            {STEPS.map((s) => (
              <li key={s.n} className="flex gap-4">
                <span className="font-mono text-sm text-cyan/70">{s.n}</span>
                <div>
                  <p className="font-display text-base font-medium text-ink">
                    {s.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-dim sm:text-base">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <ConvergingCore />
      </Reveal>
    </section>
  );
}
