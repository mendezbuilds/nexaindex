import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { NEXAI_CHAIN } from "./contracts";

// Placeholder until a real WalletConnect Cloud project ID is provided —
// get one at https://cloud.walletconnect.com before deploying past staging.
const walletConnectProjectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "REPLACE_ME";

export const wagmiConfig = getDefaultConfig({
  appName: "NEXAI",
  projectId: walletConnectProjectId,
  chains: [NEXAI_CHAIN],
  ssr: true,
});
