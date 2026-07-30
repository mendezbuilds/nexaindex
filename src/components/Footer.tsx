import { Reveal } from "./Reveal";

const SOCIALS = [
  {
    label: "X",
    href: "https://x.com/NEXAI26",
    icon: "x" as const,
  },
  {
    label: "Telegram",
    href: "https://t.co/Xq1xTm6s42",
    icon: "telegram" as const,
  },
];

function SocialIcon({ icon }: { icon: "x" | "telegram" }) {
  if (icon === "x") {
    return (
      <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5">
        <path
          d="M5 5l14 14M19 5L5 19"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 px-6 py-16">
      <Reveal className="mx-auto flex max-w-6xl flex-col items-center gap-8 sm:flex-row sm:justify-between sm:gap-4">
        <span className="font-display text-xl font-medium tracking-tight text-ink">
          NEX
          <span className="bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent">
            AI
          </span>
        </span>

        <p className="order-3 text-sm text-ink-dim/60 sm:order-none">
          © {year} NEXAI. All rights reserved.
        </p>

        <div className="flex items-center gap-6">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`NEXAI on ${s.label}`}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/8 text-ink-dim transition-colors hover:border-cyan/40 hover:text-cyan"
            >
              <SocialIcon icon={s.icon} />
            </a>
          ))}
        </div>
      </Reveal>
    </footer>
  );
}
