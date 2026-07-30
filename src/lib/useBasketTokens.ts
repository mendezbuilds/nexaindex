"use client";

import { useMemo } from "react";
import { useReadContracts } from "wagmi";
import { nexaiCoreAbi, nexaiIndexTokenAbi } from "./abi";
import { MAX_BASKET_PROBE, NEXAI_CORE_ADDRESS } from "./contracts";

export interface BasketToken {
  address: `0x${string}`;
  symbol: string;
}

/**
 * NexaiCore has no basket-length getter, so the live count is derived by
 * probing the public basketTokens(i) array getter until it reverts —
 * genuinely on-chain, no indexer required.
 */
export function useBasketTokens() {
  const probe = useReadContracts({
    contracts: Array.from({ length: MAX_BASKET_PROBE }, (_, i) => ({
      address: NEXAI_CORE_ADDRESS,
      abi: nexaiCoreAbi,
      functionName: "basketTokens",
      args: [BigInt(i)] as const,
    })),
    query: { staleTime: 60_000 },
  });

  const addresses = useMemo(() => {
    if (!probe.data) return [];
    const found: `0x${string}`[] = [];
    for (const entry of probe.data) {
      if (entry.status === "success") {
        found.push(entry.result as `0x${string}`);
      } else {
        break;
      }
    }
    return found;
  }, [probe.data]);

  const symbols = useReadContracts({
    contracts: addresses.map((address) => ({
      address,
      abi: nexaiIndexTokenAbi,
      functionName: "symbol",
    })),
    query: { enabled: addresses.length > 0, staleTime: 60_000 },
  });

  const tokens: BasketToken[] = useMemo(
    () =>
      addresses.map((address, i) => ({
        address,
        symbol:
          symbols.data?.[i]?.status === "success"
            ? (symbols.data[i].result as string)
            : "—",
      })),
    [addresses, symbols.data],
  );

  return {
    tokens,
    count: addresses.length,
    isLoading: probe.isLoading,
  };
}
