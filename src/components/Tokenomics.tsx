"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";

const STATS = [
  { label: "Basket Size", value: "20" },
  { label: "Network", value: "Base" },
  { label: "Governance", value: "DAO" },
  { label: "Mint/Redeem Fee", value: "0.2%", tag: "planned" },
];

const ALLOCATION = [
  { label: "Public / IDO", pct: 40, note: "no lock" },
  { label: "Team", pct: 15, note: "2yr vesting, 6mo cliff" },
  { label: "Treasury / DAO", pct: 20, note: null },
  { label: "Ecosystem & Partnerships", pct: 15, note: "2yr vesting" },
  { label: "Liquidity", pct: 10, note: "6mo lock" },
];

function PlannedTag() {
  return (
    <span className="rounded-full bg-white/5 px-1.5 py-0.5 text-[10px] normal-case tracking-normal text-ink-dim/80">
      planned
    </span>
  );
}

function SubLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.15em] text-ink-dim/70">
      {children}
    </p>
  );
}

export function Tokenomics() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="tokenomics"
      className="relative border-t border-white/5 px-6 py-24 sm:py-32"
    >
      <Reveal className="mx-auto max-w-5xl">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan/90">
          Tokenomics
        </span>

        <h2 className="mt-5 max-w-2xl text-balance font-display text-3xl font-medium leading-[1.15] text-ink sm:text-4xl">
          $NEXAI holds the basket.{" "}
          <span className="bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent">
            The governance token runs the protocol.
          </span>
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-4 rounded-2xl border border-white/8 bg-bg-raised/60 px-5 py-5 sm:grid-cols-4 sm:gap-6 sm:px-8 sm:py-6">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="flex flex-col gap-1 border-l border-white/10 pl-4 first:border-l-0 first:pl-0"
            >
              <span className="font-mono text-xl text-ink sm:text-2xl">
                {s.value}
              </span>
              <span className="text-xs uppercase tracking-wide text-ink-dim">
                {s.label}
                {s.tag && (
                  <span className="ml-1.5 rounded-full bg-white/5 px-1.5 py-0.5 text-[10px] normal-case text-ink-dim/80">
                    {s.tag}
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {/* $NEXAI panel */}
          <div className="rounded-2xl border border-white/8 border-t-2 border-t-cyan bg-bg-raised/60 p-6 sm:p-8">
            <p className="font-display text-2xl font-medium text-ink">
              <span className="text-cyan">$NEXAI</span>
            </p>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-ink-dim/70">
              The Index Token
            </p>

            <ul className="mt-6 flex flex-col gap-4 text-sm leading-relaxed text-ink-dim sm:text-base">
              <li>
                Backed 1:1, in-kind — deposit basket assets to mint, redeem to
                withdraw your share back.
              </li>
              <li>
                <span className="text-ink">Dynamic supply.</span> Expands and
                contracts with deposits and redemptions — no fixed cap.
              </li>
              <li>
                Currently backed by a 2-asset testnet basket (WETH/USDC),
                scaling toward the full 20-asset AI-sector basket.
              </li>
            </ul>
          </div>

          {/* Governance token panel */}
          <div className="rounded-2xl border border-white/8 border-t-2 border-t-purple bg-bg-raised/60 p-6 sm:p-8">
            <p className="font-display text-2xl font-medium text-purple">
              Governance Token
            </p>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-ink-dim/70">
              Name TBD
            </p>

            <div className="mt-6 flex flex-col gap-6">
              <div>
                <SubLabel>Supply &amp; Price</SubLabel>
                <p className="mt-2 text-sm leading-relaxed text-ink-dim sm:text-base">
                  <span className="text-ink">100M fixed supply</span> — $0.01
                  IDO price.
                </p>
              </div>

              <div>
                <SubLabel>Allocation</SubLabel>
                <div className="mt-3 flex h-2 w-full overflow-hidden rounded-full bg-white/5">
                  {ALLOCATION.map((a, i) =>
                    reduceMotion ? (
                      <div
                        key={a.label}
                        className="h-full first:rounded-l-full last:rounded-r-full"
                        style={{
                          width: `${a.pct}%`,
                          backgroundColor: "#A855F7",
                          opacity: 1 - i * 0.16,
                        }}
                      />
                    ) : (
                      <motion.div
                        key={a.label}
                        className="h-full first:rounded-l-full last:rounded-r-full"
                        style={{
                          backgroundColor: "#A855F7",
                          opacity: 1 - i * 0.16,
                        }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${a.pct}%` }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{
                          duration: 0.7,
                          delay: i * 0.12,
                          ease: "easeOut",
                        }}
                      />
                    ),
                  )}
                </div>
                <ul className="mt-4 flex flex-col gap-2">
                  {ALLOCATION.map((a, i) => (
                    <li
                      key={a.label}
                      className="flex items-baseline justify-between gap-3 text-sm text-ink-dim"
                    >
                      <span className="flex items-baseline gap-2">
                        <span
                          className="inline-block h-2 w-2 shrink-0 rounded-sm"
                          style={{
                            backgroundColor: "#A855F7",
                            opacity: 1 - i * 0.16,
                          }}
                        />
                        {a.label}
                        {a.note && (
                          <span className="text-xs text-ink-dim/60">
                            ({a.note})
                          </span>
                        )}
                      </span>
                      <span className="font-mono text-ink">{a.pct}%</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <SubLabel>Governance</SubLabel>
                <ul className="mt-2 flex flex-col gap-2 text-sm leading-relaxed text-ink-dim sm:text-base">
                  <li>
                    <span className="text-ink">5% max wallet cap</span> —
                    enforced onchain.
                  </li>
                  <li>
                    Linear voting — one token, one vote. Straightforward,
                    one-token-one-vote governance.
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-dashed border-white/10 p-4">
                <div className="flex items-center gap-2">
                  <SubLabel>Fees</SubLabel>
                  <PlannedTag />
                </div>
                <ul className="mt-2 flex flex-col gap-1 text-sm text-ink-dim">
                  <li>0.2% mint fee, 0.2% redeem fee</li>
                  <li>1.5% annual management fee (on $NEXAI TVL)</li>
                </ul>
                <p className="mt-2 text-xs text-ink-dim/70">
                  Revenue split: 80% stakers · 10% AI Grants Fund · 10%
                  Treasury
                </p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
