"use client";

import { useEffect, useState, type ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { wagmiConfig } from "@/lib/wagmi";

const rainbowKitTheme = darkTheme({
  accentColor: "#22D3EE",
  accentColorForeground: "#05060F",
  borderRadius: "medium",
  overlayBlur: "small",
});

// Wallet-connection failures (locked wallet, user rejection, multiple
// extensions fighting over window.ethereum) are normal and thrown deep
// inside the wallet extension's own injected script — outside any try/catch
// we can wrap. Swallow just this class of rejection so it can't crash the
// whole page; anything else still propagates and surfaces normally.
function isWalletConnectionError(reason: unknown) {
  const message = String(
    (reason as { message?: unknown })?.message ?? reason ?? "",
  );
  return /metamask|wallet|connector|eip-1193|user rejected/i.test(message);
}

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    function handleRejection(event: PromiseRejectionEvent) {
      if (isWalletConnectionError(event.reason)) {
        event.preventDefault();
        console.warn("[wallet] connection error suppressed:", event.reason);
      }
    }
    window.addEventListener("unhandledrejection", handleRejection);
    return () =>
      window.removeEventListener("unhandledrejection", handleRejection);
  }, []);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={rainbowKitTheme}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
