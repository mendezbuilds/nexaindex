"use client";

import { useState } from "react";
import { animate, useReducedMotion } from "framer-motion";
import { Orb } from "./Orb";
import { ParticleNetwork } from "./ParticleNetwork";
import { GrantsFundBlock } from "./GrantsFundBlock";
import { BasketModal } from "./BasketModal";
import { ConnectedBalances } from "./ConnectedBalances";

// Matches the site's scroll-margin-top convention for anchored sections
// (see the `section[id]` rule in globals.css) so the spring-scroll below
// lands at the same offset a native anchor jump would.
const NAV_OFFSET = 80;

export function Hero() {
  const [basketOpen, setBasketOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  function scrollToAbout() {
    const el = document.getElementById("about");
    if (!el) return;
    const targetY =
      el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;

    if (reduceMotion) {
      window.scrollTo(0, targetY);
      return;
    }

    // Override the global CSS smooth-scroll for the duration so it doesn't
    // layer its own easing on top of framer-motion's spring updates.
    const html = document.documentElement;
    const previousScrollBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";

    animate(window.scrollY, targetY, {
      type: "spring",
      stiffness: 55,
      damping: 18,
      onUpdate: (v) => window.scrollTo(0, v),
      onComplete: () => {
        html.style.scrollBehavior = previousScrollBehavior;
      },
    });
  }

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
            onClick={scrollToAbout}
            className="rounded-full bg-gradient-to-r from-cyan to-purple px-7 py-3 font-display text-sm font-medium text-bg transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            Read More
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
