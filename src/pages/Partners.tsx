import { ArrowUpRight, Handshake, Code2, Network } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import PartnerDialog from "@/components/forms/PartnerDialog";
import heroImage from "@/assets/contact-hero.webp";

const opportunities = [
  { icon: Code2, title: "Technology Partners", body: "IoT, sensor, ERP and analytics platforms looking to integrate with mining operators across Africa." },
  { icon: Handshake, title: "Channel Partners", body: "Mining consultancies and system integrators delivering MineTech to their clients." },
  { icon: Network, title: "Research & Academia", body: "Universities and labs collaborating on AI for industrial operations and safety research." },
];

const Partners = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MineTech",
    description: "Tech partnerships for AI-driven mining technology across Africa.",
    url: "https://minetech.lovable.app/partners",
  };

  return (
    <Layout>
      <SEO
        title="Tech Partnerships | MineTech"
        description="Partner with MineTech to bring AI-driven mining technology to African operators. Open to technology, channel and research partnerships."
        keywords="mining tech partnerships, mining technology integration, AI for industrial operations, African tech startups, IoT mining partners"
        jsonLd={jsonLd}
      />

      <section className="relative bg-hero text-hero-foreground overflow-hidden min-h-[60vh] pt-16 flex items-center">
        <div className="absolute inset-0">
          <img src={heroImage} alt="" className="w-full h-full object-cover" loading="eager" decoding="async" />
          <div className="absolute inset-0 bg-hero/70" />
        </div>
        <div className="container-slr relative z-10 py-20">
          <div className="text-xs text-primary-light font-body uppercase tracking-[0.2em] mb-4">For Partners</div>
          <h1 className="text-4xl md:text-6xl font-display leading-[1.1] mb-6 max-w-3xl">
            Build the future of mining with us
          </h1>
          <p className="text-lg md:text-xl text-hero-foreground/80 font-body max-w-2xl mb-10">
            MineTech connects an ecosystem of technology, integration and research partners
            transforming how African mines operate.
          </p>
          <PartnerDialog />
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container-slr">
          <h2 className="text-3xl md:text-4xl font-display mb-12">Partnership opportunities</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {opportunities.map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-card border border-border p-6 rounded-lg">
                <Icon className="w-6 h-6 text-primary mb-4" />
                <h3 className="text-lg font-display font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground font-body">{body}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Button asChild variant="outline" size="lg" className="group">
              <a href="mailto:info@minetech.co.rw?subject=Partnership%20Inquiry">
                Email the Partnerships Team
                <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Partners;
