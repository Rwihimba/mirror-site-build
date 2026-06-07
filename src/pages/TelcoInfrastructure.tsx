import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { trackCtaClick } from "@/lib/analytics";

export default function TelcoInfrastructure() {
  return (
    <Layout>
      <SEO
        title="Minetech Telco | Network and edge for African pits"
        description="The hardware layer under MineTech. Private network and edge compute, engineered for the way African pits actually run."
      />
      <section className="pt-32 pb-20 bg-hero text-hero-foreground">
        <div className="container-slr max-w-4xl">
          <p className="text-xs uppercase tracking-wider opacity-60 mb-4 font-body">
            Infrastructure
          </p>
          <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6">
            The network the record runs on.
          </h1>
          <p className="text-lg md:text-xl opacity-80 font-body max-w-2xl">
            Minetech Telco is the connectivity and edge layer we own so the
            operating record reaches every pit, every shift, every time.
          </p>
        </div>
      </section>
      <section className="py-20 bg-background" data-section="light">
        <div className="container-slr max-w-4xl">
          <ul className="space-y-3 font-body text-lg">
            <li>Private network coverage across active mining sites.</li>
            <li>Edge compute for offline first capture and sync.</li>
            <li>Hardware engineered for dust, heat and intermittent power.</li>
            <li>Operated by us, billed as infrastructure, not as a SaaS line item.</li>
          </ul>
          <div className="mt-12">
            <Link
              to="/contact"
              onClick={() =>
                trackCtaClick("telco_cta", {
                  product: "telco",
                  source: "infrastructure/telco",
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