import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { trackCtaClick } from "@/lib/analytics";

type ProductCopy = {
  product: string;
  name: string;
  oneLiner: string;
  outcome: string;
  forWhom: string;
  audienceLinks: { label: string; href: string }[];
  capabilities: string[];
  funding?: string;
  proof?: { stat: string; label: string };
};

const COPY: Record<string, ProductCopy> = {
  os: {
    product: "os",
    name: "Minetech OS",
    oneLiner:
      "The operating record for mid and large scale mines, from pit to plant.",
    outcome:
      "One source of truth across geology, fleet, safety, finance and compliance.",
    forWhom: "Large and mid scale miners.",
    audienceLinks: [
      { label: "Large & Mid Scale Miners", href: "/solutions/large-miners" },
    ],
    capabilities: [
      "Grade control and exploration, including drone survey via partners",
      "Fleet utilisation and maintenance",
      "Safety incidents and certifications",
      "Workforce, attendance and payroll",
      "Regulator ready compliance reporting",
    ],
    proof: { stat: "156+", label: "Operation workflows implemented." },
  },
  corp: {
    product: "corp",
    name: "Minetech Corp",
    oneLiner:
      "Shared infrastructure for cooperatives and artisanal small scale mining.",
    outcome: "Every gram accounted for, compliant before the inspector arrives.",
    forWhom: "Cooperatives and ASM associations.",
    audienceLinks: [
      { label: "Cooperatives & ASM", href: "/solutions/cooperatives" },
    ],
    capabilities: [
      "Production capture at source, by site and by miner",
      "Sales, payments and member records",
      "iTSCi and OECD ready chain of custody",
      "Royalty and tax reconciliation",
      "Mobile first, works on the network you actually have",
    ],
    funding:
      "Minetech Corp runs on a self subsidising, shared infrastructure model. Larger operators on Minetech OS and buyers on Minetech Trace fund the rails. That keeps the per cooperative cost low enough to be real, instead of a pilot. Pricing is set per region and per cooperative size. We will quote you on a call once we understand your sites.",
    proof: { stat: "150+", label: "Cooperatives on the waitlist." },
  },
  trace: {
    product: "trace",
    name: "Minetech Trace",
    oneLiner:
      "Chain of custody and due diligence, generated from the same record the supplier already keeps.",
    outcome: "Due diligence in a folder, not a quarter.",
    forWhom: "Traders, refineries and downstream buyers.",
    audienceLinks: [
      { label: "Traders & Suppliers", href: "/solutions/traders" },
    ],
    capabilities: [
      "Lot level chain of custody from mine to shipment",
      "OECD, iTSCi and LBMA aligned dossiers",
      "Buyer facing audit trail with one click export",
      "Linked to Minetech Upstream for pre deal counterparty screening",
    ],
    proof: { stat: "1 click", label: "Buyer ready dossier export." },
  },
  upstream: {
    product: "upstream",
    name: "Minetech Upstream",
    oneLiner:
      "Counterparty, licence and supplier screening before you sign the deal.",
    outcome: "Know who is on the other side of the contract before money moves.",
    forWhom: "Traders, refineries and any buyer with OECD exposure.",
    audienceLinks: [
      { label: "Traders & Suppliers", href: "/solutions/traders" },
    ],
    capabilities: [
      "Licence and concession verification",
      "Beneficial ownership and sanctions screening",
      "Supplier risk scoring",
      "Feeds the Minetech Trace dossier on the deals you close",
    ],
    proof: { stat: "Pre deal", label: "Screening before the contract is signed." },
  },
};

export default function ProductPlaceholder() {
  const { product } = useParams<{ product: string }>();
  const data = product ? COPY[product] : undefined;

  if (!data) {
    return (
      <Layout>
        <SEO title="Product not found" description="" noIndex />
        <section className="py-32 container-slr">
          <h1 className="text-3xl font-display">Product not found</h1>
          <Link to="/" className="text-primary mt-4 inline-block">
            Back home
          </Link>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO title={`${data.name} | MineTech`} description={data.oneLiner} />

      <section className="pt-32 pb-20 bg-hero text-hero-foreground">
        <div className="container-slr max-w-4xl">
          <p className="text-xs uppercase tracking-wider opacity-60 mb-4 font-body">
            Product
          </p>
          <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6">
            {data.outcome}
          </h1>
          <p className="text-lg md:text-xl opacity-80 font-body max-w-2xl">
            {data.oneLiner}
          </p>
        </div>
      </section>

      <section className="py-20 bg-background" data-section="light">
        <div className="container-slr max-w-4xl grid md:grid-cols-3 gap-10">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2 font-body">
              Who it is for
            </p>
            <p className="font-body mb-4">{data.forWhom}</p>
            <div className="flex flex-col gap-2">
              {data.audienceLinks.map((a) => (
                <Link
                  key={a.href}
                  to={a.href}
                  className="text-sm font-body text-primary hover:underline"
                >
                  See the {a.label} page
                </Link>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2 font-body">
              Capabilities
            </p>
            <ul className="space-y-2 font-body">
              {data.capabilities.map((c) => (
                <li key={c} className="flex gap-3">
                  <span className="text-primary mt-2 w-1 h-1 bg-primary shrink-0" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {data.funding && (
        <section className="py-20 bg-secondary" data-section="light">
          <div className="container-slr max-w-4xl">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-body">
              How it is funded
            </p>
            <h2 className="text-2xl md:text-3xl font-display font-semibold mb-6">
              Shared infrastructure, not another bill for the cooperative.
            </h2>
            <p className="text-lg font-body text-foreground/80 max-w-3xl mb-8">
              {data.funding}
            </p>
            <Link
              to="/contact"
              onClick={() =>
                trackCtaClick("corp_quote", {
                  product: "corp",
                  source: "products/corp",
                })
              }
            >
              <Button size="lg">Get a quote</Button>
            </Link>
          </div>
        </section>
      )}

      <section className="py-20 bg-hero text-hero-foreground">
        <div className="container-slr max-w-3xl text-center">
          {data.proof && (
            <div className="mb-12">
              <div className="text-5xl md:text-6xl font-display font-bold text-primary-light mb-3">
                {data.proof.stat}
              </div>
              <p className="font-body opacity-80">{data.proof.label}</p>
            </div>
          )}
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            See it on your operation.
          </h2>
          <Link
            to="/contact"
            onClick={() =>
              trackCtaClick("product_cta", {
                product: data.product,
                source: `products/${product}`,
              })
            }
          >
            <Button variant="hero-accent" size="lg">
              Talk to us
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}