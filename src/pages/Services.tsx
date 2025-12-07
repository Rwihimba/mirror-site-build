import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";

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
      {/* Hero Section */}
      <section className="bg-hero text-hero-foreground relative overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[50vh]">
          {/* Breadcrumb and Title */}
          <div className="container-slr flex flex-col justify-center py-16 lg:py-20">
            <nav className="flex items-center gap-2 text-sm text-hero-foreground/60 mb-8 font-body">
              <Link to="/" className="hover:text-hero-foreground">Home</Link>
              <span>›</span>
              <span>Services</span>
            </nav>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display leading-tight mb-6 animate-slide-in-left">
              Services
            </h1>
            <p className="text-lg text-hero-foreground/80 font-body max-w-xl">
              From strategic planning to implementation, SLR supports clients throughout their sustainability journey. With a global network of technical specialists, we help organisations navigate complex environmental and sustainability challenges.
            </p>
          </div>

          {/* Hero Image */}
          <div className="relative h-[40vh] lg:h-auto">
            <img
              src="https://cdn.sanity.io/images/b0ecix6u/production/8d40692127959d324ebb40ce29162068667431a8-1170x640.png?w=1000"
              alt="Services hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-48 h-48 text-hero-foreground/90">
                <polygon points="100,20 140,50 140,90 100,120 60,90 60,50" fill="currentColor" />
                <polygon points="100,80 140,110 140,150 100,180 60,150 60,110" fill="currentColor" />
                <polygon points="30,50 70,80 70,120 30,150 -10,120 -10,80" fill="currentColor" transform="translate(40,0)" />
                <polygon points="130,50 170,80 170,120 130,150 90,120 90,80" fill="currentColor" transform="translate(0,0)" />
              </svg>
            </div>
          </div>
        </div>
      </section>

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
