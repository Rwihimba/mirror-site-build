import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/sections";

const sectors = [
  { title: "Built Environment", href: "/sectors/built-environment" },
  { title: "Consumer Goods & Retail", href: "/sectors/consumer-goods" },
  { title: "Energy", href: "/sectors/energy" },
  { title: "Finance", href: "/sectors/finance" },
  { title: "Government & Infrastructure", href: "/sectors/government" },
  { title: "Healthcare", href: "/sectors/healthcare" },
  { title: "Industry & Technology", href: "/sectors/industry" },
  { title: "Mining", href: "/sectors/mining" },
];

const Sectors = () => {
  return (
    <Layout>
      <PageHero
        title="Sectors"
        subtitle="MineTech supports a wide range of industry sectors, with a focus on organisations facing the toughest operational and compliance challenges."
        breadcrumb="Sectors"
        minHeight="md"
      />

      {/* Sectors List */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-slr">
          <h2 className="text-3xl md:text-4xl font-display mb-12">Our Sectors</h2>
          
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-1">
            {sectors.map((sector) => (
              <Link
                key={sector.title}
                to={sector.href}
                className="group flex items-center justify-between py-4 border-b border-border hover:border-primary transition-colors"
              >
                <span className="text-lg font-display group-hover:text-primary transition-colors">
                  {sector.title}
                </span>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container-slr text-center">
          <h2 className="text-3xl md:text-4xl font-display mb-6">Different sector requirements?</h2>
          <p className="text-lg text-muted-foreground font-body mb-8 max-w-2xl mx-auto">
            Our work touches all areas of the corporate world. Contact us to discuss how we can help your specific industry.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded font-body font-medium hover:bg-primary/90 transition-colors">
            Contact Us
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Sectors;
