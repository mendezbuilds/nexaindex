import { Reveal } from "./Reveal";

const TEAM = [
  {
    name: "Dmitry",
    title: "Founder",
    role: "Product & Strategy",
    blurb: "Setting direction, positioning, and what ships next.",
    gradient: "from-cyan to-purple",
    accent: "text-purple",
    icon: "strategy" as const,
  },
  {
    name: "Mendez",
    title: "Co-Founder",
    role: "Protocol Engineering",
    blurb: "Writing and shipping the contracts, end to end.",
    gradient: "from-purple to-cyan",
    accent: "text-cyan",
    icon: "engineering" as const,
  },
];

function Avatar({ name, gradient }: { name: string; gradient: string }) {
  // Placeholder avatar slot — swap for a real photo later without
  // restructuring: this is just a fixed-size image slot.
  return (
    <div
      className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient}`}
    >
      <span className="font-display text-xl font-medium text-bg">
        {name.charAt(0)}
      </span>
    </div>
  );
}

function RoleIcon({
  icon,
  className,
}: {
  icon: "strategy" | "engineering";
  className: string;
}) {
  if (icon === "strategy") {
    return (
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className={`h-4 w-4 shrink-0 ${className}`}
      >
        <circle
          cx="12"
          cy="12"
          r="9"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          opacity="0.45"
        />
        <circle
          cx="12"
          cy="12"
          r="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          opacity="0.75"
        />
        <circle cx="12" cy="12" r="1.6" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={`h-4 w-4 shrink-0 ${className}`}
    >
      <line
        x1="6"
        y1="17"
        x2="12"
        y2="7"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.55"
      />
      <line
        x1="12"
        y1="7"
        x2="18"
        y2="17"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.55"
      />
      <line
        x1="6"
        y1="17"
        x2="18"
        y2="17"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.55"
      />
      <circle cx="12" cy="7" r="1.8" fill="currentColor" />
      <circle cx="6" cy="17" r="1.8" fill="currentColor" />
      <circle cx="18" cy="17" r="1.8" fill="currentColor" />
    </svg>
  );
}

export function Team() {
  return (
    <section
      id="team"
      className="relative border-t border-white/5 px-6 py-24 sm:py-32"
    >
      <Reveal className="mx-auto max-w-3xl">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan/90">
          Team
        </span>

        <h2 className="mt-5 max-w-xl text-balance font-display text-3xl font-medium leading-[1.15] text-ink sm:text-4xl">
          A small team,{" "}
          <span className="bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent">
            building in public.
          </span>
        </h2>

        <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-dim sm:text-base">
          Team details will grow as things firm up — for now, here&apos;s who&apos;s
          actually building this.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {TEAM.map((member) => (
            <div key={member.name} className="group relative rounded-2xl">
              <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-cyan to-purple opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-60" />

              <div className="relative flex flex-col gap-4 rounded-2xl border border-white/8 bg-bg-raised p-6 transition-colors duration-300 group-hover:border-transparent sm:p-7">
                <div className="flex items-center gap-4">
                  <Avatar name={member.name} gradient={member.gradient} />
                  <div>
                    <p className="font-display text-lg font-medium text-ink">
                      {member.name}
                    </p>
                    <p className="text-sm text-ink-dim">{member.title}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 border-t border-white/5 pt-4">
                  <RoleIcon icon={member.icon} className={member.accent} />
                  <span className="font-mono text-xs uppercase tracking-[0.15em] text-ink-dim/70">
                    {member.role}
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-ink-dim">
                  {member.blurb}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
