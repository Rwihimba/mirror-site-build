import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";

const solutions = [
  { 
    title: "Climate Resilience & Net Zero", 
    href: "/solutions/climate-resilience",
    description: "Help organisations understand climate risks and develop strategies to achieve net zero emissions."
  },
  { 
    title: "Energy Transition", 
    href: "/solutions/energy-transition",
    description: "Support the transition to renewable energy sources and sustainable energy systems."
  },
  { 
    title: "Nature, Natural Capital & Biodiversity", 
    href: "/solutions/nature-biodiversity",
    description: "Assess and enhance natural capital, protecting biodiversity across projects."
  },
  { 
    title: "Responsible Sourcing", 
    href: "/solutions/responsible-sourcing",
    description: "Ensure ethical and sustainable supply chain practices."
  },
  { 
    title: "Social & Community Impact", 
    href: "/solutions/social-impact",
    description: "Create positive outcomes for communities affected by development projects."
  },
  { 
    title: "Sustainable Finance", 
    href: "/solutions/sustainable-finance",
    description: "Integrate ESG considerations into investment and financing decisions."
  },
  { 
    title: "Waste & Circularity", 
    href: "/solutions/waste-circularity",
    description: "Develop circular economy strategies to minimize waste and maximize resource efficiency."
  },
];

const Solutions = () => {
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
              <span>Solutions</span>
            </nav>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display leading-tight mb-6 animate-slide-in-left">
              Solutions
            </h1>
            <p className="text-lg text-hero-foreground/80 font-body max-w-xl">
              We help organisations tackle their greatest sustainability challenges with evidence-based approaches that deliver long-term value.
            </p>
          </div>

          {/* Pattern */}
          <div className="relative h-[40vh] lg:h-auto section-pattern">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-48 h-48 text-hero-foreground/10">
                <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-slr">
          <h2 className="text-3xl md:text-4xl font-display mb-12">Our Sustainability Solutions</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {solutions.map((solution) => (
              <Link
                key={solution.title}
                to={solution.href}
                className="group p-8 bg-card rounded-lg card-hover border border-border"
              >
                <h3 className="text-xl font-display font-semibold mb-3 group-hover:text-primary transition-colors flex items-center justify-between">
                  {solution.title}
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </h3>
                <p className="text-muted-foreground font-body">{solution.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container-slr text-center">
          <h2 className="text-3xl md:text-4xl font-display mb-6">Need a tailored solution?</h2>
          <p className="text-lg text-muted-foreground font-body mb-8 max-w-2xl mx-auto">
            Our team of experts can help you develop a customized sustainability strategy that meets your specific needs.
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

export default Solutions;
