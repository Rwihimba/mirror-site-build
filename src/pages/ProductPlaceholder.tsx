import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { trackCtaClick } from "@/lib/analytics";
import osImg from "@/assets/product-os.jpg";
import corpImg from "@/assets/product-corp.jpg";
import traceImg from "@/assets/product-trace.jpg";
import upstreamImg from "@/assets/product-upstream.jpg";

type ProductCopy = {
  product: string;
  name: string;
  category: string;
  image: string;
  oneLiner: string;
  outcome: string;
  forWhom: string;
  context: { heading: string; body: string };
  flow: { step: string; title: string; body: string }[];
  modules: { title: string; body: string }[];
  integrations: string[];
  stakeholders: { role: string; gets: string }[];
  faqs: { q: string; a: string }[];
  audienceLinks: { label: string; href: string }[];
  funding?: string;
  proof?: { stat: string; label: string };
};

const COPY: Record<string, ProductCopy> = {
  os: {
    product: "os",
    name: "Minetech OS",
    category: "Operating system for mid and large scale mines",
    image: osImg,
    oneLiner:
      "The operating record for mid and large scale mines, from pit to plant.",
    outcome:
      "One source of truth across geology, fleet, safety, finance and compliance.",
    forWhom: "Large and mid scale miners.",
    context: {
      heading: "The mine already produces the data. Nobody owns it.",
      body: "Geology runs in one spreadsheet, fleet in another, safety on paper, finance in an ERP that was never built for a pit. Reconciliation takes a quarter. By the time numbers agree, the ore is already on a ship and the regulator is already asking. Minetech OS makes one record the source of truth, captured at the point of work, and every team plugs into it.",
    },
    flow: [
      { step: "01", title: "Capture at source", body: "Geology, fleet, safety and HR data captured on the equipment, on the phone, on the pit edge. No re entry." },
      { step: "02", title: "One operating record", body: "Every department writes into the same record, with lineage. Numbers stop disagreeing because they share a source." },
      { step: "03", title: "Decisions in shift", body: "Grade, utilisation, incidents and cost surface in the dashboards your supervisors already open every morning." },
      { step: "04", title: "Reports that write themselves", body: "Regulator, board and partner reports are views on the record, not month end projects." },
    ],
    modules: [
      { title: "Geology and grade control", body: "Drill, sample and assay linked to live mining locations and equipment, including drone survey via partners." },
      { title: "Fleet and maintenance", body: "Utilisation, fuel, downtime, operators and component life on one timeline." },
      { title: "Safety and certifications", body: "Incidents, near misses, training and PPE tied to the people and equipment on site." },
      { title: "Workforce and payroll", body: "Attendance, shift, contractor and payroll records that match what regulators ask for." },
      { title: "Finance and cost", body: "Cost per tonne by pit, by fleet, by shift. Reconciled against production, not estimated." },
      { title: "Compliance and reporting", body: "Royalty, environment, social and security reports generated continuously." },
    ],
    integrations: ["Drone survey partners", "ERP and accounting systems", "Lab information systems", "Minetech Trace", "Minetech Telco network"],
    stakeholders: [
      { role: "Mine GM", gets: "One dashboard that ties production, cost and safety to the same shift." },
      { role: "Head of Geology", gets: "Grade control reconciled in real time, not next quarter." },
      { role: "CFO", gets: "Cost per tonne backed by the same record as the production report." },
      { role: "Compliance lead", gets: "Regulator ready reports that do not need a two week sprint." },
    ],
    faqs: [
      { q: "Does it replace our ERP?", a: "No. Minetech OS sits between the pit and the ERP. We feed the ERP the production, cost and workforce data it has never had cleanly." },
      { q: "What about sites with no network?", a: "Capture is offline first. Sync happens when the device reaches Minetech Telco coverage or any available link." },
      { q: "How long does it take to deploy?", a: "First module live inside a quarter. We do not run multi year transformations." },
    ],
    audienceLinks: [
      { label: "Large & Mid Scale Miners", href: "/solutions/large-miners" },
    ],
    proof: { stat: "156+", label: "Operation workflows implemented." },
  },
  corp: {
    product: "corp",
    name: "Minetech Corp",
    category: "Shared infrastructure for cooperatives and ASM",
    image: corpImg,
    oneLiner:
      "Shared infrastructure for cooperatives and artisanal small scale mining.",
    outcome: "Every gram accounted for, compliant before the inspector arrives.",
    forWhom: "Cooperatives and ASM associations.",
    context: {
      heading: "ASM is most of the production and almost none of the record.",
      body: "Cooperatives carry the weight of compliance with the tools of a corner shop. Production is logged on paper, retyped into three forms, and still arrives late. Buyers ask for chain of custody nobody can produce. Minetech Corp gives cooperatives the same operating record large mines run on, sized and priced for the way ASM actually works.",
    },
    flow: [
      { step: "01", title: "Log at the pit", body: "Site supervisor captures production by miner, by site, on a rugged phone. Works offline." },
      { step: "02", title: "One cooperative record", body: "Sales, payments, member data and chain of custody live in the same record as production." },
      { step: "03", title: "Compliance writes itself", body: "iTSCi, OECD and royalty reports are generated from the record. No retyping." },
      { step: "04", title: "Buyer ready in minutes", body: "Hand over a chain of custody dossier the buyer can actually audit, on demand." },
    ],
    modules: [
      { title: "Production capture", body: "By site, by shift, by miner. Photographic and geolocated evidence on every entry." },
      { title: "Member and payment records", body: "Who delivered what, who got paid what, with a clean audit trail." },
      { title: "Chain of custody", body: "Lot level tracking from pit to buyer, aligned to iTSCi and OECD." },
      { title: "Royalty and tax", body: "Regulator ready reconciliations, not last minute spreadsheets." },
      { title: "Cooperative dashboard", body: "Leadership sees production, sales and compliance in one place." },
    ],
    integrations: ["iTSCi", "OECD due diligence", "Minetech Trace", "Mobile money", "Minetech Telco network"],
    stakeholders: [
      { role: "Cooperative leader", gets: "Production, sales and compliance in a single weekly view." },
      { role: "Member miner", gets: "Proof of what they delivered and what they are owed." },
      { role: "Regulator", gets: "A clean record before the inspection, not after." },
      { role: "Buyer", gets: "Chain of custody they can put in their own audit file." },
    ],
    faqs: [
      { q: "Does it need smartphones for every miner?", a: "No. One rugged device per site is enough. The supervisor logs production for the team." },
      { q: "What happens with no network?", a: "Capture is offline first and syncs when a signal is available, including via Minetech Telco coverage." },
      { q: "Who pays for it?", a: "See the funding section below. The model is shared infrastructure, not a per cooperative software bill." },
    ],
    audienceLinks: [
      { label: "Cooperatives & ASM", href: "/solutions/cooperatives" },
    ],
    funding:
      "Minetech Corp runs on a self subsidising, shared infrastructure model. Larger operators on Minetech OS and buyers on Minetech Trace fund the rails. That keeps the per cooperative cost low enough to be real, instead of a pilot. Pricing is set per region and per cooperative size. We will quote you on a call once we understand your sites.",
    proof: { stat: "150+", label: "Cooperatives on the waitlist." },
  },
  trace: {
    product: "trace",
    name: "Minetech Trace",
    category: "Chain of custody and due diligence",
    image: traceImg,
    oneLiner:
      "Chain of custody and due diligence, generated from the same record the supplier already keeps.",
    outcome: "Due diligence in a folder, not a quarter.",
    forWhom: "Traders, refineries and downstream buyers.",
    context: {
      heading: "Your buyer asks for a dossier. Your supplier sends a WhatsApp.",
      body: "Downstream is audited on standards the upstream record was never built to meet. Compliance teams chase PDFs across email, lots get held at the border, and risk turns up after the contract is signed. Minetech Trace generates the dossier from the same record the supplier already keeps in Minetech OS or Minetech Corp. The audit trail is the operation, not a parallel document.",
    },
    flow: [
      { step: "01", title: "Pull from source", body: "Lot data flows directly from Minetech OS or Minetech Corp into the Trace record." },
      { step: "02", title: "Verify the chain", body: "Each transfer, weight and seal is logged with evidence and the responsible party." },
      { step: "03", title: "Generate the dossier", body: "OECD, iTSCi and LBMA aligned dossiers exported in the format the buyer actually asks for." },
      { step: "04", title: "Hand over with confidence", body: "Buyer audits the trail in their own system. No more email chasing." },
    ],
    modules: [
      { title: "Lot level chain of custody", body: "Pit to shipment, with weight, seal and handler evidence on every leg." },
      { title: "Standards aligned dossiers", body: "OECD, iTSCi, LBMA and partner specific formats out of the box." },
      { title: "Buyer audit portal", body: "Read only access for the buyer, scoped to the lots they bought." },
      { title: "Risk flags", body: "Counterparty and licence risk surfaced via Minetech Upstream, on the same record." },
    ],
    integrations: ["OECD due diligence", "iTSCi", "LBMA", "Minetech OS", "Minetech Corp", "Minetech Upstream"],
    stakeholders: [
      { role: "Trader", gets: "A dossier in the buyer's format, ready when the contract is." },
      { role: "Compliance officer", gets: "An audit trail tied to the operation, not assembled from email." },
      { role: "Refinery", gets: "Lot evidence aligned to LBMA and OECD, on demand." },
      { role: "Auditor", gets: "Read only access to the record, scoped to the lots in scope." },
    ],
    faqs: [
      { q: "Does the supplier have to use MineTech?", a: "It is the cleanest path, but Trace can ingest from other sources where a supplier already has structured data." },
      { q: "Is the dossier accepted by my auditor?", a: "Trace is aligned to OECD, iTSCi and LBMA. We tune the export to your specific auditor's format." },
      { q: "Can I link it to pre deal screening?", a: "Yes. Minetech Upstream feeds counterparty and licence risk into the same Trace record." },
    ],
    audienceLinks: [
      { label: "Traders & Suppliers", href: "/solutions/traders" },
    ],
    proof: { stat: "1 click", label: "Buyer ready dossier export." },
  },
  upstream: {
    product: "upstream",
    name: "Minetech Upstream",
    category: "Pre deal counterparty and licence screening",
    image: upstreamImg,
    oneLiner:
      "Counterparty, licence and supplier screening before you sign the deal.",
    outcome: "Know who is on the other side of the contract before money moves.",
    forWhom: "Traders, refineries and any buyer with OECD exposure.",
    context: {
      heading: "Risk turns up after the contract. That is too late.",
      body: "Most counterparty risk in African minerals is knowable, before the deal, from data that already exists. It is just scattered across registries, sanctions lists, ownership filings and licence databases. Minetech Upstream pulls it into one screen, scored, before procurement signs. When the deal closes, the file moves into Minetech Trace as the opening of the chain of custody record.",
    },
    flow: [
      { step: "01", title: "Search the counterparty", body: "Look up a supplier, exporter or concession holder by name, licence or beneficial owner." },
      { step: "02", title: "Screen across sources", body: "Licences, sanctions, ownership, adverse media and history checked in one pass." },
      { step: "03", title: "Score the risk", body: "Clear risk score with the underlying evidence, not a black box." },
      { step: "04", title: "Hand off to Trace", body: "Approved counterparties open the chain of custody record in Minetech Trace." },
    ],
    modules: [
      { title: "Licence and concession verification", body: "Active, expired, contested. With the underlying registry record attached." },
      { title: "Beneficial ownership", body: "Layered ownership and ultimate beneficial owner across jurisdictions." },
      { title: "Sanctions and PEP screening", body: "Global lists with adverse media, refreshed on schedule." },
      { title: "Supplier risk scoring", body: "Composite score per counterparty, with the evidence behind each signal." },
    ],
    integrations: ["Public registries", "Sanctions and PEP databases", "Minetech Trace", "Minetech OS", "Minetech Corp"],
    stakeholders: [
      { role: "Procurement", gets: "A clear go or no go on a counterparty in minutes, not weeks." },
      { role: "Compliance officer", gets: "Evidence trail behind every risk decision, ready for audit." },
      { role: "Legal", gets: "Licence and ownership status in the file before the contract is drafted." },
      { role: "Risk committee", gets: "Portfolio view of counterparty risk across active deals." },
    ],
    faqs: [
      { q: "How is this different from a generic KYC tool?", a: "Upstream is built on the registries and licence databases that matter in African minerals, and it hands off cleanly into the chain of custody record in Trace." },
      { q: "Can we use it without Trace?", a: "Yes. Upstream stands alone for pre deal screening. The handoff into Trace is optional and recommended." },
      { q: "How fresh is the data?", a: "Sanctions and PEP refresh on schedule. Registry data is refreshed per jurisdiction on its own cadence, surfaced as a timestamp on every record." },
    ],
    audienceLinks: [
      { label: "Traders & Suppliers", href: "/solutions/traders" },
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

      {/* Hero with image */}
      <section className="pt-32 pb-20 bg-hero text-hero-foreground">
        <div className="container-slr">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs uppercase tracking-wider opacity-60 mb-4 font-body">
                {data.name} &middot; {data.category}
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                {data.outcome}
              </h1>
              <p className="text-lg md:text-xl opacity-80 font-body max-w-xl mb-8">
                {data.oneLiner}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  onClick={() =>
                    trackCtaClick("product_hero_cta", { product: data.product, source: `products/${product}` })
                  }
                >
                  <Button variant="hero-accent" size="lg">Talk to us</Button>
                </Link>
                {data.audienceLinks.map((a) => (
                  <Link key={a.href} to={a.href}>
                    <Button variant="outline" size="lg" className="bg-transparent border-hero-foreground/40 text-hero-foreground hover:bg-hero-foreground/10">
                      For {a.label}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
            <div className="aspect-square w-full overflow-hidden border border-hero-foreground/10">
              <img
                src={data.image}
                alt={`${data.name} in operation`}
                width={1024}
                height={1024}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Context */}
      <section className="py-20 bg-background" data-section="light">
        <div className="container-slr grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-body">
              The context
            </p>
            <p className="font-body text-muted-foreground">{data.forWhom}</p>
          </div>
          <div className="md:col-span-8">
            <h2 className="text-2xl md:text-4xl font-display font-semibold mb-6 leading-tight">
              {data.context.heading}
            </h2>
            <p className="text-lg font-body text-foreground/80 leading-relaxed">
              {data.context.body}
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-secondary" data-section="light">
        <div className="container-slr">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-body">
            How it works
          </p>
          <h2 className="text-2xl md:text-3xl font-display font-semibold mb-12 max-w-2xl">
            From the pit to the boardroom, on one record.
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {data.flow.map((f) => (
              <div key={f.step} className="bg-card p-8 flex flex-col">
                <span className="text-5xl font-display font-bold text-primary/30 mb-6">{f.step}</span>
                <h3 className="text-lg font-display font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="py-20 bg-background" data-section="light">
        <div className="container-slr">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-body">
            What is in it
          </p>
          <h2 className="text-2xl md:text-3xl font-display font-semibold mb-12 max-w-2xl">
            The modules that make up {data.name}.
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.modules.map((m) => (
              <div key={m.title} className="bg-card p-6 border border-border">
                <h3 className="text-base font-display font-semibold mb-3">{m.title}</h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stakeholders */}
      <section className="py-20 bg-secondary" data-section="light">
        <div className="container-slr">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-body">
            Who plugs in
          </p>
          <h2 className="text-2xl md:text-3xl font-display font-semibold mb-12 max-w-2xl">
            Outcomes by stakeholder.
          </h2>
          <div className="divide-y divide-border border border-border bg-card">
            {data.stakeholders.map((s) => (
              <div key={s.role} className="grid md:grid-cols-3 gap-6 p-6 md:p-8">
                <div className="font-display font-semibold text-foreground">{s.role}</div>
                <div className="md:col-span-2 font-body text-foreground/80">{s.gets}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20 bg-background" data-section="light">
        <div className="container-slr">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-body">
            Plugs into
          </p>
          <h2 className="text-2xl md:text-3xl font-display font-semibold mb-10 max-w-2xl">
            Built to sit inside the systems you already run.
          </h2>
          <div className="flex flex-wrap gap-3">
            {data.integrations.map((i) => (
              <span key={i} className="px-4 py-2 border border-border bg-card text-sm font-body">
                {i}
              </span>
            ))}
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

      {/* FAQs */}
      <section className="py-20 bg-background" data-section="light">
        <div className="container-slr grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-body">
              Common questions
            </p>
            <h2 className="text-2xl md:text-3xl font-display font-semibold leading-tight">
              The questions we hear in the first call.
            </h2>
          </div>
          <div className="md:col-span-8 divide-y divide-border border-t border-b border-border">
            {data.faqs.map((f) => (
              <div key={f.q} className="py-6">
                <h3 className="font-display font-semibold mb-2">{f.q}</h3>
                <p className="font-body text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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