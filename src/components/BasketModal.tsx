"use client";

import { useEffect } from "react";
import { useBasketTokens } from "@/lib/useBasketTokens";
import { NEXAI_CHAIN } from "@/lib/contracts";

export function BasketModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { tokens, isLoading } = useBasketTokens();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Current basket composition"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-bg-raised p-6"
      >
        <div className="flex items-start justify-between">
          <h3 className="font-display text-lg text-ink">Current Basket</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-ink-dim hover:text-ink"
          >
            ✕
          </button>
        </div>
        <p className="mt-1 text-sm text-ink-dim">
          Live from NexaiCore on Base Sepolia testnet.
        </p>

        <div className="mt-4 flex flex-col gap-2">
          {isLoading && (
            <span className="font-mono text-sm text-ink-dim">Loading…</span>
          )}
          {!isLoading && tokens.length === 0 && (
            <span className="font-mono text-sm text-ink-dim">
              No basket tokens found.
            </span>
          )}
          {tokens.map((t) => (
            <a
              key={t.address}
              href={`${NEXAI_CHAIN.blockExplorers?.default.url}/address/${t.address}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-lg border border-white/8 px-3 py-2 hover:border-cyan/40"
            >
              <span className="font-display text-sm text-ink">
                {t.symbol}
              </span>
              <span className="font-mono text-xs text-ink-dim">
                {t.address.slice(0, 6)}…{t.address.slice(-4)}
              </span>
            </a>
          ))}
        </div>

        <p className="mt-4 text-xs text-ink-dim">
          Testnet basket is a 2-token WETH/USDC placeholder. The production
          basket will hold up to 20 AI-sector tokens.
        </p>
      </div>
    </div>
  );
}
