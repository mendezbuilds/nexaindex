"use client";

import { useConnectModal } from "@rainbow-me/rainbowkit";
import { ResolvedOrb } from "./ResolvedOrb";
import { Reveal } from "./Reveal";

export function FinalCta() {
  const { openConnectModal } = useConnectModal();

  return (
    <section className="relative overflow-hidden border-t border-white/5 px-6 py-28 sm:py-36">
      <ResolvedOrb />

      <Reveal className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
        <h2 className="text-balance font-display text-3xl font-medium leading-[1.15] text-ink sm:text-4xl">
          No custodian. No gatekeeping.{" "}
          <span className="bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent">
            Just the sector, onchain.
          </span>
        </h2>

        <p className="mt-5 max-w-md text-balance text-base text-ink-dim sm:text-lg">
          Mint $NEXAI whenever you&apos;re ready — no waitlist, no minimum.
        </p>

        <button
          onClick={openConnectModal}
          className="mt-9 rounded-full bg-gradient-to-r from-cyan to-purple px-7 py-3 font-display text-sm font-medium text-bg transition-transform hover:scale-[1.03] active:scale-[0.98]"
        >
          Join Now
        </button>
      </Reveal>
    </section>
  );
}
