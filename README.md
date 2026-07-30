# NEXAI — Marketing Site (Phase 1: Hero)

Next.js (App Router) + Tailwind + wagmi/viem/RainbowKit. This phase covers
only the Hero section — Nav, headline, signature orb, live stat row,
placeholder chart, AI Grants Fund block, and functional wallet connect on
Base Sepolia.

## Setup

```bash
npm install
cp .env.local.example .env.local
```

Then fill in `.env.local`:

- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` — get one at
  [cloud.walletconnect.com](https://cloud.walletconnect.com). Without a real
  ID, the app still runs and injected wallets (e.g. MetaMask) still connect,
  but WalletConnect-based mobile/QR connections won't work. **Set this before
  deploying past local/staging.**

```bash
npm run dev
```

## What's live vs. mocked in this phase

- **Live, read from the deployed Base Sepolia contracts:** connected
  wallet's $NEXAI balance, and the basket asset count (probed via
  `basketTokens(i)` on `NexaiCore` — there's no length getter on that
  contract, so the count is derived by reading indices until one reverts).
- **Mocked, clearly labeled "testnet demo data":** holder count and TVL —
  there's no indexer/subgraph in the stack yet, and with a 2-token testnet
  basket these numbers wouldn't be meaningful even if fetched live.
- **Explicitly "coming soon," never a fake number:** the governance token
  balance slot — that token is built and tested but not deployed for real.

## Contracts (Base Sepolia)

```
NexaiIndexToken: 0x1C87f4647C0B946A28739725A7F67E94967bbd18
NexaiCore:       0xB324A0B49dD60f5c1e783DCffbF71ABB368B0c19
```

Both are verified on [Base Sepolia BaseScan](https://sepolia.basescan.org/).
The ABIs in `src/lib/abi.ts` are trimmed to only the read functions this
frontend calls — pulled from the verified source, not hand-guessed.

## Deploying

Not yet deployed to Vercel — see the phase notes for why (confirm before
pushing a live staging URL).
