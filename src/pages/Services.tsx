import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/sections";

const services = [
  { title: "Acoustics & Vibration", href: "/services/acoustics" },
  { title: "Advisory", href: "/services/advisory" },
  { title: "Air Quality", href: "/services/air-quality" },
  { title: "Aquatic Environmental Services", href: "/services/aquatic" },
  { title: "Archaeology & Heritage", href: "/services/archaeology" },
  { title: "Architecture", href: "/services/architecture" },
  { title: "Audit & Mapping", href: "/services/audit-mapping" },
  { title: "Carbon & Energy Management", href: "/services/carbon-energy" },
  { title: "Civil & Structural Engineering", href: "/services/civil-engineering" },
  { title: "Climate Resilience Planning & Design", href: "/services/climate-planning" },
  { title: "Community Planning", href: "/services/community-planning" },
  { title: "Ecology & Biodiversity", href: "/services/ecology" },
  { title: "Engineering & Design", href: "/services/engineering" },
  { title: "Environmental Assessment", href: "/services/environmental-assessment" },
  { title: "Environmental Sciences", href: "/services/environmental" },
  { title: "Geotechnical Engineering", href: "/services/geotechnical" },
  { title: "Health & Safety", href: "/services/health-safety" },
  { title: "Hydrology & Water Resources", href: "/services/hydrology" },
  { title: "Land Quality & Remediation", href: "/services/land-quality" },
  { title: "Landscape Architecture", href: "/services/landscape" },
  { title: "Planning & Assessment", href: "/services/planning" },
  { title: "Sustainability Strategy", href: "/services/sustainability-strategy" },
  { title: "Transport Planning", href: "/services/transport" },
  { title: "Waste Management", href: "/services/waste" },
];

const Services = () => {
  return (
    <Layout>
      <PageHero
        title="Services"
        subtitle="From strategic planning to implementation, MineTech supports operators across the full mining lifecycle with specialist technology and advisory."
        breadcrumb="Services"
        minHeight="md"
      />

      {/* Services List */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-slr">
          <h2 className="text-3xl md:text-4xl font-display mb-12">Our Technical Services</h2>
          
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-1">
            {services.map((service) => (
              <Link
                key={service.title}
                to={service.href}
                className="group flex items-center justify-between py-4 border-b border-border hover:border-primary transition-colors"
              >
                <span className="text-lg font-display group-hover:text-primary transition-colors">
                  {service.title}
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
          <h2 className="text-3xl md:text-4xl font-display mb-6">Need a specific service?</h2>
          <p className="text-lg text-muted-foreground font-body mb-8 max-w-2xl mx-auto">
            Our multidisciplinary approach ensures clients receive high-level strategic guidance and practical, on-the-ground expertise tailored to their sector and goals.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded font-body font-medium hover:bg-primary/90 transition-colors">
            Get in Touch
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
