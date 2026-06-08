import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/sections";
import { trackCtaClick } from "@/lib/analytics";

type AudienceCopy = {
  audience: string;
  title: string;
  outcome: string;
  product: string;
  productHref: string;
  productTagline: string;
  productPillars: string[];
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
    productTagline: "Shared infrastructure for artisanal & small-scale mining.",
    productPillars: ["Field-first capture", "iTSCi & OECD ready", "Buyer-grade dossiers"],
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
    productTagline: "The operating layer for serious mines.",
    productPillars: ["Grade control, live", "Fleet & maintenance", "Safety & workforce"],
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
    productTagline: "Chain of custody, OECD-aligned, export in one click.",
    productPillars: ["Lot-level traceability", "Pre-deal screening", "Audit-ready exports"],
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
      <PageHero
        title={data.outcome}
        subtitle={data.description}
        breadcrumb={data.title}
        minHeight="md"
      />

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
      <section className="py-24 bg-hero text-hero-foreground relative overflow-hidden" data-section="dark">
        {/* Editorial grid lines */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
          aria-hidden
        />
        {/* Ambient accent */}
        <div
          className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full pointer-events-none opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)" }}
          aria-hidden
        />

        <div className="container-slr max-w-6xl relative">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px w-12 bg-primary" />
            <p className="text-xs uppercase tracking-[0.2em] font-body opacity-70">
              The product behind it
            </p>
          </div>

          <Link
            to={data.productHref}
            className="group block relative border border-hero-foreground/15 hover:border-primary/60 transition-all duration-500 bg-hero-foreground/[0.02] hover:bg-hero-foreground/[0.04]"
          >
            {/* Corner marks */}
            <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary" aria-hidden />
            <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary" aria-hidden />
            <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary" aria-hidden />
            <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary" aria-hidden />

            <div className="grid md:grid-cols-12 gap-0">
              {/* Left: product identity */}
              <div className="md:col-span-7 p-8 md:p-12 md:border-r border-hero-foreground/10 relative">
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-xs font-mono tracking-wider opacity-50">PRODUCT</span>
                  <span className="h-px flex-1 bg-hero-foreground/15" />
                  <span className="text-xs font-mono tracking-wider text-primary-light">
                    {data.audience === "large_miners" ? "OS" : data.audience === "traders" ? "TRACE" : "CORP"}
                  </span>
                </div>

                <h2 className="text-4xl md:text-5xl font-display font-semibold mb-4 leading-[1.05]">
                  {data.product}
                </h2>
                <p className="text-lg md:text-xl font-body opacity-80 max-w-md mb-10 leading-relaxed">
                  {data.productTagline}
                </p>

                <div className="inline-flex items-center gap-3 text-sm font-body tracking-wide border-b border-primary/40 pb-1 group-hover:border-primary transition-colors">
                  <span>See how it delivers this outcome</span>
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                    →
                  </span>
                </div>
              </div>

              {/* Right: pillars */}
              <div className="md:col-span-5 p-8 md:p-12 flex flex-col justify-center">
                <p className="text-xs uppercase tracking-[0.2em] opacity-50 mb-6 font-body">
                  What it ships with
                </p>
                <ul className="space-y-5">
                  {data.productPillars.map((pillar, i) => (
                    <li key={pillar} className="flex items-start gap-4 group/item">
                      <span className="text-xs font-mono opacity-50 pt-1 w-6">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-body text-base md:text-lg leading-snug border-b border-transparent group-hover/item:border-primary/40 transition-colors">
                        {pillar}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
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