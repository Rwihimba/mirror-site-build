import { Link } from "react-router-dom";
import { trackProductTileClick, type Product } from "@/lib/analytics";

type Tile = {
  product: Product;
  name: string;
  outcome: string;
  href: string;
};

const TILES: Tile[] = [
  {
    product: "os",
    name: "Minetech OS",
    outcome: "The operating record for mid and large scale mines.",
    href: "/products/os",
  },
  {
    product: "corp",
    name: "Minetech Corp",
    outcome: "Shared infrastructure for cooperatives and ASM.",
    href: "/products/corp",
  },
  {
    product: "trace",
    name: "Minetech Trace",
    outcome: "Chain of custody and due diligence, ready for the buyer.",
    href: "/products/trace",
  },
  {
    product: "upstream",
    name: "Minetech Upstream",
    outcome: "Counterparty and licence screening before the deal.",
    href: "/products/upstream",
  },
  {
    product: "telco",
    name: "Minetech Telco",
    outcome: "Network and edge built for African pits.",
    href: "/infrastructure/telco",
  },
];

export function ProductsStrip({ source = "home" }: { source?: string }) {
  return (
    <section className="py-16 md:py-24 bg-secondary" data-section="light">
      <div className="container-slr">
        <div className="mb-12 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-display mb-4">
            One record. Five products.
          </h2>
          <p className="text-lg text-muted-foreground font-body">
            Each product pulls value from the same operating record. Plug in where
            it makes sense for you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {TILES.map(({ product, name, outcome, href }) => (
            <Link
              key={product}
              to={href}
              onClick={() => trackProductTileClick(product, source)}
              className="group bg-card p-6 border border-border hover:border-primary hover:shadow-md transition-all flex flex-col"
            >
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-body mb-6">
                Product
              </span>
              <h3 className="text-base font-display font-semibold mb-3">{name}</h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed flex-1">
                {outcome}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}