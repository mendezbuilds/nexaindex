"use client";

import { useState } from "react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { Orb } from "./Orb";
import { ParticleNetwork } from "./ParticleNetwork";
import { GrantsFundBlock } from "./GrantsFundBlock";
import { BasketModal } from "./BasketModal";
import { ConnectedBalances } from "./ConnectedBalances";

export function Hero() {
  const { openConnectModal } = useConnectModal();
  const [basketOpen, setBasketOpen] = useState(false);

  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-20 sm:pt-28">
      <ParticleNetwork />
      <Orb />
      <div className="grain-overlay" />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan/90">
          Onchain AI-Sector Index · Base Sepolia Testnet
        </span>

        <h1 className="mt-6 text-balance font-display text-4xl font-medium leading-[1.1] text-ink sm:text-5xl md:text-6xl">
          Twenty AI tokens.{" "}
          <span className="bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent">
            One basket, one number.
          </span>
        </h1>

        <p className="mt-6 max-w-xl text-balance text-base text-ink-dim sm:text-lg">
          Deposit approved tokens, mint $NEXAI, and hold a proportional,
          in-kind share of a basket of AI-sector crypto assets — no swaps, no
          price oracle in the core math, no picking winners.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={openConnectModal}
            className="rounded-full bg-gradient-to-r from-cyan to-purple px-7 py-3 font-display text-sm font-medium text-bg transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            Join Now
          </button>
          <button
            onClick={() => setBasketOpen(true)}
            className="rounded-full border border-white/15 px-7 py-3 font-display text-sm font-medium text-ink transition-colors hover:border-cyan/50"
          >
            View Basket
          </button>
        </div>

        <div className="mt-6">
          <ConnectedBalances />
        </div>
      </div>

      <div className="relative mx-auto mt-16 flex max-w-4xl flex-col items-center gap-10">
        <div className="w-full max-w-xl">
          <GrantsFundBlock />
        </div>
      </div>

      <BasketModal open={basketOpen} onClose={() => setBasketOpen(false)} />
    </section>
  );
}
