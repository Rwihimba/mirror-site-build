import { useParams, Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { trackCtaClick } from "@/lib/analytics";

type AudienceCopy = {
  audience: string;
  title: string;
  outcome: string;
  product: string;
  productHref: string;
  description: string;
};

const COPY: Record<string, AudienceCopy> = {
  cooperatives: {
    audience: "cooperatives",
    title: "Cooperatives & ASM",
    outcome:
      "Every gram accounted for, compliant before the inspector arrives.",
    product: "Minetech Corp",
    productHref: "/products/corp",
    description:
      "Shared infrastructure that lets cooperatives capture production, sales and compliance in one record. Built for the way ASM actually works in the field.",
  },
  "large-miners": {
    audience: "large_miners",
    title: "Large & Mid Scale Miners",
    outcome:
      "One operating record across geology, fleet, safety and finance.",
    product: "Minetech OS",
    productHref: "/products/os",
    description:
      "The operating layer for serious mines. Grade control, fleet, safety and compliance stop living in spreadsheets and start living in one record every team plugs into.",
  },
  traders: {
    audience: "traders",
    title: "Traders & Suppliers",
    outcome: "Due diligence in a folder, not a quarter.",
    product: "Minetech Trace",
    productHref: "/products/trace",
    description:
      "Chain of custody and OECD ready dossiers, generated from the same record your suppliers already keep. Pair with Minetech Upstream to screen counterparties before the deal.",
  },
};

export default function SolutionPlaceholder() {
  const { audience } = useParams<{ audience: string }>();
  const data = audience ? COPY[audience] : undefined;

  if (!data) {
    return (
      <Layout>
        <SEO title="Solution not found" description="" noIndex />
        <section className="py-32 container-slr">
          <h1 className="text-3xl font-display">Solution not found</h1>
          <Link to="/" className="text-primary mt-4 inline-block">
            Back home
          </Link>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO
        title={`${data.title} | MineTech`}
        description={data.outcome}
      />
      <section className="pt-32 pb-20 bg-hero text-hero-foreground">
        <div className="container-slr max-w-4xl">
          <p className="text-xs uppercase tracking-wider opacity-60 mb-4 font-body">
            For {data.title}
          </p>
          <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6">
            {data.outcome}
          </h1>
          <p className="text-lg md:text-xl opacity-80 font-body max-w-2xl">
            {data.description}
          </p>
        </div>
      </section>

      <section className="py-20 bg-background" data-section="light">
        <div className="container-slr max-w-4xl">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-body">
            The product behind it
          </p>
          <Link
            to={data.productHref}
            className="block p-8 bg-card border border-border hover:border-primary transition-colors group"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-display font-semibold mb-2">
                  {data.product}
                </h2>
                <p className="text-muted-foreground font-body">
                  See how it delivers this outcome.
                </p>
              </div>
              <ArrowUpRight className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
            </div>
          </Link>

          <div className="mt-16 text-center">
            <Link
              to="/contact"
              onClick={() =>
                trackCtaClick("solution_cta", {
                  audience: data.audience,
                  source: `solutions/${audience}`,
                })
              }
            >
              <Button size="lg">Talk to us</Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}