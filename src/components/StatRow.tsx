"use client";

import { useBasketTokens } from "@/lib/useBasketTokens";

function Stat({
  label,
  value,
  isMock,
  isLoading,
}: {
  label: string;
  value: string;
  isMock?: boolean;
  isLoading?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1 border-l border-white/10 pl-4 first:border-l-0 first:pl-0">
      <span className="font-mono text-2xl text-ink sm:text-3xl">
        {isLoading ? "—" : value}
      </span>
      <span className="text-xs uppercase tracking-wide text-ink-dim">
        {label}
        {isMock && (
          <span className="ml-1.5 rounded-full bg-white/5 px-1.5 py-0.5 text-[10px] normal-case text-ink-dim/80">
            testnet demo data
          </span>
        )}
      </span>
    </div>
  );
}

export function StatRow() {
  const { count, isLoading } = useBasketTokens();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
      <Stat label="Holders" value="1,204" isMock />
      <Stat label="TVL" value="$2.1M" isMock />
      <Stat
        label="Basket Assets"
        value={String(count)}
        isLoading={isLoading}
      />
    </div>
  );
}
