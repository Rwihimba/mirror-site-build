import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { trackRoleRouterClick, type Audience } from "@/lib/analytics";

type Card = {
  audience: Audience;
  title: string;
  outcome: string;
  href: string;
  available: boolean;
  stage: string;
  index: string;
};

// Regulators door hidden until Minetech Oversight ships (Open Decision #1 = b).
const CARDS: Card[] = [
  {
    audience: "cooperatives",
    title: "Cooperatives & ASM",
    outcome: "Every gram accounted for, compliant before the inspector arrives.",
    href: "/solutions/cooperatives",
    available: true,
    stage: "Upstream",
    index: "01",
  },
  {
    audience: "large_miners",
    title: "Large & Mid Scale Miners",
    outcome: "One operating record across geology, fleet, safety and finance.",
    href: "/solutions/large-miners",
    available: true,
    stage: "Operations",
    index: "02",
  },
  {
    audience: "traders",
    title: "Traders & Suppliers",
    outcome: "Due diligence in a folder, not a quarter.",
    href: "/solutions/traders",
    available: true,
    stage: "Midstream",
    index: "03",
  },
  {
    audience: "regulators",
    title: "Regulators & Government",
    outcome: "Coming soon. Live audit trail and royalty reconciliation.",
    href: "#",
    available: false,
    stage: "Oversight",
    index: "04",
  },
];

export function RoleRouter({ source = "home" }: { source?: string }) {
  return (
    <section className="relative py-20 md:py-28 bg-secondary overflow-hidden" data-section="light">
      {/* Editorial grain / corner marks */}
      <div className="absolute top-8 right-8 hidden md:flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-foreground/40 font-body">
        <span className="w-8 h-px bg-foreground/30" />
        <span>Value Chain · 04 doors</span>
      </div>

      <div className="container-slr relative">
        <div className="mb-16 grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-px bg-primary" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-primary font-body font-semibold">
                Pick your door
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.05] text-foreground">
              Where do you sit
              <br />
              in the <span className="italic font-light text-primary">value chain?</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base md:text-lg text-foreground/70 font-body leading-relaxed border-l-2 border-primary/30 pl-5">
              One operating record, captured once at the source. Each role enters
              the same orchestrated system through a different door — built for the
              decisions you actually make.
            </p>
          </div>
        </div>

        {/* Connecting rail */}
        <div className="relative">
          <div className="hidden lg:block absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <div className="hidden lg:flex absolute -top-1.5 left-0 right-0 justify-between px-[12.5%] pointer-events-none">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="w-3 h-3 bg-secondary border border-primary/60 rotate-45" />
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border/60 border border-border">
            {CARDS.map(({ audience, title, outcome, href, available, stage, index }) => {
              const inner = (
                <div className="relative h-full bg-card p-7 md:p-8 flex flex-col min-h-[280px] transition-colors duration-500 group-hover:bg-hero">
                  {/* Header row */}
                  <div className="flex items-start justify-between mb-10">
                    <span className="text-[10px] uppercase tracking-[0.25em] font-body font-semibold text-primary group-hover:text-accent transition-colors">
                      {stage}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-body text-muted-foreground group-hover:text-hero-foreground/60 transition-colors">
                      {available ? "Live" : "Soon"}
                    </span>
                  </div>

                  {/* Giant index numeral */}
                  <div className="mb-6">
                    <span className="block text-7xl md:text-8xl font-display font-bold leading-none text-foreground/[0.06] group-hover:text-accent/30 transition-colors duration-500">
                      {index}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-semibold mb-3 text-foreground group-hover:text-hero-foreground transition-colors">
                    {title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed mb-6 group-hover:text-hero-foreground/75 transition-colors">
                    {outcome}
                  </p>

                  <div className="mt-auto pt-4 border-t border-border group-hover:border-hero-foreground/15 transition-colors">
                    <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-body font-semibold text-primary group-hover:text-accent transition-colors">
                      {available ? "Open the door" : "Joining soon"}
                      {available && (
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      )}
                    </span>
                  </div>

                  {/* Accent bottom bar on hover */}
                  <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-accent group-hover:w-full transition-all duration-500" />
                </div>
              );

              if (!available) {
                return (
                  <div
                    key={audience}
                    className="group relative cursor-not-allowed"
                    aria-disabled="true"
                  >
                    {inner}
                    {/* Diagonal stripe overlay for soon */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-[0.07]"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(45deg, hsl(var(--foreground)) 0 1px, transparent 1px 10px)",
                      }}
                    />
                  </div>
                );
              }

              return (
                <Link
                  key={audience}
                  to={href}
                  onClick={() => trackRoleRouterClick(audience, source)}
                  className="group relative"
                >
                  {inner}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}