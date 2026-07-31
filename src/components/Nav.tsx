"use client";

import { useState } from "react";
import { WalletButton } from "./WalletButton";

// No live functionality behind wallet connect yet — flip back on when ready.
const SHOW_WALLET_BUTTON = false;

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "How It Works", href: "#what-we-do" },
  { label: "Benefits", href: "#benefits" },
  { label: "Tokenomics", href: "#tokenomics" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Team", href: "#team" },
];

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <span className="font-display text-lg font-medium tracking-tight text-ink">
          NEX
          <span className="bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent">
            AI
          </span>
        </span>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs uppercase tracking-[0.1em] text-ink-dim transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-ink-dim transition-colors hover:text-ink lg:hidden"
          >
            {menuOpen ? (
              <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4">
                <path
                  d="M5 5l14 14M19 5L5 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4">
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>

          {SHOW_WALLET_BUTTON && <WalletButton />}
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-white/5 bg-bg/95 px-6 py-4 backdrop-blur-md lg:hidden">
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block font-mono text-sm uppercase tracking-[0.1em] text-ink-dim transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
