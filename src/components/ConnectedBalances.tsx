"use client";

import { useAccount } from "wagmi";
import { useNexaiBalance } from "@/lib/useNexaiBalance";

export function ConnectedBalances() {
  const { isConnected } = useAccount();
  const { formatted, symbol, isLoading } = useNexaiBalance();

  if (!isConnected) return null;

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-white/8 bg-bg-raised/60 px-4 py-3">
      <div className="flex items-baseline gap-2">
        <span className="font-mono text-lg text-ink">
          {isLoading ? "…" : (formatted ?? "0")}
        </span>
        <span className="text-xs uppercase tracking-wide text-ink-dim">
          {symbol}
        </span>
      </div>
      <span className="h-4 w-px bg-white/10" />
      <div className="flex items-baseline gap-2 opacity-60">
        <span className="font-mono text-lg text-ink">—</span>
        <span className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-ink-dim">
          Governance
          <span className="rounded-full bg-white/5 px-1.5 py-0.5 text-[10px] normal-case">
            coming soon
          </span>
        </span>
      </div>
    </div>
  );
}
