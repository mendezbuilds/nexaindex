"use client";

import { useAccount, useReadContracts } from "wagmi";
import { formatUnits } from "viem";
import { nexaiIndexTokenAbi } from "./abi";
import { NEXAI_INDEX_TOKEN_ADDRESS } from "./contracts";

export function useNexaiBalance() {
  const { address, isConnected } = useAccount();

  const { data, isLoading } = useReadContracts({
    contracts: [
      {
        address: NEXAI_INDEX_TOKEN_ADDRESS,
        abi: nexaiIndexTokenAbi,
        functionName: "balanceOf",
        args: [address ?? "0x0000000000000000000000000000000000000000"],
      },
      {
        address: NEXAI_INDEX_TOKEN_ADDRESS,
        abi: nexaiIndexTokenAbi,
        functionName: "decimals",
      },
      {
        address: NEXAI_INDEX_TOKEN_ADDRESS,
        abi: nexaiIndexTokenAbi,
        functionName: "symbol",
      },
    ],
    query: { enabled: isConnected && Boolean(address), staleTime: 15_000 },
  });

  const raw = data?.[0]?.status === "success" ? data[0].result : undefined;
  const decimals = data?.[1]?.status === "success" ? data[1].result : 18;
  const symbol = data?.[2]?.status === "success" ? data[2].result : "NEXAI";

  const formatted =
    raw !== undefined ? Number(formatUnits(raw, decimals)).toLocaleString(
      undefined,
      { maximumFractionDigits: 4 },
    ) : undefined;

  return { formatted, symbol, isLoading, isConnected };
}
