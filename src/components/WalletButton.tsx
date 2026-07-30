"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export function WalletButton() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="rounded-full bg-gradient-to-r from-cyan to-purple px-5 py-2 font-display text-sm font-medium text-bg transition-transform hover:scale-[1.03] active:scale-[0.98]"
                  >
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="rounded-full border border-purple/60 px-5 py-2 font-display text-sm text-purple transition-colors hover:bg-purple/10"
                  >
                    Wrong network
                  </button>
                );
              }

              return (
                <button
                  onClick={openAccountModal}
                  type="button"
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-bg-raised px-4 py-2 font-mono text-sm text-ink transition-colors hover:border-cyan/40"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
                  {account.displayName}
                </button>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
