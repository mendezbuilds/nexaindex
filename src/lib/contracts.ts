import { baseSepolia } from "wagmi/chains";

// Deployed and tested on Base Sepolia. Governance token is built/tested but
// not deployed for real yet — any UI referencing it must show "coming soon."
export const NEXAI_CHAIN = baseSepolia;

export const NEXAI_INDEX_TOKEN_ADDRESS =
  "0x1C87f4647C0B946A28739725A7F67E94967bbd18" as const;

export const NEXAI_CORE_ADDRESS =
  "0xB324A0B49dD60f5c1e783DCffbF71ABB368B0c19" as const;

// Production basket will hold up to 20 AI-sector tokens; testnet basket is
// currently a 2-token WETH/USDC placeholder. No on-chain length getter exists,
// so the actual count is read live by probing basketTokens(i) until it reverts.
export const MAX_BASKET_PROBE = 24;
