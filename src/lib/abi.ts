// Minimal read-only ABI slices for the marketing site.
// Verified against the deployed + verified source on Base Sepolia (sepolia.basescan.org),
// trimmed to only the view functions this frontend actually reads.

export const nexaiIndexTokenAbi = [
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

// NexaiCore exposes basket composition only via the auto-generated public
// array getter `basketTokens(uint256)`, which reverts once the index is out
// of range — there is no separate length/count getter on this contract.
export const nexaiCoreAbi = [
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "basketTokens",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
] as const;
