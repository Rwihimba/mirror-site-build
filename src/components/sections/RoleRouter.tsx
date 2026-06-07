import { Link } from "react-router-dom";
import { ArrowUpRight, Pickaxe, Factory, Truck, Building2 } from "lucide-react";
import { trackRoleRouterClick, type Audience } from "@/lib/analytics";

type Card = {
  audience: Audience;
  title: string;
  outcome: string;
  href: string;
  Icon: typeof Pickaxe;
  available: boolean;
};

// Regulators door hidden until Minetech Oversight ships (Open Decision #1 = b).
const CARDS: Card[] = [
  {
    audience: "cooperatives",
    title: "Cooperatives & ASM",
    outcome: "Every gram accounted for, compliant before the inspector arrives.",
    href: "/solutions/cooperatives",
    Icon: Pickaxe,
    available: true,
  },
  {
    audience: "large_miners",
    title: "Large & Mid Scale Miners",
    outcome: "One operating record across geology, fleet, safety and finance.",
    href: "/solutions/large-miners",
    Icon: Factory,
    available: true,
  },
  {
    audience: "traders",
    title: "Traders & Suppliers",
    outcome: "Due diligence in a folder, not a quarter.",
    href: "/solutions/traders",
    Icon: Truck,
    available: true,
  },
  {
    audience: "regulators",
    title: "Regulators & Government",
    outcome: "Coming soon. Live audit trail and royalty reconciliation.",
    href: "#",
    Icon: Building2,
    available: false,
  },
];

export function RoleRouter({ source = "home" }: { source?: string }) {
  return (
    <section className="py-16 md:py-24 bg-background" data-section="light">
      <div className="container-slr">
        <div className="mb-12 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-display mb-4">
            Where do you sit in the value chain?
          </h2>
          <p className="text-lg text-muted-foreground font-body">
            One operating record, captured once at the source. Pick the door that
            matches your role and see exactly what you get.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {CARDS.map(({ audience, title, outcome, href, Icon, available }) => {
            const inner = (
              <>
                <div className="flex items-start justify-between mb-6">
                  <Icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
                  {available ? (
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                  ) : (
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-body">
                      Soon
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-display font-semibold mb-3">{title}</h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">
                  {outcome}
                </p>
              </>
            );

            if (!available) {
              return (
                <div
                  key={audience}
                  className="group bg-card p-6 border border-border opacity-60 cursor-not-allowed"
                  aria-disabled="true"
                >
                  {inner}
                </div>
              );
            }

            return (
              <Link
                key={audience}
                to={href}
                onClick={() => trackRoleRouterClick(audience, source)}
                className="group bg-card p-6 border border-border hover:border-primary hover:shadow-md transition-all"
              >
                {inner}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}