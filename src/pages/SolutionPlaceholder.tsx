import { useParams, Link } from "react-router-dom";
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
  pains: string[];
  whatYouGet: { title: string; body: string }[];
  proof: { stat: string; label: string };
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
    pains: [
      "Production is logged on paper, then retyped into three different forms.",
      "Inspectors arrive before the record is ready, and fines follow.",
      "Buyers ask for chain of custody you cannot produce on demand.",
    ],
    whatYouGet: [
      { title: "One record at the source", body: "Capture grams, sites and miners on a phone, even with patchy network." },
      { title: "Compliance that writes itself", body: "iTSCi, OECD and royalty reports generated from the same record." },
      { title: "A buyer ready dossier", body: "Hand over chain of custody in minutes, not weeks." },
      { title: "Costs that do not crush the cooperative", body: "Shared infrastructure model, funded by larger operators on the same rails." },
    ],
    proof: { stat: "150+", label: "Cooperatives on the Minetech Corp waitlist." },
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
    pains: [
      "Geology, fleet and finance each run their own spreadsheet, and none of them agree.",
      "Grade reconciliation takes a quarter, by which time the ore is already on a ship.",
      "Compliance reporting eats two weeks every month and still arrives late.",
    ],
    whatYouGet: [
      { title: "Grade control in real time", body: "Lab results align with live mining locations and equipment, the moment they land." },
      { title: "Fleet that does not stop", body: "Utilisation, maintenance and operator records in one record across shifts." },
      { title: "Safety and workforce, joined up", body: "Attendance, certifications and incidents linked to the people and equipment on site." },
      { title: "Regulator ready, every day", body: "Reports generated continuously, not assembled at month end." },
    ],
    proof: { stat: "15+", label: "Mining departments covered by Minetech OS." },
  },
  traders: {
    audience: "traders",
    title: "Traders & Suppliers",
    outcome: "Due diligence in a folder, not a quarter.",
    product: "Minetech Trace",
    productHref: "/products/trace",
    description:
      "Chain of custody and OECD ready dossiers, generated from the same record your suppliers already keep. Pair with Minetech Upstream to screen counterparties before the deal.",
    pains: [
      "Every shipment needs a dossier the supplier cannot produce on time.",
      "You only find out about a counterparty risk after the contract is signed.",
      "Compliance teams chase PDFs across email instead of closing deals.",
    ],
    whatYouGet: [
      { title: "Lot level chain of custody", body: "Mine to shipment, exported in one click in the format your buyer asks for." },
      { title: "OECD, iTSCi and LBMA aligned", body: "Built to the standards your downstream desk is audited against." },
      { title: "Pre deal screening", body: "Minetech Upstream checks licences, ownership and sanctions before money moves." },
      { title: "Suppliers already on the rails", body: "Cooperatives on Minetech Corp produce the record you need, by default." },
    ],
    proof: { stat: "1 click", label: "Buyer facing audit trail export." },
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

      {/* Their reality */}
      <section className="py-20 bg-background" data-section="light">
        <div className="container-slr max-w-5xl">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-body">
            Their reality
          </p>
          <h2 className="text-2xl md:text-3xl font-display font-semibold mb-10 max-w-3xl">
            What we hear on the ground.
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {data.pains.map((p) => (
              <div key={p} className="bg-card p-6 border border-border">
                <p className="font-body text-foreground/80">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-20 bg-secondary" data-section="light">
        <div className="container-slr max-w-5xl">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-body">
            What you get
          </p>
          <h2 className="text-2xl md:text-3xl font-display font-semibold mb-10 max-w-3xl">
            Outcomes, not features.
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {data.whatYouGet.map((o) => (
              <div key={o.title} className="bg-card p-6 border border-border">
                <h3 className="text-lg font-display font-semibold mb-2">{o.title}</h3>
                <p className="text-sm text-muted-foreground font-body">{o.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The product */}
      <section className="py-20 bg-background" data-section="light">
        <div className="container-slr max-w-4xl">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-body">
            The product behind it
          </p>
          <Link
            to={data.productHref}
            className="block p-8 bg-card border border-border hover:border-primary transition-colors group"
          >
            <h2 className="text-2xl font-display font-semibold mb-2">
              {data.product}
            </h2>
            <p className="text-muted-foreground font-body">
              See how it delivers this outcome.
            </p>
          </Link>
        </div>
      </section>

      {/* Proof + CTA */}
      <section className="py-20 bg-hero text-hero-foreground">
        <div className="container-slr max-w-4xl text-center">
          <div className="mb-12">
            <div className="text-5xl md:text-6xl font-display font-bold text-primary-light mb-3">
              {data.proof.stat}
            </div>
            <p className="font-body opacity-80">{data.proof.label}</p>
          </div>
            <Link
              to="/contact"
              onClick={() =>
                trackCtaClick("solution_cta", {
                  audience: data.audience,
                  source: `solutions/${audience}`,
                })
              }
            >
              <Button variant="hero-accent" size="lg">Talk to us</Button>
            </Link>
        </div>
      </section>
    </Layout>
  );
}