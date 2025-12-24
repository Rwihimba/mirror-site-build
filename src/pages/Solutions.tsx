import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";

const solutions = [
  { 
    title: "Safety & Compliance Intelligence", 
    href: "/solutions/safety-compliance",
    description: "Real-time safety monitoring and automated compliance reporting across all operations."
  },
  { 
    title: "Production & Fleet Optimization", 
    href: "/solutions/production-fleet",
    description: "Maximize equipment utilization and production efficiency with intelligent scheduling."
  },
  { 
    title: "Environmental Monitoring & Reporting", 
    href: "/solutions/environmental",
    description: "Continuous environmental data collection and automated regulatory reporting."
  },
  { 
    title: "Supply Chain & Logistics", 
    href: "/solutions/supply-chain",
    description: "End-to-end visibility and optimization of mining supply chain operations."
  },
  { 
    title: "Financial Operations & Payroll", 
    href: "/solutions/financial-operations",
    description: "Integrated financial management with automated payroll and cost tracking."
  },
  { 
    title: "Grade Control & Resource Management", 
    href: "/solutions/grade-control",
    description: "Precise ore tracking and resource optimization from extraction to processing."
  },
  { 
    title: "Quality Control & Processing", 
    href: "/solutions/quality-control",
    description: "Real-time quality monitoring and processing optimization systems."
  },
  { 
    title: "Sub-Contractor Management Systems", 
    href: "/solutions/subcontractor-management",
    description: "Unified contractor oversight with integrated compliance and performance tracking."
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
              End-to-End Mining Intelligence
            </h1>
            <p className="text-lg text-hero-foreground/80 font-body max-w-xl">
              MineTech offers full orchestration—from integration strategy to real-time operational intelligence, covering every department and decision.
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
          <h2 className="text-3xl md:text-4xl font-display mb-12">Our Mining Intelligence Solutions</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map((solution) => (
              <Link
                key={solution.title}
                to={solution.href}
                className="group p-6 bg-card rounded-lg hover:shadow-lg transition-shadow border border-border"
              >
                <h3 className="text-lg font-display font-semibold mb-2 group-hover:text-primary transition-colors flex items-center justify-between">
                  {solution.title}
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </h3>
                <p className="text-sm text-muted-foreground font-body">{solution.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container-slr text-center">
          <h2 className="text-3xl md:text-4xl font-display mb-6">Ready to Transform Your Mining Operations?</h2>
          <p className="text-lg text-muted-foreground font-body mb-8 max-w-2xl mx-auto">
            Our team of mining technology experts can help you develop a customized intelligence platform that meets your specific operational needs.
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