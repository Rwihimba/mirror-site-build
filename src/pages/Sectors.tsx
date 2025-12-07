import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";

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
      {/* Hero Section */}
      <section className="bg-hero text-hero-foreground relative overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[50vh]">
          {/* Breadcrumb and Title */}
          <div className="container-slr flex flex-col justify-center py-16 lg:py-20">
            <nav className="flex items-center gap-2 text-sm text-hero-foreground/60 mb-8 font-body">
              <Link to="/" className="hover:text-hero-foreground">Home</Link>
              <span>›</span>
              <span>Sectors</span>
            </nav>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display leading-tight mb-6 animate-slide-in-left">
              Sectors
            </h1>
            <p className="text-lg text-hero-foreground/80 font-body max-w-xl mb-4">
              SLR supports a wide range of industry sectors, with a large focus on organisations that are facing some of the world's toughest sustainability challenges. We aim to be a partner to our clients, supporting and advising on industry leading sustainability approaches.
            </p>
            <p className="text-hero-foreground/60 font-body">
              If you have different requirements and would like to learn more about how we might be able to help,{" "}
              <Link to="/contact" className="text-primary-light hover:underline">please get in touch</Link>.
            </p>
          </div>

          {/* Hero Image */}
          <div className="relative h-[40vh] lg:h-auto">
            <img
              src="https://cdn.sanity.io/images/b0ecix6u/production/000e68d6cf9cee5b6e569d42f984d5094a81c780-1170x640.png?w=1000"
              alt="Sectors hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-48 h-48 text-hero-foreground/90">
                <polygon points="100,20 140,60 140,140 100,180 60,140 60,60" fill="none" stroke="currentColor" strokeWidth="3" />
                <polygon points="100,50 125,75 125,125 100,150 75,125 75,75" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>
      </section>

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
