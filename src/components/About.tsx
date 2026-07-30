import { FragmentedShards } from "./FragmentedShards";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <section
      id="about"
      className="relative border-t border-white/5 px-6 py-24 sm:py-32"
    >
      <Reveal className="mx-auto grid max-w-5xl gap-14 md:grid-cols-[1.15fr_0.85fr] md:items-center md:gap-10">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan/90">
            The Problem
          </span>

          <h2 className="mt-5 text-balance font-display text-3xl font-medium leading-[1.15] text-ink sm:text-4xl">
            AI is the most obvious trade in crypto right now.{" "}
            <span className="bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent">
              Getting exposure to it cleanly is not.
            </span>
          </h2>

          <div className="mt-7 flex flex-col gap-4 text-base leading-relaxed text-ink-dim sm:text-lg">
            <p>
              Pick one AI token yourself, and you&apos;re betting the whole
              thesis on a single name going right. Spread it across a dozen,
              and congratulations — you now have a part-time job: wallets,
              approvals, rebalancing, all by hand.
            </p>
            <p>
              The professionally-managed alternative exists. It also comes
              with accreditation checks, subscription paperwork, and a
              custodian holding your assets for you. Not exactly why
              you&apos;re here.
            </p>
            <p className="text-ink">
              Right now, there&apos;s no clean way to just hold the sector —
              onchain, non-custodial, no second job required.
            </p>
          </div>
        </div>

        <FragmentedShards />
      </Reveal>
    </section>
  );
}
