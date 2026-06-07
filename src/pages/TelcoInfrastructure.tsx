import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/sections";
import { trackCtaClick } from "@/lib/analytics";

const FLOW = [
  { step: "01", title: "Survey the site", body: "We walk the pit, the camp and the haul road and map where coverage actually has to land." },
  { step: "02", title: "Deploy the network", body: "Private radio, backhaul and edge cabinets built for dust, heat and intermittent power." },
  { step: "03", title: "Run the edge", body: "Offline first capture on devices, edge compute on site, sync to the operating record." },
  { step: "04", title: "Operate it for you", body: "Monitored 24 hours a day. Billed as infrastructure, not as a SaaS line item." },
];

const CAPABILITIES = [
  { title: "Private network coverage", body: "Designed for active mining sites, not for cities. Coverage where the equipment actually moves." },
  { title: "Edge compute on site", body: "Local processing so capture, dashboards and alerts work whether the link is up or down." },
  { title: "Hardened hardware", body: "Engineered for dust, heat, vibration and the power conditions of African pits." },
  { title: "Operated and monitored", body: "We own and run the network. You get an SLA, not a parts list." },
  { title: "Backhaul flexibility", body: "Fibre, microwave or satellite, picked per site so the record always reaches the cloud." },
  { title: "Designed for the record", body: "Tuned for the data Minetech OS, Corp and Trace need to move, not generic traffic." },
];

const WHY = [
  { title: "The record is only as reliable as the network", body: "Production data captured offline is fine, until you need it on a regulator's desk this afternoon. Minetech Telco is what makes the record arrive." },
  { title: "Pits are not cities", body: "Public mobile networks are built for people, not for haul trucks at the bottom of an open pit. We build for the pit." },
  { title: "Owned, not rented", body: "Owning the network layer means we can guarantee what the software promises. It is also why the cost works." },
];

const FAQS = [
  { q: "Do we have to use Minetech Telco to run Minetech OS or Corp?", a: "No. The software works on any network. Telco is what we deploy when the available network cannot carry the record reliably." },
  { q: "Who owns the equipment?", a: "We do. You pay for service and coverage, not a hardware project." },
  { q: "What about regulator licensing?", a: "We operate within the relevant national licensing framework on each site. That is part of the deployment." },
];

export default function TelcoInfrastructure() {
  return (
    <Layout>
      <SEO
        title="Minetech Telco | Network and edge for African pits"
        description="The hardware layer under MineTech. Private network and edge compute, engineered for the way African pits actually run."
      />
      <PageHero
        title="The network the record runs on."
        subtitle="Private network and edge compute we own and operate, so the operating record reaches every pit, every shift, every time."
        breadcrumb="Infrastructure"
        minHeight="md"
        imageAlt="https://images.pexels.com/photos/6595788/pexels-photo-6595788.jpeg"
      >
        <div className="mt-8">
          <Link
            to="/contact"
            onClick={() =>
              trackCtaClick("telco_hero_cta", { product: "telco", source: "infrastructure/telco" })
            }
          >
            <Button variant="hero-accent" size="lg">Talk to us</Button>
          </Link>
        </div>
      </PageHero>

      {/* Why it exists */}
      <section className="py-20 bg-background" data-section="light">
        <div className="container-slr grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-body">
              Why we built it
            </p>
            <h2 className="text-2xl md:text-3xl font-display font-semibold leading-tight">
              Software promises nothing without the network underneath.
            </h2>
          </div>
          <div className="md:col-span-8 grid md:grid-cols-1 gap-px bg-border">
            {WHY.map((w) => (
              <div key={w.title} className="bg-card p-6">
                <h3 className="font-display font-semibold mb-2">{w.title}</h3>
                <p className="text-muted-foreground font-body">{w.body}</p>
              </div>
            ))}
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
            From the survey to the SLA.
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {FLOW.map((f) => (
              <div key={f.step} className="bg-card p-8 flex flex-col">
                <span className="text-5xl font-display font-bold text-primary/30 mb-6">{f.step}</span>
                <h3 className="text-lg font-display font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 bg-background" data-section="light">
        <div className="container-slr">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-body">
            What is in it
          </p>
          <h2 className="text-2xl md:text-3xl font-display font-semibold mb-12 max-w-2xl">
            Built for pits, not for cities.
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CAPABILITIES.map((c) => (
              <div key={c.title} className="bg-card p-6 border border-border">
                <h3 className="text-base font-display font-semibold mb-3">{c.title}</h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-secondary" data-section="light">
        <div className="container-slr grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-body">
              Common questions
            </p>
            <h2 className="text-2xl md:text-3xl font-display font-semibold leading-tight">
              What operators ask before they sign.
            </h2>
          </div>
          <div className="md:col-span-8 divide-y divide-border border-t border-b border-border">
            {FAQS.map((f) => (
              <div key={f.q} className="py-6">
                <h3 className="font-display font-semibold mb-2">{f.q}</h3>
                <p className="font-body text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-hero text-hero-foreground">
        <div className="container-slr max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Tell us about the site.
          </h2>
          <p className="font-body opacity-80 mb-8">
            We will walk it, scope coverage, and quote a network that carries the record you actually need.
          </p>
          <Link
            to="/contact"
            onClick={() =>
              trackCtaClick("telco_cta", { product: "telco", source: "infrastructure/telco" })
            }
          >
            <Button variant="hero-accent" size="lg">Talk to us</Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}