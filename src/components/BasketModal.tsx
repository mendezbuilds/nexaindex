"use client";

import { useEffect } from "react";

const PLANNED_TOKENS = [
  { ticker: "NEAR", name: "NEAR Protocol" },
  { ticker: "TAO", name: "Bittensor" },
  { ticker: "WLD", name: "Worldcoin" },
  { ticker: "ICP", name: "Internet Computer" },
  { ticker: "RENDER", name: "Render Network" },
  { ticker: "VVV", name: "Venice Token" },
  { ticker: "FET", name: "ASI Alliance" },
  { ticker: "VIRTUAL", name: "Virtuals Protocol" },
  { ticker: "GRASS", name: "Grass" },
  { ticker: "GRT", name: "The Graph" },
  { ticker: "AKT", name: "Akash Network" },
  { ticker: "EIGEN", name: "EigenCloud" },
  { ticker: "THETA", name: "Theta Network" },
  { ticker: "AR", name: "Arweave" },
  { ticker: "IP", name: "Story Protocol" },
  { ticker: "SENT", name: "Sentient" },
  { ticker: "ALLO", name: "Allora" },
  { ticker: "IO", name: "io.net" },
  { ticker: "0G", name: "0G Labs" },
  { ticker: "NIL", name: "Nillion" },
];

export function BasketModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
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
        aria-label="Planned basket composition"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-bg-raised p-6"
      >
        <div className="flex items-start justify-between">
          <h3 className="font-display text-lg text-ink">
            Planned Composition
          </h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-ink-dim hover:text-ink"
          >
            ✕
          </button>
        </div>
        <p className="mt-1 text-sm text-ink-dim">
          The target basket of 20 AI-sector tokens.
        </p>

        <div className="mt-4 flex max-h-80 flex-col gap-2 overflow-y-auto pr-1 sm:max-h-96">
          {PLANNED_TOKENS.map((t) => (
            <div
              key={t.ticker}
              className="flex items-center justify-between rounded-lg border border-white/8 px-3 py-2"
            >
              <span className="font-display text-sm text-ink">
                {t.ticker}
              </span>
              <span className="text-xs text-ink-dim">{t.name}</span>
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs text-ink-dim/70">
          Contract addresses aren&apos;t confirmed yet — explorer links will
          be added once they are.
        </p>
      </div>
    </div>
  );
}
